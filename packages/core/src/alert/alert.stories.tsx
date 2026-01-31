import { Alert, Button, useAlert } from '@fold-ui/core'
import React, { useEffect } from 'react'

export default {
    title: 'Core/Alert',
    component: Alert,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Alert',
    subtitle:
        "An alert component is an element that displays a brief, important message in a way that attracts the user's attention without interrupting the user's task.",
    description:
        'Alerts can serve various purposes, such as presenting information related to errors, indicating the completion of unrelated actions, or providing updates on the status of a system.',
}

export const Usage = () => {
    const { alert } = useAlert()

    const triggerPopup = () => {
        alert({
            icon: 'sun',
            title: 'Good Morning',
            description: "And in case I don't see ya, good afternoon, good evening, and good night!",
            button: 'Okay',
            closeButton: true,
            onDismiss: () => console.log('Alert was dismissed!'),
        })
    }

    return <Button onClick={triggerPopup}>Show alert</Button>
}
