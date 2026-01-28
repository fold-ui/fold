import { ContextMenuContext, IconLib, Image, classNames } from '@fold-dev/core'
import React, { memo, useContext, useLayoutEffect, useMemo, useRef } from 'react'
import { Badge, Check, Labels, Users, useDateButton } from '../'
import { KanbanTypes } from './kanban.types'

export const KanbanImage = memo(({ image, id }: any) => {
    return (
        <Image
            key={id}
            src={image}
            height={100}
        />
    )
})

export type KanbanCardMenuButtonProps = {
    onMenuClick?: (e) => void
}

export const KanbanCardMenuButton = ({ onMenuClick }: KanbanCardMenuButtonProps) => {
    return (
        <div className="f-kanban-card-menu-button f-row">
            <button
                className="f-buttonize f-row"
                onClick={onMenuClick}>
                <IconLib icon="more-h" />
            </button>
        </div>
    )
}

export type KanbanCardProps = {
    index: number
    areaId: string
    selected?: boolean
    onUpdate?: (card) => void
    onClick?: (e) => void
} & KanbanTypes.Card &
    any

export const KanbanCard = (props: KanbanCardProps) => {
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
        users = [],
        labels = [],
        badges = [],
        checkbox = true,
        // misc, not part of card type
        index,
        areaId,
        selected = false,
        onUpdate,
        onClick,
        ...rest
    } = props
    const ref = useRef(null)
    const innerRef = useRef(null)
    const { setMenu } = useContext(ContextMenuContext)
    const hasFooter = useMemo(
        () => !!badges.length || !!labels.length || !!users.length || !!start || !!end,
        [badges, labels, users, start, end]
    )
    const { dateLabel, dateColor } = useDateButton({ start, end }, complete)
    const className = classNames(
        {
            'f-kanban-card': true,
            'f-col': true,
            'is-selected': selected,
            'is-locked': locked,
            'has-color': color,
            'is-complete': complete,
        },
        []
    )

    const getCard = () => ({
        id,
        title,
        description,
        image,
        color,
        complete,
        locked,
        start,
        end,
        users,
        labels,
        badges,
    })

    const handleAvatarClick = (e) => {
        if (locked) return
        e.stopPropagation()
        e.preventDefault()
        setMenu({ target: 'kanban-user', payload: getCard() }, { x: e.clientX, y: e.clientY })
    }

    const handleLabelClick = (e) => {
        if (locked) return
        e.stopPropagation()
        e.preventDefault()
        setMenu({ target: 'kanban-label', payload: getCard() }, { x: e.clientX, y: e.clientY })
    }

    const handleMenuClick = (e) => {
        if (locked) return
        e.stopPropagation()
        e.preventDefault()
        setMenu({ target: 'kanban-menu', payload: getCard() }, { x: e.clientX, y: e.clientY })
    }

    const handleContextMenuClick = (e) => {
        if (locked) return
        e.preventDefault()
        e.stopPropagation()
        setMenu({ target: 'kanban-menu', payload: getCard() }, { x: e.clientX, y: e.clientY })
    }

    useLayoutEffect(() => {
        const el: any = ref.current
        if (el) el.addEventListener('contextmenu', handleContextMenuClick)
        return () => el.removeEventListener('contextmenu', handleContextMenuClick)
    })

    const handleDateChange = ({ dates: { start, end }, repeat }) => {
        onUpdate({ id, start, end, repeat })
    }

    return (
        <div
            {...rest}
            ref={ref}
            onClick={onClick}
            aria-disabled={locked}
            className={className}
            tabIndex={locked ? -1 : 0}>
            <div
                ref={innerRef}
                className="f-kanban-card__inner f-col">
                {color && (
                    <div
                        className="f-kanban-card__color"
                        style={{ background: color }}
                    />
                )}

                {!!image && (
                    <div className="f-kanban-card__image">
                        <KanbanImage
                            key={id}
                            id={id}
                            image={image}
                        />
                    </div>
                )}

                <div className="f-kanban-card__content f-row">
                    {checkbox && (
                        <Check
                            priority={priority}
                            disabled={locked}
                            checked={complete}
                            onCheck={() => onUpdate({ ...getCard(), complete: !complete })}
                        />
                    )}

                    <div
                        className="f-kanban-card__text"
                        dangerouslySetInnerHTML={{ __html: title }}
                    />
                </div>

                {!!labels.length && (
                    <div className="f-kanban-card__panel f-row">
                        <Labels
                            disabled={locked}
                            labels={labels}
                            onClick={handleLabelClick}
                        />
                    </div>
                )}

                {hasFooter && (
                    <div className="f-kanban-card__panel f-row">
                        {badges.map((badge, index) => (
                            <Badge
                                key={index}
                                label={badge.label}
                                icon={badge.icon}
                                color={badge.color}
                                progress={badge.progress}
                            />
                        ))}

                        {!!dateLabel && (
                            <div
                                className="f-kanban-card__date f-text f-row"
                                style={{ color: dateColor, gap: 5 }}>
                                <IconLib
                                    icon="date"
                                    size="sm"
                                />
                                <span style={{ color: 'inherit' }}>{dateLabel}</span>
                            </div>
                        )}

                        <div className="f-flexer" />

                        <Users
                            disabled={locked}
                            users={users}
                            onClick={handleAvatarClick}
                        />
                    </div>
                )}
            </div>

            <KanbanCardMenuButton onMenuClick={handleMenuClick} />
        </div>
    )
}
