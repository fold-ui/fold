import { IconLib, Text, classNames } from '@fold-ui/core'
import React, { useState } from 'react'
import { TodoTaskEditor } from './todo-task-editor'

export type TodoAddTaskProps = {
    onAdd: (value: string) => void
}

export const TodoAddTask = (props: TodoAddTaskProps) => {
    const { onAdd } = props
    const [editor, setEditor] = useState(false)
    const [task, setTask] = useState({ title: '' })
    const className = classNames({
        'f-todo-add-task': true,
        'is-editor': editor,
    })

    const handleSave = (task) => {
        onAdd(task)
        setTask({ title: '' })
    }

    const handleDismiss = () => {
        setEditor(false)
    }

    return (
        <div className={className}>
            <div
                className="f-todo-add-task__inner f-row"
                onClick={() => setEditor(true)}>
                <IconLib icon="plus" />

                {!editor && (
                    <Text
                        color="inherit"
                        className="f-buttonize">
                        {task.title || 'Task title'}
                    </Text>
                )}

                {editor && (
                    <div className="f-todo-add-task__editor">
                        <TodoTaskEditor
                            id="f-todo-add-task__editor"
                            title={task.title}
                            onSave={handleSave}
                            onDismiss={handleDismiss}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
