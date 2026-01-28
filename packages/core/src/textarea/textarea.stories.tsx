import { IconLib, InputControl, InputPrefix, Textarea, View } from '@fold-dev/core'
import React, { useState } from 'react'

export default {
    title: 'Core/Textarea',
    component: Textarea,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Textarea',
    subtitle: 'The Textarea component represents a multi-line plain-text input element.',
    description:
        'The Textarea component is useful for enabling users to input a substantial amount of unstructured text, such as a comment on a review or feedback form.',
}

export const Usage = () => {
    const [text, setText] = useState('')

    return (
        <Textarea
            value={text}
            height={100}
            className="f-scrollbar"
            placeholder="Write message..."
            onChange={(e) => setText(e.target.value)}
        />
    )
}

// --

export const SelectOnFocus = () => {
    const [text, setText] = useState('Hey there!')

    return (
        <Textarea
            selectOnFocus
            value={text}
            height={100}
            className="f-scrollbar"
            placeholder="Write message..."
            onChange={(e) => setText(e.target.value)}
        />
    )
}

// --

export const Disabled = () => {
    const [text, setText] = useState('')

    return (
        <Textarea
            disabled
            value={text}
            height={100}
            className="f-scrollbar"
            placeholder="Write message..."
            onChange={(e) => setText(e.target.value)}
        />
    )
}

// --

export const AutoAdjustHeight = () => {
    const [text, setText] = useState('')

    return (
        <Textarea
            autoAdjust
            value={text}
            maxHeight={300}
            className="f-scrollbar"
            placeholder="Write message..."
            onChange={(e) => setText(e.target.value)}
        />
    )
}

// --

export const Sizes = () => {
    const [text, setText] = useState('')

    return (
        <View
            column
            alignItems="flex-start"
            gap={10}>
            <Textarea
                size="xs"
                value={text}
                height={100}
                className="f-scrollbar"
                placeholder="Write message..."
                onChange={(e) => setText(e.target.value)}
            />
            <Textarea
                size="sm"
                value={text}
                height={100}
                className="f-scrollbar"
                placeholder="Write message..."
                onChange={(e) => setText(e.target.value)}
            />
            <Textarea
                size="md"
                value={text}
                height={100}
                className="f-scrollbar"
                placeholder="Write message..."
                onChange={(e) => setText(e.target.value)}
            />
            <Textarea
                size="lg"
                value={text}
                height={100}
                className="f-scrollbar"
                placeholder="Write message..."
                onChange={(e) => setText(e.target.value)}
            />
            <Textarea
                size="xl"
                value={text}
                height={100}
                className="f-scrollbar"
                placeholder="Write message..."
                onChange={(e) => setText(e.target.value)}
            />
        </View>
    )
}

// --

/**
 * The `InputControl` component can also be used to create a `Textarea` with a prefix or suffix.
 */
export const WithInputControl = () => {
    const [text, setText] = useState('')

    return (
        <InputControl>
            <InputPrefix>
                <IconLib icon="circle" />
            </InputPrefix>
            <Textarea
                autoAdjust
                value={text}
                maxHeight={300}
                className="f-scrollbar"
                placeholder="Write message..."
                onChange={(e) => setText(e.target.value)}
            />
        </InputControl>
    )
}
