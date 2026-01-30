import * as fs from 'fs'
import * as prettier from 'prettier'
import * as docgen from 'react-docgen-typescript'
import { ComponentDoc, PropItem } from 'react-docgen-typescript'
import { ParserOptions } from 'react-docgen-typescript/lib/parser'
import * as ts from 'typescript'

const addSpaces = (s: string) => s.replace(/([A-Z])/g, ' $1').trim()

const stripComments = (str) => str.replace(/\/\*[\s\S]*?\*\/|(?<=[^:])\/\/.*|^\/\/.*/g, '')

const parserOptions: ParserOptions = {
    savePropValueAsString: true,
    shouldIncludePropTagMap: true,
    propFilter: (prop: PropItem, component) => {
        const { name, required, type, description, defaultValue, parent, declarations, tags } = prop

        if (!declarations) return false

        const declaration = declarations[0]

        if (name.includes('aria-')) return false
        if (name == 'key') return false
        if (declaration.name == 'HTMLAttributes') return false
        if (declaration.name == 'DOMAttributes') return false
        if (declaration.name == 'AllHTMLAttributes') return false

        return component.name == 'View' ? true : !!declaration.fileName?.includes('.tsx')
    },
}

const navigation = []

const createMdxFile = (slug, stories, dependenciesText, docsText, propsText, installText, cssText, storyTypeDocs) => {
    let fileExport = ''
    fileExport += "import { CodeComponent } from '@/components/code.component'\n"
    fileExport += "import DocsLayout from '@/layouts/docs.layout'\n"
    fileExport += "import ComponentLayout from '@/layouts/component.layout'\n"

    fileExport += dependenciesText + '\n\n'
    fileExport += docsText + '\n\n'
    fileExport += propsText + '\n\n'
    fileExport += cssText + '\n\n'

    if (installText) {
        fileExport += `<CodeComponent filename="${slug}.tsx" code="${Buffer.from(installText, 'utf-8').toString(
            'base64'
        )}" />\n`
        fileExport += '```tsx\n'
        fileExport += installText
        fileExport += '```\n\n'
    }

    // iterate over each story
    stories
        .filter((s) => !!s)
        .map((story) => {
            const tsComponent = stripComments(story)
            const tsComponentName = tsComponent
                .split('\n')
                .filter((l) => !!l)[0]
                .split(' ')[2]

            // compile the component to be ES6 compliant
            // this will be displayed in the codeblocks in the MDX files
            const jsComponent = ts.transpileModule(tsComponent, {
                compilerOptions: {
                    jsx: 1,
                    allowJs: true,
                    alwaysStrict: false,
                    module: 99,
                    target: 99,
                    sourceMap: false,
                    declaration: true,
                    forceConsistentCasingInFileNames: false,
                    noImplicitReturns: false,
                    noImplicitThis: false,
                    noImplicitAny: false,
                    strictNullChecks: false,
                    suppressImplicitAnyIndexErrors: true,
                    noUnusedLocals: false,
                    allowSyntheticDefaultImports: true,
                    experimentalDecorators: true,
                    emitDecoratorMetadata: true,
                    skipLibCheck: true,
                    esModuleInterop: true,
                },
            }).outputText

            const name = tsComponentName == 'Usage' ? 'BasicUsage' : tsComponentName
            const doc: any = storyTypeDocs.find((doc) => doc.displayName == tsComponentName)
            const description = doc ? doc.description : null
            const title = doc ? (doc.tags.title ? doc.tags.title : tsComponentName) : tsComponentName
            const example = doc ? (doc.tags.example ? doc.tags.example : null) : null
            const section = title || name

            fileExport += `### ${addSpaces(section)}\n`
            // we generate these on the fly when indexing each page
            // not using <a> tags - but with id attributes
            // fileExport += `<a name="${section.toLowerCase()}"></a>\n`
            fileExport += '\n'

            if (description) fileExport += `> ${description}\n\n`

            // actual component on the page
            fileExport += jsComponent + '\n'
            fileExport += '<div className="story-block">\n'
            fileExport += `<${tsComponentName} />\n`
            fileExport += '</div>\n'
            fileExport += '\n'

            // code snippet
            if (example) {
                fileExport += `<CodeComponent filename="${name}.tsx" code="${Buffer.from(example, 'utf-8').toString(
                    'base64'
                )}" />\n`
                fileExport += example + '\n'
            } else {
                fileExport += `<CodeComponent filename="${name}.tsx" code="${Buffer.from(
                    tsComponent.trim(),
                    'utf-8'
                ).toString('base64')}" />\n`
                fileExport += '\n'
                fileExport += '```tsx\n'
                fileExport += tsComponent.trim() + '\n'
                fileExport += '```\n'
            }
        })

    fileExport += '\n'
    fileExport += `export default ({ children }) => <ComponentLayout docs={docs} props={props} css={css}>{children}</ComponentLayout>`

    fs.writeFileSync(`./docs-output/${slug}.mdx`, fileExport)
}

const generateMdx = (path) => {
    fs.readdirSync(path, { withFileTypes: true }).map(async (d) => {
        if (d.isFile()) return

        const dirName: any = d.name
        const dirPath = path + '/' + dirName
        const { resolve } = require('path')
        const cssFile = dirPath + '/' + dirName + '.css'
        const storyFile = dirPath + '/' + dirName + '.stories.tsx'
        const indexFile = dirPath + '/index.ts'
        const slug = dirName

        if (!dirName.includes('hooks')) {
            // props
            const componentDoc: ComponentDoc[] = docgen.parse(indexFile, parserOptions)
            const propsText = 'export const props = ' + JSON.stringify(componentDoc)

            // import & install
            const imports = `import { ${componentDoc
                .map(({ displayName }) => displayName)
                .join(', ')} } from '@fold-ui/core'`
            const installText = prettier.format(imports, { parser: 'typescript' })

            // CSS variables (might not always exist)
            let cssText = 'export const css = []'
            if (fs.existsSync(cssFile)) {
                const cssFileContents = fs.readFileSync(cssFile, { encoding: 'utf8', flag: 'r' })
                const cssBlocks = cssFileContents
                    .split('\n\n')
                    .filter((block: string) => block.includes(':root') && !!block)
                    .map((block: string) => {
                        return block
                            .split('\n')
                            .filter((line: string) => !line.includes('{') && !line.includes('}'))
                            .map((line: string) => line.trim().replace(';', '').split(': '))
                    })
                cssText = `export const css = ${JSON.stringify(cssBlocks)}\n\n`
            }

            // stories (also might not exist)
            if (fs.existsSync(storyFile)) {
                const storyFileContents = fs.readFileSync(storyFile, { encoding: 'utf8', flag: 'r' })
                const fileParts = storyFileContents.split('\n\n').filter((chunk) => !!chunk)
                const onlyStories = fileParts.filter((_, index) => index > 2).join('\n\n')
                const stories = onlyStories.split('// --')
                const storyFileModulePath = resolve(storyFile)
                const module = require(storyFileModulePath)
                const storyTypeDocs = docgen.parse(storyFile, parserOptions)

                // navigation
                navigation.push({ slug, ...module.docs })

                // MDX file
                createMdxFile(slug, stories, fileParts[0], fileParts[2], propsText, installText, cssText, storyTypeDocs)
            }
        } else {
            const storyFileContents = fs.readFileSync(storyFile, { encoding: 'utf8', flag: 'r' })
            const fileParts = storyFileContents.split('\n\n').filter((chunk) => !!chunk)
            const onlyStories = fileParts.filter((_, index) => index > 2).join('\n\n')
            const stories = onlyStories.split('// --')
            const storyTypeDocs = docgen.parse(storyFile, parserOptions)
            let installText: any = fileParts[0].split('\n')
            installText.pop()
            installText = installText.join('\n')

            createMdxFile(
                slug,
                stories,
                fileParts[0],
                fileParts[2],
                'export const props = []',
                `import {
useCacheValue,
useCheck,
useConnection,
useDragging,
useEvent,
useFocus,
useId,
useInput,
useObserver,
usePubsub,
useStorage,
useTabVisibility,
useTheme,
useTimeout,
useTimer,
useVisibility,
useWindowResize
} from '@fold-ui/core'
`,
                'export const css = []',
                storyTypeDocs
            )
        }

        console.log('compiled ', dirPath)
    })
}

console.log('Make sure Core & Pro components are built (npm run build:prod)')

generateMdx(process.argv[2].split('=')[1])

const navigationFile = prettier.format(`export const navigation = ${JSON.stringify(navigation)}`, {
    parser: 'typescript',
})

fs.writeFileSync(`./docs-output/navigation.ts`, navigationFile)
