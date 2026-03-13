import { useEffect, useRef } from 'react'
import {
    dispatchDragEvent,
    documentObject,
    FOLD_DRAG_CACHE,
    FOLD_DRAG_LOCK,
    FOLD_DRAG_STATE,
    FOLD_RESTRICT_DUAL_MOVEMENT,
    getBoundingClientRect,
    getPreviousNextElements,
    globalCursor,
    positionDOMElement,
    resizeDOMElement,
    setOrigin,
    setTarget,
} from '../'
import { getButton, waitForRender, windowObject } from '../helpers'

export const FOLD_CUSTOM_GHOST_ELEMENT = 'FOLD_CUSTOM_GHOST_ELEMENT'
export const FOLD_GHOST_ELEMENT_ROTATION = 'FOLD_GHOST_ELEMENT_ROTATION'

export const useDrag = (args: any = { indentDelay: 100 }) => {
    const ghostRef = useRef(null)
    const { indentDelay } = args

    const restrictDualMovement = (val = true) => window[FOLD_RESTRICT_DUAL_MOVEMENT] = val

    const forceLockDragMovement = (val = true) => window[FOLD_DRAG_LOCK] = val

    const getStaticState = (): any => windowObject[FOLD_DRAG_STATE]

    const getCache = (): any => windowObject[FOLD_DRAG_CACHE]

    const getGhostElement = () => ghostRef.current

    const setGhostElement = (html: string = null) => {
        ghostRef.current.innerHTML = html
    }

    const setCustomGhostElement = (html: string = null) => {
        windowObject[FOLD_CUSTOM_GHOST_ELEMENT] = true
        setGhostElement(html)
    }

    const setCustomGhostElementRotation = (rotation: string = '0deg') => {
        windowObject[FOLD_GHOST_ELEMENT_ROTATION] = rotation
    }

    const clearGhostElement = () => {
        windowObject[FOLD_GHOST_ELEMENT_ROTATION] = null
        windowObject[FOLD_CUSTOM_GHOST_ELEMENT] = undefined
        setGhostElement('')
    }

    const hasCustomGhostElement = () => {
        return !!windowObject[FOLD_CUSTOM_GHOST_ELEMENT]
    }

    const startDrag = (data = null) => {
        documentObject.body.dataset.dragging = 'yes'
        globalCursor.add('grabbing')
        dispatchDragEvent('onstart', data)
    }

    const endDrag = () => {
        const cache = getCache()
        delete documentObject.body.dataset.dragging
        clearGhostElement()
        globalCursor.remove('grabbing')
        dispatchDragEvent('onend', null)
        setTarget({})
        setOrigin({ targetVariant: {} })
        cache.mouseDown = false
    }

    const updateTargetIndent = (indentLevel) => {
        const { target } = getStaticState()
        const cache = getCache()
        cache.indent = { ...cache.indent, indent: indentLevel }
        setTarget({ ...target, indent: indentLevel })
        waitForRender(() => (cache.indentLock = false), indentDelay)
    }

    const getNextIndent = ({ indent, previous, previousIndent, next, nextIndent }) => {
        if (nextIndent - previousIndent >= 2) return indent
        const maximumIndent = previous ? (previousIndent < nextIndent ? nextIndent : previousIndent + 1) : indent
        const targetIndent = indent < maximumIndent ? indent + 1 : maximumIndent
        return targetIndent
    }

    const getNextOutdent = ({ indent, previous, previousIndent, next, nextIndent }) => {
        if (nextIndent - previousIndent >= 2) return indent
        // this needs to be here for now
        if ((nextIndent === previousIndent) === indent) return indent
        // this is the correction
        if (nextIndent === previousIndent && previousIndent === indent) return indent
        const maximumOutdent = next ? nextIndent : 0
        const targetOutdent = indent > maximumOutdent ? indent - 1 : maximumOutdent
        return targetOutdent
    }

    const outdent = () => {
        const cache = getCache()
        if (cache.indentLock) return
        cache.indentLock = true
        const { index, indent, areaId, previous, previousIndent, next, nextIndent } = cache.indent
        updateTargetIndent(getNextOutdent({ indent, previous, previousIndent, next, nextIndent }))
    }

    const indent = () => {
        const cache = getCache()
        if (cache.indentLock) return
        cache.indentLock = true
        const { index, indent, areaId, previous, previousIndent, next, nextIndent } = cache.indent
        updateTargetIndent(getNextIndent({ indent, previous, previousIndent, next, nextIndent }))
    }

    const onMouseUp = (e: any) => {
        const cache = getCache()
        cache.mouseDown = false
    }

    // this is the new experimental drag start behaviour
    // it's only used by DragElement where we pass values in explicitly
    // instead of using the event
    // TODO: maybe name it differently
    const onMouseDownExplicit = ({ isLeftButton, clientX, clientY, currentTarget }) => {
        if (window[FOLD_DRAG_LOCK]) return

        const cache = getCache()
        const mouseLeft = clientX
        const mouseTop = clientY
        const el = currentTarget
        const parent = el.parentElement
        const areaId = parent.getAttribute('id')
        const group = parent.dataset.group
        const direction = parent.dataset.direction
        const finalTargetVariant = parent.dataset.targetvariant ? JSON.parse(parent.dataset.targetvariant) : {}
        const isHorizontal = direction == 'horizontal'
        const isVertical = direction == 'vertical'
        const moveDirection = isVertical ? 'up' : 'left'
        const index = +el.dataset.index
        const noDrag = !!el.dataset.nodrag
        const noDrop = !!el.dataset.nodrop

        if (!noDrag && isLeftButton && !cache.locked) {
            cache.mouseDown = true

            if (cache.mouseDown) {
                const customGhost = hasCustomGhostElement()
                const { width, height, left, top } = getBoundingClientRect(el)
                let mouseOffsetLeft = customGhost ? 0 : mouseLeft - left
                const mouseOffsetTop = customGhost ? 0 : mouseTop - top

                // adjustment for if the element has margin/differing width to the parent
                if (parent) {
                    const parentWidth = getBoundingClientRect(parent).width ?? 0
                    const parentWidthOffset = parentWidth - width
                    if (!!parentWidthOffset && !customGhost) mouseOffsetLeft -= parentWidthOffset
                }

                const x = mouseLeft - mouseOffsetLeft
                const y = mouseTop - mouseOffsetTop
                const newNode = el.cloneNode(true)
                const indent = el.dataset.indent ? +el.dataset.indent : 0
                const elementId = el.dataset.id
                const ghost = getGhostElement()

                // set the contents
                if (!customGhost) setGhostElement(newNode.outerHTML)

                // make sure the new node + ghost element are the same size
                resizeDOMElement(width, height, newNode)
                resizeDOMElement(width, height, ghost)

                // for indentation (and other margine)
                if (!customGhost) ghost.firstChild.style.margin = '0px'

                // set the intial ghost position (based on the current x/y)
                // again - synced for performance in the UI
                positionDOMElement(x, y, ghost, () => {
                    cache.targetElement = el
                    cache.mouse = { x: mouseLeft, y: mouseTop }
                    cache.originMouse = {
                        left: mouseLeft,
                        top: mouseTop,
                        offsetLeft: mouseOffsetLeft,
                        offsetTop: mouseOffsetTop,
                    }

                    // cache the indentation parameters
                    let targetIndent = indent
                    const previous = el.previousSibling
                    const next = el.nextSibling?.dataset.buffer ? null : el.nextSibling
                    const previousIndent = previous ? +previous.dataset.indent : 0
                    let nextIndent = next ? +next.dataset.indent || 0 : 0

                    // account for children
                    if (nextIndent > indent && next) {
                        let node = next
                        while (node) {
                            const nodeIndent = parseInt(node.dataset.indent, 10)
                            if (nodeIndent <= indent) {
                                nextIndent = nodeIndent
                                break
                            }
                            node = node.nextElementSibling
                        }
                    }

                    cache.indent = {
                        index,
                        indent: targetIndent,
                        areaId,
                        previous,
                        previousIndent,
                        next,
                        nextIndent,
                    }

                    // save the cache for the reset
                    cache.targetCache = {
                        focus: false,
                        moveDirection,
                        index,
                        indent,
                        left: el.offsetLeft,
                        top: el.offsetTop,
                        height,
                        width,
                        areaId,
                        elementId,
                        group,
                    }

                    const origin = {
                        targetVariant: finalTargetVariant,
                        elementId,
                        width,
                        height,
                        areaId,
                        index,
                        group,
                    }

                    const target: any = {
                        focus: false,
                        moveDirection,
                        index,
                        indent,
                        left: el.offsetLeft,
                        top: el.offsetTop,
                        height,
                        width,
                        areaId,
                        elementId,
                        group,
                    }

                    setOrigin(origin)
                    setTarget(target)
                    startDrag({ origin, target })
                })
            }
        }
    }

    const onMouseDown = (e: any, startDelay = 150) => {
        if (window[FOLD_DRAG_LOCK]) return

        const cache = getCache()
        const { isLeftButton } = getButton(e)
        const mouseLeft = e.clientX
        const mouseTop = e.clientY
        const el = e.currentTarget
        const parent = el.parentElement
        const areaId = parent.getAttribute('id')
        const group = parent.dataset.group
        const direction = parent.dataset.direction
        const finalTargetVariant = parent.dataset.targetvariant ? JSON.parse(parent.dataset.targetvariant) : {}
        const isHorizontal = direction == 'horizontal'
        const isVertical = direction == 'vertical'
        const moveDirection = isVertical ? 'up' : 'left'
        const index = +el.dataset.index
        const noDrag = !!el.dataset.nodrag
        const noDrop = !!el.dataset.nodrop

        if (!noDrag && isLeftButton && !cache.locked) {
            e.stopPropagation()

            cache.mouseDown = true

            setTimeout(() => {
                if (cache.mouseDown) {
                    const customGhost = hasCustomGhostElement()
                    const { width, height, left, top } = getBoundingClientRect(el)
                    const mouseOffsetLeft = customGhost ? 0 : mouseLeft - left
                    const mouseOffsetTop = customGhost ? 0 : mouseTop - top
                    const x = mouseLeft - mouseOffsetLeft
                    const y = mouseTop - mouseOffsetTop
                    const newNode = el.cloneNode(true)
                    const indent = el.dataset.indent ? +el.dataset.indent : 0
                    const elementId = el.dataset.id
                    const ghost = getGhostElement()

                    // set the contents
                    if (!customGhost) setGhostElement(newNode.outerHTML)

                    // make sure the new node + ghost element are the same size
                    resizeDOMElement(width, height, newNode)
                    resizeDOMElement(width, height, ghost)

                    // for indentation (and other margine)
                    if (!customGhost) ghost.firstChild.style.margin = '0px'

                    // set the intial ghost position (based on the current x/y)
                    // again - synced for performance in the UI
                    positionDOMElement(x, y, ghost, () => {
                        cache.targetElement = el
                        cache.mouse = { x: mouseLeft, y: mouseTop }
                        cache.originMouse = {
                            left: mouseLeft,
                            top: mouseTop,
                            offsetLeft: mouseOffsetLeft,
                            offsetTop: mouseOffsetTop,
                        }

                        // cache the indentation parameters
                        let targetIndent = indent
                        const previous = el.previousSibling
                        const next = el.nextSibling?.dataset.buffer ? null : el.nextSibling
                        const previousIndent = previous ? +previous.dataset.indent : 0
                        const nextIndent = next ? +next.dataset.indent : 0

                        if (nextIndent > previousIndent) {
                            cache.indent = {
                                index,
                                indent: targetIndent,
                                areaId,
                                previous,
                                previousIndent,
                                next,
                                nextIndent,
                            }
                        } else {
                            if (targetIndent > 0) {
                                cache.indent = {
                                    index,
                                    indent: targetIndent,
                                    areaId,
                                    previous,
                                    previousIndent,
                                    next: undefined,
                                    nextIndent: 0,
                                }
                            } else {
                                cache.indent = {
                                    index,
                                    indent: targetIndent,
                                    areaId,
                                    previous,
                                    previousIndent,
                                    next,
                                    nextIndent,
                                }
                            }
                        }

                        // save the cache for the reset
                        cache.targetCache = {
                            focus: false,
                            moveDirection,
                            index,
                            indent,
                            left: el.offsetLeft,
                            top: el.offsetTop,
                            height,
                            width,
                            areaId,
                            elementId,
                            group,
                        }

                        const origin = {
                            targetVariant: finalTargetVariant,
                            elementId,
                            width,
                            height,
                            areaId,
                            index,
                            group,
                        }

                        const target: any = {
                            focus: false,
                            moveDirection,
                            index,
                            indent,
                            left: el.offsetLeft,
                            top: el.offsetTop,
                            height,
                            width,
                            areaId,
                            elementId,
                            group,
                        }

                        setOrigin(origin)
                        setTarget(target)
                        startDrag({ origin, target })
                    })
                }
            }, startDelay)
        }
    }

    const lockDrag = (locked: boolean) => {
        const cache = getCache()
        cache.locked = locked
    }

    useEffect(() => {
        ghostRef.current = documentObject.getElementById('f-drag-ghost')
    }, [])

    return {
        getStaticState,
        forceLockDragMovement,
        restrictDualMovement,
        getCache,
        getGhostElement,
        setGhostElement,
        setCustomGhostElementRotation,
        clearGhostElement,
        hasCustomGhostElement,
        setCustomGhostElement,
        startDrag,
        endDrag,
        getNextOutdent,
        outdent,
        getNextIndent,
        indent,
        onMouseDown,
        onMouseDownExplicit,
        onMouseUp,
        lockDrag,
    }
}
