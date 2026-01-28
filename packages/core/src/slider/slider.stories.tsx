import { Slider, Text, useSlider } from '@fold-dev/core'
import React, { useState } from 'react'

export default {
    title: 'Core/Slider',
    component: Slider,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Slider',
    subtitle:
        'The Slider component displays a range of values on a horizontal bar, allowing users to choose either a single or a double value.',
    description:
        'The Slider component represents a more feature rich, non-native alternative to the Range component. It is a common user interface element and is useful for fine-tuning various settings, such as volume control, brightness adjustment, or specifying quantities.',
}

// --

export const Usage = () => {
    const { value, setValue } = useSlider([0.6])

    return (
        <Slider
            onChange={setValue}
            values={value}
            min={0}
            max={1}
            step={0.05}
            anchor={0}
        />
    )
}

// --

export const Disabled = () => {
    const { value, setValue } = useSlider([0.6])

    return (
        <Slider
            onChange={setValue}
            values={value}
            min={0}
            max={1}
            step={0.05}
            anchor={0}
            disabled
        />
    )
}

// --

export const Markers = () => {
    const { value, setValue } = useSlider([0.6])

    return (
        <Slider
            markers={21}
            onChange={setValue}
            values={value}
            min={0}
            max={1}
            step={0.05}
            anchor={0}
        />
    )
}

// --

export const DoubleHandles = () => {
    const { value, setValue } = useSlider([0.6, 0.8])

    return (
        <Slider
            markers={21}
            onChange={setValue}
            values={value}
            min={0}
            max={1}
            step={0.05}
            anchor={0}
        />
    )
}

// --

export const Tooltips = () => {
    const { value, setValue } = useSlider([0.6, 0.9])

    return (
        <Slider
            showTooltip
            markers={21}
            onChange={setValue}
            values={value}
            min={0.5}
            max={1.5}
            step={0.05}
            anchor={0}
            tooltipValue={(value) => Math.round(value * 100) + ' %'}
        />
    )
}

// --

export const TooltipsAlwaysOn = () => {
    const { value, setValue } = useSlider([0.6, 0.9])

    return (
        <Slider
            markers={21}
            showTooltipAlways
            onChange={setValue}
            values={value}
            min={0.5}
            max={1.5}
            step={0.05}
            anchor={0}
            tooltipValue={(value) => Math.round(value * 100) + ' %'}
        />
    )
}

// --

export const WithIcon = () => {
    const { value, setValue } = useSlider([0.6, 0.9])

    return (
        <Slider
            thumbIcons={['sun', 'moon']}
            markers={21}
            onChange={setValue}
            values={value}
            min={0.5}
            max={1.5}
            step={0.05}
            anchor={0}
            style={{ '--f-slider-handle-size': 'var(--f-size-7)' }}
        />
    )
}

// --

export const WithColorAndLabels = () => {
    const { value, setValue } = useSlider([0.6, 0.9])

    return (
        <>
            <Text>
                {Math.round(value[0] * 100) / 100} & {Math.round(value[1] * 100) / 100} with color and labels
            </Text>
            <Slider
                showTooltip
                markers={11}
                onChange={setValue}
                values={value}
                min={0}
                max={1}
                anchor={0}
                labels
                tooltipValue={(value) => Math.round(value * 100) + ' %'}
                labelValue={(value) => Math.round(value * 10) + ' %'}
                style={{
                    '--f-slider-handle-background-color': 'var(--f-color-blue-400)',
                    '--f-slider-fill-background': 'var(--f-color-blue-300)',
                    '--f-slider-handle-background-color-hover': 'var(--f-color-blue-600)',
                }}
            />
        </>
    )
}
