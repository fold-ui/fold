import { getKey, useEvent, useId, useWindowEvent, windowObject } from '@fold-ui/core'
import React, { ReactElement, createContext, useState } from 'react'
import { FOLD_KANBAN_SHIFT_FLAG } from './kanban'
import { KanbanCard, KanbanCardProps } from './kanban-card'
import { KanbanColumnHeader, KanbanColumnHeaderProps } from './kanban-column-header'
import { KanbanSwimlaneHeader, KanbanSwimlaneHeaderProps } from './kanban-swimlane-header'
import { useKanbanEvent } from './kanban.util'

export type KanbanProviderProps = {
    id?: string
    addColumn?: boolean
    defaultSelection: any
    defaultInteraction?: 'lined' | 'animated'
    targetVariant?: any
    card?: (props: KanbanCardProps) => ReactElement
    columnHeader?: (props: KanbanColumnHeaderProps) => ReactElement
    swimlaneHeader?: (props: KanbanSwimlaneHeaderProps) => ReactElement
    __columnHighlightTimeout?: number
    children: ReactElement
    onCardOpen: (val) => void
    onCardAdd: (val) => void
    onCardUpdate: (val) => void
    onCardMove: (val, sel) => void
    onColumnAdd: (val) => void
    onColumnMove: (val) => void
    onSwimlaneMove: (val) => void
    onColumnUpdate: (val) => void
    onSwimlaneUpdate: (val) => void
}

export const KanbanContext = createContext<any>({})

export const KanbanProvider = (props: KanbanProviderProps) => {
    const {
        id,
        addColumn = true,
        defaultSelection = {},
        defaultInteraction = 'animated',
        targetVariant,
        card = KanbanCard,
        columnHeader = KanbanColumnHeader,
        swimlaneHeader = KanbanSwimlaneHeader,
        children,
        __columnHighlightTimeout = 250,
        onCardOpen,
        onCardAdd,
        onCardUpdate,
        onCardMove,
        onColumnAdd,
        onColumnMove,
        onSwimlaneMove,
        onColumnUpdate,
        onSwimlaneUpdate, // unused
    } = props
    const instanceId = useId(id)
    const iid = instanceId
    const [selection, setSelection] = useState(defaultSelection)
    const [isShift, setIsShift] = useState(false)

    const handleKeyUp = (e) => {
        setIsShift(false)
        windowObject[FOLD_KANBAN_SHIFT_FLAG] = false
    }

    const hanleKeyDown = (e) => {
        const { isShift, isBackspace, isEscape } = getKey(e)

        setIsShift(isShift)

        if (isShift) windowObject[FOLD_KANBAN_SHIFT_FLAG] = true
        if (isEscape) setSelection({})
        if (isBackspace) setSelection({})
    }

    const handleSelectTasks = ({ detail: { instanceId, ...rest } }) => {
        if (iid == instanceId) setSelection({ ...rest })
    }

    useKanbanEvent('select', handleSelectTasks)

    useWindowEvent('keydown', hanleKeyDown)
    useEvent('keyup', handleKeyUp)

    return (
        <KanbanContext.Provider
            value={{
                instanceId: id,
                addColumn,
                targetVariant,
                selection,
                setSelection,
                card,
                columnHeader,
                swimlaneHeader,
                defaultInteraction,
                __columnHighlightTimeout,
                onCardOpen,
                onCardAdd,
                onCardUpdate,
                onCardMove,
                onColumnAdd,
                onColumnMove,
                onSwimlaneMove,
                onColumnUpdate,
                onSwimlaneUpdate,
            }}>
            {children}
        </KanbanContext.Provider>
    )
}
