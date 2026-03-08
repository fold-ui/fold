import React, {
    cloneElement,
    forwardRef,
    ReactElement,
    ReactPortal,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react'
import { PortalProps, useFocus, useId, View } from '..'
import {
    classNames,
    documentObject,
    getBoundingClientRect,
    getKey,
    getPopoutClass,
    isBoxOffScreen,
    mergeRefs,
    renderChildren,
} from '../helpers'
import { useEvent } from '../hooks/event.hook'
import { CoreViewProps, PopoutPosition } from '../types'
import { dispatchPopoverEvent } from './popover.event'

export * from './popover.event'

export const PopoverContent = forwardRef((props: CoreViewProps, ref) => (
    <View
        {...props}
        ref={ref}
    />
))

export type PopoverAnchor = PopoutPosition

export type PopoverProps = {
    /**
     * @description Be careful as this can have unintended consequences with other elements
     */
    hardEscape?: boolean
    ignoreContainers?: string[]
    __focusTrapTimeoutDelay?: number
    __blockDismissEvent?: boolean
    focusTrap?: boolean
    preventFocusScroll?: boolean
    targetId?: string
    fixPosition?: { top: number; left: number }
    arrow?: boolean
    anchor?: PopoverAnchor
    anchorProps?: any
    content?: ReactElement | any
    isVisible?: boolean
    onDismiss?: any
    portal?: (props: PortalProps) => React.ReactPortal
    preferredHorizontalAnchor?: 'left' | 'center' | 'right'
    preferredVerticalAnchor?: 'top' | 'middle' | 'bottom'
} & CoreViewProps

export const Popover = forwardRef((props: PopoverProps, ref) => {
    const {
        hardEscape,
        ignoreContainers = [],
        __focusTrapTimeoutDelay = 100,
        __blockDismissEvent = false,
        focusTrap = true,
        preventFocusScroll,
        targetId,
        fixPosition,
        anchorProps = {},
        arrow = false,
        anchor,
        content,
        isVisible,
        onDismiss,
        preferredHorizontalAnchor,
        preferredVerticalAnchor,
        portal,
        ...rest
    } = props
    const containerRef = useRef(null)
    const childRef = useRef(null)
    const [box, setBox] = useState<any>({})
    const [ready, setReady] = useState(false)
    const [finalAnchor, setFinalAnchor] = useState('')
    const id = useId(targetId)
    const showPopover = isVisible && id && !!finalAnchor
    const isFixed = !!fixPosition
    const { trapFocus } = useFocus()
    const className = classNames(
        {
            'f-popover': true,
            'has-arrow': arrow,
            'is-ready': ready,
            'is-fixed': isFixed,
        },
        [props.className, getPopoutClass(finalAnchor)]
    )

    const dismissPopover = (e, refocus = true) => {
        if (__blockDismissEvent) {
            e.preventDefault()
            e.stopPropagation()
        }
        dispatchPopoverEvent('ondismiss', e)
        onDismiss(e)
        setReady(false)
        if (refocus) childRef.current?.focus()
    }

    const handleKeyDownDocument = (e) => {
        if (hardEscape) {
            const { isEscape } = getKey(e)
            if (isEscape && onDismiss) dismissPopover(e, false)
        }
    }

    const handleKeyDown = (e) => {
        if (!hardEscape) {
            const { isEscape } = getKey(e)
            if (isEscape && onDismiss) dismissPopover(e)
        }
    }

    const handleClick = (e) => {
        const containers: any = []
        let shouldDismiss = true
        const target = e.target as HTMLElement | null

        // add dom elements to the container
        if (ignoreContainers.length) {
            ignoreContainers.map((id) => containers.push(documentObject.getElementById(id)))
        }

        containers.map((container) => {
            if (container?.contains(target) && shouldDismiss) {
                shouldDismiss = false
            }
        })

        if (containerRef.current && target) {
            const nestedPopover = target.closest('.f-popover') as HTMLElement | null
            const nestedPopoverId = nestedPopover?.getAttribute('data-popover-id')
            const nestedPopoverTrigger = nestedPopoverId ? documentObject.getElementById(nestedPopoverId) : null
            const isNestedPopoverClick =
                !!nestedPopover &&
                nestedPopover !== containerRef.current &&
                !!nestedPopoverTrigger &&
                containerRef.current?.contains(nestedPopoverTrigger)

            if (!containerRef.current?.contains(target) && !isNestedPopoverClick) {
                if (onDismiss && shouldDismiss) dismissPopover(e)
            }
        }
    }

    const renderPopover = () => {
        return (
            <div
                onKeyDown={handleKeyDown}
                className="f-popover__anchor"
                style={{
                    transform: `translate(${box.left}px, ${box.top}px)`,
                    width: box.width,
                    height: box.height,
                    position: isFixed || !!portal ? 'fixed' : 'absolute',
                }}
                {...anchorProps}>
                <View
                    {...rest}
                    tabIndex={0}
                    onKeyDown={handleKeyDown}
                    aria-describedby={id}
                    className={className}
                    data-popover-id={id}
                    ref={mergeRefs([ref, containerRef])}>
                    {content}
                </View>
            </div>
        )
    }

    useEvent('click', handleClick, true)
    useEvent('keydown', handleKeyDownDocument, true)

    useLayoutEffect(() => {
        if (!id) return
        if (!isVisible) return

        const childEl = childRef.current || documentObject.getElementById(id)
        const popoverEl = containerRef.current
        const childRect = getBoundingClientRect(childEl)
        const popoverRect = getBoundingClientRect(popoverEl)
        const box = {
            top: fixPosition ? fixPosition.top : portal ? childRect.top : childEl.offsetTop,
            left: fixPosition ? fixPosition.left : portal ? childRect.left : childEl.offsetLeft,
            width: fixPosition ? 1 : childEl.offsetWidth,
            height: fixPosition ? 1 : childEl.offsetHeight,
        }
        const offscreen = isBoxOffScreen({
            top: fixPosition ? fixPosition.top : childRect.bottom,
            left: fixPosition ? fixPosition.left : childRect.left,
            width: popoverRect.width,
            height: popoverRect.height,
        })

        const horizontal = offscreen.x
            ? 'right'
            : !!preferredHorizontalAnchor && preferredHorizontalAnchor != 'left'
            ? preferredHorizontalAnchor
            : 'left'
        const vertical = offscreen.y
            ? 'top'
            : !!preferredVerticalAnchor && preferredVerticalAnchor != 'bottom'
            ? preferredVerticalAnchor
            : 'bottom'
        const autoPosition = `${vertical}-${horizontal}`
        const finalAnchor = anchor ? anchor : autoPosition

        setBox(box)
        setReady(!!Object.keys(popoverRect).length)
        setFinalAnchor(finalAnchor)

        // adjust for the top going offscreen
        if (!finalAnchor) return
        if (!containerRef.current) return

        // only focus on top vertical for now
        // TODO: extend for horizontal (less likely - except mobile!)
        if (finalAnchor.includes('top')) {
            const { height } = popoverRect
            const top = box.top - height
            if (top < 0) containerRef.current.style.top = top * -1 + 'px'
        }

        return () => containerRef.current?.style.removeProperty('top')
    }, [showPopover, content, fixPosition, props.children, ready, portal])

    useEffect(() => {
        if (focusTrap && showPopover && containerRef.current) {
            // give react & the browser some time to mount
            setTimeout(() => trapFocus(containerRef.current, preventFocusScroll), __focusTrapTimeoutDelay)
        }
    }, [showPopover, preventFocusScroll])

    return (
        <>
            {renderChildren(props.children, (child) => {
                return cloneElement(child, {
                    ...child.props,
                    ref: mergeRefs([child.ref, childRef]),
                    id: child.props.id || id,
                })
            })}

            {showPopover && !portal && renderPopover()}

            {showPopover && !!portal && <props.portal>{renderPopover()}</props.portal>}
        </>
    )
})
