import {
    Button,
    DatePicker,
    DatePickerProvider,
    Flexer,
    IconLib,
    Input,
    InputControl,
    InputPopover,
    InputPrefix,
    InputSuffix,
    Label,
    Link,
    Modal,
    Popover,
    Portal,
    Text,
    Textarea,
    TimePicker,
    Toggle,
    View,
    useCheck,
    useDialog,
    useVisibility,
} from '@fold-ui/core'
import React, { useContext, useMemo, useRef, useState } from 'react'
import {
    CalendarTypes,
    ColorButton,
    CommonContext,
    Repeat,
    UserButton,
    defaultWeekdays,
    getDateSelectTimeFormat,
    getMediumDateFormat,
    getRepeatFrequencyText,
    getUserGroupName,
} from '../'

export type EventDetailProps = {
    event: CalendarTypes.Event
    onCancel: () => void
    onSave: (value) => void
    onDelete: (value) => void
}

export const CalendarEventDetail = (props: EventDetailProps) => {
    const { event, onCancel, onSave, onDelete } = props
    const { colors } = useContext(CommonContext)
    const { visible, show, hide } = useVisibility(false)
    const { id } = event
    const [color, setColor] = useState(event.color)
    const [title, setTitle] = useState(event.title)
    const [description, setDescription] = useState(event.description)
    const [repeat, setRepeat] = useState(event.repeat)
    const [start, setStart] = useState(event.start || new Date())
    const [end, setEnd] = useState(event.end || new Date())
    const [locked, setLocked] = useState(event.locked)
    const [users, setUsers] = useState(event.users || [])
    const { setDialog, closeDialog } = useDialog()
    const { check, checked } = useCheck()
    const bodyRef = useRef(null)
    const deleteRef = useRef(null)
    const userLabel = useMemo(() => getUserGroupName(users), [users])
    const [selection, setSelection] = useState<any[]>(!!event.start && !!event.end ? [[event.start, event.end]] : [])
    const repeatLabel = useMemo(
        () => (repeat ? getRepeatFrequencyText(repeat, defaultWeekdays) : 'Add repeat schedule'),
        [repeat]
    )

    const handleStartDate = (date) => {
        setStart(date)
        setSelection([[date, selection[0][1]]])
    }

    const handleEndDate = (date) => {
        setEnd(date)
        setSelection([[selection[0][0], date]])
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
                            onDelete(event)
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
            locked,
            start: start,
            end: end,
            repeat,
            users,
            isDay: event.isDay,
        })
    }

    return (
        <Modal
            dismissOnEscape
            borderless
            focusTrap
            ref={bodyRef}
            portal={Portal}
            width={800}
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
            <DatePickerProvider>
                <View
                    flex={0}
                    alignItems="flex-start"
                    gap="1rem"
                    width="100%"
                    p="1.5rem"
                    column>
                    <Label
                        fontWeight={600}
                        colorToken="accent"
                        size="sm">
                        Event details
                    </Label>

                    <InputControl>
                        <InputPrefix>
                            <ColorButton
                                color={color}
                                onChange={setColor}
                                colors={colors}
                            />
                        </InputPrefix>
                        <Input
                            placeholder="Title"
                            type="text"
                            size="lg"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </InputControl>

                    <Label
                        fontWeight={600}
                        colorToken="accent"
                        size="sm">
                        Event description
                    </Label>

                    <Textarea
                        value={description}
                        height={100}
                        className="f-scrollbar"
                        placeholder="Add description"
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <Label
                        fontWeight={600}
                        colorToken="accent"
                        size="sm">
                        Event dates
                    </Label>

                    <View
                        row
                        gap={10}>
                        <View flex={1}>
                            <InputPopover
                                popoverProps={{ width: 300 }}
                                content={
                                    <View p={5}>
                                        <DatePicker
                                            defaultDate={start}
                                            selection={[[start, start]]}
                                            onChange={handleStartDate}
                                            width="100%"
                                            height={300}
                                            monthProps={{ flex: 1 }}
                                        />
                                    </View>
                                }>
                                <InputControl>
                                    <Input
                                        readOnly
                                        placeholder=""
                                        value={getMediumDateFormat(start)}
                                    />
                                    <InputSuffix>
                                        <IconLib
                                            icon="date"
                                            style={{ pointerEvents: 'none' }}
                                        />
                                    </InputSuffix>
                                </InputControl>
                            </InputPopover>
                        </View>

                        <View width={125}>
                            <InputPopover
                                popoverProps={{ width: 150 }}
                                content={
                                    <View p={5}>
                                        <TimePicker
                                            autoFocus
                                            showAmPm={false}
                                            minutesDivider={1}
                                            showSeconds={false}
                                            height={200}
                                            date={start}
                                            onChange={handleStartDate}
                                        />
                                    </View>
                                }>
                                <InputControl>
                                    <Input
                                        disabled={checked}
                                        style={{ cursor: 'pointer' }}
                                        onChange={(e) => null}
                                        placeholder=""
                                        value={checked ? '--' : getDateSelectTimeFormat(start)}
                                    />
                                    <InputSuffix>
                                        <IconLib
                                            icon="time"
                                            style={{ pointerEvents: 'none' }}
                                        />
                                    </InputSuffix>
                                </InputControl>
                            </InputPopover>
                        </View>

                        <Text>to</Text>

                        <View flex={1}>
                            <InputPopover
                                popoverProps={{ width: 300 }}
                                content={
                                    <View p={5}>
                                        <DatePicker
                                            defaultDate={end}
                                            selection={[[end, end]]}
                                            onChange={handleEndDate}
                                            width="100%"
                                            height={300}
                                            monthProps={{ flex: 1 }}
                                        />
                                    </View>
                                }>
                                <InputControl>
                                    <Input
                                        readOnly
                                        placeholder=""
                                        value={getMediumDateFormat(start)}
                                    />
                                    <InputSuffix>
                                        <IconLib
                                            icon="date"
                                            style={{ pointerEvents: 'none' }}
                                        />
                                    </InputSuffix>
                                </InputControl>
                            </InputPopover>
                        </View>

                        <View width={125}>
                            <InputPopover
                                popoverProps={{ width: 150 }}
                                content={
                                    <View p={5}>
                                        <TimePicker
                                            autoFocus
                                            showAmPm={false}
                                            minutesDivider={1}
                                            showSeconds={false}
                                            height={200}
                                            date={end}
                                            onChange={handleEndDate}
                                        />
                                    </View>
                                }>
                                <InputControl>
                                    <Input
                                        disabled={checked}
                                        style={{ cursor: 'pointer' }}
                                        onChange={(e) => null}
                                        placeholder=""
                                        value={checked ? '--' : getDateSelectTimeFormat(end)}
                                    />
                                    <InputSuffix>
                                        <IconLib
                                            icon="time"
                                            style={{ pointerEvents: 'none' }}
                                        />
                                    </InputSuffix>
                                </InputControl>
                            </InputPopover>
                        </View>

                        {/*                         <Popover
                            arrow
                            focusTrap={false}
                            width="fit-content"
                            content={
                                <DateSelect
                                    dates={{ start, end }}
                                    repeat={repeat}
                                    onCancel={hide}
                                    onSave={({ dates, repeat }) => {
                                        setStart(dates.start)
                                        setEnd(dates.end)
                                        setRepeat(repeat)
                                        hide()
                                    }}
                                />
                            }
                            isVisible={visible}
                            onDismiss={hide}>
                            <View
                                row
                                className="f-buttonize"
                                onClick={show}
                                gap="0.5rem">
                                {!!repeat && (
                                    <IconLib
                                        icon="repeat"
                                        size="sm"
                                    />
                                )}
                                <IconLib
                                    icon="date"
                                    size="sm"
                                />
                                <Text>{dateLabel}</Text>
                            </View>
                        </Popover> */}
                    </View>

                    <View
                        row
                        width="100%"
                        gap={10}>
                        <Toggle
                            id="f-date-select-time"
                            onChange={check}
                            on={checked}
                        />
                        <Label htmlFor="f-date-select-time">Whole day</Label>
                        <Flexer />
                        <Popover
                            arrow
                            focusTrap
                            width="fit-content"
                            anchor="top-right"
                            content={
                                <Repeat
                                    border="none"
                                    repeat={repeat}
                                    onSave={hide}
                                    onDismiss={hide}
                                    onChange={(repeat) => setRepeat(repeat)}
                                    onClear={() => {
                                        setRepeat(undefined)
                                        hide()
                                    }}
                                />
                            }
                            isVisible={visible}
                            onDismiss={hide}>
                            <div className="f-row">
                                <Link
                                    style={{ maxWidth: 150 }}
                                    size="sm"
                                    colorToken="text-weaker"
                                    className="f-underline"
                                    onClick={show}>
                                    {repeatLabel}
                                </Link>
                            </div>
                        </Popover>
                    </View>

                    <Label
                        fontWeight={600}
                        colorToken="accent"
                        size="sm">
                        Event users
                    </Label>

                    <View
                        justifyContent="flex-start"
                        width="100%"
                        gap={5}
                        row>
                        <UserButton
                            users={users}
                            onAdd={handleUserAdd}
                            onDelete={handleUserDelete}
                        />
                        {userLabel}
                    </View>
                </View>
            </DatePickerProvider>
        </Modal>
    )
}
