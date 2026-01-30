import * as Token from '@fold-ui/design/tokens'
import { Avatar, AvatarGroup, Badge, Heading, Text, View } from '@fold-ui/core'
import React from 'react'

export default {
    title: 'Core/Avatar',
    component: Avatar,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Avatar',
    subtitle:
        'The Avatar component serves as a representation of the user, showcasing their profile picture, initials or any child content.',
    description:
        'The Avatar component is useful for anywhere a user or object needs to be presented in a consistently identifiable way.',
}

export const Usage = () => (
    <View
        row
        gap={5}
        width="fit-content">
        <Avatar
            size="xl"
            name="Craig Pather"
            src="/men/02.jpg"
        />
        <Avatar
            size="xl"
            name="Charlene Singh"
            src="https://does.not.exist.jpg"
        />
        <Avatar
            size="xl"
            name="Patrick Anthony">
            <Badge
                variant="success"
                anchor="bottom-right"
                width={15}
                height={15}
                style={{
                    '--f-badge-dot-distance': '0rem',
                    '--f-badge-border-size': '0.2rem',
                }}
            />
        </Avatar>
    </View>
)

// --

export const Sizes = () => (
    <View
        row
        gap={5}
        width="fit-content">
        <Avatar
            size="xs"
            name="Etienne Dreyer"
        />
        <Avatar
            size="sm"
            name="Aubrey Moagi"
        />
        <Avatar
            size="md"
            name="Patrick Anthony"
        />
        <Avatar
            size="lg"
            name="Charlene Singh"
        />
        <Avatar
            size="xl"
            name="Craig Pather"
        />
    </View>
)

// --

export const Color = () => (
    <View
        row
        gap={5}
        width="fit-content">
        <Avatar
            name="Craig Pather"
            color={Token.ColorBlue500}
        />
        <Avatar
            name="Charlene Singh"
            color={Token.ColorCyan500}
            src="https://does.not.exist.jpg"
        />
        <Avatar
            name="Patrick Anthony"
            color={Token.ColorPink500}
        />
        <Avatar
            name="Etienne Dreyer"
            color={Token.ColorPink500}
            subtle
        />
    </View>
)

// --

export const Group = () => {
    const style = { border: '0.2rem solid var(--f-color-surface)' }

    return (
        <View
            column
            gap={15}
            alignItems="flex-start">
            <AvatarGroup>
                <Avatar
                    name="Charlene Singh"
                    style={style}
                    src="/women/01.jpg"
                />
                <Avatar
                    name="Craig Pather"
                    style={style}
                    src="/men/01.jpg"
                />
                <Avatar
                    name="Etienne Dreyer"
                    style={style}
                    src="/men/09.jpg"
                />
            </AvatarGroup>
            <Heading as="h5">With animation on hover:</Heading>
            <AvatarGroup animated>
                <Avatar
                    name="Charlene Singh"
                    style={style}
                    src="/women/01.jpg"
                />
                <Avatar
                    name="Craig Pather"
                    style={style}
                    src="/men/01.jpg"
                />
                <Avatar
                    name="Etienne Dreyer"
                    style={style}
                    src="/men/09.jpg"
                />
            </AvatarGroup>
        </View>
    )
}

// --

export const GroupInverted = () => {
    const style = { border: '0.2rem solid var(--f-color-surface)' }

    return (
        <AvatarGroup
            animated
            invert>
            <Avatar
                name="Charlene Singh"
                style={style}
                src="/women/01.jpg"
            />
            <Avatar
                name="Craig Pather"
                style={style}
                src="/men/01.jpg"
            />
            <Avatar
                color={Token.ColorCyan500}
                style={style}>
                <Text size="sm">+33</Text>
            </Avatar>
        </AvatarGroup>
    )
}

// --

export const Presence = () => (
    <View
        row
        gap={5}
        width="fit-content">
        <Avatar
            size="xs"
            name="Etienne Dreyer"
            presence="online"
            src="/men/01.jpg"
        />
        <Avatar
            size="sm"
            name="Aubrey Moagi"
            presence="away"
            src="/men/02.jpg"
        />
        <Avatar
            size="md"
            name="Patrick Anthony"
            presence="busy"
            src="/men/03.jpg"
        />
        <Avatar
            size="lg"
            name="Charlene Singh"
            presence="online"
            src="/men/04.jpg"
        />
        <Avatar
            size="xl"
            name="Craig Pather"
            presence="away"
            src="/men/05.jpg"
        />
    </View>
)
