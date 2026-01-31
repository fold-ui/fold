import { Button, Flexer, Label, Modal, Portal, Toggle, View, useCheck, useDialog } from '@fold-ui/core'
import React, { useRef, useState } from 'react'
import { CalendarTypes, Priority, TaskDetail, TodoTypes } from '../'

export type DetailProps = {
    onCancel: () => void
    onSave: (value) => void
    onDelete: (value) => void
    item: {
        id?: string
        title: string
        description?: string
        color?: string
        priority?: Priority
        complete?: boolean
        locked?: boolean
        start?: Date
        end?: Date
        repeat?: CalendarTypes.Repeat
        users?: TodoTypes.TaskUser[]
        labels?: TodoTypes.TaskLabel[]
        badges?: TodoTypes.TaskBadge[]
    }
}

export const Detail = (props: DetailProps) => {
    const { onCancel, onSave, onDelete, item } = props
    const { id, badges = [] } = item
    const [color, setColor] = useState(item.color)
    const { checked, check } = useCheck(item.complete)
    const [priority, setPriority] = useState<Priority>(item.priority)
    const [title, setTitle] = useState(item.title)
    const [description, setDescription] = useState(item.description)
    const [dates, setDates] = useState<any>({ start: item.start, end: item.end })
    const [repeat, setRepeat] = useState(item.repeat)
    const [locked, setLocked] = useState(item.locked)
    const [users, setUsers] = useState(item.users || [])
    const [labels, setLabels] = useState(item.labels || [])
    const { setDialog, closeDialog } = useDialog()
    const bodyRef = useRef(null)
    const deleteRef = useRef(null)

    const handleLabelAdd = (label) => {
        setLabels([...labels, label])
    }

    const handleLabelDelete = (label) => {
        setLabels(labels.filter((l) => label.id != l.id))
    }

    const handleUserAdd = (user) => {
        setUsers([...users, user])
    }

    const handleUserDelete = (user) => {
        setUsers(users.filter((u) => user.id != u.id))
    }

    const handleDelete = (e) => {
        setDialog({
            title: 'Are you sure?',
            description: 'This action cannot be undone.',
            portal: Portal,
            onDismiss: (e) => deleteRef.current.focus(),
            footer: (
                <View
                    width="100%"
                    row
                    justifyContent="space-between">
                    <Button onClick={closeDialog}>Cancel</Button>
                    <Button
                        onClick={() => {
                            onDelete(item)
                            closeDialog()
                        }}
                        variant="danger">
                        Delete
                    </Button>
                </View>
            ),
        })
    }

    const handleSave = (e) => {
        onSave({
            id,
            title,
            description,
            color,
            priority,
            complete: checked,
            locked,
            start: dates.start,
            end: dates.end,
            repeat,
            users,
            labels,
            badges,
        })
    }

    return (
        <Modal
            dismissOnEscape
            borderless
            focusTrap
            ref={bodyRef}
            portal={Portal}
            width={700}
            height="fit-content"
            onDismiss={(e) => onCancel()}
            isVisible={true}
            footer={
                <View
                    row
                    justifyContent="space-between"
                    width="100%"
                    gap={10}>
                    <Button
                        onClick={onCancel}
                        m="0 auto 0 0">
                        Cancel
                    </Button>
                    <View
                        row
                        gap={10}
                        justifyContent="flex-start">
                        <Toggle
                            id="one"
                            onChange={() => setLocked(!locked)}
                            on={locked}
                        />
                        <Label htmlFor="one">Locked</Label>
                    </View>
                    <Flexer />
                    <Button
                        ref={deleteRef}
                        variant="danger"
                        onClick={handleDelete}>
                        Delete
                    </Button>
                    <Button
                        variant="accent"
                        onClick={handleSave}>
                        Save
                    </Button>
                </View>
            }>
            <TaskDetail
                checked={checked}
                onCheck={check}
                title={title}
                onTitleChange={setTitle}
                description={description}
                onDescriptionChange={setDescription}
                priority={priority}
                onPriorityChange={setPriority}
                color={color}
                onColorChange={setColor}
                list={0}
                listOptions={[]}
                onListOptionChange={(list) => null}
                dates={dates}
                repeat={repeat}
                onDateDelete={() => {
                    setDates({ start: undefined, end: undefined })
                }}
                onDateChange={({ dates, repeat }) => {
                    setDates(dates)
                    setRepeat(repeat)
                }}
                badges={badges}
                users={users}
                onUserAdd={handleUserAdd}
                onUserDelete={handleUserDelete}
                labels={labels}
                onLabelAdd={handleLabelAdd}
                onLabelDelete={handleLabelDelete}
            />
        </Modal>
    )
}
