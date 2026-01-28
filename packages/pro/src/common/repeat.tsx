import {
    Button,
    ButtonGroup,
    CoreViewProps,
    DatePicker,
    DatePickerProvider,
    Flexer,
    Footer,
    Heading,
    IconLib,
    Input,
    InputControl,
    InputNumberControl,
    InputPopover,
    InputSuffix,
    Option,
    Options,
    Select,
    View,
    focusInputAtEnd,
    useCheck,
} from '@fold-dev/core'
import { CalendarTypes } from 'calendar'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { addNumberSuffix, getMediumDateFormat } from '../helpers'

export const Number = ({ disabled = false, number, onNumberChange, useSuffix = false, max = 31 }) => {
    const ref = useRef(null)
    const inputValue = useMemo(() => (useSuffix ? addNumberSuffix(number) : String(number)), [number])

    const handleIncrease = () => {
        onNumberChange(+number + 1)
        focusInputAtEnd(ref.current)
    }

    const handleDecrease = () => {
        onNumberChange(+number - 1)
        focusInputAtEnd(ref.current)
    }

    useEffect(() => {
        if (number > max) onNumberChange(max)
    }, [max])

    return (
        <InputControl>
            <Input
                width={75}
                disabled={disabled}
                placeholder="Type here - text"
                value={inputValue}
                onChange={(e) => onNumberChange(e.target.value)}
                size="md"
                type="text"
                readOnly
                ref={ref}
            />
            <InputSuffix>
                <InputNumberControl
                    size="md"
                    onDecrease={handleDecrease}
                    onIncrease={handleIncrease}
                    disableDecrease={+number == 1 || disabled}
                    disableIncrease={false || disabled || number == max}
                />
            </InputSuffix>
        </InputControl>
    )
}

export const defaultWeekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export type RepeatProps = {
    repeat: CalendarTypes.Repeat
    weekdays?: string[]
    onChange: (value: CalendarTypes.Repeat) => void
    onSave: () => void
    onClear: () => void
    onDismiss: () => void
} & CoreViewProps

export const Repeat = (props: RepeatProps) => {
    const { repeat = {} as any, weekdays = defaultWeekdays, onChange, onSave, onClear, onDismiss, ...rest } = props
    const { interval = 1, weekday = [], frequency = 'day', from = new Date(), to, repetitions } = repeat
    const [selected, setSelected] = useState<any>(['forever'])
    const selectWeekday = useMemo(() => frequency == 'weekday', [frequency])
    const [intervalMax, setIntervalMax] = useState(31)
    const [repetitionMax, setRepetitionMax] = useState(10)
    const frequencies = useMemo(
        () => [
            { key: 'day', label: 'Day' },
            { key: 'week', label: 'Week' },
            { key: 'weekday', label: 'Weekday' },
            { key: 'month', label: 'Month' },
            { key: 'monthday', label: 'Day of the month' },
            { key: 'monthweek', label: 'Week of the month' },
            { key: 'year', label: 'Year' },
        ],
        []
    )
    const fromDate = useMemo(() => {
        return from.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        })
    }, [from])

    const handleCustomDayClick = (day) => {
        if (weekday.includes(day)) {
            onChange({ ...repeat, weekday: weekday.filter((d) => d != day) })
        } else {
            onChange({ ...repeat, weekday: [...weekday, day] })
        }
    }

    const handleSelect = (frequency, dismiss) => {
        onChange({ ...repeat, frequency: frequency.key })
        dismiss()
    }

    const handleRepetitionChange = (repetitions) => {
        onChange({ ...repeat, repetitions, to: undefined })
    }

    const handleNumberChange = (interval) => {
        onChange({ ...repeat, interval })
    }

    const handleDateChange = (to) => {
        onChange({ ...repeat, to, repetitions: undefined })
    }

    const handleRepetitionSelect = (option, dismiss) => {
        setSelected([option.key])
        dismiss()
        if (option.key == 'forever') onChange({ ...repeat, to: undefined, repetitions: undefined })
    }

    useEffect(() => {
        switch (frequency) {
            case 'day':
                setIntervalMax(6)
                break
            case 'week':
                setIntervalMax(51)
                break
            case 'month':
                setIntervalMax(11)
                break
            case 'monthweek':
                setIntervalMax(4)
                break
            case 'monthday':
                const now = new Date()
                const year = now.getFullYear()
                const month = now.getMonth() + 1
                setIntervalMax(new Date(year, month, 0).getDate())
                break
        }
    }, [frequency])

    return (
        <View
            width="fit-content"
            radius="var(--f-radius)"
            border="1px solid var(--f-color-border)"
            {...rest}>
            <View
                p="1rem"
                column
                gap="1rem"
                width="fit-content"
                alignItems="flex-start">
                <Heading
                    colorToken="accent"
                    as="h6">
                    Repeats from {fromDate}, every:
                </Heading>
                <View
                    row
                    gap={10}>
                    <View width={100}>
                        <Number
                            useSuffix
                            disabled={selectWeekday}
                            number={String(interval)}
                            onNumberChange={handleNumberChange}
                            max={intervalMax}
                        />
                    </View>
                    <View width={300}>
                        <Select
                            width="100%"
                            placeholder="Select frequency"
                            selected={[frequency]}
                            options={frequencies}
                            onSelect={handleSelect}
                            suffix={<IconLib icon="chevron-down" />}
                        />
                    </View>
                </View>

                {selectWeekday && (
                    <>
                        <Heading
                            colorToken="accent"
                            as="h6">
                            Every week on these days:
                        </Heading>
                        <ButtonGroup width="100%">
                            {weekdays.map((day, index) => (
                                <Button
                                    key={index}
                                    active={weekday.includes(index)}
                                    onClick={() => handleCustomDayClick(index)}>
                                    {day}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </>
                )}

                <Heading
                    colorToken="accent"
                    as="h6">
                    Repeat duration:
                </Heading>

                <View
                    row
                    gap="0.5rem"
                    width="100%"
                    justifyContent="flex-start">
                    <View width={175}>
                        <Select
                            width={175}
                            placeholder="Repeat"
                            selected={selected}
                            onSelect={handleRepetitionSelect}
                            options={[
                                { key: 'forever', label: 'Forever' },
                                { key: 'until', label: 'Until' },
                                { key: 'times', label: 'Number of times' },
                            ]}
                            suffix={<IconLib icon="chevron-down" />}
                        />
                    </View>

                    <View flex={1}>
                        {selected[0] == 'times' && (
                            <View width={100}>
                                <Number
                                    max={repetitionMax}
                                    number={String(repetitions || 1)}
                                    onNumberChange={handleRepetitionChange}
                                />
                            </View>
                        )}

                        {selected[0] == 'until' && (
                            <View width="100%">
                                <DatePickerProvider>
                                    <InputPopover
                                        popoverProps={{ width: 'fit-content' }}
                                        content={
                                            <View p={5}>
                                                <DatePicker
                                                    defaultDate={to || new Date()}
                                                    selection={[[to || new Date(), to || new Date()]]}
                                                    onChange={handleDateChange}
                                                    width={300}
                                                    height={350}
                                                    monthProps={{ flex: 1 }}
                                                />
                                            </View>
                                        }>
                                        <InputControl>
                                            <Input
                                                readOnly
                                                placeholder=""
                                                value={getMediumDateFormat(to)}
                                            />
                                            <InputSuffix>
                                                <IconLib
                                                    icon="date"
                                                    style={{ pointerEvents: 'none' }}
                                                />
                                            </InputSuffix>
                                        </InputControl>
                                    </InputPopover>
                                </DatePickerProvider>
                            </View>
                        )}
                    </View>
                </View>
            </View>
            <Footer
                p="1rem"
                gap="0.5rem">
                <Button onClick={onDismiss}>Cancel</Button>
                <Flexer />
                <Button
                    outline
                    variant="danger"
                    onClick={onClear}>
                    Don't repeat
                </Button>
                <Button
                    onClick={onSave}
                    variant="accent">
                    Save
                </Button>
            </Footer>
        </View>
    )
}
