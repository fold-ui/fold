import { FlickeringGrid, Heading, Text, View } from '@fold-ui/core'
import React from 'react'

export default {
    title: 'Core/FlickeringGrid',
    component: FlickeringGrid,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Flickering Grid',
    subtitle: 'The FlickeringGrid component renders a softly animated field of squares.',
    description:
        'The canvas animation responds to its container size and pauses its drawing work while outside the viewport.',
}

export const Usage = () => (
    <View
        position="relative"
        width="100%"
        height={320}
        radius="var(--f-radius-xl)"
        bg="var(--f-color-surface)"
        style={{ overflow: 'hidden' }}>
        <FlickeringGrid
            squareSize={5}
            gridGap={4}
            flickerChance={0.04}
            color="#8b84ff"
            maxOpacity={0.4}
            style={{ position: 'absolute', inset: 0 }}
        />
        <View
            column
            position="relative"
            zIndex={1}
            height="100%"
            alignItems="center"
            justifyContent="center"
            gap={10}>
            <Heading as="h2">Signals in motion</Heading>
            <Text>The grid adds quiet texture to an empty surface.</Text>
        </View>
    </View>
)
