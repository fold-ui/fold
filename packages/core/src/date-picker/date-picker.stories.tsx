import {
    Badge,
    Button,
    Card,
    DateCell,
    DatePicker,
    DatePickerMonth,
    DatePickerProvider,
    DatePickerWeekdays,
    Heading,
    IconLib,
    Input,
    InputControl,
    InputPopover,
    InputSuffix,
    MonthPicker,
    pad,
    ScrollingDatePicker,
    Stack,
    Text,
    TimePicker,
    useScrollingDatePicker,
    useVisibility,
    View,
    YearPicker,
} from '@fold-ui/core'
import React, { useMemo, useRef, useState } from 'react'

export default {
    title: 'Core/DatePicker',
    component: DatePicker,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Date & Time Pickers',
    subtitle: 'Date Time components offer highly versatile options for displaying and inputting dates.',
    description:
        'Date and Time components serve as fundamental elements for creating a wide range of date input controls, adapting to various requirements. While date elements can function on their own, their value is enhanced when incorporated within a DateRange context.',
}

export const Usage = () => {
    const [date, setDate] = useState(new Date())
    const { today, tomorrow } = useMemo(() => {
        const today = new Date()
        const tomorrow = new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000)

        return { today, tomorrow }
    }, [])
    const [selection, setSelection] = useState<any[]>([[today, tomorrow]])

    const handleSelection = (date: Date) => {
        if (selection.length == 0) {
            setSelection([[date, null]])
        } else {
            const selected = selection[0]
            if (!selected[0]) return setSelection([date, null])
            if (!!selected[0] && !!selected[1]) return setSelection([[date, null]])
            if (!!selected[0] && !selected[1])
                return setSelection(selected[0] > date ? [[date, selected[0]]] : [[selected[0], date]])
        }
    }

    return (
        <Card
            p={10}
            width="fit-content">
            <DatePickerProvider>
                <DatePicker
                    height={350}
                    width={300}
                    defaultDate={date}
                    selection={selection}
                    onChange={handleSelection}
                />
            </DatePickerProvider>
        </Card>
    )
}

// --

export const SelectWeek = () => {
    const [date, setDate] = useState(new Date())
    const { today, tomorrow } = useMemo(() => {
        const today = new Date()
        const tomorrow = new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000)

        return { today, tomorrow }
    }, [])
    const [selection, setSelection] = useState<any[]>([])

    const handleWeekSelection = (dates: Date[]) => {
        setSelection([...selection, dates])
    }

    return (
        <DatePickerProvider>
            <DatePicker
                selectWeek
                height={350}
                width={300}
                defaultDate={date}
                selection={selection}
                onChange={handleWeekSelection}
            />
        </DatePickerProvider>
    )
}

// --

export const MonthDisplay = () => {
    const today = new Date()
    const month = today.getMonth()
    const year = today.getFullYear()
    const date = new Date(year, month, 1)
    const selected = new Date(year, month, 16)
    const disabled = new Date(year, month, 14)

    return (
        <DatePickerProvider>
            <DatePickerMonth
                width={300}
                height={275}
                date={date}
                selection={[[selected, selected]]}
                disabled={[[disabled]]}
            />
        </DatePickerProvider>
    )
}

// --

export const MonthAndWeekdays = () => {
    const today = new Date()
    const month = today.getMonth()
    const year = today.getFullYear()
    const date = new Date(year, month, 1)
    const start = new Date(year, month, 16)
    const end = new Date(year, month, 19)
    const disabled = new Date(year, month, 13)

    return (
        <View width={300}>
            <DatePickerProvider>
                <DatePickerWeekdays width="100%" />
                <DatePickerMonth
                    width="100%"
                    height={275}
                    date={date}
                    selection={[[start, end]]}
                    disabled={[[disabled]]}
                />
            </DatePickerProvider>
        </View>
    )
}

// --

export const MonthCustomDayRender = () => {
    const today = new Date()
    const month = today.getMonth()
    const year = today.getFullYear()
    const date = new Date(year, month, 1)
    const start = new Date(year, month, 16)
    const end = new Date(year, month, 19)
    const disabled = new Date(year, month, 13)

    return (
        <View width={300}>
            <DatePickerProvider>
                <DatePickerWeekdays width="100%" />
                <DatePickerMonth
                    width="100%"
                    height={275}
                    date={date}
                    selection={[[start, end]]}
                    disabled={[[disabled]]}
                    renderDay={(day) => {
                        if (day.getDate() == 11 && day.getMonth() == date.getMonth()) {
                            return (
                                <IconLib
                                    icon="warning"
                                    color="var(--f-color-danger)"
                                />
                            )
                        } else if (day.getDate() == 7 && day.getMonth() == date.getMonth()) {
                            return (
                                <>
                                    <span>{day.getDate()}</span>
                                    <Badge
                                        variant="danger"
                                        anchor="top-left"
                                        width={7}
                                        height={7}
                                        style={{ marginLeft: 7, marginTop: 7 }}
                                    />
                                </>
                            )
                        } else {
                            return day.getDate()
                        }
                    }}
                />
            </DatePickerProvider>
        </View>
    )
}

// --

export const CustomWeekend = () => {
    const today = new Date()
    const month = today.getMonth()
    const year = today.getFullYear()
    const date = new Date(year, month, 1)
    const start = new Date(year, month, 16)
    const end = new Date(year, month, 20)
    const disabled = new Date(year, month, 13)

    return (
        <DatePickerProvider>
            <View width={300}>
                <DatePickerWeekdays width="100%" />
                <DatePickerMonth
                    width="100%"
                    height={275}
                    date={date}
                    selection={[[start, end]]}
                    disabled={[[disabled]]}
                    weekendDays={[0, 5]}
                />
            </View>
        </DatePickerProvider>
    )
}

// --

export const MonthsDisplay = () => {
    const today = new Date()
    const month = today.getMonth()
    const year = today.getFullYear()
    const date = new Date(year, month, 1)
    const selectedStart = new Date(year, month, 16)
    const selectedEnd = new Date(year, month + 3, 16)
    const disabled = new Date(year, month + 7, 14)

    return (
        <DatePickerProvider>
            <MonthPicker
                width={300}
                height={220}
                date={date}
                selection={[[selectedStart, selectedEnd]]}
                disabled={[[disabled]]}
            />
        </DatePickerProvider>
    )
}

// --

export const YearsDisplay = () => {
    const today = new Date()
    const month = today.getMonth()
    const year = today.getFullYear()
    const date = new Date(year, month, 1)
    const selectedStart = new Date(year - 1, month, 16)
    const selectedEnd = new Date(year + 1, month, 16)
    const disabled = new Date(year + 4, month, 14)

    return (
        <DatePickerProvider>
            <YearPicker
                width={300}
                height={220}
                date={date}
                selection={[[selectedStart, selectedEnd]]}
                disabled={[[disabled]]}
            />
        </DatePickerProvider>
    )
}

// --

/**
 * The DateCell inherits directly from Text, enabling regular Text props to be used
 */
export const DateCellVariants = () => (
    <View row>
        <DateCell weekend>19</DateCell>
        <DateCell pending>8</DateCell>
        <DateCell today>31</DateCell>
        <DateCell disabled>June</DateCell>
        <DateCell selected>2023</DateCell>
        <DateCell unavailable>2022</DateCell>
        <DateCell>
            13
            <Badge
                variant="accent"
                anchor="top-left"
                style={{ marginLeft: 5, marginTop: 5 }}
            />
        </DateCell>
    </View>
)

// --

export const MultipleMonths = () => {
    const date = new Date()
    const { today, tomorrow, disabled1, disabled2 } = useMemo(() => {
        const today = new Date()
        const tomorrow = new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000)
        const disabled1 = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000)
        const disabled2 = new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000)
        return {
            today,
            tomorrow,
            disabled1,
            disabled2,
        }
    }, [])
    const [selection, setSelection] = useState<any[]>([[today, tomorrow]])

    const handleSelection = (date: Date) => {
        if (selection.length == 0) {
            setSelection([[date, null]])
        } else {
            const selected = selection[0]
            if (!selected[0]) return setSelection([date, null])
            if (!!selected[0] && !!selected[1]) return setSelection([[date, null]])
            if (!!selected[0] && !selected[1])
                return setSelection(selected[0] > date ? [[date, selected[0]]] : [[selected[0], date]])
        }
    }

    return (
        <DatePickerProvider>
            <Stack
                direction="vertical"
                spacing={20}>
                <Card
                    p={10}
                    width="fit-content">
                    <DatePicker
                        defaultDate={date}
                        selection={selection}
                        onChange={handleSelection}
                        disabled={[[disabled1, disabled2]]}
                        height={350}
                        width={300}
                    />
                </Card>

                <Card
                    p={10}
                    width="fit-content">
                    <DatePicker
                        defaultDate={date}
                        selection={selection}
                        onChange={handleSelection}
                        width={600}
                        height={350}
                        disabled={[[disabled1, disabled2]]}
                        panels={2}
                    />
                </Card>

                <Card
                    p={10}
                    width="fit-content">
                    <DatePicker
                        defaultDate={date}
                        selection={selection}
                        onChange={handleSelection}
                        disabled={[[disabled1, disabled2]]}
                        width={900}
                        height={350}
                        panels={3}
                    />
                </Card>
            </Stack>
        </DatePickerProvider>
    )
}

// --

export const DateInputs = () => {
    const [text, setText] = useState<any>('')
    const [date, setDate] = useState<Date>(new Date())
    const [selection, setSelection] = useState<any[]>([])
    const dateModal = useVisibility(false)
    const timeModal = useVisibility(false)

    const getTimeFormat = (date: Date) => {
        const hours = date.getHours()
        const minutes = date.getMinutes()
        const seconds = date.getSeconds()
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    }

    const getDateFormat = (date) => {
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        return `${pad(year)}-${pad(month)}-${pad(day)}`
    }

    const handleSelection = (ndate: Date) => {
        setSelection([[ndate, ndate]])
        const d = new Date(date)
        d.setFullYear(ndate.getFullYear())
        d.setMonth(ndate.getMonth())
        d.setDate(ndate.getDate())
        setDate(new Date(d))
        dateModal.hide()
    }

    return (
        <DatePickerProvider>
            <Stack
                direction="horizontal"
                spacing={10}>
                <InputPopover
                    content={
                        <View p={20}>
                            <DatePicker
                                defaultDate={new Date()}
                                selection={selection}
                                onChange={handleSelection}
                                width="100%"
                                height={350}
                                monthProps={{ flex: 1 }}
                            />
                        </View>
                    }>
                    <InputControl>
                        <Input
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Type here - datetimelocal"
                            value={getDateFormat(date)}
                            type="date"
                        />
                        <InputSuffix>
                            <IconLib
                                icon="date"
                                style={{ pointerEvents: 'none' }}
                            />
                        </InputSuffix>
                    </InputControl>
                </InputPopover>

                <InputPopover
                    content={
                        <View p={20}>
                            <TimePicker
                                width="100%"
                                height={350}
                                date={date}
                                onChange={(date) => setDate(date)}
                            />
                        </View>
                    }>
                    <InputControl>
                        <Input
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Type here - datetimelocal"
                            value={getTimeFormat(date)}
                            type="time"
                        />
                        <InputSuffix>
                            <IconLib
                                icon="time"
                                style={{ pointerEvents: 'none' }}
                            />
                        </InputSuffix>
                    </InputControl>
                </InputPopover>
            </Stack>
        </DatePickerProvider>
    )
}

// --

export const ScrollingPicker = () => {
    const { goToToday } = useScrollingDatePicker()
    const ref = useRef(null)
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const { today, tomorrow, start, end } = useMemo(() => {
        const today = new Date()
        const tomorrow = new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000)
        const start = new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000)
        const end = new Date(today.getTime() + 6 * 24 * 60 * 60 * 1000)
        return {
            today,
            tomorrow,
            start,
            end,
        }
    }, [])
    const [selection, setSelection] = useState<any[]>([[start, end]])

    const handleSelection = (date: Date) => {
        if (selection.length == 0) {
            setSelection([[date, null]])
        } else {
            const selected = selection[0]
            if (!selected[0]) return setSelection([date, null])
            if (!!selected[0] && !!selected[1]) return setSelection([[date, null]])
            if (!!selected[0] && !selected[1])
                return setSelection(selected[0] > date ? [[date, selected[0]]] : [[selected[0], date]])
        }
    }

    const handleTodayClick = (e) => {
        goToToday(ref.current)
    }

    return (
        <View width={300}>
            <DatePickerProvider>
                <Button onClick={handleTodayClick}>Go to Today</Button>
                <ScrollingDatePicker
                    height={300}
                    ref={ref}
                    defaultDate={today}
                    selection={selection}
                    onChange={handleSelection}
                    monthTitle={(date: Date) => (
                        <Text
                            p="1rem"
                            as="span"
                            width="100%">
                            {monthNames[date.getMonth()]} / {date.getFullYear()}
                        </Text>
                    )}
                />
            </DatePickerProvider>
        </View>
    )
}

// --

export const Time = () => {
    const [date, setDate] = useState(new Date('2024-06-20 10:15:25'))

    return (
        <View
            row
            gap="1rem"
            justifyContent="flex-start">
            <View>
                <Heading
                    as="h3"
                    lineHeight={2}>
                    12 hours
                </Heading>
                <TimePicker
                    twelveHours
                    width={250}
                    height={250}
                    date={date}
                    onChange={setDate}
                />
            </View>
            <View>
                <Heading
                    as="h3"
                    lineHeight={2}>
                    24 hours
                </Heading>
                <TimePicker
                    showAmPm={false}
                    width={200}
                    height={250}
                    date={date}
                    onChange={setDate}
                />
            </View>
        </View>
    )
}
