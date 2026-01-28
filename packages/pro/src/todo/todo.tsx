import { CoreViewProps, View, classNames, getKey, useDragEvent, useEvent, windowObject } from '@fold-dev/core'
import React, { ReactNode, useContext, useRef } from 'react'
import { TodoSections } from './todo-sections'
import { TodoContext } from './todo.provider'
import { TodoTypes } from './todo.types'
import { useTodoEvent } from './todo.util'

export const FOLD_TODO_SHIFT_FLAG = 'FOLD_TODO_SHIFT_FLAG'
export const FOLD_SELECTION_CACHE = 'FOLD_SELECTION_CACHE'
export const FOLD_TODO_SECTION_AREAID_CACHE = 'FOLD_TODO_SECTION_AREAID_CACHE'

windowObject[FOLD_TODO_SHIFT_FLAG] = false
windowObject[FOLD_SELECTION_CACHE] = {}
windowObject[FOLD_TODO_SECTION_AREAID_CACHE] = null

export type TodoProps = {
    sections: TodoTypes.Section[]
    toolbar?: (selection: any) => ReactNode
} & CoreViewProps

export const Todo = (props: TodoProps) => {
    const { sections = [], toolbar, ...rest } = props
    const ref = useRef(null)
    const { onTaskMove, onSectionMove, selection, setSelection } = useContext(TodoContext)
    const className = classNames(
        {
            'f-todo': true,
        },
        [props.className]
    )

    const clearSelection = () => {
        if (Object.keys(selection).length != 0) setSelection({})
    }

    const handleKeyDown = (e) => {
        const { isEscape } = getKey(e)
        if (isEscape) windowObject[FOLD_TODO_SECTION_AREAID_CACHE] = null
    }

    const handleDragOnDrop = ({ detail }) => {
        const { origin, target } = detail

        switch (origin.group) {
            case 'tasks':
                // dropping on an empty section, we manually create the target
                // see todo-section.tsx
                if (
                    target.areaId != windowObject[FOLD_TODO_SECTION_AREAID_CACHE] &&
                    !!windowObject[FOLD_TODO_SECTION_AREAID_CACHE]
                ) {
                    onTaskMove({
                        origin,
                        target: {
                            areaId: windowObject[FOLD_TODO_SECTION_AREAID_CACHE],
                            moveDirection: 'down',
                            index: 0,
                        },
                        selection,
                    })
                } else {
                    // TODO: include sorting (Kanban) that accommodates nesting
                    onTaskMove({ origin, target, selection })
                }
                break
            case 'sections':
                onSectionMove({ origin, target })
                break
        }

        clearSelection()
    }

    const handleClick = (e) => {
        if (!ref.current.contains(e?.target)) {
            setSelection({})
        }
    }

    useDragEvent('ondrop', handleDragOnDrop)

    useEvent('click', handleClick)
    useEvent('keydown', handleKeyDown)

    return (
        <View
            {...rest}
            ref={ref}
            className={className}>
            <TodoSections sections={sections} />
            {toolbar ? toolbar({ selection }) : null}
        </View>
    )
}
