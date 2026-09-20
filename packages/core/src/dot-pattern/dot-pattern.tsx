import React, { SVGProps, useId } from 'react'
import { classNames } from '../helpers'

export interface DotPatternProps extends SVGProps<SVGSVGElement> {
    width?: number
    height?: number
    x?: number
    y?: number
    cx?: number
    cy?: number
    cr?: number
    color?: string
    animated?: boolean
    duration?: number
    numRipples?: number
    maxRadius?: number
    baseOpacity?: number
    rippleOpacity?: number
    originX?: string
    originY?: string
}

export const DotPattern = ({
    width = 16,
    height = 16,
    x = 0,
    y = 0,
    cx = 1,
    cy = 1,
    cr = 1,
    color = 'var(--f-dot-pattern-color)',
    animated = true,
    duration = 6,
    numRipples = 4,
    maxRadius = 800,
    baseOpacity = 0.3,
    rippleOpacity = 0.5,
    originX = '50%',
    originY = '50%',
    className,
    ...rest
}: DotPatternProps) => {
    const id = useId()
    const maskId = `${id}-mask`

    return (
        <svg
            {...rest}
            aria-hidden="true"
            className={classNames({ 'f-dot-pattern': true }, [className])}>
            <defs>
                <pattern
                    id={id}
                    width={width}
                    height={height}
                    patternUnits="userSpaceOnUse"
                    patternContentUnits="userSpaceOnUse"
                    x={x}
                    y={y}>
                    <circle
                        cx={cx}
                        cy={cy}
                        r={cr}
                        fill={color}
                    />
                </pattern>
                {animated && (
                    <mask id={maskId}>
                        <rect
                            width="100%"
                            height="100%"
                            fill="white"
                            opacity={baseOpacity}
                        />
                        {Array.from({ length: numRipples }).map((_, index) => (
                            <circle
                                key={index}
                                cx={originX}
                                cy={originY}
                                r="0"
                                fill="none"
                                stroke="white"
                                strokeWidth="80"
                                opacity="0">
                                <animate
                                    attributeName="r"
                                    from="0"
                                    to={maxRadius}
                                    dur={`${duration}s`}
                                    begin={`${(index * duration) / numRipples}s`}
                                    repeatCount="indefinite"
                                />
                                <animate
                                    attributeName="opacity"
                                    values={`0;${rippleOpacity};0`}
                                    dur={`${duration}s`}
                                    begin={`${(index * duration) / numRipples}s`}
                                    repeatCount="indefinite"
                                />
                            </circle>
                        ))}
                    </mask>
                )}
            </defs>
            <rect
                width="100%"
                height="100%"
                fill={`url(#${id})`}
                mask={animated ? `url(#${maskId})` : undefined}
            />
        </svg>
    )
}
