import React from 'react'
import { Hidden, Text, View } from '@fold-ui/core'

export default {
    title: 'Core/Hidden',
    component: Hidden,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Hidden',
    subtitle:
        'The Hidden component conceals content from the visible screen while still making it accessible to screen readers.',
    description:
        'Hiding content is a frequently employed method in web accessibility, allowing information to remain legible for screen readers while remaining concealed from visual clients.',
}

export const Usage = () => {
    return (
        <View row>
            <Hidden>This is visually hidden...</Hidden>
            <Text>...but not for screen-readers.</Text>
        </View>
    )
}
