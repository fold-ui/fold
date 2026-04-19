import React, { ReactElement, ReactNode, useContext } from 'react'
import { FIMoon, FISun, Icon, IconLib, View } from '..'
import { AppContext } from '../contexts'
import { classNames } from '../helpers'
import { CoreViewProps, Size } from '../types'

export type ToggleProps = {
    prefix?: ReactElement | ReactNode
    suffix?: ReactElement | ReactNode
    on: boolean
    size?: Size
    onChange: any
} & Omit<CoreViewProps, 'on'>

export const Toggle = (props: ToggleProps) => {
    const { prefix, suffix, on, size = 'md', onChange, ...rest } = props
    const className = classNames(
        {
            'f-toggle': true,
            'is-active': on,
        },
        [props.className, size]
    )

    return (
        <View
            {...rest}
            as="button"
            type="button"
            role="switch"
            className={className}
            onClick={onChange}>
            <span className="f-toggle__circle" />
            <span className="f-toggle__prefix f-row">{prefix}</span>
            <span className="f-toggle__suffix f-row">{suffix}</span>
        </View>
    )
}

export type DarkModeToggleProps = {
    lightMode?: ReactElement
    darkMode?: ReactElement
    size?: Size
} & CoreViewProps

export const DarkModeToggle = (props: DarkModeToggleProps) => {
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
                color="var(--f-color-surface)"
            />
        ),
        ...rest
    } = props
    const {
        app: { theme },
        setConfig,
    } = useContext(AppContext)
    const isLight = theme == 'light'

    return (
        <Toggle
            {...rest}
            size={size}
            prefix={lightMode}
            suffix={darkMode}
            on={isLight}
            onChange={() => setConfig({ theme: isLight ? 'dark' : 'light' })}
        />
    )
}
