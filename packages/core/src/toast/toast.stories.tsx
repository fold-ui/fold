import { Button, IconLib, Stack, Text, Toast, ToastAnchor, useToast } from '@fold-dev/core'
import React from 'react'

export default {
    title: 'Components/Toast',
    component: Toast,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Toast',
    subtitle:
        'The Toast component is a subtle message that displays at the side of the screen without causing disruption.',
    description:
        'Toast components are useful for conveying non-essential confirmations or notifications, offering easily digestible feedback to the user.',
}

export const Usage = () => (
    <Toast
        message="Converting your document to PDF format."
        prefix={<IconLib icon="warning" />}
    />
)

// --

export const ProgressMeterAndIcon = () => (
    <Toast
        message="Converting your document to PDF format."
        prefix={<IconLib icon="warning" />}
        showProgress={true}
        delay={2000}
    />
)

// --

export const Variants = () => (
    <Stack
        direction="vertical"
        spacing={10}>
        <Toast
            message="Converting your document to PDF format."
            prefix={<IconLib icon="warning" />}
            delay={1000}
            showProgress={true}
        />
        <Toast
            message="Converting your document to PDF format."
            prefix={<IconLib icon="warning" />}
            delay={1000}
            variant="accent"
            showProgress={true}
        />
        <Toast
            message="Converting your document to PDF format."
            prefix={<IconLib icon="warning" />}
            delay={2000}
            variant="success"
            showProgress={true}
        />
        <Toast
            message="Converting your document to PDF format."
            prefix={<IconLib icon="warning" />}
            delay={3000}
            variant="neutral"
            showProgress={true}
        />
        <Toast
            message="Converting your document to PDF format."
            prefix={<IconLib icon="warning" />}
            delay={4000}
            variant="caution"
            showProgress={true}
        />
        <Toast
            message="Converting your document to PDF format."
            prefix={<IconLib icon="warning" />}
            delay={5000}
            variant="warning"
            showProgress={true}
        />
        <Toast
            message="Converting your document to PDF format."
            prefix={<IconLib icon="warning" />}
            delay={6000}
            variant="danger"
            showProgress={true}
        />
        <Toast
            message="Converting your document to PDF format."
            prefix={<IconLib icon="warning" />}
            delay={7000}
            variant="highlight"
            showProgress={true}
        />
    </Stack>
)

// --

export const Anchors = () => {
    const { showToast } = useToast()

    const handleClick = () => {
        const anchors: ToastAnchor[] = [
            'bottom-right',
            'bottom-center',
            'bottom-left',
            'top-left',
            'top-right',
            'top-center',
        ]

        showToast({
            message: 'Converting your document to PDF format.',
            prefix: <IconLib icon="warning" />,
            anchor: anchors[Math.floor(Math.random() * anchors.length)],
            showProgress: true,
            delay: 4000,
        })
    }

    return <Button onClick={handleClick}>Show Toast Message</Button>
}

// --

export const CustomComponent = () => {
    const { showToast } = useToast()

    const handleClick = () => {
        showToast({
            delay: 4000,
            anchor: 'bottom-center',
            toastComponent: ({ onDismiss }) => (
                <Text
                    p={10}
                    onClick={onDismiss}
                    radius="var(--f-radius)"
                    colorToken="text-on-color"
                    bgToken="surface-inverse">
                    Converting your document to PDF format.
                </Text>
            ),
        })
    }

    return <Button onClick={handleClick}>Show Custom Toast Message</Button>
}
