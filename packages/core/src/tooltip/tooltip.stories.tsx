import { Pill, Heading, IconLib, Link, Stack, Tooltip, View, Text } from '@fold-ui/core'
import React from 'react'

export default {
    title: 'Core/Tooltip',
    component: Tooltip,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Tooltip',
    subtitle: 'Tooltip components provide users with informative text when they hover over an element.',
    description:
        'Tooltip components are unobtrusive overlays offering supplementary information. Tooltips should not substitute for labels or critical information; users should be able to accomplish their tasks successfully even without relying on a tooltip.',
}

export const Usage = () => (
    <Tooltip
        alwaysVisible
        text="This is the default tooltip with text that stretches past the 500px max-width size.">
        <Pill>Hover here!</Pill>
    </Tooltip>
)

// --

export const Anchors = () => (
    <Stack
        direction="vertical"
        spacing={10}
        p="0 0 0 5rem">
        <Tooltip
            text="Tooltip text"
            anchor="middle-right">
            <Pill>Middle right</Pill>
        </Tooltip>
        <Tooltip
            text="Tooltip text"
            anchor="middle-left">
            <Pill>Middle left</Pill>
        </Tooltip>
        <Tooltip
            text="Tooltip text"
            anchor="bottom-center">
            <Pill>Center bottom</Pill>
        </Tooltip>
        <Tooltip
            text="Tooltip text"
            anchor="top-center">
            <Pill>Center top</Pill>
        </Tooltip>
        <Tooltip
            text="Tooltip text"
            anchor="top-left">
            <Pill>Left top</Pill>
        </Tooltip>
        <Tooltip
            text="Tooltip text"
            anchor="bottom-left">
            <Pill>Left bottom</Pill>
        </Tooltip>
        <Tooltip
            text="Tooltip text"
            anchor="top-right">
            <Pill>Right top</Pill>
        </Tooltip>
        <Tooltip
            text="Tooltip text"
            anchor="bottom-right">
            <Pill>Right bottom</Pill>
        </Tooltip>
    </Stack>
)

// --

export const AlwaysVisible = () => (
    <Stack
        direction="vertical"
        spacing={10}
        p="0 0 0 5rem">
        <Tooltip
            text="Tooltip text"
            anchor="middle-right"
            alwaysVisible>
            <Pill>Middle right</Pill>
        </Tooltip>
        <Tooltip
            text="Tooltip text"
            anchor="middle-left"
            alwaysVisible>
            <Pill>Middle left</Pill>
        </Tooltip>
        <Tooltip
            text="Tooltip text"
            anchor="bottom-center"
            alwaysVisible>
            <Pill>Center bottom</Pill>
        </Tooltip>
        <View height={100} />
        <Tooltip
            text="Tooltip text"
            anchor="top-center"
            alwaysVisible>
            <Pill>Center top</Pill>
        </Tooltip>
        <View height={50} />
        <Tooltip
            text="Tooltip text"
            anchor="top-left"
            alwaysVisible>
            <Pill>Left top</Pill>
        </Tooltip>
        <Tooltip
            text="Tooltip text"
            anchor="bottom-left"
            alwaysVisible>
            <Pill>Left bottom</Pill>
        </Tooltip>
        <Tooltip
            text="Tooltip text"
            anchor="top-right"
            alwaysVisible>
            <Pill>Right top</Pill>
        </Tooltip>
        <Tooltip
            text="Tooltip text"
            anchor="bottom-right"
            alwaysVisible>
            <Pill>Right bottom</Pill>
        </Tooltip>
    </Stack>
)

// --

export const CustomContentAndDelay = () => (
    <Tooltip
        delay={0}
        alwaysVisible
        anchor="middle-right"
        content={
            <View
                row
                gap={5}>
                <IconLib icon="warning" />
                <Text>This is custom content!</Text>
            </View>
        }>
        <Pill>With custom content</Pill>
    </Tooltip>
)
