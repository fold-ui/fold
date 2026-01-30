import * as Token from '@fold-ui/design/tokens'
import React from 'react'
import { Logo, LogoSolid, View } from '@fold-ui/core'

export default {
    title: 'Core/Logo',
    component: Logo,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Logo',
    subtitle: 'The Logo component enable users to use the Fold logo anywhere in their app or website.',
    description: 'There are no restrictions in coloring the logo, however the shape must not be altered.',
}

export const Usage = () => {
    return <Logo />
}

// --

export const Solid = () => {
    return <LogoSolid />
}

// --

export const Sizes = () => {
    return (
        <View
            row
            gap={20}>
            <Logo
                size="xs"
                color={Token.ColorAccent300}
            />
            <Logo
                size="sm"
                color={Token.ColorAccent400}
            />
            <Logo
                size="md"
                color={Token.ColorAccent500}
            />
            <Logo
                size="lg"
                color={Token.ColorAccent600}
            />
            <Logo
                size="xl"
                color={Token.ColorAccent700}
            />
            <Logo
                customSize={120}
                color={Token.ColorAccent800}
            />
        </View>
    )
}

// --

export const SizesSolid = () => {
    return (
        <View
            row
            gap={20}>
            <LogoSolid
                size="xs"
                color={Token.ColorAccent300}
            />
            <LogoSolid
                size="sm"
                color={Token.ColorAccent400}
            />
            <LogoSolid
                size="md"
                color={Token.ColorAccent500}
            />
            <LogoSolid
                size="lg"
                color={Token.ColorAccent600}
            />
            <LogoSolid
                size="xl"
                color={Token.ColorAccent700}
            />
            <LogoSolid
                customSize={120}
                color={Token.ColorAccent800}
            />
        </View>
    )
}
