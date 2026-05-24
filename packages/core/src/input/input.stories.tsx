import {
    ColorPicker,
    TagInput,
    TagInputField,
    focusInputAtEnd,
    getKey,
    Heading,
    IconLib,
    Input,
    InputControl,
    InputNumberControl,
    InputPrefix,
    InputSuffix,
    Label,
    Li,
    List,
    Pill,
    PinInput,
    Popover,
    Stack,
    Text,
    Textarea,
    useVisibility,
    View,
    InputPopover,
} from '@fold-ui/core'
import React, { useRef, useState } from 'react'

export default {
    title: 'Core/Input',
    component: Input,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Input',
    subtitle:
        'The Input component is an element designed for receiving text input from the user, and is an abstraction of the native HTML <input> element.',
    description:
        'Input components are useful for generating interactive controls within web-based forms, enabling users to provide data. The Input component stands as one of the most pivotal elements, serving as the foundation for virtually all user inputs.',
}

export const Usage = () => {
    const [text, setText] = useState('')

    return (
        <Input
            value={text}
            placeholder="Please enter your name"
            onChange={(e) => setText(e.target.value)}
        />
    )
}

// --

export const SelectOnFocus = () => {
    const [text, setText] = useState('John Smith')

    return (
        <Input
            selectOnFocus
            value={text}
            placeholder="Please enter your name"
            onChange={(e) => setText(e.target.value)}
        />
    )
}

// --

export const Sizes = () => {
    const [text, setText] = useState('')

    return (
        <Stack
            direction="vertical"
            spacing={10}>
            <Input
                size="xs"
                value={text}
                placeholder="Please enter your name"
                onChange={(e) => setText(e.target.value)}
            />
            <Input
                size="sm"
                value={text}
                placeholder="Please enter your name"
                onChange={(e) => setText(e.target.value)}
            />
            <Input
                size="md"
                value={text}
                placeholder="Please enter your name"
                onChange={(e) => setText(e.target.value)}
            />
            <Input
                size="lg"
                value={text}
                placeholder="Please enter your name"
                onChange={(e) => setText(e.target.value)}
            />
            <Input
                size="xl"
                value={text}
                placeholder="Please enter your name"
                onChange={(e) => setText(e.target.value)}
            />
        </Stack>
    )
}

// --

export const States = () => {
    const [text, setText] = useState('')
    const [date, setDate] = useState(new Date().toDateString())

    return (
        <Stack
            direction="vertical"
            spacing={10}>
            <Input
                readOnly
                value={text}
                placeholder="Please enter your name"
                onChange={(e) => setText(e.target.value)}
            />
            <Input
                disabled
                value={text}
                placeholder="Please enter your name"
                onChange={(e) => setText(e.target.value)}
            />
            <Input
                placeholder="Please enter a date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="datetime-local"
                showIndicator
            />
        </Stack>
    )
}

// --

export const Types = () => {
    const [text, setText] = useState('')
    const [date, setDate] = useState(new Date().toDateString())
    const [number, setNumber] = useState('')

    return (
        <Stack
            direction="vertical"
            spacing={15}>
            <Label>Type: number</Label>
            <Input
                placeholder="Please enter a number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                type="number"
            />
            <Label>Type: text</Label>
            <Input
                placeholder="Please enter text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="text"
            />
            <Label>Type: email</Label>
            <Input
                placeholder="Please enter an email"
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="email"
            />
            <Label>Type: search</Label>
            <Input
                placeholder="Please enter a search term"
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="search"
            />
            <Label>Type: tel</Label>
            <Input
                readOnly
                placeholder="Please enter a telephone number"
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="tel"
            />
            <Label>Type: url</Label>
            <Input
                placeholder="Please enter a URL"
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="url"
            />
            <Label>Type: password</Label>
            <Input
                placeholder="Please enter a password"
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="password"
            />
            <Label>Type: week</Label>
            <Input
                placeholder="Please enter a week"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="week"
            />
            <Label>Type: time</Label>
            <Input
                placeholder="Please enter a time"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="time"
            />
            <Label>Type: month</Label>
            <Input
                placeholder="Please enter a month"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="month"
            />
            <Label>Type: date</Label>
            <Input
                placeholder="Please enter a date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="date"
            />
            <Label>Type: datetime-local</Label>
            <Input
                placeholder="Please enter a date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="datetime-local"
            />
            <Label>Type: color</Label>
            <Input
                placeholder="Please enter a date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="color"
            />
        </Stack>
    )
}

// --

export const Control = () => {
    const [text, setText] = useState('')
    const { show, delayedShow, hide, visible } = useVisibility(false)
    const [color, setColor] = useState('#000000')

    return (
        <View
            column
            gap={20}
            alignItems="flex-start">
            <Stack
                direction="horizontal"
                spacing={10}
                width="100%">
                <InputControl onFocus={(e) => console.log('Focused')}>
                    <InputPrefix>
                        <IconLib icon="circle" />
                    </InputPrefix>
                    <Input
                        placeholder="With prefix & suffix..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <InputSuffix>
                        <IconLib
                            style={{ pointerEvents: 'none' }}
                            icon="circle"
                        />
                    </InputSuffix>
                </InputControl>

                <InputControl
                    onFocus={(e) => console.log('Focused')}
                    disabled>
                    <InputPrefix>
                        <IconLib icon="user" />
                    </InputPrefix>
                    <Input
                        placeholder="Disabled & only with prefix..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </InputControl>

                <InputControl onFocus={(e) => console.log('Focused')}>
                    <Input
                        placeholder="Only with suffix..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <InputSuffix>
                        <IconLib icon="clipboard" />
                    </InputSuffix>
                </InputControl>
            </Stack>

            <InputControl>
                <InputPrefix>
                    <Popover
                        focusTrap
                        zIndex={100}
                        width={250}
                        anchor="bottom-left"
                        isVisible={visible}
                        onDismiss={hide}
                        content={
                            <ColorPicker
                                p={10}
                                width={250}
                                onChange={setColor}
                                color={color}
                            />
                        }>
                        <View
                            radius={50}
                            width={15}
                            height={15}
                            bg={color}
                            tabIndex={0}
                            className="f-buttonize"
                            onClick={show}
                        />
                    </Popover>
                </InputPrefix>
                <Input
                    readOnly
                    placeholder="Enter your color"
                    value={color}
                    onChange={(e) => setText(e.target.value)}
                />
            </InputControl>

            <InputControl>
                <InputPrefix>
                    <IconLib icon="circle" />
                </InputPrefix>
                <Textarea
                    autoAdjust
                    value={text}
                    maxHeight={300}
                    className="f-scrollbar"
                    placeholder="Write message..."
                    onChange={(e) => setText(e.target.value)}
                />
            </InputControl>
        </View>
    )
}

// --

export const Number = () => {
    const [text, setText] = useState<any>('23')
    const ref = useRef(null)

    const handleIncrease = () => {
        setText(+text + 1)
        focusInputAtEnd(ref.current)
    }

    const handleDecrease = () => {
        setText(+text - 1)
        focusInputAtEnd(ref.current)
    }

    return (
        <View
            column
            gap={20}
            alignItems="flex-start">
            <InputControl onFocus={(e) => console.log(e.target)}>
                <InputPrefix>
                    <InputNumberControl
                        size="md"
                        onDecrease={handleDecrease}
                        onIncrease={handleIncrease}
                        disableDecrease={false}
                        disableIncrease={true}
                    />
                </InputPrefix>
                <Input
                    placeholder="Type here - text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    size="md"
                    type="number"
                    ref={ref}
                />
                <InputSuffix>
                    <InputNumberControl
                        size="md"
                        onDecrease={handleDecrease}
                        onIncrease={handleIncrease}
                        disableDecrease={true}
                        disableIncrease={false}
                    />
                </InputSuffix>
            </InputControl>

            <Text>Standalone number spinners:</Text>

            <Stack spacing={10}>
                <InputNumberControl
                    size="xs"
                    onDecrease={handleDecrease}
                    onIncrease={handleIncrease}
                    disableDecrease={false}
                    disableIncrease={true}
                />
                <InputNumberControl
                    size="sm"
                    onDecrease={handleDecrease}
                    onIncrease={handleIncrease}
                    disableDecrease={false}
                    disableIncrease={true}
                />
                <InputNumberControl
                    size="md"
                    onDecrease={handleDecrease}
                    onIncrease={handleIncrease}
                    disableDecrease={false}
                    disableIncrease={true}
                />
                <InputNumberControl
                    size="lg"
                    onDecrease={handleDecrease}
                    onIncrease={handleIncrease}
                    disableDecrease={false}
                    disableIncrease={true}
                />
                <InputNumberControl
                    size="xl"
                    onDecrease={handleDecrease}
                    onIncrease={handleIncrease}
                    disableDecrease={false}
                    disableIncrease={true}
                />
            </Stack>
        </View>
    )
}

// --

export const Pin = () => (
    <PinInput
        width={300}
        size="xl"
        digits={5}
        defaultValue="23"
        onChange={(sequence) => console.log(sequence)}
    />
)

// --

export const WithPopover = () => {
    const [text, setText] = useState<any>('')

    return (
        <InputPopover
            id=""
            content={
                <View
                    p={20}
                    column
                    alignItems="flex-start"
                    gap={10}>
                    <Heading as="h4">Please make sure your password:</Heading>
                    <List as="ul">
                        <Li>Is more than 8 characters long</Li>
                        <Li>Does not container easily identifiable words</Li>
                        <Li>Contains alpha-numeric characters</Li>
                        <Li>Contains special characters</Li>
                    </List>
                </View>
            }>
            <Input
                autoComplete="off"
                placeholder="Enter your password"
                value={text}
                type="text"
                style={{ '-webkit-text-security': 'disc' }}
                onChange={(e) => setText(e.target.value)}
            />
        </InputPopover>
    )
}

// --

export const Tag = () => {
    const [selected, setSelected] = useState<any>(['React', 'Svelte', 'Vue'])
    const [text, setText] = useState<any>('')

    const handleKeyDown = (e) => {
        const { isEnter } = getKey(e)
        if (isEnter) {
            e.preventDefault()
            e.stopPropagation()
            setSelected([...selected, text])
            setText('')
        }
    }

    return (
        <TagInput
            render={() => {
                return selected.map((name, index) => (
                    <Pill
                        key={index}
                        outline>
                        {name}
                    </Pill>
                ))
            }}>
            <TagInputField
                value={text}
                placeholder="Type..."
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </TagInput>
    )
}
