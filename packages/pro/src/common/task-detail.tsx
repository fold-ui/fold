import {
    Button,
    Flexer,
    IconLib,
    InputControl,
    InputPrefix,
    Popover,
    Textarea,
    View,
    useVisibility,
    waitForRender,
} from '@fold-dev/core'
import React, { ReactNode, useContext, useEffect, useRef } from 'react'
import {
    Badge,
    Check,
    ColorButton,
    CommonContext,
    DateButton,
    LabelButton,
    ListButton,
    ListOption,
    Priority,
    PriorityButton,
    RichInput,
    TodoTypes,
    UserButton,
} from '../'
import { LabelSelectLabel } from './label-select'
import { UserSelectUser } from './user-select'

export type TaskDetailProps = {
    checked: boolean
    onCheck: () => void
    title: string
    onTitleChange: (val) => void
    description: string
    onDescriptionChange: (val) => void
    priority: Priority
    onPriorityChange: (val) => void
    color: string
    onColorChange: (val) => void
    list: number
    listOptions: ListOption[]
    onListOptionChange: (val) => void
    dates: any
    repeat: any
    onDateDelete: () => void
    onDateChange: (val) => void
    badges: TodoTypes.TaskBadge[]
    users: UserSelectUser[]
    onUserAdd: (val) => void
    onUserDelete: (val) => void
    labels: LabelSelectLabel[]
    onLabelAdd: (val) => void
    onLabelDelete: (val) => void
    menu?: ReactNode
}

export const TaskDetail = (props: TaskDetailProps) => {
    const {
        checked,
        onCheck,
        title,
        onTitleChange,
        description,
        onDescriptionChange,
        priority,
        onPriorityChange,
        color,
        onColorChange,
        list = 0,
        listOptions = [],
        onListOptionChange,
        dates,
        repeat,
        onDateDelete,
        onDateChange,
        badges = [],
        users = [],
        onUserAdd,
        onUserDelete,
        labels = [],
        onLabelAdd,
        onLabelDelete,
        menu,
    } = props
    const { onUserFilter, onLabelFilter, availableLabels, availableUsers, colors } = useContext(CommonContext)
    const { visible, show, hide } = useVisibility()
    const editorRef = useRef(null)

    useEffect(() => {
        //waitForRender(() => editorRef.current?.focus(), 250)
    }, [])

    return (
        <View
            flex={0}
            className="f-task-detail"
            alignItems="flex-start"
            gap={10}
            width="100%"
            p="1.5rem"
            column>
            <View
                justifyContent="flex-start"
                width="100%"
                gap={5}
                row>
                <View
                    row
                    m="0 10px 0 0">
                    <Check
                        priority={priority}
                        checked={checked}
                        onCheck={onCheck}
                    />
                </View>
                <DateButton
                    complete={checked}
                    dates={dates}
                    repeat={repeat}
                    onDelete={onDateDelete}
                    onDateChange={onDateChange}
                />
                <PriorityButton
                    onChange={onPriorityChange}
                    title="Select project"
                    priority={priority}
                />
                {!!listOptions.length && (
                    <ListButton
                        onChange={onListOptionChange}
                        title="Select project"
                        list={list}
                        options={listOptions}
                    />
                )}
                <ColorButton
                    onChange={onColorChange}
                    color={color}
                    colors={colors}
                />
                <Flexer />
                <UserButton
                    users={users}
                    onAdd={onUserAdd}
                    onDelete={onUserDelete}
                />
                {!!menu && (
                    <Popover
                        arrow
                        focusTrap
                        width="fit-content"
                        content={menu}
                        isVisible={visible}
                        onDismiss={hide}>
                        <Button
                            subtle
                            size="xs"
                            onClick={show}>
                            <IconLib icon="more-h" />
                        </Button>
                    </Popover>
                )}
            </View>
            <RichInput
                dontClearOnSubmit
                defaultValue={title}
                ref={editorRef}
                placeholder="Get some milk ..."
                onEnter={onTitleChange}
                onBlur={onTitleChange}
                onCancel={() => null}
                onIndent={() => null}
                onOutdent={() => null}
                onUp={() => null}
                onDown={() => null}
            />
            <InputControl
                p="0 0 1rem 0"
                border="none"
                shadow="none"
                alignItems="flex-start">
                <InputPrefix p="0 1rem 0 0">
                    <IconLib
                        icon="menu"
                        size="sm"
                    />
                </InputPrefix>
                <Textarea
                    autoAdjust
                    value={description}
                    minHeight={30}
                    border="none"
                    p={0}
                    shadow="none"
                    radius={0}
                    className="f-scrollbar"
                    placeholder="Task notes..."
                    onChange={(e) => onDescriptionChange(e.target.value)}
                />
            </InputControl>
            <View
                wrap="wrap"
                justifyContent="flex-start"
                width="100%"
                gap={3}
                row>
                {badges.map((badge: TodoTypes.TaskBadge, index) => (
                    <Badge
                        key={index}
                        {...badge}
                    />
                ))}
                <LabelButton
                    labels={labels}
                    onAdd={onLabelAdd}
                    onDelete={onLabelDelete}
                />
            </View>
        </View>
    )
}
