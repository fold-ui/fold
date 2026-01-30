import React from 'react'
import { Badge, View } from '@fold-ui/core'

export default {
    title: 'Core/Badge',
    component: Badge,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Badge',
    subtitle: 'The Badge serves as a small label or indicator for UI elements.',
    description:
        'The Badge component is useful for conveying important information the user should be aware of, such as unread message counts, notifications, etc. It should be in close proximity to the relative element.',
}

export const Usage = () => (
    <View
        row
        wrap="wrap"
        gap={5}
        width="fit-content">
        <Badge>+34 notifications</Badge>
        <Badge outline>+12 outline notifications</Badge>
    </View>
)

// --

export const Variants = () => (
    <View
        row
        wrap="wrap"
        gap={5}
        width="fit-content">
        <Badge>Default</Badge>
        <Badge variant="accent">Accent</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="neutral">Neutral</Badge>
        <Badge variant="caution">Caution</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="danger">Danger</Badge>
    </View>
)

// --

export const VariantsOutline = () => (
    <View
        row
        wrap="wrap"
        gap={5}
        width="fit-content">
        <Badge outline>Default</Badge>
        <Badge
            variant="accent"
            outline>
            Accent
        </Badge>
        <Badge
            variant="success"
            outline>
            Success
        </Badge>
        <Badge
            variant="neutral"
            outline>
            Neutral
        </Badge>
        <Badge
            variant="caution"
            outline>
            Caution
        </Badge>
        <Badge
            variant="warning"
            outline>
            Warning
        </Badge>
        <Badge
            variant="danger"
            outline>
            Danger
        </Badge>
    </View>
)

// --

export const Sizes = () => (
    <View
        row
        wrap="wrap"
        gap={5}
        width="fit-content">
        <Badge size="xs">Extra small</Badge>
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
        <Badge size="lg">Large</Badge>
        <Badge size="xl">Extra large</Badge>
    </View>
)

// --

/**
 * When the Badge component has no children, it reverts to becoming an indicator.
 */
export const Indicator = () => (
    <View
        row
        wrap="wrap"
        gap={5}
        width="fit-content">
        <Badge
            variant="success"
            size="xs"
        />
        <Badge
            variant="success"
            size="sm"
        />
        <Badge
            variant="success"
            size="md"
        />
        <Badge
            variant="success"
            size="lg"
        />
        <Badge
            variant="success"
            size="xl"
        />
    </View>
)

// --

export const Position = () => (
    <View
        width={100}
        height={100}
        bgToken="surface-strong"
        position="relative">
        <Badge
            variant="accent"
            anchor="top-left"
        />
        <Badge
            variant="success"
            anchor="top-right"
        />
        <Badge
            variant="neutral"
            anchor="bottom-left"
        />
        <Badge
            variant="warning"
            anchor="bottom-right"
        />
    </View>
)
