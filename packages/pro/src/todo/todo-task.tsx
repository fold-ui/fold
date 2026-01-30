import {
    ContextMenuContext,
    DragElement,
    documentObject,
    getDragState,
    getKey,
    useDrag,
    useEvent,
    windowObject,
} from '@fold-ui/core'
import React, { useContext, useLayoutEffect, useMemo, useRef, useState } from 'react'
import {
    FOLD_TODO_SHIFT_FLAG,
    TodoContext,
    TodoTaskEditor,
    TodoTaskItemProps,
    TodoTasks,
    TodoTypes,
    dispatchTodoEvent,
    findSubtaskAmount,
    getCustomGhostElement,
    stopEvent,
    useTodoEvent,
} from '../'

export type TodoTaskProps = {
    task: TodoTypes.Task
    visible: boolean
    indent: number
    parentSelected?: boolean
}

export const TodoTask = (props: TodoTaskProps) => {
    const { task, visible = true, parentSelected } = props
    const {
        id,
        title,
        description,
        complete,
        color,
        priority,
        locked,
        collapsed,
        collapsible = true,
        hideCheckbox,
        editable,
        //addBelow, we use this as state
        start,
        end,
        repeat,
        users = [],
        labels = [],
        badges = [],
    } = task
    const [addBelow, setAddBelow] = useState(task.addBelow)
    const { setMenu } = useContext(ContextMenuContext)
    const hasSubtasks = task.tasks ? !!task.tasks.length : false
    const {
        origin: { elementId },
    } = getDragState('origin')
    const [indent, setIndent] = useState(props.indent || 0)
    const [indentCache, _] = useState(props.indent || 0)
    const isSubtasksVisible = hasSubtasks && !collapsed && elementId != id && visible
    const { getNextIndent, getNextOutdent, setCustomGhostElement, setCustomGhostElementRotation, lockDrag } = useDrag()
    const selectTimer = useRef(null)
    const blockClickEvent = useRef(null)
    const [edit, setEdit] = useState(editable)
    const [indentedEditor, setIndentedTaskBelow] = useState(false)
    const noDrag = useMemo(() => (locked || edit ? true : undefined), [locked, edit])
    const todoContext = useContext(TodoContext)
    const { selection, setSelection, onTaskOpen, onTaskUpdate, onTaskAddBelow } = todoContext
    const selected = useMemo(() => selection[id], [selection])
    const Task: TodoTaskItemProps & any = todoContext.task

    // this function goes through the selection subtasks
    // and removes the selected subtask from the top level selection
    const recursivelyRemoveSubtaskSelections = (s) => {
        const selection = { ...s }
        const keyList = Object.keys(s)
        Object.keys(s).map((key) => {
            const findTask = (tasks = []) => {
                tasks.map(({ id, tasks }) => {
                    if (keyList.includes(id)) delete selection[id]
                    if (!!tasks) findTask(tasks)
                })
            }
            findTask(s[key].task.tasks)
        })
        return selection
    }

    const handleClick = (e) => {
        if (blockClickEvent.current) return

        const select = windowObject[FOLD_TODO_SHIFT_FLAG]
        const selectable = select && !task.locked && !parentSelected

        if (edit || locked) {
            stopEvent(e)
            return
        }

        // if the select/shift button is active
        // and the task is not locked
        if (selectable) {
            e.preventDefault()
            e.stopPropagation()
            const newSelected = { ...selection }
            if (newSelected[id]) {
                delete newSelected[id]
            } else {
                newSelected[id] = { task }
            }
            setSelection(recursivelyRemoveSubtaskSelections(newSelected))
            return
        }

        if (select && parentSelected) {
            return
        }

        onTaskOpen({
            id,
            title,
            description,
            color,
            priority,
            complete,
            locked,
            collapsed,
            start,
            end,
            repeat,
            users,
            labels,
            badges,
        })
    }

    const handleEdit = (edit: boolean) => {
        if (!locked) {
            setEdit(edit)
            lockDrag(edit)
        }
    }

    const handleEditSave = (task) => {
        const el = documentObject.getElementById(id)
        const index = +el.dataset.index
        const areaId = el.dataset.areaid

        onTaskUpdate({
            id,
            title: task.title,
            description,
            color,
            priority,
            complete,
            locked,
            collapsed,
            start: task.from ? task.from : start,
            end: task.to ? task.to : end,
            repeat,
            users: task.users.length ? task.users : users,
            labels: task.labels.length ? task.labels : labels,
            badges,
            // NB
            // these should be removed when processing task data in the app
            position: {
                indent,
                areaId,
                index,
                shouldUpdateIndent: indentCache != indent,
            },
        })

        setEdit(false)
        lockDrag(false)
    }

    const handleEditCancel = () => {
        setEdit(false)
        lockDrag(false)
    }

    const getSiblings = () => {
        const element = documentObject.getElementById(id)
        const { nextSibling, previousSibling } = element
        const previous = previousSibling ? (previousSibling.dataset.dragelement ? previousSibling : null) : null
        const previousIndent = previousSibling ? +previousSibling.dataset.indent : 0
        const next = nextSibling ? (nextSibling.dataset.dragelement ? nextSibling : null) : null
        const nextIndent = nextSibling ? +nextSibling.dataset.indent : 0

        return {
            previous,
            previousIndent,
            next,
            nextIndent,
        }
    }

    const handleIndent = () => {
        const { previous, previousIndent, next, nextIndent } = getSiblings()
        setIndent(getNextIndent({ indent, previous, previousIndent, next, nextIndent }))
    }

    const handleOutdent = () => {
        const { previous, previousIndent, next, nextIndent } = getSiblings()
        setIndent(getNextOutdent({ indent, previous, previousIndent, next, nextIndent }))
    }

    const handleAddBelowSave = (task) => {
        setAddBelow(false)
        setEdit(false)
        lockDrag(false)
        onTaskAddBelow({
            id,
            task,
            shouldIndent: indentedEditor,
        })
    }

    const handleAddBelowCancel = () => {
        setAddBelow(false)
        onTaskUpdate({ id, addBelow: false })
    }

    const handleComplete = () => {
        onTaskUpdate({ id, complete: !complete })
    }

    const handleCollapse = (e) => {
        e.preventDefault()
        e.stopPropagation()
        onTaskUpdate({ id, collapsed: !collapsed })
    }

    const handleMouseDown = (e) => {
        if (locked) {
            e.preventDefault()
            e.stopPropagation()
            return
        }

        if (hasSubtasks) {
            setCustomGhostElementRotation('0deg')
            setCustomGhostElement(getCustomGhostElement(title, findSubtaskAmount(task.tasks) + 1))
        }

        if (selection[id]) {
            setCustomGhostElementRotation('0deg')
            setCustomGhostElement(getCustomGhostElement(title, findSubtaskAmount(task.tasks) + 1))
        }
    }

    const handleMouseUp = (e) => {
        clearTimeout(selectTimer.current)
    }

    const handleEditOpen = ({ detail }) => {
        if (id == detail.id && !locked) {
            setEdit(true)
            lockDrag(true)
        }
    }

    const handleAddBelowOpen = ({ detail }) => {
        if (id == detail.id && !locked) setAddBelow(true)
    }

    const handleKeyDown = (e) => {
        const { isEscape, isShift } = getKey(e)

        if (isEscape) {
            blockClickEvent.current = true
            // TODO: do this better
            // the click event keeps the detail from opening once the user
            // hits escape and is hovering over the same card
            // 500 seems like the sweet spots in terms of user interaction speed
            setTimeout(() => (blockClickEvent.current = false), 500)
        }
    }

    const handleLabelAdd = (label) => {
        onTaskUpdate({
            id,
            labels: [...labels, label],
        })
    }

    const handleLabelDelete = (label) => {
        onTaskUpdate({
            id,
            labels: labels.filter((l) => l.id != label.id),
        })
    }

    const handleUserAdd = (user) => {
        onTaskUpdate({
            id,
            users: [...users, user],
        })
    }

    const handleUserDelete = (user) => {
        onTaskUpdate({
            id,
            users: users.filter((u) => u.id != user.id),
        })
    }

    const handlePriorityChange = (priority) => {
        onTaskUpdate({ id, priority })
    }

    const handleDateChange = ({ dates: { start, end }, repeat }) => {
        onTaskUpdate({ id, start, end, repeat })
    }

    const handleContextMenuClick = (e) => {
        if (locked || edit) return
        e.preventDefault()
        e.stopPropagation()
        setMenu(
            {
                target: 'todo-menu',
                payload: {
                    id,
                    title,
                    description,
                    color,
                    priority,
                    complete,
                    locked,
                    collapsed,
                    collapsible,
                    hideCheckbox,
                    editable,
                    start,
                    end,
                    repeat,
                    users,
                    labels,
                    badges,
                },
            },
            { x: e.clientX, y: e.clientY }
        )
    }

    useEvent('mouseup', handleMouseUp)
    useEvent('keydown', handleKeyDown)

    useTodoEvent('edit-task', handleEditOpen)
    useTodoEvent('add-task-below', handleAddBelowOpen)

    useLayoutEffect(() => {
        const el: any = documentObject.getElementById(id)
        if (el) el.addEventListener('contextmenu', handleContextMenuClick)
        return () => el.removeEventListener('contextmenu', handleContextMenuClick)
    }, [id])

    return (
        <>
            <DragElement
                id={id}
                data-id={id}
                noDrag={noDrag}
                indent={indent}
                noIndent
                style={{ display: visible ? 'block' : 'none' }}>
                <Task
                    key={id}
                    // task state
                    // missing addBelow because we only need it
                    // in the current component
                    id={id}
                    title={title}
                    description={description}
                    color={color}
                    priority={priority}
                    complete={complete}
                    locked={locked}
                    collapsed={collapsed}
                    collapsible={collapsible}
                    hideCheckbox={hideCheckbox}
                    editable={editable}
                    start={start}
                    end={end}
                    repeat={repeat}
                    users={users}
                    labels={labels}
                    badges={badges}
                    // general state
                    edit={edit}
                    parentSelected={parentSelected}
                    selected={selected}
                    showCollapse={hasSubtasks && collapsible}
                    // event handlers
                    onEdit={handleEdit}
                    onEditSave={handleEditSave}
                    onEditCancel={handleEditCancel}
                    onComplete={handleComplete}
                    onCollapse={handleCollapse}
                    onIndent={handleIndent}
                    onOutdent={handleOutdent}
                    onClick={handleClick}
                    onMouseDown={handleMouseDown}
                    // toolbar buttons
                    onLabelAdd={handleLabelAdd}
                    onLabelDelete={handleLabelDelete}
                    onUserAdd={handleUserAdd}
                    onUserDelete={handleUserDelete}
                    onPriorityChange={handlePriorityChange}
                    onDateChange={handleDateChange}
                />

                {addBelow && (
                    <div className="f-todo-task__add-below f-row is-indent">
                        <TodoTaskEditor
                            isAddBelow
                            id=""
                            title=""
                            indented={indentedEditor}
                            onAddBelowClose={() => setAddBelow(false)}
                            onIndent={() => setIndentedTaskBelow(true)}
                            onOutdent={() => setIndentedTaskBelow(false)}
                            onSave={handleAddBelowSave}
                            onDismiss={handleAddBelowCancel}
                        />
                    </div>
                )}
            </DragElement>

            {/* subtasks */}
            {isSubtasksVisible && (
                <TodoTasks
                    parentColor={!!color ? color : undefined}
                    indent={indent + 1}
                    tasks={task.tasks}
                    visible={isSubtasksVisible}
                    parentSelected={selected || parentSelected}
                />
            )}
        </>
    )
}
