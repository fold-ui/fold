import React, { useEffect, useRef } from 'react'
import {
    DragVariant,
    MoveDirection,
    dispatchDragEvent,
    documentObject,
    executeLast,
    getDragState,
    getKey,
    getPreviousNextElements,
    positionDOMElement,
    setOrigin,
    setTarget,
    useDrag,
    useDragEvent,
    useWindowEvent,
} from '..'
import { globalCursor, windowObject } from '../helpers'

export const FOLD_DRAG_CACHE = 'FOLD_DRAG_CACHE'
export const FOLD_DRAG_STATE = 'FOLD_DRAG_STATE'
export const FOLD_DRAG_LOCK = 'FOLD_DRAG_LOCK'
export const FOLD_RESTRICT_DUAL_MOVEMENT = 'FOLD_RESTRICT_DUAL_MOVEMENT'

windowObject[FOLD_DRAG_CACHE] = {
    locked: false,
    mouseDown: false,
    init: {},
    originMouse: {},
    mouse: { x: 0, y: 0 },
    time: 0,
    moveDirection: null,
    targetElement: null,
    targetAreaId: null,
    indent: {},
    targetCache: {},
}

windowObject[FOLD_DRAG_STATE] = {
    target: {},
    origin: { targetVariant: {} },
}

export type DragManagerProps = {
    animation?: number
    moveThreshold?: number
    indentThreshold?: number
    linedRegionThreshold?: number
}

export const DragManager = (props: DragManagerProps) => {
    const { animation = 200, moveThreshold = 0, indentThreshold = 5, linedRegionThreshold = 3 } = props
    const ghostRef = useRef<any>(null)
    const { origin } = getDragState('origin')
    const { target } = getDragState('target')
    const isDragging = !!origin.areaId
    const { endDrag, getCache, indent, outdent, clearGhostElement } = useDrag()
    const cache = getCache()

    const stopDrag = (reset = false) => {
        if (isDragging) {
            if (reset) {
                dispatchDragEvent('ondrop', { origin, target: cache.targetCache })
            } else {
                dispatchDragEvent('ondrop', { origin, target })
            }
        }

        endDrag()
    }

    const handleMouseUp = (e) => {
        executeLast(stopDrag)
    }

    const handleKeyDown = (e) => {
        const { isEscape } = getKey(e)
        if (isEscape && isDragging) stopDrag(true)
    }

    const handleMouseMove = (e) => {
        if (!window[FOLD_DRAG_LOCK] && isDragging && !cache.locked) {
            const mouseY = e.clientY
            const mouseX = e.clientX
            const { offsetLeft, offsetTop } = cache.originMouse
            const x = mouseX - offsetLeft
            const y = mouseY - offsetTop
            let moveDirection: MoveDirection = null

            // position the ghost element first
            // syncronously with a callback so that it's smooth for the user
            positionDOMElement(x, y, ghostRef.current, () => {
                // calculate normal mouse movement
                if (mouseX < cache.mouse.x - moveThreshold) moveDirection = 'left'
                if (mouseX > cache.mouse.x + moveThreshold) moveDirection = 'right'

                // if there is dual movement - restrict the direction
                if (window[FOLD_RESTRICT_DUAL_MOVEMENT]) {
                    if (moveDirection != 'left' && moveDirection != 'right') {
                        if (mouseY < cache.mouse.y - moveThreshold) moveDirection = 'up'
                        if (mouseY > cache.mouse.y + moveThreshold) moveDirection = 'down'
                    }
                } else {
                    if (mouseY < cache.mouse.y - moveThreshold) moveDirection = 'up'
                    if (mouseY > cache.mouse.y + moveThreshold) moveDirection = 'down'
                }

                // calculate indent mouse movement (jerking)
                // TODO: extend to accommodate vertical directions
                const shouldIndent = mouseX > cache.mouse.x + indentThreshold
                const shouldOutdent = mouseX < cache.mouse.x - indentThreshold

                // if the user jerks to the right, then indent
                // if the user jerks to the right, then outdent
                if (shouldIndent) indent()
                if (shouldOutdent) outdent()

                // cache mouse position
                cache.mouse = { x: mouseX, y: mouseY }

                // stop if there is no direction at all
                // and if there is no indentation movements
                // && !shouldIndent && !shouldOutdent
                if (!!moveDirection) {
                    const element = documentObject.elementFromPoint(mouseX, mouseY)

                    // only process valid elements (non-offscreen)
                    if (!element) return
                    if (!element.dataset) return

                    // must be a dragelement and not non-droppable
                    const isDragElement = !!element.dataset.dragelement
                    const isDroppable = !element.dataset.nodrop
                    const isFocus = !element.dataset.nofocus

                    // stop if the target isn't a drag-element
                    if (isDragElement && isDroppable) {
                        const elementParentDirection = element.parentNode.dataset.direction
                        const elementParentGroup = element.parentNode.dataset.group
                        const elementAreaId = element.parentNode.dataset.areaid // also element.dataset.areaid
                        const isDifferentArea = cache.targetAreaId != elementAreaId

                        // TODO: add support for horizontal layouts
                        // this is mainly for dragging kanban-like layout
                        // if the move direction doesn't correlate with the layout
                        // then force the moveDirection in an appropriate direction
                        // if (elementParentDirection == 'horizontal' && (moveDirection == 'up' || moveDirection == 'down')) moveDirection = 'left'
                        if (
                            elementParentDirection == 'vertical' &&
                            (moveDirection == 'left' || moveDirection == 'right') &&
                            isDifferentArea
                        ) {
                            moveDirection = 'up'
                        }

                        // only activate if there is a mouse direction & parent element direction
                        const shouldActivate =
                            elementParentDirection == 'vertical'
                                ? moveDirection == 'down' || moveDirection == 'up'
                                : elementParentDirection == 'horizontal'
                                ? moveDirection == 'left' || moveDirection == 'right'
                                : false

                        // see above
                        if (shouldActivate) {
                            let focus: boolean = false
                            const now = new Date().getTime()
                            const elementId = element.dataset.id
                            const elementIndex = +element.dataset.index
                            const elementIndent = element.dataset.indent ? +element.dataset.indent : 0
                            const elementNotFromTop = element.parentNode.dataset.notfromtop
                            const elementParentVariant: DragVariant = origin.targetVariant[elementParentGroup]

                            // this calculates where the cursor falls on the target element
                            // if it's just focus - then there is no regionSize because we want all of the area
                            // TODO: extend to accommodate vertical directions
                            if ((elementParentVariant == 'lined-focus' || elementParentVariant == 'focus') && isFocus) {
                                const box = element.getBoundingClientRect()
                                const regionSize =
                                    elementParentVariant == 'focus' ? 0 : Math.round(box.height / linedRegionThreshold)

                                focus = mouseY >= box.top + regionSize && mouseY <= box.bottom - regionSize
                            }

                            // calculate index based on mouse direction & target direction
                            // keep the element target index if the user hovers over it
                            let targetIndex = focus
                                ? elementIndex
                                : elementParentDirection == 'vertical'
                                ? moveDirection == 'down'
                                    ? elementIndex + 1
                                    : elementIndex
                                : moveDirection == 'right'
                                ? elementIndex + 1
                                : elementIndex

                            // TODO: find a non-hacky way to do this
                            // we don't bother for horizontal element because the affect is less pronounced
                            const isFirstElement =
                                elementParentDirection == 'vertical'
                                    ? element.offsetTop == 0
                                    : elementParentDirection == 'horizontal'
                                    ? false
                                    : false

                            // if its the 1st element & from coming in outside the area
                            // cache now() + animation time - 10ms minimum (buffer)
                            if (isFirstElement && isDifferentArea) cache.time = now + animation + 10

                            // if it's got the dataset.fromtop
                            // if it's the first element, then always make sure to handle
                            // indexes normally only after the animation has timed out
                            // manually set mouse direction & target index
                            if (!elementNotFromTop && isFirstElement && now < cache.time) {
                                targetIndex = elementIndex
                                moveDirection = elementParentDirection == 'vertical' ? 'up' : 'left'
                            }

                            // default indent is one from the target index/element
                            let targetIndent = elementIndent

                            // ------------------------------------------------------------
                            // indentation calculation & caching start
                            // ------------------------------------------------------------

                            // get this from the cache and use it if there is one
                            // this will get set in updateTargetIndent() above
                            const indentIsCached =
                                cache.indent.index == targetIndex && cache.indent.areaId == elementAreaId

                            // if it's cached then update the target with the cached level
                            if (indentIsCached) {
                                targetIndent = cache.indent.indent
                            } else {
                                // otherwise calculate the correct indent level based on the siblings
                                const { previous, next } = getPreviousNextElements(targetIndex, element, moveDirection)

                                // check these exist first
                                if (previous || next) {
                                    const previousIndent = previous ? +previous.dataset.indent : 0
                                    const nextIndent = next ? +next.dataset.indent : 0

                                    // if the target index is part of a nested region
                                    // then always take the bottom indent level - this is to keep the indent
                                    // from breaking the hierarchy by auto-assuming the parent indent position
                                    if (nextIndent > previousIndent) targetIndent = nextIndent

                                    // cache the newly calculated indent level
                                    cache.indent = {
                                        index: targetIndex,
                                        indent: targetIndent,
                                        areaId: elementAreaId,
                                        previous,
                                        previousIndent,
                                        next,
                                        nextIndent,
                                    }

                                    // outline the previous & next elements
                                    // for (let target of element.parentNode.children) target.style.border = 'none'
                                    // if (previous) previous.style.outline = '1px solid green'
                                    // if (next) next.style.outline = '1px solid red'
                                }
                            }

                            // ------------------------------------------------------------
                            // end
                            // ------------------------------------------------------------

                            // update the drag target
                            setTarget({
                                focus,
                                moveDirection,
                                index: targetIndex,
                                indent: targetIndent,
                                left: element.offsetLeft,
                                top: element.offsetTop,
                                height: element.offsetHeight,
                                width: element.offsetWidth,
                                areaId: elementAreaId,
                                elementId: elementId,
                                group: elementParentGroup,
                            })

                            // cache the ref for the target element
                            // update the area cache (to catch coming in from outside)
                            cache.moveDirection = moveDirection
                            cache.targetAreaId = elementAreaId
                            cache.targetElement = element
                            cache.targetIndex = targetIndex
                        }
                    }
                }
            })
        }
    }

    useWindowEvent('mousemove', handleMouseMove)
    useWindowEvent('mouseup', handleMouseUp)
    useWindowEvent('keydown', handleKeyDown)

    useEffect(() => {
        documentObject.documentElement.style.cssText = `--f-drag-speed: ${animation}ms`
    }, [])

    return (
        <div
            ref={ghostRef}
            id="f-drag-ghost"
            className="f-drag-ghost"
            style={{ display: isDragging ? 'block' : 'none' }}
        />
    )
}
