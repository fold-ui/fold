import React, { ReactNode, createContext } from 'react'
import { LabelSelectLabel, UserSelectUser } from '../'

export const CommonContext = createContext<any>({})

export type CommonProviderProps = {
    colors: string[]
    availableUsers: UserSelectUser[]
    availableLabels: LabelSelectLabel[]
    onUserFilter?: (value: string) => void
    onLabelFilter?: (value: string) => void
    children: ReactNode
}

export const CommonProvider = (props: any) => {
    const { colors, availableUsers, availableLabels, onUserFilter, onLabelFilter, children } = props

    return (
        <CommonContext.Provider
            value={{
                colors,
                availableUsers,
                availableLabels,
                onUserFilter,
                onLabelFilter,
            }}>
            {children}
        </CommonContext.Provider>
    )
}
