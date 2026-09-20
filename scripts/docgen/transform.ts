import * as ts from 'typescript'

const hasExportModifier = (node: ts.Node) =>
    ts.canHaveModifiers(node) && ts.getModifiers(node)?.some(({ kind }) => kind == ts.SyntaxKind.ExportKeyword)

const isComponentName = (name: ts.BindingName | ts.DeclarationName | undefined): name is ts.Identifier =>
    !!name && ts.isIdentifier(name) && /^[A-Z]/.test(name.text)

/**
 * Find the exported React component in a story block without assuming it is the
 * block's first declaration. Stories may define fixtures or helper components first.
 */
export const getStoryComponentName = (source: string) => {
    const sourceFile = ts.createSourceFile('story.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)

    for (const statement of sourceFile.statements) {
        if (!hasExportModifier(statement)) continue

        if (ts.isVariableStatement(statement)) {
            const declaration = statement.declarationList.declarations.find(({ name }) => isComponentName(name))
            if (declaration && ts.isIdentifier(declaration.name)) return declaration.name.text
        }

        if (ts.isFunctionDeclaration(statement) && isComponentName(statement.name)) return statement.name.text
        if (ts.isClassDeclaration(statement) && isComponentName(statement.name)) return statement.name.text
    }

    throw new Error('Every docgen story block must contain an exported component with a capitalized name.')
}

const exportTopLevelVariables: ts.TransformerFactory<ts.SourceFile> = (context) => (sourceFile) => {
    const statements = sourceFile.statements.map((statement) => {
        if (!ts.isVariableStatement(statement) || hasExportModifier(statement)) return statement

        return context.factory.updateVariableStatement(
            statement,
            [context.factory.createModifier(ts.SyntaxKind.ExportKeyword), ...(ts.getModifiers(statement) || [])],
            statement.declarationList
        )
    })

    return context.factory.updateSourceFile(sourceFile, statements)
}

/** Make a story block valid at MDX module scope by exporting its fixtures. */
export const transpileStoryForMdx = (source: string, compilerOptions: ts.CompilerOptions) =>
    ts.transpileModule(source, {
        compilerOptions,
        transformers: { before: [exportTopLevelVariables] },
    }).outputText

/** Strip type-only imports before copying story dependencies into JavaScript MDX. */
export const transpileDependenciesForMdx = (source: string, compilerOptions: ts.CompilerOptions) =>
    ts
        .transpileModule(source, {
            compilerOptions: { ...compilerOptions, verbatimModuleSyntax: true },
        })
        .outputText.trim()
