import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import { View, dispatchPubsub, usePubsub } from '../'
import { classNames, generateUEID, getActionClass } from '../helpers'
import { IconLib } from '../icon'
import { Text } from '../text/text'
import { CommonProps, CoreViewProps, Variant } from '../types'

const DEFAULT_TOAST_ANCHOR: ToastAnchor = 'bottom-right'

const createEmptyMessages = (): Record<ToastAnchor, ToastMessage[]> => ({
    'top-left': [],
    'top-right': [],
    'top-center': [],
    'bottom-left': [],
    'bottom-right': [],
    'bottom-center': [],
})

const getToastStackStyle = (index: number, total: number) => {
    const visibleStackIndex = Math.min(index, 2)

    return {
        '--f-toast-stack-opacity': `${Math.max(0.72, 1 - visibleStackIndex * 0.12)}`,
        '--f-toast-stack-scale': `${1 - visibleStackIndex * 0.035}`,
        '--f-toast-stack-z-index': `${total - index}`,
    } as CSSProperties
}

const ToastProgress = (props: any) => {
    const timer = 100
    const delay = Math.max(props.delay - timer, 0)

    return (
        <div
            className="f-toast-progress"
            style={{
                animationDelay: `${timer}ms`,
                animationDuration: `${delay}ms`,
                animationPlayState: props.paused ? 'paused' : 'running',
            }}
        />
    )
}

export const useToast = () => {
    const showToast = (payload: ToastMessage) => {
        const ueid = generateUEID()
        dispatchPubsub('toast', { ...payload, ueid })
    }

    return { showToast }
}

export type ToastAnchor = 'bottom-left' | 'bottom-right' | 'bottom-center' | 'top-left' | 'top-right' | 'top-center'

export type ToastMessage = {
    message?: string
    prefix?: any
    suffix?: any
    variant?: Variant
    showDismiss?: boolean
    showProgress?: boolean
    anchor?: ToastAnchor
    delay?: number
    toastComponent?: any
    ueid?: number | string
    containerProps?: CoreViewProps
}

export type ToastProps = {
    paused?: boolean
    onDismiss?: any
} & ToastMessage

export const Toast = (props: ToastProps) => {
    const {
        message,
        prefix,
        suffix,
        variant = 'default',
        showDismiss = true,
        showProgress = false,
        anchor = DEFAULT_TOAST_ANCHOR,
        delay = 3000,
        toastComponent,
        ueid,
        paused,
        onDismiss,
        containerProps,
    } = props
    const className = classNames(
        {
            'f-toast': true,
            'f-row': true,
        },
        [getActionClass(variant), getActionClass(anchor)]
    )

    const remainingRef = useRef(delay)
    const startRef = useRef(Date.now())

    useEffect(() => {
        if (paused) return
        startRef.current = Date.now()
        const id = setTimeout(() => {
            if (onDismiss) onDismiss()
        }, remainingRef.current)
        return () => {
            remainingRef.current -= Date.now() - startRef.current
            clearTimeout(id)
        }
    }, [paused])

    return (
        <View
            {...containerProps}
            className={className}>
            {toastComponent ? toastComponent({ onDismiss }) : null}
            {!toastComponent && (
                <>
                    {prefix && <div className="f-toast__prefix f-row">{prefix}</div>}
                    <div className="f-toast__content">
                        <Text
                            size="sm"
                            className="f-toast__message">
                            {message}
                        </Text>

                        {showProgress && (
                            <ToastProgress
                                delay={delay}
                                paused={paused}
                            />
                        )}
                    </div>

                    {suffix && <div className="f-toast__suffix f-row">{suffix({ onDismiss })}</div>}

                    {showDismiss && (
                        <button
                            className="f-toast__close f-buttonize f-row"
                            tabIndex={0}
                            onClick={onDismiss}>
                            <IconLib icon="x" />
                        </button>
                    )}
                </>
            )}
        </View>
    )
}

export type ToastContainerProps = {} & CommonProps

export const ToastContainer = (props: ToastContainerProps) => {
    const [messages, setMessages] = useState<Record<ToastAnchor, ToastMessage[]>>(createEmptyMessages)
    const [hoveredAnchor, setHoveredAnchor] = useState<ToastAnchor | null>(null)

    const handleDelete = (message: ToastMessage) => {
        const anchor = message.anchor || DEFAULT_TOAST_ANCHOR

        setMessages((current) => ({
            ...current,
            [anchor]: current[anchor].filter((m) => m.ueid != message.ueid),
        }))
    }

    const handleToastMessage = (message: ToastMessage) => {
        const anchor = message.anchor || DEFAULT_TOAST_ANCHOR

        setMessages((current) => ({
            ...current,
            [anchor]: [...current[anchor], { ...message, anchor }],
        }))
    }

    usePubsub('toast', handleToastMessage)

    return (
        <>
            {(Object.keys(messages) as ToastAnchor[]).map((anchor, index1: number) => {
                const anchorMessages = [...messages[anchor]].reverse()
                const total = anchorMessages.length

                return (
                    <div
                        className={`f-toast-container is-${anchor} f-col`}
                        key={index1}
                        onMouseEnter={() => setHoveredAnchor(anchor)}
                        onMouseLeave={() => setHoveredAnchor(null)}>
                        {anchorMessages.map((message: ToastMessage, index2: number) => (
                            <Toast
                                {...message}
                                key={message.ueid}
                                anchor={anchor}
                                paused={hoveredAnchor === anchor}
                                containerProps={{
                                    ...message.containerProps,
                                    style: {
                                        ...message.containerProps?.style,
                                        ...getToastStackStyle(index2, total),
                                    },
                                }}
                                onDismiss={() => handleDelete(message)}
                            />
                        ))}
                    </div>
                )
            })}
        </>
    )
}
