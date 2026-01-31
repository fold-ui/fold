import { CalendarTypes } from '../calendar'
import { LabelSelectLabel, Priority, Repeat, UserSelectUser } from '../common'
import { BadgesBadge } from '../common'
import { ReactElement } from 'react'

export namespace KanbanTypes {
    export type CardUser = {} & UserSelectUser

    export type CardLabel = {} & LabelSelectLabel

    export type CardBadge = {} & BadgesBadge

    export type Card = {
        id?: number | string
        title: string
        description?: string
        image?: string
        color?: string
        priority?: Priority
        complete?: boolean
        locked?: boolean
        start?: Date
        end?: Date
        repeat?: CalendarTypes.Repeat
        users?: CardUser[]
        labels?: CardLabel[]
        badges?: CardBadge[]
        checkbox?: boolean
    }

    export type Column = {
        id: string
        name: string
        description?: string
        prefix?: ReactElement
        collapsed?: boolean
        color?: string
        cards: Card[]
        addCard?: boolean
        editableName?: boolean
        cardCount?: boolean
        locked?: boolean
        collapsible?: boolean
    }

    export type Swimlane = {
        id: string
        title?: string
        description?: string
        prefix?: ReactElement
        fixed?: boolean
        collapsed?: boolean
        collapsible?: boolean
        header?: boolean
        color?: string
        columns: Column[]
    }
}

export type KanbanSelection = {
    card: KanbanTypes.Card
    index: number
    column: number
    swimlane: number
}
