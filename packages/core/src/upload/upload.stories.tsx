import { Button, Stack, Text, Upload, UploadArea, UploadCustom, View } from '@fold-dev/core'
import React from 'react'

export default {
    title: 'Core/Upload',
    component: Upload,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Upload',
    subtitle:
        'The Upload component is a drag & drop area where files can be dropped & then uploaded to an external server.',
    description:
        'File uploads are a ubiquitous feature in many types of applications and websites. The Upload component is useful for allowing users to either drag & drop their files, or directly clicking an element to start their upload.',
}

export const Usage = () => (
    <Upload
        title="Upload"
        description="Click or drop your files here to begin your upload."
        onDrop={(files) => console.log('Your files: ', files)}
    />
)

// --

export const States = () => (
    <Stack
        direction="vertical"
        spacing={10}>
        <Upload
            title="Default"
            description="Click or drop your files here to begin your upload."
            onDrop={(files) => console.log('Your files: ', files)}
        />
        <Upload
            disabled
            title="Disabled"
            description="Click or drop your files here to begin your upload."
            onDrop={(files) => console.log('Your files: ', files)}
        />
        <Upload
            loading
            title="Loading"
            description="Click or drop your files here to begin your upload."
            onDrop={(files) => console.log('Your files: ', files)}
        />
        <Upload
            loadingProgress={45}
            title="Loading progress"
            description="Click or drop your files here to begin your upload."
            onDrop={(files) => console.log('Your files: ', files)}
        />
        <Upload
            loading
            loadingProgress={45}
            title="Very busy..."
            description="Click or drop your files here to begin your upload."
            onDrop={(files) => console.log('Your files: ', files)}
        />
    </Stack>
)

// --

export const UploadTarget = () => (
    <UploadArea onDrop={(files) => console.log('Your files: ', files)}>
        {(over) => (
            <View
                row
                p={50}
                width="100%"
                height={500}
                bgToken="surface-strong"
                border={over ? '0.3rem dashed var(--f-color-accent)' : undefined}>
                <Text>Drag your files anywhere onto this area.</Text>
            </View>
        )}
    </UploadArea>
)

// --

export const CustomUpload = () => (
    <UploadCustom
        inputProps={{ accept: '.png,.jpg,.jpeg' }}
        onChange={(files) => console.log('Your files: ', files)}>
        {(onSelect) => <Button onClick={onSelect}>Upload Image</Button>}
    </UploadCustom>
)
