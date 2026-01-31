import {
    Badge,
    Card,
    Heading,
    IconLib,
    Pill,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    View,
} from '@fold-ui/core'
import React, { useState } from 'react'

export default {
    title: 'Core/Tabs',
    component: Tabs,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Tabs',
    subtitle: 'The Tabs component facilitates the organization of navigation between related content.',
    description:
        'Tabs can find application in full-page layouts or within various components, like modals, cards, or side panels. They prove particularly valuable when presenting user profile settings, application configurations, or content related to a specific entity type.',
}

export const Usage = () => {
    const [selected, setSelected] = useState(0)

    return (
        <Tabs
            selected={selected}
            onSelect={setSelected}>
            <TabList>
                <Tab>Profile</Tab>
                <Tab>Settings</Tab>
                <Tab>Security</Tab>
                <Tab>Privacy</Tab>
                <Tab>Subscription</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>Profile related content</TabPanel>
                <TabPanel>Settings related content</TabPanel>
                <TabPanel>Security related content</TabPanel>
                <TabPanel>Privacy related content</TabPanel>
                <TabPanel>Subscription related content</TabPanel>
            </TabPanels>
        </Tabs>
    )
}

// --

export const PrefixSuffixAndStates = () => {
    const [selected, setSelected] = useState(0)

    return (
        <Tabs
            selected={selected}
            onSelect={setSelected}>
            <TabList>
                <Tab prefix={<IconLib icon="user" />}>Profile</Tab>
                <Tab>Settings</Tab>
                <Tab suffix={<Badge variant="danger" />}>Security</Tab>
                <Tab>Privacy</Tab>
                <Tab disabled>Subscription</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>Profile related content</TabPanel>
                <TabPanel>Settings related content</TabPanel>
                <TabPanel>Security related content</TabPanel>
                <TabPanel>Privacy related content</TabPanel>
                <TabPanel>Subscription related content</TabPanel>
            </TabPanels>
        </Tabs>
    )
}

// --

export const OnlyTabList = () => {
    const [selected, setSelected] = useState(0)

    return (
        <TabList
            selected={selected}
            onSelect={setSelected}>
            <Tab>Profile</Tab>
            <Tab>Settings</Tab>
            <Tab>Security</Tab>
            <Tab>Privacy</Tab>
            <Tab>Subscription</Tab>
        </TabList>
    )
}

// --

export const Animated = () => {
    const [selected, setSelected] = useState(0)

    return (
        <Tabs
            selected={selected}
            onSelect={setSelected}
            animated>
            <TabList>
                <Tab>Profile</Tab>
                <Tab>Settings</Tab>
                <Tab>Security</Tab>
                <Tab>Privacy</Tab>
                <Tab>Subscription</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>Profile related content</TabPanel>
                <TabPanel>Settings related content</TabPanel>
                <TabPanel>Security related content</TabPanel>
                <TabPanel>Privacy related content</TabPanel>
                <TabPanel>Subscription related content</TabPanel>
            </TabPanels>
        </Tabs>
    )
}

// --

export const Overflow = () => {
    const [selected, setSelected] = useState(0)

    return (
        <Stack
            alignItems="flex-start"
            direction="vertical"
            noStretch
            spacing={20}>
            <Tabs
                animated
                selected={selected}
                onSelect={setSelected}
                width={400}>
                <TabList>
                    <Tab>Profile</Tab>
                    <Tab>Settings</Tab>
                    <Tab>Security</Tab>
                    <Tab>Privacy</Tab>
                    <Tab>Subscription</Tab>
                    <Tab>Overflow</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>Profile related content</TabPanel>
                    <TabPanel>Settings related content</TabPanel>
                    <TabPanel>Security related content</TabPanel>
                    <TabPanel>Privacy related content</TabPanel>
                    <TabPanel>Subscription related content</TabPanel>
                    <TabPanel>Overflow related content</TabPanel>
                </TabPanels>
            </Tabs>

            <Tabs
                animated
                selected={selected}
                onSelect={setSelected}
                layout="left"
                height={200}>
                <TabList>
                    <Tab>Profile</Tab>
                    <Tab>Settings</Tab>
                    <Tab>Security</Tab>
                    <Tab>Privacy</Tab>
                    <Tab>Subscription</Tab>
                    <Tab>Membership</Tab>
                    <Tab>Account</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>Profile related content</TabPanel>
                    <TabPanel>Settings related content</TabPanel>
                    <TabPanel>Security related content</TabPanel>
                    <TabPanel>Privacy related content</TabPanel>
                    <TabPanel>Subscription related content</TabPanel>
                    <TabPanel>Membership related content</TabPanel>
                    <TabPanel>Account related content</TabPanel>
                </TabPanels>
            </Tabs>
        </Stack>
    )
}

// --

export const Stretch = () => {
    const [selected, setSelected] = useState(0)

    return (
        <Tabs
            selected={selected}
            onSelect={setSelected}
            animated>
            <TabList stretch>
                <Tab>Profile</Tab>
                <Tab>Settings</Tab>
                <Tab>Security</Tab>
                <Tab>Privacy</Tab>
                <Tab>Subscription</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>Profile related content</TabPanel>
                <TabPanel>Settings related content</TabPanel>
                <TabPanel>Security related content</TabPanel>
                <TabPanel>Privacy related content</TabPanel>
                <TabPanel>Subscription related content</TabPanel>
            </TabPanels>
        </Tabs>
    )
}

// --

export const Layouts = () => {
    const [selected, setSelected] = useState(0)

    return (
        <Stack
            direction="vertical"
            spacing={20}
            noStretch
            alignItems="flex-start">
            <Heading as="h4">Top</Heading>

            <Tabs
                selected={selected}
                onSelect={setSelected}
                layout="top">
                <TabList>
                    <Tab>Profile</Tab>
                    <Tab>Settings</Tab>
                    <Tab>Security</Tab>
                    <Tab>Privacy</Tab>
                    <Tab>Subscription</Tab>
                </TabList>
                <TabPanels bgToken="surface-strong">
                    <TabPanel>Profile related content</TabPanel>
                    <TabPanel>Settings related content</TabPanel>
                    <TabPanel>Security related content</TabPanel>
                    <TabPanel>Privacy related content</TabPanel>
                    <TabPanel>Subscription related content</TabPanel>
                </TabPanels>
            </Tabs>

            <Heading as="h4">Left</Heading>

            <Tabs
                selected={selected}
                onSelect={setSelected}
                layout="left">
                <TabList>
                    <Tab>Profile</Tab>
                    <Tab>Settings</Tab>
                    <Tab>Security</Tab>
                    <Tab>Privacy</Tab>
                    <Tab>Subscription</Tab>
                </TabList>
                <TabPanels bgToken="surface-strong">
                    <TabPanel>Profile related content</TabPanel>
                    <TabPanel>Settings related content</TabPanel>
                    <TabPanel>Security related content</TabPanel>
                    <TabPanel>Privacy related content</TabPanel>
                    <TabPanel>Subscription related content</TabPanel>
                </TabPanels>
            </Tabs>

            <Heading as="h4">Bottom</Heading>

            <Tabs
                selected={selected}
                onSelect={setSelected}
                layout="bottom">
                <TabList>
                    <Tab>Profile</Tab>
                    <Tab>Settings</Tab>
                    <Tab>Security</Tab>
                    <Tab>Privacy</Tab>
                    <Tab>Subscription</Tab>
                </TabList>
                <TabPanels bgToken="surface-strong">
                    <TabPanel>Profile related content</TabPanel>
                    <TabPanel>Settings related content</TabPanel>
                    <TabPanel>Security related content</TabPanel>
                    <TabPanel>Privacy related content</TabPanel>
                    <TabPanel>Subscription related content</TabPanel>
                </TabPanels>
            </Tabs>

            <Heading as="h4">Right</Heading>

            <Tabs
                selected={selected}
                onSelect={setSelected}
                layout="right">
                <TabList>
                    <Tab>Profile</Tab>
                    <Tab>Settings</Tab>
                    <Tab>Security</Tab>
                    <Tab>Privacy</Tab>
                    <Tab>Subscription</Tab>
                </TabList>
                <TabPanels bgToken="surface-strong">
                    <TabPanel>Profile related content</TabPanel>
                    <TabPanel>Settings related content</TabPanel>
                    <TabPanel>Security related content</TabPanel>
                    <TabPanel>Privacy related content</TabPanel>
                    <TabPanel>Subscription related content</TabPanel>
                </TabPanels>
            </Tabs>
        </Stack>
    )
}

// --

export const OnCard = () => {
    const [selected, setSelected] = useState(2)

    return (
        <Card
            height={500}
            width="100%"
            style={{ maxWidth: 600, overflow: 'hidden' }}>
            <Tabs
                layout="bottom"
                animated
                selected={selected}
                onSelect={setSelected}>
                <TabList
                    height="5rem"
                    stretch
                    disableScroll>
                    <Tab prefix={<IconLib icon="user" />}>Profile</Tab>
                    <Tab prefix={<IconLib icon="cog" />}>Settings</Tab>
                    <Tab
                        prefix={<IconLib icon="warning" />}
                        suffix={<Badge variant="danger">2</Badge>}>
                        Security
                    </Tab>
                    <Tab prefix={<IconLib icon="flag" />}>Privacy</Tab>
                    <Tab disabled>Subscription</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>Profile related content</TabPanel>
                    <TabPanel>Settings related content</TabPanel>
                    <TabPanel>Security related content</TabPanel>
                    <TabPanel>Privacy related content</TabPanel>
                    <TabPanel>Subscription related content</TabPanel>
                </TabPanels>
            </Tabs>
        </Card>
    )
}
