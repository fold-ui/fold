import {
    Button,
    DatePickerProvider,
    Flexer,
    Heading,
    IconLib,
    Input,
    InputControl,
    InputPopover,
    InputSuffix,
    Label,
    Link,
    Popover,
    ScrollingDatePicker,
    TimePicker,
    Toggle,
    View,
    useCheck,
    useVisibility,
} from '@fold-dev/core'
import { CalendarTypes } from 'calendar'
import React, { useMemo, useRef, useState } from 'react'
import { getDateSelectTimeFormat, getRepeatFrequencyText } from '../helpers'
import { Repeat, defaultWeekdays } from './repeat'

export type DateSelectProps = {
    wholeDay?: boolean
    dateRange?: boolean
    dates: { start: Date; end: Date }
    repeat?: CalendarTypes.Repeat
    presets?: { preset: string; label: string }[]
    monthNames?: string[]
    onSave?: (val) => void
    onCancel?: () => void
}

export const DateSelect = (props: DateSelectProps) => {
    const {
        dates = { start: null, end: null },
        presets = [
            { preset: 'today', label: 'Today' },
            { preset: 'tomorrow', label: 'Tomorrow' },
            { preset: 'next-week', label: 'Next week' },
            { preset: 'next-month', label: 'Next month' },
            { preset: 'this-week', label: 'This week' },
            { preset: 'this-month', label: 'This month' },
            { preset: 'last-6-weeks', label: 'Last 6 weeks' },
            { preset: 'last-6-months', label: 'Last 6 months' },
            { preset: 'last-year', label: 'Last year' },
        ],
        monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        onSave,
        onCancel,
    } = props
    const ref = useRef(null)
    const { visible, show, hide } = useVisibility(false)
    const dateRange = useCheck(!!props.dateRange)
    const wholeDay = useCheck(!!props.wholeDay)
    const [start, setStart] = useState(dates.start)
    const [end, setEnd] = useState(dates.end)
    const [repeat, setRepeat] = useState(props.repeat)
    const [selection, setSelection] = useState<any[]>(!!dates.start && !!dates.end ? [[dates.start, dates.end]] : [])
    const [defaultDate, setDefaultDate] = useState(dates.start || dates.end || new Date())
    const repeatLabel = useMemo(
        () => (repeat ? getRepeatFrequencyText(repeat, defaultWeekdays) : 'Add repeat schedule'),
        [repeat]
    )

    const selectPresetDate = (preset) => {
        const now = new Date()
        let start = new Date()
        let end = new Date()
        const currentDate = new Date()
        const dayOfWeek = currentDate.getDay()

        switch (preset) {
            case 'today':
                start = new Date(now.getFullYear(), now.getMonth(), now.getDate())
                end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999)
                dateRange.setChecked(false)
                break
            case 'tomorrow':
                const tomorrow = new Date(now)
                tomorrow.setDate(now.getDate() + 1)
                start = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate())
                end = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 23, 59, 59, 999)
                dateRange.setChecked(false)
                break
            case 'next-week':
                const daysUntilNextMonday = (8 - dayOfWeek) % 7
                const nextMonday = new Date(currentDate)
                nextMonday.setDate(currentDate.getDate() + daysUntilNextMonday)
                nextMonday.setHours(0, 0, 0, 0)
                start = nextMonday
                end = nextMonday
                dateRange.setChecked(false)
                break
            case 'next-month':
                const nextMonth = currentDate.getMonth() + 1
                const nextYear = currentDate.getFullYear() + Math.floor(nextMonth / 12)
                const startOfNextMonth = new Date(nextYear, nextMonth % 12, 1)
                startOfNextMonth.setHours(0, 0, 0, 0)
                start = startOfNextMonth
                end = startOfNextMonth
                dateRange.setChecked(false)
                break
            case 'this-week':
                const startOffset = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek
                start = new Date(now)
                start.setDate(now.getDate() + startOffset)
                start.setHours(0, 0, 0, 0)
                end = new Date(start)
                end.setDate(start.getDate() + 6)
                end.setHours(23, 59, 59, 999)
                dateRange.setChecked(true)
                break
            case 'this-month':
                start = new Date(now.getFullYear(), now.getMonth(), 1)
                end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
                dateRange.setChecked(true)
                break
            case 'last-6-weeks':
                end = new Date(now)
                const dayOfWeek1 = end.getDay()
                const endOffset = 7 - (dayOfWeek1 === 0 ? 7 : dayOfWeek1)
                end.setDate(end.getDate() + endOffset)
                end.setHours(23, 59, 59, 999)
                start = new Date(end)
                start.setDate(end.getDate() - 6 * 7 + 1)
                start.setHours(0, 0, 0, 0)
                dateRange.setChecked(true)
                break
            case 'last-6-months':
                end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
                start = new Date(now.getFullYear(), now.getMonth() - 5, 1)
                start.setHours(0, 0, 0, 0)
                dateRange.setChecked(true)
                break
            case 'last-year':
                end = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999)
                start = new Date(now.getFullYear() - 1, 0, 1, 0, 0, 0, 0)
                dateRange.setChecked(true)
                break
        }

        setSelection([[start, end]])
        setDefaultDate(start)
        setStart(start)
        setEnd(end)
    }

    const handleSelection = (date: Date) => {
        if (dateRange.checked) {
            if (selection.length == 0) {
                setSelection([[date, null]])
            } else {
                const selected = selection[0]

                if (!selected[0]) {
                    setSelection([date, null])
                } else if (!!selected[0] && !!selected[1]) {
                    setSelection([[date, null]])
                } else if (!!selected[0] && !selected[1]) {
                    if (selected[0] > date) {
                        setSelection([[date, selected[0]]])
                        setStart(date)
                        setEnd(selected[0])
                    } else {
                        setSelection([[selected[0], date]])
                        setStart(selected[0])
                        setEnd(date)
                    }
                }
            }
        } else {
            setSelection([[date, date]])
            setStart(date)
            setEnd(date)
        }
    }

    const handleStartDate = (date) => {
        setStart(date)
        setSelection([[date, selection[0] ? selection[0][1] : new Date()]])
    }

    const handleEndDate = (date) => {
        setEnd(date)
        setSelection([[selection[0] ? selection[0][0] : new Date(), date]])
    }

    const handleClear = () => {
        setRepeat(undefined)
        setStart(null)
        setEnd(null)
        setSelection([])
    }

    const handleSave = () => {
        onSave({ dates: { start, end }, repeat })
    }

    return (
        <div className="f-date-select">
            <div className="f-date-select__date f-row">
                {!!presets.length && (
                    <div className="f-date-select__presets f-col">
                        {presets.map(({ preset, label }, index) => (
                            <Link
                                key={index}
                                size="sm"
                                className="f-underline"
                                onClick={() => selectPresetDate(preset)}>
                                {label}
                            </Link>
                        ))}
                    </div>
                )}

                <div className="f-date-select__date-picker">
                    <DatePickerProvider>
                        <ScrollingDatePicker
                            height={290}
                            ref={ref}
                            defaultDate={defaultDate}
                            selection={selection}
                            onChange={handleSelection}
                            monthTitle={(date: Date) => (
                                <span className="f-text sm f-date-select__month">
                                    {monthNames[date.getMonth()]} {date.getFullYear()}
                                </span>
                            )}
                        />
                    </DatePickerProvider>
                </div>

                <div className="f-date-select__time f-col">
                    <Heading
                        as="h6"
                        fontWeight={500}
                        colorToken="accent">
                        Start time:
                    </Heading>
                    <InputPopover
                        content={
                            <View p={20}>
                                <TimePicker
                                    autoFocus
                                    showAmPm={false}
                                    minutesDivider={1}
                                    showSeconds={false}
                                    height={200}
                                    date={start}
                                    onChange={handleStartDate}
                                />
                            </View>
                        }>
                        <InputControl width={150}>
                            <Input
                                disabled={wholeDay.checked}
                                style={{ cursor: 'pointer' }}
                                onChange={(e) => null}
                                placeholder=""
                                value={wholeDay.checked ? '--' : getDateSelectTimeFormat(start)}
                            />
                            <InputSuffix>
                                <IconLib
                                    icon="time"
                                    style={{ pointerEvents: 'none' }}
                                />
                            </InputSuffix>
                        </InputControl>
                    </InputPopover>
                    <Heading
                        as="h6"
                        fontWeight={500}
                        colorToken="accent">
                        End time:
                    </Heading>
                    <InputPopover
                        content={
                            <View p={20}>
                                <TimePicker
                                    autoFocus
                                    showAmPm={false}
                                    minutesDivider={1}
                                    showSeconds={false}
                                    height={200}
                                    date={end}
                                    onChange={handleEndDate}
                                />
                            </View>
                        }>
                        <InputControl width={150}>
                            <Input
                                disabled={wholeDay.checked}
                                style={{ cursor: 'pointer' }}
                                onChange={(e) => null}
                                placeholder=""
                                value={wholeDay.checked ? '--' : getDateSelectTimeFormat(end)}
                            />
                            <InputSuffix>
                                <IconLib
                                    icon="time"
                                    style={{ pointerEvents: 'none' }}
                                />
                            </InputSuffix>
                        </InputControl>
                    </InputPopover>
                    <View
                        row
                        gap={10}>
                        <Toggle
                            id="f-date-select-time"
                            onChange={wholeDay.check}
                            on={wholeDay.checked}
                        />
                        <Label htmlFor="f-date-select-time">Whole day</Label>
                    </View>
                    <Flexer />
                    <Popover
                        arrow
                        focusTrap
                        width="fit-content"
                        anchor="top-right"
                        content={
                            <Repeat
                                border="none"
                                repeat={repeat}
                                onSave={hide}
                                onDismiss={hide}
                                onChange={(repeat) => setRepeat(repeat)}
                                onClear={() => {
                                    setRepeat(undefined)
                                    hide()
                                }}
                            />
                        }
                        isVisible={visible}
                        onDismiss={hide}>
                        <div className="f-row">
                            <Link
                                style={{ maxWidth: 150 }}
                                size="sm"
                                colorToken="text-weaker"
                                className="f-underline"
                                onClick={show}>
                                {repeatLabel}
                            </Link>
                        </div>
                    </Popover>
                </div>
            </div>

            <div className="f-date-select__footer f-row">
                <Toggle
                    id="f-date-select-range"
                    onChange={dateRange.check}
                    on={dateRange.checked}
                />
                <Label htmlFor="f-date-select-range">Select a date range</Label>
                <Flexer />
                <Button
                    subtle
                    onClick={handleClear}>
                    Clear
                </Button>
                <Button onClick={onCancel}>Cancel</Button>
                <Button
                    variant="accent"
                    onClick={handleSave}>
                    Okay
                </Button>
            </div>
        </div>
    )
}
