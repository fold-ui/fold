import React, { FunctionComponent, ReactNode, useContext, useLayoutEffect, useRef } from 'react'
import {
    CommonProps,
    ContextMenuContext,
    ResizableRail,
    classNames,
    getBoundingClientRect,
    useDrag,
    windowObject,
} from '../'
import { F_DATA_GRID_DRAG } from './data-grid'
import { DataGridHeaderCellComponent } from './data-grid-header-cell-component'
import { DataGridContext } from './data-grid.provider'

export type DataGridHeaderCellProps = {
    index?: number
    id?: string
    label?: string
    disabled?: boolean
    menu?: boolean
    align?: 'left' | 'right' | 'center'
    prefix?: ReactNode
    suffix?: ReactNode
    sortOrder?: 'ASC' | 'DESC'
    component?: FunctionComponent
    onClick?: (value) => void
    onWidthChange?: (value) => void
    disableWidthChange?: boolean
    disableDrag?: boolean
} & CommonProps

export const DataGridHeaderCell = (props: DataGridHeaderCellProps) => {
    const ref = useRef(null)
    const { setMenu } = useContext(ContextMenuContext)
    const { setDragCol, dragCol, draggableColumns } = useContext(DataGridContext)
    const {
        index,
        id,
        label,
        disabled,
        menu,
        align,
        prefix,
        suffix,
        sortOrder,
        component = DataGridHeaderCellComponent,
        onClick,
        onWidthChange,
        disableWidthChange,
        disableDrag,
    } = props
    const Component: any = component
    const { setGhostElement, setCustomGhostElementRotation } = useDrag()
    const timeoutRef = useRef(null)
    const className = classNames({
        'f-data-grid-header-cell': true,
        'is-disabled': disabled,
        'is-selected': false,
        'is-col-dragged': index == dragCol,
    })

    const handleChange = ({ x, y }) => {
        const box = getBoundingClientRect(ref.current)
        const value = x - box.left
        const width = Math.min(Math.max(value, 50), 10000)
        onWidthChange(width + 'px')
    }

    const handleContextMenuClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setMenu({ target: 'header-cell', payload: props }, { x: e.clientX, y: e.clientY })
    }

    const handleMouseUp = (e) => {
        clearTimeout(timeoutRef.current)
    }

    const handleMouseDown = (e) => {
        timeoutRef.current = setTimeout(() => {
            if (draggableColumns && !disableDrag) {
                windowObject[F_DATA_GRID_DRAG] = index - 1
                setDragCol(index)
                setCustomGhostElementRotation('0deg')
                setGhostElement(`
                    <div class="f-card" style="padding: 0.5rem 1rem;">
                        <span class="f-text">
                            ${label}
                        </span>
                    </div>
                `)
            }
        }, 150)
    }

    useLayoutEffect(() => {
        const el: any = ref.current
        if (el) el.addEventListener('contextmenu', handleContextMenuClick)
        return () => el.removeEventListener('contextmenu', handleContextMenuClick)
    })

    return (
        <div
            ref={ref}
            data-col={index}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            className={className}>
            <Component
                id={id}
                label={label}
                sortOrder={sortOrder}
                prefix={prefix}
                suffix={suffix}
                menu={menu}
                align={align}
                onClick={onClick}>
                {props.children}
            </Component>

            {!disableWidthChange && (
                <ResizableRail
                    transparent
                    position="end"
                    direction="horizontal"
                    onChange={handleChange}
                    handle={<></>}
                />
            )}
        </div>
    )
}
