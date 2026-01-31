import { Button, Copy, IconLib, Pill, useCopy } from '@fold-ui/core'
import React from 'react'

export default {
    title: 'Core/Copy',
    component: Copy,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Copy',
    subtitle: 'Using the Copy component, users can easily duplicate text values to their clipboard.',
    description:
        'The Copy component provides support for overflow scrollbars and includes a hook that allows independent use of the component.',
}

export const Usage = () => (
    <Copy
        label="049d2ee4-6672-11ee-8c99-0242ac120002"
        value="049d2ee4-6672-11ee-8c99-0242ac120002"
    />
)

// --

export const PrefixSuffix = () => (
    <Copy
        value="049d2ee4-6672-11ee-8c99-0242ac120002"
        prefix={<IconLib icon="circle" />}
        suffix={
            <Pill
                size="xs"
                m="0 1rem">
                UUID
            </Pill>
        }
    />
)

// --

export const Hook = () => {
    const { copyToClipboard } = useCopy()

    const handleClick = (e) => copyToClipboard('Any value')

    return <Button onClick={handleClick}>Copy to clipboard</Button>
}
