import React, { useEffect, useRef, useState } from 'react'
import { classNames, CoreViewProps, getBoundingClientRect, useResize } from '../'

export type SparklineProps = {
    width?: number | string
    height?: number | string
    squareHeight?: number
    squareRadius?: number
    strokeWidth?: number
    data: number[]
    variant?: 'line' | 'bar' | 'square'
} & CoreViewProps

export const Sparkline = (props: SparklineProps) => {
    const {
        width = '100%',
        height = 50,
        squareHeight = 8,
        squareRadius = 4,
        strokeWidth = 2,
        data = [],
        variant = 'line',
        ...rest
    } = props
    const ref = useRef(null)
    const isLine = variant == 'line'
    const isBar = variant == 'bar'
    const isSquare = variant == 'square'
    const dimensions = useResize(ref.current)
    const [box, setBox] = useState<any>({ height: 0, width: 0 })
    const className = classNames(
        {
            'f-sparkline': true,
            'is-line': isLine,
            'is-bar': isBar,
            'is-square': isSquare,
        },
        [props.className]
    )

    const renderLine = () => {
        if (!isLine) return null

        return (
            <path
                strokeLinejoin="round"
                stroke="10"
                d={`M${data
                    .map((d, i) => {
                        const x = (box.width / (data.length - 1)) * i
                        const y = Math.floor((1 - d) * box.height)

                        return `${x} ${y}`
                    })
                    .join(' L ')}`}
            />
        )
    }

    const renderBar = () => {
        if (!isBar) return null

        return data.map((d, i) => {
            const height = Math.floor(d * box.height)
            const width = box.width / data.length
            const y = box.height - height
            const x = width * i + strokeWidth / 2

            return (
                <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    key={i}
                    rx={squareRadius}
                />
            )
        })
    }

    const renderSquare = () => {
        if (!isSquare) return null

        return data.map((d, i) => {
            const height = Math.floor(d * box.height)
            const width = box.width / data.length
            const x = width * i
            const y = box.height - height
            const adjustedY = y + squareHeight > box.height ? box.height - squareHeight : y

            return (
                <rect
                    x={x}
                    y={adjustedY}
                    width={width}
                    height={squareHeight}
                    key={i}
                    rx={squareRadius}
                />
            )
        })
    }

    useEffect(() => {
        setBox(getBoundingClientRect(ref.current))
    }, [width, height, data, dimensions])

    return (
        <svg
            {...rest}
            ref={ref}
            width={width}
            height={height}
            className={className}
            strokeWidth={strokeWidth}
            overflow="visible"
            viewBox={`0 0 ${box.width} ${box.height}`}>
            {renderLine()}
            {renderBar()}
            {renderSquare()}
        </svg>
    )
}
