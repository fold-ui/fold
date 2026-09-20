import { Aurora, Heading, Text, View } from '@fold-ui/core'
import React from 'react'

export default {
    title: 'Core/Aurora',
    component: Aurora,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Aurora',
    subtitle: 'The Aurora component creates a softly animated, color-derived background.',
    description:
        'Use Aurora behind hero content, calls to action, or other large surfaces that benefit from ambient motion.',
}

export const Usage = () => (
    <View
        position="relative"
        width="100%"
        height={360}
        radius="var(--f-radius-xl)"
        style={{ overflow: 'hidden' }}>
        <Aurora
            baseColor="#f4f2ff"
            variant="orbit"
            style={{ '--f-aurora-height': '100%' }}
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
                color="#30294f">
                Ambient by design
            </Heading>
            <Text color="#534c70">One base color generates the complete aurora palette.</Text>
        </View>
    </View>
)
