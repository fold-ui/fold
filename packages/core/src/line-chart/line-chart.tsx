import React, { ReactNode, useMemo, useRef, useState } from 'react'
import { Flexer, Text, View } from '../'
import { classNames, formatChartNumber, getBoundingClientRect } from '../helpers'
import { useResize } from '../hooks'
import { CoreViewProps } from '../types'

export type LineChartPoint = [string | number, number]

export type LineChartSeries = {
    legend: string
    color: string
    points: LineChartPoint[]
}

export type LineChartProps = {
    /**
     * One or more series of `[label, value]` points.
     */
    data: LineChartSeries[]
    /**
     * Optional title rendered above the chart.
     */
    title?: ReactNode
    /**
     * Optional content rendered to the right of the title (before the legends).
     */
    header?: ReactNode
    /**
     * Height of the plot area, in pixels.
     */
    height?: number
    /**
     * Fill the area beneath each line with a soft gradient.
     */
    area?: boolean
    /**
     * Connect points with smooth curves instead of straight segments.
     */
    smooth?: boolean
    /**
     * Render background gridlines.
     */
    grid?: boolean
    /**
     * Allow series to be toggled by clicking their legend.
     */
    toggleable?: boolean
    /**
     * Number of value (Y) ticks.
     */
    ticks?: number
    /**
     * Show the points on the each x axis tick
     */
    showPoints?: boolean
} & CoreViewProps

const MARGIN = { top: 16, right: 16, bottom: 28, left: 44 }

export const LineChart = (props: LineChartProps) => {
    const {
        data = [],
        title,
        header,
        height = 250,
        area = false,
        smooth = false,
        grid = true,
        toggleable = true,
        ticks = 5,
        showPoints = true,
        ...rest
    } = props
    const ref = useRef(null)
    const dimensions = useResize(ref.current)
    const gradientId = useMemo(() => `f-line-chart-gradient-${Math.round(Math.random() * 1e6)}`, [])
    const [box, setBox] = useState<any>({ width: 0, height: 0 })
    const [hidden, setHidden] = useState<number[]>([])
    const [tip, setTip] = useState<{ x: number; y: number; label: string } | null>(null)

    const className = classNames(
        {
            'f-line-chart': true,
        },
        [props.className]
    )

    const width = box.width
    const innerWidth = Math.max(0, width - MARGIN.left - MARGIN.right)
    const innerHeight = Math.max(0, height - MARGIN.top - MARGIN.bottom)
    const visible = data.filter((_, index) => !hidden.includes(index))

    // Build the value (Y) domain across all visible series, with padding.
    const { min, max } = useMemo(() => {
        const values = visible.reduce<number[]>((acc, s) => [...acc, ...s.points.map((p) => p[1])], [])
        if (!values.length) return { min: 0, max: 1 }
        const lo = Math.min(...values)
        const hi = Math.max(...values)
        const pad = (hi - lo || Math.abs(hi) || 1) * 0.1
        return { min: lo - pad, max: hi + pad }
    }, [visible])

    const count = useMemo(() => Math.max(...data.map((s) => s.points.length), 0), [data])

    const xFor = (index: number) => MARGIN.left + (count <= 1 ? innerWidth / 2 : (innerWidth / (count - 1)) * index)
    const yFor = (value: number) => MARGIN.top + innerHeight - ((value - min) / (max - min || 1)) * innerHeight

    const yTicks = useMemo(
        () => new Array(ticks).fill(null).map((_, i) => min + ((max - min) / (ticks - 1)) * i),
        [min, max, ticks]
    )

    const handleToggle = (index: number) => {
        if (!toggleable) return
        setHidden((prev) => (prev.includes(index) ? prev.filter((i) => i != index) : [...prev, index]))
    }

    const useResizeBox = () => setBox(getBoundingClientRect(ref.current))

    // Recompute the box whenever size or data changes.
    React.useEffect(useResizeBox, [dimensions, height, data])

    return (
        <View
            {...rest}
            className={className}
            column
            width="100%"
            alignItems="stretch"
            gap={10}>
            {(title || header || data.length > 0) && (
                <View
                    row
                    width="100%"
                    gap={10}>
                    {title && <Text fontWeight="bold">{title}</Text>}
                    <Flexer />
                    {header}
                    <View
                        row
                        gap={15}
                        wrap="wrap"
                        className="f-line-chart__legends">
                        {data.map((series, index) => (
                            <View
                                key={index}
                                row
                                gap={6}
                                className="f-line-chart__legend"
                                onClick={() => handleToggle(index)}
                                style={{
                                    cursor: toggleable ? 'pointer' : 'default',
                                    opacity: hidden.includes(index) ? 0.4 : 1,
                                }}>
                                <span
                                    className="f-line-chart__swatch"
                                    style={{ background: series.color }}
                                />
                                <Text size="sm">{series.legend}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            )}

            <View
                position="relative"
                width="100%"
                height={height}>
                <svg
                    ref={ref}
                    width="100%"
                    height={height}
                    viewBox={`0 0 ${width} ${height}`}
                    className="f-line-chart__chart">
                    {area && (
                        <defs>
                            <linearGradient
                                id={gradientId}
                                x1="0"
                                x2="0"
                                y1="0"
                                y2="1">
                                <stop
                                    offset="0%"
                                    stopColor="currentColor"
                                    stopOpacity={0.1}
                                />
                                <stop
                                    offset="100%"
                                    stopColor="currentColor"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                    )}

                    {/* gridlines + value labels */}
                    {width > 0 &&
                        yTicks.map((value, i) => {
                            const y = yFor(value)
                            return (
                                <g key={i}>
                                    {grid && (
                                        <line
                                            className="f-line-chart__grid"
                                            x1={MARGIN.left}
                                            x2={width - MARGIN.right}
                                            y1={y}
                                            y2={y}
                                        />
                                    )}
                                    <text
                                        className="f-line-chart__axis f-text sm"
                                        x={MARGIN.left - 8}
                                        y={y}
                                        textAnchor="end"
                                        dominantBaseline="middle">
                                        {formatChartNumber(value)}
                                    </text>
                                </g>
                            )
                        })}

                    {/* category (X) labels */}
                    {width > 0 &&
                        data[0]?.points.map((point, i) => {
                            // thin out labels so they never collide
                            const step = Math.ceil(count / 6)
                            if (i % step != 0 && i != count - 1) return null
                            return (
                                <text
                                    key={i}
                                    className="f-line-chart__axis f-text sm"
                                    x={xFor(i) - 3}
                                    y={height - 8}
                                    textAnchor="middle">
                                    {point[0]}
                                </text>
                            )
                        })}

                    {/* series */}
                    {width > 0 &&
                        data.map((series, index) => {
                            if (hidden.includes(index) || !series.points.length) return null

                            const line = series.points
                                .map((point, i) => {
                                    const x = xFor(i)
                                    const y = yFor(point[1])

                                    if (!i) return `M ${x} ${y}`
                                    if (!smooth) return `L ${x} ${y}`

                                    const midpoint = (xFor(i - 1) + x) / 2
                                    const previousY = yFor(series.points[i - 1][1])

                                    return `C ${midpoint} ${previousY}, ${midpoint} ${y}, ${x} ${y}`
                                })
                                .join(' ')
                            const areaPath =
                                `${line} L ${xFor(series.points.length - 1)} ${MARGIN.top + innerHeight} ` +
                                `L ${xFor(0)} ${MARGIN.top + innerHeight} Z`

                            return (
                                <g
                                    key={index}
                                    style={{ color: series.color }}>
                                    {area && (
                                        <path
                                            d={areaPath}
                                            fill={`url(#${gradientId})`}
                                            stroke="none"
                                        />
                                    )}
                                    <path
                                        className="f-line-chart__line"
                                        d={line}
                                        fill="none"
                                        stroke={series.color}
                                    />

                                    {showPoints && (
                                        <>
                                            {series.points.map((p, i) => (
                                                <circle
                                                    key={i}
                                                    className="f-line-chart__dot"
                                                    cx={xFor(i)}
                                                    cy={yFor(p[1])}
                                                    r={3}
                                                    fill={series.color}
                                                    onMouseEnter={() =>
                                                        setTip({
                                                            x: xFor(i),
                                                            y: yFor(p[1]),
                                                            label: `${p[0]} · ${formatChartNumber(p[1])}`,
                                                        })
                                                    }
                                                    onMouseLeave={() => setTip(null)}
                                                />
                                            ))}
                                        </>
                                    )}
                                </g>
                            )
                        })}
                </svg>

                {tip && (
                    <div
                        className="f-line-chart__tooltip"
                        style={{ left: tip.x, top: tip.y - 12 }}>
                        {tip.label}
                    </div>
                )}
            </View>
        </View>
    )
}
