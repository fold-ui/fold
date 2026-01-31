import React, { useMemo } from 'react'
import { Button, Menu, MenuItemOption, MenuOptionGroup, Popover, Portal, View, useVisibility } from '@fold-ui/core'
import { ToolbarButton } from '../'

export type Priority = '' | 'low' | 'medium' | 'high'

export type PriorityButtonProps = {
    priority: Priority
    title?: string
    onChange: (val) => void
    portal?: any
    disabled?: boolean
}

export const PriorityButton = (props: PriorityButtonProps) => {
    const { priority = '', title = 'Priority', onChange, portal, disabled } = props
    const { visible, show, hide } = useVisibility(false)
    const color = useMemo(() => {
        switch (priority) {
            case 'low':
                return 'var(--f-color-caution)'
            case 'medium':
                return 'var(--f-color-warning)'
            case 'high':
                return 'var(--f-color-danger)'
            default:
                return undefined
        }
    }, [priority])

    return (
        <Popover
            portal={portal}
            focusTrap
            width={160}
            content={
                <Menu
                    width="100%"
                    border="none">
                    <MenuOptionGroup
                        title={title}
                        defaultValue={priority}
                        type="radio"
                        onChange={(priority) => {
                            onChange(priority)
                            hide()
                        }}>
                        <MenuItemOption
                            icon="flag"
                            value="">
                            No priority
                        </MenuItemOption>
                        <MenuItemOption
                            icon="flag"
                            value="low"
                            style={{
                                '--f-menu-item-color-active': 'var(--f-color-caution)',
                                '--f-menu-item-background-color-active': 'var(--f-color-caution-weak)',
                            }}>
                            Low
                        </MenuItemOption>
                        <MenuItemOption
                            icon="flag"
                            value="medium"
                            style={{
                                '--f-menu-item-color-active': 'var(--f-color-warning)',
                                '--f-menu-item-background-color-active': 'var(--f-color-warning-weak)',
                            }}>
                            Medium
                        </MenuItemOption>
                        <MenuItemOption
                            icon="flag"
                            value="high"
                            style={{
                                '--f-menu-item-color-active': 'var(--f-color-danger)',
                                '--f-menu-item-background-color-active': 'var(--f-color-danger-weak)',
                            }}>
                            High
                        </MenuItemOption>
                    </MenuOptionGroup>
                </Menu>
            }
            isVisible={visible}
            onDismiss={hide}>
            <ToolbarButton
                disabled={disabled}
                icon="flag"
                className="f-fadein"
                color={color}
                onClick={show}
            />
        </Popover>
    )
}
