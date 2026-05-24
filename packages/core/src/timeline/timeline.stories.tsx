import { Avatar, IconLib, Text, Timeline, TimelineItem } from '@fold-ui/core'
import React from 'react'

export default {
    title: 'Core/Timeline',
    component: Timeline,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Timeline',
    subtitle: 'The Timeline component shows a vertically arranged list of events and items.',
    description:
        'The Timeline component is useful for displaying sets of data in a sequential order, making it suited for activity feeds, user interactions, and application updates.',
}

export const Usage = () => (
    <Timeline>
        <TimelineItem colorToken="text">
            <Text fontWeight="semibold">Checked in at the hotel.</Text>
            <Text
                m="0.25rem 0 0 0"
                size="sm"
                colorToken="text-weaker">
                6m ago
            </Text>
        </TimelineItem>
        <TimelineItem colorToken="text">
            <Text fontWeight="semibold">Departed JFK airport via Uber.</Text>
            <Text
                m="0.25rem 0 0 0"
                size="sm"
                colorToken="text-weaker">
                56m ago
            </Text>
        </TimelineItem>
        <TimelineItem>
            <Text fontWeight="semibold">Boarded a plane bound for New York.</Text>
            <Text fontWeight="semibold">Passed through security checkpoint.</Text>
            <Text fontWeight="semibold">Entered airport facility.</Text>
            <Text
                m="0.25rem 0 0 0"
                size="sm"
                colorToken="text-weaker">
                3h ago
            </Text>
        </TimelineItem>
        <TimelineItem>
            <Text fontWeight="semibold">Caught an Uber bound for the airport.</Text>
            <Text
                m="0.25rem 0 0 0"
                size="sm"
                colorToken="text-weaker">
                6h ago
            </Text>
        </TimelineItem>
    </Timeline>
)

// --

export const CustomMarkers = () => (
    <Timeline
        style={{
            '--f-timeline-item-marker-spacing': '1.5rem',
            '--f-timeline-item-marker-width': '2rem',
            '--f-timeline-item-marker-line-color': 'var(--f-color-accent)',
        }}>
        <TimelineItem
            colorToken="text"
            marker={
                <Avatar
                    size="xs"
                    src="/men/09.jpg"
                />
            }>
            <Text fontWeight="semibold">Checked in at the hotel.</Text>
            <Text
                m="0.25rem 0 0 0"
                size="sm"
                colorToken="text-weaker">
                6m ago
            </Text>
        </TimelineItem>
        <TimelineItem
            colorToken="text"
            marker={
                <Avatar
                    size="xs"
                    src="/men/09.jpg"
                />
            }>
            <Text fontWeight="semibold">Departed JFK airport via Uber.</Text>
            <Text
                m="0.25rem 0 0 0"
                size="sm"
                colorToken="text-weaker">
                56m ago
            </Text>
        </TimelineItem>
        <TimelineItem marker={<IconLib icon="sun" />}>
            <Text fontWeight="semibold">Boarded a plane bound for New York.</Text>
            <Text fontWeight="semibold">Passed through security checkpoint.</Text>
            <Text fontWeight="semibold">Entered airport facility.</Text>
            <Text
                m="0.25rem 0 0 0"
                size="sm"
                colorToken="text-weaker">
                3h ago
            </Text>
        </TimelineItem>
        <TimelineItem marker={<IconLib icon="moon" />}>
            <Text fontWeight="semibold">Caught an Uber bound for the airport.</Text>
            <Text
                m="0.25rem 0 0 0"
                size="sm"
                colorToken="text-weaker">
                6h ago
            </Text>
        </TimelineItem>
    </Timeline>
)
