import { Avatar, AvatarGroup, CoreViewProps, FIPlus, Icon } from '@fold-ui/core'
import React, { useMemo } from 'react'
import { UserSelectUser } from './user-select'
import { ActionButton } from './action-button'

export type UserProps = {
    disabled?: boolean
    users: UserSelectUser[]
    onClick: (e) => void
} & Omit<CoreViewProps, 'onClick'>

export const Users = ({ users, disabled, onClick, ...rest }: UserProps) => {
    const { avatars, more } = useMemo(() => {
        const avatars = users.slice(0, 2)
        const more = users.length - avatars.length
        return {
            avatars,
            more: more == 0 ? '' : more,
        }
    }, [users])

    return (
        <ActionButton
            disabled={disabled}
            className="f-users"
            border={!users.length}
            onClick={onClick}>
            <AvatarGroup {...rest}>
                {avatars.map((avatar: any, index: number) => (
                    <Avatar
                        size="sm"
                        name={avatar.name}
                        src={avatar.image}
                        key={index}
                    />
                ))}

                {more && (
                    <Avatar
                        size="sm"
                        name={`+ ${more}`}
                    />
                )}
            </AvatarGroup>

            {!users.length && (
                <Icon
                    icon={FIPlus}
                    size="sm"
                />
            )}
        </ActionButton>
    )
}
