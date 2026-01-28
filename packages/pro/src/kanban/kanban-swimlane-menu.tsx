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
} from '@fold-dev/core'
import React, { useState } from 'react'

export const KanbanSwimlaneMenu = (props: any) => {
    const { swimlane, onSave, onDelete, colorPalette } = props
    const [color, setColor] = useState(swimlane.color)
    const { setDialog, closeDialog } = useDialog()

    const handleCollapse = (collapsed) => {
        onSave({ collapsed })
    }

    const handleColorChange = (color) => {
        setColor(color)
        onSave({ color })
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
                prefix={<IconLib icon="maximize" />}
                onClick={() => handleCollapse(!swimlane.collapsed)}>
                {swimlane.collapsed ? 'Expand' : 'Collapse'}
            </MenuItem>
            <MenuItem
                prefix={<IconLib icon="bin" />}
                onClick={handleDelete}>
                Delete
            </MenuItem>
            <MenuDivider />
            <MenuHeading>Theme</MenuHeading>
            <MenuSection m="0 0 1rem 0">
                <Palette
                    width={200}
                    style={{ '--f-color-palette-size': '1.25rem' }}
                    color={color}
                    colors={colorPalette}
                    onChange={handleColorChange}
                />
            </MenuSection>
        </Menu>
    )
}
