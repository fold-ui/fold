import * as Token from '@fold-ui/design/tokens'
import { Button, ButtonGroup, LineChart, type LineChartSeries, View } from '@fold-ui/core'
import React from 'react'

export default {
    title: 'Core/LineChart',
    component: LineChart,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Line Chart',
    subtitle: 'The LineChart component plots one or more series of values over a shared axis.',
    description:
        'Line charts are useful for visualising trends over time or across an ordered set of categories. Series can be toggled via their legend, and an optional gradient area fill helps emphasise volume. Like the Sparkline, it is rendered with plain SVG and carries no charting dependencies.',
}

const revenue: LineChartSeries = {
    legend: 'Revenue',
    color: Token.ColorAccent500,
    points: [
        ['May 10', 5.78],
        ['May 15', 7.22],
        ['May 20', 6.96],
        ['May 25', 7.29],
        ['Jun 1', 9.95],
        ['Jun 5', 9.21],
        ['Jun 10', 11.74],
    ],
}

const spend: LineChartSeries = {
    legend: 'Spend',
    color: Token.ColorPurple500,
    points: [
        ['May 10', 3.1],
        ['May 15', 4.4],
        ['May 20', 5.8],
        ['May 25', 5.2],
        ['Jun 1', 7.1],
        ['Jun 5', 6.4],
        ['Jun 10', 8.3],
    ],
}

export const Usage = () => (
    <View width="100%">
        <LineChart
            title="Demo data"
            data={[revenue, spend]}
        />
    </View>
)

// --

export const SingleSeriesWithArea = () => (
    <View width="100%">
        <LineChart
            title="Revenue"
            area
            data={[revenue]}
        />
    </View>
)

// --

/**
 * Any node can be rendered between the title and the legends via the `header` prop.
 */
export const WithHeader = () => (
    <View width="100%">
        <LineChart
            title="Traffic"
            data={[revenue, spend]}
            header={
                <ButtonGroup>
                    <Button
                        size="xs"
                        active>
                        Day
                    </Button>
                    <Button size="xs">Week</Button>
                    <Button size="xs">Month</Button>
                </ButtonGroup>
            }
        />
    </View>
)
