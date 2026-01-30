import { Button, Footer, Popover, Portal, useVisibility } from '@fold-ui/core'
import React from 'react'
import { UserSelect, UserSelectUser } from './user-select'
import { Users } from './users'

export type UserButtonProps = {
    users: UserSelectUser[]
    onAdd?: (user: UserSelectUser) => void
    onDelete?: (user: UserSelectUser) => void
    portal?: any
    disabled?: boolean
}

export const UserButton = (props: UserButtonProps) => {
    const { users, onAdd, onDelete, portal, disabled } = props
    const { visible, show, hide } = useVisibility()

    return (
        <Popover
            portal={portal}
            width={300}
            border="none"
            isVisible={visible}
            onDismiss={hide}
            content={
                <UserSelect
                    users={users}
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
            <div className="f-row">
                <Users
                    disabled={disabled}
                    users={users}
                    onClick={show}
                />
            </div>
        </Popover>
    )
}
