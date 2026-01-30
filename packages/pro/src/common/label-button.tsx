import { Button, Footer, Popover, Portal, useVisibility } from '@fold-ui/core'
import React, { ReactElement, useRef } from 'react'
import { LabelSelect, LabelSelectLabel } from './label-select'
import { ToolbarButton } from './toolbar-button'
import { Labels } from './labels'

export type LabelButtonProps = {
    labels: LabelSelectLabel[]
    onAdd?: (label: LabelSelectLabel) => void
    onDelete?: (label: LabelSelectLabel) => void
    portal?: any
    disabled?: boolean
}

export const LabelButton = (props: LabelButtonProps) => {
    const { labels = [], onAdd, onDelete, portal, disabled } = props
    const { visible, show, hide } = useVisibility()
    const ref = useRef(null)

    return (
        <>
            <Popover
                portal={portal}
                width={300}
                border="none"
                isVisible={visible}
                onDismiss={hide}
                content={
                    <LabelSelect
                        labels={labels}
                        onAdd={onAdd}
                        onDelete={onDelete}
                        footer={
                            <Footer
                                p="0.5rem 0.5rem 0 0"
                                justifyContent="flex-end">
                                <Button
                                    size="sm"
                                    variant="accent"
                                    onClick={hide}>
                                    Okay
                                </Button>
                            </Footer>
                        }
                    />
                }>
                <ToolbarButton
                    disabled={disabled}
                    ref={ref}
                    icon="tag"
                    onClick={show}
                />
            </Popover>

            <Labels
                disabled={disabled}
                labels={labels}
                onClick={() => ref.current?.click()}
            />
        </>
    )
}
