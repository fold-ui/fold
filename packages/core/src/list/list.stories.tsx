import { IconLib, Li, List } from '@fold-dev/core'
import React from 'react'

export default {
    title: 'Core/List',
    component: List,
    excludeStories: 'docs',
}

export const docs = {
    title: 'List',
    subtitle: 'The List component is utilized for depicting an HTML list element and its corresponding LI element.',
    description:
        'Lists are useful for creating menus and organizing information. Typically, list items are presented with bullet points in unordered lists, while in ordered lists, they are typically depicted with an ascending counter on the left, such as numbers or letters.',
}

export const Usage = () => (
    <List
        as="ul"
        type="circle">
        <Li>Milk</Li>
        <Li>Eggs</Li>
        <Li>Flour</Li>
        <Li>Water</Li>
        <Li>Salt</Li>
        <Li>Cocoa</Li>
    </List>
)

// --

export const CustomBullet = () => (
    <List type="none">
        <Li
            row
            width="fit-content">
            <IconLib icon="circle" />
            Milk
        </Li>
        <Li
            row
            width="fit-content">
            <IconLib icon="circle" />
            Eggs
        </Li>
        <Li
            row
            width="fit-content">
            <IconLib icon="circle" />
            Flour
        </Li>
        <Li
            row
            width="fit-content"
            colorToken="danger">
            <IconLib icon="circle" />
            Water
        </Li>
        <Li
            row
            width="fit-content">
            <IconLib icon="circle" />
            Salt
        </Li>
        <Li
            row
            width="fit-content">
            <IconLib icon="circle" />
            Cocoa
        </Li>
    </List>
)
