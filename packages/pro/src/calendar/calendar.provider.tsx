import { CommonProps, getKey, useEvent, useId, useVisibility, waitForRender, windowObject } from '@fold-dev/core'
import React, { ReactElement, ReactNode, createContext, useState } from 'react'
import { CALENDAR_DRAG_DIRECTION } from './'
import { CalendarDaysEventComponentProps } from './calendar-days-event'
import { CalendarScheduleEventComponentProps } from './calendar-schedule-event'

export const HOUR_CHUNKS = 15 // minutes
export const CHUNKS_IN_HOUR = 60 / HOUR_CHUNKS
export const GRID_SIZE = 24 // hours
export const SEGMENTS = GRID_SIZE * CHUNKS_IN_HOUR
export const TIME_SIZE = 100 / (GRID_SIZE * CHUNKS_IN_HOUR)
export const WEEK_MATRIX = new Array(1).fill(new Array(7).fill(null))
export const WEEK_SIZE = 7

export const CalendarContext = createContext<any>({
    weekdays: [],
    onAdd: null,
    onUpdate: null,
})

export type CalendarProviderProps = {
    __ghostDismissTimeout?: number
    canUpdate?: boolean
    canAdd?: boolean
    scheduleTimeFormat?: (start: Date, end: Date) => string
    daysTimeFormat?: (start: Date, end: Date) => string
    gutterFormat?: (hour) => string
    hideDateLabels?: boolean
    hideGutter?: boolean
    dimPastEvents?: boolean
    scheduleOverlapThreshold?: number
    scheduleEvent?: (props: CalendarScheduleEventComponentProps) => ReactElement
    daysEvent?: (props: CalendarDaysEventComponentProps) => ReactElement
    onEventOpen?: (data, e?) => void
    onEventUpdate?: (data) => void
    onEventAdd?: (data) => ReactNode
} & CommonProps

export const CalendarProvider = (props: CalendarProviderProps) => {
    const {
        __ghostDismissTimeout = 25,
        canUpdate = true,
        canAdd = true,
        scheduleTimeFormat,
        daysTimeFormat,
        gutterFormat,
        hideDateLabels,
        hideGutter,
        dimPastEvents,
        scheduleOverlapThreshold = 1,
        scheduleEvent,
        daysEvent,
        onEventOpen,
        onEventUpdate,
        onEventAdd,
        id,
    } = props
    const { visible, show, hide } = useVisibility(false)
    const [dragging, setDragging] = useState(false)
    const [ghost, setGhost] = useState(null)
    const instanceId = useId(id)
    const iid = instanceId

    const dismissGhost = () => {
        setGhost(null)
        setDragging(false)
        windowObject[CALENDAR_DRAG_DIRECTION] = null
    }

    const handleDone = () => {
        hide()
        waitForRender(dismissGhost, __ghostDismissTimeout)
    }

    const handleMouseUp = () => {
        if (ghost) {
            if (ghost.create) {
                show()
            } else {
                onEventUpdate({ ...ghost })
                handleDone()
            }
        }
    }

    const handleKeyDown = (e) => {
        const { isEscape } = getKey(e)
        if (isEscape && dragging) dismissGhost()
    }

    useEvent('mouseup', handleMouseUp)
    useEvent('keydown', handleKeyDown)

    return (
        <CalendarContext.Provider
            value={{
                hourChunks: HOUR_CHUNKS,
                chunksInHour: CHUNKS_IN_HOUR,
                gridSize: GRID_SIZE,
                segments: SEGMENTS,
                timeSize: TIME_SIZE,
                weekMatrix: WEEK_MATRIX,
                weekSize: WEEK_SIZE,
                canUpdate,
                canAdd,
                scheduleTimeFormat,
                daysTimeFormat,
                gutterFormat,
                hideDateLabels,
                hideGutter,
                dragging,
                setDragging,
                ghost,
                setGhost,
                dimPastEvents,
                instanceId,
                scheduleOverlapThreshold,
                scheduleEvent,
                daysEvent,
                onEventOpen,
                onEventUpdate,
                onEventAdd,
            }}>
            {visible && <>{onEventAdd({ done: handleDone, event: ghost })}</>}
            {props.children}
        </CalendarContext.Provider>
    )
}
