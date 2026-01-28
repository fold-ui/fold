import { Button, Flexer, Heading, Modal, ModalClose, Portal, Text, View, useVisibility } from '@fold-dev/core'
import React from 'react'

export default {
    title: 'Core/Modal',
    component: Modal,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Modal',
    subtitle:
        'The Modal component provides a useful method for displaying content within a secondary window that opens on top of the main window.',
    description:
        'The Modal component is a fundamental element & useful for crafting any sort of dialogues, popovers, lightboxes, or alerts.',
}

export const Usage = () => {
    const { visible, show, hide } = useVisibility(false)

    return (
        <View>
            <Button onClick={show}>Show Modal</Button>

            <Modal
                portal={Portal}
                width="80%"
                style={{ maxWidth: 500 }}
                height="fit-content"
                anchor="middle-center"
                onDismiss={hide}
                isVisible={visible}>
                <ModalClose onClick={hide} />
                <View
                    p={30}
                    column
                    gap={10}
                    width="100%"
                    alignItems="flex-start">
                    <Heading>Not this again...</Heading>
                    <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat.
                    </Text>
                </View>
            </Modal>
        </View>
    )
}

// --

export const PreventDocumentScroll = () => {
    const { visible, show, hide } = useVisibility(false)

    return (
        <View>
            <Button onClick={show}>Show Modal</Button>

            <Modal
                noDocumentScrolling
                portal={Portal}
                width="80%"
                style={{ maxWidth: 500 }}
                height="fit-content"
                anchor="middle-center"
                onDismiss={hide}
                isVisible={visible}>
                <ModalClose onClick={hide} />
                <View
                    p={30}
                    column
                    gap={10}
                    width="100%"
                    alignItems="flex-start">
                    <Heading>Not this again...</Heading>
                    <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat.
                    </Text>
                </View>
            </Modal>
        </View>
    )
}

// --

export const NoOverlay = () => {
    const { visible, show, hide } = useVisibility(false)

    return (
        <View>
            <Button onClick={show}>Show Modal</Button>

            <Modal
                noOverlay
                portal={Portal}
                width="80%"
                style={{ maxWidth: 500 }}
                height="fit-content"
                anchor="middle-center"
                onDismiss={hide}
                isVisible={visible}>
                <ModalClose onClick={hide} />
                <View
                    p={30}
                    column
                    gap={10}
                    width="100%"
                    alignItems="flex-start">
                    <Heading>Not this again...</Heading>
                    <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat.
                    </Text>
                </View>
            </Modal>
        </View>
    )
}

// --

export const WithHeaderAndFooter = () => {
    const { visible, show, hide } = useVisibility(false)

    return (
        <View>
            <Button onClick={show}>Show Modal</Button>

            <Modal
                portal={Portal}
                width="80%"
                style={{ maxWidth: 500 }}
                height="fit-content"
                anchor="middle-center"
                onDismiss={hide}
                isVisible={visible}
                header={
                    <View
                        row
                        gap={10}
                        width="100%">
                        <Heading as="h4">Lorem Ipsum placeholder text</Heading>
                        <Flexer />
                        <ModalClose onClick={hide} />
                    </View>
                }
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
                            Okay
                        </Button>
                    </View>
                }>
                <View
                    p={30}
                    column
                    gap={10}
                    width="100%"
                    alignItems="flex-start">
                    <Heading>Not this again...</Heading>
                    <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat.
                    </Text>
                </View>
            </Modal>
        </View>
    )
}
