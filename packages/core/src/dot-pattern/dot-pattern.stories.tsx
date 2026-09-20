import { DotPattern, Heading, Text, View } from '@fold-ui/core'
import React from 'react'

export default {
    title: 'Core/DotPattern',
    component: DotPattern,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Dot Pattern',
    subtitle: 'The DotPattern component renders a configurable SVG dot field.',
    description: 'An optional ripple mask adds subtle motion while the SVG remains resolution independent at any size.',
}

export const Usage = () => (
    <View
        position="relative"
        width="100%"
        height={320}
        radius="var(--f-radius-xl)"
        bg="var(--f-color-surface-strong)"
        style={{ overflow: 'hidden' }}>
        <DotPattern
            width={12}
            height={12}
            color="var(--f-color-accent)"
            baseOpacity={0.12}
            rippleOpacity={0.55}
            duration={7}
        />
        <View
            column
            position="relative"
            zIndex={1}
            height="100%"
            alignItems="center"
            justifyContent="center"
            gap={10}>
            <Heading as="h2">A field of focus</Heading>
            <Text>Animated ripples draw attention without obscuring content.</Text>
        </View>
    </View>
)
