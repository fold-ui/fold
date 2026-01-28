import { Rate } from '@fold-dev/core'
import React, { useState } from 'react'

export default {
    title: 'Core/Rate',
    component: Rate,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Rate',
    subtitle: 'The Rate component generates a row of icons that allows users to choose a rating.',
    description:
        "Ratings offer valuable perspectives on the thoughts and experiences of users when it comes to a product. Furthermore, individuals have the opportunity to provide their own ratings for products they've bought.",
}

export const Usage = () => {
    const [value, setValue] = useState(3.5)

    return (
        <Rate
            icon="star"
            value={value}
            onChange={setValue}
        />
    )
}

// --

export const IconAmount = () => {
    const [value, setValue] = useState(3.5)

    return (
        <Rate
            icon="circle"
            value={value}
            onChange={setValue}
            max={10}
        />
    )
}

// --

export const CustomColor = () => {
    const [value, setValue] = useState(3.5)

    return (
        <Rate
            style={{ '--f-rate-color-active': 'var(--f-color-yellow-400)' }}
            icon="star"
            value={value}
            onChange={setValue}
            size="lg"
        />
    )
}
