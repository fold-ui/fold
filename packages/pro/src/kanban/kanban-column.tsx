import {
    DragArea,
    DragElement,
    DragElementArea,
    classNames,
    dispatchDragEvent,
    documentObject,
    getDragState,
    getKey,
    useDrag,
    useDragEvent,
    useEvent,
    waitForRender,
    windowObject,
} from '@fold-ui/core'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { FOLD_KANBAN_COLUMN_AREAID_CACHE, FOLD_KANBAN_SHIFT_FLAG } from './kanban'
import { KanbanAddCard } from './kanban-add-card'
import { KanbanContext } from './kanban.provider'
import { KanbanTypes } from './kanban.types'
import { dispatchKanbanEvent, getCustomColumnGhostElement } from './kanban.util'

export type KanbanColumnProps = {
    swimlaneIndex?: number
    index?: number
} & KanbanTypes.Column

export const KanbanColumn = (props: KanbanColumnProps) => {
    const {
        id,
        name,
        prefix,
        description,
        color,
        cards,
        collapsed,
        collapsible,
        swimlaneIndex,
        index,
        addCard = true,
        editableName = true,
        cardCount = true,
        locked,
    } = props
    const {
        selection,
        setSelection,
        targetVariant,
        columnHeader,
        card,
        instanceId,
        defaultInteraction,
        __columnHighlightTimeout,
    } = useContext(KanbanContext)
    const ColumnHeader: any = columnHeader
    const Card: any = card
    const areaId = `${index}-${swimlaneIndex}`
    const columnIndex = index
    const { getStaticState, setCustomGhostElementRotation, setCustomGhostElement } = useDrag()
    const mouseOverTimer = useRef(null)
    const blockClickEvent = useRef(null)
    const selectTimer = useRef(null)
    const [select, setSelect] = useState(false)
    const [targetColumn, setTargetColumn] = useState(0)
    const { onCardUpdate, onCardOpen, onCardAdd, onColumnUpdate } = useContext(KanbanContext)
    const completed = useMemo(() => cards.filter((card) => card.complete).length, [cards])
    const className = classNames({
        'f-kanban-column': true,
        'f-col': true,
        'is-collapsed': collapsed,
    })
    const { target } = getDragState('target')

    const handleCardAdd = (value: string) => {
        onCardAdd({
            instanceId,
            value,
            swimlaneIndex,
            columnIndex: index,
        })

        // scroll down, but wait for the UI to update first
        waitForRender(() => {
            const el = documentObject.getElementById(areaId)
            el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
        }, 100)
    }

    const handleToggleEvent = () => {
        onColumnUpdate({ id, collapsed: !collapsed })
    }

    const handleClick = (e, index, card) => {
        if (blockClickEvent.current) return

        const select = windowObject[FOLD_KANBAN_SHIFT_FLAG]
        const selectable = select && !card.locked
        const { id, locked } = card

        if (locked) {
            e.preventDefault()
            e.stopPropagation()
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
                newSelected[id] = {
                    card,
                    index,
                    column: columnIndex,
                    swimlane: swimlaneIndex,
                }
            }
            setSelection(newSelected)
            return
        }

        if (select) {
            return
        }

        onCardOpen({ ...card })
    }

    const handleMouseLeave = (e) => {
        setTargetColumn(0)
        clearTimeout(mouseOverTimer.current)
    }

    const handleColumnMouseDown = (e) => {
        setCustomGhostElementRotation('0deg')
        setCustomGhostElement(getCustomColumnGhostElement(name))
    }

    const handleMouseOver = (e) => {
        windowObject[FOLD_KANBAN_COLUMN_AREAID_CACHE] = areaId

        if (!collapsed) {
            mouseOverTimer.current = setTimeout(() => {
                const { target, origin } = getStaticState()
                const { height } = origin
                const differentTargetArea = target.areaId != areaId
                const isDragging = !!origin.areaId
                setTargetColumn(isDragging && differentTargetArea ? height : 0)
            }, __columnHighlightTimeout)
        }
    }

    const handleMouseUp = (e) => {
        clearTimeout(selectTimer.current)
        clearTimeout(mouseOverTimer.current)

        // push it to the end of the event loop
        waitForRender(() => {
            setTargetColumn(0)
            // TODO: should a general mouse up clear selection?
            // if (!select) setSelection({})
        })
    }

    const handleKeyDown = (e) => {
        const { isEscape, isShift } = getKey(e)
        if (isShift) setSelect(true)

        if (isEscape) {
            blockClickEvent.current = true
            // TODO: do this better
            // the click event keeps the detail from opening once the user
            // hits escape and is hovering over the same card
            // 500 seems like the sweet spots in terms of user interaction speed
            setTimeout(() => (blockClickEvent.current = false), 500)
            windowObject[FOLD_KANBAN_COLUMN_AREAID_CACHE] = null
            setTargetColumn(null)
            handleMouseUp(null)
        }
    }

    const handleKeyUp = (e) => setSelect(false)

    const handleUpdate = (card) => onCardUpdate({ ...card })

    const handleColumnClick = (e) => (collapsed ? handleToggleEvent() : null)

    const handleCollapseToggle = (e) => handleToggleEvent()

    useEvent('keydown', handleKeyDown)
    useEvent('keyup', handleKeyUp)
    useEvent('mouseup', handleMouseUp)

    useEffect(() => {
        if (target.areaId == windowObject[FOLD_KANBAN_COLUMN_AREAID_CACHE]) setTargetColumn(0)
    }, [target])

    return (
        <div
            className={className}
            onMouseDown={handleColumnMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseOver={handleMouseOver}>
            <div
                onClick={handleColumnClick}
                className="f-kanban-column__container f-col">
                <ColumnHeader
                    id={id}
                    name={name}
                    prefix={prefix}
                    description={description}
                    color={color}
                    cards={cards.length}
                    cardsCompleted={completed}
                    collapsed={collapsed}
                    collapsible={collapsible}
                    editableName={editableName}
                    cardCount={cardCount}
                    onCollapseToggle={handleCollapseToggle}
                />

                {!collapsed && (
                    <div className="f-kanban-column__cards-outer f-col">
                        <div className="f-kanban-column__cards">
                            <DragElementArea
                                group="cards"
                                areaId={areaId}
                                variant={defaultInteraction}
                                targetVariant={targetVariant}
                                className="f-kanban-column__cards-inner"
                                footer={
                                    !!targetColumn ? (
                                        <div
                                            className="f-kanban-column__placeholder"
                                            style={{ height: targetColumn }}
                                        />
                                    ) : null
                                }>
                                {cards.map((card: KanbanTypes.Card, index: number) => {
                                    const {
                                        id,
                                        title,
                                        description,
                                        locked,
                                        priority,
                                        complete,
                                        color,
                                        image,
                                        start,
                                        end,
                                        repeat,
                                        users,
                                        labels,
                                        badges,
                                        checkbox,
                                    } = card

                                    return (
                                        <DragElement
                                            key={id}
                                            data-id={id}
                                            data-nodrag={locked || undefined}>
                                            <Card
                                                id={id}
                                                title={title}
                                                description={description}
                                                locked={locked}
                                                priority={priority}
                                                complete={complete}
                                                color={color}
                                                image={image}
                                                start={start}
                                                end={end}
                                                repeat={repeat}
                                                users={users}
                                                labels={labels}
                                                badges={badges}
                                                checkbox={checkbox}
                                                // misc, not part of card type
                                                index={index}
                                                areaId={areaId}
                                                selected={selection[id]}
                                                onUpdate={(card) => handleUpdate(card)}
                                                onClick={(e) => handleClick(e, index, card)}
                                                // applied with {...rest}
                                            />
                                        </DragElement>
                                    )
                                })}
                            </DragElementArea>
                        </div>
                    </div>
                )}

                {!collapsed && addCard && (
                    <div className="f-kanban-column__footer f-col">
                        <KanbanAddCard onAdd={handleCardAdd} />
                    </div>
                )}
            </div>
        </div>
    )
}
