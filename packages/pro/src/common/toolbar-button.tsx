import { IconLib, classNames, cleanObject, mergeRefs } from '@fold-dev/core'
import React, { ReactNode, forwardRef, useMemo, useRef, useState } from 'react'
import { stopEvent } from '../helpers'

export type ToolbarButtonProps = {
    color?: string
    icon?: string
    text?: string
    style?: any
    outline?: boolean
    hasClose?: boolean
    iconProps?: any
    className?: string
    children?: ReactNode
    onClick?: (e) => void
    onClose?: () => void
    disabled?: boolean
}

export const ToolbarButton = forwardRef((props: ToolbarButtonProps, ref) => {
    const {
        color,
        icon,
        text,
        style = {},
        outline,
        hasClose,
        iconProps = {},
        children,
        onClick,
        onClose,
        disabled,
    } = props
    const [over, setOver] = useState(false)
    const containerRef = useRef(null)
    const styles = useMemo(() => {
        if (!color) {
            return {
                ...style,
            }
        } else {
            return cleanObject({
                color,
                '--f-common-toolbar-button-background': `rgb(from ${color} r g b / 7.5%)`,
                '--f-common-toolbar-button-background-hover': `rgb(from ${color} r g b / 12.5%)`,
                '--f-common-toolbar-button-x-background': color,
                '--f-common-toolbar-button-x-color': 'var(--f-color-surface)',
                ...style,
            })
        }
    }, [color, style])
    const className = classNames(
        {
            'f-toolbar-button': true,
            'f-row': true,
            'is-outline': outline,
            'has-close': hasClose,
        },
        [props.className]
    )

    const handleClick = (e) => {
        stopEvent(e)
        onClick(e)
    }

    return (
        <button
            disabled={disabled}
            onMouseOver={() => setOver(true)}
            onMouseLeave={() => setOver(false)}
            ref={mergeRefs([ref, containerRef])}
            onClick={handleClick}
            className={className}
            style={styles}>
            {!!icon && (
                <IconLib
                    icon={icon}
                    size="xs"
                    {...iconProps}
                />
            )}

            {!!text && (
                <span
                    className="f-text sm"
                    style={{ zIndex: 0, position: 'relative' }}>
                    {text}
                </span>
            )}

            {hasClose && !disabled && (
                <span
                    onClick={(e) => {
                        stopEvent(e)
                        onClose()
                    }}
                    className="f-toolbar-button__x f-row f-buttonize">
                    <IconLib
                        icon="x"
                        size="xs"
                    />
                </span>
            )}
            {children}
        </button>
    )
})
