import { windowObject } from '../helpers'
import { F_DRAG_STATE } from './drag-manager'
import { F_GHOST_ELEMENT_ROTATION } from './drag.hook'

export const getPreviousNextElements = (targetIndex, targetElement, moveDirection) => {
    const parent = targetElement.parentNode

    let previous = parent.children[targetIndex - 1]
    let next = parent.children[targetIndex]

    if (!!next) {
        if (moveDirection == 'down' && windowObject[F_DRAG_STATE].origin.index == +next.dataset.index) {
            next = parent.children[targetIndex + 1]
        }

        if (next.dataset.placeholder) {
            next = undefined
        }
    } else {
        next = undefined
    }

    if (!!previous) {
        // if it's the same object and the mouse is travelling up, then skip over it
        if (
            moveDirection == 'up' &&
            windowObject[F_DRAG_STATE].origin.index == +previous.dataset.index &&
            windowObject[F_DRAG_STATE].origin.areaId == previous.dataset.areaid
        ) {
            previous = parent.children[targetIndex - 2]
        }
    } else {
        previous = undefined
    }

    return { previous, next }
}

export const positionDOMElementExplicit = (x, y, el, callback) => {
    const rotation = windowObject[F_GHOST_ELEMENT_ROTATION] || '0deg'
    el.style.transform = `translate(${x}px, ${y}px) rotate(${rotation})`
    callback()
}

let rafId = null

export const positionDOMElement = (x, y, el, callback) => {
    if (rafId) return

    rafId = requestAnimationFrame(() => {
        const rotation = windowObject[F_GHOST_ELEMENT_ROTATION] || '0deg'
        el.style.transform = `translate(${x}px, ${y}px) rotate(${rotation})`
        callback()
        rafId = null
    })
}
