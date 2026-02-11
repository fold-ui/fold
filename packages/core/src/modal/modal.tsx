import React, { ReactElement, forwardRef, useEffect, useRef } from 'react'
import { ButtonProps, IconButton, IconButtonProps, PortalProps, View, useFocus, usePreventScrolling } from '../'
import { classNames, getActionClass, getKey, mergeRefs } from '../helpers'
import { CoreViewProps } from '../types'

export type ModalCloseProps = Omit<IconButtonProps, 'icon'>

export const ModalClose = (props: ModalCloseProps) => {
    return (
        <IconButton
            subtle
            size="xs" 
            iconProps={{ size: 'md' }}
            {...props}
            className="f-modal__close"
            icon="x"
        />
    )
}

export type ModalAnchor =
    | 'top-right'
    | 'top-center'
    | 'top-left'
    | 'middle-left'
    | 'middle-center'
    | 'middle-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'

export type ModalProps = {
    headerProps?: any
    footerProps?: any
    bodyProps?: any
    dismissOnEscape?: boolean
    __focusTrapTimeoutDelay?: number
    focusTrap?: boolean
    anchor?: ModalAnchor
    isVisible: boolean
    footer?: ReactElement | ReactElement[]
    header?: ReactElement | ReactElement[]
    borderless?: boolean
    disableBackgroundDismiss?: boolean
    disableBackgroundEventPropagation?: boolean
    noOverlay?: boolean
    noDocumentScrolling?: boolean
    portal?: (props: PortalProps) => React.ReactPortal
    onDismiss?: any
} & CoreViewProps

export const Modal = forwardRef((props: ModalProps, ref) => {
    const {
        headerProps = {},
        footerProps = {},
        bodyProps = {},
        dismissOnEscape = true,
        __focusTrapTimeoutDelay = 0,
        focusTrap = true,
        anchor = 'middle-center',
        isVisible = false,
        footer,
        header,
        borderless = false,
        disableBackgroundDismiss = false,
        disableBackgroundEventPropagation = false,
        noOverlay,
        noDocumentScrolling,
        portal,
        onDismiss,
        ...rest
    } = props
    const contentRef: any = useRef()
    const { trapFocus } = useFocus()
    const className = classNames(
        {
            'f-modal__inner': true,
            'f-col': true,
            'is-borderless': borderless,
            'no-overlay': noOverlay,
        },
        [props.className, getActionClass(anchor)]
    )

    const handleKeyDown = (e) => {
        const { isEscape } = getKey(e)
        if (isEscape && dismissOnEscape) onDismiss(e)
    }

    const handleBackgroundClick = (e: any) => {
        // necessary when nesting modals/dialogs/alerts
        if (disableBackgroundEventPropagation) {
            e.preventDefault()
            e.stopPropagation()
        }

        if (!disableBackgroundDismiss) {
            if (!contentRef.current.contains(e?.target)) {
                onDismiss(e)
            }
        }
    }

    usePreventScrolling(isVisible && noDocumentScrolling)

    useEffect(() => {
        if (focusTrap && isVisible && contentRef.current) {
            setTimeout(() => trapFocus(contentRef.current), __focusTrapTimeoutDelay)
        }
    }, [isVisible])

    const renderModal = () => {
        const classNameOverlay = 'f-modal f-row' + (noOverlay ? ' no-overlay' : '')

        return (
            <div
                className={classNameOverlay}
                onClick={handleBackgroundClick}>
                <View
                    {...rest}
                    className={className}
                    aria-modal={true}
                    tabIndex={0}
                    onKeyDown={handleKeyDown}
                    ref={mergeRefs([contentRef, ref])}>
                    {header && (
                        <div
                            className="f-modal__header f-row"
                            {...headerProps}>
                            {header}
                        </div>
                    )}
                    {props.children && (
                        <div
                            className="f-modal__body"
                            {...bodyProps}>
                            {props.children}
                        </div>
                    )}
                    {footer && (
                        <div
                            className="f-modal__footer f-row"
                            {...footerProps}>
                            {footer}
                        </div>
                    )}
                </View>
            </div>
        )
    }

    if (isVisible) {
        if (portal) {
            return <props.portal>{renderModal()}</props.portal>
        } else {
            return renderModal()
        }
    } else {
        return null
    }
})
