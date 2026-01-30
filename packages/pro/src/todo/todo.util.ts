import { addElementToArray, documentObject, generateUEID, moveElementInArray } from '@fold-ui/core'
import { useEffect } from 'react'

export type TodoEventName = 'edit-task' | 'add-task-below' | 'select'

export const dispatchTodoEvent = (eventName: TodoEventName, data: any = {}) =>
    documentObject.dispatchEvent(new CustomEvent('todo-' + eventName, { detail: data }))

export const useTodoEvent = (event: TodoEventName, handler, passive = false) => {
    useEffect(() => {
        documentObject.addEventListener('todo-' + event, handler, passive)
        return () => documentObject.removeEventListener('todo-' + event, handler)
    })
}

export const getSectionIndex = (id: string) => +id.split('-')[1]

export const flattenArrayWithLevel = (arr) => {
    const flattenedArray: any = []

    const flattenArray = (arr, level = 1) => {
        arr.map((task) => {
            // TODO: last task level is NaN ?
            let taskWithoutSubtasks = { ...task, level: level }
            delete taskWithoutSubtasks.tasks
            flattenedArray.push(taskWithoutSubtasks)
            if (task.tasks) flattenArray(task.tasks, level + 1)
        })
    }

    flattenArray(arr)
    return flattenedArray
}

export const nestObjectsByLevel = (array) => {
    return array
        .reduce(
            (r, { level, ...rest }) => {
                // TODO: investigate why level is being saved as NaN in flattenArray() above
                // if it's NaN then we use 1 (root) level
                const levelNumber = isNaN(level) ? 1 : level
                const value = { ...rest, tasks: [] }
                r[levelNumber] = value.tasks
                r[levelNumber - 1].push(value)
                return r
            },
            [[]]
        )
        .shift()
}

export const findTask = (data, taskId) => {
    let task: any = null

    const findTask = (tasks = [], taskId) => {
        tasks.map((t: any) => {
            if (t.id == taskId) task = t
            if (!!t.tasks) findTask(t.tasks, taskId)
        })
    }

    findTask(data, taskId)

    return task
}

export const deleteTask = (data, taskId) => {
    const removeTask = (tasks = [], taskId) => {
        return tasks.filter((t: any) => t.id != taskId).map((t: any) => ({ ...t, tasks: removeTask(t.tasks, taskId) }))
    }

    return data.map((section) => ({
        ...section,
        tasks: removeTask(section.tasks, taskId),
    }))
}

export const findSubtaskAmount = (tasks = []) => {
    let subtasks = 0

    const st = (tasks = []) => {
        tasks.map(({ tasks = [] }) => {
            subtasks++
            if (!!tasks.length) st(tasks)
        })
    }

    st(tasks)

    return subtasks
}

export const deleteTasks = (t, tasks = []) => {
    return [...tasks]
        .filter((task: any) => task.id != t.id)
        .map((task: any) => {
            return {
                ...task,
                tasks: deleteTasks(t, task.tasks),
            }
        })
}

export const deleteTaskSelection = (t, tasks = []) => {
    const ids = t.map((t) => t.id)

    return [...tasks]
        .filter((task: any) => !ids.includes(task.id))
        .map((task: any) => {
            return {
                ...task,
                tasks: deleteTaskSelection(t, task.tasks),
            }
        })
}

export const updateTasks = (t, tasks = []) => {
    return [...tasks].map((task: any) => {
        if (task.id == t.id) {
            return { ...task, ...t }
        } else {
            return { ...task, tasks: updateTasks(t, task.tasks) }
        }
    })
}

export const todoState = ({ task, setTask, sections, setSections }) => {
    const handleTaskOpen = (task) => {
        setTask(task)
    }

    // TODO: modularise these actions after selections & indentations

    const handleTaskUpdate = (taskData) => {
        const { position, ...rest } = taskData

        let tasks: any = []
        let task = { ...rest }
        let updatedData = sections.map((section) => ({
            ...section,
            tasks: updateTasks(task, section.tasks),
        }))

        // if there is positional sections from indenting/outdenting
        // from editing a task with the keyboard
        if (!!position) {
            const { indent, index, areaId, shouldUpdateIndent } = position

            if (shouldUpdateIndent) {
                // levels start from 1 (indent + 1)
                // set the level of the new task
                task.level = indent + 1

                // generate a flattened version of the nested task/tasks
                if (task.tasks) {
                    tasks = [
                        task,
                        ...flattenArrayWithLevel(task.tasks).map((obj) => ({ ...obj, level: obj.level + task.level })),
                    ]
                } else {
                    tasks = [task]
                }

                // remove the task from sections source
                // ------------------------------
                const sectionsWithoutTask = deleteTask(sections, task.id)

                // add task at new location
                // ------------------------------
                const sectionIndex = getSectionIndex(areaId)
                const targetIndex = index

                updatedData = sectionsWithoutTask.map((section, index) => {
                    if (index == sectionIndex) {
                        const flattenedSectionTasks = flattenArrayWithLevel(section.tasks)
                        flattenedSectionTasks.splice(targetIndex, 0, ...tasks)
                        return { ...section, tasks: nestObjectsByLevel(flattenedSectionTasks) }
                    } else {
                        return section
                    }
                })
            }
        }

        setSections(updatedData)
    }

    const handleTaskDelete = (task) => {
        setSections(
            sections.map((section) => ({
                ...section,
                tasks: deleteTasks(task, section.tasks),
            }))
        )
    }

    const handleSelectionDelete = (selection) => {
        const tasks = Object.keys(selection).map((key) => selection[key].task)

        setSections(
            sections.map((section) => ({
                ...section,
                tasks: deleteTaskSelection(tasks, section.tasks),
            }))
        )
    }

    const addTaskToTopOfSubtasks = (tasks, id, newTask) => {
        return tasks.map((task: any) => {
            if (task.id == id) {
                return {
                    ...task,
                    editable: false,
                    addBelow: false,
                    tasks: task.tasks ? [newTask, ...task.tasks] : [newTask],
                }
            } else {
                return task
            }
        })
    }

    const addTaskToSubtasks = (tasks = [], newTask, id, shouldIndent) => {
        const taskIndex = tasks.findIndex((task: any) => task.id == id)
        const taskPresent = taskIndex != -1

        if (taskPresent) {
            if (shouldIndent) {
                return addTaskToTopOfSubtasks(tasks, id, newTask)
            } else {
                return addElementToArray(tasks, taskIndex + 1, newTask)
            }
        } else {
            return tasks.map((task: any) => {
                return {
                    ...task,
                    tasks: addTaskToSubtasks(task.tasks || [], newTask, id, shouldIndent),
                }
            })
        }
    }

    const handleTaskAddBelow = ({ id, shouldIndent, task: { title, users, badges, labels } }) => {
        const newTask = {
            id: generateUEID(),
            addBelow: true,
            title,
            users,
            badges,
            labels,
        }

        setSections(
            sections.map((section) => ({
                ...section,
                tasks: addTaskToSubtasks(section.tasks, newTask, id, shouldIndent),
            }))
        )
    }

    const handleTaskAdd = ({ task, sectionIndex }) => {
        setSections(
            sections.map((section, index) =>
                sectionIndex == index
                    ? {
                          ...section,
                          tasks: [...section.tasks, { ...task, id: generateUEID() }],
                      }
                    : section
            )
        )
    }

    const handleSelectionMove = ({ origin, target, selection }) => {
        let tasks: any = []

        // 1. get the flattened selection
        // ------------------------------
        Object.keys(selection).map((key) => {
            let task = selection[key].task
            task.level = +target.indent + 1
            if (task.tasks) {
                tasks = [
                    ...tasks,
                    task,
                    ...flattenArrayWithLevel(task.tasks).map((obj) => ({ ...obj, level: obj.level + task.level })),
                ]
            } else {
                tasks = [...tasks, task]
            }
        })

        // 2. remove the tasks from sections source
        // ------------------------------
        let sectionsWithoutTasks = [...sections]
        tasks.map(({ id }) => {
            const sectionsWithoutTask = deleteTask(sectionsWithoutTasks, id)
            sectionsWithoutTasks = [...sectionsWithoutTask]
        })

        // 3. add task at new location
        // ------------------------------
        const { areaId } = target
        const sectionIndex = getSectionIndex(areaId)
        const targetIndex =
            target.moveDirection == 'up'
                ? target.index > origin.index && target.areaId == origin.areaId
                    ? target.index - 1
                    : target.index
                : target.index > origin.index && target.areaId == origin.areaId
                ? target.index - 1
                : target.index

        setSections(
            sectionsWithoutTasks.map((section, index) => {
                if (index == sectionIndex) {
                    const flattenedSectionTasks = flattenArrayWithLevel(section.tasks)
                    flattenedSectionTasks.splice(targetIndex, 0, ...tasks)
                    return { ...section, tasks: nestObjectsByLevel(flattenedSectionTasks) }
                } else {
                    return section
                }
            })
        )
    }

    const handleTaskMove = ({ origin, target, selection }) => {
        // if there is a selection
        // then handle it above (not here)
        if (Object.keys(selection).length == 0) {
            // 1. get the task + flatten version if there are subtasks
            // ------------------------------
            let tasks: any = []
            let task: any = findTask(sections, origin.elementId)

            // levels start from 1 (indent + 1)
            // set the level of the new task
            task.level = +target.indent + 1

            // generate a flattened version of the nested task/tasks
            if (task.tasks) {
                tasks = [
                    task,
                    ...flattenArrayWithLevel(task.tasks).map((obj) => ({ ...obj, level: obj.level + task.level })),
                ]
            } else {
                tasks = [task]
            }

            // 2. remove the task from sections source
            // ------------------------------
            const sectionsWithoutTask = deleteTask(sections, task.id)

            // 3. add task at new location
            // ------------------------------
            const { areaId } = target
            const sectionIndex = getSectionIndex(areaId)
            const targetIndex =
                target.moveDirection == 'up'
                    ? target.index > origin.index && target.areaId == origin.areaId
                        ? target.index - 1
                        : target.index
                    : target.index > origin.index && target.areaId == origin.areaId
                    ? target.index - 1
                    : target.index

            setSections(
                sectionsWithoutTask.map((section, index) => {
                    if (index == sectionIndex) {
                        const flattenedSectionTasks = flattenArrayWithLevel(section.tasks)
                        flattenedSectionTasks.splice(targetIndex, 0, ...tasks)
                        return { ...section, tasks: nestObjectsByLevel(flattenedSectionTasks) }
                    } else {
                        return section
                    }
                })
            )
        } else {
            handleSelectionMove({ origin, target, selection })
        }
    }

    // Section

    const handleSectionUpdate = (sec) => {
        setSections(sections.map((section) => (section.id == sec.id ? { ...section, ...sec } : section)))
    }

    const handleSectionDelete = (sec) => {
        setSections(sections.filter((section) => section.id != sec.id))
    }

    const handleSectionAdd = ({ name, sectionIndex }) => {
        setSections(
            addElementToArray(sections, sectionIndex + 1, {
                id: generateUEID(),
                name,
                tasks: [],
            })
        )
    }

    const handleSectionMove = ({ origin, target }) => {
        setSections(moveElementInArray(sections, origin, target))
    }

    return {
        handleTaskOpen,
        handleTaskUpdate,
        handleTaskDelete,
        handleSelectionDelete,
        addTaskToTopOfSubtasks,
        addTaskToSubtasks,
        handleTaskAddBelow,
        handleTaskAdd,
        handleSelectionMove,
        handleTaskMove,
        handleSectionUpdate,
        handleSectionDelete,
        handleSectionAdd,
        handleSectionMove,
    }
}
