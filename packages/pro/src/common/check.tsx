import { CheckboxAlt, CheckboxProps, classNames } from '@fold-ui/core'
import React, { useMemo } from 'react'
import { Priority } from './priority-button'

export type CheckProps = {
    priority?: Priority
    onCheck: (e) => void
    checked: boolean
    iconProps?: any
} & CheckboxProps

export const Check = ({ priority, onCheck, checked, ...rest }: CheckProps) => {
    const className = classNames({
        'f-check': true,
        'f-row': true,
        'is-high': priority == 'high',
        'is-medium': priority == 'medium',
        'is-low': priority == 'low',
    })

    return (
        <div className={className}>
            <CheckboxAlt
                icon="check"
                checked={checked}
                iconProps={{ size: 'xs' }}
                {...rest}
                onChange={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onCheck(!checked)
                }}
            />
        </div>
    )
}
