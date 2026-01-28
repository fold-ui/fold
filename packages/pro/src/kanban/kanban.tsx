import { CoreViewProps, View, classNames, useDragEvent, useEvent, waitForRender, windowObject } from '@fold-dev/core'
import React, { ReactNode, useContext, useRef } from 'react'
import { KanbanAddColumn } from './kanban-add-column'
import { KanbanSwimlanes } from './kanban-swimlanes'
import { KanbanContext } from './kanban.provider'
import { KanbanSelection, KanbanTypes } from './kanban.types'
import { dispatchKanbanEvent, getColumnAndSwimlaneIndex, useKanbanEvent } from './kanban.util'

export const FOLD_KANBAN_SHIFT_FLAG = 'FOLD_KANBAN_SHIFT_FLAG'
export const FOLD_KANBAN_COLUMN_AREAID_CACHE = 'FOLD_KANBAN_COLUMN_AREAID_CACHE'
export const FOLD_KANBAN_SELECTION_CACHE = 'FOLD_KANBAN_SELECTION_CACHE'

windowObject[FOLD_KANBAN_SELECTION_CACHE] = {}
windowObject[FOLD_KANBAN_COLUMN_AREAID_CACHE] = null

export type KanbanProps = {
    swimlanes: KanbanTypes.Swimlane[]
    toolbar?: (selection: any) => ReactNode
} & CoreViewProps

export const Kanban = (props: KanbanProps) => {
    const { swimlanes = [], toolbar, ...rest } = props
    const {
        instanceId,
        selection,
        setSelection,
        addColumn,
        onCardOpen,
        onCardAdd,
        onCardUpdate,
        onCardMove,
        onColumnAdd,
        onColumnMove,
        onSwimlaneMove,
        onColumnUpdate,
        onSwimlaneUpdate,
    } = useContext(KanbanContext)
    const containerRef = useRef(null)
    const iid = instanceId
    const className = classNames(
        {
            'f-kanban': true,
            'f-row': true,
        },
        [props.className]
    )

    const clearSelection = () => {
        if (Object.keys(selection).length != 0) setSelection({})
    }

    const handleDragOnDrop = ({ detail }) => {
        const { origin, target } = detail

        switch (origin.group) {
            case 'cards':
                const selected: KanbanSelection[] = Object.keys(selection)
                    .map((key) => selection[key])
                    .sort((a: KanbanSelection, b: KanbanSelection) => (a.index < b.index ? -1 : 0))

                // user is dropping the card in the column: no position
                // then take the last index (cards.length)
                if (
                    windowObject[FOLD_KANBAN_COLUMN_AREAID_CACHE] != target.areaId &&
                    !!windowObject[FOLD_KANBAN_COLUMN_AREAID_CACHE]
                ) {
                    const { swimlane, column } = getColumnAndSwimlaneIndex(
                        windowObject[FOLD_KANBAN_COLUMN_AREAID_CACHE]
                    )
                    const index = swimlanes[swimlane].columns[column].cards.length
                    const target = {
                        areaId: windowObject[FOLD_KANBAN_COLUMN_AREAID_CACHE],
                        index,
                        moveDirection: 'down',
                    }

                    onCardMove({ origin, target }, selected)
                } else {
                    onCardMove({ origin, target }, selected)
                }

                // clear the selection
                windowObject[FOLD_KANBAN_SELECTION_CACHE] = {}

                break
            case 'columns':
                return onColumnMove({ origin, target })
            case 'swimlanes':
                return onSwimlaneMove({ origin, target })
        }

        clearSelection()
    }

    const handleAddColumn = (value: string) => {
        onColumnAdd({ instanceId, value, swimlaneIndex: 0 })
        waitForRender(() => {
            containerRef.current.scrollTo({
                left: containerRef.current.scrollWidth - containerRef.current.clientWidth,
                behavior: 'smooth',
            })
        }, 100)
    }

    const handleClick = (e) => {
        if (!containerRef.current.contains(e?.target)) {
            setSelection({})
        }
    }

    useDragEvent('ondrop', handleDragOnDrop)

    useEvent('click', handleClick)

    return (
        <View
            {...rest}
            ref={containerRef}
            className={className}>
            <KanbanSwimlanes swimlanes={swimlanes} />
            {addColumn && <KanbanAddColumn onAdd={handleAddColumn} />}
            {toolbar ? toolbar({ selection }) : null}
        </View>
    )
}
