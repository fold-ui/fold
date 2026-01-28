import { DragArea } from '@fold-dev/core'
import React from 'react'
import { KanbanSwimlane } from './kanban-swimlane'
import { KanbanTypes } from './kanban.types'

export type KanbanSwimlanesProps = {
    swimlanes: KanbanTypes.Swimlane[]
}

export const KanbanSwimlanes = (props: KanbanSwimlanesProps) => {
    const { swimlanes } = props

    return (
        <DragArea
            variant="lined"
            group="swimlanes"
            className="f-kanban-swimlanes f-col">
            {swimlanes.map((swimlane: any, index: number) => {
                const { id, title, description, color, prefix, fixed, collapsed, header = true, columns } = swimlane

                return (
                    <KanbanSwimlane
                        key={id}
                        id={id}
                        columns={columns}
                        title={title}
                        prefix={prefix}
                        description={description}
                        color={color}
                        collapsed={collapsed}
                        header={header}
                        index={index}
                        data-nodrag={fixed}
                        data-nodrop={fixed}
                        linedColumnDrag={swimlanes.length > 1}
                    />
                )
            })}
        </DragArea>
    )
}
