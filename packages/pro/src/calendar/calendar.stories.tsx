import {
    Button,
    Flexer,
    Form,
    Heading,
    Input,
    MenuProvider,
    Modal,
    Option,
    Options,
    Portal,
    Text,
    View,
    generateUEID,
    useDialog,
    useVisibility,
} from '@fold-ui/core'
import React, { useMemo, useState } from 'react'
import {
    CalendarDays,
    CalendarEventDetail,
    CalendarEventPreview,
    CalendarProvider,
    CalendarSchedule,
    CommonProvider,
    ContextPopup,
    EventPreview,
    RichInputOption,
    convert24toAmPm,
    getDateSelectTimeFormat,
    getShortDateFormat,
} from '@fold-ui/pro'
import * as data from '../../../../dummy-data'

export default {
    title: 'Pro/Calendar',
    component: <></>,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Calendar',
    subtitle: 'A robust & flexible Data Grid component engineered to handle diverse datasets with ease.',
    description:
        'The Data Grid component enables you to customize & extend virtually every part of it, enabling you to accommodate a wide variety of data types.',
    experimental: true,
}

export const EventDetailView = () => {
    const { toggle, show, hide, visible } = useVisibility(false)
    return (
        <CommonProvider
            onUserFilter={(val: any) => null}
            onLabelFilter={(val: any) => null}
            availableLabels={data.availableLabels}
            availableUsers={data.availableUsers}
            colors={data.colorPalette}>
            <Button onClick={toggle}>Show</Button>
            {visible && (
                <CalendarEventDetail
                    event={data.events[0]}
                    onCancel={hide}
                    onSave={(event) => hide()}
                    onDelete={(event) => hide()}
                />
            )}
        </CommonProvider>
    )
}

// --

const MonthView = ({ date, events }) => {
    return (
        <View
            width="100%"
            height="100%"
            column
            justifyContent="stretch"
            alignContent="stretch"
            alignItems="stretch">
            <View
                row
                position="relative"
                zIndex={2}
                width="100%"
                m="0 0 -1px 0"
                style={{ borderBottom: '1px solid var(--f-color-border)' }}>
                <Text
                    p="1rem"
                    fontWeight="bold"
                    textAlign="center">
                    {date.toLocaleString('default', { month: 'long' })}
                </Text>
            </View>
            <View
                position="relative"
                zIndex={1}
                flex={1}
                className="f-scrollbar"
                style={{ overflowY: 'auto' }}>
                <CalendarDays
                    date={date}
                    events={events}
                />
            </View>
        </View>
    )
}

// --

const ScheduleView = ({ days, custom, date, events }) => {
    return (
        <>
            <View
                row
                flex={0}
                p="0 0 0 var(--f-calendar-schedule-gutter-width)"
                width="100%">
                {days.map(({ date }, index) => {
                    return (
                        <Text
                            flex={1}
                            p="1rem"
                            fontWeight="bold"
                            textAlign="center"
                            key={index}>
                            {getShortDateFormat(date)}
                        </Text>
                    )
                })}
            </View>
            <View
                height="fit-content"
                p="0 4px 0 var(--f-calendar-schedule-gutter-width)"
                width="100%"
                position="relative"
                zIndex={1}>
                <CalendarDays
                    noClamp
                    date={date}
                    events={events.filter((e) => e.isDay)}
                    custom={custom}
                    height="fit-content"
                />
            </View>
            <View
                width="100%"
                flex={1}
                position="relative"
                zIndex={0}
                m="-1px 0 0 0"
                style={{ overflowY: 'scroll' }}
                className="f-scrollbar">
                <CalendarSchedule
                    days={days}
                    events={events.filter((e) => !e.isDay)}
                />
            </View>
        </>
    )
}

// --

export const EventPreviewPopup = () => {
    return (
        <EventPreview
            event={data.events[0]}
            onOpen={(event) => null}
            onDismiss={() => null}>
            <Text size="sm">Additional content slot</Text>
        </EventPreview>
    )
}

// --

export const CalendarViews = () => {
    const [option, setOption] = useState(2)
    const date = useMemo(() => data.date, [])
    const [days, setDays] = useState(data.days)
    const [daysDay, setDaysDay] = useState([data.days[0]])
    const [events, setEvents] = useState(data.events)
    const [custom, setCustom] = useState(data.custom)
    const [customDay, setCustomDay] = useState([[data.custom[0][0]]])
    const [options, setOptions] = useState<RichInputOption[]>([])
    const [event, setEvent] = useState<any>({})
    const [preview, setPreview] = useState<any>({})
    const [title, setTitle] = useState('')
    const { setDialog, closeDialog } = useDialog()

    const handleEventUpdate = (ev) => {
        setEvents(events.map((event) => (event.id == ev.id ? { ...event, ...ev } : event)))
    }

    const handleEventDelete = (ev) => {
        setDialog({
            title: 'Are you sure?',
            description: 'This action cannot be undone.',
            footer: (
                <View
                    row
                    width="100%"
                    justifyContent="space-between">
                    <Button onClick={closeDialog}>Cancel</Button>
                    <Button
                        onClick={() => {
                            setEvents(events.filter((event) => event.id != ev.id))
                            closeDialog()
                        }}
                        variant="danger">
                        Delete
                    </Button>
                </View>
            ),
        })
    }

    const handleEventOpen = (event, e) => {
        const { clientX, clientY } = e

        setPreview({
            x: clientX,
            y: clientY,
            event: events.find((e) => e.id == event.id),
        })
    }

    const getMenu = ({ data: { target, payload }, dismiss }) => {
        return (
            <ContextPopup
                item={{ ...payload }}
                onCancel={dismiss}
                onSave={(event) => {
                    dismiss()
                    handleEventUpdate({ ...payload, ...event })
                }}
                onView={() => {
                    dismiss()
                    setEvent(payload)
                }}
                onDelete={() => {
                    dismiss()
                    handleEventDelete(payload)
                }}
            />
        )
    }

    return (
        <>
            <Options
                //display="none"
                animated
                selected={option}
                onOptionChange={setOption}
                m="0 0 1rem 0">
                <Option>Day</Option>
                <Option>Week</Option>
                <Option>Month</Option>
            </Options>

            <View
                column
                width="100%"
                height={800}
                position="relative"
                justifyContent="stretch"
                alignContent="stretch"
                alignItems="stretch">
                <CommonProvider
                    onUserFilter={(val) => null}
                    onLabelFilter={(val) => null}
                    availableLabels={data.availableLabels}
                    availableUsers={data.availableUsers}
                    colors={data.colorPalette}>
                    {!!preview.event && (
                        <CalendarEventPreview
                            preview={preview}
                            onDismiss={() => setPreview({})}
                            onOpen={(event) => {
                                setEvent(event)
                                setPreview({})
                            }}
                        />
                    )}

                    {!!event.id && (
                        <CalendarEventDetail
                            event={event}
                            onCancel={() => {
                                setEvent({})
                            }}
                            onSave={(event) => {
                                handleEventUpdate(event)
                                setEvent({})
                            }}
                            onDelete={(event) => {
                                handleEventDelete(event)
                                setEvent({})
                            }}
                        />
                    )}

                    <MenuProvider menu={getMenu}>
                        <CalendarProvider
                            hideDateLabels={option == 0}
                            scheduleTimeFormat={(start, end) =>
                                getDateSelectTimeFormat(start) + ' - ' + getDateSelectTimeFormat(end)
                            }
                            gutterFormat={convert24toAmPm}
                            onEventOpen={handleEventOpen}
                            onEventUpdate={handleEventUpdate}
                            onEventAdd={({ done, event }) => {
                                return (
                                    <Modal
                                        portal={Portal}
                                        isVisible={true}
                                        onDismiss={() => {
                                            done()
                                            setTitle('')
                                        }}
                                        header={<Heading as="h3">Create New Event</Heading>}
                                        footer={
                                            <View
                                                row
                                                width="100%">
                                                <Button
                                                    onClick={() => {
                                                        done()
                                                        setTitle('')
                                                    }}>
                                                    Cancel
                                                </Button>
                                                <Flexer />
                                                <Button
                                                    onClick={() => {
                                                        setEvents([...events, { ...event, title, id: generateUEID() }])
                                                        setTitle('')
                                                        done()
                                                    }}
                                                    variant="accent"
                                                    outline>
                                                    Save
                                                </Button>
                                            </View>
                                        }>
                                        <Form
                                            column
                                            gap="1rem"
                                            onSubmit={() => {
                                                setEvents([...events, { ...event, title, id: generateUEID() }])
                                                setTitle('')
                                                done()
                                            }}
                                            width="100%">
                                            <Input
                                                autoFocus
                                                size="lg"
                                                placeholder="Enter event name"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </Form>
                                    </Modal>
                                )
                            }}>
                            {option == 0 && (
                                <ScheduleView
                                    days={daysDay}
                                    custom={customDay}
                                    date={date}
                                    events={events}
                                />
                            )}

                            {option == 1 && (
                                <ScheduleView
                                    days={days}
                                    custom={custom}
                                    date={date}
                                    events={events}
                                />
                            )}

                            {option == 2 && (
                                <MonthView
                                    date={date}
                                    events={events}
                                />
                            )}
                        </CalendarProvider>
                    </MenuProvider>
                </CommonProvider>
            </View>
        </>
    )
}
