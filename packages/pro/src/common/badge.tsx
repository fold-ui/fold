import { IconLib, ProgressCircle } from '@fold-dev/core'
import React from 'react'

export type BadgesBadge = {
    icon?: string
    color?: string
    progress?: number
    label?: string
}

export type BadgeProps = BadgesBadge

export const Badge = ({ icon, label, color, progress }: BadgeProps) => {
    return (
        <span
            className="f-row f-badges"
            style={{ color, gap: 4 }}>
            {icon && (
                <IconLib
                    icon={icon}
                    size="sm"
                />
            )}
            {progress && (
                <ProgressCircle
                    value={progress}
                    size={12}
                    thickness={28}
                    style={{
                        '--f-progress-background': 'var(--f-color-surface-strong)',
                        '--f-progress-active': color || 'var(--f-color-surface-strongest)',
                    }}
                />
            )}
            {label && (
                <span
                    className="f-text sm"
                    style={{ color: 'inherit' }}>
                    {label}
                </span>
            )}
        </span>
    )
}
