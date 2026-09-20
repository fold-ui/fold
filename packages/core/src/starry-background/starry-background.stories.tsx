import { Heading, StarryBackground, Text, View } from '@fold-ui/core'
import React from 'react'

export default {
    title: 'Core/StarryBackground',
    component: StarryBackground,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Starry Background',
    subtitle: 'The StarryBackground component renders gently drifting, twinkling stars with a subtle mouse influence.',
    description:
        'It uses the browser canvas directly, pauses outside the viewport, and respects reduced-motion preferences.',
}

export const Usage = () => (
    <View
        position="relative"
        width="100%"
        height={360}
        radius="var(--f-radius-xl)"
        bg="#05040d"
        style={{ overflow: 'hidden' }}>
        <StarryBackground
            color="#aaa4d6"
            count={100}
        />
        <View
            column
            position="relative"
            zIndex={1}
            height="100%"
            alignItems="center"
            justifyContent="center"
            gap={10}>
            <Heading
                as="h2"
                colorToken="base-100">
                A quiet orbit
            </Heading>
            <Text colorToken="base-300">A lightweight star field without a rendering dependency.</Text>
        </View>
    </View>
)
