import { getStoryComponentName, transpileDependenciesForMdx, transpileStoryForMdx } from './transform'
import * as ts from 'typescript'

const compilerOptions: ts.CompilerOptions = {
    jsx: ts.JsxEmit.React,
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ESNext,
}

describe('docgen MDX transforms', () => {
    it('finds the exported story component after typed fixtures', () => {
        const story = `
const data: ChartData[] = []
const options = { legend: true }

export const Usage = () => <Chart data={data} options={options} />
`

        expect(getStoryComponentName(story)).toBe('Usage')
    })

    it('exports top-level fixtures so MDX parses them as module code', () => {
        const output = transpileStoryForMdx(
            `
const data: ChartData[] = []
export const Usage = () => <Chart data={data} />
`,
            compilerOptions
        )

        expect(output).toContain('export const data = []')
        expect(output).toContain('export const Usage =')
    })

    it('removes type-only imports from generated MDX dependencies', () => {
        const output = transpileDependenciesForMdx(
            `import { Chart, type ChartData } from '@fold-ui/core'`,
            compilerOptions
        )

        expect(output).toContain("import { Chart } from '@fold-ui/core'")
        expect(output).not.toContain('ChartData')
    })
})
