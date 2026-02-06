import { FoldContext } from '../contexts'
import React, { cloneElement, forwardRef, ReactElement, useContext } from 'react'
import { View, Icon, IconProps, FIMoon, FISun, IconLib } from '..'
import { SpinnerOverlay } from '../spinner/spinner'
import { Text } from '../text/text'
import { CoreViewProps, LinkTarget, Size, Variant } from '../types'
import { classNames, getActionClass } from '../helpers'

export type ButtonGroupProps = {
    direction?: 'vertical' | 'horizontal'
} & CoreViewProps

export const ButtonGroup = forwardRef((props: ButtonGroupProps, ref) => {
    const { direction = 'horizontal', ...rest } = props
    const isVertical = direction == 'vertical'
    const isHorizontal = direction == 'horizontal'
    const className = classNames(
        {
            'f-button-group': true,
            'f-row': isHorizontal,
            'is-horizontal': isHorizontal,
            'is-vertical': isVertical,
        },
        [props.className]
    )

    return (
        <View
            {...rest}
            as="div"
            className={className}
            ref={ref}
        />
    )
})

export type ButtonProps = {
    as?: 'a' | 'button'
    underlined?: boolean
    loading?: boolean
    outline?: boolean
    flat?: boolean
    subtle?: boolean
    variant?: Variant
    form?: string
    prefix?: ReactElement
    suffix?: ReactElement
    size?: Size
    active?: boolean
    disabled?: boolean
    target?: LinkTarget
    href?: string
    ellipsis?: boolean
    onClick?: any
    round?: boolean
    type?: 'button' | 'submit'
} & CoreViewProps

export const Button = forwardRef((props: ButtonProps, ref) => {
    const {
        type = 'button',
        as = 'button',
        variant = 'default',
        form,
        size = 'md',
        underlined,
        loading,
        outline,
        flat,
        subtle,
        prefix,
        suffix,
        active,
        round,
        disabled,
        target,
        href,
        ellipsis,
        onClick,
        ...rest
    } = props
    const className = classNames(
        {
            'f-button': true,
            'f-row': true,
            'is-active': active,
            'is-outline': outline,
            'is-subtle': subtle,
            'is-round': round,
            'is-default': !subtle && !outline,
            'is-loading': loading,
            'is-flat': flat,
            'is-underlined': underlined,
            'has-ellipsis': ellipsis,
        },
        [size, props.className, getActionClass(variant)]
    )

    return (
        <View
            {...rest}
            as={as}
            type={type}
            className={className}
            form={form}
            disabled={disabled}
            target={target}
            href={href}
            onClick={onClick}
            aria-disabled={disabled}
            ref={ref}>
            {loading && (
                <SpinnerOverlay
                    size="sm"
                    color="currentColor"
                />
            )}
            {prefix && <span className="f-button__prefix f-row">{prefix}</span>}
            <span className="f-button__label f-row">
                <Text
                    as="span"
                    className="f-row"
                    size={size}>
                    {props.children}
                </Text>
            </span>
            {suffix && <span className="f-button__suffix f-row">{suffix}</span>}
        </View>
    )
})

export type IconButtonProps = {
    icon: string
    iconProps?: IconProps
} & ButtonProps

export const IconButton = forwardRef((props: IconButtonProps, ref) => {
    const { icon, iconProps = {}, ...rest } = props

    return (
        <Button
            {...rest}
            ref={ref}>
            <IconLib
                icon={icon}
                size={props.size}
                {...iconProps}
            />
        </Button>
    )
})

export type DarkModeButtonProps = {
    size?: Size
    lightMode?: ReactElement
    darkMode?: ReactElement
} & ButtonProps

export const DarkModeButton = forwardRef((props: DarkModeButtonProps, ref) => {
    const {
        size = 'md',
        darkMode = (
            <IconLib
                icon="moon"
                size={props.size}
            />
        ),
        lightMode = (
            <IconLib
                icon="sun"
                size={props.size}
            />
        ),
        ...rest
    } = props
    const {
        fold: { theme },
        setConfig,
    } = useContext(FoldContext)
    const isLight = theme == 'light'

    return (
        <Button
            {...rest}
            size={size}
            onClick={() => setConfig({ theme: isLight ? 'dark' : 'light' })}
            ref={ref}>
            {isLight ? lightMode : darkMode}
        </Button>
    )
})
