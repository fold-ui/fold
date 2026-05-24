import { Range } from '@fold-ui/core'
import React, { useState } from 'react'

export default {
    title: 'Core/Range',
    component: Range,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Range',
    subtitle:
        'The range component allows the user to define a numeric value that must fall within a specified minimum and maximum range.',
    description:
        'The Range component is a wrapper around the HTML Range element & provides a more effective representation of numeric input - it is useful for collecting a numeric input within a specified range.',
}

export const Usage = () => {
    const [value, setValue] = useState(20)

    return (
        <Range
            min={10}
            max={50}
            step={1}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    )
}

// --

export const WithTooltip = () => {
    const [value, setValue] = useState(20)

    return (
        <Range
            min={0}
            max={100}
            step={1}
            value={value}
            showTooltip
            textValue={(val) => Math.round(val) + ' %'}
            onChange={(e) => setValue(e.target.value)}
        />
    )
}

// --

export const WithTooltipAlwaysOn = () => {
    const [value, setValue] = useState(20)

    return (
        <Range
            min={0}
            max={100}
            step={1}
            value={value}
            showTooltipAlways
            tooltipPosition="bottom-center"
            textValue={(val) => Math.round(val) + ' %'}
            onChange={(e) => setValue(e.target.value)}
        />
    )
}
