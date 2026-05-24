import { Affix, Text, View } from '@fold-ui/core'
import React from 'react'

export default {
    title: 'Core/Affix',
    component: Affix,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Affix',
    subtitle:
        'The affix component acts as a positioning container that allows an element to behave as if it were relatively positioned until it reaches a specified scroll position, at which point it becomes fixed.',
    description:
        'Affix components are useful for creating navigation menus, headers, or sidebars that stay visible as users scroll through content, improving the overall user experience. It is a wrapper around the "sticky" CSS position property.',
}

export const Usage = () => {
    return (
        <View
            position="relative"
            className="f-overflow-y-auto"
            height={300}
            radius="var(--f-radius)"
            bgToken="surface-strong">
            <Affix
                bgToken="surface-strong"
                zIndex={1}>
                {(stuck) => <Text p={20}>{stuck ? 'Content when stuck' : 'Default content'}</Text>}
            </Affix>
            <View
                height={500}
                position="relative"
                zIndex={0}>
                <Text
                    p={20}
                    size="xs"
                    fontWeight="bold"
                    colorToken="accent">
                    Scroll down inside this container.
                </Text>
            </View>
        </View>
    )
}
