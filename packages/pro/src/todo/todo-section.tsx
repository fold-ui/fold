import {
    DragElement,
    DragElementArea,
    classNames,
    getItemsSelected,
    useDrag,
    useDragEvent,
    useEvent,
    waitForRender,
    windowObject,
} from '@fold-ui/core'
import React, { useContext, useMemo, useRef, useState } from 'react'
import { FOLD_TODO_SECTION_AREAID_CACHE, TodoAddTask, TodoTasks } from './'
import { TodoAddSection } from './todo-add-section'
import { TodoContext } from './todo.provider'
import { TodoTypes } from './todo.types'
import { dispatchTodoEvent } from './todo.util'
import { FOLD_KANBAN_COLUMN_AREAID_CACHE } from '../'

export type TodoSectionProps = {
    index?: number
} & TodoTypes.Section

export const TodoSection = (props: TodoSectionProps) => {
    const {
        index,
        id,
        name,
        description,
        header = true,
        locked,
        collapsed,
        collapsible = true,
        prefix,
        color,
        tasks = [],
        addSection = true,
        addTask = true,
        editableName = true,
        taskCount = true,
    } = props
    const { targetVariant, sectionHeader, instanceId, defaultInteraction } = useContext(TodoContext)
    const areaId = `i-${index}`
    const sectionIndex = index
    const { getStaticState } = useDrag()
    const { nested, onTaskAdd, onSectionAdd } = useContext(TodoContext)
    const SectionHeader = sectionHeader
    const [targetColumn, setTargetColumn] = useState(0)
    const completed = useMemo(() => tasks.filter((task) => task.complete).length, [tasks])
    const className = classNames({
        'f-todo-section': true,
        'is-collapsed': collapsed,
    })

    const handleTaskAdd = (task) => {
        onTaskAdd({
            task,
            sectionIndex: index,
        })
    }

    const handleMouseLeave = (e) => {
        setTargetColumn(0)
    }

    const handleMouseEnter = (e) => {
        windowObject[FOLD_TODO_SECTION_AREAID_CACHE] = areaId

        if (!collapsed) {
            const { target, origin } = getStaticState()
            const { height } = origin
            const differentTargetArea = target.areaId != windowObject[FOLD_TODO_SECTION_AREAID_CACHE]
            const isDragging = !!origin.areaId
            setTargetColumn(!tasks.length && isDragging && differentTargetArea ? height : 0)
        }
    }

    const handleMouseUp = (e) => {
        waitForRender(() => setTargetColumn(null))
    }

    const handleSectionAdd = (name: string) => {
        onSectionAdd({
            name,
            sectionIndex: index,
        })
    }

    useEvent('mouseup', handleMouseUp)

    return (
        <DragElement
            noDrag={locked}
            noDrop={locked}
            zIndex={100 - index}
            className={className}>
            {header && (
                <SectionHeader
                    id={id}
                    name={name}
                    description={description}
                    prefix={prefix}
                    color={color}
                    tasks={tasks.length}
                    tasksCompleted={completed}
                    collapsed={collapsed}
                    collapsible={collapsible}
                    editableName={editableName}
                    taskCount={taskCount}
                />
            )}

            {!collapsed && (
                <div
                    className="f-todo-section__tasks"
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={handleMouseEnter}>
                    <DragElementArea
                        indent
                        group="tasks"
                        variant={nested ? 'lined' : defaultInteraction}
                        areaId={areaId}
                        targetVariant={targetVariant}
                        className="f-todo-section__tasks-inner"
                        footer={
                            !!targetColumn ? (
                                <div
                                    className="f-todo-section__placeholder"
                                    style={{ height: targetColumn }}
                                />
                            ) : null
                        }>
                        <TodoTasks
                            tasks={tasks}
                            indent={0}
                            visible={true}
                        />
                    </DragElementArea>
                </div>
            )}

            {!collapsed && (
                <>
                    {addTask && <TodoAddTask onAdd={handleTaskAdd} />}
                    {addSection && <TodoAddSection onAdd={handleSectionAdd} />}
                </>
            )}
        </DragElement>
    )
}
