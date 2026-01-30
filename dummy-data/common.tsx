import * as Token from '@fold-ui/design/tokens'

export const labels = [
    { id: 'l1', color: Token.ColorElectric400, icon: 'star', text: 'Shopping' },
    { id: 'l2', color: Token.ColorYellow400, text: 'Groceries' },
    { id: 'l3', color: Token.ColorNeonpink400, text: 'Housework' },
    { id: 'l4', icon: 'building', text: 'Office' },
    { id: 'l5', text: 'Everything else' },
]

export const selectedLabels = [
    { id: 'l1', color: Token.ColorElectric400, icon: 'star', text: 'Shopping' },
    { id: 'l4', icon: 'building', text: 'Office' },
    { id: 'l5', text: 'Everything else' },
]

export const users = [
    { id: 'uuid1', name: 'John', image: '/men/07.jpg' },
    { id: 'uuid2', name: 'Ben', image: '/men/08.jpg' },
    { id: 'uuid5', name: 'Timothy', image: '/men/09.jpg' },
]

export const selectedUsers = [
    { id: 'uuid1', name: 'John', image: '/men/07.jpg' },
    { id: 'uuid2', name: 'Ben', image: '/men/08.jpg' },
    { id: 'uuid5', name: 'Timothy', image: '/men/09.jpg' },
]

export const availableUsers = [
    { id: 'uuid1', name: 'John', image: '/men/09.jpg' },
    { id: 'uuid2', name: 'Ben', image: '/men/06.jpg' },
    { id: 'uuid3', name: 'Derek', image: '/men/01.jpg' },
    { id: 'uuid4', name: 'Craig', image: '/men/02.jpg' },
    { id: 'uuid5', name: 'Timothy', image: '/men/03.jpg' },
    { id: 'uuid6', name: 'Byron', image: '/men/04.jpg' },
    { id: 'uuid7', name: 'Andrew', image: '/men/05.jpg' },
    { id: 'uuid8', name: 'Peter' },
]

export const availableLabels = [
    { id: 'uuid1', text: 'Sales' },
    { id: 'uuid2', text: 'Marketing', color: Token.ColorElectric400, },
    { id: 'uuid3', text: 'DevOps' },
    { id: 'uuid4', text: 'Engineering' },
    { id: 'uuid5', text: 'Product', color: Token.ColorNeonpink400, },
]

export const richInputLabels = [
    { id: 'uuid1', name: '#Sales', type: 'label' },
    { id: 'uuid2', name: '#Marketing', type: 'label' },
    { id: 'uuid3', name: '#DevOps', type: 'label' },
    { id: 'uuid4', name: '#Engineering', type: 'label' },
    { id: 'uuid5', name: '#Product', type: 'label' },
]

export const richInputUsers = [
    { id: 'uuid1', name: '@John', type: 'user' },
    { id: 'uuid2', name: '@Ben', type: 'user' },
    { id: 'uuid3', name: '@Derek', type: 'user' },
    { id: 'uuid4', name: '@Craig', type: 'user' },
    { id: 'uuid5', name: '@Timothy', type: 'user' },
    { id: 'uuid6', name: '@Byron', type: 'user' },
    { id: 'uuid7', name: '@Andrew', type: 'user' },
    { id: 'uuid8', name: '@Peter', type: 'user' },
]

export const colorPalette = [
    Token.ColorPink400,
    Token.ColorNeonpink400,
    Token.ColorRed400,
    Token.ColorOrange400,
    Token.ColorYellow400,
    Token.ColorGreen400,
    Token.ColorSeagreen500,
    Token.ColorTeal400,
    Token.ColorCyan400,
    Token.ColorBlue400,
    Token.ColorElectric400,
    Token.ColorViolet400,
    Token.ColorLavender400,
    Token.ColorPurple400,
    Token.ColorGray400,
    Token.ColorActualgray400,
    Token.ColorMauve400,
    Token.ColorBeige400,
]

export const listOptions = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' },
    { value: 'three', label: 'Three' },
    { value: 'four', label: 'Four' },
]
