import { CoreViewProps, FDate, View, classNames, roundToDay, windowObject } from '@fold-ui/core'
import React, { useContext, useMemo } from 'react'
import { CALENDAR_DRAG_DIRECTION } from '../'
import { CalendarDaysDay } from './calendar-days-day'
import { CalendarContext } from './calendar.provider'
import { CalendarTypes } from './calendar.types'
import { dayIsPartOfDays, findAvailableSpaceInMatrix, findWeekdayColumnForDate, setMidnight } from './calendar.util'

export type CalendarDaysProps = {
    date: Date
    custom?: Date[][]
    events: CalendarTypes.Event[]
    noClamp?: boolean
} & CoreViewProps

export const CalendarDays = (props: CalendarDaysProps) => {
    const { date, custom, events = [], noClamp, ...rest } = props
    const { weekMatrix, weekSize, dragging, ghost, setGhost, dimPastEvents, canAdd, canUpdate } =
        useContext(CalendarContext)
    const className = classNames(
        {
            'f-calendar-days': true,
            'f-col': true,
            'is-dragging': dragging,
            'can-add': canAdd,
            'can-update': canUpdate,
            'dim-past': dimPastEvents,
        },
        [props.className]
    )

    const { weeks, matrix } = useMemo(() => {
        const monthDay = new Date(new Date(date).setDate(0))
        const weekdayOfFirstDay = monthDay.getDay() - 0 // offset
        const weeks: any = custom || []
        const totalDays = 7 * 6
        let days: any = []

        // create the initial date grid
        if (!custom) {
            for (let dayNumber = 0; dayNumber < totalDays; dayNumber++) {
                if (dayNumber === 0 && weekdayOfFirstDay === 0) {
                    monthDay.setDate(monthDay.getDate() - 7)
                } else if (dayNumber === 0) {
                    monthDay.setDate(monthDay.getDate() + (dayNumber - weekdayOfFirstDay))
                } else {
                    monthDay.setDate(monthDay.getDate() + 1)
                }

                // push the new day to the array
                days.push(new Date(monthDay))

                // if it's the end of the current cycle:
                // then push the day-array to the weeks array + reset days
                if (days.length == weekSize) {
                    weeks.push([...days])
                    days = []
                }
            }
        }

        // fill 2d matrix with event data, important:
        // only go on week level because the dates stretch across weeks
        const matrix = weeks
            .map((days) => {
                const firstWeekday = setMidnight(days[0])
                const lastWeekday = setMidnight(days[days.length - 1])

                return (
                    events
                        // TODO: sort by longest so that all the
                        // slots get filled with the biggest first
                        .sort((d1, d2) => {
                            if (d1.start < d2.start) return -1
                            if (d1.start > d2.start) return 1
                            if (d1.end < d2.end) return -1
                            if (d1.end > d2.end) return 1
                            return 0
                        })
                        .reduce((matrix, ev, index) => {
                            // Get the correct start & end dates that fall in this week
                            const event = {
                                ...ev,
                                start: setMidnight(new Date(ev.start)),
                                end: setMidnight(new Date(ev.end)),
                            }
                            const start = setMidnight(new Date(event.start))
                            const end = setMidnight(new Date(event.end))
                            const date = start <= firstWeekday ? firstWeekday : start
                            const endDay = end >= lastWeekday ? lastWeekday : end

                            // Get the column (day) that this date starts on
                            const weekdayColumn = findWeekdayColumnForDate(days, date)

                            // col this date stretches
                            const amountOfDays = (endDay.getTime() - date.getTime()) / (1000 * 3600 * 24)

                            // find available space on the 2d array
                            const availableSpace = findAvailableSpaceInMatrix(matrix, weekdayColumn, amountOfDays)

                            // If we have space, then update the array
                            if (availableSpace) {
                                const { rowIndex } = availableSpace
                                const addBufferRow = rowIndex == matrix.length - 1
                                const startIndex = weekdayColumn
                                const endIndex = weekdayColumn + amountOfDays
                                let newMatrix = [...matrix]
                                let row = [...newMatrix[rowIndex]]
                                for (let s = startIndex; s <= endIndex; s++) {
                                    row[s] = {
                                        ...event,
                                        size: amountOfDays + 1,
                                    }
                                }
                                newMatrix[rowIndex] = row
                                return addBufferRow ? [...newMatrix, ...weekMatrix] : [...newMatrix]
                            }
                        }, weekMatrix)
                        // Remove any empty rows from the matrix
                        .filter((m1) => !m1.every((m2) => !m2))
                )
            })
            // this adds the flag "first" to the first
            // occurence of the event (so we can hide/blank div the others)
            // and
            // this add "isEnd" to each date so we know to roundToDay
            // the right radius of the event component
            .map((events, index) => {
                return events.map((eventRow) => {
                    let eventId = null
                    return eventRow.map((event) => {
                        if (!event) return event
                        const newEvent = {
                            ...event,
                            isFirst: event ? event.id != eventId : null,
                            isEnd: dayIsPartOfDays(event.end, weeks[index]),
                        }
                        eventId = event.id
                        return newEvent
                    })
                })
            })

        return {
            weeks,
            matrix,
        }
    }, [date, events])

    const handleMouseEnter = (day) => {
        if (!ghost || !dragging) return

        if (ghost.create) {
            const anchorTimestamp = ghost.anchor.getTime() / (1000 * 3600 * 24)
            const dayTimestamp = day.getTime() / (1000 * 3600 * 24)

            // TODO: Improve
            if (dayTimestamp < anchorTimestamp) {
                // before
                setGhost({
                    ...ghost,
                    start: day,
                    end: ghost.anchor,
                })
            }

            if (dayTimestamp > anchorTimestamp) {
                // after
                setGhost({
                    ...ghost,
                    start: ghost.anchor,
                    end: day,
                })
            }

            if (dayTimestamp == anchorTimestamp) {
                // same
                setGhost({
                    ...ghost,
                    start: ghost.anchor,
                    end: ghost.anchor,
                })
            }
        } else {
            const start = setMidnight(day).getTime()
            let end = setMidnight(ghost.start).getTime()
            let days = ((end - start) / (1000 * 3600 * 24)) * -1

            // see if the event is dragged from the schedule
            const isScheduleEvent = ghost.type == 'schedule'
            const wasScheduleEvent = ghost.originGhost.type == 'schedule'
            const isMonthEvent = ghost.type == 'month'
            const wasMonthEvent = ghost.originGhost.type == 'month'

            let ghostBuffer = ghost.buffer
            let ghostStart = ghost.start
            let ghostEnd = ghost.end
            let ghostAllDay = ghost.isDay

            // drag: schedule > month
            if (wasScheduleEvent) {
                ghostEnd = ghost.start
                ghostBuffer = 0
                ghostAllDay = 'true'
            }

            // drag: month > schedule > month
            // fall back to original ghost object
            if (isScheduleEvent && wasMonthEvent) {
                ghostBuffer = ghost.originGhost.buffer
                ghostStart = ghost.originGhost.start
                ghostEnd = ghost.originGhost.end
                ghostAllDay = ghost.originGhost.isDay
                end = setMidnight(ghost.originGhost.start).getTime()
                days = ((end - start) / (1000 * 3600 * 24)) * -1
            }

            if (!windowObject[CALENDAR_DRAG_DIRECTION]) {
                if (days > 0) {
                    setGhost({
                        ...ghost,
                        start: FDate(ghostStart).add(days - ghostBuffer, 'day'),
                        end: FDate(ghostEnd).add(days - ghostBuffer, 'day'),
                        buffer: ghostBuffer,
                        isDay: ghostAllDay,
                        type: 'month',
                    })
                } else {
                    setGhost({
                        ...ghost,
                        start: FDate(ghostStart).subtract(Math.abs(days) + ghostBuffer, 'day'),
                        end: FDate(ghostEnd).subtract(Math.abs(days) + ghostBuffer, 'day'),
                        buffer: ghostBuffer,
                        isDay: ghostAllDay,
                        type: 'month',
                    })
                }
            }

            if (windowObject[CALENDAR_DRAG_DIRECTION] == 'start') {
                if (roundToDay(new Date(day).getTime()) <= roundToDay(ghost.end.getTime())) {
                    setGhost({
                        ...ghost,
                        start: new Date(day),
                        buffer: ghostBuffer,
                    })
                }
            }

            if (windowObject[CALENDAR_DRAG_DIRECTION] == 'end') {
                if (roundToDay(new Date(day).getTime()) >= roundToDay(ghost.start.getTime())) {
                    setGhost({
                        ...ghost,
                        end: new Date(day),
                        buffer: ghostBuffer,
                    })
                }
            }
        }
    }

    return (
        <View
            {...rest}
            className={className}>
            <div className="f-calendar-days__main f-col">
                {weeks.map((week, index1) => {
                    const weekEvents = matrix[index1]

                    return (
                        <div
                            key={index1}
                            className="f-calendar-days__row f-row">
                            {week.map((day, index2) => {
                                return (
                                    <CalendarDaysDay
                                        date={date}
                                        day={day}
                                        key={index2}
                                        width={100 / week.length}
                                        noClamp={noClamp}
                                        index={index2}
                                        weekIndex={index1}
                                        weekEvents={weekEvents}
                                        onMouseEnter={handleMouseEnter}
                                    />
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </View>
    )
}
