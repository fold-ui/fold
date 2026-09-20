import React, { CSSProperties, SVGProps, useCallback, useEffect, useId, useRef, useState } from 'react'
import { classNames } from '../helpers'

type AnimatedGridPatternStyle = CSSProperties & {
    '--f-animated-grid-pattern-animation-duration'?: string
    '--f-animated-grid-pattern-square-max-opacity'?: number
    '--f-animated-grid-pattern-perspective'?: string | number
    '--f-animated-grid-pattern-transform'?: string
}

type AnimatedGridPatternSquareStyle = CSSProperties & {
    '--f-animated-grid-pattern-square-delay': string
}

export type AnimatedGridPatternProps = {
    width?: number
    height?: number
    x?: number
    y?: number
    strokeDasharray?: number
    numSquares?: number
    gridColor?: string
    squareColor?: string
    maxOpacity?: number
    duration?: number
    repeatDelay?: number
    style?: AnimatedGridPatternStyle
} & Omit<SVGProps<SVGSVGElement>, 'height' | 'style' | 'width' | 'x' | 'y'>

type Square = {
    id: number
    position: [number, number]
    iteration: number
}

export const AnimatedGridPattern = ({
    width = 40,
    height = 40,
    x = -1,
    y = -1,
    strokeDasharray = 0,
    numSquares = 50,
    gridColor = 'var(--f-animated-grid-pattern-grid-color)',
    squareColor = 'var(--f-animated-grid-pattern-square-color)',
    maxOpacity = 0.5,
    duration = 4,
    repeatDelay = 0.5,
    className,
    style,
    ...rest
}: AnimatedGridPatternProps) => {
    const id = useId()
    const containerRef = useRef<SVGSVGElement>(null)
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    const [squares, setSquares] = useState<Array<Square>>([])

    const getPosition = useCallback((): [number, number] => {
        return [
            Math.floor((Math.random() * dimensions.width) / width),
            Math.floor((Math.random() * dimensions.height) / height),
        ]
    }, [dimensions.height, dimensions.width, height, width])

    const generateSquares = useCallback(
        (count: number) => {
            return Array.from({ length: Math.max(0, count) }, (_, index) => ({
                id: index,
                position: getPosition(),
                iteration: 0,
            }))
        },
        [getPosition]
    )

    const updateSquarePosition = useCallback(
        (squareId: number) => {
            setSquares((currentSquares) => {
                const current = currentSquares[squareId]
                if (!current || current.id !== squareId) return currentSquares

                const nextSquares = currentSquares.slice()
                nextSquares[squareId] = {
                    ...current,
                    position: getPosition(),
                    iteration: current.iteration + 1,
                }

                return nextSquares
            })
        },
        [getPosition]
    )

    useEffect(() => {
        if (dimensions.width && dimensions.height) {
            setSquares(generateSquares(numSquares))
        }
    }, [dimensions.height, dimensions.width, generateSquares, numSquares])

    useEffect(() => {
        const element = containerRef.current
        if (!element) return

        const updateDimensions = () => {
            const bounds = element.getBoundingClientRect()

            setDimensions((currentDimensions) => {
                if (currentDimensions.width === bounds.width && currentDimensions.height === bounds.height) {
                    return currentDimensions
                }

                return { width: bounds.width, height: bounds.height }
            })
        }

        updateDimensions()

        if (typeof ResizeObserver === 'undefined') {
            window.addEventListener('resize', updateDimensions)
            return () => window.removeEventListener('resize', updateDimensions)
        }

        const resizeObserver = new ResizeObserver(updateDimensions)
        resizeObserver.observe(element)
        return () => resizeObserver.disconnect()
    }, [])

    const totalDuration = Math.max(0, duration * 2 + repeatDelay)
    const patternStyle: AnimatedGridPatternStyle = {
        '--f-animated-grid-pattern-animation-duration': `${totalDuration}s`,
        '--f-animated-grid-pattern-square-max-opacity': maxOpacity,
        ...style,
    }

    return (
        <svg
            {...rest}
            ref={containerRef}
            aria-hidden="true"
            className={classNames({ 'f-animated-grid-pattern': true }, [className])}
            style={patternStyle}>
            <defs>
                <pattern
                    id={id}
                    width={width}
                    height={height}
                    patternUnits="userSpaceOnUse"
                    x={x}
                    y={y}>
                    <path
                        d={`M.5 ${height}V.5H${width}`}
                        fill="none"
                        stroke={gridColor}
                        strokeDasharray={strokeDasharray}
                    />
                </pattern>
            </defs>
            <rect
                width="100%"
                height="100%"
                fill={`url(#${id})`}
            />
            <svg
                x={x}
                y={y}
                className="f-animated-grid-pattern__squares">
                {squares.map(({ position: [squareX, squareY], id: squareId, iteration }, index) => {
                    const squareStyle: AnimatedGridPatternSquareStyle = {
                        '--f-animated-grid-pattern-square-delay': `${index * 0.1}s`,
                    }

                    return (
                        <rect
                            key={`${squareId}-${iteration}`}
                            className="f-animated-grid-pattern__square"
                            width={Math.max(0, width - 1)}
                            height={Math.max(0, height - 1)}
                            x={squareX * width + 1}
                            y={squareY * height + 1}
                            fill={squareColor}
                            strokeWidth="0"
                            style={squareStyle}
                            onAnimationEnd={() => updateSquarePosition(squareId)}
                        />
                    )
                })}
            </svg>
        </svg>
    )
}
