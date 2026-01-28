import { Link, Palette, Popover, Portal, View, useVisibility } from '@fold-dev/core'
import React, { useState } from 'react'
import { ToolbarButton } from '../'

export type ColorButtonProps = {
    color?: string | undefined
    colors: string[]
    onChange?: (color) => void
    portal?: any
    disabled?: boolean
}

export const ColorButton = (props: ColorButtonProps) => {
    const { color, colors, onChange, portal, disabled } = props
    const { visible, show, hide } = useVisibility()

    return (
        <Popover
            portal={portal}
            focusTrap
            width={190}
            content={
                <View p="1rem">
                    <Palette
                        width="100%"
                        color={color}
                        colors={colors}
                        onChange={(color) => {
                            onChange(color)
                            hide()
                        }}
                    />
                    {!!color && (
                        <Link
                            m="1rem 0 0 0"
                            display="inline-block"
                            size="sm"
                            className="f-underline"
                            onClick={() => {
                                onChange('')
                                hide()
                            }}>
                            Clear color
                        </Link>
                    )}
                </View>
            }
            isVisible={visible}
            onDismiss={hide}>
            <ToolbarButton
                disabled={disabled}
                onClick={show}
                style={{
                    '--f-common-toolbar-button-padding': '0px',
                    '--f-common-toolbar-button-gap': '0px',
                    'width': 'var(--f-common-toolbar-button-height)',
                }}>
                <View
                    radius={50}
                    height="80%"
                    width="80%"
                    bg={color}
                />
            </ToolbarButton>
        </Popover>
    )
}
