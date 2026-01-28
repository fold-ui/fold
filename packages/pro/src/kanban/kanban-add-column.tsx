import {
    Button,
    IconLib,
    Input,
    InputControl,
    InputPrefix,
    Popover,
    View,
    focusElementById,
    getKey,
    useVisibility,
    waitForRender,
} from '@fold-dev/core'
import React, { useRef, useState } from 'react'

export type KanbanAddColumnProps = {
    onAdd: any
}

export const KanbanAddColumn = (props: KanbanAddColumnProps) => {
    const { onAdd } = props
    const [value, setValue] = useState('')
    const ref = useRef(null)
    const { visible, show, hide } = useVisibility(false)

    const handleKeyDown = (e) => {
        const { isEscape, isEnter, isShift } = getKey(e)

        if (isEscape) {
            ref.current.blur()
            setValue('')
        }

        if (isEnter) {
            if (!isShift) {
                ref.current.blur()
                e.preventDefault()
                onAdd(value)
                setValue('')
            }
        }
    }

    return (
        <Popover
            arrow
            width={300}
            content={
                <View
                    p={20}
                    column
                    gap={10}
                    alignItems="flex-start">
                    <InputControl
                        ref={ref}
                        position="relative">
                        <InputPrefix>
                            <IconLib icon="plus" />
                        </InputPrefix>
                        <Input
                            autoFocus
                            id="f-kanban-new-column-name"
                            value={value}
                            placeholder="New column name"
                            onChange={(e) => setValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onMouseDown={(e) => e.stopPropagation()}
                        />
                    </InputControl>
                </View>
            }
            isVisible={visible}
            onDismiss={hide}>
            <Button
                className="f-kanban-add-column"
                onClick={() => {
                    show()
                    waitForRender(() => focusElementById('f-kanban-new-column-name'), 100)
                }}
                style={{ '--f-button-background-color': 'var(--f-color-surface-strong)' }}>
                <IconLib
                    icon="plus"
                    size="sm"
                />
            </Button>
        </Popover>
    )
}
