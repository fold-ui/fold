import React from 'react'
import { TodoTask } from './todo-task'
import { TodoTypes } from './todo.types'

export type TodoTasks = {
    parentColor?: string
    tasks: TodoTypes.Task[]
    visible: boolean
    indent?: number
    parentSelected?: boolean
}

export const TodoTasks = (props: TodoTasks) => {
    const { tasks = [], visible = true, indent = 0, parentSelected = false } = props

    return (
        <>
            {tasks.map((task: any, index: number) => (
                <TodoTask
                    key={task.id}
                    task={task}
                    visible={visible}
                    indent={indent}
                    parentSelected={parentSelected}
                />
            ))}
        </>
    )
}
