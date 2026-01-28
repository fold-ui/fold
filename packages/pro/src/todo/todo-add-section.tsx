import { IconLib, Pill, getKey } from '@fold-dev/core'
import React, { useRef, useState } from 'react'

export type TodoAddSectionProps = {
    onAdd: (value: string) => void
    onDismiss?: () => void
}

export const TodoAddSection = (props: TodoAddSectionProps) => {
    const { onAdd, onDismiss } = props
    const ref = useRef(null)
    const [over, setOver] = useState(false)
    const [form, setForm] = useState(false)
    const [title, setTitle] = useState('')

    const handleKeyDown = (e) => {
        const { isEscape, isEnter, isShift } = getKey(e)

        if (isEscape) {
            ref.current.blur()
            setTitle('')
            setForm(false)
            setOver(true)
            if (onDismiss) onDismiss()
        }

        if (isEnter && title.trim() != '') {
            if (!isShift) {
                ref.current.blur()
                e.preventDefault()
                onAdd(title)
                setTitle('')
                setForm(false)
                setOver(true)
            }
        }
    }

    return (
        <div
            onMouseLeave={() => setOver(false)}
            onMouseEnter={() => setOver(true)}
            className="f-todo-add-section">
            {form && (
                <div className="f-todo-add-section__inner f-row">
                    <IconLib
                        //icon="check-circle"
                        icon="plus"
                        size="lg"
                    />

                    <input
                        ref={ref}
                        onKeyDown={handleKeyDown}
                        placeholder="Section title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
            )}

            {over && !form && (
                <div className="f-todo-add-section__inner f-row">
                    <Pill
                        subtle
                        onClick={() => {
                            setForm(true)
                            setTimeout(() => ref.current?.focus(), 100)
                        }}
                        position="relative"
                        size="sm"
                        className="f-buttonise"
                        prefix={
                            <IconLib
                                //icon="check-circle"
                                icon="plus"
                                size="sm"
                            />
                        }>
                        Add New Section
                    </Pill>
                </div>
            )}
        </div>
    )
}
