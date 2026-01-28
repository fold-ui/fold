import React from 'react'
import { Button, Cookie, Text, useVisibility, View } from '@fold-dev/core'

export default {
    title: 'Core/Cookie',
    component: Cookie,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Cookie',
    subtitle:
        'The Cookie component displays a modal window to provide the user with the option to either accept or decline the cookie policy.',
    description:
        "In today's internet landscape, safeguarding data is critical. The Cookie component offers a developer-friendly & extensible experience to facilitate compliance.",
}

export const Usage = () => {
    const { visible, show, hide } = useVisibility(false)

    return (
        <View>
            <Button onClick={show}>Show Cookie Dialog</Button>

            <Cookie
                noOverlay
                isVisible={visible}
                onOkay={hide}
                onCancel={hide}
                title="🍪 Cookie Policy"
                description={
                    <Text>
                        We use essential cookies to make our site work. With your consent, we may also use non-essential
                        cookies to improve user experience and analyze website traffic. By clicking "Accept", you agree
                        to our website's cookie use as described in our Cookie Policy.
                    </Text>
                }
            />
        </View>
    )
}
