import { Sparkline, View } from '@fold-ui/core'
import React, { useMemo } from 'react'

export default {
    title: 'Core/Sparkline',
    component: Sparkline,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Sparkline',
    subtitle: 'The Sparkline component is a small SVG powered chart to indicate activity or frequency.',
    description:
        'It serves the purpose of offering users insight into the frequency or regularity of specific actions, making it most effective when presented alongside the element to provide users with contextually relevant information.',
}

export const Usage = () => {
    const data = useMemo(() => new Array(20).fill(null).map((i) => Math.random()), [])

    return (
        <View
            column
            gap={30}
            alignItems="flex-start">
            <View
                width={200}
                height={50}>
                <Sparkline
                    data={data}
                    variant="bar"
                    width="100%"
                    height={50}
                />
            </View>
            <View
                width={200}
                height={50}>
                <Sparkline
                    data={data}
                    variant="line"
                    width="100%"
                    height={50}
                />
            </View>
            <View
                width={200}
                height={50}>
                <Sparkline
                    data={data}
                    variant="square"
                    width="100%"
                    height={50}
                />
            </View>
        </View>
    )
}
