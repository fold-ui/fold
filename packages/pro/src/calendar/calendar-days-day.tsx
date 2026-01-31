import { FDate, classNames, getBoundingClientRect, isRightMouseButton, useResize } from '@fold-ui/core'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { CalendarDaysEvent, CalendarDaysEventComponent } from './calendar-days-event'
import { CalendarContext } from './calendar.provider'
import { CalendarTypes } from './calendar.types'
import { isDateOnThisDay } from './calendar.util'

export type CalendarDaysDayProps = {
    day: Date
    date: Date
    index: number
    width: number
    noClamp?: boolean
    weekIndex: number
    weekEvents: CalendarTypes.Event[]
    onMouseEnter: (e) => void
}

export const CalendarDaysDay = (props: CalendarDaysDayProps) => {
    const ref = useRef(null)
    const titleRef = useRef(null)
    const { day, date, index, width, noClamp, weekIndex, weekEvents = [], onMouseEnter } = props
    const {
        dragging,
        ghost,
        setGhost,
        setDragging,
        hideDateLabels = false,
        canUpdate,
        canAdd,
    } = useContext(CalendarContext)
    const [limit, setLimit] = useState(noClamp ? 1000 : -1)
    const dimensions = useResize(ref.current)
    const [mounted, setMounted] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const { visibleEvents, invisibleEvents } = useMemo(() => {
        if (noClamp) {
            return {
                visibleEvents: weekEvents.length,
                invisibleEvents: 0,
            }
        } else {
            const totalEvents = weekEvents.length
            const visibleEvents = limit - 1
            const invisibleEvents = totalEvents - visibleEvents - 1

            return {
                visibleEvents,
                invisibleEvents,
            }
        }
    }, [limit, weekEvents, noClamp])
    const { thisMonth, monthDay, monthName, isToday } = useMemo(() => {
        const now = new Date()
        return {
            isToday:
                day.getDate() == now.getDate() &&
                day.getMonth() == now.getMonth() &&
                day.getFullYear() == now.getFullYear(),
            thisMonth: day.getMonth() == date.getMonth() && day.getFullYear() == date.getFullYear(),
            monthDay: day.getDate(),
            monthName:
                day.getDate() == 1 || (weekIndex == 0 && index == 0)
                    ? day.toLocaleString('default', { month: 'long' })
                    : '',
        }
    }, [day, date, weekIndex, index])
    const showGhost = useMemo(() => {
        if (!ghost) return false
        return dragging && ghost.type == 'month' && isDateOnThisDay(ghost, day)
    }, [ghost, day, dragging])
    const isStart = ghost ? FDate(ghost.start).isSame(day) : false
    const isEnd = ghost ? FDate(ghost.end).isSame(day) : false
    const displayLabel = isStart || index == 0
    const className = classNames({
        'f-calendar-days-day': true,
        'is-outside-month': !thisMonth,
        'is-expanded': expanded,
        'is-clamped': !noClamp,
        'is-start': isStart,
        'is-end': isEnd,
    })

    const handleShowMore = (e) => {
        if (!!invisibleEvents) {
            if ((!expanded && !!overflowEvents) || expanded) {
                e.preventDefault()
                e.stopPropagation()
                setExpanded(!expanded)
            }
        }
    }

    const handleMouseDown = (e) => {
        if (isRightMouseButton(e)) return

        // creates a NEW event
        if (canAdd) {
            setDragging(true)
            setGhost({
                start: day,
                end: day,
                anchor: day,
                create: true,
                isDay: true,
                type: 'month',
            })
        }
    }

    useEffect(() => {
        if (noClamp) return

        const container = getBoundingClientRect(ref.current)
        const title = getBoundingClientRect(titleRef.current)
        const usableHeight = hideDateLabels ? container.height : container.height - title.height
        const limit = Math.floor(usableHeight / (22 + 1)) // account for margins

        setLimit(limit - 1)
    }, [dimensions, noClamp])

    useEffect(() => {
        setExpanded(false)
    }, [dragging])

    useEffect(() => {
        setMounted(true)
    }, [])

    let overflowEvents = 0

    return (
        <div
            ref={ref}
            className={className}
            style={{ width: width + '%' }}
            onMouseDown={handleMouseDown}
            onMouseEnter={() => onMouseEnter(day)}>
            <div className="f-calendar-days-day__inner">
                {!hideDateLabels && (
                    <div
                        ref={titleRef}
                        className={`f-calendar-days-day__title f-row ${isToday ? 'is-today' : ''}`}>
                        <span className="f-text sm">
                            {monthName} {monthDay}
                        </span>
                    </div>
                )}

                {showGhost && (
                    <CalendarDaysEventComponent
                        ghost
                        event={ghost}
                        displayLabel={displayLabel}
                        isStart={isStart}
                        isEnd={isEnd}
                        style={{
                            zIndex: 10,
                            top: ghost.offsetTop,
                            left: 0,
                            opacity: 1,
                            width: 'calc(100% + 1px)',
                            position: 'absolute',
                        }}
                    />
                )}

                {weekEvents.map((events, index1) => {
                    const event = events[index] ? events[index] : null
                    const isOverflow = index1 > visibleEvents && !expanded

                    if (isOverflow) {
                        if (!!event) overflowEvents++
                        return null
                    }

                    return (
                        <CalendarDaysEvent
                            key={index1}
                            day={day}
                            index={index}
                            event={event}
                            expanded={expanded}
                            displayLabel={displayLabel}
                        />
                    )
                })}

                {!!invisibleEvents && mounted && (expanded || (!expanded && !!overflowEvents)) && (
                    <div
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={handleShowMore}
                        className="f-calendar-days-day__showmore f-buttonize f-row">
                        {expanded && <span>Show less</span>}
                        {!expanded && !!overflowEvents && <span>Show {overflowEvents} more</span>}
                    </div>
                )}
            </div>
        </div>
    )
}
