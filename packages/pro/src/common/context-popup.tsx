import { IconLib, Menu, MenuItem } from '@fold-dev/core'
import React from 'react'

export const ContextPopup = (props) => {
    const { isTodo, onView, onTodoEdit, onTodoAddBelow, onDelete } = props

    return (
        <Menu width={235}>
            {isTodo && (
                <MenuItem
                    display={isTodo ? 'flex' : 'none'}
                    prefix={<IconLib icon="pen" />}
                    onClick={onTodoEdit}>
                    Edit
                </MenuItem>
            )}
            {isTodo && (
                <MenuItem
                    display={isTodo ? 'flex' : 'none'}
                    prefix={<IconLib icon="plus" />}
                    onClick={onTodoAddBelow}>
                    Add Below
                </MenuItem>
            )}
            <MenuItem
                prefix={<IconLib icon="eye" />}
                onClick={onView}>
                View
            </MenuItem>
            <MenuItem
                prefix={<IconLib icon="bin" />}
                onClick={onDelete}>
                Delete
            </MenuItem>
        </Menu>
    )
}
