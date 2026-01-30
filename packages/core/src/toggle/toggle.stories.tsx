import { DarkModeToggle, IconLib, Label, Stack, Toggle, View, useCheck } from '@fold-ui/core'
import React from 'react'

export default {
    title: 'Core/Toggle',
    component: Toggle,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Toggle',
    subtitle: 'The Toggle component swiftly transitions between two potential states (on/off).',
    description:
        'The Toggle component allows users to switch something between an on and off state, much like a light switch. Unlike a Checkbox, which is used for making selections, a Toggle is used to activate or deactivate a feature or function.',
}

export const Usage = () => {
    const { checked, check } = useCheck(false)
    return (
        <Toggle
            onChange={check}
            on={checked}
        />
    )
}

// --

export const Sizes = () => {
    const { checked, check } = useCheck(false)

    return (
        <Stack
            spacing={10}
            direction="vertical">
            <Toggle
                onChange={check}
                on={checked}
                size="xs"
            />
            <Toggle
                onChange={check}
                on={checked}
                size="sm"
            />
            <Toggle
                onChange={check}
                on={checked}
                size="md"
            />
            <Toggle
                onChange={check}
                on={checked}
                size="lg"
            />
            <Toggle
                onChange={check}
                on={checked}
                size="xl"
            />
        </Stack>
    )
}

// --

export const PrefixAndSuffix = () => {
    const { checked, check } = useCheck(false)

    return (
        <Stack
            spacing={10}
            direction="vertical">
            <Toggle
                onChange={check}
                on={checked}
                prefix={<IconLib icon="sun" />}
            />
            <Toggle
                onChange={check}
                on={checked}
                suffix={<IconLib icon="moon" />}
            />
            <Toggle
                onChange={check}
                on={checked}
                prefix={<IconLib icon="sun" />}
                suffix={<IconLib icon="moon" />}
            />
        </Stack>
    )
}

// --

export const WithLabel = () => {
    const { checked, check } = useCheck(false)

    return (
        <View
            row
            gap={10}
            justifyContent="flex-start">
            <Toggle
                id="one"
                onChange={check}
                on={checked}
            />
            <Label htmlFor="one">Message when added to group</Label>
        </View>
    )
}

// --

export const States = () => {
    const { checked, check } = useCheck(false)

    return (
        <Stack spacing={10}>
            <Toggle
                onChange={check}
                on={checked}
            />
            <Toggle
                onChange={check}
                on={checked}
                disabled
            />
        </Stack>
    )
}

// --

/**
 * Fold includes a dark-mode toggle that automatically toggles between dark & light modes.
 */
export const DarkMode = () => {
    return <DarkModeToggle />
}
