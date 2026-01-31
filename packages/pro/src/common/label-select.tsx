import { IconLib, Pill, Select, SelectOption, SelectProps, Text, getKey } from '@fold-ui/core'
import React, { ReactElement, ReactNode, useContext, useMemo, useState } from 'react'
import { CommonContext } from './common.provider'

export type LabelSelectLabel = {
    id: string | number
    icon?: string
    color?: string
    text: string
}

export type LabelSelectProps = {
    labels: LabelSelectLabel[]
    onAdd?: (label: LabelSelectLabel) => void
    onDelete?: (label: LabelSelectLabel) => void
    footer?: ReactElement | null
}

export const LabelSelect = (props: LabelSelectProps) => {
    const { labels = [], onAdd, onDelete, footer } = props
    const { availableLabels = [], onLabelFilter } = useContext(CommonContext)
    const selected = useMemo(() => labels.map((label: LabelSelectLabel) => label.id), [labels])
    const options: any = useMemo(() => {
        return availableLabels.map((label: LabelSelectLabel) => ({
            key: label.id,
            label: label.text,
            suffix: (
                <IconLib
                    icon={label.icon || 'tag'}
                    color={label.color}
                />
            ),
        }))
    }, [availableLabels])

    const handleUserSelect = (option: SelectOption) => {
        const label = availableLabels.find((availableLabel: any) => availableLabel.id == option.key)

        if (!!labels.find((label: any) => label.id == option.key)) {
            onDelete(label)
        } else {
            onAdd(label)
        }
    }

    const handleInputKeyDown = (e) => {
        const { isBackspace } = getKey(e)
        if (isBackspace && !e.target.value) onDelete(labels[labels.length - 1])
    }

    return (
        <Select
            tagInput
            variant="static"
            noListFocus
            trapFocus
            placeholder="Add label"
            selected={selected}
            options={options}
            filterDelay={1000}
            selectListProps={{
                noOptionsComponent: <Text p="var(--f-select-option-padding)">No labels available</Text>,
            }}
            tagInputFieldProps={{ onKeyDown: handleInputKeyDown }}
            onSelect={(option, dismiss, clear) => {
                clear()
                handleUserSelect(option)
            }}
            onFilter={onLabelFilter}
            footer={footer}
            render={() =>
                labels.map((label: LabelSelectLabel, index: number) => (
                    <Pill
                        subtle
                        key={index}
                        color={label.color}
                        size="sm"
                        suffix={
                            <IconLib
                                icon="x"
                                className="f-buttonize"
                                onClick={() => onDelete(label)}
                            />
                        }>
                        {label.text}
                    </Pill>
                ))
            }
        />
    )
}
