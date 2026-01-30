import { Checkbox, CheckboxAlt, FormLabel, Stack, useCheck } from '@fold-ui/core'
import * as Token from '@fold-ui/design/tokens'
import React from 'react'

export default {
    title: 'Core/Checkbox',
    component: Checkbox,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Checkbox',
    subtitle:
        'The Checkbox component is an input element, allowing the user to select single values for submission in a form',
    description:
        'Checkboxes are common user interface elements and find their primary application in forms; however, their use extends beyond this context. They are useful when the required input consist of binary values.',
}

export const Usage = () => {
    const { checked, check } = useCheck(true)

    return (
        <FormLabel
            row
            gap={10}
            width="fit-content">
            <Checkbox
                checked={checked}
                onChange={check}
            />
            Send me marketing updates
        </FormLabel>
    )
}

// --

export const Sizes = () => {
    const { checked, check } = useCheck(true)

    return (
        <Stack spacing={20}>
            <Checkbox
                size="xs"
                checked={checked}
                onChange={check}
            />
            <Checkbox
                size="sm"
                checked={checked}
                onChange={check}
            />
            <Checkbox
                size="md"
                checked={checked}
                onChange={check}
            />
            <Checkbox
                size="lg"
                checked={checked}
                onChange={check}
            />
            <Checkbox
                size="xl"
                checked={checked}
                onChange={check}
            />
        </Stack>
    )
}

// --

export const States = () => {
    const { checked, check } = useCheck(true)

    return (
        <Stack spacing={20}>
            <Checkbox
                checked={checked}
                onChange={check}
            />
            <Checkbox
                checked={checked}
                onChange={check}
                indeterminate
            />
            <Checkbox
                checked={checked}
                onChange={check}
                disabled
            />
            <Checkbox
                checked={checked}
                onChange={check}
                disabled
                indeterminate
            />
        </Stack>
    )
}

// --

/**
 * The Checkbox alternative offers a greater degree of customization, making it particularly well-suited for standalone components such as tasks.
 */
export const Alternative = () => {
    const { checked, check } = useCheck(true)
    return (
        <Stack spacing={20}>
            <CheckboxAlt
                onChange={check}
                checked={checked}
            />
            <CheckboxAlt
                onChange={check}
                checked={checked}
                color={Token.ColorBlue500}
            />
            <CheckboxAlt
                onChange={check}
                checked={checked}
                icon="x"
            />
        </Stack>
    )
}
