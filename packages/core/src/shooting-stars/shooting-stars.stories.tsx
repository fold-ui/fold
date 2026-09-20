import { Heading, ShootingStars, Text, View } from '@fold-ui/core'
import React from 'react'

export default {
    title: 'Core/ShootingStars',
    component: ShootingStars,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Shooting Stars',
    subtitle: 'The ShootingStars component adds a layered field of animated streaks.',
    description: 'Use it as a decorative background inside a positioned, overflow-hidden surface.',
}

export const Usage = () => (
    <View
        position="relative"
        width="100%"
        height={360}
        radius="var(--f-radius-xl)"
        bg="#0e0f15"
        style={{ overflow: 'hidden' }}>
        <ShootingStars />
        <View
            column
            position="relative"
            zIndex={2}
            height="100%"
            alignItems="center"
            justifyContent="center"
            gap={10}>
            <Heading
                as="h2"
                color="#fff">
                Make a wish
            </Heading>
            <Text color="#c9c7d1">A CSS-only animated background.</Text>
        </View>
    </View>
)
