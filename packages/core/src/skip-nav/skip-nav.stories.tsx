import { Heading, Logo, SkipNav, SkipNavMain, Stack, Text } from '@fold-ui/core'
import React from 'react'

export default {
    title: 'Core/SkipNav',
    component: SkipNav,
    excludeStories: 'docs',
}

export const docs = {
    title: 'SkipNav',
    subtitle:
        'The SkipNav component serves as the destination for a link that allows keyboard focus to be directed to the initial element of the main content.',
    description:
        "According to WebAim.org's guidelines for WCAG 2.4.1 (Bypass Blocks - Level A), it is highly advisable to incorporate a skip link on webpages. This skip link allows users to easily bypass content that may appear on multiple pages & should be placed as the first DOM element on the page.",
}

export const Usage = () => {
    return (
        <Stack
            direction="vertical"
            spacing={10}
            noStretch>
            <SkipNav>Skip To Content</SkipNav>
            <Logo />
            <SkipNavMain />
            <Heading>Using the SkipNav component</Heading>
            <Text>Using the SkipNav component a user can be directed to where the content starts.</Text>
        </Stack>
    )
}
