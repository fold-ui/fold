import { IconLib, Option, Options, Stack, Text, View } from '@fold-dev/core'
import React, { useState } from 'react'

export default {
    title: 'Core/Option',
    component: Option,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Option',
    subtitle: 'The Option component provides the user with the ability to switch between multiple choices.',
    description:
        'Option components offer users a constrained selection of choices, which prove valuable when you need to restrict input. They are especially useful for facilitating the selection of date range presets or updating system settings.',
}

export const Usage = () => {
    const [option, setOption] = useState(1)

    return (
        <View
            p="1rem 0"
            width="100%"
            className="f-overflow-x-auto">
            <Options
                selected={option}
                onOptionChange={setOption}>
                <Option>Redux</Option>
                <Option>MobX</Option>
                <Option>Zustand</Option>
                <Option>Context</Option>
                <Option>None</Option>
            </Options>
        </View>
    )
}

// --

export const States = () => {
    const [option, setOption] = useState(1)

    return (
        <View
            p="1rem 0"
            width="100%"
            className="f-overflow-x-auto">
            <Options
                animated
                selected={option}
                onOptionChange={setOption}>
                <Option>Redux</Option>
                <Option>MobX</Option>
                <Option>Zustand</Option>
                <Option disabled>Context</Option>
                <Option>None</Option>
            </Options>
        </View>
    )
}

// --

export const Sizes = () => {
    const [option, setOption] = useState(1)

    return (
        <View
            p="1rem 0"
            width="100%"
            className="f-overflow-x-auto">
            <Stack
                direction="vertical"
                spacing={10}>
                <Options
                    selected={option}
                    onOptionChange={setOption}
                    size="xs">
                    <Option>Redux</Option>
                    <Option>MobX</Option>
                    <Option>Zustand</Option>
                    <Option>Context</Option>
                    <Option>None</Option>
                </Options>
                <Options
                    selected={option}
                    onOptionChange={setOption}
                    size="sm">
                    <Option>Redux</Option>
                    <Option>MobX</Option>
                    <Option>Zustand</Option>
                    <Option>Context</Option>
                    <Option>None</Option>
                </Options>
                <Options
                    selected={option}
                    onOptionChange={setOption}
                    size="md">
                    <Option>Redux</Option>
                    <Option>MobX</Option>
                    <Option>Zustand</Option>
                    <Option>Context</Option>
                    <Option>None</Option>
                </Options>
                <Options
                    selected={option}
                    onOptionChange={setOption}
                    size="lg">
                    <Option>Redux</Option>
                    <Option>MobX</Option>
                    <Option>Zustand</Option>
                    <Option>Context</Option>
                    <Option>None</Option>
                </Options>
                <Options
                    selected={option}
                    onOptionChange={setOption}
                    size="xl">
                    <Option>Redux</Option>
                    <Option>MobX</Option>
                    <Option>Zustand</Option>
                    <Option>Context</Option>
                    <Option>None</Option>
                </Options>
            </Stack>
        </View>
    )
}

// --

export const WithPrefixAndSuffix = () => {
    const [option, setOption] = useState(1)

    return (
        <View
            p="1rem 0"
            width="100%"
            className="f-overflow-x-auto">
            <Options
                animated
                selected={option}
                onOptionChange={setOption}>
                <Option prefix={<IconLib icon="circle" />}>Redux</Option>
                <Option prefix={<IconLib icon="circle" />}>MobX</Option>
                <Option prefix={<IconLib icon="circle" />}>Zustand</Option>
                <Option prefix={<IconLib icon="circle" />}>Context</Option>
                <Option
                    suffix={
                        <Text
                            size="sm"
                            colorToken="inherit">
                            (really?)
                        </Text>
                    }>
                    None
                </Option>
            </Options>
        </View>
    )
}
