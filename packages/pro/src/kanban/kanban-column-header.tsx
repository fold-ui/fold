import { ContextMenuContext, Editable, Heading, IconLib, Pill, ProgressPie } from '@fold-ui/core'
import React, { ReactElement, useContext, useMemo } from 'react'
import { KanbanContext } from './kanban.provider'

export type KanbanColumnHeaderProps = {
    id: string
    name: string
    prefix?: ReactElement
    description?: string
    color?: string
    cards?: number
    cardsCompleted?: number
    collapsed?: boolean
    collapsible?: boolean
    onCollapseToggle?: any
    editableName?: boolean
    cardCount?: boolean
}

export const KanbanColumnHeader = (props: KanbanColumnHeaderProps) => {
    const {
        id,
        name,
        description,
        prefix,
        color,
        cards = 0,
        cardsCompleted = 0,
        collapsed,
        collapsible = true,
        onCollapseToggle,
        editableName = true,
        cardCount = true,
    } = props
    const { onColumnUpdate } = useContext(KanbanContext)
    const { setMenu } = useContext(ContextMenuContext)
    const progress = useMemo(() => Math.round((cardsCompleted / cards) * 100), [cards, cardsCompleted])

    const handleChange = (title) => {
        onColumnUpdate({ id, title })
    }

    const handleMenuClick = (e) => {
        setMenu(
            {
                target: 'kanban-column',
                payload: { id, name, description, color },
            },
            { x: e.clientX, y: e.clientY }
        )
    }

    return (
        <div className="f-kanban-column-header">
            <div
                className="f-kanban-column-header-name f-row"
                style={{ color }}>
                {!prefix && (
                    <ProgressPie
                        value={progress}
                        size={16}
                        padding={2}
                        radius={50}
                        style={{
                            '--f-progress-background': 'var(--f-kanban-column-background)',
                            '--f-progress-active': color || 'var(--f-kanban-column-header-color)',
                            'border': '2px solid ' + (color || 'var(--f-kanban-column-header-color)'),
                        }}
                    />
                )}

                {prefix}

                <Editable
                    color={color}
                    onChange={handleChange}
                    disabled={!editableName || collapsed}>
                    <Heading
                        as="h4"
                        fontWeight={700}
                        color="inherit">
                        {name}
                    </Heading>
                </Editable>

                {cardCount && (
                    <Pill
                        subtle
                        height="1.5rem"
                        size="sm"
                        color={color ? color : undefined}
                        style={
                            color
                                ? undefined
                                : { '--f-pill-background-color-subtle': 'var(--f-color-surface-stronger)' }
                        }>
                        {cards}
                    </Pill>
                )}

                <div className="f-flexer" />
                {/* 
                {!collapsed && collapsible && (
                    <IconLib
                        icon="minimize"
                        className="f-buttonize"
                        color={color}
                        onClick={onCollapseToggle}
                    />
                )}
                */}
                {!collapsed && (
                    <IconLib
                        style={{ '--f-icon-stroke-width-md': '1' }}
                        stroke="currentColor"
                        icon="more-h"
                        className="f-buttonize"
                        color={color}
                        onClick={handleMenuClick}
                    />
                )}
            </div>

            {collapsed && collapsible && (
                <IconLib
                    icon="maximize"
                    className="f-buttonize"
                    color={color}
                    style={{ marginTop: 'auto' }}
                />
            )}

            {!collapsed && description && (
                <div className="f-row f-kanban-column-header-description f-text">{description}</div>
            )}
        </div>
    )
}
