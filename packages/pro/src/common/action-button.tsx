import { classNames } from '@fold-ui/core'
import React from 'react'
import { stopEvent } from '../helpers'

export type ActionButtonProps = {
    variant?: 'accent' | 'default'
    border?: boolean
    children: any
    onClick: (e) => void
    className?: string
    disabled?: boolean
}

export const ActionButton = (props: ActionButtonProps) => {
    const { border, variant = 'default', children, onClick, disabled } = props
    const className = classNames(
        {
            'f-action-button': true,
            'f-buttonize-outline': true,
            'f-row': true,
            'has-border': border,
            'is-accent': variant == 'accent',
        },
        [props.className]
    )

    return (
        <button
            disabled={disabled}
            tabIndex={0}
            className={className}
            onClick={(e) => {
                stopEvent(e)
                onClick(e)
            }}>
            {children}
        </button>
    )
}
