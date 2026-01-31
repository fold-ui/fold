import { Button, FIBin, Footer, Icon, MenuProvider, Portal, Text, View, useDialog } from '@fold-ui/core'
import React, { useState } from 'react'
import {
    CommonProvider,
    Detail,
    GroupDetail,
    GroupMenu,
    Kanban,
    KanbanProvider,
    KanbanSelection,
    KanbanTypes,
    LabelSelect,
    ContextPopup,
    LabelMenu,
    RichInputOption,
    RichInputProvider,
    UserMenu,
    UserSelect,
    dispatchKanbanEvent,
    kanbanState,
} from '@fold-ui/pro'
import * as data from '../../../../dummy-data'

export default {
    title: 'Pro/Kanban',
    component: <></>,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Kanban',
    subtitle: 'The Kanban component displays tasks or items in columns that represent different stages of a workflow.',
    description:
        'Kanban components are useful for visualizing work progress and managing tasks through different stages. They are ideal for project management, task tracking, and workflow visualization.',
    experimental: true,
}

export const Usage = () => {
    const [swimlanes, setSwimlanes] = useState<KanbanTypes.Swimlane[]>([data.swimlanes[0]])
    const [options, setOptions] = useState<RichInputOption[]>([])
    const [card, setCard] = useState<any>({})
    const [column, setColumn] = useState<any>({})
    const { setDialog, closeDialog } = useDialog()

    const handleCardMove = ({ origin, target }, selection: KanbanSelection[]) => {
        kanbanState({ swimlanes, setSwimlanes, card, setCard }).handleCardMove({ origin, target }, selection)
    }

    const handleColumnMove = ({ origin, target }) => {
        kanbanState({ swimlanes, setSwimlanes, card, setCard }).handleColumnMove({ origin, target })
    }

    const handleSwimlaneMove = ({ origin, target }) => {
        kanbanState({ swimlanes, setSwimlanes, card, setCard }).handleSwimlaneMove({ origin, target })
    }

    const handleCardOpen = (card) => {
        kanbanState({ swimlanes, setSwimlanes, card, setCard }).handleCardOpen(card)
    }

    const handleCardAdd = ({ value, swimlaneIndex, columnIndex }) => {
        kanbanState({ swimlanes, setSwimlanes, card, setCard }).handleCardAdd({ value, swimlaneIndex, columnIndex })
    }

    const handleCardUpdate = (ca) => {
        kanbanState({ swimlanes, setSwimlanes, card, setCard }).handleCardUpdate(ca)
    }

    const handleCardDelete = (ca) => {
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
                            kanbanState({ swimlanes, setSwimlanes, card, setCard }).handleCardDelete(ca)
                            closeDialog()
                        }}
                        variant="danger">
                        Delete
                    </Button>
                </View>
            ),
        })
    }

    const handleColumnAdd = ({ value, swimlaneIndex }) => {
        kanbanState({ swimlanes, setSwimlanes, card, setCard }).handleColumnAdd({ value, swimlaneIndex })
    }

    const handleColumnUpdate = (col) => {
        kanbanState({ swimlanes, setSwimlanes, card, setCard }).handleColumnUpdate(col)
    }

    const handleColumnDelete = (col) => {
        kanbanState({ swimlanes, setSwimlanes, card, setCard }).handleColumnDelete(col)
    }

    const handleSwimlaneUpdate = (sl) => {
        kanbanState({ swimlanes, setSwimlanes, card, setCard }).handleSwimlaneUpdate(sl)
    }

    const handleSwimlaneDelete = (sl) => {
        kanbanState({ swimlanes, setSwimlanes, card, setCard }).handleSwimlaneDelete(sl)
    }

    const getMenu = ({ data: { target, payload }, dismiss }) => {
        switch (target) {
            case 'kanban-label':
                return (
                    <LabelMenu
                        labels={payload.labels}
                        onCancel={dismiss}
                        onSave={(labels) => {
                            handleCardUpdate({ ...payload, labels })
                            dismiss()
                        }}
                    />
                )
            case 'kanban-user':
                return (
                    <UserMenu
                        users={payload.users}
                        onCancel={dismiss}
                        onSave={(users) => {
                            handleCardUpdate({ ...payload, users })
                            dismiss()
                        }}
                    />
                )
            case 'kanban-menu':
                return (
                    <ContextPopup
                        item={payload}
                        onCancel={dismiss}
                        onSave={(card) => {
                            dismiss()
                            handleCardUpdate({ ...payload, ...card })
                        }}
                        onView={() => {
                            dismiss()
                            setCard(payload)
                        }}
                        onDelete={() => {
                            dismiss()
                            handleCardDelete(payload)
                        }}
                    />
                )
            case 'kanban-column':
                return (
                    <GroupMenu
                        onEdit={(column) => {
                            setColumn({ ...column })
                            dismiss()
                        }}
                        onSave={(column) => {
                            handleColumnUpdate({ ...payload, ...column })
                            dismiss()
                        }}
                        onDelete={() => {
                            handleColumnDelete(payload)
                            dismiss()
                        }}
                        group={payload}
                    />
                )
            case 'kanban-swimlane':
                return (
                    <GroupMenu
                        onEdit={(column) => {
                            // edit swimnlane
                            dismiss()
                        }}
                        onSave={(swimlane) => {
                            handleSwimlaneUpdate({ ...payload, ...swimlane })
                            dismiss()
                        }}
                        onDelete={() => {
                            handleSwimlaneDelete(payload)
                            dismiss()
                        }}
                        group={payload}
                    />
                )
            default:
                return null
        }
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
                <View
                    width="100%"
                    height={700}>
                    {!!card.id && (
                        <Detail
                            item={{ ...card }}
                            onCancel={() => setCard({})}
                            onSave={(card) => {
                                handleCardUpdate(card)
                                setCard({})
                            }}
                            onDelete={(card) => {
                                handleCardDelete(card)
                                setCard({})
                            }}
                        />
                    )}

                    {!!column.id && (
                        <GroupDetail
                            item={{ ...column }}
                            onCancel={() => {
                                setColumn({})
                            }}
                            onSave={(column) => {
                                handleColumnUpdate({ ...column })
                                setColumn({})
                            }}
                            onDelete={(column) => {
                                handleColumnDelete(column)
                                setColumn({})
                            }}
                        />
                    )}

                    <MenuProvider menu={getMenu}>
                        <KanbanProvider
                            id="kanban-instance-1"
                            addColumn={true}
                            defaultSelection={{}}
                            defaultInteraction="animated"
                            targetVariant={{ projects: 'focus' }}
                            card={undefined}
                            columnHeader={undefined}
                            swimlaneHeader={undefined}
                            onCardOpen={handleCardOpen}
                            onCardAdd={handleCardAdd}
                            onCardUpdate={handleCardUpdate}
                            onCardMove={handleCardMove}
                            onColumnAdd={handleColumnAdd}
                            onColumnMove={handleColumnMove}
                            onSwimlaneMove={handleSwimlaneMove}
                            onColumnUpdate={handleColumnUpdate}
                            onSwimlaneUpdate={handleSwimlaneUpdate}>
                            <Kanban
                                swimlanes={swimlanes}
                                toolbar={({ selection }) => {
                                    return (
                                        <View
                                            row
                                            position="fixed"
                                            bgToken="surface-inverse"
                                            colorToken="text-on-color"
                                            p="1rem 2rem"
                                            radius="var(--f-radius)"
                                            shadow="var(--f-shadow-xl)"
                                            zIndex={1000}
                                            gap={10}
                                            className="f-fadein"
                                            display={!Object.keys(selection).length ? 'none' : 'flex'}
                                            style={{ bottom: 10, left: '50%', transform: 'translateX(-50%)' }}>
                                            <Text color="inherit">{Object.keys(selection).length} selected</Text>
                                            <Icon
                                                icon={FIBin}
                                                className="f-buttonize"
                                                onClick={() => {
                                                    setDialog({
                                                        title: 'Are you sure?',
                                                        description: 'This action cannot be undone.',
                                                        portal: Portal,
                                                        footer: (
                                                            <View
                                                                width="100%"
                                                                row
                                                                justifyContent="space-between">
                                                                <Button
                                                                    onClick={() => {
                                                                        closeDialog()
                                                                        dispatchKanbanEvent('select', {
                                                                            instanceId: 'kanban-instance-1',
                                                                        })
                                                                    }}>
                                                                    Cancel
                                                                </Button>
                                                                <Button
                                                                    variant="danger"
                                                                    onClick={() => {
                                                                        kanbanState({
                                                                            swimlanes,
                                                                            setSwimlanes,
                                                                            card,
                                                                            setCard,
                                                                        }).handleSelectionDelete(selection)
                                                                        dispatchKanbanEvent('select', {
                                                                            instanceId: 'kanban-instance-1',
                                                                        })
                                                                        closeDialog()
                                                                    }}>
                                                                    Delete
                                                                </Button>
                                                            </View>
                                                        ),
                                                    })
                                                }}
                                            />
                                        </View>
                                    )
                                }}
                            />
                        </KanbanProvider>
                    </MenuProvider>
                </View>
            </CommonProvider>
        </RichInputProvider>
    )
}
