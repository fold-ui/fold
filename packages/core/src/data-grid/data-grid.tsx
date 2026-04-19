import { CoreViewProps, View, classNames, documentObject, positionDOMElement, useDrag, useEvent } from '../'
import { globalCursor, windowObject } from '../helpers'
import React, { ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { DataGridRow } from './data-grid-row'
import { DataGridContext } from './data-grid.provider'
import { DataGridTypes } from './data-grid.types'
import { useDataGridEvent } from './data-grid.util'

export type DataGridProps = {
    variant?: 'virtual' | 'default'
    virtual?: {
        rows: number
        rowHeight: number
        paddingTop: number
        paddingBottom: number
    }
    hideCheckbox?: boolean
    useAppScroll?: boolean
    rows: DataGridTypes.Cell[][]
    footer?: ReactNode
    header?: ReactNode
    pinFirst?: boolean
    pinLast?: boolean
    onCellUpdate?: (value) => void
    onCellDelete?: (value) => void
    onColumnMove?: (value) => void
    onRowMove?: (value) => void
    onScroll?: (value) => void
    toolbar?: (selection: any) => ReactNode
} & CoreViewProps

let xCache = 0
let yCache = 0
let moveThreshold = 2

export const F_DATA_GRID_GHOST = 'F_DATA_GRID_GHOST'
export const F_DATA_GRID_DRAG = 'F_DATA_GRID_DRAG'
export const F_DATA_GRID_ROW_HEIGHT = 'F_DATA_GRID_ROW_HEIGHT'

windowObject[F_DATA_GRID_GHOST] = null
windowObject[F_DATA_GRID_DRAG] = null
windowObject[F_DATA_GRID_ROW_HEIGHT] = null

export const DataGrid = (props: DataGridProps) => {
    const {
        variant = 'default',
        virtual = {
            rows: 10,
            rowHeight: 40,
            paddingTop: 40,
            paddingBottom: 0,
        },
        hideCheckbox,
        useAppScroll = true,
        rows = [],
        header,
        footer,
        pinFirst,
        pinLast,
        onCellUpdate,
        onCellDelete,
        onColumnMove,
        onRowMove,
        onScroll,
        toolbar,
        style = {},
        ...rest
    } = props
    const {
        cellSelection,
        setCellSelection,
        rowSelection,
        setRowSelection,
        dragRow,
        setDragRow,
        dragCol,
        setDragCol,
        setTotalRows,
        instanceId,
    } = useContext(DataGridContext)
    const iid = instanceId
    const isDefault = variant == 'default'
    const isVirtual = variant == 'virtual'
    const scrollRef = useRef(null)
    const { getGhostElement } = useDrag()
    const [scrollTop, setScrollTop] = useState(0)
    const isDragging = useMemo(() => dragCol != -1 || dragRow != -1, [dragRow, dragCol])
    const className = classNames(
        {
            'f-data-grid': true,
            'f-scrollbar': useAppScroll,
            'is-default': isDefault,
            'is-dragging': isDragging,
            'pin-first': pinFirst,
            'pin-last': pinLast,
        },
        [props.className]
    )

    const handleVirtualScroll = (e) => {
        setScrollTop(e.currentTarget.scrollTop)
        if (onScroll) onScroll(e)
    }

    const handleMouseUp = (e) => {
        const origin = windowObject[F_DATA_GRID_DRAG]

        if (dragCol != -1) {
            onColumnMove({
                origin,
                target: origin < dragCol ? dragCol - 1 : dragCol,
            })
        }
        if (dragRow != -1) {
            onRowMove({
                origin,
                target: origin < dragRow ? dragRow - 1 : dragRow,
            })
        }

        // reset drag parameters
        setDragCol(-1)
        setDragRow(-1)
        const ghostElement = getGhostElement()
        ghostElement.style.display = 'none'
    }

    const handleMouseMove = (e) => {
        if (!isDragging) return

        const rowDragged = dragRow != -1
        const colDragged = dragCol != -1
        let direction: 'right' | 'left' | 'up' | 'down' = undefined

        const mouseY = e.clientY
        const mouseX = e.clientX

        if (mouseX < xCache - moveThreshold) direction = 'left'
        if (mouseX > xCache - moveThreshold) direction = 'right'
        if (mouseY < yCache - moveThreshold) direction = 'up'
        if (mouseY > yCache - moveThreshold) direction = 'down'

        xCache = e.pageX
        yCache = e.pageY

        const element = documentObject.elementFromPoint(mouseX, mouseY)
        const index = rowDragged ? +element.dataset.row : colDragged ? +element.dataset.col : -1

        if (colDragged) setDragCol(index)
        if (rowDragged) setDragRow(index)

        const ghostElement = getGhostElement()
        ghostElement.style.display = 'block'
        ghostElement.style.opacity = '1'

        positionDOMElement(mouseX, mouseY, ghostElement, () => {})
    }

    const handleCellDelete = ({ detail: { instanceId, ...rest } }) => {
        if (iid == instanceId) onCellDelete({ ...rest })
    }

    const handleCellUpdate = ({ detail: { instanceId, ...rest } }) => {
        if (iid == instanceId) onCellUpdate({ ...rest })
    }

    const numItems = rows.length
    const itemHeight = virtual.rowHeight
    const maxHeight = virtual.rowHeight * (virtual.rows + 1)
    const innerHeight = numItems * itemHeight + virtual.paddingTop
    const height = (innerHeight < maxHeight ? innerHeight : maxHeight) + virtual.paddingBottom
    const startIndex = Math.floor(scrollTop / itemHeight)
    const endIndex = Math.min(numItems - 1, Math.floor((scrollTop + height) / itemHeight))
    const items: any = useMemo(() => {
        const items: any = []

        for (let index = startIndex; index <= endIndex; index++) {
            items.push(
                <DataGridRow
                    key={index}
                    index={index}
                    hideCheckbox={hideCheckbox}
                    columns={rows[index]}
                    style={{
                        position: 'absolute',
                        top: index * itemHeight + virtual.paddingTop,
                    }}
                />
            )
        }

        return items
    }, [startIndex, endIndex, numItems, itemHeight, rows])

    useEvent('mousemove', handleMouseMove)
    useEvent('mouseup', handleMouseUp)

    useDataGridEvent('delete-cell', handleCellDelete)
    useDataGridEvent('update-cell', handleCellUpdate)

    useEffect(() => {
        if (variant == 'virtual') windowObject[F_DATA_GRID_ROW_HEIGHT] = virtual.rowHeight
    }, [variant])

    useEffect(() => {
        setTotalRows(rows.length)
    }, [rows.length])

    return (
        <>
            <View
                {...rest}
                className={className}>
                {isVirtual && (
                    <div
                        ref={scrollRef}
                        id={instanceId + '-scrollview'}
                        style={{ height, '--f-data-grid-cell-height': virtual.rowHeight + 'px' } as any}
                        onScroll={handleVirtualScroll}
                        className={useAppScroll ? 'f-data-grid__list f-scrollbar' : 'f-data-grid__list'}>
                        <div
                            style={{ height: innerHeight }}
                            className="f-data-grid__scroll-spacer">
                            {header}
                            {items}
                        </div>
                        {footer}
                    </div>
                )}

                {isDefault && (
                    <>
                        {header}
                        {rows.map((columns, index) => (
                            <DataGridRow
                                key={index}
                                index={index}
                                hideCheckbox={hideCheckbox}
                                columns={columns}
                            />
                        ))}
                        {footer}
                    </>
                )}
            </View>

            {toolbar ? toolbar({ rowSelection, cellSelection }) : null}
        </>
    )
}
