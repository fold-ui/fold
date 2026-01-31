import { Avatar, IconLib, ProgressPie } from '@fold-ui/core'
import * as Token from '@fold-ui/design/tokens'
import React from 'react'
import { KanbanTypes } from '@fold-ui/pro'

export const swimlanes: KanbanTypes.Swimlane[] = [
    {
        id: 'swimlane0',
        title: 'Kanban',
        description: 'Kanban board component example',
        header: false,
        fixed: true,
        columns: [
            {
                id: 'column-2463',
                name: 'Todo',
                description: 'Everything in this column needs to be done this sprint.',
                color: Token.ColorElectric400,
                collapsed: false,
                cards: [
                    {
                        id: 'c11',
                        title: 'Create social media content calendar',
                        complete: false,
                        image: '',
                        labels: [{ id: 'uuid1', text: 'Sales' }],
                        badges: [],
                        start: new Date('10 April 2024'),
                        users: [
                            { id: 'uuid1', name: 'John', image: '/men/09.jpg' },
                            { id: 'uuid2', name: 'Ben', image: '/men/06.jpg' },
                            { id: 'uuid5', name: 'Timothy', image: '/men/03.jpg' },
                        ],
                    },
                    {
                        color: Token.ColorNeonpink400,
                        id: 'c431',
                        title: 'Research target audience',
                        complete: false,
                    },
                    {
                        id: 'c441',
                        title: 'Design campaign visuals',
                        complete: false,
                        labels: [],
                        locked: true,
                        badges: [],
                    },
                    {
                        id: 'c451',
                        title: 'Write promotional copy',
                        complete: false,
                        labels: [],
                    },
                ],
            },
            {
                id: 'column-46868',
                name: 'Doing',
                color: Token.ColorTeal400,
                cards: [
                    {
                        id: 'c461',
                        title: 'Monitor campaign performance metrics',
                        complete: false,
                        labels: [{ id: 'uuid5', text: 'Product' }],
                    },
                ],
            },
            {
                id: 'column-468688',
                name: 'Done',
                color: Token.ColorPurple400,
                cards: [
                    {
                        id: 'c312',
                        title: 'Schedule social media posts',
                        complete: true,
                        labels: [
                            { id: 'uuid1', text: 'Sales' },
                            { id: 'uuid5', text: 'Product' },
                        ],
                    },
                    {
                        id: 'c322',
                        title: 'Reach out to influencers for collaborations',
                        complete: true,
                        labels: [],
                        users: [
                            { id: 'uuid1', name: 'John', image: '/men/08.jpg' },
                            { id: 'uuid2', name: 'Ben', image: '/men/06.jpg' },
                        ],
                        badges: [],
                        start: new Date('23 August 2024'),
                    },
                    {
                        id: 'c332',
                        title: 'Set up email marketing campaign',
                        complete: true,
                        labels: [],
                        badges: [],
                    },
                    {
                        id: 'c342',
                        title: 'Update website with campaign information',
                        complete: true,
                        labels: [],
                    },
                ],
            },
            {
                id: 'column-4686881',
                name: 'Backlog',
                color: Token.ColorNeonpink400,
                cards: [
                    {
                        id: 'c1444',
                        title: 'Analyze results and adjust strategy accordingly',
                        complete: false,
                        locked: false,
                        color: Token.ColorPurple400,
                        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAAFUWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpQaXhlbFhEaW1lbnNpb249IjI1NiIKICAgZXhpZjpQaXhlbFlEaW1lbnNpb249IjI1NiIKICAgZXhpZjpDb2xvclNwYWNlPSIxIgogICB0aWZmOkltYWdlV2lkdGg9IjI1NiIKICAgdGlmZjpJbWFnZUxlbmd0aD0iMjU2IgogICB0aWZmOlJlc29sdXRpb25Vbml0PSIyIgogICB0aWZmOlhSZXNvbHV0aW9uPSI3Mi8xIgogICB0aWZmOllSZXNvbHV0aW9uPSI3Mi8xIgogICBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIgogICBwaG90b3Nob3A6SUNDUHJv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',
                        users: [
                            { id: 'uuid1', name: 'John', image: '/men/09.jpg' },
                            { id: 'uuid2', name: 'Ben', image: '/men/06.jpg' },
                            { id: 'uuid6', name: 'Byron', image: '/men/04.jpg' },
                            { id: 'uuid7', name: 'Andrew', image: '/men/05.jpg' },
                        ],
                        labels: [
                            { id: 'uuid1', text: 'Sales' },
                            { id: 'uuid2', text: 'Marketing' },
                            { id: 'uuid3', text: 'DevOps' },
                            { id: 'uuid4', text: 'Engineering' },
                            { id: 'uuid5', text: 'Product' },
                        ],
                        badges: [],
                    },
                ],
            },
        ],
    },
    {
        id: 'swimlane3',
        title: 'Charlene Singh',
        description: 'Cards assigned to Charlene Singh',
        prefix: (
            <Avatar
                name="Charlene Singh"
                style={{
                    border: '0.2rem solid var(--f-color-surface-strong)',
                    outline: '0.2rem solid var(--f-color-electric-400)',
                }}
                src="/women/01.jpg"
                size="sm"
            />
        ),
        columns: [
            {
                id: 'column-2463',
                name: 'Doing',
                collapsed: false,
                cards: [
                    {
                        id: 'c1431',
                        title: 'Conduct user research and gather feedback',
                        complete: false,
                    },
                    {
                        id: 'c1441',
                        title: 'Develop wireframes for new website layout',
                        complete: false,
                        labels: [],
                    },
                    {
                        id: 'c1451',
                        title: 'Design mockups for key pages',
                        complete: false,
                        labels: [],
                        badges: [],
                    },
                    {
                        id: 'c1461',
                        title: 'Create content strategy and outline website sections',
                        complete: false,
                        labels: [],
                        badges: [],
                    },
                ],
            },
            {
                id: 'column-46868',
                name: 'Done',
                cards: [
                    {
                        id: 'c1312',
                        title: 'Code front-end templates and stylesheets',
                        complete: true,
                        labels: [
                            { id: 'uuid4', text: 'Engineering' },
                            { id: 'uuid5', text: 'Product' },
                        ],
                    },
                    {
                        id: 'c1322',
                        title: 'Implement responsive design for mobile compatibility',
                        complete: true,
                        labels: [],
                        users: [{ id: 'uuid2', name: 'Ben', image: '/men/06.jpg' }],
                    },
                ],
            },
            {
                id: 'column-468688',
                name: 'Backlog',
                cards: [],
            },
            {
                id: 'column-4686881',
                name: 'Sandbox',
                cards: [
                    {
                        id: 'c1332',
                        title: 'Integrate SEO best practices',
                        complete: true,
                        labels: [],
                    },
                    {
                        id: 'c1342',
                        title: 'Test website functionality across browsers and devices',
                        complete: true,
                        labels: [],
                    },
                ],
            },
        ],
    },
    {
        id: 'swimlane1',
        title: 'Craig Pather',
        description: 'Cards assigned to Craig Pather',
        color: Token.ColorTeal400,
        prefix: (
            <Avatar
                name="Craig Pather"
                style={{
                    border: '0.2rem solid var(--f-color-teal-400)',
                    outline: '0.2rem solid var(--f-color-white)',
                }}
                src="/men/03.jpg"
                size="sm"
            />
        ),
        columns: [
            {
                id: 'column-2463',
                name: 'Doing',
                collapsed: false,
                cards: [
                    {
                        id: 'c14311',
                        title: 'Set up website analytics tracking',
                        complete: false,
                    },
                    {
                        id: 'c14411',
                        title: 'Launch website and announce to stakeholders',
                        complete: false,
                        labels: [],
                    },
                    {
                        id: 'c14151',
                        title: 'Finalize product specifications',
                        complete: false,
                        start: new Date('21 Feb'),
                        labels: [],
                        badges: [],
                    },
                    {
                        id: 'c14161',
                        title: 'Procure raw materials or common',
                        complete: false,
                        labels: [],
                    },
                ],
            },
            {
                id: 'column-46868',
                name: 'Done',
                cards: [
                    {
                        id: 'c13132',
                        title: 'Develop packaging design',
                        complete: true,
                        labels: [
                            { id: 'uuid3', text: 'DevOps' },
                            { id: 'uuid4', text: 'Engineering' },
                        ],
                    },
                    {
                        id: 'c13232',
                        title: 'Manufacture prototypes for testing',
                        complete: true,
                        labels: [],
                        users: [{ id: 'uuid2', name: 'Ben', image: '/men/06.jpg' }],
                    },
                    {
                        id: 'c13352',
                        title: 'Conduct quality assurance checks',
                        complete: true,
                        labels: [],
                    },
                ],
            },
            {
                id: 'column-468688',
                name: 'Backlog',
                cards: [
                    {
                        id: 'c13462',
                        title: 'Create marketing materials (e.g., brochures, videos)',
                        complete: true,
                        labels: [
                            { id: 'uuid1', text: 'Sales' },
                            { id: 'uuid2', text: 'Marketing' },
                        ],
                        badges: [
                            {
                                icon: 'warning',
                                label: 'Notice',
                            },
                        ],
                    },
                ],
            },
            {
                id: 'column-4686881',
                name: 'Sandbox',
                cards: [],
            },
        ],
    },
]
