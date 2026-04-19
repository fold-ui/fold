import React, { forwardRef, useMemo } from 'react'
import { classNames, windowObject } from '../helpers'
import { Size } from '../types'
import { FIWarning } from './icons'

export type IconProps = {
    size?: Size
    color?: string
    icon: any
} & any

export const Icon = forwardRef((props: IconProps, ref) => {
    const { size = 'md', color, icon, ...rest } = props
    const Component = icon
    const className = classNames(
        {
            'f-icon': true,
        },
        [props.className, size]
    )

    return (
        <Component
            {...rest}
            color={color}
            className={className}
            ref={ref}
            strokeWidth=""
        />
    )
})

export type AppIcon = {
    [key: string]: any
}

const F_ICONS = 'F_ICONS'

export const getAppIcons = () => windowObject[F_ICONS] || {}

export const setAppIcons = (appIcons: AppIcon) => {
    if (!windowObject[F_ICONS]) windowObject[F_ICONS] = {}
    windowObject[F_ICONS] = {
        ...windowObject[F_ICONS],
        ...appIcons,
    }
}

export type IconLibProps = {
    icon: string
} & Omit<IconProps, 'icon'>

export const IconLib = forwardRef((props: any, ref) => {
    const { icon, ...rest } = props
    return (
        <Icon
            {...rest}
            icon={windowObject[F_ICONS][icon] || FIWarning}
            ref={ref}
        />
    )
})
