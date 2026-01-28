import { ContextMenuContext, Editable, Heading, IconLib, Pill, ProgressPie, classNames, useDrag } from '@fold-dev/core'
import React, { ReactElement, useContext, useMemo } from 'react'
import { TodoContext } from './todo.provider'
import { dispatchTodoEvent } from './todo.util'
import { getCustomGhostElement } from '../helpers'

export type TodoSectionHeaderProps = {
    id: string
    name: string
    description?: string
    color?: string
    prefix?: ReactElement
    tasks?: number
    tasksCompleted?: number
    collapsed?: boolean
    collapsible?: boolean
    editableName?: boolean
    taskCount?: boolean
}

export const TodoSectionHeader = (props: TodoSectionHeaderProps) => {
    const {
        id,
        name,
        description,
        color,
        prefix,
        tasks,
        tasksCompleted,
        collapsed,
        collapsible,
        editableName,
        taskCount,
    } = props
    const visible = !collapsed
    const { setMenu } = useContext(ContextMenuContext)
    const progress = useMemo(() => Math.round((tasksCompleted / tasks) * 100), [tasks, tasksCompleted])
    const { setCustomGhostElement, setCustomGhostElementRotation } = useDrag()
    const { onSectionUpdate } = useContext(TodoContext)
    const className = classNames({
        'f-todo-section-header': true,
        'f-row': true,
        'is-visible': visible,
    })

    const handleChange = (title) => {
        onSectionUpdate({ id, title })
    }

    const handleCollapse = (e) => {
        onSectionUpdate({ id, collapsed: !collapsed })
    }

    const handleMenuClick = (e) => {
        setMenu(
            {
                target: 'todo-section',
                payload: { id, name, description, color, collapsed },
            },
            { x: e.clientX, y: e.clientY }
        )
    }

    const handleMouseDown = (e) => {
        setCustomGhostElementRotation('0deg')
        setCustomGhostElement(getCustomGhostElement(name, 0))
    }

    return (
        <div
            onMouseDown={handleMouseDown}
            className={className}>
            <div
                onClick={handleCollapse}
                className="f-todo-section-header__collapse f-row f-buttonize">
                {collapsible && (
                    <IconLib
                        size="xs"
                        icon="chevron-down"
                        className="f-todo-collapse-icon"
                        color={color}
                    />
                )}
            </div>

            <div
                className="f-todo-section-header__inner f-row"
                style={{ color }}>
                {!prefix && (
                    <ProgressPie
                        value={progress}
                        size={16}
                        padding={2}
                        radius={50}
                        style={{
                            '--f-progress-background': 'var(--f-todo-background)',
                            '--f-progress-active': color || 'var(--f-todo-section-header-color)',
                            'border': '2px solid ' + (color || 'var(--f-todo-section-header-color)'),
                        }}
                    />
                )}

                <Editable
                    color={color}
                    onChange={handleChange}
                    disabled={!editableName}>
                    <Heading
                        as="h4"
                        fontWeight={700}
                        color="inherit">
                        {name}
                    </Heading>
                </Editable>

                {taskCount && (
                    <Pill
                        subtle
                        size="sm"
                        color={color ? color : undefined}
                        style={
                            color
                                ? undefined
                                : { '--f-pill-background-color-subtle': 'var(--f-color-surface-stronger)' }
                        }>
                        {tasks}
                    </Pill>
                )}

                <div className="f-todo-section-header__description f-text f-ellipsis">{description}</div>

                <IconLib
                    icon="more-h"
                    className="f-buttonize"
                    color="var(--f-color-text-weakest)"
                    onClick={handleMenuClick}
                />
            </div>
        </div>
    )
}
