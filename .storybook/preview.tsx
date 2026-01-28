import React from 'react';
import { Preview } from '@storybook/react';
import { FoldProvider, DarkModeToggle, Icon } from '../packages/core'
import '../packages/core/dist/styles.css'
import '../packages/pro/dist/styles.css'

export const decorators = [
    (Story) => (
        <FoldProvider>
            <div
                id="mockup-dark-mode-container"
                style={{
                    borderRadius: 20,
                    background: 'var(--f-color-surface)',
                    padding: 50,
                    margin: 50,
                    width: 'calc(100% - 100px)',
                }}>
                <div className="f-row f-justify-start" id="mockup-dark-mode-toggle" style={{ paddingBottom: 20 }}>
                    <DarkModeToggle
                        size="xl"
                        darkMode={<Icon icon="dark-mode" />}
                        lightMode={<Icon icon="light-mode" />}
                    />
                </div>
                <Story />
            </div>
        </FoldProvider>
    ),
]

const preview: Preview = {
    decorators,
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        backgrounds: {
            default: 'light',
            values: [
                {
                    name: 'default',
                    value: 'var(--f-color-background)',
                },
                {
                    name: 'highlight',
                    value: '#f0f3f5',
                },
                {
                    name: 'light',
                    value: 'var(--f-color-background)',
                },
            ],
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
}

export default preview
