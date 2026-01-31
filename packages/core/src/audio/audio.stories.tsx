import { Audio, AudioWaveform, Card } from '@fold-ui/core'
import React from 'react'

export default {
    title: 'Core/Audio',
    component: Audio,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Audio',
    subtitle: 'The Audio component is used to embed sound content in websites & applications.',
    description:
        'The Audio component may contain one or more audio sources, represented using the src prop & is a thin wrapper around the native audio element.',
}

export const Usage = () => {
    return (
        <Audio
            style={{ maxWidth: 400 }}
            width="100%"
            loader
            muted
            controls
            srcs={[
                {
                    src: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Bird_singing.ogg',
                    type: 'audio/ogg',
                },
            ]}
        />
    )
}

// --

/**
 * The Waveform Audio component enables a richer, more platform agnostic interface to the audio component.
 */
export const Waveform = () => {
    return (
        <Card
            style={{ maxWidth: 400 }}
            width="100%"
            p={20}
            column>
            <AudioWaveform
                defaultProgress={0.5}
                width="100%"
                height={30}
                samples={100}
                strokeWidth={2}
                src={{
                    src: '/song.ogg',
                    type: 'audio/ogg',
                }}
            />
        </Card>
    )
}

// --

export const Flatten = () => {
    return (
        <Card
            style={{ maxWidth: 500 }}
            width="100%"
            p={20}
            column>
            <AudioWaveform
                flatten
                defaultProgress={0.5}
                width="100%"
                height={30}
                samples={100}
                strokeWidth={2}
                src={{
                    src: '/song.ogg',
                    type: 'audio/ogg',
                }}
            />
        </Card>
    )
}

// --

export const CustomPinHeight = () => {
    return (
        <Card
            style={{ maxWidth: 500 }}
            width="100%"
            p={20}
            column>
            <AudioWaveform
                style={{ '--f-audio-waveform-pin-height': '5rem' }}
                width="100%"
                height={70}
                samples={100}
                strokeWidth={2}
                src={{
                    src: '/song.ogg',
                    type: 'audio/ogg',
                }}
            />
        </Card>
    )
}
