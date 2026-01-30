import React from 'react'
import { AspectRatio } from '@fold-ui/core'

export default {
    title: 'Core/AspectRatio',
    component: AspectRatio,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Aspect Ratio',
    subtitle:
        'Aspect Ratio is used to fix the dimensions of a container to a specified aspect ratio based on the width or height.',
    description:
        'The Aspect Ratio component is useful for constraining proportions of images, video or embedded media.',
}

export const WidthBased = () => {
    return (
        <AspectRatio
            width={200}
            ratio={3 / 4}
            bgToken="surface-strong">
            200px x 150px
        </AspectRatio>
    )
}

// --

export const HeightBased = () => {
    return (
        <AspectRatio
            height={200}
            ratio={3 / 4}
            bgToken="surface-strong">
            267px x 200px
        </AspectRatio>
    )
}
