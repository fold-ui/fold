import { Button, CoreViewProps, Footer, Size, View, usePopoverEvent } from '@fold-ui/core'
import React, { useState } from 'react'
import { UserSelect, UserSelectUser } from './user-select'

export type UserMenuProps = {
    saveOnUpdate?: boolean
    users?: UserSelectUser[]
    onSave: (users: UserSelectUser[]) => void
    onCancel: () => void
} & CoreViewProps

export const UserMenu = (props: UserMenuProps) => {
    const { saveOnUpdate, onSave, onCancel, users = [] } = props
    const [internalUsers, setInternalUsers] = useState(users)

    const handleUserAdd = (user) => {
        let iu = []

        if (internalUsers.findIndex((internalUser) => user.id == internalUser.id) == -1) {
            iu = [user, ...internalUsers]
        } else {
            iu = internalUsers.filter((internalUser) => user.id != internalUser.id)
        }

        setInternalUsers(iu)
        if (saveOnUpdate) onSave(iu)
    }

    const handleUserDelete = (user) => {
        let iu = internalUsers.filter((internalUser) => user.id != internalUser.id)
        setInternalUsers(iu)
        if (saveOnUpdate) onSave(iu)
    }

    const handleSave = () => {
        onSave(internalUsers)
    }

    return (
        <UserSelect
            users={internalUsers}
            onAdd={handleUserAdd}
            onDelete={handleUserDelete}
            footer={
                <Footer
                    justifyContent="space-between"
                    p="var(--f-radius) var(--f-radius) 0 var(--f-radius)">
                    <Button
                        size="sm"
                        onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button
                        variant="accent"
                        size="sm"
                        onClick={handleSave}>
                        Save
                    </Button>
                </Footer>
            }
        />
    )
}
