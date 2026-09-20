import * as Token from '@fold-ui/design/tokens'
import { PieChart, type PieChartSlice, View } from '@fold-ui/core'
import React from 'react'

export default {
    title: 'Core/PieChart',
    component: PieChart,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Pie Chart',
    subtitle: 'The PieChart component shows how parts contribute to a whole.',
    description:
        'Pie charts are useful for displaying proportional data at a glance. Set an `innerRadius` to render a donut instead. It is rendered with plain SVG and carries no charting dependencies.',
}

const data: PieChartSlice[] = [
    { legend: 'Direct', color: Token.ColorAccent500, value: 40 },
    { legend: 'Referral', color: Token.ColorBlue500, value: 25 },
    { legend: 'Organic', color: Token.ColorGreen500, value: 20 },
    { legend: 'Social', color: Token.ColorPurple500, value: 15 },
]

export const Usage = () => (
    <View width="100%">
        <PieChart
            radius={160}
            data={data}
        />
    </View>
)

// --

export const Donut = () => (
    <View width="100%">
        <PieChart
            radius={160}
            innerRadius={55}
            data={data}
        />
    </View>
)
