import * as Token from '@fold-ui/design/tokens'
import {
    Badge,
    IconLib,
    Navigation,
    NavigationDivider,
    NavigationHeading,
    NavigationItem,
    Pill,
    useTheme,
    View,
} from '@fold-ui/core'
import React, { useState } from 'react'

export default {
    title: 'Core/Navigation',
    component: Navigation,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Navigation',
    subtitle:
        'Navigation components serve as foundational building blocks for creating extensible navigational hierarchies.',
    description:
        'The Navigation components provide an intuitive and familiar way to define and visualize navigation. They are useful for website navigation headers, application navigations or area-specific navigational controls.',
}

export const Usage = () => (
    <View
        bgToken="surface-strong"
        p={20}>
        <Navigation width={300}>
            <NavigationItem>Dashboard</NavigationItem>
            <NavigationItem>Projects</NavigationItem>
            <NavigationItem>Products</NavigationItem>
            <NavigationItem>Analytics</NavigationItem>
            <NavigationItem>Subscriptions</NavigationItem>
            <NavigationDivider />
            <NavigationHeading>Workspace</NavigationHeading>
            <NavigationItem>Settings</NavigationItem>
            <NavigationItem>Users</NavigationItem>
            <NavigationDivider />
            <NavigationHeading>Account</NavigationHeading>
            <NavigationItem>Profile</NavigationItem>
        </Navigation>
    </View>
)

// --

export const States = () => (
    <View
        bgToken="surface-strong"
        p={20}>
        <Navigation width={300}>
            <NavigationItem>Dashboard</NavigationItem>
            <NavigationItem active>Projects</NavigationItem>
            <NavigationItem disabled>Products</NavigationItem>
        </Navigation>
    </View>
)

// --

export const PrefixAndSuffix = () => (
    <View
        bgToken="surface-strong"
        p={20}>
        <Navigation width={300}>
            <NavigationHeading
                prefix={<IconLib icon="circle" />}
                suffix={<IconLib icon="circle" />}>
                Core
            </NavigationHeading>
            <NavigationItem prefix={<IconLib icon="circle" />}>Dashboard</NavigationItem>
            <NavigationItem suffix={<Badge variant="danger" />}>Projects</NavigationItem>
            <NavigationItem
                prefix={<IconLib icon="circle" />}
                suffix={<IconLib icon="gift" />}>
                Products
            </NavigationItem>
        </Navigation>
    </View>
)

// --

export const SubNavigation = () => (
    <View
        bgToken="surface-strong"
        p={20}>
        <Navigation width={300}>
            <NavigationItem>Dashboard</NavigationItem>
            <NavigationItem
                suffix={
                    <Pill
                        size="xs"
                        subtle>
                        UNREAD
                    </Pill>
                }
                subNavigation={
                    <Navigation width={300}>
                        <NavigationItem suffix={<Badge variant="danger" />}>Active</NavigationItem>
                        <NavigationItem>Inactive</NavigationItem>
                        <NavigationItem>Archived</NavigationItem>
                        <NavigationItem>Deleted</NavigationItem>
                    </Navigation>
                }>
                Projects
            </NavigationItem>
            <NavigationItem>Products</NavigationItem>
            <NavigationItem>Analytics</NavigationItem>
            <NavigationItem>Subscriptions</NavigationItem>
            <NavigationItem>Settings</NavigationItem>
            <NavigationItem>Users</NavigationItem>
            <NavigationItem>Profile</NavigationItem>
        </Navigation>
    </View>
)

// --

export const NavBar = () => (
    <View
        bgToken="surface-strong"
        p={20}>
        <Navigation
            width={300}
            variant="navbar">
            <NavigationItem>Dashboard</NavigationItem>
            <NavigationItem>Projects</NavigationItem>
            <NavigationItem active>Products</NavigationItem>
            <NavigationItem>Analytics</NavigationItem>
            <NavigationItem>Subscriptions</NavigationItem>
            <NavigationDivider />
            <NavigationItem>Settings</NavigationItem>
            <NavigationItem>Users</NavigationItem>
            <NavigationDivider />
            <NavigationItem>Profile</NavigationItem>
        </Navigation>
    </View>
)
