import { Button, Divider, Pill, View } from '@fold-ui/core'
import React from 'react'

export default {
    title: 'Core/Divider',
    component: Divider,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Divider',
    subtitle: 'The Divider component creates a division between content using either a horizontal or vertical line.',
    description:
        'A Divider can serve a valuable purpose in visually distinguishing between paragraphs, navigation elements, or menu items.',
}

export const Usage = () => <Divider />

// --

/**
 * The Divider line style can be styled by relying on the properties available to border styling.
 */
export const Styles = () => (
    <Divider style={{ '--f-divider-type': 'dashed', '--f-divider-color': 'var(--f-color-accent)' }} />
)

// --

export const CustomContent = () => (
    <Divider
        content={<Button size="xs">2 Nov</Button>}
        contentPosition="10%"
    />
)

// --

export const Vertical = () => {
    return (
        <View
            row
            alignItems="flex-start">
            <View
                p={50}
                flex={1}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo.
            </View>
            <Divider
                direction="vertical"
                content={
                    <Pill
                        size="sm"
                        style={{ transform: 'translateY(-50%)' }}>
                        vs.
                    </Pill>
                }
                contentPosition="50%"
            />
            <View
                p={50}
                flex={1}>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
            </View>
        </View>
    )
}
