import React from 'react'
import * as Token from '@fold-ui/design/tokens'
import { Grid, GridItem } from '@fold-ui/core'

export default {
    title: 'Core/Grid',
    component: Grid,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Grid',
    subtitle:
        'The Grid component wraps "display: grid", arranging child elements within a grid structure comprised of rows and columns.',
    description:
        'The Grid component provides a grid-centric layout system that simplifies website & app design by incorporating rows and columns, eliminating the need for floats and positioning.',
}

export const Usage = () => {
    return (
        <Grid
            gap="20px 40px"
            columns={2}
            minChildWidth={100}>
            <GridItem
                bg={Token.ColorCyan50}
                height={100}>
                One
            </GridItem>
            <GridItem
                bg={Token.ColorCyan100}
                height={100}>
                Two
            </GridItem>
            <GridItem
                bg={Token.ColorCyan200}
                height={100}>
                Three
            </GridItem>
            <GridItem
                bg={Token.ColorCyan300}
                height={100}>
                Four
            </GridItem>
            <GridItem
                bg={Token.ColorCyan400}
                height={100}>
                Five
            </GridItem>
        </Grid>
    )
}

// --

export const AppLayout = () => {
    return (
        <Grid
            gap={10}
            height="50vh"
            templateColumns="1fr 4fr 1fr"
            grid={`
                "header header  header header"
                "nav    content content sidebar"
                "nav    content content sidebar"
                "nav    content content sidebar"
                "nav    content content sidebar"
                "nav    content content ad"
                "footer footer  footer footer"
            `}>
            <GridItem
                area="header"
                bg={Token.ColorCyan500}>
                Header
            </GridItem>
            <GridItem
                area="nav"
                bg={Token.ColorCyan500}>
                Navigation
            </GridItem>
            <GridItem area="content">Content</GridItem>
            <GridItem
                area="sidebar"
                bg={Token.ColorCyan100}>
                Side navigation
            </GridItem>
            <GridItem
                area="ad"
                bg={Token.ColorCyan200}>
                Ad space
            </GridItem>
            <GridItem
                area="footer"
                bg={Token.ColorCyan50}
                onClick={() => console.log('Clicked!')}>
                Footer
            </GridItem>
        </Grid>
    )
}
