import { Heading, IconLib, Link, ModalClose, Palette, Popover, Text, View } from '@fold-dev/core'
import React, { ReactNode, useMemo } from 'react'
import { CalendarTypes } from './calendar.types'
import { getDateFormat, getMediumDateFormat, getUserGroupName } from '../helpers'

export type EventPreviewProps = {
    event: CalendarTypes.Event
    children?: ReactNode
    onOpen: (event) => void
    onDismiss: () => void
}

export const EventPreview = (props: EventPreviewProps) => {
    const { event, onOpen, onDismiss, children } = props
    const { isDay, start, end, repeat, users = [] } = event
    const userLabel = useMemo(() => getUserGroupName(users), [users])
    const dateLabel = useMemo(() => {
        const dates = new Set()
        if (start && isDay) dates.add(getMediumDateFormat(start))
        if (start && !isDay) dates.add(getDateFormat(start))
        if (end && isDay) dates.add(getMediumDateFormat(end))
        if (end && !isDay) dates.add(getDateFormat(end))
        return Array.from(dates).join(' - ')
    }, [start, end, isDay])

    return (
        <View
            column
            position="relative"
            width="fit-content"
            style={{ maxWidth: 400, minWidth: 300 }}
            p="2rem"
            gap="0.75rem"
            alignItems="flex-start">
            <ModalClose onClick={onDismiss} />

            <View
                gap="0.5rem"
                row>
                <View
                    width="1rem"
                    height="1rem"
                    bg={event.color || 'var(--f-color-surface-stronger)'}
                    radius="var(--f-radius)"
                />
                <Heading
                    as="h4"
                    p="0 2rem 0 0"
                    fontWeight={600}>
                    {event.title}
                </Heading>
            </View>

            {!!event.description && <Text colorToken="text-weaker">{event.description}</Text>}

            <View
                row
                gap="0.5rem">
                {!!repeat && (
                    <IconLib
                        icon="repeat"
                        size="sm"
                    />
                )}
                <IconLib
                    icon="date"
                    size="sm"
                />
                <Text>{dateLabel}</Text>
            </View>

            {!!userLabel && (
                <View
                    row
                    gap="0.5rem">
                    <IconLib
                        icon="user"
                        size="sm"
                    />
                    <Text>{userLabel}</Text>
                </View>
            )}

            {children}

            <View
                row
                gap="0.5rem"
                m="1rem 0 0 0">
                <Link
                    onClick={() => onOpen(event)}
                    className="f-underline">
                    View Event
                </Link>
            </View>
        </View>
    )
}

export type CalendarEventPreviewProps = {
    preview: { event: CalendarTypes.Event; x: number; y: number }
    onOpen: (event) => void
    onDismiss: () => void
}

export const CalendarEventPreview = (props: CalendarEventPreviewProps) => {
    const {
        preview: { event, x, y },
        onOpen,
        onDismiss,
    } = props

    return (
        <Popover
            width="fit-content"
            fixPosition={{ top: y, left: x }}
            content={
                <EventPreview
                    event={event}
                    onOpen={onOpen}
                    onDismiss={onDismiss}
                />
            }
            isVisible={true}
            onDismiss={onDismiss}
        />
    )
}
