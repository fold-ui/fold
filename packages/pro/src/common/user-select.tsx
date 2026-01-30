import { Avatar, IconLib, Pill, Select, SelectOption, Text, getKey } from '@fold-ui/core'
import React, { ReactElement, ReactNode, useContext, useMemo } from 'react'
import { CommonContext } from './common.provider'

export type UserSelectUser = {
    id: string | number
    name: string
    image?: string
}

export type UserSelectProps = {
    users: UserSelectUser[]
    onAdd?: (user: UserSelectUser) => void
    onDelete?: (user: UserSelectUser) => void
    footer?: ReactElement | null
}

export const UserSelect = (props: UserSelectProps) => {
    const { users = [], onAdd, onDelete, footer } = props
    const { availableUsers = [], onUserFilter } = useContext(CommonContext)
    const selected = useMemo(() => users.map((user: UserSelectUser) => user.id), [users])
    const options: any = useMemo(() => {
        return availableUsers.map((user: UserSelectUser) => ({
            key: user.id,
            label: user.name,
            prefix: (
                <Avatar
                    src={user.image}
                    name={user.name}
                    size="xs"
                />
            ),
        }))
    }, [availableUsers])

    const handleUserSelect = (option: SelectOption) => {
        const user = availableUsers.find((availableUser: any) => availableUser.id == option.key)

        if (!!users.find((user: any) => user.id == option.key)) {
            onDelete(user)
        } else {
            onAdd(user)
        }
    }

    const handleInputKeyDown = (e) => {
        const { isBackspace } = getKey(e)
        if (isBackspace && !e.target.value) onDelete(users[users.length - 1])
    }

    return (
        <Select
            tagInput
            variant="static"
            noListFocus
            trapFocus
            placeholder="Add user"
            selected={selected}
            options={options}
            filterDelay={1000}
            selectListProps={{ noOptionsComponent: <Text p="var(--f-select-option-padding)">No users available</Text> }}
            tagInputFieldProps={{ onKeyDown: handleInputKeyDown }}
            onSelect={(option, dismiss, clear) => {
                clear()
                handleUserSelect(option)
            }}
            onFilter={onUserFilter}
            footer={footer}
            render={() =>
                users.map((user: UserSelectUser, index: number) => (
                    <Pill
                        subtle
                        key={index}
                        size="sm"
                        prefix={
                            <Avatar
                                src={user.image}
                                name={user.name}
                                size="xs"
                            />
                        }
                        suffix={
                            <IconLib
                                icon="x"
                                className="f-buttonize"
                                onClick={() => onDelete(user)}
                            />
                        }>
                        {user.name}
                    </Pill>
                ))
            }
        />
    )
}
