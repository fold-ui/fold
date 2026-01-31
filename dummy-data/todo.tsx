import { IconLib } from '@fold-ui/core'
import * as Token from '@fold-ui/design/tokens'
import React from 'react'
import { TodoTypes } from '@fold-ui/pro'
import { availableLabels, availableUsers } from './common'

export const sections: TodoTypes.Section[] = [
    {
        id: 'section1',
        name: 'Doing',
        description: '',
        collapsible: true,
        tasks: [
            {
                id: 'section1-1',
                title: 'Research target audience',
                start: new Date('10 April 2024'),
                labels: [
                    availableLabels[0],
                ],
                users: [
                    availableUsers[0],
                    availableUsers[1],
                    availableUsers[2],
                ],
            },
            {
                id: 'section1-2',
                title: 'Create social media content calendar',
                locked: true,
                collapsed: false,
                start: new Date('23 July 2024'),
                labels: [
                    availableLabels[1],
                ],
                badges: [
                    { icon: 'lock-closed' }
                ],
                tasks: [
                    {
                        id: 'section1-3',
                        title: 'Write promotional copy',
                        complete: false,
                        labels: [
                            availableLabels[1],
                        ],
                    },
                    {
                        id: 'section1-4',
                        title: 'Schedule social media posts',
                        complete: false,
                        users: [
                            availableUsers[3],
                            availableUsers[4],
                        ],
                    },
                    {
                        id: 'section1-5',
                        title: 'Reach out to influencers for collaborations',
                        complete: false,
                    },
                ],
            },
            {
                id: 'section1-6',
                title: 'Set up email marketing campaign',
                color: Token.ColorNeonpink400,
                tasks: [
                    {
                        id: 'section1-7',
                        title: 'Update website with campaign information',
                        tasks: [
                            {
                                id: 'section1-8',
                                title: 'Monitor campaign performance metrics',
                                users: [
                                    availableUsers[5],
                                ],
                            },
                            {
                                id: 'section1-9',
                                title: 'Analyze results and adjust strategy accordingly',
                                editable: false,
                                addBelow: false,
                            },
                        ],
                    },
                ],
            },
            {
                id: 'section1-10',
                title: 'Conduct user research and gather feedback',
                labels: [
                    availableLabels[2],
                    availableLabels[3],
                ],
            },
            {
                id: 'section1-11',
                title: 'Develop wireframes for new website layout',
                tasks: [
                    {
                        id: 'section1-12',
                        title: 'Design mockups for key pages',
                        complete: true,
                    },
                ],
            },
        ],
    },
    {
        id: 'section2',
        name: 'Done',
        description: '',
        collapsible: true,
        color: Token.ColorNeonpink400,
        tasks: [
            {
                id: 'section2-1',
                title: 'Code front-end templates and stylesheets',
            },
            {
                id: 'section2-2',
                title: 'Implement responsive design for mobile compatibility',
                start: new Date('10 April 2024'),
                end: new Date('12 April 2024'),
                tasks: [
                    {
                        id: 'section2-3',
                        title: 'Create content strategy and outline website section',
                    },
                ],
            },
            {
                id: 'section2-4',
                title: 'Integrate SEO best practices',
                users: [
                    availableUsers[0],
                    availableUsers[1],
                    availableUsers[2],
                ],
                labels: [
                    availableLabels[2],
                    availableLabels[3],
                ],
            },
            {
                id: 'section2-5',
                title: 'Test website functionality across browsers and devices',
                complete: true,
            },
            {
                id: 'section2-6',
                title: 'Set up website analytics tracking',
                color: Token.ColorElectric400,
            },
        ],
    },
    {
        id: 'section3',
        name: 'Backlog',
        description: 'Everything that has no status should go here.',
        collapsible: true,
        color: Token.ColorTeal400,
        tasks: [
            {
                id: 'section3-1',
                title: 'Launch website and announce to stakeholders',
                users: [
                    availableUsers[6],
                ],
            },
            {
                id: 'section3-2',
                title: 'Finalize product specifications',
                complete: false,
                labels: [
                    availableLabels[3],
                    availableLabels[4],
                ],
            },
            {
                id: 'section3-3',
                title: 'Procure raw materials or common',
                complete: false,
                color: Token.ColorNeonpink400,
            },
            {
                id: 'section3-4',
                title: 'Develop packaging design',
                tasks: [
                    {
                        id: 'section3-5',
                        title: 'Manufacture prototypes for testing',
                        complete: false,
                    },
                ],
            },
        ],
    },
]
