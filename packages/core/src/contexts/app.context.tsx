import React, { useLayoutEffect, useState } from 'react'
import { Alert, AlertOptions } from '../alert/alert'
import { Dialog, DialogOptions } from '../dialog/dialog'
import { DragManager, DragManagerProps } from '../drag'
import { useTheme } from '../hooks/theme.hook'
import {
    FIArrowDown,
    FIArrowLeft,
    FIArrowRight,
    FIArrowUp,
    FIAudio,
    FIBin,
    FICheck,
    FICheckCircle,
    FIChevronDown,
    FIChevronLeft,
    FIChevronRight,
    FIChevronUp,
    FICircle,
    FIClear,
    FIClipboard,
    FICog,
    FICopy,
    FIDate,
    FIDateDots,
    FIDescription,
    FIEye,
    FIEyeDropper,
    FIEyeLine,
    FIFlag,
    FIGift,
    FIImage,
    FILink,
    FILinkOut,
    FILockClosed,
    FILockOpen,
    FIMaximize,
    FIMenu,
    FIMinimize,
    FIMinus,
    FIMoon,
    FIMoreH,
    FIMoreV,
    FINext,
    FIPaperclip,
    FIPause,
    FIPen,
    FIPlay,
    FIPlus,
    FIRepeat,
    FIRotateLeft,
    FIRotateRight,
    FISearch,
    FIStar,
    FISun,
    FITag,
    FITime,
    FIUpload,
    FIUser,
    FIVideo,
    FIWarning,
    FIX,
    setAppIcons,
} from '../icon'
import { ToastContainer } from '../toast/toast'

export const defaultIcons = {
    'description': FIDescription,
    'repeat': FIRepeat,
    'lock-closed': FILockClosed,
    'lock-open': FILockOpen,
    'cog': FICog,
    'rotate-left': FIRotateLeft,
    'rotate-right': FIRotateRight,
    'eye': FIEye,
    'eye-line': FIEyeLine,
    'bin': FIBin,
    'sun': FISun,
    'moon': FIMoon,
    'eye-dropper': FIEyeDropper,
    'plus': FIPlus,
    'minus': FIMinus,
    'chevron-left': FIChevronLeft,
    'chevron-right': FIChevronRight,
    'chevron-down': FIChevronDown,
    'chevron-up': FIChevronUp,
    'image': FIImage,
    'minimize': FIMinimize,
    'maximize': FIMaximize,
    'more-h': FIMoreH,
    'more-v': FIMoreV,
    'check': FICheck,
    'x': FIX,
    'date': FIDate,
    'circle': FICircle,
    'upload': FIUpload,
    'pen': FIPen,
    'tag': FITag,
    'link-out': FILinkOut,
    'link': FILink,
    'copy': FICopy,
    'flag': FIFlag,
    'next': FINext,
    'clear': FIClear,
    'date-dots': FIDateDots,
    'gift': FIGift,
    'warning': FIWarning,
    'arrow-down': FIArrowDown,
    'arrow-up': FIArrowUp,
    'arrow-left': FIArrowLeft,
    'arrow-right': FIArrowRight,
    'paperclip': FIPaperclip,
    'play': FIPlay,
    'pause': FIPause,
    'check-circle': FICheckCircle,
    'clipboard': FIClipboard,
    'time': FITime,
    'menu': FIMenu,
    'search': FISearch,
    'user': FIUser,
    'star': FIStar,
    'audio': FIAudio,
    'video': FIVideo,
}

setAppIcons(defaultIcons)

export type AppContextProps = {
    theme?: string
}

export type AppContext = {
    app: AppContextProps
    alert: AlertOptions
    setAlert: (alert: AlertOptions) => void
    dialog: DialogOptions
    setDialog: (dialog: DialogOptions) => void
    closeDialog: () => void
    setConfig: any
}

export const AppContext = React.createContext<AppContext>({
    app: {},
    alert: {},
    setAlert: () => null,
    dialog: {},
    setDialog: () => null,
    closeDialog: () => null,
    setConfig: (app: Partial<AppContextProps>) => null,
})

export type AppProviderProps = {
    theme?: string
    dragOptions?: DragManagerProps
}

export const AppProvider = (props: any) => {
    const { theme, dragOptions = {} } = props
    const [app, setApp] = useState<AppContextProps>({})
    const [alert, setAlert] = useState<AlertOptions>({})
    const [dialog, setDialog] = useState<DialogOptions>({})
    const { setTheme, getSystemTheme, getStoredTheme } = useTheme()

    const closeDialog = () => setDialog({})

    const handleAlertDismiss = () => {
        if (alert.onDismiss) alert.onDismiss()
        setAlert({})
    }

    const setConfig = (obj: Partial<AppContextProps>) => {
        if (obj.theme) setTheme(obj.theme)
        setApp({ ...app, ...obj })
    }

    useLayoutEffect(() => {
        const theme = getStoredTheme() || getSystemTheme()
        setTheme(theme)
        setApp({ theme })
    }, [theme])

    return (
        <AppContext.Provider
            value={{
                app,
                alert,
                setAlert,
                dialog,
                setDialog,
                closeDialog,
                setConfig,
            }}>
            {props.children}
            <DragManager {...dragOptions} />
            <ToastContainer />
            <Alert
                alert={alert}
                onDismiss={handleAlertDismiss}
            />
            {!!dialog.title && (
                <Dialog
                    isVisible={true}
                    portal={dialog.portal}
                    closeButton={dialog.closeButton}
                    title={dialog.title}
                    description={dialog.description}
                    onDismiss={(e) => {
                        if (dialog.onDismiss) dialog.onDismiss(e)
                        setDialog({})
                    }}
                    footer={dialog.footer}
                    header={dialog.header}
                />
            )}
        </AppContext.Provider>
    )
}
