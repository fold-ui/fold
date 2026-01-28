import * as Token from '@fold-dev/design/tokens'
import { Avatar, IconLib, Pill, Stack } from '@fold-dev/core'
import React from 'react'

export default {
    title: 'Core/Pill',
    component: Pill,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Pill',
    subtitle:
        'The Pill component serves to convey the status of something, whether it be an entry on a to-do list or user associated with a piece of content.',
    description:
        "Pill components highlight fresh and crucial information, effectively directing the user's focus towards significant content that might go unnoticed otherwise.",
}

export const Usage = () => (
    <Pill
        prefix={
            <Avatar
                name="Patrick Anthony"
                size="sm"
                src="/men/09.jpg"
            />
        }>
        Patrick Anthony
    </Pill>
)

// --

export const Sizes = () => (
    <Stack
        spacing={5}
        wrap="wrap">
        <Pill size="xs">React</Pill>
        <Pill size="sm">VueJS</Pill>
        <Pill size="md">Svelte</Pill>
        <Pill size="lg">SolidJS</Pill>
        <Pill size="xl">Angular</Pill>
    </Stack>
)

// --

export const WithPrefixAndSuffix = () => (
    <Stack
        spacing={5}
        wrap="wrap">
        <Pill
            suffix={
                <IconLib
                    icon="bin"
                    size="sm"
                />
            }>
            Craig Pather
        </Pill>
        <Pill
            suffix={
                <Avatar
                    name="Etienne Dreyer"
                    size="sm"
                    src="/men/01.jpg"
                />
            }>
            Etienne Dreyer
        </Pill>
        <Pill
            prefix={
                <Avatar
                    name="Patrick Anthony"
                    size="sm"
                    src="/men/09.jpg"
                />
            }
            suffix={
                <IconLib
                    icon="bin"
                    size="sm"
                />
            }>
            Patrick Anthony
        </Pill>
        <Pill
            prefix={
                <IconLib
                    icon="user"
                    size="sm"
                />
            }
            suffix={
                <IconLib
                    icon="bin"
                    size="sm"
                />
            }>
            Johannes du Plessis
        </Pill>
    </Stack>
)

// --

export const Styles = () => (
    <Stack
        spacing={5}
        wrap="wrap">
        <Pill>React</Pill>
        <Pill subtle>VueJS</Pill>
        <Pill outline>Svelte</Pill>
        <Pill solid>SolidJS</Pill>
    </Stack>
)

// --

/**
 * The Pill component takes a hex-code value for the color.
 */
export const Color = () => (
    <Stack
        spacing={5}
        wrap="wrap">
        <Pill color={Token.ColorBlue200}>React</Pill>
        <Pill
            outline
            color={Token.ColorTeal500}>
            Svelte
        </Pill>
        <Pill
            subtle
            color={Token.ColorViolet500}>
            Angular
        </Pill>
        <Pill
            solid
            color={Token.ColorPink500}>
            VueJS
        </Pill>
    </Stack>
)
