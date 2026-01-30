import { Button, IconLib, Menu, MenuItem, View, useDialog } from '@fold-ui/core'
import React from 'react'

export const KanbanColumnMenu = (props: any) => {
    const { column, onSave, onDelete, onEdit, colorPalette } = props
    const { setDialog, closeDialog } = useDialog()

    const handleCollapse = (collapsed) => {
        onSave({ collapsed })
    }

    const handleDelete = (e) => {
        setDialog({
            title: 'Are you sure?',
            description: 'This action cannot be undone.',
            footer: (
                <View
                    width="100%"
                    row
                    justifyContent="space-between">
                    <Button onClick={closeDialog}>Cancel</Button>
                    <Button
                        onClick={() => {
                            closeDialog()
                            onDelete()
                        }}
                        variant="danger">
                        Delete
                    </Button>
                </View>
            ),
        })
    }

    return (
        <Menu>
            <MenuItem
                prefix={<IconLib icon="minimize" />}
                onClick={() => handleCollapse(!column.collapsed)}>
                {column.collapsed ? 'Expand' : 'Collapse'}
            </MenuItem>
            <MenuItem
                prefix={<IconLib icon="pen" />}
                onClick={() => onEdit(column)}>
                Edit
            </MenuItem>
            <MenuItem
                prefix={<IconLib icon="bin" />}
                onClick={handleDelete}>
                Delete
            </MenuItem>
        </Menu>
    )
}
