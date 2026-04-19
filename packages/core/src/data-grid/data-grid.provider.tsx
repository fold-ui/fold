import { documentObject, getKey, useEvent, useId, windowObject } from '../'
import React, {
    FunctionComponent,
    ReactElement,
    ReactNode,
    createContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import { dispatchDataGridEvent, useDataGridEvent } from './data-grid.util'
import { F_DATA_GRID_ROW_HEIGHT } from './data-grid'

export type DataGridProviderProps = {
    id?: string
    columnWidths: any[]
    columnTypes?: (FunctionComponent | undefined)[]
    defaultCellSelection?: any
    defaultRowSelection?: any
    draggableColumns?: boolean
    draggableRows?: boolean
    maxRowsSelectable?: number
    singleRowSelect?: boolean
    onSelect?: (value) => void
    children?: ReactNode
}

export const DataGridContext = createContext<any>({})

export const DataGridProvider = (props: DataGridProviderProps) => {
    const {
        id,
        children,
        defaultCellSelection = {},
        defaultRowSelection = {},
        draggableColumns,
        draggableRows,
        maxRowsSelectable = 0,
        singleRowSelect = false,
        columnWidths,
        columnTypes,
        onSelect,
    } = props
    const ref = useRef(null)
    const instanceId = useId(id)
    const selectionLockRef = useRef(false)
    const iid = instanceId
    const cellSelectionCache = useRef(null)
    const [isShift, setIsShift] = useState(false)
    const [dragCol, setDragCol] = useState(-1)
    const [dragRow, setDragRow] = useState(-1)
    const [cellSelection, setCellSelection] = useState(defaultCellSelection)
    const [rowSelection, setRowSelection] = useState(defaultRowSelection)
    const [totalRows, setTotalRows] = useState(0)
    const [totalColumns, setTotalColumns] = useState(0)
    const { allRowsSelected, rowSelectionIndeterminate } = useMemo(() => {
        const totalSelected = Object.keys(rowSelection).length
        const allRowsSelected = totalSelected == totalRows
        const rowSelectionIndeterminate = totalSelected > 0 && totalSelected != totalRows
        return { allRowsSelected, rowSelectionIndeterminate }
    }, [rowSelection, totalRows])
    const styles: any = useMemo(() => {
        return { '--f-data-grid-columns': `var(--f-data-grid-gutter-width) ${columnWidths.join(' ')}` }
    }, [columnWidths])

    const selectionLock = (locked) => {
        selectionLockRef.current = locked
    }

    const refocus = () => {
        ref.current.focus()
    }

    const handleKeyUp = (e) => {
        setIsShift(false)
    }

    const handleBlur = (e) => {
        cellSelectionCache.current = cellSelection
    }

    const handleDocumentClick = (e) => {
        if (!ref.current.contains(e?.target)) {
            setCellSelection({})
        }
    }

    const handleFocus = (e) => {
        if (cellSelectionCache.current) {
            setCellSelection(cellSelectionCache.current)
            cellSelectionCache.current = null
        }
    }

    const handleKeyDown = (e) => {
        const { isShift, isEscape } = getKey(e)
        setIsShift(isShift)
        if (isEscape) {
            // TODO: is this correct UX?
            // setCellSelection({})
        }
    }

    const scrollIntoView = (row, col) => {
        const rowHeight = windowObject[F_DATA_GRID_ROW_HEIGHT]
        const id = instanceId + '-scrollview'

        // only virtual lists will have row height
        // the default list will be scrolled used the focus() logic on each cell
        if (!!rowHeight) {
            const container = documentObject.getElementById(id)
            const amount = container.offsetHeight / 2
            const top = row * rowHeight

            // scroll up
            // add rowHeight to make it go right to the edge
            if (top + rowHeight < container.scrollTop) {
                container.scrollTo({
                    top: top - amount,
                    behaviour: 'smooth',
                })
            }

            // scroll down
            if (top > container.scrollTop + container.offsetHeight) {
                container.scrollTo({
                    top: top + amount,
                    behaviour: 'smooth',
                })
            }
        }
    }

    const handleKeyDownContainer = (e) => {
        const { isLeft, isRight, isUp, isDown } = getKey(e)

        if ((isLeft || isRight || isUp || isDown) && selectionLockRef.current == false) {
            e.preventDefault()
            e.stopPropagation()

            const selection = Object.keys(cellSelection)

            if (selection[0]) {
                const parts = selection[0].split('-')
                const row = +parts[1]
                const col = +parts[2]

                if (isDown) {
                    const nextRow = row + 1 > totalRows ? 0 : row + 1
                    setCellSelection({ [`c-${nextRow}-${col}`]: true })
                    scrollIntoView(nextRow, col)
                }

                if (isUp) {
                    const prevRow = row - 1 < 0 ? totalRows - 1 : row - 1
                    setCellSelection({ [`c-${prevRow}-${col}`]: true })
                    scrollIntoView(prevRow, col)
                }

                if (isRight) {
                    const nextCol = col + 1 > totalColumns ? 0 : col + 1
                    setCellSelection({ [`c-${row}-${nextCol}`]: true })
                    scrollIntoView(row, nextCol)
                }

                if (isLeft) {
                    const prevCol = col - 1 < 0 ? totalColumns - 1 : col - 1
                    setCellSelection({ [`c-${row}-${prevCol}`]: true })
                    scrollIntoView(row, prevCol)
                }
            } else if (cellSelectionCache.current) {
                setCellSelection(cellSelectionCache.current)
            } else {
                setCellSelection({ 'c-0-0': true })
            }
        }
    }

    const handleCellSelection = (selection) => {
        setCellSelection(isShift ? { ...cellSelection, ...selection } : selection)
    }

    const updateRowSelection = (selection) => {
        setRowSelection(selection)
        dispatchDataGridEvent('row-selection', { instanceId, selection })
    }

    const selectAllRows = () => {
        if (allRowsSelected) {
            updateRowSelection({})
        } else {
            // if there is max rows specified
            // + max rows must = total rows
            if (!!maxRowsSelectable && maxRowsSelectable != totalRows) return
            const ids = {}
            new Array(totalRows).fill(null).map((_, index) => {
                const id = `r-${index}`
                ids[id] = true
            })
            updateRowSelection(ids)
        }
    }

    const handleClearRowSelection = ({ detail: { instanceId } }) => {
        if (iid == instanceId) setRowSelection({})
    }

    const handleSelectRows = ({ detail: { instanceId, ...rest } }) => {
        if (iid == instanceId) setRowSelection({ ...rest })
    }

    const handleSelectCells = ({ detail: { instanceId, ...rest } }) => {
        if (iid == instanceId) setCellSelection({ ...rest })
    }

    useDataGridEvent('clear-row-selection', handleClearRowSelection)
    useDataGridEvent('select-rows', handleSelectRows)
    useDataGridEvent('select-cells', handleSelectCells)

    useEvent('keydown', handleKeyDown)
    useEvent('keyup', handleKeyUp)
    useEvent('click', handleDocumentClick)

    useEffect(() => {
        if (onSelect) {
            onSelect({
                rows: rowSelection,
                cells: cellSelection,
            })
        }
    }, [rowSelection, cellSelection])

    return (
        <DataGridContext.Provider
            value={{
                cellSelection,
                rowSelection,
                setCellSelection: handleCellSelection,
                setRowSelection,
                rowSelectionIndeterminate,
                allRowsSelected,
                selectAllRows,
                maxRowsSelectable,
                singleRowSelect,
                dragCol,
                setDragCol,
                dragRow,
                setDragRow,
                draggableColumns,
                draggableRows,
                setTotalRows,
                setTotalColumns,
                refocus,
                selectionLock,
                instanceId,
                columnTypes,
            }}>
            <div
                ref={ref}
                tabIndex={0}
                style={styles}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDownContainer}
                className="f-data-grid-container">
                {children}
            </div>
        </DataGridContext.Provider>
    )
}
