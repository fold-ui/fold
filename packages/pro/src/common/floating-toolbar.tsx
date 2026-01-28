import { Button, FIBin, Icon, Portal, Text, View, useDialog } from '@fold-dev/core'
import React from 'react'
import { dispatchTodoEvent } from '../'

export const FloatingToolbar = ({ selection, onDelete }) => {
    const { setDialog, closeDialog } = useDialog()

    return (
        <View
            row
            position="fixed"
            bgToken="surface-inverse"
            colorToken="text-on-color"
            p="1rem 2rem"
            radius="var(--f-radius)"
            shadow="var(--f-shadow-xl)"
            zIndex={1000}
            gap={10}
            className="f-fadein"
            display={!Object.keys(selection).length ? 'none' : 'flex'}
            style={{ bottom: 10, left: '50%', transform: 'translateX(-50%)' }}>
            <Text color="inherit">{Object.keys(selection).length} selected</Text>
            <Icon
                icon={FIBin}
                className="f-buttonize"
                onClick={() => {
                    setDialog({
                        title: 'Are you sure?',
                        description: 'This action cannot be undone.',
                        portal: Portal,
                        footer: (
                            <View
                                width="100%"
                                row
                                justifyContent="space-between">
                                <Button
                                    onClick={() => {
                                        closeDialog()
                                        dispatchTodoEvent('select', {
                                            instanceId: 'todo-instance-1',
                                        })
                                    }}>
                                    Cancel
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={onDelete}>
                                    Delete
                                </Button>
                            </View>
                        ),
                    })
                }}
            />
        </View>
    )
}
