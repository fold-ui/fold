import React, { HTMLAttributes } from 'react'
import { classNames } from '../helpers'

export type ShootingStarsProps = {
    count?: number
} & HTMLAttributes<HTMLDivElement>

export const ShootingStars = ({ count = 10, className, ...rest }: ShootingStarsProps) => (
    <div
        {...rest}
        aria-hidden="true"
        className={classNames({ 'f-shooting-stars': true }, [className])}>
        {Array.from({ length: Math.max(0, count) }).map((_, index) => (
            <span
                className="f-shooting-stars__star"
                key={index}
            />
        ))}
    </div>
)
