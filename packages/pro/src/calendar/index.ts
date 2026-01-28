import { windowObject } from '@fold-dev/core'

export * from './calendar-days-day'
export * from './calendar-days-event'
export * from './calendar-days'
export * from './calendar-event-detail'
export * from './calendar-event-preview'
export * from './calendar-schedule-day'
export * from './calendar-schedule-event'
export * from './calendar-schedule-gutter'
export * from './calendar-schedule-segments'
export * from './calendar-schedule'
export * from './calendar.provider'
export * from './calendar.types'
export * from './calendar.util'

export const CALENDAR_DRAG_DIRECTION = 'CALENDAR_DRAG_DIRECTION'

windowObject[CALENDAR_DRAG_DIRECTION] = null
