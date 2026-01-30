import { Button, Collapsible, Heading, Text, View } from '@fold-ui/core'
import React, { useState } from 'react'

export default {
    title: 'Core/Collapsible',
    component: Collapsible,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Collapsible',
    subtitle: 'The Collapsible component toggles the visibility of its content depending on a boolean property.',
    description:
        'Collapsible content is a widely used approach for selectively revealing vital information to users. This technique is useful for navigation segments, FAQ sections, and content that is best kept concealed until it becomes significant.',
}

export const Usage = () => {
    const [open, setOpen] = useState(0)

    const handleClickOne = (e) => setOpen(0)

    const handleClickTwo = (e) => setOpen(1)

    return (
        <View
            column
            gap={20}
            alignItems="flex-start">
            <Button onClick={handleClickOne}>Benefits of collapsable content</Button>
            <Collapsible open={open == 0}>
                <Heading as="h4">Benefits</Heading>
                <Text p="0.5rem 0 0 0">
                    They reduce clutter & keep users from getting overwhelmed by the information at hand.
                </Text>
            </Collapsible>
            <Button onClick={handleClickTwo}>Drawbacks of collapsable content</Button>
            <Collapsible open={open == 1}>
                <Heading as="h4">Drawbacks</Heading>
                <Text p="0.5rem 0 0 0">
                    Can be often overused, especially when the user needs all the information at hand.
                </Text>
            </Collapsible>
        </View>
    )
}
