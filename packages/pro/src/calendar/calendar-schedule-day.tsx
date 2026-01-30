import { getBoundingClientRect } from '@fold-ui/core'
import React, { useContext, useMemo, useRef } from 'react'
import { CalendarScheduleEvent, CalendarScheduleEventComponent } from './calendar-schedule-event'
import { CalendarScheduleSegments } from './calendar-schedule-segments'
import { CalendarContext } from './calendar.provider'
import { CalendarTypes } from './calendar.types'
import { collides, expand, getHeight, getPosition, millisecondsInDay } from './calendar.util'

export type CalendarScheduleDayProps = {
    day: Date
    workingHours: CalendarTypes.WorkingHours
    start: Date
    end: Date
    getMasterEvents: () => CalendarTypes.Event[]
    events: CalendarTypes.Event[]
}

export const CalendarScheduleDay = (props: CalendarScheduleDayProps) => {
    const { day, workingHours, start, end, events, getMasterEvents } = props
    const ref = useRef(null)
    const { chunksInHour, gridSize, dragging, setDragging, ghost, setGhost, scheduleOverlapThreshold, canUpdate } =
        useContext(CalendarContext)

    const columns = useMemo(() => {
        const columns: any = []
        let column: any = []
        let lastEventEnding: any = new Date()

        events
            .sort((d1, d2) => {
                if (d1.start < d2.start) return -1
                if (d1.start > d2.start) return 1
                if (d1.end < d2.end) return -1
                if (d1.end > d2.end) return 1
                return 0
            })
            .forEach((event) => {
                if (lastEventEnding && event.start >= lastEventEnding) {
                    columns.push(column)
                    column = []
                    lastEventEnding = undefined
                }

                let placed = false

                column.some((events) => {
                    if (!collides(events[events.length - 1], event)) {
                        events.push(event)
                        placed = true
                    }
                    return placed
                })

                if (!placed) column.push([event])
                if (!lastEventEnding || event.end > lastEventEnding) lastEventEnding = event.end
            })

        columns.push(column)

        return columns.map((column) =>
            column.map((events, index) =>
                events.map((event) => {
                    const { id, title, start, end, color, users } = event
                    const expandInc = expand(event, index, column) / column.length
                    const zIndex = index + 1
                    const top = getPosition(event.start).y
                    const height = getHeight(event)
                    // TODO: implement support for scheduleOverlapThreshold
                    const width = expandInc * 95
                    const left = 2.5 + (95 / column.length) * index

                    return {
                        id,
                        title,
                        start,
                        end,
                        users,
                        color,
                        zIndex,
                        top,
                        height,
                        width,
                        left,
                    }
                })
            )
        )
    }, [events])

    const todayLine = useMemo(() => {
        const today = new Date()
        const hoursMilliseconds = today.getHours() * 60 * 60 * 1000
        const minutesMilliseconds = today.getMinutes() * 60 * 1000
        const secondsMilliseconds = today.getSeconds() * 1000
        const milliseconds = today.getMilliseconds()
        const totalMilliseconds = millisecondsInDay()
        const isToday =
            day.getDate() === today.getDate() &&
            day.getMonth() === today.getMonth() &&
            day.getFullYear() === today.getFullYear()

        if (!isToday) {
            return 0
        } else {
            return Math.round(
                ((hoursMilliseconds + minutesMilliseconds + secondsMilliseconds + milliseconds) / totalMilliseconds) *
                    100
            )
        }
    }, [day])

    const { ghostElement, showGhost } = useMemo(() => {
        if (!ghost) return { ghostElement: {}, showGhost: false }

        // assumes ghost is valid
        const ghostIsOnToday =
            (ghost.end > start && ghost.end <= end) ||
            (ghost.start >= start && ghost.start <= end) ||
            (ghost.start < start && ghost.end > end)
        const showGhost = ghostIsOnToday && dragging && ghost.type == 'schedule'
        const ghostStart = ghost.start <= start ? start : ghost.start
        const ghostEnd = ghost.end >= end ? end : ghost.end

        return {
            ghostElement: { ...ghost, start: ghostStart, end: ghostEnd },
            showGhost,
        }
    }, [ghost, dragging])

    const handleMouseDownSchedule = (distance, event) => {
        if (canUpdate) {
            const masterEvents = getMasterEvents()
            const { height } = getBoundingClientRect(ref.current)
            // dayEvent is used to calculate the offset with dragging
            const dayEvent = events.find((weekdayEvent) => weekdayEvent.id == event.id)
            // masterEvent it the actual event data
            const masterEvent = masterEvents.find((weekdayEvent) => weekdayEvent.id == event.id)
            const lines = gridSize * chunksInHour
            const chunk = Math.round((end.getTime() - start.getTime()) / lines)
            const percentDown = distance / height
            const line = Math.round(lines * percentDown)
            const startTimeOnMouseDown = start.getTime() + line * chunk
            const buffer = startTimeOnMouseDown - masterEvent.start.getTime()
            //const ghost = { ...dayEvent, buffer, create: false, isDay: false, type: 'schedule' }
            const ghost = { ...masterEvent, buffer, create: false, isDay: false, type: 'schedule' }

            setGhost({ ...ghost, originGhost: { ...ghost } })
            setDragging(true)
        }
    }

    return (
        <div
            ref={ref}
            id="f-calendar-schedule-day"
            className="f-calendar-schedule-day">
            {showGhost && (
                <CalendarScheduleEventComponent
                    ghost
                    start={ghostElement.start}
                    end={ghostElement.end}
                    title={ghostElement.title}
                    color={ghostElement.color}
                    users={ghostElement.users}
                    style={{
                        opacity: 1,
                        zIndex: 1000,
                        pointerEvents: 'none',
                        width: '100%',
                        padding: '0px 3%',
                        height: getHeight(ghostElement),
                        top: getPosition(ghostElement.start).y,
                    }}
                />
            )}

            {columns.map((column) =>
                column.map((events) =>
                    events.map((event, index) => (
                        <CalendarScheduleEvent
                            key={index}
                            onMouseDownSchedule={(distance) => {
                                handleMouseDownSchedule(distance, event)
                            }}
                            {...event}
                        />
                    ))
                )
            )}

            {!!todayLine && (
                <div
                    className="f-calendar-schedule-day__today-line"
                    style={{ top: todayLine + '%' }}
                />
            )}

            <CalendarScheduleSegments
                //day={day}
                start={start}
                end={end}
                workingHours={workingHours}
            />
        </div>
    )
}
