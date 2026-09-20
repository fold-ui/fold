import { Heading, StarryBackground, Text, View } from '@fold-ui/core'
import React from 'react'

export default {
    title: 'Core/StarryBackground',
    component: StarryBackground,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Starry Background',
    subtitle: 'The StarryBackground component renders a slowly rotating, twinkling canvas star field.',
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
        <StarryBackground color="#aaa4d6" />
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
                color="#fff">
                A quiet orbit
            </Heading>
            <Text color="#cbc8dc">A lightweight star field without a rendering dependency.</Text>
        </View>
    </View>
)
