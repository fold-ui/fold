import { useState } from 'react'
import { dispatchPubsub, DragOrigin, DragTarget, F_DRAG_STATE, usePubsub } from '../'
import { windowObject } from '../helpers'

export const setDragState = (data) => {
    const { namespace, ...rest } = data
    windowObject[F_DRAG_STATE] = { ...windowObject[F_DRAG_STATE], ...rest }
    dispatchPubsub('state-' + namespace, data)
}

export const setTarget = (target: Partial<DragTarget>) => {
    setDragState({ namespace: 'target', target })
}

export const setOrigin = (origin: Partial<DragOrigin>) => {
    setDragState({ namespace: 'origin', origin })
}

// React hook — subscribes the caller to drag-state changes for the given
// namespace ('origin' | 'target') and re-renders on every dispatch.
// No slice-level filtering; not profiled as an issue in practice.
export const useDragState = (namespace: string): any => {
    const [_, render] = useState(new Date())
    usePubsub('state-' + namespace, (data: any) => render(new Date()))
    return windowObject[F_DRAG_STATE]
}
