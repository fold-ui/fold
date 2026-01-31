import * as Token from '@fold-ui/design/tokens'
import { FICircle, FISun, Icon, IconLib, Stack, Text, View, defaultIcons, setFoldIcons } from '@fold-ui/core'
import React, { useLayoutEffect, useState } from 'react'

export default {
    title: 'Core/Icon',
    component: Icon,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Icon',
    subtitle: 'The Icon component displays any SVG icon that is set as a prop.',
    description:
        'Icons play a fundamental role in user experiences and serve various purposes. The Fold Icon component was developed to accommodate a maximum number of icon sets. Default icons are from <a href="https://heroicons.com/" target="_blank">Heroicons</a>.',
}

/**
 * The icon prop wraps any SVG icon.
 */
export const Usage = () => {
    return <Icon icon={FISun} />
}

// --

export const Sizes = () => {
    return (
        <Stack spacing={10}>
            <Icon
                size="xs"
                icon={FICircle}
            />
            <Icon
                size="sm"
                icon={FICircle}
            />
            <Icon
                size="md"
                icon={FICircle}
                color={Token.ColorBlue400}
            />
            <Icon
                size="lg"
                icon={FICircle}
            />
            <Icon
                size="xl"
                icon={FICircle}
            />
        </Stack>
    )
}

// --

/**
 * The IconLib component allows you to include a pre-defined collection of icons, eliminating the need to import the SVG icon on each occasion.
 * In addition, a set of icons have already been added by default when using FoldContext. These include:
 *
 */
export const IconLibrary = () => {
    const [render, setRender] = useState(false)

    useLayoutEffect(() => {
        setFoldIcons({ sun: FISun })
        setRender(true)
    }, [])

    return render ? <IconLib icon="sun" /> : null
}

// --

/**
 * In addition, a set of icons have already been made available by default when using Fold.
 */
export const DefaultIcons = () => {
    return (
        <View
            row
            wrap="wrap">
            {Object.keys(defaultIcons).map((icon) => (
                <View
                    column
                    width={100}
                    height={100}
                    gap={10}>
                    <IconLib
                        icon={icon}
                        color="var(--f-color-text)"
                    />
                    <Text
                        size="sm"
                        colorToken="text-weaker">
                        {icon}
                    </Text>
                </View>
            ))}
        </View>
    )
}
