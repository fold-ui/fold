import { Button, FIBin, Icon, MenuProvider, Portal, Text, View, useCheck, useDialog } from '@fold-dev/core'
import React, { useMemo, useRef, useState } from 'react'
import {
    Detail,
    GroupDetail,
    GroupMenu,
    ContextPopup,
    RichInputOption,
    RichInputProvider,
    Todo,
    TodoProvider,
    dispatchTodoEvent,
    todoState,
    FloatingToolbar,
    processHTML,
    CommonProvider,
} from '@fold-dev/pro'
import * as data from '../../../../dummy-data'
import '../common/common.css'
import './todo.css'

export default {
    title: 'Pro/Todo',
    component: <></>,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Data Grid',
    subtitle: 'A robust & flexible Data Grid component engineered to handle diverse datasets with ease.',
    description:
        'The Data Grid component enables you to customize & extend virtually every part of it, enabling you to accommodate a wide variety of data types.',
    experimental: true,
}

export const Usage = () => {
    const [sections, setSections] = useState<any>(data.sections)
    const [task, setTask] = useState<any>({})
    const [section, setSection] = useState<any>({})
    const [options, setOptions] = useState<RichInputOption[]>([])
    const { setDialog, closeDialog } = useDialog()

    const handleTaskOpen = (task) => {
        todoState({ task, setTask, sections, setSections }).handleTaskOpen(task)
    }

    const handleTaskUpdate = (taskData) => {
        todoState({ task, setTask, sections, setSections }).handleTaskUpdate(taskData)
    }

    const handleTaskDelete = (task) => {
        setDialog({
            title: 'Are you sure?',
            description: 'This action cannot be undone.',
            footer: (
                <View
                    row
                    width="100%"
                    justifyContent="space-between">
                    <Button onClick={closeDialog}>Cancel</Button>
                    <Button
                        onClick={() => {
                            todoState({ task, setTask, sections, setSections }).handleTaskDelete(task)
                            closeDialog()
                        }}
                        variant="danger">
                        Delete
                    </Button>
                </View>
            ),
        })
    }

    const handleTaskAddBelow = ({ id, shouldIndent, task: { title, users, badges, labels } }) => {
        todoState({ task, setTask, sections, setSections }).handleTaskAddBelow({
            id,
            shouldIndent,
            task: { title, users, badges, labels },
        })
    }

    const handleTaskAdd = ({ task, sectionIndex }) => {
        todoState({ task, setTask, sections, setSections }).handleTaskAdd({ task, sectionIndex })
    }

    const handleTaskMove = ({ origin, target, selection }) => {
        todoState({ task, setTask, sections, setSections }).handleTaskMove({ origin, target, selection })
    }

    const handleSectionUpdate = (sec) => {
        todoState({ task, setTask, sections, setSections }).handleSectionUpdate(sec)
    }

    const handleSectionDelete = (sec) => {
        todoState({ task, setTask, sections, setSections }).handleSectionDelete(sec)
    }

    const handleSectionAdd = ({ name, sectionIndex }) => {
        todoState({ task, setTask, sections, setSections }).handleSectionAdd({ name, sectionIndex })
    }

    const handleSectionMove = ({ origin, target }) => {
        todoState({ task, setTask, sections, setSections }).handleSectionMove({ origin, target })
    }

    const handleHtmlProcessing = (html) => {
        const { labels, users, title, to, from } = processHTML(html)
        return { labels, users, title, to, from }
    }

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

    const getMenu = ({ data: { target, payload }, dismiss }) => {
        switch (target) {
            case 'todo-menu':
                return (
                    <ContextPopup
                        isTodo
                        item={payload}
                        onCancel={dismiss}
                        onTodoAddBelow={() => {
                            dismiss()
                            dispatchTodoEvent('add-task-below', { id: payload.id })
                        }}
                        onTodoEdit={() => {
                            dismiss()
                            dispatchTodoEvent('edit-task', { id: payload.id })
                        }}
                        onSave={(card) => {
                            dismiss()
                            handleTaskUpdate({ ...payload, ...card })
                        }}
                        onView={() => {
                            dismiss()
                            setTask(payload)
                        }}
                        onDelete={() => {
                            dismiss()
                            handleTaskDelete(payload)
                        }}
                    />
                )
            case 'todo-section':
                return (
                    <GroupMenu
                        onEdit={(section) => {
                            setSection({ ...section })
                            dismiss()
                        }}
                        onSave={(section) => {
                            handleSectionUpdate({ ...payload, ...section })
                            dismiss()
                        }}
                        onDelete={() => {
                            handleSectionDelete(payload)
                            dismiss()
                        }}
                        group={payload}
                    />
                )
            default:
                return null
        }
    }

    return (
        <RichInputProvider
            triggers={['#', '@']}
            options={options}
            htmlProcessor={handleHtmlProcessing}
            onWord={handleWord}
            onTrigger={handleTrigger}>
            <CommonProvider
                onUserFilter={(val) => null}
                onLabelFilter={(val) => null}
                availableLabels={data.availableLabels}
                availableUsers={data.availableUsers}
                colors={data.colorPalette}>
                {!!task.id && (
                    <Detail
                        item={{ ...task }}
                        onCancel={() => {
                            setTask({})
                        }}
                        onSave={(task) => {
                            handleTaskUpdate(task)
                            setTask({})
                        }}
                        onDelete={(task) => {
                            handleTaskDelete(task)
                            setTask({})
                        }}
                    />
                )}

                {!!section.id && (
                    <GroupDetail
                        item={{ ...section }}
                        onCancel={() => {
                            setSection({})
                        }}
                        onSave={(section) => {
                            handleSectionUpdate({ ...section })
                            setSection({})
                        }}
                        onDelete={(section) => {
                            handleSectionDelete(section)
                            setSection({})
                        }}
                    />
                )}

                <MenuProvider menu={getMenu}>
                    <TodoProvider
                        id="todo-instance-1"
                        defaultSelection={{}}
                        defaultInteraction="animated"
                        targetVariant={{ projects: 'focus' }}
                        task={undefined}
                        sectionHeader={undefined}
                        onTaskOpen={handleTaskOpen}
                        onTaskUpdate={handleTaskUpdate}
                        onTaskAdd={handleTaskAdd}
                        onTaskAddBelow={handleTaskAddBelow}
                        onTaskMove={handleTaskMove}
                        onSectionUpdate={handleSectionUpdate}
                        onSectionAdd={handleSectionAdd}
                        onSectionMove={handleSectionMove}>
                        <Todo
                            sections={sections}
                            toolbar={({ selection }) => {
                                return (
                                    <FloatingToolbar
                                        selection={selection}
                                        onDelete={() => {
                                            todoState({
                                                task,
                                                setTask,
                                                sections,
                                                setSections,
                                            }).handleSelectionDelete(selection)
                                            dispatchTodoEvent('select', {
                                                instanceId: 'todo-instance-1',
                                            })
                                            closeDialog()
                                        }}
                                    />
                                )
                            }}
                        />
                    </TodoProvider>
                </MenuProvider>
            </CommonProvider>
        </RichInputProvider>
    )
}
