import {
    addElementToArray,
    documentObject,
    generateUEID,
    moveElementInArray,
    removeElementFromArray,
} from '@fold-dev/core'
import { useEffect } from 'react'
import { KanbanSelection } from './kanban.types'

export type KanbanEventName = 'select'

export const dispatchKanbanEvent = (eventName: KanbanEventName, data: any = {}) =>
    documentObject.dispatchEvent(new CustomEvent('kanban-' + eventName, { detail: data }))

export const useKanbanEvent = (event: KanbanEventName, handler, passive = false) => {
    useEffect(() => {
        documentObject.addEventListener('kanban-' + event, handler, passive)
        return () => documentObject.removeEventListener('kanban-' + event, handler)
    })
}

/**
 * Get the column & swimlane index from the id
 */
export const getColumnAndSwimlaneIndex = (id: string) => {
    const parts = id.split('-')
    return {
        column: +parts[0],
        swimlane: +parts[1],
    }
}

export const getCustomColumnGhostElement = (name) => {
    return `
        <div 
            class="f-card f-row" 
            style="gap: 0.5rem; padding: var(--f-space-inset-x-2); width: fit-content; max-width: 300px; justify-content: flex-start">
            <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" class="md f-icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z" />
            </svg>
            <div class="f-text">
                <strong>${name}</strong>
            </div>
        </div>
    `
}

export const getCustomSwimlaneGhostElement = (name) => {
    return `
        <div 
            class="f-card f-row" 
            style="gap: 0.5rem; padding: var(--f-space-inset-x-2); width: fit-content; max-width: 300px; justify-content: flex-start">
            <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" class="md f-icon" style="transform: rotateZ(90deg)">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z" />
            </svg>
            <div class="f-text">
                <strong>${name}</strong>
            </div>
        </div>
    `
}

export const kanbanState = ({ swimlanes, setSwimlanes, card, setCard }) => ({
    // Drag

    handleCardMove: ({ origin, target }, selection) => {
        const targetIndex = getColumnAndSwimlaneIndex(target.areaId)
        const originIndex = getColumnAndSwimlaneIndex(origin.areaId)
        const originCards = swimlanes[originIndex.swimlane].columns[originIndex.column].cards
        const targetCards = swimlanes[targetIndex.swimlane].columns[targetIndex.column].cards
        const originCard = originCards[origin.index]
        const sameColumn = originIndex.column == targetIndex.column
        const sameSwimlane = originIndex.swimlane == targetIndex.swimlane
        const cards = selection.map((selected: KanbanSelection) => selected.card)

        if (!!selection.length) {
            // get the target card id (below or above)
            // remove the selected cards from the columns
            // - the target index will now be different
            // add the selected cards to the target card
            setSwimlanes(
                swimlanes
                    .map((swimlane: any, indexSwimlane: number) => {
                        const inSwimlane = !!selection.find(
                            (selected: KanbanSelection) => selected.swimlane == indexSwimlane
                        )

                        if (inSwimlane) {
                            return {
                                ...swimlane,
                                columns: swimlane.columns.map((column: any, indexColumn: number) => {
                                    const inColumn = !!selection.find(
                                        (selected: KanbanSelection) => selected.column == indexColumn
                                    )

                                    if (inColumn) {
                                        return {
                                            ...column,
                                            cards: column.cards.filter((card: any, cardIndex: number) => {
                                                const isCard = selection.find(
                                                    (selected: KanbanSelection) => selected.card.id == card.id
                                                )

                                                return !isCard
                                            }),
                                        }
                                    } else {
                                        return column
                                    }
                                }),
                            }
                        } else {
                            return swimlane
                        }
                    })
                    .map((swimlane: any, indexSwimlane: number) => {
                        const inSwimlane = indexSwimlane == targetIndex.swimlane

                        if (inSwimlane) {
                            return {
                                ...swimlane,
                                columns: swimlane.columns.map((column: any, indexColumn: number) => {
                                    const inColumn = indexColumn == targetIndex.column

                                    if (inColumn) {
                                        const targetIndex = target.moveDirection == 'up' ? target.index : target.index

                                        return {
                                            ...column,
                                            cards: [
                                                ...column.cards.slice(0, targetIndex),
                                                ...cards,
                                                ...column.cards.slice(targetIndex),
                                            ],
                                        }
                                    } else {
                                        return column
                                    }
                                }),
                            }
                        } else {
                            return swimlane
                        }
                    })
            )
        } else {
            if (sameSwimlane) {
                if (sameColumn) {
                    setSwimlanes(
                        swimlanes.map((swimlane: any, index1: number) => {
                            if (index1 == originIndex.swimlane) {
                                return {
                                    ...swimlane,
                                    columns: swimlane.columns.map((column: any, index2: number) => {
                                        if (index2 == originIndex.column) {
                                            return {
                                                ...column,
                                                cards: moveElementInArray(column.cards, origin, target),
                                            }
                                        } else {
                                            return column
                                        }
                                    }),
                                }
                            } else {
                                return swimlane
                            }
                        })
                    )
                } else {
                    setSwimlanes(
                        swimlanes.map((swimlane: any, index1: number) => {
                            if (index1 == originIndex.swimlane) {
                                return {
                                    ...swimlane,
                                    columns: swimlane.columns.map((column: any, index2: number) => {
                                        if (index2 == originIndex.column) {
                                            return {
                                                ...column,
                                                cards: removeElementFromArray(originCards, origin.index),
                                            }
                                        } else if (index2 == targetIndex.column) {
                                            return {
                                                ...column,
                                                cards: addElementToArray(targetCards, target.index, originCard),
                                            }
                                        } else {
                                            return column
                                        }
                                    }),
                                }
                            } else {
                                return swimlane
                            }
                        })
                    )
                }
            } else {
                setSwimlanes(
                    swimlanes.map((swimlane: any, index1: number) => {
                        if (index1 == originIndex.swimlane || index1 == targetIndex.swimlane) {
                            return {
                                ...swimlane,
                                columns: swimlane.columns.map((column: any, index2: number) => {
                                    if (index1 == targetIndex.swimlane && index2 == targetIndex.column) {
                                        return {
                                            ...column,
                                            cards: addElementToArray(targetCards, target.index, originCard),
                                        }
                                    } else if (index1 == originIndex.swimlane && index2 == originIndex.column) {
                                        return {
                                            ...column,
                                            cards: removeElementFromArray(originCards, origin.index),
                                        }
                                    } else {
                                        return column
                                    }
                                }),
                            }
                        } else {
                            return swimlane
                        }
                    })
                )
            }
        }
    },

    handleColumnMove: ({ origin, target }) => {
        setSwimlanes(
            swimlanes.map((swimlane: any) => ({
                ...swimlane,
                columns: moveElementInArray(swimlane.columns, origin, target),
            }))
        )
    },

    handleSwimlaneMove: ({ origin, target }) => {
        setSwimlanes(moveElementInArray(swimlanes, origin, target))
    },

    // Card

    handleCardOpen: (card) => {
        setCard(card)
    },

    handleCardAdd: ({ value, swimlaneIndex, columnIndex }) => {
        setSwimlanes(
            swimlanes.map((swimlane: any, index1: number) => {
                if (index1 == swimlaneIndex) {
                    return {
                        ...swimlane,
                        columns: swimlane.columns.map((column: any, index2: number) => {
                            if (index2 == columnIndex) {
                                return {
                                    ...column,
                                    cards: [...column.cards, { id: generateUEID(), title: value }],
                                }
                            } else {
                                return column
                            }
                        }),
                    }
                } else {
                    return swimlane
                }
            })
        )
    },

    handleCardUpdate: (ca) => {
        setSwimlanes(
            swimlanes.map((swimlane) => ({
                ...swimlane,
                columns: swimlane.columns.map((column) => ({
                    ...column,
                    cards: column.cards.map((card) => (card.id == ca.id ? { ...card, ...ca } : card)),
                })),
            }))
        )
    },

    handleCardDelete: (ca) => {
        setSwimlanes(
            swimlanes.map((swimlane) => ({
                ...swimlane,
                columns: swimlane.columns.map((column) => ({
                    ...column,
                    cards: column.cards.filter((card) => card.id != ca.id),
                })),
            }))
        )
    },

    handleSelectionDelete: (selection) => {
        const cards = Object.keys(selection).map((key) => selection[key].card)
        const ids = cards.map((c) => c.id)

        setSwimlanes(
            swimlanes.map((swimlane) => ({
                ...swimlane,
                columns: swimlane.columns.map((column) => ({
                    ...column,
                    cards: column.cards.filter((card) => !ids.includes(card.id)),
                })),
            }))
        )
    },

    // Column

    handleColumnAdd: ({ value, swimlaneIndex }) => {
        setSwimlanes(
            swimlanes.map((swimlane: any) => ({
                ...swimlane,
                columns: [
                    ...swimlane.columns,
                    {
                        id: 'column-123456',
                        name: value,
                        description: null,
                        color: null,
                        cards: [],
                    },
                ],
            }))
        )
    },

    handleColumnUpdate: (col) => {
        setSwimlanes(
            swimlanes.map((swimlane) => ({
                ...swimlane,
                columns: swimlane.columns.map((column) => (column.id == col.id ? { ...column, ...col } : column)),
            }))
        )
    },

    handleColumnDelete: (col) => {
        setSwimlanes(
            swimlanes.map((swimlane) => ({
                ...swimlane,
                columns: swimlane.columns.filter((column) => column.id != col.id),
            }))
        )
    },

    // Swimlane

    handleSwimlaneUpdate: (sl) => {
        setSwimlanes(swimlanes.map((swimlane) => (sl.id == swimlane.id ? { ...swimlane, ...sl } : swimlane)))
    },

    handleSwimlaneDelete: (sl) => {
        setSwimlanes(swimlanes.filter((swimlane) => sl.id != swimlane.id))
    },
})
