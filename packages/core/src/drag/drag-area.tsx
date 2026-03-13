import React, { Children, forwardRef, ReactElement, useMemo, useRef } from 'react'
import {
    classNames,
    CoreViewProps,
    documentObject,
    DragVariant,
    getBoundingClientRect,
    getDragState,
    mergeRefs,
    positionDOMElement,
    renderChildren,
    resizeDOMElement,
    setOrigin,
    setOriginAndTargetWithCallback,
    setTarget,
    useDrag,
    useDragEvent,
    useId,
    useWindowEvent,
    View,
} from '..'
import { getButton } from '../helpers'

export type DragAreaProps = {
    indent?: boolean
    areaId?: string
    group?: string
    variant?: DragVariant
    targetVariant?: any
    direction?: 'vertical' | 'horizontal'
    startDelay?: number
    footer?: any
} & CoreViewProps

export const DragArea = forwardRef((props: DragAreaProps, ref) => {
    const {
        indent,
        areaId,
        group = 'default',
        variant = 'animated',
        targetVariant = {},
        direction = 'vertical',
        startDelay = 100,
        footer,
        ...rest
    } = props
    const { origin } = getDragState('origin')
    const { target } = getDragState('target')
    const { getGhostElement, setGhostElement, startDrag, getCache, hasCustomGhostElement } = useDrag()
    const cache = getCache()
    const containerRef = useRef(null)
    const timeout = useRef(null)
    const hitbox = useRef<any>({})
    const animateFrame = useRef(null)
    const ready = useRef(false)
    const id = useId(areaId)
    const { lastIndex, noChildren } = useMemo(() => {
        const count = Children.count(props.children)
        return { noChildren: count == 0, lastIndex: count - 1 }
    }, [props.children])
    const {
        isLined,
        isLinedFocus,
        isFocus,
        isAnimated,
        isTargetArea,
        isHorizontal,
        isVertical,
        isDragging,
        hasOriginVariant,
        showBufferAndPlaceholder,
        finalTargetVariant,
    } = useMemo(() => {
        // variant is when the origin's DragArea specifies a variant
        // via "targetVariant" that affects this DragArea
        const originVariant: DragVariant = origin.targetVariant[group]
        const hasOriginVariant = !!originVariant
        const isLined = originVariant == 'lined'
        const isLinedFocus = originVariant == 'lined-focus'
        const isFocus = originVariant == 'focus'
        const isAnimated = originVariant == 'animated'
        const isHorizontal = direction == 'horizontal'
        const isVertical = direction == 'vertical'
        const isTargetArea = id == target.areaId
        const isDragging = !!origin.areaId
        const showBufferAndPlaceholder = isAnimated && isTargetArea
        // make sure to add THIS group's variant
        const finalTargetVariant = { ...targetVariant, [group]: variant }

        return {
            hasOriginVariant,
            isLined,
            isLinedFocus,
            isFocus,
            isAnimated,
            isHorizontal,
            isVertical,
            isTargetArea,
            isDragging,
            showBufferAndPlaceholder,
            finalTargetVariant,
        }
    }, [origin, target, id, direction, targetVariant, variant])
    const className = classNames(
        {
            'f-drag-area': true,
            'f-row': isHorizontal,
            'f-col': isVertical,
            'is-dragging': isDragging,
            'is-horizontal': isHorizontal,
            'is-vertical': isVertical,
            'is-animated': isAnimated,
            'no-origin-variant': !hasOriginVariant,
        },
        [props.className]
    )

    const setHitbox = () => {
        const { height, width, top, bottom } = getBoundingClientRect(containerRef.current)
        const divider = 5
        const zoneY = height / divider
        const zoneX = width / divider

        hitbox.current = { zoneY, zoneX, height, width, top, bottom }
    }

    const animationFrame = (timestamp) => {
        if (!origin.areaId) return

        if (isVertical) {
            if (cache.mouse.y < hitbox.current.top + hitbox.current.zoneY)
                containerRef.current.scrollTop = containerRef.current.scrollTop - 5
            if (cache.mouse.y > hitbox.current.bottom - hitbox.current.zoneY)
                containerRef.current.scrollTop = containerRef.current.scrollTop + 5
        }

        if (isHorizontal) {
            if (cache.mouse.x < hitbox.current.left + hitbox.current.zoneX)
                containerRef.current.scrollLeft = containerRef.current.scrollLeft - 5
            if (cache.mouse.x > hitbox.current.right - hitbox.current.zoneX)
                containerRef.current.scrollLeft = containerRef.current.scrollLeft + 5
        }

        animateFrame.current = requestAnimationFrame(animationFrame)
    }

    const handleMouseEnter = (e) => {
        if (isDragging) {
            setHitbox()
            animateFrame.current = requestAnimationFrame(animationFrame)
        }
    }

    const handleMouseLeave = (e) => {
        cancelAnimationFrame(animateFrame.current)
    }

    const handleMouseUp = (e) => {
        delete documentObject.body.dataset.dragginganimation
        ready.current = false
        clearTimeout(timeout.current)
    }

    const handleMouseMove = (e) => {
        // "ready" makes sure the start sequence only fires once
        // because we are looking for a mousemove event
        // TODO: see if there is a better way to handle a "mousemovestart"
        // startDrag() will notify "onstart" (sets CSS globals, etc)
        if (ready.current) {
            ready.current = false
            // setOrigin(cache.init.origin)
            // setTarget(cache.init.target)
            // startDrag()
            setOriginAndTargetWithCallback(
                cache.init.origin,
                cache.init.target,
                () => startDrag()
            )
        }
    }

    const handleMouseDown = (e: any, index) => {
        const { isLeftButton } = getButton(e)
        const el = e.currentTarget
        const mouseLeft = e.clientX
        const mouseTop = e.clientY
        const areaId = id

        if (isLeftButton) {
            e.stopPropagation() //e.preventDefault()

            timeout.current = setTimeout(() => {
                ready.current = true

                // set up the initial data
                const customGhost = hasCustomGhostElement()
                const { width, height, left, top } = getBoundingClientRect(el)
                const mouseOffsetLeft = customGhost ? 0 : mouseLeft - left
                const mouseOffsetTop = customGhost ? 0 : mouseTop - top
                const x = mouseLeft - mouseOffsetLeft
                const y = mouseTop - mouseOffsetTop
                const newNode = el.cloneNode(true)
                const indent = +el.dataset.indent
                const elementId = el.dataset.id
                const ghost = getGhostElement()

                // set the contents
                if (!customGhost) setGhostElement(newNode.outerHTML)

                // make sure the new node + ghost element are the same size
                resizeDOMElement(width, height, newNode)
                resizeDOMElement(width, height, ghost)

                // for indentation
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
                    cache.targetCache = {
                        focus: false,
                        moveDirection: isVertical ? 'up' : 'left',
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
                    cache.init = {
                        origin: {
                            targetVariant: finalTargetVariant,
                            elementId,
                            width,
                            height,
                            areaId,
                            index,
                            group,
                        },
                        target: {
                            focus: false,
                            moveDirection: isVertical ? 'up' : 'left',
                            index,
                            indent,
                            left: el.offsetLeft,
                            top: el.offsetTop,
                            height,
                            width,
                            areaId,
                            elementId,
                            group,
                        },
                    }
                })
            }, startDelay)
        }
    }

    const renderPlaceholder = () => {
        if (!showBufferAndPlaceholder) return null

        const marginLeft = indent ? (target.indent ? `calc(var(--f-drag-indent) * ${target.indent})` : 0) : 0
        const position = noChildren ? 'relative' : 'absolute'
        const width = isVertical ? target.width || origin.width : origin.width
        const height = isVertical ? origin.height : target.height || origin.height
        const transform = noChildren
            ? null
            : isVertical
            ? `translateY(${
                  target.moveDirection == 'down'
                      ? target.top + target.height
                      : target.moveDirection == 'up'
                      ? target.top
                      : 0
              }px)`
            : `translateX(${
                  target.moveDirection == 'right'
                      ? target.left + target.width
                      : target.moveDirection == 'left'
                      ? target.left
                      : 0
              }px)`

        return (
            <div
                data-placeholder={true}
                className="f-drag-area__placeholder"
                style={{ width, height, transform, position, marginLeft }}
            />
        )
    }

    const renderBuffer = () => {
        if (!showBufferAndPlaceholder) return null

        const width = isVertical ? target.width : origin.width
        const height = isVertical ? origin.height : target.height

        return (
            <div
                data-buffer={true}
                className="f-drag-area__buffer"
                style={{ width, height }}
            />
        )
    }

    const handleDragStart = (e) => {
        setTimeout(() => (documentObject.body.dataset.dragginganimation = 'yes'), startDelay)
    }

    const handleDragEnd = (e) => {
        delete documentObject.body.dataset.dragginganimation
    }

    useDragEvent('onstart', handleDragStart)
    useDragEvent('onend', handleDragEnd)
    useWindowEvent('mouseup', handleMouseUp)

    return (
        <View
            {...rest}
            id={id}
            ref={mergeRefs([ref, containerRef])}
            className={className}
            data-areaid={id}
            data-group={group}
            data-dragarea={true}
            data-direction={direction}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}>
            {renderChildren(props.children, (child: ReactElement, index: number) => {
                const indent = +child.props['data-indent'] || 0
                const isLast = lastIndex == index
                const isDragged = origin.index == index && origin.areaId == id
                const showFocused = target.focus && isTargetArea && index == target.index
                const showFirstPlaceholder = (isLinedFocus || isLined) && isTargetArea && index == target.index
                const showLastPlaceholder =
                    (isLinedFocus || isLined) && isTargetArea && index + 1 == target.index && isLast
                const noDrag = !!child.props['data-nodrag']

                return (
                    <div
                        data-index={index}
                        data-indent={indent}
                        data-areaid={id}
                        data-dragelement={true}
                        data-id={child.props['data-id']}
                        data-nodrop={child.props['data-nodrop']}
                        data-nodrag={child.props['data-nodrag']}
                        data-nofocus={child.props['data-nofocus']}
                        className={isDragged ? 'f-drag-area__element is-dragged' : 'f-drag-area__element'}
                        onMouseDown={(e) => (noDrag ? null : handleMouseDown(e, index))}
                        style={{
                            transform: isAnimated
                                ? isTargetArea && index >= target.index
                                    ? direction == 'vertical'
                                        ? `translateY(${origin.height}px)`
                                        : `translateX(${origin.width}px)`
                                    : null
                                : null,
                        }}>
                        {showFocused && isVertical && <div className="f-drag-area__element__lined-focus" />}
                        {showFirstPlaceholder && !showFocused && isVertical && (
                            <div className="f-drag-area__element__line is-vertical is-first" />
                        )}
                        {showLastPlaceholder && !showFocused && isVertical && (
                            <div className="f-drag-area__element__line is-vertical is-last" />
                        )}
                        {showFirstPlaceholder && isHorizontal && (
                            <div className="f-drag-area__element__line is-horizontal is-first" />
                        )}
                        {showLastPlaceholder && isHorizontal && (
                            <div className="f-drag-area__element__line is-horizontal is-last" />
                        )}
                        {child}
                    </div>
                )
            })}
            {renderPlaceholder()}
            {renderBuffer()}
            {footer}
        </View>
    )
})
