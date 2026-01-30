import { Menu, MenuItem, Text, View, useCheck } from '@fold-ui/core'
import React, { useState } from 'react'
import {
    CalendarTypes,
    ColorButton,
    CommonProvider,
    DateButton,
    DateSelect,
    Detail,
    LabelButton,
    LabelSelect,
    ListButton,
    Priority,
    PriorityButton,
    Repeat,
    RichInput,
    RichInputOption,
    RichInputProvider,
    TaskDetail,
    UserButton,
    UserSelect,
    defaultWeekdays,
    getRepeatFrequencyText,
} from '@fold-ui/pro'
import * as data from '../../../../dummy-data'

export default {
    title: 'Pro/Common',
    component: <></>,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Common',
    subtitle: 'A robust & flexible Data Grid component engineered to handle diverse datasets with ease.',
    description:
        'The Data Grid component enables you to customize & extend virtually every part of it, enabling you to accommodate a wide variety of data types.',
    experimental: true,
}

export const RepeatingDates = () => {
    const [repeat, setRepeat] = useState<CalendarTypes.Repeat>({
        interval: 2,
        weekday: [],
        frequency: 'day',
        from: new Date(),
        to: undefined,
        repetitions: 0,
    })

    return (
        <View
            column
            gap="1rem">
            <Repeat
                repeat={repeat}
                onSave={() => null}
                onClear={() => null}
                onDismiss={() => null}
                onChange={(val) => setRepeat(val)}
            />
            <Text>{getRepeatFrequencyText(repeat, defaultWeekdays)}</Text>
        </View>
    )
}

// --

export const DateSelector = () => {
    const [dates, setDates] = useState<any>({ start: new Date(), end: new Date() })
    const [repeat, setRepeat] = useState<any>({
        interval: 1,
        weekday: [],
        frequency: 'day',
        from: new Date(),
        to: undefined,
        repetitions: 0,
    })

    return (
        <View
            column
            gap={10}
            alignItems="flex-start">
            <DateButton
                dates={dates}
                repeat={repeat}
                onDelete={() => {
                    setDates({ start: undefined, end: undefined })
                    setRepeat(undefined)
                }}
                onDateChange={({ dates, repeat }) => {
                    setDates(dates)
                    setRepeat(repeat)
                }}
            />
            <View
                width="fit-content"
                radius="var(--f-radius)"
                border="1px solid var(--f-color-border)">
                <DateSelect
                    dates={dates}
                    repeat={repeat}
                    onCancel={() => {
                        console.log('cancel')
                    }}
                    onSave={({ repeat, dates }) => {
                        setDates(dates)
                        setRepeat(repeat)
                        console.log('save', dates, repeat)
                    }}
                />
            </View>
        </View>
    )
}

// --

export const UserSelector = () => {
    const [users, setUsers] = useState(data.users)
    const [availableUsers, setAvailableUsers] = useState(data.availableUsers)

    const handleFilter = (text) => {
        setAvailableUsers(data.availableUsers)
    }

    const handleAdd = (user) => {
        setUsers([...users, user])
    }

    const handleDelete = (user) => {
        setUsers(users.filter((u) => user.id != u.id))
    }

    return (
        <CommonProvider
            onUserFilter={(val) => null}
            onLabelFilter={(val) => null}
            availableLabels={data.availableLabels}
            availableUsers={data.availableUsers}
            colors={data.colorPalette}>
            <View
                column
                gap={10}
                alignItems="flex-start">
                <UserButton
                    users={users}
                    onAdd={handleAdd}
                    onDelete={handleDelete}
                />
                <UserSelect
                    users={users}
                    onAdd={handleAdd}
                    onDelete={handleDelete}
                />
            </View>
        </CommonProvider>
    )
}

// --

export const LabelSelector = () => {
    const [labels, setLabels] = useState(data.labels)
    const [availableLabels, setAvailableLabels] = useState<any>(data.availableLabels)

    const handleFilter = (text) => {
        setAvailableLabels([
            {
                id: 'create',
                text: `Create "${text}"`,
                icon: 'plus',
            },
        ])
    }

    const handleAdd = (label) => {
        setLabels([...labels, label])
        setAvailableLabels(data.availableLabels)
    }

    const handleDelete = (label) => {
        setLabels(labels.filter((l) => label.id != l.id))
        setAvailableLabels(data.availableLabels)
    }

    return (
        <CommonProvider
            onUserFilter={(val) => null}
            onLabelFilter={(val) => null}
            availableLabels={data.availableLabels}
            availableUsers={data.availableUsers}
            colors={data.colorPalette}>
            <View
                column
                gap={10}
                alignItems="flex-start">
                <View
                    row
                    gap={5}>
                    <LabelButton
                        labels={labels}
                        onAdd={handleAdd}
                        onDelete={handleDelete}
                    />
                </View>
                <LabelSelect
                    labels={labels}
                    onAdd={handleAdd}
                    onDelete={handleDelete}
                />
            </View>
        </CommonProvider>
    )
}

// --

export const ListSelector = () => {
    const [list, setList] = useState(1)
    const [listOptions, setListOptions] = useState(data.listOptions)

    return (
        <View
            column
            gap={10}
            alignItems="flex-start">
            <View
                row
                position="relative"
                gap={5}>
                <ListButton
                    onChange={setList}
                    title="Select project"
                    list={list}
                    options={listOptions}
                />
            </View>
        </View>
    )
}

// --

export const PrioritySelector = () => {
    const [priority, setPriority] = useState<Priority>('medium')

    return (
        <View
            column
            gap={10}
            alignItems="flex-start">
            <View
                row
                gap={5}>
                <PriorityButton
                    onChange={setPriority}
                    title="Select project"
                    priority={priority}
                />
            </View>
        </View>
    )
}

// --

export const ColorSelector = () => {
    const [color, setColor] = useState(data.colorPalette[3])

    return (
        <View
            column
            gap={10}
            alignItems="flex-start">
            <View
                row
                gap={5}>
                <ColorButton
                    onChange={setColor}
                    color={color}
                    colors={data.colorPalette}
                />
            </View>
        </View>
    )
}

// --

export const TaskDetailView = () => {
    const { checked, check } = useCheck()
    const [title, setTitle] = useState('awesome')
    const [description, setDescription] = useState('')
    const [labels, setLabels] = useState(data.labels)
    const [availableLabels, setAvailableLabels] = useState<any>(data.availableLabels)
    const [users, setUsers] = useState(data.users)
    const [availableUsers, setAvailableUsers] = useState(data.availableUsers)
    const [dates, setDates] = useState<any>({ start: new Date(), end: new Date() })
    const [repeat, setRepeat] = useState({ interval: [2, 4], frequency: 'day', from: new Date() })
    const [color, setColor] = useState(data.colorPalette[3])
    const [colors, setColors] = useState(data.colorPalette)
    const [priority, setPriority] = useState<Priority>('medium')
    const [list, setList] = useState(1)
    const [listOptions, setListOptions] = useState(data.listOptions)
    const [options, setOptions] = useState<any>([])

    const handleLabelFilter = (text) => {
        setAvailableLabels([
            {
                id: 'create',
                text: `Create "${text}"`,
                icon: 'plus',
            },
        ])
    }

    const handleLabelAdd = (label) => {
        setLabels([...labels, label])
        setAvailableLabels(data.availableLabels)
    }

    const handleLabelDelete = (label) => {
        setLabels(labels.filter((l) => label.id != l.id))
        setAvailableLabels(data.availableLabels)
    }

    const handleUserFilter = (text) => {
        setAvailableUsers(data.availableUsers)
    }

    const handleUserAdd = (user) => {
        setUsers([...users, user])
    }

    const handleUserDelete = (user) => {
        setUsers(users.filter((u) => user.id != u.id))
    }

    const handleTrigger = (word) => {
        switch (word.trim()) {
            case '@':
                setOptions([
                    { id: 'uuid1', name: '@John', type: 'user' },
                    { id: 'uuid2', name: '@Ben', type: 'user' },
                    { id: 'uuid3', name: '@Derek', type: 'user' },
                    { id: 'uuid4', name: '@Craig', type: 'user' },
                    { id: 'uuid5', name: '@Timothy', type: 'user' },
                    { id: 'uuid6', name: '@Byron', type: 'user' },
                    { id: 'uuid7', name: '@Andrew', type: 'user' },
                    { id: 'uuid8', name: '@Peter', type: 'user' },
                ])
                break
            case '#':
                setOptions([
                    { id: 'uuid1', name: '#Sales', type: 'label' },
                    { id: 'uuid2', name: '#Marketing', type: 'label' },
                    { id: 'uuid3', name: '#DevOps', type: 'label' },
                    { id: 'uuid4', name: '#Engineering', type: 'label' },
                    { id: 'uuid5', name: '#Product', type: 'label' },
                ])
                break
        }
    }

    const handleWord = (word, cb, always = false) => {
        const keywords = ['assign:', 'to:', 'from:', 'date:']
        let flag = true

        keywords.map((keyword) => {
            if (word.includes(keyword)) {
                cb({
                    phrase: word.trim(),
                    type: word.split(':')[0],
                    value: word.split(':')[1].trim(),
                })
                flag = false
            }
        })

        if (always || flag) cb(null)
    }

    return (
        <RichInputProvider
            triggers={['#', '@']}
            options={options}
            onWord={handleWord}
            onTrigger={handleTrigger}>
            <CommonProvider
                onUserFilter={(val) => null}
                onLabelFilter={(val) => null}
                availableLabels={data.availableLabels}
                availableUsers={data.availableUsers}
                colors={data.colorPalette}>
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
                    list={list}
                    listOptions={listOptions}
                    onListOptionChange={setList}
                    dates={dates}
                    repeat={repeat}
                    onDateDelete={() => {
                        setDates({ start: undefined, end: undefined })
                        setRepeat({ interval: [], frequency: '', from: new Date() })
                    }}
                    onDateChange={({ dates, repeat }) => {
                        setDates(dates)
                        setRepeat(repeat)
                    }}
                    badges={[]}
                    users={users}
                    onUserAdd={handleUserAdd}
                    onUserDelete={handleUserDelete}
                    labels={labels}
                    onLabelAdd={handleLabelAdd}
                    onLabelDelete={handleLabelDelete}
                    menu={
                        <Menu
                            width={200}
                            border="none">
                            <MenuItem>Delete</MenuItem>
                            <MenuItem>Copy</MenuItem>
                            <MenuItem>Cut</MenuItem>
                            <MenuItem>Paste</MenuItem>
                            <MenuItem>Select</MenuItem>
                        </Menu>
                    }
                />
            </CommonProvider>
        </RichInputProvider>
    )
}

export const DetailView = () => {
    const [options, setOptions] = useState<RichInputOption[]>([])

    const handleTrigger = (word) => {
        if (word.trim().charAt(0) == '@') {
            setOptions(data.richInputUsers)
        } else if (word.trim().charAt(0) == '#') {
            setOptions(data.richInputLabels)
        } else {
            setOptions([])
        }
    }

    const handleWord = (word, next) => {
        if (word.includes('date:')) {
            next({
                phrase: word.trim(),
                type: word.split(':')[0],
                value: word.split(':')[1].trim(),
            })
        } else {
            next()
        }
    }

    return (
        <RichInputProvider
            triggers={['#', '@']}
            options={options}
            onWord={handleWord}
            onTrigger={handleTrigger}>
            <CommonProvider
                onUserFilter={(val) => null}
                onLabelFilter={(val) => null}
                availableLabels={data.availableLabels}
                availableUsers={data.availableUsers}
                colors={data.colorPalette}>
                <Detail
                    item={{ ...data.sections[0].tasks[1] }}
                    onCancel={() => console.log('close window')}
                    onSave={(task) => console.log('save task', task)}
                    onDelete={(task) => console.log('delete task', task)}
                />
            </CommonProvider>
        </RichInputProvider>
    )
}

// --

export const RichInputField = () => {
    const [options, setOptions] = useState<any>([])

    const handleSave = (html) => {
        if (html.trim() != '') {
            // use processHTML(html) to extract any entities
        }
    }

    const handleTrigger = (word) => {
        switch (word.trim()) {
            case '@':
                setOptions([
                    { id: 'uuid1', name: '@John', type: 'user' },
                    { id: 'uuid2', name: '@Ben', type: 'user' },
                    { id: 'uuid3', name: '@Derek', type: 'user' },
                    { id: 'uuid4', name: '@Craig', type: 'user' },
                    { id: 'uuid5', name: '@Timothy', type: 'user' },
                    { id: 'uuid6', name: '@Byron', type: 'user' },
                    { id: 'uuid7', name: '@Andrew', type: 'user' },
                    { id: 'uuid8', name: '@Peter', type: 'user' },
                ])
                break
            case '#':
                setOptions([
                    { id: 'uuid1', name: '#Sales', type: 'label' },
                    { id: 'uuid2', name: '#Marketing', type: 'label' },
                    { id: 'uuid3', name: '#DevOps', type: 'label' },
                    { id: 'uuid4', name: '#Engineering', type: 'label' },
                    { id: 'uuid5', name: '#Product', type: 'label' },
                ])
                break
        }
    }

    const handleWord = (word, cb, always = false) => {
        const keywords = ['assign:', 'to:', 'from:', 'date:']
        let flag = true

        keywords.map((keyword) => {
            if (word.includes(keyword)) {
                cb({
                    phrase: word.trim(),
                    type: word.split(':')[0],
                    value: word.split(':')[1].trim(),
                })
                flag = false
            }
        })

        if (always || flag) cb(null)
    }

    return (
        <View width={400}>
            <RichInputProvider
                triggers={['#', '@']}
                options={options}
                onWord={handleWord}
                onTrigger={handleTrigger}>
                <RichInput
                    dontClearOnSubmit
                    defaultValue="Research target audience..."
                    placeholder="Task title"
                    onEnter={handleSave}
                    onCancel={() => null}
                    onBlur={handleSave}
                    onIndent={() => null}
                    onOutdent={() => null}
                    onUp={() => null}
                    onDown={() => null}
                />
            </RichInputProvider>
        </View>
    )
}
