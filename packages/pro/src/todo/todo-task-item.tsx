import { IconLib, Portal, classNames, documentObject } from '@fold-dev/core'
import React, { useContext, useMemo } from 'react'
import {
    ActionButton,
    Badge,
    Check,
    CommonContext,
    DateButton,
    LabelButton,
    PriorityButton,
    TodoContext,
    TodoTaskEditor,
    TodoTypes,
    UserButton,
    dispatchRichInputEvent,
    stopEvent,
} from '../'

export type TodoTaskItemProps = {
    // general state
    edit?: boolean
    parentSelected?: boolean
    selected?: boolean
    showCollapse?: boolean
    // event handlers
    onEdit: (e) => void
    onEditSave: (e) => void
    onEditCancel: (e) => void
    onComplete: (e) => void
    onCollapse: (e) => void
    onIndent: (e) => void
    onOutdent: (e) => void
    onClick: (e) => void
    onMouseDown: (e) => void
    // toolbar buttons
    onLabelAdd: (e) => void
    onLabelDelete: (e) => void
    onUserAdd: (e) => void
    onUserDelete: (e) => void
    onPriorityChange: (e) => void
    onDateChange: (e) => void
} & TodoTypes.Task

export const TodoTaskItem = (props: any) => {
    const {
        // task state
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
        users = [],
        labels = [],
        badges = [],
        // general state
        edit,
        parentSelected,
        selected,
        showCollapse,
        // event handlers
        onEdit,
        onEditSave,
        onEditCancel,
        onComplete,
        onCollapse,
        onIndent,
        onOutdent,
        onClick,
        onMouseDown,
        // toolbar buttons
        onLabelAdd,
        onLabelDelete,
        onUserAdd,
        onUserDelete,
        onPriorityChange,
        onDateChange,
    } = props
    const hasFooter = useMemo(
        () => !!badges.length || !!labels.length || !!start || !!end,
        [badges, labels, start, end]
    )
    const className = classNames(
        {
            'f-todo-task-item': true,
            'f-row': true,
            'has-footer': hasFooter,
            'is-selected': selected,
            'is-parent-selected': parentSelected,
            'is-locked': locked,
            'is-indent': true,
            'is-edit': edit,
            'is-complete': complete,
        },
        [props.className]
    )

    return (
        <div
            tabIndex={locked ? -1 : 0}
            onClick={onClick}
            className={className}
            onMouseDown={onMouseDown}>
            {color && (
                <div
                    className="f-todo-task-item__color"
                    style={{ background: color }}
                />
            )}

            <div className="f-row f-todo-task-item__inner">
                <div
                    className="f-row f-todo-task-item__collapse f-buttonize"
                    onClick={onCollapse}>
                    {showCollapse && (
                        <IconLib
                            size="xs"
                            icon="chevron-down"
                            className={`f-todo-task-item__collapse-icon ${collapsed ? 'is-collapsed' : ''}`}
                        />
                    )}
                </div>

                {!hideCheckbox && (
                    <div className="f-todo-task-item__checkbox f-row">
                        <Check
                            priority={priority}
                            disabled={locked}
                            onCheck={onComplete}
                            checked={complete}
                        />
                    </div>
                )}

                <div className="f-col f-todo-task-item__main">
                    {edit && (
                        <div className="f-todo-task-item__editor">
                            <TodoTaskEditor
                                id={id}
                                title={title}
                                onIndent={onIndent}
                                onOutdent={onOutdent}
                                onSave={onEditSave}
                                onDismiss={onEditCancel}
                            />
                        </div>
                    )}

                    {!edit && (
                        <div
                            className="f-todo-task-item__text f-text"
                            dangerouslySetInnerHTML={{ __html: title }}
                        />
                    )}

                    {(hasFooter || edit) && (
                        <div
                            onClick={(e) => stopEvent(e)}
                            className="f-todo-task-item__footer f-row">
                            {badges.map((badge, index) => (
                                <Badge
                                    key={index}
                                    label={badge.label}
                                    icon={badge.icon}
                                    color={badge.color}
                                    progress={badge.progress}
                                />
                            ))}

                            <PriorityButton
                                disabled={locked}
                                portal={Portal}
                                priority={priority}
                                onChange={onPriorityChange}
                            />

                            <DateButton
                                disabled={locked}
                                portal={Portal}
                                complete={complete}
                                dates={{ start, end }}
                                repeat={repeat}
                                onDateChange={onDateChange}
                                onDelete={() => {
                                    onDateChange({
                                        dates: { start: undefined, end: undefined },
                                        repeat: { interval: [], frequency: '', from: new Date() },
                                    })
                                }}
                            />

                            <LabelButton
                                disabled={locked}
                                portal={Portal}
                                labels={labels}
                                onAdd={onLabelAdd}
                                onDelete={onLabelDelete}
                            />
                        </div>
                    )}
                </div>

                <div
                    onClick={(e) => stopEvent(e)}
                    className="f-todo-task-item__actions f-row">
                    {!edit && (
                        <ActionButton
                            disabled={locked}
                            border
                            onClick={() => onEdit(true)}
                            className="f-todo-task-item__edit">
                            <IconLib
                                icon="pen"
                                size="sm"
                            />
                        </ActionButton>
                    )}

                    {edit && (
                        <ActionButton
                            disabled={locked}
                            variant="accent"
                            onClick={() => {
                                dispatchRichInputEvent('onenter', { id: 'todo-task-editor' })
                            }}>
                            <IconLib
                                icon="check"
                                size="sm"
                            />
                        </ActionButton>
                    )}

                    <UserButton
                        disabled={locked}
                        portal={Portal}
                        users={users}
                        onAdd={onUserAdd}
                        onDelete={onUserDelete}
                    />
                </div>
            </div>
        </div>
    )
}
