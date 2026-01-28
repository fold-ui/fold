import { ProgressCircle, Heading, Progress, Stack, ProgressSubtle, Text, ProgressPie } from '@fold-dev/core'
import React from 'react'

export default {
    title: 'Core/Progress',
    component: Progress,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Progress',
    subtitle: 'The Progress component visually communicates progress to the user through color & SVG elements.',
    description:
        'Progress indicators provide users with information regarding the status of active operations, such as launching an application, completing a form submission, or saving recent changes. Also see the Spinner component.',
}

export const Usage = () => {
    return <Progress value={75} />
}

// --

export const Variants = () => (
    <Stack
        direction="vertical"
        spacing={10}>
        <Progress
            value={50}
            thickness={10}
        />
        <Progress
            value={25}
            variant="accent"
            thickness={10}
        />
        <Progress
            value={35}
            variant="success"
            thickness={10}
        />
        <Progress
            value={15}
            variant="neutral"
            thickness={10}
        />
        <Progress
            value={55}
            variant="caution"
            thickness={10}
        />
        <Progress
            value={65}
            variant="warning"
            thickness={10}
        />
        <Progress
            value={85}
            variant="danger"
            thickness={10}
        />
        <Progress
            value={75}
            variant="highlight"
            thickness={10}
        />
    </Stack>
)

// --

export const States = () => (
    <Stack
        direction="vertical"
        spacing={10}>
        <Progress
            value={90}
            animated
        />
        <Progress
            value={75}
            animated
            variant="accent"
        />
        <Progress
            value={15}
            animated
            variant="success"
        />
        <Progress
            value={55}
            animated
            variant="neutral"
        />
        <Progress
            value={65}
            animated
            variant="caution"
        />
        <Progress
            value={85}
            animated
            variant="warning"
        />
        <Progress
            value={35}
            animated
            variant="danger"
        />
        <Progress
            value={25}
            animated
            variant="highlight"
        />
        <Progress
            value={50}
            indeterminate
        />
        <Progress
            value={25}
            indeterminate
            variant="accent"
        />
        <Progress
            value={25}
            indeterminate
            variant="success"
        />
        <Progress
            value={25}
            indeterminate
            variant="neutral"
        />
        <Progress
            value={25}
            indeterminate
            variant="caution"
        />
        <Progress
            value={25}
            indeterminate
            variant="warning"
        />
        <Progress
            value={25}
            indeterminate
            variant="danger"
        />
        <Progress
            value={25}
            indeterminate
            variant="highlight"
        />
    </Stack>
)

// --

export const Circle = () => (
    <Stack
        spacing={10}
        wrap="wrap">
        <ProgressCircle
            value={20}
            size={120}
            thickness={20}>
            <Heading
                as="h1"
                colorToken="accent">
                20%
            </Heading>
        </ProgressCircle>
        <ProgressCircle
            value={90}
            size={120}
            thickness={10}
            variant="accent"
        />
        <ProgressCircle
            value={50}
            size={80}
            thickness={10}
            variant="success"
        />
        <ProgressCircle
            value={80}
            size={50}
            thickness={10}
            variant="neutral"
        />
        <ProgressCircle
            value={80}
            size={50}
            thickness={10}
            variant="warning"
        />
        <ProgressCircle
            value={80}
            size={50}
            thickness={10}
            variant="danger"
        />
        <ProgressCircle
            value={80}
            size={50}
            thickness={20}
            variant="highlight"
        />
    </Stack>
)

// --

export const Pie = () => (
    <Stack
        spacing={10}
        wrap="wrap">
        <ProgressPie
            value={20}
            size={120}
        />
        <ProgressPie
            value={90}
            size={120}
            variant="accent"
        />
        <ProgressPie
            value={50}
            size={80}
            variant="success"
        />
        <ProgressPie
            value={80}
            size={50}
            variant="neutral"
        />
        <ProgressPie
            value={80}
            size={50}
            variant="warning"
        />
        <ProgressPie
            value={80}
            size={50}
            variant="danger"
        />
        <ProgressPie
            value={80}
            size={50}
            variant="highlight"
        />
        <ProgressPie
            value={100}
            size={50}
            variant="highlight"
        />
    </Stack>
)

// --

export const Subtle = () => (
    <Stack
        direction="vertical"
        spacing={10}>
        <ProgressSubtle value={87}>
            <Text>Redux</Text>
        </ProgressSubtle>

        <ProgressSubtle
            value={20}
            variant="danger">
            <Text>MobX</Text>
        </ProgressSubtle>

        <ProgressSubtle
            value={55}
            variant="highlight">
            <Text>Zustand</Text>
        </ProgressSubtle>
    </Stack>
)
