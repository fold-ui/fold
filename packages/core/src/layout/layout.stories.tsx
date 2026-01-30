import {
    App,
    Avatar,
    Badge,
    Card,
    Content,
    Flexer,
    Footer,
    Header,
    Heading,
    Main,
    Navigation,
    NavigationItem,
    Sidebar,
    Text,
    View,
} from '@fold-ui/core'
import React from 'react'

export default {
    title: 'Core/Layout',
    component: App,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Layout',
    subtitle: 'Layout components enable the creation of organised and structured document layouts.',
    description:
        'The Layout components facilitate the quick creation of standard layouts for a wide range of applications, making them useful for developing applications, websites, and widgets (and anything else).',
}

export const Usage = () => (
    <App
        width="100%"
        height={500}
        row>
        <Sidebar
            left
            p={50}>
            <Text>Sidebar left</Text>
        </Sidebar>
        <Content>
            <Main column>
                <Header p={20}>
                    <Text>Header</Text>
                </Header>
                <View
                    flex={1}
                    p={20}
                    row>
                    <Text>Main</Text>
                </View>
                <Footer p={20}>
                    <Text>Footer</Text>
                </Footer>
            </Main>
        </Content>
        <Sidebar
            right
            p={50}>
            <Text>Sidebar right</Text>
        </Sidebar>
    </App>
)

// --

export const AdvancedExample = () => (
    <App
        width="100%"
        height={500}
        row>
        <Sidebar
            left
            justifyContent="flex-start">
            <Header
                p="0 2rem"
                height={50}>
                <Text fontWeight="bold">Application</Text>
            </Header>
            <Navigation width={200}>
                <NavigationItem>Dashboard</NavigationItem>
                <NavigationItem active>Analytics</NavigationItem>
                <NavigationItem>Products</NavigationItem>
                <NavigationItem>Settings</NavigationItem>
            </Navigation>
        </Sidebar>
        <Content>
            <Main column>
                <Header
                    p="0 2rem"
                    height={50}
                    gap={10}>
                    <Text fontWeight="bold">Analytics</Text>
                    <Flexer />
                    <Text>Account settings</Text>
                    <Avatar
                        size="sm"
                        name="Craig Pather"
                        src="/men/01.jpg"
                    />
                </Header>
                <Header
                    p="0 2rem"
                    height={50}>
                    <Text>Projects</Text>
                </Header>
                <View
                    row
                    flex={1}
                    p={20}
                    gap={10}
                    width="100%"
                    justifyContent="flex-start"
                    alignItems="flex-start">
                    <Card
                        width={175}
                        height={200}
                        column
                        alignItems="flex-start"
                        p={30}>
                        <View height={20} />
                        <Flexer />
                        <View>
                            <Heading as="h4">Work</Heading>
                            <View row>
                                <Text>3 projects</Text>
                                <Badge
                                    variant="danger"
                                    width={10}
                                    height={10}
                                    m="0.2rem 0 0 1rem"
                                />
                            </View>
                        </View>
                    </Card>
                    <Card
                        width={175}
                        height={200}
                        column
                        alignItems="flex-start"
                        p={30}>
                        <View height={20} />
                        <Flexer />
                        <View>
                            <Heading as="h4">Projects</Heading>
                            <View row>
                                <Text>2 projects</Text>
                                <Badge
                                    variant="success"
                                    width={10}
                                    height={10}
                                    m="0.2rem 0 0 1rem"
                                />
                            </View>
                        </View>
                    </Card>
                </View>
            </Main>
        </Content>
    </App>
)
