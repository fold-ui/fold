import React from 'react'
import { Kbd, Text, View } from '@fold-ui/core'

export default {
    title: 'Core/Kbd',
    component: Kbd,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Kbd',
    subtitle:
        'The keyboard key component serves the purpose of indicating which specific key or combination of keys is responsible for executing a particular action.',
    description:
        'The Kbd component is ideal for assisting users in learning how to navigate keyboard shortcuts or quickly activating functionality using the keyboard.',
}

export const Usage = () => {
    return (
        <View
            row
            gap={5}>
            <Text>Press</Text>
            <Kbd>shift</Kbd>
            <Text>&</Text>
            <Kbd>cntrl</Kbd>
        </View>
    )
}
