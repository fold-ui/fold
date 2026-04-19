import { documentObject } from '../helpers'
import React, { ReactElement, ReactNode, Ref, useMemo, useState } from 'react'
import ReactDOM from 'react-dom'

export type PortalProps = {
    portalRef?: HTMLDivElement
    children?: ReactElement
}

export const Portal = (props: PortalProps) => {
    const el = useMemo(() => {
        if (props.portalRef) return props.portalRef
        const portalId: string = 'f-portal'
        const el: HTMLElement = documentObject.getElementById(portalId)
        if (el) return el
        const newEl = documentObject.createElement('div')
        newEl.setAttribute('id', portalId)
        documentObject.body.appendChild(newEl)
        return newEl
    }, [])

    return ReactDOM.createPortal(props.children, el)
}
