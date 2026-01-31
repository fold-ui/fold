import { CoreViewProps, View, classNames } from '@fold-ui/core'
import React, { useContext, useMemo } from 'react'
import { CalendarScheduleDay } from './calendar-schedule-day'
import { CalendarScheduleGutter } from './calendar-schedule-gutter'
import { CalendarContext } from './calendar.provider'
import { CalendarTypes } from './calendar.types'

export type CalendarScheduleProps = {
    days?: CalendarTypes.Schedule[]
    events: CalendarTypes.Event[]
} & CoreViewProps

export const CalendarSchedule = (props: CalendarScheduleProps) => {
    const { days, events = [], ...rest } = props
    const { dragging, dimPastEvents, canAdd, canUpdate, hideGutter } = useContext(CalendarContext)
    const daysWithEvents = useMemo(() => {
        return days.map(({ date, workingHours = { start: null, end: null } }) => {
            const start = new Date(date.setHours(0, 0, 0, 0))
            const end = new Date(date.setHours(23, 59, 59, 999))

            return {
                day: date,
                workingHours,
                start,
                end,
                events: events
                    .filter((event) => {
                        return (
                            (event.end > start && event.end <= end) ||
                            (event.start >= start && event.start <= end) ||
                            (event.start < start && event.end > end)
                        )
                    })
                    .map((event) => {
                        return {
                            ...event,
                            start: event.start < start ? start : event.start,
                            end: event.end > end ? end : event.end,
                        }
                    }),
            }
        })
    }, [days, events])
    const className = classNames(
        {
            'f-calendar-schedule': true,
            'f-col': true,
            'is-dragging': dragging,
            'can-add': canAdd,
            'can-update': canUpdate,
            'dim-past': dimPastEvents,
        },
        [props.className]
    )

    const getMasterEvents = () => events

    return (
        <View
            {...rest}
            className={className}>
            <div className="f-calendar-schedule__main f-row">
                {!hideGutter && <CalendarScheduleGutter />}

                {daysWithEvents.map(({ day, workingHours, start, end, events }, index) => {
                    return (
                        <CalendarScheduleDay
                            key={index}
                            day={day}
                            start={start}
                            end={end}
                            events={events}
                            getMasterEvents={getMasterEvents}
                            workingHours={workingHours}
                        />
                    )
                })}
            </div>
        </View>
    )
}
