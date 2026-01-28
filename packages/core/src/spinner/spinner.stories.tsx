import { Spinner, SpinnerOverlay, Text, View } from '@fold-dev/core'
import React from 'react'

export default {
    title: 'Core/Spinner',
    component: Spinner,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Spinner',
    subtitle:
        'The Spinner component is a rotating SVG graphic that informs users that content is currently in the process of loading.',
    description:
        'Spinners offer a visual indicator to the user that something is loading or processing. Spinners are useful when a request has been made to the server or a long-running calculation is taking place.',
}

export const Usage = () => <Spinner />

// --

export const Sizes = () => (
    <View
        row
        justifyContent="flex-start"
        gap={10}>
        <Spinner size="xs" />
        <Spinner size="sm" />
        <Spinner
            size="md"
            color="var(--f-color-electric-400)"
        />
        <Spinner size="lg" />
        <Spinner size="xl" />
    </View>
)

// --

export const Overlay = () => (
    <View
        width={500}
        height={500}
        position="relative"
        bgToken="surface-strong">
        <SpinnerOverlay
            size="lg"
            thickness={4}
        />
    </View>
)
