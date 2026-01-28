import { getKey, useEvent, useId, useWindowEvent, windowObject } from '@fold-dev/core'
import React, { ReactElement, createContext, useState } from 'react'
import { LabelSelectLabel, TodoTaskItem, UserSelectUser } from '../'
import { FOLD_TODO_SHIFT_FLAG } from './todo'
import { TodoSectionHeader, TodoSectionHeaderProps } from './todo-section-header'
import { TodoTaskProps } from './todo-task'
import { useTodoEvent } from './todo.util'

export type TodoProviderProps = {
    id?: string
    defaultSelection: any
    defaultInteraction?: 'lined' | 'animated'
    targetVariant?: any
    task?: (props: TodoTaskProps) => ReactElement
    sectionHeader?: (props: TodoSectionHeaderProps) => ReactElement
    onTaskOpen: (value) => void
    onTaskUpdate: (value) => void
    onTaskAdd: (value) => void
    onTaskAddBelow: (value) => void
    onTaskMove: (value) => void
    onSectionUpdate: (value) => void
    onSectionAdd: (value) => void
    onSectionMove: (value) => void
    children: ReactElement
}

export const TodoContext = createContext<any>({})

export const TodoProvider = (props: TodoProviderProps) => {
    const {
        id,
        defaultSelection = {},
        defaultInteraction = 'animated',
        targetVariant,
        task = TodoTaskItem,
        sectionHeader = TodoSectionHeader,
        onTaskOpen,
        onTaskUpdate,
        onTaskAdd,
        onTaskAddBelow,
        onTaskMove,
        onSectionUpdate,
        onSectionAdd,
        onSectionMove,
        children,
    } = props
    const instanceId = useId(id)
    const iid = instanceId
    const [nested, setNested] = useState(false)
    const [selection, setSelection] = useState(defaultSelection)
    const [isShift, setIsShift] = useState(false)

    const handleKeyUp = (e) => {
        setIsShift(false)
        windowObject[FOLD_TODO_SHIFT_FLAG] = false
    }

    const hanleKeyDown = (e) => {
        const { isShift, isBackspace, isEscape } = getKey(e)

        setIsShift(isShift)

        if (isShift) windowObject[FOLD_TODO_SHIFT_FLAG] = true
        if (isEscape) setSelection({})
        if (isBackspace) setSelection({})
    }

    const handleSelectTasks = ({ detail: { instanceId, ...rest } }) => {
        if (iid == instanceId) setSelection({ ...rest })
    }

    useTodoEvent('select', handleSelectTasks)

    useWindowEvent('keydown', hanleKeyDown)
    useEvent('keyup', handleKeyUp)

    return (
        <TodoContext.Provider
            value={{
                targetVariant,
                task,
                sectionHeader,
                selection,
                setSelection,
                nested,
                setNested,
                instanceId,
                defaultInteraction,
                onTaskOpen,
                onTaskUpdate,
                onTaskAdd,
                onTaskAddBelow,
                onTaskMove,
                onSectionUpdate,
                onSectionAdd,
                onSectionMove,
            }}>
            {children}
        </TodoContext.Provider>
    )
}
