import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import {
    Button,
    CsvImporterContext,
    CsvImporterValidationPopup,
    DataGrid,
    DataGridHeader,
    DataGridProvider,
    Dialog,
    FIBin,
    F_CSV_MAPPER_CACHE,
    Flexer,
    Icon,
    Portal,
    Text,
    View,
    arrayMove,
    columnSortFunc,
    dispatchDataGridEvent,
    useId,
    useVisibility,
} from '../'

export type CsvImporterDataCleanProps = {}

const validationColor = '#f56565'

export const CsvImporterDataClean = (props: CsvImporterDataCleanProps) => {
    const {
        schema,
        mapping,
        records,
        options: {
            text: { dialog },
        },
    } = useContext(CsvImporterContext)
    const id = useId()
    const schemaColsCache = useRef(null)
    const { visible, show, hide } = useVisibility(false)
    const rowSelectionCache = useRef({ r1: true })
    const [columns, setColumns] = useState([])
    const [columnWidths, setColumnWidths] = useState([])
    const [validationIndex, setValidationIndex] = useState<any>(-1)
    const [validationMessages, setValidationMessages] = useState([])
    const [rows, setRows] = useState([])
    const { validationMessage, totalValidationMessages, showValidationPopup } = useMemo(() => {
        return {
            validationMessage: validationMessages[validationIndex],
            totalValidationMessages: validationMessages.length,
            showValidationPopup: validationIndex != -1,
        }
    }, [validationMessages, validationIndex])

    const handleValidationPrevious = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setValidationIndex(validationIndex - 1)
    }

    const handleValidationNext = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setValidationIndex(validationIndex + 1)
    }

    const handleRowsDelete = (e) => {
        e.preventDefault()
        e.stopPropagation()

        const updatedRows = [...rows]
        const rowsSelected = Object.keys(rowSelectionCache.current).map((r) => +r.replace('r', ''))

        for (let i = rowsSelected.length - 1; i >= 0; i--) updatedRows.splice(rowsSelected[i], 1)

        setRows([...updatedRows])
        dispatchDataGridEvent('clear-row-selection', { instanceId: id })
        hide()
    }

    const handleSelect = (selection: any) => {
        const { cells } = selection
        const cell = Object.keys(cells)[0]

        if (!cell) return

        const [_, row, col] = cell.split('-')
        const validationIndex = validationMessages.findIndex((validationMessage: any) => {
            return validationMessage.row == row && validationMessage.col == col
        })

        setValidationIndex(validationIndex)
    }

    const handleScroll = (e) => {
        if (showValidationPopup) setValidationIndex(-1)
    }

    const getIndexes = () => Object.keys(mapping).map((k) => +k)

    const getSchemaCols = () => {
        if (!schemaColsCache.current) {
            const indexes = getIndexes()
            schemaColsCache.current = indexes.map((index) => {
                const schemaKey = mapping[index]
                const schemaField = schema.find((s) => s.key == schemaKey)
                return schemaField
            })
        }
        return schemaColsCache.current
    }

    const handleColumnMove = ({ origin, target }) => {
        setColumnWidths(arrayMove(columnWidths, origin, target))
        setColumns(arrayMove(columns, origin, target))
        setRows(rows.map((row) => arrayMove(row, origin, target)))
    }

    const handleRowMove = ({ origin, target }) => {
        setRows(arrayMove(rows, origin, target))
    }

    const handleColumnClick = (index, column) => {
        const newRows = [...rows]
        const schemaCols = getSchemaCols()
        const validationMessages = []

        // if ASC is already set, then we want to reverse it for DESC
        // otherwise if it's DESC or undefined, we simply sort it normally
        if (column.sortOrder == 'ASC') {
            newRows.reverse()
        } else {
            newRows.sort(columnSortFunc(index, column.options.type))
        }

        setRows(
            newRows.map((row, index1) => {
                return row.map((col, index2) => {
                    const value = schemaCols[index2].transform ? schemaCols[index2].transform(col) : col.value
                    const validation: string[] = schemaCols[index2].validate ? schemaCols[index2].validate(col) : []
                    const error = !!validation.length

                    if (error) {
                        validationMessages.push({
                            messages: validation,
                            row: index1,
                            col: index2,
                        })
                    }

                    return {
                        value,
                        icon: error ? 'warning' : undefined,
                        color: error ? validationColor : undefined,
                    }
                })
            })
        )

        setValidationMessages(validationMessages)
        setValidationIndex(-1)

        // update sort order
        setColumns(
            columns.map((c: any, i) => {
                if (index == i) {
                    return {
                        ...c,
                        sortOrder: c.sortOrder == 'ASC' ? 'DESC' : 'ASC',
                    }
                } else {
                    return {
                        ...c,
                        sortOrder: undefined,
                    }
                }
            })
        )
    }

    const removeValidation = ({ row, col }) => {
        setValidationMessages(
            validationMessages.filter((vm) => {
                return !(vm.row == row && vm.col == col)
            })
        )
    }

    const updateValidation = ({ validation, row, col }) => {
        let updated = false
        let messages = validationMessages.map((vm) => {
            if (vm.row == row && vm.col == col) {
                updated = true
                return { ...vm, messages: validation }
            } else {
                return vm
            }
        })
        if (!updated) messages = [...messages, { messages: validation, row, col }]
        setValidationMessages(messages)
    }

    const handleCellUpdate = ({ value, row, col }) => {
        const schemaCols = getSchemaCols()

        setValidationIndex(-1)
        setRows(
            rows.map((r, i1) => {
                if (i1 == row) {
                    return r.map((c, i2) => {
                        if (i2 == col) {
                            const validation: string[] = schemaCols[i2].validate
                                ? schemaCols[i2].validate({ value })
                                : []
                            const error = !!validation.length

                            if (error) updateValidation({ validation, row, col })
                            if (!error) removeValidation({ row, col })

                            return {
                                ...c,
                                value,
                                icon: error ? 'warning' : undefined,
                                color: error ? validationColor : undefined,
                            }
                        } else {
                            return c
                        }
                    })
                } else {
                    return r
                }
            })
        )
    }

    const handleCellDelete = ({ row, col }) => {
        const schemaCols = getSchemaCols()
        const value = ''

        setValidationIndex(-1)
        setRows(
            rows.map((r, i1) => {
                if (i1 == row) {
                    return r.map((c, i2) => {
                        if (i2 == col) {
                            const validation: string[] = schemaCols[i2].validate
                                ? schemaCols[i2].validate({ value })
                                : []
                            const error = !!validation.length

                            if (error) updateValidation({ validation, row, col })
                            if (!error) removeValidation({ row, col })

                            return {
                                ...c,
                                value,
                                icon: error ? 'warning' : undefined,
                                color: error ? validationColor : undefined,
                            }
                        } else {
                            return c
                        }
                    })
                } else {
                    return r
                }
            })
        )
    }

    // rows
    useEffect(() => {
        const validationMessages = []
        const indexes = getIndexes()
        const schemaCols = getSchemaCols()
        const rows = records
            .filter((record) => !!record.length)
            .map((record) => indexes.map((index) => record[index]))
            .map((row, index1) => {
                return row.map((col, index2) => {
                    const value = schemaCols[index2].transform ? schemaCols[index2].transform(col) : col.value
                    const validation: string[] = schemaCols[index2].validate ? schemaCols[index2].validate(col) : []
                    const error = !!validation.length

                    if (error) {
                        validationMessages.push({
                            messages: validation,
                            row: index1,
                            col: index2,
                        })
                    }

                    return {
                        value,
                        icon: error ? 'warning' : undefined,
                        color: error ? validationColor : undefined,
                    }
                })
            })

        setRows(rows)
        setValidationMessages(validationMessages)
        setValidationIndex(-1)

        window[F_CSV_MAPPER_CACHE] = rows
    }, [schema, mapping, records])

    // columns
    useEffect(() => {
        const columnWidths = []
        const schemaCols = getSchemaCols()
        const columns = schemaCols.map((schemaField, index) => {
            columnWidths.push('150px')
            const { key, label, type = 'string' } = schemaField
            return { id: key, label, options: { type } }
        })

        setColumns(columns)
        setColumnWidths(columnWidths)
    }, [schema, mapping])

    // cache saving
    useEffect(() => {
        window[F_CSV_MAPPER_CACHE] = rows
    }, [rows])

    return (
        <>
            {!!totalValidationMessages && showValidationPopup && (
                <CsvImporterValidationPopup
                    validationMessage={validationMessage}
                    // unused:
                    totalValidationMessages={totalValidationMessages}
                    validationIndex={validationIndex}
                    onPrevious={handleValidationPrevious}
                    onNext={handleValidationNext}
                />
            )}

            <Dialog
                closeButton
                isVisible={visible}
                title={dialog.title}
                description={dialog.description}
                onDismiss={hide}
                portal={Portal}
                footer={
                    <View
                        row
                        gap={10}
                        width="100%">
                        <Button onClick={hide}>{dialog.cancel}</Button>
                        <Flexer />
                        <Button
                            onClick={handleRowsDelete}
                            variant="danger"
                            outline>
                            {dialog.confirm}
                        </Button>
                    </View>
                }
            />

            <DataGridProvider
                id={id}
                defaultCellSelection={{}}
                defaultRowSelection={{}}
                draggableColumns={false}
                draggableRows={false}
                columnWidths={columnWidths}
                onSelect={handleSelect}>
                <DataGrid
                    pinFirst
                    onScroll={handleScroll}
                    variant="virtual"
                    virtual={{
                        rows: 10,
                        rowHeight: 40,
                        paddingTop: 40,
                        paddingBottom: 0,
                    }}
                    hideCheckbox={false}
                    rows={rows}
                    header={
                        <DataGridHeader
                            resizableColumns
                            columns={columns}
                            onColumnClick={handleColumnClick}
                            onWidthChange={(index, width) =>
                                setColumnWidths(columnWidths.map((w, i) => (i == index ? width : w)))
                            }
                        />
                    }
                    onCellUpdate={handleCellUpdate}
                    onCellDelete={handleCellDelete}
                    onColumnMove={handleColumnMove}
                    onRowMove={handleRowMove}
                    toolbar={({ rowSelection, cellSelection }) => (
                        <View
                            row
                            position="absolute"
                            bgToken="surface-inverse"
                            colorToken="text-on-color"
                            p="1rem 2rem"
                            radius="var(--f-radius)"
                            shadow="var(--f-shadow-xl)"
                            zIndex={1000}
                            gap={10}
                            display={!Object.keys(rowSelection).length ? 'none' : 'flex'}
                            style={{ bottom: 10, left: '50%', transform: 'translateX(-50%)' }}>
                            <Text color="inherit">
                                Delete {Object.keys(rowSelection).length}{' '}
                                {Object.keys(rowSelection).length == 1 ? 'row' : 'rows'}
                            </Text>
                            <Icon
                                icon={FIBin}
                                className="f-buttonize"
                                onClick={(e) => {
                                    rowSelectionCache.current = { ...rowSelection }
                                    show(e)
                                }}
                            />
                        </View>
                    )}
                />
            </DataGridProvider>
        </>
    )
}
