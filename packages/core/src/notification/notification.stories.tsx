import { Heading, IconLib, Notification, NotificationContent, NotificationIcon, Stack, Text } from '@fold-dev/core'
import React from 'react'

export default {
    title: 'Core/Notification',
    component: Notification,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Notification',
    subtitle:
        "The Notification component embeds a strip in the document, drawing the user's attention to an important piece of information",
    description:
        'Notification components have many uses, but is especially useful in conveying critical information that the user needs to be aware. These can include account actions, missing details & system messages about possible outages, etc.',
}

export const Usage = () => (
    <Notification>
        <NotificationIcon>
            <IconLib icon="info" />
        </NotificationIcon>
        <NotificationContent>
            <Text>Your email address isn't verified. Please verify your email address.</Text>
        </NotificationContent>
        <NotificationIcon>
            <IconLib icon="arrow-right" />
        </NotificationIcon>
    </Notification>
)

// --

export const Variants = () => {
    return (
        <Stack
            direction="vertical"
            spacing={10}>
            <Notification>
                <NotificationIcon>
                    <IconLib icon="warning" />
                </NotificationIcon>
                <NotificationContent>
                    <Heading as="h3">Default</Heading>
                    <Text>Your email address isn't verified. Please verify your email address.</Text>
                </NotificationContent>
                <NotificationIcon>
                    <IconLib icon="x" />
                </NotificationIcon>
            </Notification>

            <Notification variant="accent">
                <NotificationIcon>
                    <IconLib icon="warning" />
                </NotificationIcon>
                <NotificationContent>
                    <Heading as="h3">Accent</Heading>
                    <Text>Your email address isn't verified. Please verify your email address.</Text>
                </NotificationContent>
                <NotificationIcon>
                    <IconLib icon="x" />
                </NotificationIcon>
                <NotificationIcon>
                    <IconLib icon="check" />
                </NotificationIcon>
                <NotificationIcon>
                    <IconLib icon="chevron-right" />
                </NotificationIcon>
            </Notification>

            <Notification variant="success">
                <NotificationIcon>
                    <IconLib icon="warning" />
                </NotificationIcon>
                <NotificationContent>
                    <Heading as="h3">Success</Heading>
                    <Text>Your email address isn't verified. Please verify your email address.</Text>
                </NotificationContent>
                <NotificationIcon>
                    <IconLib icon="x" />
                </NotificationIcon>
            </Notification>

            <Notification variant="neutral">
                <NotificationIcon>
                    <IconLib icon="warning" />
                </NotificationIcon>
                <NotificationContent>
                    <Heading as="h3">Neutral</Heading>
                    <Text>Your email address isn't verified. Please verify your email address.</Text>
                </NotificationContent>
                <NotificationIcon>
                    <IconLib icon="x" />
                </NotificationIcon>
            </Notification>

            <Notification variant="caution">
                <NotificationIcon>
                    <IconLib icon="warning" />
                </NotificationIcon>
                <NotificationContent>
                    <Heading as="h3">Caution</Heading>
                    <Text>Your email address isn't verified. Please verify your email address.</Text>
                </NotificationContent>
                <NotificationIcon>
                    <IconLib icon="x" />
                </NotificationIcon>
            </Notification>

            <Notification variant="warning">
                <NotificationIcon>
                    <IconLib icon="warning" />
                </NotificationIcon>
                <NotificationContent>
                    <Heading as="h3">Warning</Heading>
                    <Text>Your email address isn't verified. Please verify your email address.</Text>
                </NotificationContent>
                <NotificationIcon>
                    <IconLib icon="x" />
                </NotificationIcon>
            </Notification>

            <Notification variant="danger">
                <NotificationIcon>
                    <IconLib icon="warning" />
                </NotificationIcon>
                <NotificationContent>
                    <Heading as="h3">Danger</Heading>
                    <Text>Your email address isn't verified. Please verify your email address.</Text>
                </NotificationContent>
                <NotificationIcon>
                    <IconLib icon="x" />
                </NotificationIcon>
            </Notification>

            <Notification variant="highlight">
                <NotificationIcon>
                    <IconLib icon="warning" />
                </NotificationIcon>
                <NotificationContent>
                    <Heading as="h3">Highlight</Heading>
                    <Text>Your email address isn't verified. Please verify your email address.</Text>
                </NotificationContent>
                <NotificationIcon>
                    <IconLib icon="x" />
                </NotificationIcon>
            </Notification>
        </Stack>
    )
}

// --

export const Accents = () => {
    return (
        <Stack
            direction="vertical"
            spacing={10}>
            <Notification
                variant="success"
                topAccent>
                <NotificationIcon>
                    <IconLib icon="warning" />
                </NotificationIcon>
                <NotificationContent>
                    <Heading as="h3">Success</Heading>
                    <Text>Your email address isn't verified. Please verify your email address.</Text>
                </NotificationContent>
                <NotificationIcon>
                    <IconLib icon="x" />
                </NotificationIcon>
            </Notification>

            <Notification
                variant="accent"
                leftAccent>
                <NotificationIcon>
                    <IconLib icon="warning" />
                </NotificationIcon>
                <NotificationContent>
                    <Heading as="h3">Accent</Heading>
                    <Text>Your email address isn't verified. Please verify your email address.</Text>
                </NotificationContent>
                <NotificationIcon>
                    <IconLib icon="x" />
                </NotificationIcon>
                <NotificationIcon>
                    <IconLib icon="check" />
                </NotificationIcon>
                <NotificationIcon>
                    <IconLib icon="chevron-right" />
                </NotificationIcon>
            </Notification>

            <Notification
                variant="neutral"
                rightAccent>
                <NotificationIcon>
                    <IconLib icon="warning" />
                </NotificationIcon>
                <NotificationContent>
                    <Heading as="h3">Neutral</Heading>
                    <Text>Your email address isn't verified. Please verify your email address.</Text>
                </NotificationContent>
                <NotificationIcon>
                    <IconLib icon="x" />
                </NotificationIcon>
            </Notification>

            <Notification
                variant="caution"
                bottomAccent>
                <NotificationIcon>
                    <IconLib icon="warning" />
                </NotificationIcon>
                <NotificationContent>
                    <Heading as="h3">Caution</Heading>
                    <Text>Your email address isn't verified. Please verify your email address.</Text>
                </NotificationContent>
                <NotificationIcon>
                    <IconLib icon="x" />
                </NotificationIcon>
            </Notification>
        </Stack>
    )
}
