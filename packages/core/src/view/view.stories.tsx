import { Blur, Button, Flexer, Heading, ScrollView, SpinnerOverlay, Text, View } from '@fold-ui/core'
import React, { useState } from 'react'

export default {
    title: 'Core/View',
    component: View,
    excludeStories: 'docs',
}

export const docs = {
    title: 'View',
    subtitle:
        'The View component serves as a fundamental building block within Fold and is internally used by other components.',
    description:
        'The View component enhances the developer experience, offering convenience through common shorthand properties while also providing access to native (HTML) element properties.',
}

export const Usage = () => (
    <View
        p={50}
        bgToken="surface-strong">
        <Text>Welcome to Fold!</Text>
    </View>
)

// --

/**
 * The Flexer component is an extensible wrapper around the `flex: 1` filler pattern.
 */
export const Flex = () => (
    <View
        p={50}
        bgToken="surface-strong"
        row>
        <Text>Welcome to ...</Text>
        <Flexer />
        <Text>... Fold!</Text>
    </View>
)

// --

/**
 * There are limited set of shorthand properties available on the View component. These properties provide access to common inline styles, as well as Fold Design System styling options.
 * The properties have been limited to allow for maximum flexibility & render performance.
 */
export const ShorthandProperties = () => (
    <View
        column
        gap={10}
        p={50}
        radius={10}
        width="fit-content"
        bgToken="surface-strong"
        shadow="var(--f-shadow-card)"
        border="0.1rem solid var(--f-color-border)">
        <Heading as="h4">Hello</Heading>
        <Text>...and welcome to Fold!</Text>
    </View>
)

// --

/**
 * The `align` property is a wrapper for preset alignment CSS classes that are available in Fold.
 * These properties are distinct and are seperate to the general flexbox shorthand properties like `row` or `alignItems`.
 */
export const VerticalAlignment = () => {
    const blocks = new Array(5)
        .fill(null)
        .map((_, i) => (
            <div style={{ background: 'var(--f-color-surface-inverse)', width: 10, height: 10, margin: 5 }} />
        ))

    return (
        <View
            column
            gap={20}
            width="100%"
            alignItems="stretch">
            <View
                align="v-top-left"
                bgToken="surface-strong"
                height={150}>
                {blocks}
            </View>
            <View
                align="v-top-center"
                bgToken="surface-strong"
                height={150}>
                {blocks}
            </View>
            <View
                align="v-top-right"
                bgToken="surface-strong"
                height={150}>
                {blocks}
            </View>
            <View
                align="v-left-stretch"
                bgToken="surface-strong"
                height={150}>
                {blocks}
            </View>
            <View
                align="v-left-between"
                bgToken="surface-strong"
                height={150}>
                {blocks}
            </View>
            <View
                align="v-middle-left"
                bgToken="surface-strong"
                height={150}>
                {blocks}
            </View>
            <View
                align="v-middle-center"
                bgToken="surface-strong"
                height={150}>
                {blocks}
            </View>
            <View
                align="v-middle-right"
                bgToken="surface-strong"
                height={150}>
                {blocks}
            </View>
            <View
                align="v-center-stretch"
                bgToken="surface-strong"
                height={150}>
                {blocks}
            </View>
            <View
                align="v-center-between"
                bgToken="surface-strong"
                height={150}>
                {blocks}
            </View>
            <View
                align="v-bottom-left"
                bgToken="surface-strong"
                height={150}>
                {blocks}
            </View>
            <View
                align="v-bottom-center"
                bgToken="surface-strong"
                height={150}>
                {blocks}
            </View>
            <View
                align="v-bottom-right"
                bgToken="surface-strong"
                height={150}>
                {blocks}
            </View>
            <View
                align="v-right-stretch"
                bgToken="surface-strong"
                height={150}>
                {blocks}
            </View>
            <View
                align="v-right-between"
                bgToken="surface-strong"
                height={150}>
                {blocks}
            </View>
        </View>
    )
}

// --

export const HorizontalAlignment = () => {
    const blocks = new Array(5)
        .fill(null)
        .map((_, i) => (
            <div style={{ background: 'var(--f-color-surface-inverse)', width: 10, height: 10, margin: 5 }} />
        ))

    return (
        <View
            column
            gap={20}
            width="100%"
            alignItems="stretch">
            <View
                align="h-top-left"
                bgToken="surface-strong"
                height={50}>
                {blocks}
            </View>
            <View
                align="h-top-center"
                bgToken="surface-strong"
                height={50}>
                {blocks}
            </View>
            <View
                align="h-top-right"
                bgToken="surface-strong"
                height={50}>
                {blocks}
            </View>
            <View
                align="h-top-stretch"
                bgToken="surface-strong"
                height={50}>
                {blocks}
            </View>
            <View
                align="h-top-between"
                bgToken="surface-strong"
                height={50}>
                {blocks}
            </View>
            <View
                align="h-middle-left"
                bgToken="surface-strong"
                height={50}>
                {blocks}
            </View>
            <View
                align="h-middle-center"
                bgToken="surface-strong"
                height={50}>
                {blocks}
            </View>
            <View
                align="h-middle-right"
                bgToken="surface-strong"
                height={50}>
                {blocks}
            </View>
            <View
                align="h-middle-stretch"
                bgToken="surface-strong"
                height={50}>
                {blocks}
            </View>
            <View
                align="h-middle-between"
                bgToken="surface-strong"
                height={50}>
                {blocks}
            </View>
            <View
                align="h-bottom-left"
                bgToken="surface-strong"
                height={50}>
                {blocks}
            </View>
            <View
                align="h-bottom-center"
                bgToken="surface-strong"
                height={50}>
                {blocks}
            </View>
            <View
                align="h-bottom-right"
                bgToken="surface-strong"
                height={50}>
                {blocks}
            </View>
            <View
                align="h-bottom-stretch"
                bgToken="surface-strong"
                height={50}>
                {blocks}
            </View>
            <View
                align="h-bottom-between"
                bgToken="surface-strong"
                height={50}>
                {blocks}
            </View>
        </View>
    )
}

// --

/**
 * @kind experimental
 */
export const ScrollViewStickiness = () => {
    const [count, setCount] = useState([...new Array(100)])

    const handleClick = () => setCount([...count, count.length + 1])

    return (
        <View
            width={500}
            height={300}
            column
            gap={20}
            alignItems="flex-start">
            <Button onClick={handleClick}>Add to the bottom!</Button>
            <ScrollView
                stickToTop={false}
                stickToBottom={true}
                bgToken="surface-strong">
                {count.map((_, index) => (
                    <Text>{index}</Text>
                ))}
            </ScrollView>
        </View>
    )
}

// --

export const ScrollViewEvents = () => {
    const [count, _] = useState([...new Array(100)])

    const handleScrollBottom = () => console.log('You have reached the bottom!')

    const handleScrollTop = () => console.log('You have reached the top!')

    return (
        <View
            width={500}
            height={300}>
            <ScrollView
                bgToken="surface-strong"
                onScrollToBottom={handleScrollBottom}
                onScrollToTop={handleScrollTop}>
                {count.map((_, index) => (
                    <Text>{index}</Text>
                ))}
            </ScrollView>
        </View>
    )
}

// --

export const BlurContents = () => (
    <View
        width="100%"
        height={300}
        position="relative">
        <Blur
            p={50}
            column
            overlay={<SpinnerOverlay />}>
            <Heading>This is premium content!</Heading>
            <Text>Sorry, you need to be registered to view this content.</Text>
        </Blur>
    </View>
)
