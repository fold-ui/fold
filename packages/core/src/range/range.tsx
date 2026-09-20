import React, { ChangeEventHandler, ReactChild, useRef, useState, useEffect, useLayoutEffect } from 'react'
import { classNames, getBoundingClientRect, mapBetween } from '../helpers'
import { CommonProps, CoreViewProps, PopoutPosition } from '../types'
import { TooltipContent } from '../tooltip/tooltip'
import { Text } from '../text/text'
import { View, useId } from '..'

export type RangeProps = {
    showTooltipAlways?: boolean
    showTooltip?: boolean
    tooltipPosition?: PopoutPosition
    disabled?: boolean
    min: number
    max: number
    step: number
    value: number
    textValue?: any
    onChange: ChangeEventHandler<HTMLInputElement>
    inputProps?: any
} & Omit<CoreViewProps, 'onChange'>

export const Range = (props: RangeProps) => {
    const {
        showTooltipAlways = false,
        showTooltip = false,
        tooltipPosition = 'top-center',
        disabled,
        min = 0,
        max = 100,
        step = 1,
        value = 0,
        textValue,
        onChange,
        inputProps = {},
        ...rest
    } = props
    const rangeRef = useRef(null)
    const labelId = useId()
    const [offset, setOffset] = useState(null)
    const offsetPercent = offset + '%'
    const [drag, setDrag] = useState(false)
    const showTooltipFinal = showTooltipAlways || (drag && showTooltip)
    const className = classNames(
        {
            'f-range': true,
        },
        [props.className]
    )

    const handleTextValue = () => {
        return textValue ? textValue(value) : textValue
    }

    const handleChange = (e) => onChange(e)

    const handleMouseUp = (e) => setDrag(false)

    const handleMouseDown = (e) => setDrag(true)

    useLayoutEffect(() => {
        setOffset(mapBetween(value, 0, 100, min, max))
    }, [value])

    return (
        <View
            {...rest}
            className={className}>
            <input
                type="range"
                ref={rangeRef}
                step={step}
                min={min}
                max={max}
                disabled={disabled}
                value={value}
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={value}
                aria-valuetext={handleTextValue()}
                aria-labelledby={labelId}
                aria-orientation="horizontal"
                onInput={handleChange}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                {...inputProps}
            />

            {showTooltipFinal && (
                <div className="range__tooltip-track">
                    <div
                        className="range__tooltip-container"
                        style={{ left: offsetPercent }}>
                        <TooltipContent anchor={tooltipPosition}>{handleTextValue()}</TooltipContent>
                    </div>
                </div>
            )}
        </View>
    )
}
