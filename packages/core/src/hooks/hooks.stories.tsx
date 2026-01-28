import {
    Button,
    Input,
    Stack,
    Text,
    View,
    dispatchPubsub,
    documentObject,
    useCacheValue,
    useCheck,
    useConnection,
    useDragging,
    useEvent,
    useFocus,
    useId,
    useInput,
    useObserver,
    usePubsub,
    useStorage,
    useTabVisibility,
    useTheme,
    useTimeout,
    useTimer,
    useVisibility,
    useWindowResize,
} from '@fold-dev/core'
import React, { useEffect, useRef, useState } from 'react'

export default {
    title: 'Core/Hooks',
    component: <></>,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Hooks',
    subtitle: 'Fold React Hooks provide various pieces of functionality that can make complex logic simple.',
    description: 'Below are React Hooks that are available to use with Fold.',
}

// --

/**
 * Toggle checked values on & off
 */
export const Check = () => {
    const { check, checked } = useCheck()

    return <Button onClick={check}>{checked ? 'on' : 'off'}</Button>
}

// --

/**
 * Listen for the internet connection state
 */
export const Connection = () => {
    const [connection, setConnection] = useState('online')

    useConnection((online: 'restored' | 'online' | 'offline') => {
        setConnection(online)
    })

    return <Text>{connection}</Text>
}

// --

/**
 * Track drag state
 */
export const Dragging = () => {
    const { startDragging, stopDragging, dragging } = useDragging()

    return (
        <View
            p={50}
            bgToken="surface-strong"
            onMouseDown={startDragging}
            onMouseUp={stopDragging}>
            <Text>{dragging ? 'dragging' : 'not dragging'}</Text>
        </View>
    )
}

// --

/**
 * Listen to window, document or DOM events
 */
export const Event = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 })

    useEvent('mousemove', (e) => setPosition({ x: e.clientX, y: e.clientY }))

    return (
        <Text>
            Mouse position: {position.x}px, {position.y}px
        </Text>
    )
}

// --

/**
 * Trap focus within a container, tabbing on the last element will move it to the first
 */
export const Focus = () => {
    const [text, setText] = useState('')
    const ref = useRef(null)
    const { trapFocus } = useFocus()

    return (
        <Stack
            direction="vertical"
            spacing={5}>
            <Button onClick={() => trapFocus(ref.current)}>Trap Focus</Button>
            <View
                ref={ref}
                column
                gap={5}
                width="100%">
                <Input
                    placeholder="Line 1"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <Input
                    placeholder="Line 2"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <Input
                    placeholder="Line 3"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <Input
                    placeholder="Line 4"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </View>
        </Stack>
    )
}

// --

/**
 * Shorthand hook for input elements
 */
export const InputField = () => {
    const { value, setValue, onChange } = useInput('')

    return (
        <Input
            placeholder="Input line"
            value={value}
            onChange={onChange}
        />
    )
}

// --

/**
 * Tracks mutations on a DOM element (experimental)
 */
export const Observer = () => {
    const mutationRecord: MutationRecord = useObserver(documentObject.documentElement)
    return <Text>Example coming soon</Text>
}

// --

/**
 * Publish & subscribe to topics application wide
 */
export const Pubsub = () => {
    const [event, setEvent] = useState('Click!')
    usePubsub('hooks', (message) => setEvent(message))

    return <Button onClick={(e) => dispatchPubsub('hooks', 'Hello World')}>{event}</Button>
}

// --

/**
 * Interact with LocalStorage
 * `getSafeStorage` returns an empty string if there is no value
 */
export const Storage = () => {
    const { getStorage, getSafeStorage, setStorage, deleteStorage } = useStorage()
    const { isCached, deleteCache, getSafeCache, setCache } = useCacheValue('foobar')

    return <Text>Example coming soon</Text>
}

// --

/**
 * Listen to tab visibility events (when a tab becomes visible or hidden)
 */
export const TabVisibility = () => {
    const [text, setText] = useState('')

    useTabVisibility((e) => {
        const date = new Date()
        const seconds = date.getSeconds()
        const minutes = date.getMinutes()
        const hour = date.getHours()

        setText(`Time is ${hour}:${minutes}:${seconds}`)
    })

    return <Text>{text || 'Change tabs & come back'}</Text>
}

// --

/**
 * Fold Theme hook - please see theme documentation for more details
 */
export const Theme = () => {
    const { systemTheme, getToken, getColorToken, setTheme, removeTheme, getSystemTheme, getStoredTheme } = useTheme()

    return <View>You are running {getSystemTheme()} mode.</View>
}

// --

/**
 * Shorthand wrapper around setTimeout
 */
export const Timeout = () => {
    const [text, setText] = useState('Waiting...')

    useTimeout(() => {
        setText('Waited 2000ms!')
    }, 2000)

    return <Text>{text}</Text>
}

// --

/**
 * Another Shorthand wrapper around setTimeout, this time with a clearing mechanism
 */
export const Timer = () => {
    const [text, setText] = useState('Click Here')
    const { setTimer, clearTimer } = useTimer()

    const handleClick = (e) => {
        clearTimer()
        setTimer(() => {
            setText('Waited 2000ms!')
        }, 2000)
    }

    return <Button onClick={handleClick}>{text}</Button>
}

// --

/**
 * Generate Unique Enough ID's
 */
export const Ueid = () => {
    const id = useId()
    return <Text>{id}</Text>
}

// --

/**
 * Toggle visibility states
 */
export const Visibility = () => {
    const { visible, delayedShow, show, hide, toggle } = useVisibility(false)

    return <Button onClick={(e) => (visible ? hide() : delayedShow(2000))}>{visible ? 'Visible' : 'Hidden'}</Button>
}

// --

/**
 * Listen to window dimensions
 */
export const WindowResize = () => {
    const { width, height, zoom } = useWindowResize()
    return (
        <Text>
            {width} {height} {zoom}
        </Text>
    )
}
