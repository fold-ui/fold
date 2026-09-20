import * as Token from '@fold-ui/design/tokens'
import { BarChart, type BarChartGroup, View } from '@fold-ui/core'
import React from 'react'

export default {
    title: 'Core/BarChart',
    component: BarChart,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Bar Chart',
    subtitle: 'The BarChart component compares values across categories, grouped by series.',
    description:
        'Bar charts are useful for comparing discrete quantities side by side. Bars sharing a label are grouped together and coloured per series. It is rendered with plain SVG and carries no charting dependencies.',
}

const spend: BarChartGroup = {
    legend: 'Spend',
    color: Token.ColorAccent500,
    values: [
        { label: 'January', count: 1 },
        { label: 'February', count: 1.5 },
        { label: 'March', count: 2 },
        { label: 'April', count: 1.2 },
    ],
}

const conversions: BarChartGroup = {
    legend: 'Conversions',
    color: Token.ColorPurple500,
    values: [
        { label: 'January', count: 2 },
        { label: 'February', count: 1.75 },
        { label: 'March', count: 1.5 },
        { label: 'April', count: 2.4 },
    ],
}

export const Usage = () => (
    <View width="100%">
        <BarChart
            title="Grouped"
            data={[spend, conversions]}
        />
    </View>
)

// --

export const SingleSeries = () => (
    <View width="100%">
        <BarChart
            title="Spend"
            data={[spend]}
        />
    </View>
)
