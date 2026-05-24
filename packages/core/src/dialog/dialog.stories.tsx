import { Button, Dialog, Flexer, Heading, Input, Portal, Stack, Text, useVisibility, View } from '@fold-ui/core'
import React, { useState } from 'react'

export default {
    title: 'Core/Dialog',
    component: Dialog,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Dialog',
    subtitle: 'The Dailog component is a modal window that prompts the user for information or some form of action.',
    description:
        'Dialog modals are useful for interrupting users and gathering information from them before allowing them to proceed. They are commonly used for logging in, message replies or entering data.',
}

export const Usage = () => {
    const { visible, show, hide } = useVisibility(false)

    return (
        <View>
            <Button onClick={show}>Show Dialog</Button>

            <Dialog
                portal={Portal}
                closeButton
                isVisible={visible}
                title="Empty Trash?"
                description="This cannot be undone & you will lose the data forever. Sure you want to continue?"
                onDismiss={hide}
                footer={
                    <View
                        row
                        gap={10}
                        width="100%">
                        <Button onClick={hide}>Cancel</Button>
                        <Flexer />
                        <Button
                            onClick={hide}
                            variant="danger"
                            outline>
                            Empty
                        </Button>
                    </View>
                }
            />
        </View>
    )
}

// --

export const AdvancedLayout = () => {
    const { visible, show, hide } = useVisibility(false)
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')

    return (
        <View>
            <Button onClick={show}>Show Dialog</Button>

            <Dialog
                portal={Portal}
                isVisible={visible}
                onDismiss={hide}
                header={
                    <Stack
                        direction="vertical"
                        spacing={5}>
                        <Heading as="h3">Profile Setup</Heading>
                        <Text
                            size="sm"
                            colorToken="text-weaker">
                            Please enter all your details correctly.
                        </Text>
                    </Stack>
                }
                footer={
                    <View
                        row
                        width="100%">
                        <Button onClick={hide}>Cancel</Button>
                        <Flexer />
                        <Button
                            onClick={hide}
                            variant="accent"
                            outline>
                            Save
                        </Button>
                    </View>
                }>
                <Stack
                    spacing={10}
                    direction="vertical"
                    width="100%">
                    <Input
                        autoFocus
                        size="lg"
                        placeholder="Please enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        size="lg"
                        placeholder="Please enter surname"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                </Stack>
            </Dialog>
        </View>
    )
}
