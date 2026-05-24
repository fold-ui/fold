import { Button, Editable, Text, View } from '@fold-ui/core'
import React, { useRef } from 'react'

export default {
    title: 'Core/Editable',
    component: Editable,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Editable',
    subtitle: 'The Editable component enables users to edit simple text content inline.',
    description:
        'The Editable component is useful for providing users an inline experience for editing simple text content. It is suited to headings, names & other text content that is presented on a single line. Editable is not suited to large text blocks where the user needs a more traditional text input element.',
}

export const Usage = () => {
    const handleChange = (content) => console.log('content changed!', content)

    const handleCancel = (previousContent) => console.log(previousContent)

    return (
        <Editable
            onChange={handleChange}
            onCancel={handleCancel}>
            <Text>This is something that is editable</Text>
        </Editable>
    )
}

// --

export const FocusEvent = () => {
    const editableRef = useRef({ click: () => null })

    const handleChange = (content) => console.log('content changed!', content)

    const handleCancel = (previousContent) => console.log(previousContent)

    const handleClick = (e) => editableRef.current.click()

    return (
        <View
            row
            justifyContent="flex-start"
            gap={10}>
            <Button onClick={handleClick}>Focus Now</Button>
            <Editable
                onChange={handleChange}
                onCancel={handleCancel}
                ref={editableRef}>
                <Text>This is something that is editable</Text>
            </Editable>
        </View>
    )
}

// --

export const StartAtEnd = () => {
    const handleChange = (content) => console.log('content changed!', content)

    const handleCancel = (previousContent) => console.log(previousContent)

    return (
        <Editable
            cursorEnd
            onChange={handleChange}
            onCancel={handleCancel}>
            <Text>This is something that is editable</Text>
        </Editable>
    )
}

// --

export const SelectOnFocus = () => {
    const handleChange = (content) => console.log('content changed!', content)

    const handleCancel = (previousContent) => console.log(previousContent)

    return (
        <Editable
            selectOnFocus
            onChange={handleChange}
            onCancel={handleCancel}>
            <Text>This is something that is editable</Text>
        </Editable>
    )
}
