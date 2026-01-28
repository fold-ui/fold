import { Avatar, Stack, View } from '@fold-dev/core'
import React from 'react'

export default {
    title: 'Core/Stack',
    component: Stack,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Stack',
    subtitle:
        'The Stack component serves as a layout element that evenly distributes child elements with consistent spacing.',
    description:
        'Stacked layouts are a widely used method for achieving consistent visual spacing on either the horizontal or vertical axis, without directly altering child elements.',
}

export const Usage = () => {
    return (
        <Stack spacing={20}>
            <Avatar name="Etienne Dreyer" />
            <Avatar name="Aubrey Moagi" />
            <Avatar name="Patrick Anthony" />
            <Avatar name="Charlene Singh" />
            <Avatar name="Craig Pather" />
        </Stack>
    )
}

// --

export const Vertical = () => {
    return (
        <Stack
            spacing={20}
            direction="vertical">
            <Avatar name="Etienne Dreyer" />
            <Avatar name="Aubrey Moagi" />
            <Avatar name="Patrick Anthony" />
            <Avatar name="Charlene Singh" />
            <Avatar name="Craig Pather" />
        </Stack>
    )
}
