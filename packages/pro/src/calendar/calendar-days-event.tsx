import {
    ContextMenuContext,
    FDate,
    FIDate,
    FITime,
    Icon,
    classNames,
    cleanObject,
    getBoundingClientRect,
    isRightMouseButton,
    lightenedHex,
    useTheme,
    windowObject,
} from '@fold-ui/core'
import React, { useContext, useLayoutEffect, useMemo, useRef } from 'react'
import { CALENDAR_DRAG_DIRECTION, getShortDateFormat, getShortTimeFormat } from '../'
import { CalendarContext } from './calendar.provider'
import { CalendarTypes } from './calendar.types'
import { setMidnight } from './calendar.util'

export type CalendarDaysEventComponentProps = {
    displayLabel?: boolean
    event: CalendarTypes.Event
    isStart: boolean
    isEnd: boolean
    style?: any
    ghost?: boolean
} & any

export const CalendarDaysEventComponent = (props: CalendarDaysEventComponentProps) => {
    const { displayLabel, event, ghost, isStart, isEnd, style = {}, ...rest } = props
    const { end, start, color, isDay, title } = event
    const { daysTimeFormat } = useContext(CalendarContext)
    const { systemTheme } = useTheme()
    const isPast = useMemo(() => FDate(end).isBefore(new Date()), [end])
    const styles = useMemo(() => {
        if (isDay) {
            const backgroundColor = color ? lightenedHex(color, 80) : null

            if (systemTheme == 'light') {
                return cleanObject({
                    color,
                    backgroundColor,
                    borderColor: color ? lightenedHex(color, 60) : null,
                    outlineColor: backgroundColor,
                    ...style,
                })
            } else {
                return cleanObject({
                    color: backgroundColor,
                    backgroundColor: color,
                    borderColor: color ? lightenedHex(color, 30) : null,
                    outlineColor: color,
                    ...style,
                })
            }
        } else {
            return cleanObject({ color, ...style })
        }
    }, [style, event, systemTheme])
    const label = useMemo(() => {
        if (isDay) {
            return daysTimeFormat
                ? daysTimeFormat(start, end, true)
                : `${getShortDateFormat(start)} - ${getShortDateFormat(end)}`
        } else {
            return daysTimeFormat
                ? daysTimeFormat(start, end, false)
                : `${getShortTimeFormat(start)} - ${getShortTimeFormat(end)}`
        }
    }, [start, end, daysTimeFormat])
    const className = classNames(
        {
            'f-calendar-days-event-component': true,
            'f-row': true,
            'is-past': isPast,
            'is-start': isStart,
            'is-end': isEnd,
            'is-time': !isDay,
            'is-ghost': ghost,
        },
        [props.className]
    )

    return (
        <div
            tabIndex={0}
            className={className}
            style={styles}
            {...rest}>
            {displayLabel && (
                <>
                    {!isDay && (
                        <span
                            className="f-calendar-days-event-component__color"
                            style={{ background: color }}
                        />
                    )}
                    <span
                        className="f-calendar-days-event-component__title f-ellipsis"
                        dangerouslySetInnerHTML={{ __html: title }}
                    />
                    <Icon
                        icon={isDay ? FIDate : FITime}
                        size="xs"
                    />
                    <span className="f-calendar-days-event-component__date f-ellipsis">{label}</span>
                </>
            )}
        </div>
    )
}

export type CalendarDaysEventProps = {
    event: CalendarTypes.Event & { isEnd: boolean; isFirst: boolean; size: number }
    day: Date
    index: number
    expanded: boolean
    displayLabel?: boolean
}

export const CalendarDaysEvent = (props: CalendarDaysEventProps) => {
    const { event, day, index, expanded, ...rest } = props
    const { daysEvent, dragging, setDragging, ghost, setGhost, instanceId, canUpdate, onEventOpen } =
        useContext(CalendarContext)
    const DaysEvent: any = daysEvent || CalendarDaysEventComponent
    const isAllDay = useMemo(() => event?.isDay, [event])
    const ref = useRef(null)
    const isStart = event ? FDate(event.start).isSame(day) : false
    const isEnd = event?.isEnd
    const isFirst = event?.isFirst
    const displayLabel = (event ? isStart || index == 0 : false) || expanded
    const { setMenu } = useContext(ContextMenuContext)
    const timeoutRef = useRef(null)
    const width = useMemo(() => {
        return event && !expanded ? `calc((100% * ${event.size}) + ${event.size}px)` : '100%'
    }, [expanded, event])
    const isCrossDay = useMemo(() => (!isAllDay && event ? event.size > 1 : false), [event, isAllDay])
    const className = classNames({
        'f-calendar-days-event': true,
        'f-row': true,
        'is-start': isStart,
        'is-end': isEnd,
        'is-first': isFirst || expanded,
        'is-expanded': expanded,
        'is-all-day': isAllDay,
        'is-cross-day': isCrossDay,
    })

    const handleClick = (e) => {
        // e.stopPropagation()
        // e.preventDefault()
        onEventOpen({ ...event }, e)
    }

    const handleMouseDown = (e) => {
        if (isRightMouseButton(e)) return

        e.stopPropagation()

        const element = e.currentTarget
        const mouseLeft = e.clientX
        const mouseTop = e.clientY
        const { offsetTop } = element
        const box = getBoundingClientRect(element)
        const hitArea = 10
        const drag = !isCrossDay
            ? mouseLeft < box.left + hitArea
                ? 'start'
                : mouseLeft > box.right - hitArea
                ? 'end'
                : null
            : null

        // the div stretches out, so here we calculate
        // how many "day blocks" down we are clicking in
        const chunkSize = box.width / event.size
        const offsetX = mouseLeft - box.left
        const bufferOffset = Math.floor(offsetX / chunkSize)

        // only let isDay events be adjustable
        if (isAllDay) windowObject[CALENDAR_DRAG_DIRECTION] = drag

        // drag delay so make room for clicks
        timeoutRef.current = setTimeout(() => {
            if (event && canUpdate) {
                const start = setMidnight(event.start).getTime()
                const end = setMidnight(day).getTime()
                const buffer = (end - start) / (1000 * 3600 * 24) + bufferOffset
                const ghost = { ...event, buffer, offsetTop, create: false, type: 'month' }

                setGhost({ ...ghost, originGhost: { ...ghost } })
                setDragging(true)
            }
        }, 150)
    }

    const handleMouseUp = (e) => clearTimeout(timeoutRef.current)

    const handleContextMenuClick = (e) => {
        e.preventDefault()
        e.stopPropagation()

        setMenu({ target: 'event', payload: event }, { x: e.clientX, y: e.clientY })
    }

    useLayoutEffect(() => {
        const el: any = ref.current
        if (el) el.addEventListener('contextmenu', handleContextMenuClick)
        return () => (el ? el.removeEventListener('contextmenu', handleContextMenuClick) : null)
    })

    // don't show non events
    if (expanded && !event) return null

    // only display the first occurence and valid events
    if ((!isFirst || !event) && !expanded) return <div className="f-calendar-days-event__spacer" />

    return (
        <div
            ref={ref}
            className={className}
            onClick={handleClick}
            onMouseUp={handleMouseUp}
            onMouseDown={handleMouseDown}
            style={{ width }}>
            <DaysEvent
                event={event}
                displayLabel={displayLabel}
                isStart={isStart}
                isEnd={isEnd}
            />
        </div>
    )
}
