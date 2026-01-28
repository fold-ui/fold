import { Resizable, ResizableRail, Text, View } from '@fold-dev/core'
import React from 'react'

export default {
    title: 'Core/Resizable',
    component: Resizable,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Resizable',
    subtitle: 'The Resizable component creates an adjustable container that can be resized by the user.',
    description:
        'Resizable components are a common feature of navigations that the user can expand or contract. They also serve a valuable role in establishing size relationships among enclosed elements (see the Splitter component).',
}

export const Usage = () => (
    <View height={300}>
        <Resizable
            p={20}
            width={300}
            max={350}
            min={250}
            height={300}
            direction="horizontal"
            bgToken="surface-strong">
            <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
            </Text>
        </Resizable>
    </View>
)

// --

export const Vertical = () => (
    <View height={300}>
        <Resizable
            p={20}
            width={300}
            height={300}
            direction="vertical"
            bgToken="surface-strong">
            <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
            </Text>
        </Resizable>
    </View>
)

// --

/**
 * The `ResizableRail` component can be used as a standalone component to enable a greater degree of flexibility & customisation.
 */
export const Rail = () => (
    <View
        width="100%"
        height={500}
        style={{ maxWidth: 500 }}
        bgToken="surface-strong"
        position="relative">
        <ResizableRail
            transparent
            position="end"
            direction="horizontal"
            onChange={({ x, y }) => console.log(x, y)}
        />
    </View>
)
