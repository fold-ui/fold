import { Text, Video } from '@fold-ui/core'
import React from 'react'

export default {
    title: 'Core/Video',
    component: Video,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Video',
    subtitle: 'The Video compoment is used to incorporate a video from single or mutliple sources.',
    description:
        'The Video component is used to incorporate video content within a document, encompassing items like movie clips or other video streams.',
}

export const Default = () => (
    <Video
        loader
        muted
        controls
        width="100%"
        style={{ maxWidth: 500 }}
        height={250}
        poster="/video.jpg"
        srcs={[
            {
                src: 'https://ia800300.us.archive.org/17/items/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4',
                type: 'video/ogg',
            },
        ]}
    />
)

// --

export const FailedToLoadVideo = () => (
    <Video
        loader
        muted
        controls
        width="100%"
        style={{ maxWidth: 500 }}
        height={250}
        errorContent={<Text color="white">We could not locate the video!</Text>}
        poster=""
        srcs={[
            {
                src: 'nothing-here',
                type: 'video/ogg',
            },
        ]}
    />
)
