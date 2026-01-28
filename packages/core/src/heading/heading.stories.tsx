import React from 'react'
import { Heading, Stack } from '@fold-dev/core'

export default {
    title: 'Core/Heading',
    component: Heading,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Heading',
    subtitle: 'The Heading component represents an HTML heading element.',
    description:
        'The Heading component forms part of the Fold typography system. Please see the Design Token section for information about available options.',
}

export const Usage = () => {
    return (
        <Stack
            direction="vertical"
            spacing={10}>
            <Heading jumbo>Jumbo</Heading>
            <Heading huge>Huge</Heading>
            <Heading>Heading h1</Heading>
            <Heading as="h2">Heading h2</Heading>
            <Heading as="h3">Heading h3</Heading>
            <Heading as="h4">Heading h4</Heading>
            <Heading as="h5">Heading h5</Heading>
            <Heading as="h6">Heading h6</Heading>
        </Stack>
    )
}
