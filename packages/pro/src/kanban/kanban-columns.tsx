import { DragArea } from '@fold-ui/core'
import React from 'react'
import { KanbanColumn } from './kanban-column'
import { KanbanTypes } from './kanban.types'

export type KanbanColumnsProps = {
    linedColumnDrag?: boolean
    columns: KanbanTypes.Column[]
    swimlaneId?: string
    swimlaneIndex?: number
}

export const KanbanColumns = (props: KanbanColumnsProps) => {
    const { linedColumnDrag, columns, swimlaneIndex, swimlaneId } = props

    return (
        <DragArea
            areaId="swimlaneId" // this enables the column to be dragged in every swimlane
            variant={linedColumnDrag ? 'lined' : 'animated'}
            group="columns"
            direction="horizontal"
            className="f-kanban-columns">
            {columns.map((column: KanbanTypes.Column, index: number) => {
                const {
                    id,
                    name,
                    description,
                    prefix,
                    color,
                    cards,
                    collapsed,
                    collapsible,
                    addCard,
                    editableName,
                    cardCount,
                    locked,
                } = column

                return (
                    <KanbanColumn
                        key={index}
                        id={id}
                        name={name}
                        description={description}
                        prefix={prefix}
                        color={color}
                        cards={cards}
                        collapsed={collapsed}
                        collapsible={collapsible}
                        swimlaneIndex={swimlaneIndex}
                        addCard={addCard}
                        editableName={editableName}
                        cardCount={cardCount}
                        locked={locked}
                        data-nodrag={locked}
                        data-nodrop={locked}
                        index={index}
                    />
                )
            })}
        </DragArea>
    )
}
