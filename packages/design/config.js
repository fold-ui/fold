const StyleDictionary = require('style-dictionary')
const chroma = require('chroma-js')
const fs = require('fs')
const dir = 'tokens/theme'
const extension = '.json'
const format = {
    cssTheme: (dictionary, options) => {
        const theme = dictionary.allTokens[0].path[0]
        const tokens = dictionary.allTokens.map((token) => {
            return {
                ...token,
                value: token.value,
                name: token.name.replace(`-${theme}`, ''),
            }
        })
        const file = StyleDictionary.format['css/variables']({ dictionary: { allTokens: tokens } })
        const dataAttribute = `[data-theme='${theme}']`

        if (theme == 'fold') {
            return file.replace(':root', `:root, ${dataAttribute}`)
        } else {
            return file.replace(':root', dataAttribute)
        }
    },
    cssShorthand: (cssShorthand = (dictionary, options) => {
        return dictionary.allProperties
            .map((token) => {
                const { name, value } = token
                const lastTokenName = name.split('-')[name.split('-').length - 1]
                const secondLastTokenName = name.split('-')[name.split('-').length - 2]

                if (name.includes('color')) {
                    if (secondLastTokenName != 'color') {
                        return `
                            .f-color-${secondLastTokenName}-${lastTokenName} { color: ${value}; }
                            .f-bg-color-${secondLastTokenName}-${lastTokenName} { background-color: ${value}; }
                        `
                    } else {
                        return `
                            .f-color-${lastTokenName} { color: ${value}; }
                            .f-bg-color-${lastTokenName} { background-color: ${value}; }
                        `
                    }
                }

                if (name.includes('line-height')) {
                    return `\n.f-line-${lastTokenName} { line-height: ${value}; }`
                }

                if (name.includes('letter-spacing')) {
                    return `\n.f-letter-${lastTokenName} { letter-spacing: ${value}; }`
                }

                if (name.includes('shadow')) {
                    return `\n.f-shadow-${lastTokenName} { box-shadow: ${value}; }`
                }

                if (name.includes('radius')) {
                    return `\n.f-radius-${lastTokenName} { border-radius: ${value}; }`
                }

                if (name.includes('blur')) {
                    return `\n.f-blur-${lastTokenName} { filter: blur(${value}); }`
                }

                if (name.includes('font-weight')) {
                    return `\n.f-weight-${lastTokenName} { font-weight: ${value}; }`
                }

                if (name.includes('font-size')) {
                    return `\n.f-size-${lastTokenName} { font-size: ${value}; }`
                }

                if (name.includes('font')) {
                    return `\n.f-font-${lastTokenName} { font-family: ${value}; }`
                }

                if (name.includes('icon-size')) {
                    return `\n.f-icon-${lastTokenName} { width: ${value}; height: ${value}; }`
                }

                if (name.includes('size')) {
                    return `
                    .f-h-${lastTokenName} { height: ${value}; }
                    .f-w-${lastTokenName} { width: ${value}; }
                    `
                }

                if (name.includes('space') && !name.includes('inset')) {
                    return `
                    .f-m-${lastTokenName} { margin: ${value}; }
                    .f-mt-${lastTokenName} { margin-top: ${value}; }
                    .f-mb-${lastTokenName} { margin-bottom: ${value}; }
                    .f-ml-${lastTokenName} { margin-left: ${value}; }
                    .f-mr-${lastTokenName} { margin-right: ${value}; }
                    .f-p-${lastTokenName} { padding: ${value}; }
                    .f-pt-${lastTokenName} { padding-top: ${value}; }
                    .f-pb-${lastTokenName} { padding-bottom: ${value}; }
                    .f-pl-${lastTokenName} { padding-left: ${value}; }
                    .f-pr-${lastTokenName} { padding-right: ${value}; }
                    `
                }

                if (name.includes('space') && name.includes('inset')) {
                    return `
                    .f-m-inset-${lastTokenName} { margin: ${value}; }
                    .f-p-inset-${lastTokenName} { padding: ${value}; }
                    `
                }

                if (name.includes('index')) {
                    return `\n.f-index-${lastTokenName} { z-index: ${value}; }`
                }

                return ''
            })
            .join('')
    }),
}

const oklchToHex = (oklchStr) => {
    try {
      const match = oklchStr.match(/oklch\(([^)]+)\)/)

      if (!match) {
        throw new Error("Invalid OKLCH format")
      }
  
      const [l, c, h] = match[1].split(/\s+/).map(Number)
      const hex = chroma.oklch(l, c, h).hex()

      return hex
    } catch (error) {
      console.error("Error converting OKLCH string to HEX:", error);
      return null
    }
  }

const files = fs
    .readdirSync(dir)
    .filter((fn) => fn.endsWith(extension))
    .map((filename) => {
        const theme = filename.split('.')[0]

        return {
            filter: (token) => token.filePath.includes(filename),
            destination: `tokens-${theme}.css`,
            format: 'cssTheme',
        }
    })

module.exports = {
    source: ['tokens/**/*.json'],
    transform: {
        'colorTransform': {
            type: `value`,
            transitive: true,
            matcher: (token) => token.attributes.category == 'color',
            transformer: (token) => {
                if (token.value.includes('oklch')) return token.value
                const [l, c, h] = chroma(token.value).oklch()
                return `oklch(${l.toFixed(3)} ${c.toFixed(3)} ${isNaN(h) ? 0 : h.toFixed(1)})`
            },
        },
        'color/css': Object.assign({}, StyleDictionary.transform[`color/css`], {
            transitive: true,
        }),
    },
    format,
    platforms: {
        js: {
            transforms: [`attribute/cti`, `name/cti/pascal`, `colorTransform`],
            transformGroup: 'js',
            buildPath: '',
            files: [
                {
                    destination: 'tokens.js',
                    format: 'javascript/module-flat',
                },
                {
                    destination: 'tokens-es6.js',
                    format: 'javascript/es6',
                },
            ],
        },
        css: {
            transforms: [`attribute/cti`, `name/cti/kebab`, `colorTransform`],
            transformGroup: 'css',
            buildPath: '',
            prefix: 'f-',
            files: [
                // Generates the shorthand.css file
                // Disabled for now because we don't use them yet
                // (there are filesize considerations)
                // {
                //     destination: 'shorthand.css',
                //     format: 'cssShorthand',
                // },
                // Generates the tokens.css file
                {
                    filter: (token) => !token.filePath.includes('theme'),
                    destination: 'tokens.css',
                    format: 'css/variables',
                },
                // Generates the tokens-[THEME].css files
                ...files,
            ],
        },
    },
}
