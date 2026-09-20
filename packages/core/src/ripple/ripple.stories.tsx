import { Heading, Ripple, Text, View } from '@fold-ui/core'
import React from 'react'

export default {
    title: 'Core/Ripple',
    component: Ripple,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Ripple',
    subtitle: 'The Ripple component creates a layered field of softly pulsing circles.',
    description:
        'Use Ripple as a decorative background for hero content, calls to action, and other prominent surfaces.',
}

export const Usage = () => (
    <View
        position="relative"
        width="100%"
        height={360}
        radius="var(--f-radius-xl)"
        bgToken="base-900"
        style={{ overflow: 'hidden' }}>
        <Ripple
            mainCircleSize={120}
            numCircles={10}
            color="#ffffffaf"
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
                Focus outward
            </Heading>
            <Text colorToken="base-100">Concentric motion adds depth without distracting from content.</Text>
        </View>
    </View>
)
