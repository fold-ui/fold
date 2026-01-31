import React, { ReactElement, ReactNode } from 'react'
import { Heading, IconLib, Text, View } from '..'
import { classNames } from '../helpers'
import { CoreViewProps } from '../types'

export type StatProps = {
    label?: string
    labelTool?: ReactNode
    number?: number | string
    icon?: string
    description?: string | number
    descriptionTool?: ReactNode
    footer?: ReactElement
    header?: ReactElement
} & CoreViewProps

export const Stat = (props: StatProps) => {
    const { label, labelTool, number, icon, description, descriptionTool, footer, header, ...rest } = props
    const className = classNames(
        {
            'f-stat': true,
        },
        [props.className]
    )

    return (
        <View
            {...rest}
            column
            className={className}
            alignItems="flex-start">
            {header}
            {label && (
                <View
                    row
                    justifyContent="flex-start"
                    width="100%">
                    <Text m="0 auto 0 0">{label}</Text>
                    {labelTool}
                </View>
            )}
            {number != null && <Heading>{number}</Heading>}
            {(icon || descriptionTool || description) && (
                <div className="f-row f-stat-footer">
                    {icon && <IconLib icon={icon} />}
                    {descriptionTool}
                    {description && <Text size="sm" as="span">{description}</Text>}
                </div>
            )}
            {footer}
        </View>
    )
}
