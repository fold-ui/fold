import {
    ContextMenuContext,
    FDate,
    FITime,
    FIUser,
    Icon,
    classNames,
    cleanObject,
    getBoundingClientRect,
    isRightMouseButton,
    lightenedHex,
    pad,
    useTheme,
    windowObject,
} from '@fold-dev/core'
import React, { useContext, useLayoutEffect, useMemo, useRef } from 'react'
import { CALENDAR_DRAG_DIRECTION, UserSelectUser, getUserGroupName } from '../'
import { CalendarContext } from './calendar.provider'

export type CalendarScheduleEventComponentProps = {
    start: Date
    end: Date
    users?: UserSelectUser[]
    title: string
    color?: string
    style: any
    ghost?: boolean
    onClick: (e) => void
    onMouseUp: (e) => void
    onMouseDown: (e) => void
    onContextMenuClick: (e) => void
} & any

export const CalendarScheduleEventComponent = (props: CalendarScheduleEventComponentProps) => {
    const {
        start,
        end,
        users = [],
        title,
        color,
        style = {},
        ghost,
        onClick,
        onMouseUp,
        onMouseDown,
        onContextMenuClick,
    } = props
    const ref = useRef(null)
    const { scheduleTimeFormat } = useContext(CalendarContext)
    const { systemTheme } = useTheme()
    const userLabel = useMemo(() => getUserGroupName(users), [users])
    const isPast = useMemo(() => FDate(end).isBefore(new Date()), [end])
    const styles = useMemo(() => {
        const backgroundColor = color ? lightenedHex(color, 80) : null

        if (systemTheme == 'light') {
            return cleanObject({
                color,
                backgroundColor,
                borderColor: color ? lightenedHex(color, 60) : null,
                borderWidth: 1,
                outlineColor: backgroundColor,
            })
        } else {
            return cleanObject({
                color: backgroundColor,
                backgroundColor: color,
                borderColor: color ? lightenedHex(color, 30) : null,
                borderWidth: 1,
                outlineColor: color,
            })
        }
    }, [color, systemTheme])
    const time = useMemo(() => {
        return scheduleTimeFormat
            ? scheduleTimeFormat(start, end)
            : `${pad(start.getHours())}:${pad(start.getMinutes())} - ${pad(end.getHours())}:${pad(end.getMinutes())}`
    }, [start, end, scheduleTimeFormat])
    const className = classNames(
        {
            'f-calendar-schedule-event': true,
            'is-past': isPast,
            'is-ghost': ghost,
        },
        [props.className]
    )

    useLayoutEffect(() => {
        const el: any = ref.current
        if (el) el.addEventListener('contextmenu', onContextMenuClick)
        return () => (el ? el.removeEventListener('contextmenu', onContextMenuClick) : null)
    })

    return (
        <div
            style={style}
            className={className}>
            <div
                ref={ref}
                tabIndex={0}
                onClick={onClick}
                onMouseUp={onMouseUp}
                onMouseDown={onMouseDown}
                style={styles}
                className="f-calendar-schedule-event__inner">
                <span
                    className="f-calendar-schedule-event__title f-ellipsis"
                    dangerouslySetInnerHTML={{ __html: title }}
                />
                <span className="f-calendar-schedule-event__date f-ellipsis f-row">
                    <Icon
                        icon={FITime}
                        size="xs"
                    />
                    <span className="f-ellipsis">{time}</span>
                </span>
                {!!userLabel && (
                    <span className="f-calendar-schedule-event__users f-ellipsis f-row">
                        <Icon
                            icon={FIUser}
                            size="xs"
                        />
                        <span className="f-ellipsis">{userLabel}</span>
                    </span>
                )}
            </div>
        </div>
    )
}

export type CalendarScheduleEventProps = {
    id: string
    title: string
    start: Date
    end: Date
    users?: UserSelectUser[]
    isDay?: boolean
    color?: string
    zIndex?: number
    top: number
    height: number
    width: number
    left: number
    onMouseDownSchedule: (data) => void
}

export const CalendarScheduleEvent = (props: CalendarScheduleEventProps) => {
    const {
        id,
        title,
        start,
        end,
        users = [],
        isDay,
        color,
        zIndex,
        top,
        height,
        width,
        left,
        onMouseDownSchedule,
    } = props
    const timeoutRef = useRef(null)
    const { setMenu } = useContext(ContextMenuContext)
    const { scheduleEvent, onEventOpen } = useContext(CalendarContext)
    const ScheduleEvent: any = scheduleEvent || CalendarScheduleEventComponent

    const handleClick = (e) => {
        const event = { id, title, start, end, color, users, isDay }
        // e.stopPropagation()
        // e.preventDefault()
        onEventOpen({ ...event }, e)
    }

    const handleMouseDown = (e) => {
        if (isRightMouseButton(e)) return

        const element = e.currentTarget
        const { top, height } = getBoundingClientRect(element.parentNode.parentNode)
        const box = getBoundingClientRect(element)
        const mouseTop = e.clientY
        const distance = mouseTop - top
        const threshold = height / 4 > 10 ? 10 : height / 4
        const dragDirection =
            mouseTop < box.top + threshold ? 'start' : mouseTop > box.bottom - threshold ? 'end' : null

        windowObject[CALENDAR_DRAG_DIRECTION] = dragDirection

        // TODO: refactor / find a better solution
        // drag delay so doesn't intercept clicks
        timeoutRef.current = setTimeout(() => onMouseDownSchedule(distance), 150)
    }

    const handleMouseUp = (e) => clearTimeout(timeoutRef.current)

    const handleContextMenuClick = (e) => {
        e.preventDefault()
        e.stopPropagation()

        const event = { id, title, start, end, isDay }
        setMenu({ target: 'event', payload: event }, { x: e.clientX, y: e.clientY })
    }

    return (
        <ScheduleEvent
            onClick={handleClick}
            onMouseUp={handleMouseUp}
            onMouseDown={handleMouseDown}
            onContextMenuClick={handleContextMenuClick}
            start={start}
            end={end}
            users={users}
            title={title}
            color={color}
            style={{
                top,
                height,
                left: left + '%',
                width: width + '%',
                zIndex,
            }}
        />
    )
}
