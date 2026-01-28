import { Button, Pill, Splitter, SplitterContent, Text } from '@fold-dev/core'
import React from 'react'

export default {
    title: 'Core/Splitter',
    component: Splitter,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Splitter',
    subtitle:
        'The Splitter component generates pane-based layouts that can be adjusted, enlarged, and minimized as needed.',
    description:
        'Splitter component can be useful for empowering users where there is a need to manage the dimensions of multiple content panes within a layout.',
}

export const Usage = () => (
    <Splitter
        snap
        width="100%"
        height={300}
        start={0.5}
        direction="horizontal">
        <SplitterContent
            style={{
                backgroundSize: '700px auto',
                background: 'url(/photos/01.jpg) no-repeat center left',
            }}
        />
        <SplitterContent
            style={{
                backgroundSize: '700px auto',
                background: 'url(/photos/02.jpg) no-repeat center right',
            }}
        />
    </Splitter>
)

// --

/**
 * The Splitter component can also be used to create nested layouts, which are useful in applications where space is limited.
 */
export const Nested = () => (
    <Splitter
        width="100%"
        height={300}
        start={0.25}
        direction="horizontal">
        <SplitterContent
            row
            bgToken="surface-strongest">
            <Text>Left</Text>
        </SplitterContent>
        <SplitterContent row>
            <Splitter
                width="100%"
                height={300}
                start={0.75}
                handle={<Pill>Drag</Pill>}
                direction="vertical">
                <SplitterContent
                    row
                    bgToken="surface-stronger">
                    <Text>Top</Text>
                </SplitterContent>
                <SplitterContent
                    row
                    bgToken="surface-strong">
                    <Text>Bottom</Text>
                </SplitterContent>
            </Splitter>
        </SplitterContent>
    </Splitter>
)
