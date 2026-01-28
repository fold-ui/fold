import { DragElementArea } from '@fold-dev/core'
import React from 'react'
import { TodoSection, TodoTypes } from '../'

export type TodoSectionsProps = {
    sections: TodoTypes.Section[]
}

export const TodoSections = (props: TodoSectionsProps) => {
    const { sections } = props

    return (
        <DragElementArea
            areaId="sections"
            variant="lined"
            group="sections"
            direction="vertical"
            className="f-todo-sections">
            {sections.map((section: TodoTypes.Section, index: number) => (
                <TodoSection
                    {...section}
                    key={index}
                    index={index}
                />
            ))}
        </DragElementArea>
    )
}
