import React from 'react'
import { If, View } from '@fold-ui/core'

export default {
    title: 'Core/If',
    component: If,
    excludeStories: 'docs',
}

export const docs = {
    title: 'If',
    subtitle: 'The If component hides content conditionally based on a true/false boolean value.',
    description:
        'If components are well-suited to serve as a more readable method for displaying and concealing child components.',
}

export const Usage = () => {
    return (
        <View>
            <If if={true}>This is visible...</If>
            <If if={false}>...and this is not visible.</If>
        </View>
    )
}
