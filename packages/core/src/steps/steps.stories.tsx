import { Heading, Step, Steps, Text } from '@fold-ui/core'
import React from 'react'

export default {
    title: 'Core/Steps',
    component: Steps,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Steps',
    subtitle: 'The Steps component conveys progression through a sequence of interconnected stages.',
    description:
        'Using the Steps component is an effective method for indicating the progression within a process. It is particularly valuable when facilitating product onboarding, completing forms, or configuring system properties.',
}

export const Usage = () => {
    return (
        <Steps>
            <Step completed>
                <Heading as="h4">Register</Heading>
                <Text>Completed</Text>
            </Step>
            <Step next>
                <Heading as="h4">Profile</Heading>
                <Text>Incomplete</Text>
            </Step>
            <Step>
                <Heading as="h4">Complete</Heading>
                <Text>Incomplete</Text>
            </Step>
        </Steps>
    )
}

// --

export const CustomIndicators = () => {
    return (
        <Steps>
            <Step
                completed
                indicator={<Text>1</Text>}>
                <Heading as="h4">Register</Heading>
                <Text>Completed</Text>
            </Step>
            <Step
                next
                indicator={<Text>2</Text>}>
                <Heading as="h4">Profile</Heading>
                <Text>Incomplete</Text>
            </Step>
            <Step indicator={<Text>3</Text>}>
                <Heading as="h4">Complete</Heading>
                <Text>Incomplete</Text>
            </Step>
        </Steps>
    )
}

// --

export const Spacing = () => {
    return (
        <Steps spacing={0}>
            <Step spacing={0} />
            <Step spacing={0} />
            <Step spacing={0} />
        </Steps>
    )
}
