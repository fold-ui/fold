import React, { useState } from 'react'
import { Cropper, Range, View } from '@fold-ui/core'

export default {
    title: 'Core/Cropper',
    component: Cropper,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Cropper',
    subtitle: 'The Cropper component enables users to manipulate image files by cropping, rotating, and zooming.',
    description:
        'Image cropper components have become a common feature in modern web and mobile applications, enabling users to upload and fine-tune images. They are particularly useful for profile images & social media websites.',
}

export const Usage = () => (
    <View
        width="100%"
        style={{ maxWidth: 500 }}
        height={400}>
        <Cropper
            src="/photos/01.jpg"
            onSave={(png) => console.log('Saved!')}
        />
    </View>
)

// --

export const CustomToolbar = () => {
    const [value, setValue] = useState(1)

    return (
        <View
            width="100%"
            style={{ maxWidth: 500 }}
            height={400}>
            <Cropper
                defaultZoom={1}
                src="/photos/01.jpg"
                onSave={(pngDataUrl) => console.log('Here is the dataUrl!')}
                customToolbar={({ rotate, zoom, save }) => (
                    <View width="100%">
                        <Range
                            step={1}
                            min={0}
                            max={10}
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value)
                                zoom(e.target.value)
                            }}
                        />
                    </View>
                )}
            />
        </View>
    )
}
