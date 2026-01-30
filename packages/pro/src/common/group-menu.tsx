import {
    Button,
    IconLib,
    Menu,
    MenuDivider,
    MenuHeading,
    MenuItem,
    MenuSection,
    Palette,
    View,
    useDialog,
} from '@fold-ui/core'
import React, { useState } from 'react'

export const GroupMenu = (props: any) => {
    const { group, onSave, onDelete, onEdit } = props
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
                onClick={() => handleCollapse(!group.collapsed)}>
                {group.collapsed ? 'Expand' : 'Collapse'}
            </MenuItem>
            <MenuItem
                prefix={<IconLib icon="pen" />}
                onClick={() => onEdit(group)}>
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
