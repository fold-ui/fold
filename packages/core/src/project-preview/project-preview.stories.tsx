import { Button, ProjectPreview, View } from '@fold-ui/core'
import React, { useState } from 'react'

export default {
    title: 'Core/ProjectPreview',
    component: ProjectPreview,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Project Preview',
    subtitle: 'The ProjectPreview component reveals image context beside an interactive project item.',
    description:
        'It animates the current image into view while pre-positioning the next image for a smooth change between project items.',
}

export const Usage = () => {
    const [visible, setVisible] = useState(false)

    return (
        <View
            row
            position="relative"
            width="100%"
            height={360}
            radius="var(--f-radius-xl)"
            bg="var(--f-color-surface-strong)"
            alignItems="center"
            justifyContent="center"
            style={{ overflow: 'hidden' }}>
            <Button
                onPointerEnter={() => setVisible(true)}
                onPointerLeave={() => setVisible(false)}
                onFocus={() => setVisible(true)}
                onBlur={() => setVisible(false)}>
                Hover to preview the project
            </Button>
            <ProjectPreview
                src="/photos/05.jpg"
                nextSrc="/photos/06.jpg"
                visible={visible}
                x="50%"
                y="50%"
                style={{ position: 'absolute' }}
            />
        </View>
    )
}
