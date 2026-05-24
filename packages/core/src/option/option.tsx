import React, { createContext, forwardRef, ReactElement, useContext, useLayoutEffect, useRef, useState } from 'react'
import { Text, View } from '..'
import { classNames, getOffset, mergeRefs, renderChildren } from '../helpers'
import { useResize } from '../hooks/resize.hook'
import { CoreViewProps, Size } from '../types'

export const OptionContext = createContext({
    box: {},
    setBox: ({}) => null,
})

export const OptionProvider = (props: any) => {
    const [box, setBox] = useState({})
    return <OptionContext.Provider value={{ box, setBox }}>{props.children}</OptionContext.Provider>
}

export type OptionProps = {
    animated?: boolean
    size?: Size
    disabled?: boolean
    selected?: boolean
    prefix?: ReactElement
    suffix?: ReactElement
    onClick?: any
} & CoreViewProps

export const Option = (props: OptionProps) => {
    const { animated, size, disabled, selected, prefix, suffix, onClick, ...rest } = props
    const { setBox } = useContext(OptionContext)
    const containerRef = useRef(null)
    const dimensions = useResize(containerRef.current)
    const className = classNames(
        {
            'f-option': true,
            'f-row': true,
            'is-selected': selected,
            'is-animated': animated,
        },
        [props.className, size]
    )

    useLayoutEffect(() => {
        if (selected) {
            const box: any = getOffset(containerRef.current)
            setBox(box)
        }
    }, [selected, dimensions])

    return (
        <View
            {...rest}
            as="button"
            className={className}
            disabled={disabled}
            onClick={onClick}
            ref={containerRef}>
            {prefix && <span className="f-row f-option__prefix">{prefix}</span>}
            <Text
                size={size}
                as="span"
                className="f-row f-option__suffix__label">
                {props.children}
            </Text>
            {suffix && <span className="f-row f-option__suffix">{suffix}</span>}
        </View>
    )
}

export type OptionsProps = {
    animated?: boolean
    size?: Size
    selected?: number
    onOptionChange: any
} & CoreViewProps

export const Options = forwardRef((props: OptionsProps, ref) => {
    return (
        <OptionProvider>
            <OptionsInner
                {...props}
                ref={ref}
            />
        </OptionProvider>
    )
})

export const OptionsInner = forwardRef((props: OptionsProps, ref) => {
    const { animated = false, size = 'md', selected, onOptionChange, ...rest } = props
    const containerRef = useRef(null)
    const { box } = useContext(OptionContext)
    const className = classNames(
        {
            'f-options': true,
            'f-row': true,
        },
        [props.className, size]
    )

    return (
        <View
            {...rest}
            ref={mergeRefs([containerRef, ref])}
            className={className}>
            {renderChildren(props.children, (child: ReactElement, index: number) => {
                return (
                    <Option
                        {...child.props}
                        size={size}
                        animated={animated}
                        selected={selected == index}
                        onClick={() => onOptionChange(index)}>
                        {child.props.children}
                    </Option>
                )
            })}
            {selected >= 0 && animated && (
                <div
                    className="f-options__selected"
                    style={box}
                />
            )}
        </View>
    )
})
