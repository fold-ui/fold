import { Button, Drawer, Heading, Text, View, useVisibility } from '@fold-dev/core'
import React from 'react'

export default {
    title: 'Core/Drawer',
    component: Drawer,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Drawer',
    subtitle: 'The Drawer component displays a Modal attached to one edge of the screen.',
    description:
        "Drawer components provide effective means of presenting content that is not only contextually relevant to the user's current view but also discreet and easily dismissible. Examples of such content include task details, message threads, and topic deep dives.",
}

export const Usage = () => {
    const { visible, show, hide } = useVisibility(false)

    return (
        <View>
            <Button onClick={show}>Show Drawer</Button>

            <Drawer
                anchor="right"
                width="80%"
                style={{ maxWidth: 500 }}
                onDismiss={hide}
                isVisible={visible}>
                <View
                    p={30}
                    column
                    gap={10}
                    width="100%"
                    alignItems="flex-start">
                    <Heading>Context is key...</Heading>
                    <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat.
                    </Text>
                </View>
            </Drawer>
        </View>
    )
}
