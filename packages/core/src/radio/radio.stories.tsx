import { FormLabel, Radio, RadioGroup, Stack, useRadio } from '@fold-ui/core'
import React from 'react'

export default {
    title: 'Core/Radio',
    component: Radio,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Radio',
    subtitle:
        'The Radio component is an input element, allowing the user to select a single value from multiple options.',
    description:
        'Radio components are common user interface elements and find their primary application in forms. They are useful when the required input consist of a single value from multiple options.',
}

export const Usage = () => {
    const { option, setOption } = useRadio('cookie')
    return (
        <FormLabel
            row
            gap={10}
            width="fit-content">
            <Radio
                value="cookie"
                checked={option}
                onChange={setOption}
            />
            I prefer cookies!
        </FormLabel>
    )
}

// --

export const Sizes = () => {
    const { option, setOption } = useRadio('three')

    return (
        <Stack spacing={20}>
            <Radio
                value="one"
                size="xs"
                checked={option}
                onChange={setOption}
            />
            <Radio
                value="two"
                size="sm"
                checked={option}
                onChange={setOption}
            />
            <Radio
                value="three"
                size="md"
                checked={option}
                onChange={setOption}
            />
            <Radio
                value="four"
                size="lg"
                checked={option}
                onChange={setOption}
            />
            <Radio
                value="five"
                size="xl"
                checked={option}
                onChange={setOption}
            />
        </Stack>
    )
}

// --

export const Group = () => {
    const { option, setOption } = useRadio('none')

    const handleChange = (e) => setOption(e.target.value)

    return (
        <RadioGroup
            alignItems="flex-start"
            column
            gap={10}>
            <FormLabel
                row
                gap={10}
                width="fit-content">
                <Radio
                    value="redux"
                    checked={option == 'redux'}
                    onChange={handleChange}
                />
                I use Redux
            </FormLabel>
            <FormLabel
                row
                gap={10}
                width="fit-content">
                <Radio
                    value="mobx"
                    checked={option == 'mobx'}
                    onChange={handleChange}
                />
                I use MobX
            </FormLabel>
            <FormLabel
                row
                gap={10}
                width="fit-content">
                <Radio
                    value="none"
                    checked={option == 'none'}
                    onChange={handleChange}
                />
                None of the above
            </FormLabel>
        </RadioGroup>
    )
}

// --

export const States = () => {
    const { option, setOption } = useRadio(null)

    return (
        <Stack spacing={20}>
            <Radio
                checked={option}
                onChange={setOption}
            />
            <Radio
                checked={option}
                onChange={setOption}
                disabled
            />
        </Stack>
    )
}
