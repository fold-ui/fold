import { Menu, MenuItemOption, MenuOptionGroup, Popover, Portal, useVisibility } from '@fold-ui/core'
import React from 'react'
import { ToolbarButton } from '../'

export type ListOption = { value: string; label: string }

export type ListButtonProps = {
    list?: number
    options?: ListOption[]
    title?: string
    onChange: (val) => void
    portal?: any
}

export const ListButton = (props: ListButtonProps) => {
    const { options, list = 0, title = 'Select list', onChange, portal } = props
    const { visible, show, hide } = useVisibility(true)

    return (
        <Popover
            portal={portal}
            focusTrap
            width={200}
            content={
                <Menu
                    width="100%"
                    border="none">
                    <MenuOptionGroup
                        onChange={(optionValue) => {
                            const list = options.findIndex((item) => item.value == optionValue)
                            onChange(list)
                            hide()
                        }}
                        title={title}
                        defaultValue={options[list].value}
                        type="radio">
                        {options.map(({ value, label }, index) => (
                            <MenuItemOption
                                key={index}
                                value={value}>
                                {label}
                            </MenuItemOption>
                        ))}
                    </MenuOptionGroup>
                </Menu>
            }
            isVisible={visible}
            onDismiss={hide}>
            <ToolbarButton
                icon="circle"
                text={options[list].label}
                onClick={show}
            />
        </Popover>
    )
}
