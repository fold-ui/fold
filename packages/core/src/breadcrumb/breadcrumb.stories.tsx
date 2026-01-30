import { Breadcrumb, BreadcrumbItem, IconLib } from '@fold-ui/core'
import React from 'react'

export default {
    title: 'Core/Breadcrumb',
    component: Breadcrumb,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Breadcrumb',
    subtitle:
        "The Breadcrumb component lists a series of links that provide a visual representation of a page's position within a website's hierarchical structure.",
    description:
        "The breadcrumb serves as a supplementary navigation pattern, helping users understand the hierarchical structure of the websites' content and facilitating their navigation back through those levels.",
}

export const Usage = () => {
    return (
        <Breadcrumb>
            <BreadcrumbItem>Website</BreadcrumbItem>
            <BreadcrumbItem>Blog</BreadcrumbItem>
            <BreadcrumbItem>What is a breadcrumb?</BreadcrumbItem>
        </Breadcrumb>
    )
}

// --

export const WithCustomIconAndActiveLink = () => {
    return (
        <Breadcrumb separator={<IconLib icon="chevron-right" />}>
            <BreadcrumbItem>Website</BreadcrumbItem>
            <BreadcrumbItem>Blog</BreadcrumbItem>
            <BreadcrumbItem
                active
                to="https://fold-ui.com"
                target="_blank">
                What is a breadcrumb?
            </BreadcrumbItem>
        </Breadcrumb>
    )
}
