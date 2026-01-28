import { IconLib, Stat, View } from '@fold-dev/core'
import React from 'react'

export default {
    title: 'Core/Stat',
    component: Stat,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Stat',
    subtitle: 'The Stat component highlights key statistics.',
    description:
        'Stat components are useful for emphasizing crucial data points & work well where space is limited or in conjunction with charts & tables.',
}

export const Usage = () => {
    return (
        <View
            row
            wrap="wrap"
            gap={50}
            justifyContent="stretch"
            width="100%">
            <Stat
                style={{ maxWidth: 150 }}
                icon="user"
                label="Visitors"
                description="3 Dec 2022"
                number="41,841"
            />
            <Stat
                style={{ maxWidth: 150 }}
                icon="check"
                label="Conversions"
                description="3 Dec 2022"
                number="21,982"
            />
            <Stat
                style={{ maxWidth: 150 }}
                label="Churned"
                labelTool={
                    <IconLib
                        icon="warning"
                        stroke="var(--f-color-danger)"
                    />
                }
                description="3 Dec 2022"
                icon="date"
                number="1,291"
            />
        </View>
    )
}
