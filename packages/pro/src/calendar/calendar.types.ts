import { BadgesBadge, LabelSelectLabel, UserSelectUser } from '../'

export namespace CalendarTypes {
    export type EventUser = {} & UserSelectUser

    export type EventLabel = {} & LabelSelectLabel

    export type EventBadge = {} & BadgesBadge

    export type WorkingHours = {
        start: string
        end: string
    }

    export type Schedule = {
        date: Date
        workingHours?: WorkingHours
    }

    export type Repeat = {
        interval: number
        weekday: number[]
        frequency: 'day' | 'week' | 'weekday' | 'month' | 'monthday' | 'monthweek' | 'year'
        from: Date
        to?: Date
        repetitions?: number
    }

    export type Event = {
        id?: number | string
        title: string
        description?: string
        color?: string
        locked?: boolean
        start: Date
        end: Date
        repeat?: Repeat
        isDay?: boolean
        users?: EventUser[]
    }
}
