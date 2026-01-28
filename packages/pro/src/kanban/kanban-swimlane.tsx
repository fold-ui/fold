import { ContextMenuContext, classNames, useDrag } from '@fold-dev/core'
import React, { useContext } from 'react'
import { KanbanColumns } from './kanban-columns'
import { KanbanContext } from './kanban.provider'
import { KanbanTypes } from './kanban.types'
import { getCustomSwimlaneGhostElement } from './kanban.util'

export type KanbanSwimlaneProps = {
    index: number
    linedColumnDrag?: boolean
} & KanbanTypes.Swimlane

export const KanbanSwimlane = (props: KanbanSwimlaneProps) => {
    const {
        id,
        title,
        description,
        prefix,
        fixed, // unused for drag purposes
        collapsed,
        color,
        header,
        columns,
        // from this component props:
        index,
        linedColumnDrag,
        ...rest
    } = props
    const { getStaticState, setCustomGhostElementRotation, setCustomGhostElement } = useDrag()
    const { setMenu } = useContext(ContextMenuContext)
    const { swimlaneHeader, instanceId, onSwimlaneUpdate } = useContext(KanbanContext)
    const SwimlaneHeader = swimlaneHeader
    const className = classNames({
        'f-kanban-swimlane': true,
        'f-col': true,
        'is-collapsed': collapsed,
    })

    const handleMouseDown = (e) => {
        setCustomGhostElementRotation('0deg')
        setCustomGhostElement(getCustomSwimlaneGhostElement(title))
    }

    const handleCollapse = () => {
        onSwimlaneUpdate({ id, instanceId, collapsed: !collapsed })
    }

    const handleTitleChange = (title) => {
        onSwimlaneUpdate({ id, instanceId, title })
    }

    const handleMenuClick = (e) => {
        setMenu(
            {
                target: 'kanban-swimlane',
                payload: { id, title, description, color, collapsed: collapsed },
            },
            {
                x: e.clientX,
                y: e.clientY,
            }
        )
    }

    return (
        <div
            {...rest}
            onMouseDown={handleMouseDown}
            className={className}>
            {header && (
                <SwimlaneHeader
                    color={color}
                    title={title}
                    description={description}
                    prefix={prefix}
                    collapsed={collapsed}
                    onCollapse={handleCollapse}
                    onTitleChange={handleTitleChange}
                    onMenuClick={handleMenuClick}
                />
            )}

            {!collapsed && (
                <KanbanColumns
                    columns={columns}
                    swimlaneIndex={index}
                    swimlaneId={id}
                    linedColumnDrag={linedColumnDrag}
                />
            )}
        </div>
    )
}
