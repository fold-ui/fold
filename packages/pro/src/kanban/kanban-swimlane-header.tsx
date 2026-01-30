import { Editable, Flexer, Heading, IconLib, Text, getForegroundColor } from '@fold-ui/core'
import React, { ReactElement, useMemo } from 'react'

export type KanbanSwimlaneHeaderProps = {
    color: string
    title: string
    description: string
    prefix?: ReactElement
    collapsed: boolean
    onCollapse: any
    onTitleChange: any
    onMenuClick: any
}

export const KanbanSwimlaneHeader = (props: KanbanSwimlaneHeaderProps) => {
    const { color, title, description, prefix, collapsed, onCollapse, onTitleChange, onMenuClick } = props
    const style = useMemo(
        () =>
            color
                ? {
                      color: getForegroundColor(color),
                      background: color,
                      borderColor: color,
                  }
                : {},
        [color]
    )

    const handleClick = (e: any) => {
        if (e.target == e.currentTarget) {
            e.preventDefault()
            e.stopPropagation()
            onCollapse()
        }
    }

    return (
        <div
            style={style}
            onClick={handleClick}
            className="f-kanban-swimlane-header f-row f-buttonize-outline">
            {prefix}
            <Editable onChange={onTitleChange}>
                <Heading
                    as="h4"
                    fontWeight="bold"
                    color={style.color}>
                    {title}
                </Heading>
            </Editable>
            <Text style={{ opacity: 0.7, pointerEvents: 'none' }}>{description}</Text>
            <Flexer />
            <IconLib
                style={{ '--f-icon-stroke-width-md': '1' }}
                stroke="currentColor"
                icon="more-h"
                className="f-buttonize"
                color={style.color}
                onClick={onMenuClick}
            />
        </div>
    )
}
