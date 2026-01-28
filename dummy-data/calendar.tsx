import * as Token from '@fold-dev/design/tokens'

export const days = [
    { date: new Date('2024-05-04'), workingHours: { start: '11:00', end: '17:30' } },
    { date: new Date('2024-05-05'), workingHours: { start: '09:00', end: '17:30' } },
    { date: new Date('2024-05-06'), workingHours: { start: '09:00', end: '17:30' } },
    { date: new Date('2024-05-07'), workingHours: { start: '11:00', end: '17:30' } },
    { date: new Date('2024-05-08') },
]

export const custom = [
    [
        new Date('2024-05-04'),
        new Date('2024-05-05'),
        new Date('2024-05-06'),
        new Date('2024-05-07'),
        new Date('2024-05-08'),
    ],
]

export const date = new Date('2024-05-11')

export const events = [
    {
        id: 'id01',
        title: 'Vacation',
        start: new Date('2024-05-10T12:00:00'),
        end: new Date('2024-05-11T00:00:00'),
        color: Token.ColorTeal400,
        isDay: true,
    },
    {
        id: 'id02',
        title: 'Conference',
        start: new Date('2024-05-02T12:00:00'),
        end: new Date('2024-05-04T00:00:00'),
        color: Token.ColorElectric400,
        isDay: true,
    },
    {
        id: 'id03',
        title: 'Workshop',
        start: new Date('2024-05-02T12:00:00'),
        end: new Date('2024-05-04T00:00:00'),
        isDay: true,
        users: [
            { id: 'uuid1', name: 'John', image: '/men/09.jpg' },
            { id: 'uuid2', name: 'Ben', image: '/men/06.jpg' },
            { id: 'uuid5', name: 'Timothy', image: '/men/03.jpg' },
        ],
    },
    {
        id: 'id04',
        title: 'Strategy',
        start: new Date('2024-05-3T12:00:00'),
        end: new Date('2024-05-3T00:00:00'),
        color: Token.ColorNeonpink400,
        isDay: true,
    },
    {
        id: 'id05',
        title: 'Meetings',
        start: new Date('2024-05-07T12:00:00'),
        end: new Date('2024-05-08T00:00:00'),
        color: Token.ColorYellow400,
        isDay: true,
        users: [
            { id: 'uuid1', name: 'John', image: '/men/09.jpg' },
            { id: 'uuid2', name: 'Ben', image: '/men/06.jpg' },
            { id: 'uuid5', name: 'Timothy', image: '/men/03.jpg' },
        ],
    },
    {
        id: 'id06',
        title: 'Fitness',
        start: new Date('2024-05-14T19:00:00'),
        end: new Date('2024-05-18T21:00:00'),
        isDay: true,
        users: [
            { id: 'uuid1', name: 'John', image: '/men/09.jpg' },
            { id: 'uuid2', name: 'Ben', image: '/men/06.jpg' },
            { id: 'uuid5', name: 'Timothy', image: '/men/03.jpg' },
        ],
    },
    {
        id: 'id07',
        title: 'Holiday',
        start: new Date('2024-05-23T12:00:00'),
        end: new Date('2024-05-25T12:00:00'),
        isDay: true,
    },
    {
        id: 'id08',
        title: 'Planning Session',
        start: new Date('2024-05-12T19:00:00'),
        end: new Date('2024-05-16T23:00:00'),
        isDay: true,
    },
    {
        id: 'id09',
        title: 'Team Workshops',
        start: new Date('2024-05-25T03:00:00'),
        end: new Date('2024-01-10T03:00:00'),
        color: Token.ColorViolet500,
        isDay: true,
        users: [
            { id: 'uuid1', name: 'John', image: '/men/09.jpg' },
            { id: 'uuid2', name: 'Ben', image: '/men/06.jpg' },
            { id: 'uuid5', name: 'Timothy', image: '/men/03.jpg' },
        ],
    },
    {
        id: 'id10',
        title: 'Discussion 2',
        start: new Date('2024-05-12T19:00:00'),
        end: new Date('2024-05-12T23:00:00'),
        color: Token.ColorPurple500,
        isDay: true,
    },
    {
        id: 'id11',
        title: 'Meeting',
        start: new Date('2024-05-25T03:00:00'),
        end: new Date('2024-05-25T03:00:00'),
        isDay: true,
    },
    // schedule:
    {
        id: 'we1',
        title: 'Lunch',
        start: new Date('2024-05-4 11:30:00'),
        end: new Date('2024-05-4 13:00:00'),
    },
    {
        id: 'we2',
        title: 'Workshop',
        start: new Date('2024-05-4 18:00:00'),
        end: new Date('2024-05-4 23:00:00'),
    },
    {
        id: 'we3',
        title: 'Meeting with John',
        start: new Date('2024-05-06 14:00:00'),
        end: new Date('2024-05-06 15:30:00'),
        color: Token.ColorTeal500,
    },
    {
        id: 'we4',
        title: 'OoO',
        start: new Date('2024-05-5 10:00:00'),
        end: new Date('2024-05-5 13:00:00'),
        users: [
            { id: 'uuid1', name: 'John', image: '/men/09.jpg' },
            { id: 'uuid2', name: 'Ben', image: '/men/06.jpg' },
            { id: 'uuid5', name: 'Timothy', image: '/men/03.jpg' },
        ],
    },
    {
        id: 'we5',
        title: 'OoO',
        start: new Date('2024-05-6 9:00:00'),
        end: new Date('2024-05-6 10:45:00'),
        users: [
            { id: 'uuid1', name: 'John', image: '/men/09.jpg' },
            { id: 'uuid2', name: 'Ben', image: '/men/06.jpg' },
            { id: 'uuid5', name: 'Timothy', image: '/men/03.jpg' },
        ],
    },
    {
        id: 'we51',
        title: 'Pilates',
        start: new Date('2024-05-6 6:00:00'),
        end: new Date('2024-05-6 14:45:00'),
    },
    {
        id: 'we6',
        title: 'Strategy Session',
        start: new Date('2024-05-6 14:00:00'),
        end: new Date('2024-05-6 17:00:00'),
    },
    {
        id: 'we7',
        title: 'Break',
        start: new Date('2024-05-7 10:00:00'),
        end: new Date('2024-05-7 11:00:00'),
        color: Token.ColorNeonpink500,
        users: [
            { id: 'uuid1', name: 'John', image: '/men/09.jpg' },
            { id: 'uuid2', name: 'Ben', image: '/men/06.jpg' },
            { id: 'uuid5', name: 'Timothy', image: '/men/03.jpg' },
        ],
    },
    {
        id: 'we8',
        title: 'Strategy Meeting',
        start: new Date('2024-05-7 14:00:00'),
        end: new Date('2024-05-7 23:30:00'),
    },
    {
        id: 'we9',
        title: 'Inventory',
        start: new Date('2024-05-8 16:00:00'),
        end: new Date('2024-05-8 17:45:00'),
        users: [
            { id: 'uuid1', name: 'John', image: '/men/09.jpg' },
            { id: 'uuid2', name: 'Ben', image: '/men/06.jpg' },
            { id: 'uuid5', name: 'Timothy', image: '/men/03.jpg' },
        ],
    },
    {
        id: 'we10',
        title: 'Training Course',
        start: new Date('2024-05-8 11:00:00'),
        end: new Date('2024-05-8 15:00:00'),
        users: [
            { id: 'uuid1', name: 'John', image: '/men/09.jpg' },
            { id: 'uuid2', name: 'Ben', image: '/men/06.jpg' },
            { id: 'uuid5', name: 'Timothy', image: '/men/03.jpg' },
        ],
    },
    {
        id: 'we11',
        title: 'Catch up',
        color: Token.ColorNeonpink500,
        start: new Date('2024-05-09 7:00:00'),
        end: new Date('2024-05-10 8:30:00'),
    },
    {
        id: 'we12',
        title: 'OoO',
        start: new Date('2024-05-8 20:00:00'),
        end: new Date('2024-05-8 22:00:00'),
        color: Token.ColorDarkYellow500,
    },
]
