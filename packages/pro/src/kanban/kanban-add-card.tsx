import { IconLib, InputControl, InputPrefix, Textarea, getKey } from '@fold-ui/core'
import React, { useRef, useState } from 'react'

export type KanbanAddCardProps = {
    onAdd: any
}

export const KanbanAddCard = (props: KanbanAddCardProps) => {
    const { onAdd } = props
    const [value, setValue] = useState('')
    const ref = useRef(null)

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
                e.currentTarget.focus()
                onAdd(value)
                setValue('')
            }
        }
    }

    return (
        <InputControl
            ref={ref}
            position="relative">
            <InputPrefix>
                <IconLib icon="plus" />
            </InputPrefix>
            <Textarea
                ref={ref}
                minHeight={41}
                autoAdjust
                value={value}
                placeholder="Add Card"
                onKeyDown={handleKeyDown}
                onMouseDown={(e) => e.stopPropagation()}
                onChange={(e) => setValue(e.target.value)}
            />
        </InputControl>
    )
}
