import React, { DetailedHTMLProps, forwardRef, useMemo, useRef } from 'react'
import { classNames, getButton, mergeRefs, useDrag } from '../'

export type DragElementProps = {
    id?: string
    onlyIndentDataAttr?: boolean
    indent?: number
    noDrop?: boolean
    noDrag?: boolean
    noFocus?: boolean
    noIndent?: boolean
    dragThreshold?: number
} & Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'indent'>

export const DragElement = forwardRef((props: DragElementProps, ref) => {
    const {
        id,
        indent = 0,
        noIndent,
        onlyIndentDataAttr,
        noDrop,
        noDrag,
        noFocus,
        style = {},
        dragThreshold = 3,
        ...rest
    } = props
    const fallbackDisplay = useMemo(() => style.display, [style])
    const { onMouseDown, onMouseUp, onMouseDownExplicit, getCache } = useDrag()
    const elementRef = useRef(null)
    const styles = useMemo(
        () => ({
            ...style,
            width: indent && !onlyIndentDataAttr ? `calc(100% - var(--f-drag-indent) * ${indent})` : '100%',
            marginLeft:
                indent && !noIndent && !onlyIndentDataAttr ? `calc(var(--f-drag-indent) * ${indent})` : undefined,
        }),
        [style, indent]
    )
    const className = classNames(
        {
            'f-drag-element': true,
        },
        [props.className]
    )

    // this is the start of the new drag start logic
    // it calculates the area of movement before registering the click
    // if it moves out of range, we assume it's a drag-start
    const isDragging = useRef(false)
    const startPos = useRef({ x: 0, y: 0 })

    const handleMouseDown = (e) => {
        isDragging.current = false
        startPos.current = { x: e.clientX, y: e.clientY }
        const cache = getCache()

        const { isLeftButton } = getButton(e)
        const { clientX, clientY, currentTarget } = e

        if (!noDrag && isLeftButton && !cache.locked) {
            e.stopPropagation()
        }

        const handleMouseMove = (moveEvent: MouseEvent) => {
            const dx = moveEvent.clientX - startPos.current.x
            const dy = moveEvent.clientY - startPos.current.y

            if (Math.abs(dx) > dragThreshold || Math.abs(dy) > dragThreshold) {
                if (!isDragging.current) {
                    if (props.onMouseDown) props.onMouseDown(e)

                    onMouseDownExplicit({
                        isLeftButton,
                        clientX,
                        clientY,
                        currentTarget,
                    })

                    isDragging.current = true
                }
            }
        }

        const handleMouseUp = (upEvent) => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)

            if (!isDragging.current && props.onClick && isLeftButton) {
                props.onClick(upEvent)
            }
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
    }

    // previous code, kept as backup
    // const handleMouseDown = (e) => {
    //     if (props.onMouseDown) props.onMouseDown(e)
    //     onMouseDown(e, startDelay)
    // }

    const handleMouseUp = (e) => {
        if (props.onMouseUp) props.onMouseUp(e)
        onMouseUp(e)
    }

    return (
        <div
            {...rest}
            id={id}
            data-id={id}
            data-indent={indent}
            data-nodrop={noDrop}
            data-nodrag={noDrag}
            data-nofocus={noFocus}
            data-fallbackdisplay={fallbackDisplay} // see DragElementArea
            data-dragelement={true}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            style={styles}
            ref={mergeRefs([ref, elementRef])}
            className={className}>
            {props.children}
        </div>
    )
})
