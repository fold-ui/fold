import React, { CSSProperties, HTMLAttributes } from 'react'
import { classNames } from '../helpers'

type RippleStyle = CSSProperties & {
    '--f-ripple-color'?: string
    '--f-ripple-duration'?: string
    '--f-ripple-background'?: string
    '--f-ripple-border-width'?: string | number
}

type RippleCircleStyle = CSSProperties & {
    '--f-ripple-size': string
    '--f-ripple-opacity': number
    '--f-ripple-muted-opacity': number
    '--f-ripple-delay': string
}

export type RippleProps = {
    mainCircleSize?: number
    mainCircleOpacity?: number
    numCircles?: number
    color?: string
    duration?: number
    style?: RippleStyle
} & Omit<HTMLAttributes<HTMLDivElement>, 'color' | 'style'>

export const Ripple = ({
    mainCircleSize = 210,
    mainCircleOpacity = 0.24,
    numCircles = 8,
    color = 'rgba(255, 255, 255, 0.15)',
    duration = 5,
    className,
    style,
    ...rest
}: RippleProps) => {
    const rippleStyle: RippleStyle = {
        '--f-ripple-color': color,
        '--f-ripple-duration': `${duration}s`,
        ...style,
    }

    return (
        <div
            {...rest}
            aria-hidden="true"
            className={classNames({ 'f-ripple': true }, [className])}
            style={rippleStyle}>
            {Array.from({ length: Math.max(0, numCircles) }, (_, index) => {
                const opacity = Math.max(mainCircleOpacity - index * 0.03, 0.02)
                const circleStyle: RippleCircleStyle = {
                    '--f-ripple-size': `${mainCircleSize + index * 70}px`,
                    '--f-ripple-opacity': opacity,
                    '--f-ripple-muted-opacity': opacity * 0.2,
                    '--f-ripple-delay': `${index * 0.2}s`,
                }

                return (
                    <span
                        className="f-ripple__circle"
                        key={index}
                        style={circleStyle}
                    />
                )
            })}
        </div>
    )
}
