import { FDate, sameDay, Popover, Portal, useVisibility } from '@fold-dev/core'
import React, { useMemo } from 'react'
import { getShortDateFormat } from '../helpers'
import { DateSelect } from './date-select'
import { ToolbarButton } from './toolbar-button'
import { CalendarTypes } from 'calendar'

export const useDateButton = (dates: { start: Date; end: Date }, complete) => {
    const { dateLabel, dateColor } = useMemo(() => {
        const { start, end } = dates
        const hasDate = start || end
        let hasOneDate = (!start && end) || (start && !end)
        let dateColor, dateLabel

        if (hasDate) {
            if (!hasOneDate) {
                if (sameDay(start, end)) hasOneDate = true
            }

            if (hasOneDate) {
                const date = start || end
                const isPast = new Date().getTime() - date.getTime() > 0

                if (FDate(date).isToday()) {
                    dateLabel = 'Today'
                    dateColor = 'var(--f-color-success)'
                } else if (FDate(date).isTomorrow()) {
                    dateLabel = 'Tomorrow'
                } else if (FDate(date).isYesterday()) {
                    dateLabel = 'Yesterday'
                    dateColor = 'var(--f-color-warning)'
                } else if (isPast) {
                    dateLabel = FDate(date).fromNow()
                    dateColor = 'var(--f-color-danger)'
                } else {
                    dateLabel = FDate(date).fromNow()
                }
            } else {
                const isPast = new Date().getTime() - end.getTime() > 0

                if (FDate(end).isToday()) {
                    dateLabel = 'Today'
                    dateColor = 'var(--f-color-success)'
                } else if (FDate(end).isTomorrow()) {
                    dateLabel = 'Tomorrow'
                } else if (FDate(end).isYesterday()) {
                    dateLabel = 'Yesterday'
                    dateColor = 'var(--f-color-warning)'
                } else if (isPast) {
                    dateLabel = FDate(end).fromNow()
                    dateColor = 'var(--f-color-danger)'
                } else {
                    dateLabel = FDate(end).fromNow()
                }

                dateLabel = `${getShortDateFormat(start)} - ${getShortDateFormat(end)}`
            }
        }

        if (complete) dateColor = undefined

        return {
            dateLabel,
            dateColor,
        }
    }, [dates])

    return { dateLabel, dateColor }
}

export type DateButtonProps = {
    complete?: boolean
    dates?: { start: Date; end: Date }
    repeat?: CalendarTypes.Repeat
    onDateChange: ({ dates, repeat }) => void
    onDelete: () => void
    portal?: any
    disabled?: boolean
}

export const DateButton = (props: DateButtonProps) => {
    const { complete, dates = { start: null, end: null }, repeat, onDateChange, onDelete, portal, disabled } = props
    const { visible, show, hide } = useVisibility(false)
    const { dateLabel, dateColor } = useDateButton(dates, complete)

    return (
        <Popover
            portal={portal}
            focusTrap={false}
            width="fit-content"
            content={
                <DateSelect
                    dates={dates}
                    repeat={repeat}
                    onCancel={hide}
                    onSave={({ dates, repeat }) => {
                        onDateChange({ dates, repeat })
                        hide()
                    }}
                />
            }
            isVisible={visible}
            onDismiss={hide}>
            <ToolbarButton
                disabled={disabled}
                icon={!!repeat ? 'repeat' : 'date'}
                hasClose={!!dateLabel}
                text={dateLabel || 'No date'}
                color={dateColor}
                onClick={show}
                onClose={onDelete}
            />
        </Popover>
    )
}
