import React, { useContext, useMemo } from 'react'
import { useLineSegments } from './calendar.util'
import { pad } from '@fold-ui/core'
import { CalendarContext } from './calendar.provider'

export type CalendarScheduleGutterProps = {}

const GutterLabel = ({ time }) => {
    const { gutterFormat } = useContext(CalendarContext)
    const label = useMemo(() => (gutterFormat ? gutterFormat(time) : pad(time) + ':00'), [gutterFormat])

    return <span className="f-calendar-schedule-gutter__time f-ellipsis">{label}</span>
}

export const CalendarScheduleGutter = (props: CalendarScheduleGutterProps) => {
    const lines = useLineSegments()

    return (
        <div className="f-calendar-schedule-gutter">
            {lines.map(({ top, height, highlighted, time }, index) => (
                <div
                    key={index}
                    style={{ top, height }}
                    className={
                        highlighted
                            ? 'f-calendar-schedule-gutter__line is-highlighted f-row'
                            : 'f-calendar-schedule-gutter__line'
                    }>
                    {highlighted && <GutterLabel time={time} />}
                </div>
            ))}
        </div>
    )
}
