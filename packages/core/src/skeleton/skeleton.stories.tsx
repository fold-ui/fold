import { Avatar, Badge, Button, Heading, Skeleton, SkeletonBlock, SkeletonCircle, Text } from '@fold-ui/core'
import React from 'react'

export default {
    title: 'Core/Skeleton',
    component: Skeleton,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Skeleton',
    subtitle:
        'The Skeleton component creates placeholder previews of components, helping create a more responsive user experience.',
    description:
        'In addition to basic Skeleton building blocks, the Skeleton component employs a different (CSS driven) approach to most other UI libraries. It overrides the styles of existing building block components, thereby giving developers the ability to create a more seamless user experience.',
}

export const Usage = () => {
    return (
        <Skeleton
            on={true}
            column
            gap={10}
            alignItems="flex-start">
            <SkeletonBlock
                width={150}
                height={50}
            />
            <SkeletonBlock
                width={100}
                height={30}
            />
            <SkeletonBlock
                width={50}
                height={10}
            />
            <SkeletonCircle size={100} />
        </Skeleton>
    )
}

// --

export const SupportedComponents = () => {
    return (
        <Skeleton
            on={true}
            column
            gap={10}
            alignItems="flex-start">
            <Avatar size="sm" />
            <Heading>This is a heading</Heading>
            <Text>This is some text</Text>
            <Text size="sm">This is some text</Text>
            <Text
                size="xs"
                width={50}
                display="block"
                height={5}
            />
            <Button
                subtle
                size="sm">
                Email
            </Button>
            <Badge>32</Badge>
        </Skeleton>
    )
}
