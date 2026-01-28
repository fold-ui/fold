import { classNames, windowObject } from '@fold-dev/core'
import React, { useContext, useMemo } from 'react'
import { CALENDAR_DRAG_DIRECTION } from '../'
import { CalendarContext } from './calendar.provider'
import { CalendarTypes } from './calendar.types'
import { millisecondsInDay, timeToDecimal, useLineSegments } from './calendar.util'

export type CalendarScheduleSegmentProps = {
    highlighted?: boolean
    workingHours: CalendarTypes.WorkingHours
    time: number
    style: any
    onMouseDown: (e) => void
    onMouseEnter: (e) => void
} & any

export const CalendarScheduleSegment = (props: CalendarScheduleSegmentProps) => {
    const { highlighted, workingHours, time, ...rest } = props
    const dimmed = useMemo(() => {
        const { start, end } = workingHours
        const startTime = start ? timeToDecimal(start) : 0
        const endTime = end ? timeToDecimal(end) : 25
        return time < startTime || time >= endTime
    }, [workingHours, time])
    const className = classNames({
        'f-calendar-schedule-segment': true,
        'is-highlighted': highlighted,
        'is-dimmed': dimmed,
    })

    return (
        <div
            {...rest}
            className={className}
        />
    )
}

export type CalendarScheduleSegmentsProps = {
    workingHours: CalendarTypes.WorkingHours
    start: Date
    end: Date
}

export const CalendarScheduleSegments = (props: CalendarScheduleSegmentsProps) => {
    const weekday = props
    const { workingHours } = props
    const { chunksInHour, gridSize, ghost, setGhost, dragging, setDragging, canAdd } = useContext(CalendarContext)
    const lines = useLineSegments()

    const getIndexStartEnd = (index) => {
        const millisecondsStart = props.start.getTime()
        const totalMilliseconds = millisecondsInDay()
        const lines = gridSize * chunksInHour
        const millisecondIncrements = totalMilliseconds / lines
        const start = new Date(index * millisecondIncrements + millisecondsStart)
        const end = new Date((index + 1) * millisecondIncrements + millisecondsStart)

        return { start, end }
    }

    const handleMouseDown = (e, index) => {
        // no right click
        if (e.which === 3 || e.button === 2) return

        if (canAdd) {
            const { start, end } = getIndexStartEnd(index)

            // creates a NEW event
            setDragging(true)
            setGhost({
                start,
                end,
                anchor: start,
                create: true,
                isDay: false,
                type: 'schedule',
            })
        }
    }

    const handleMouseEnter = (index) => {
        if (!ghost || !dragging) return

        const timeTimestamp = getIndexStartEnd(index).start.getTime()

        if (ghost.create) {
            const anchorTimestamp = ghost.anchor.getTime()

            // TODO: Improve
            if (timeTimestamp < anchorTimestamp) {
                // before
                setGhost({
                    ...ghost,
                    start: getIndexStartEnd(index).start,
                    end: ghost.anchor,
                })
            }

            if (timeTimestamp > anchorTimestamp) {
                // after
                setGhost({
                    ...ghost,
                    start: ghost.anchor,
                    end: getIndexStartEnd(index).start,
                })
            }

            if (timeTimestamp == anchorTimestamp) {
                // same
                setGhost({
                    ...ghost,
                    start: ghost.anchor,
                    end: ghost.anchor,
                })
            }
        } else {
            const adjustedIndex = windowObject[CALENDAR_DRAG_DIRECTION] == 'end' ? index + 1 : index
            const lines = gridSize * chunksInHour
            const chunk = Math.round((weekday.end.getTime() - weekday.start.getTime()) / lines)

            let start = ghost.start.getTime()
            let end = ghost.end.getTime()

            const isScheduleEvent = ghost.type == 'schedule'
            const wasScheduleEvent = ghost.originGhost.type == 'schedule'
            const isMonthEvent = ghost.type == 'month'
            const wasMonthEvent = ghost.originGhost.type == 'month'

            let ghostBuffer = ghost.buffer
            let ghostAllDay = ghost.isDay
            let ghostType = ghost.type

            if (wasScheduleEvent) {
                ghostBuffer = ghost.originGhost.buffer
            }

            // drag: schedule > month > month
            if (isMonthEvent && wasScheduleEvent) {
                start = ghost.originGhost.start
                end = ghost.originGhost.end
            }

            // drag: month > schedule
            // default to 1 hour
            if (isMonthEvent && wasMonthEvent) {
                end = start + 1000 * 3600
            }

            if (!windowObject[CALENDAR_DRAG_DIRECTION]) {
                const difference = end - start
                const newStart = weekday.start.getTime() + chunk * adjustedIndex
                const newEnd = newStart + difference

                setGhost({
                    ...ghost,
                    start: new Date(newStart - ghostBuffer),
                    end: new Date(newEnd - ghostBuffer),
                    type: 'schedule',
                    isDay: false,
                })
            }

            if (windowObject[CALENDAR_DRAG_DIRECTION] == 'start') {
                if (timeTimestamp <= ghost.end.getTime()) {
                    setGhost({
                        ...ghost,
                        start: new Date(weekday.start.getTime() + chunk * adjustedIndex),
                    })
                }
            }

            if (windowObject[CALENDAR_DRAG_DIRECTION] == 'end') {
                if (timeTimestamp >= ghost.start.getTime()) {
                    setGhost({
                        ...ghost,
                        end: new Date(weekday.start.getTime() + chunk * adjustedIndex),
                    })
                }
            }
        }
    }

    return (
        <>
            {lines.map(({ top, height, highlighted, time }, index) => (
                <CalendarScheduleSegment
                    key={index}
                    highlighted={highlighted}
                    workingHours={workingHours}
                    style={{ top, height }}
                    time={time}
                    onMouseDown={(e) => handleMouseDown(e, index)}
                    onMouseEnter={(e) => handleMouseEnter(index)}
                />
            ))}
        </>
    )
}
