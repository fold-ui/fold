import { useLayoutEffect, useMemo } from 'react'
import { documentObject, windowObject } from '../helpers'
import { useObserver } from './observer.hook'
import { useStorage } from './storage.hook'

export const __F_THEME_STORAGE = '__F_THEME_STORAGE'
export type AppSystemMode = 'light' | 'dark'

export function useTheme() {
    const getRootElement = () => {
        return documentObject.documentElement
        return documentObject.getElementsByTagName('html')[0]
    }

    const mutationRecord = useObserver(getRootElement())

    const systemTheme = useMemo(() => getRootElement().getAttribute('data-theme'), [mutationRecord])

    const { setStorage, getStorage, deleteStorage } = useStorage()

    const getToken = (token: string) => `var(--f-${token})`

    const getColorToken = (token: string) => `var(--f-color-${token})`

    const setTheme = (theme: string) => {
        getRootElement().setAttribute('data-theme', theme)
        setStorage(__F_THEME_STORAGE, theme)
    }

    const removeTheme = (theme: string) => {
        getRootElement().removeAttribute('data-theme')
        deleteStorage(__F_THEME_STORAGE)
    }

    const getStoredTheme = () => {
        return getStorage(__F_THEME_STORAGE)
    }

    const getSystemTheme = (): 'light' | 'dark' => {
        if (windowObject.matchMedia('(prefers-color-scheme:dark)').matches) {
            return 'dark'
        } else {
            return 'light'
        }
    }

    return {
        systemTheme,
        getToken,
        getColorToken,
        setTheme,
        removeTheme,
        getSystemTheme,
        getStoredTheme,
    }
}
