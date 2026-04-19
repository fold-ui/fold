import React, { ReactPortal, useContext } from 'react'
import { Button, Heading, IconLib, Modal, ModalClose, Portal, Text, useId } from '../'
import { AppContext } from '../contexts'

export type AlertOptions = {
    icon?: string
    portal?: any
    color?: string
    title?: string
    description?: string
    button?: string
    closeButton?: boolean
    onDismiss?: any
}

export const useAlert = () => {
    const { setAlert } = useContext(AppContext)
    return { alert: setAlert }
}

export type AlertProps = {
    alert: AlertOptions
    onDismiss: any
}

export const Alert = (props: AlertProps) => {
    const { onDismiss, alert } = props
    const titleId = useId()
    const descriptionId = useId()
    const { portal = Portal, icon, color, title, description, button = 'Okay', closeButton } = alert

    return (
        <Modal
            borderless
            portal={portal}
            width={400}
            height="fit-content"
            role="alertdialog"
            aria-label={title}
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            onDismiss={onDismiss}
            isVisible={!!title || !!description}>
            {closeButton && <ModalClose onClick={onDismiss} />}
            <div className="f-alert f-col">
                {icon && (
                    <IconLib
                        icon={icon}
                        size="xl"
                        color={color}
                    />
                )}
                {title && (
                    <Heading
                        as="h2"
                        id={titleId}>
                        {title}
                    </Heading>
                )}
                {description && <Text id={descriptionId}>{description}</Text>}
                <Button onClick={onDismiss}>{button}</Button>
            </div>
        </Modal>
    )
}
