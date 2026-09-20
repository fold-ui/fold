import { AnimatedGridPattern, Heading, Text, View } from '@fold-ui/core'
import React from 'react'

export default {
    title: 'Core/AnimatedGridPattern',
    component: AnimatedGridPattern,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Animated Grid Pattern',
    subtitle: 'The AnimatedGridPattern component creates a perspective grid with softly fading squares.',
    description:
        'Use it as a decorative background inside calls to action, hero content, and other positioned surfaces.',
}

export const Usage = () => (
    <View
        position="relative"
        width="100%"
        height={360}
        radius="var(--f-radius-xl)"
        bgToken="brand-700"
        style={{ overflow: 'hidden' }}>
        <AnimatedGridPattern
            width={44}
            height={44}
            numSquares={24}
            maxOpacity={0.24}
            duration={5}
            repeatDelay={1}
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
                Ready in minutes
            </Heading>
            <Text colorToken="base-200">Animated squares bring depth to important content.</Text>
        </View>
    </View>
)
