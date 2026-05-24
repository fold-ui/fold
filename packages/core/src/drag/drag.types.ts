export type MoveDirection = 'up' | 'down' | 'right' | 'left'

export type DragVariant = 'lined' | 'lined-focus' | 'focus' | 'animated'

export type DragOrigin = {
    elementId: string
    targetVariant: any
    height: number
    width: number
    areaId: string
    index: number
    group: string
}

export type DragTarget = {
    focus: boolean
    moveDirection: MoveDirection
    index: number
    indent: number
    left: number
    top: number
    height: number
    width: number
    areaId: string
    elementId: string
    group: string
}

// Safe defaults so .height/.width arithmetic after endDrag returns 0, not NaN.
export const EMPTY_ORIGIN: DragOrigin = {
    elementId: '',
    targetVariant: {},
    height: 0,
    width: 0,
    areaId: '',
    index: -1,
    group: '',
}

export const EMPTY_TARGET: DragTarget = {
    focus: false,
    moveDirection: null,
    index: -1,
    indent: 0,
    left: 0,
    top: 0,
    height: 0,
    width: 0,
    areaId: '',
    elementId: '',
    group: '',
}
