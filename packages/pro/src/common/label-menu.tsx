import { Button, CoreViewProps, Footer, Size } from '@fold-dev/core'
import React, { useState } from 'react'
import { LabelSelect, LabelSelectLabel } from './label-select'

export type LabelMenuProps = {
    saveOnUpdate?: boolean
    labels?: LabelSelectLabel[]
    onCancel: () => void
    onSave: (users: LabelSelectLabel[]) => void
} & CoreViewProps

export const LabelMenu = (props: LabelMenuProps) => {
    const { saveOnUpdate, onCancel, onSave, labels = [] } = props
    const [internalLabels, setInternalLabels] = useState(labels)

    const handleLabelAdd = (label) => {
        let il = []

        if (internalLabels.findIndex((internalLabel) => label.id == internalLabel.id) == -1) {
            il = [label, ...internalLabels]
        } else {
            il = internalLabels.filter((internalLabel) => label.id != internalLabel.id)
        }

        setInternalLabels(il)
        if (saveOnUpdate) onSave(il)
    }

    const handleLabelDelete = (label) => {
        let il = internalLabels.filter((internalLabel) => label.id != internalLabel.id)
        setInternalLabels(il)
        if (saveOnUpdate) onSave(il)
    }

    const handleSave = () => {
        onSave(internalLabels)
    }

    return (
        <LabelSelect
            labels={internalLabels}
            onAdd={handleLabelAdd}
            onDelete={handleLabelDelete}
            footer={
                <Footer
                    justifyContent="space-between"
                    p="var(--f-radius) var(--f-radius) 0 var(--f-radius)">
                    <Button
                        size="sm"
                        onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button
                        size="sm"
                        variant="accent"
                        onClick={handleSave}>
                        Save
                    </Button>
                </Footer>
            }
        />
    )
}
