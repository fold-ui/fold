import { useState } from 'react'
import { dispatchPubsub, DragOrigin, DragTarget, FOLD_DRAG_STATE, usePubsub } from '../'
import { windowObject } from '../helpers'

export const setDragState = (data) => {
    const { namespace, ...rest } = data
    windowObject[FOLD_DRAG_STATE] = { ...windowObject[FOLD_DRAG_STATE], ...rest }
    dispatchPubsub('state-' + namespace, data)
}

export const setTarget = (target: Partial<DragTarget>) => {
    setDragState({ namespace: 'target', target })
}

export const setOrigin = (origin: Partial<DragOrigin>) => {
    setDragState({ namespace: 'origin', origin })
}

export const getDragState = (namespace: string): any => {
    const [_, render] = useState(new Date())
    usePubsub('state-' + namespace, (data: any) => render(new Date()))
    return windowObject[FOLD_DRAG_STATE]
}

/* 

export const setDragState = (data) => {
    const { namespace, ...rest } = data
    windowObject[FOLD_DRAG_STATE] = { ...windowObject[FOLD_DRAG_STATE], ...rest }
    windowObject.dispatchEvent(new CustomEvent(namespace, { detail: data }))
}

export const setTarget = (target: Partial<DragTarget>) => {
    setDragState({ namespace: 'target', target })
}

export const setOrigin = (origin: Partial<DragOrigin>) => {
    setDragState({ namespace: 'origin', origin })
}

export const getDragState = (namespace: string): any => {
    const [_, render] = useState(new Date())
    const handler = (data) => render(new Date())
    useWindowEvent(namespace, handler)
    return { ...windowObject[FOLD_DRAG_STATE], _ }
}

*/
