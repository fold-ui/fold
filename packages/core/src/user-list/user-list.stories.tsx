import { Button, UserList } from '@fold-dev/core'
import React from 'react'

export default {
    title: 'Core/UserList',
    component: UserList,
    excludeStories: 'docs',
}

export const docs = {
    title: 'User List',
    subtitle: 'The User List component represents a list of users with associated actions.',
    description:
        'The User List component is a convenience component that uses the Card List. For more customizable options, please refer to the Card List component.',
}

export const Usage = () => (
    <UserList
        users={[
            {
                name: 'Brent Fortuin',
                description: 'brent@fold.dev',
                image: '/men/01.jpg',
                tools: <Button size="sm">Message</Button>,
            },
            {
                name: 'Margaret Morris',
                description: 'margaret@fold.dev',
                image: '/women/01.jpg',
                tools: <Button size="sm">Message</Button>,
            },
            {
                name: 'Kevin Manuel',
                description: 'kevin@fold.dev',
                image: '/men/02.jpg',
                tools: <Button size="sm">Message</Button>,
            },
        ]}
    />
)
