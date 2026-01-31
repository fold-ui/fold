import { CoreViewProps, classNames, documentObject } from '@fold-ui/core'
import React, { useContext, useRef } from 'react'
import { RichInput, RichInputContext } from '../common/rich-input'
import { dispatchTodoEvent } from './todo.util'

export type TodoTaskEditorProps = {
    isAddBelow?: boolean
    indented?: boolean
    id: string
    title: string
    onSave: (value) => void
    onDismiss: () => void
    onIndent?: () => void
    onOutdent?: () => void
    onAddBelowClose?: () => void
} & CoreViewProps

export const TodoTaskEditor = (props: TodoTaskEditorProps) => {
    const { isAddBelow, indented, title, id, onSave, onDismiss, onIndent, onOutdent, onAddBelowClose } = props
    const ref = useRef(null)
    const { htmlProcessor } = useContext(RichInputContext)
    const className = classNames(
        {
            'f-todo-task-editor': true,
            'f-row': true,
            'is-indented': indented,
        },
        []
    )

    const openEditInPreviousSibling = () => {
        const element = documentObject.getElementById(id)
        const { previousSibling } = element
        const siblingId = previousSibling ? previousSibling.dataset.id : null

        if (siblingId) {
            dispatchTodoEvent('edit-task', { id: siblingId })
            onDismiss()
        }
    }

    const openEditInNextSibling = () => {
        const element = documentObject.getElementById(id)
        const { nextSibling } = element
        const siblingId = nextSibling ? nextSibling.dataset.id : null

        if (siblingId) {
            dispatchTodoEvent('edit-task', { id: siblingId })
            onDismiss()
        }
    }

    const openAddBelowInPreviousSibling = () => {
        const element = documentObject.getElementById(id)
        const { previousSibling } = element
        const siblingId = previousSibling ? previousSibling.dataset.id : null

        if (siblingId) {
            dispatchTodoEvent('add-task-below', { id: siblingId })
            if (onAddBelowClose) onAddBelowClose()
        }
    }

    const openAddBelowInNextSibling = () => {
        const element = documentObject.getElementById(id)
        const { nextSibling } = element
        const siblingId = nextSibling ? nextSibling.dataset.id : null

        if (siblingId) {
            dispatchTodoEvent('add-task-below', { id: siblingId })
            if (onAddBelowClose) onAddBelowClose()
        }
    }

    const handleEnter = (html) => {
        if (html.trim() != '') {
            const processed = htmlProcessor(html)
            const { labels, users, title, to, from } = processed
            onSave({ labels, users, title, to, from })
        }
    }

    const handleUp = () => {
        if (isAddBelow) {
            openAddBelowInPreviousSibling()
        } else {
            openEditInPreviousSibling()
        }
    }

    const handleDown = () => {
        if (isAddBelow) {
            openAddBelowInNextSibling()
        } else {
            openEditInNextSibling()
        }
    }

    const handleCancel = () => {
        onDismiss()
    }

    const handleBlur = () => {}

    return (
        <div
            tabIndex={0}
            className={className}>
            <RichInput
                id="todo-task-editor"
                ref={ref}
                defaultValue={title}
                placeholder="Task title"
                onEnter={handleEnter}
                onCancel={handleCancel}
                onBlur={handleBlur}
                onIndent={onIndent}
                onOutdent={onOutdent}
                onUp={handleUp}
                onDown={handleDown}
            />
        </div>
    )
}
