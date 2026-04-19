import { Checkbox, CommonProps, classNames, useDrag, windowObject } from '../'
import React, { useContext, useMemo, useRef } from 'react'
import { DataGridContext } from './data-grid.provider'
import { dispatchDataGridEvent } from './data-grid.util'
import { DataGridCell } from './data-grid-cell'
import { DataGridDefaultCellComponent } from './data-grid-default-cell-component'
import { DataGridTypes, F_DATA_GRID_DRAG, F_DATA_GRID_GHOST } from '../'

export type DataGridRowProps = {
    sticky?: boolean
    columns: DataGridTypes.Cell[]
    index: number
    hideCheckbox?: boolean
} & CommonProps

export const DataGridRow = (props: any) => {
    const { columns, index, hideCheckbox, ...rest } = props
    const {
        rowSelection,
        setRowSelection,
        cellSelection,
        setCellSelection,
        rowSelectionIndeterminate,
        allRowsSelected,
        selectAllRows,
        maxRowsSelectable,
        singleRowSelect,
        dragCol,
        setDragRow,
        dragRow,
        draggableRows,
        instanceId,
    } = useContext(DataGridContext)
    const id = `r-${index}`
    const ref = useRef(null)
    const timeoutRef = useRef(null)
    const { setGhostElement, setCustomGhostElementRotation } = useDrag()
    const selected = useMemo(() => !!rowSelection[id], [rowSelection])
    const showCheckbox = useMemo(() => !hideCheckbox, [hideCheckbox])
    const className = classNames({
        'f-data-grid-row': true,
        'is-selected': selected,
        'is-draggable': draggableRows,
        'is-row-dragged': index == dragRow,
    })

    const handleCellSelection = (selection) => {
        setCellSelection(selection)
    }

    const updateRowSelection = (selection) => {
        setRowSelection(selection)
        dispatchDataGridEvent('row-selection', { instanceId, selection })
    }

    const handleRowSelect = (e) => {
        if (selected) {
            const updatedRowSelection = { ...rowSelection }
            delete updatedRowSelection[id]
            updateRowSelection(updatedRowSelection)
        } else {
            // if there is max rows specified
            // + max rows must be <= current selection
            const numRowsSelected = Object.keys(rowSelection).length
            if (!!maxRowsSelectable && maxRowsSelectable <= numRowsSelected) return

            if (singleRowSelect) {
                updateRowSelection({ [id]: true })
            } else {
                updateRowSelection({ ...rowSelection, [id]: true })
            }
        }
    }

    const handleMouseUp = (e) => {
        clearTimeout(timeoutRef.current)
    }

    const handleMouseDown = (e) => {
        if (e.target != e.currentTarget) return

        timeoutRef.current = setTimeout(() => {
            if (draggableRows) {
                windowObject[F_DATA_GRID_DRAG] = index
                setDragRow(index)
                setCustomGhostElementRotation('0deg')
                setGhostElement(`
                    <div class="f-card" style="padding: 0.5rem 1rem;">
                        <span class="f-text">
                            ${columns[0].value}
                        </span>
                    </div>
                `)
            }
        }, 150)
    }

    return (
        <div
            ref={ref}
            data-row={index}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            className={className}
            {...rest}>
            <DataGridCell
                index={0}
                id={`c-${index}`}
                disableSelect
                onSelect={() => null}
                component={DataGridDefaultCellComponent}>
                <span className="f-data-grid-row__gutter-number">{index + 1}</span>

                {showCheckbox && (
                    <Checkbox
                        id={`c-${index}-checkbox`}
                        checked={selected}
                        onChange={handleRowSelect}
                    />
                )}
            </DataGridCell>

            {columns.map((cell, index1) => {
                const id = `c-${index}-${index1}`
                const selected = !!cellSelection[id]

                return (
                    <DataGridCell
                        {...cell}
                        id={id}
                        key={id}
                        index={index1 + 1}
                        selected={selected}
                        onSelect={handleCellSelection}
                    />
                )
            })}
        </div>
    )
}
