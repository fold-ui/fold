import { ReactElement } from 'react'
import { BadgesBadge, LabelSelectLabel, Priority, Repeat, UserSelectUser } from '../common'
import { CalendarTypes } from '../calendar'

export namespace TodoTypes {
    export type TaskUser = {} & UserSelectUser

    export type TaskLabel = {} & LabelSelectLabel

    export type TaskBadge = {} & BadgesBadge

    export type Task = {
        id?: string
        title: string
        description?: string
        color?: string
        priority?: Priority
        complete?: boolean
        locked?: boolean
        collapsed?: boolean
        collapsible?: boolean
        hideCheckbox?: boolean
        editable?: boolean
        addBelow?: boolean
        start?: Date
        end?: Date
        repeat?: CalendarTypes.Repeat
        users?: TaskUser[]
        labels?: TaskLabel[]
        badges?: TaskBadge[]
        tasks?: Task[]
    }

    export type Section = {
        id: string
        name: string
        description?: string
        prefix?: ReactElement
        color?: string
        header?: boolean
        locked?: boolean
        collapsed?: boolean
        collapsible?: boolean
        tasks: Task[]
        addSection?: boolean
        addTask?: boolean
        editableName?: boolean
        taskCount?: boolean
    }
}

export type TodoSelection = {
    task: TodoTypes.Task
    index: number
    section: number
}
