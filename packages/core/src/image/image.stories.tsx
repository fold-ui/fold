import { Image, Progress, Text, View } from '@fold-ui/core'
import React from 'react'

export default {
    title: 'Core/Image',
    component: Image,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Image',
    subtitle: 'The Image compoment is used to incorporate a photo or illustration.',
    description:
        'Use the Image component when you need to showcase an independent image that plays a vital role in the content displayed on the page.',
}

export const Usage = () => (
    <Image
        objectFit="cover"
        src="/photos/01.jpg"
        width={250}
        height={250}
    />
)

// --

export const FailedToLoadImage = () => (
    <Image
        objectFit="cover"
        src="something-incorrect"
        width={250}
        height={250}
        errorContent={<Text>Something has gone wrong!</Text>}
    />
)

// --

export const CustomLoadingPlaceholder = () => {
    const Custom = () => (
        // load image using XMLHttpRequest first
        // to display the loading progress
        <View
            p={10}
            width="100%">
            <Progress value={30} />
        </View>
    )

    return (
        <Image
            placeholder
            placeholderComponent={Custom}
            width={100}
            height={100}
            loader
        />
    )
}
