import React from 'react'
import { Accordion, AccordionHeading, AccordionItem, AccordionPanel } from '@fold-ui/core'

export default {
    title: 'Core/Accordion',
    component: Accordion,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Accordion',
    subtitle:
        'The accordion component is a list of vertically or horizontally stacked headings that collapse or expand associated content.',
    description:
        "Accordion components are a common user interface pattern. They are often used to create collapsible sections of content on a web page, allowing users to expand or collapse specific sections to focus on the information they're interested in.",
}

export const Usage = () => {
    return (
        <Accordion>
            <AccordionItem>
                <AccordionHeading>Section 1</AccordionHeading>
                <AccordionPanel>Content for Section 1 goes here.</AccordionPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionHeading>Section 2</AccordionHeading>
                <AccordionPanel>Content for Section 2 goes here.</AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}

// --

export const Basic = () => {
    return (
        <Accordion>
            <AccordionItem>
                <AccordionHeading>Benefits of using an accordion</AccordionHeading>
                <AccordionPanel>
                    Accordions reduce clutter & keep users from getting overwhelmed by letting them focus on the
                    information at hand.
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionHeading>Typical places to use an accordion</AccordionHeading>
                <AccordionPanel>
                    FAQ sections, nested navigational items, product information section & content with simple
                    hierarchy.
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionHeading>When to avoid using accordions</AccordionHeading>
                <AccordionPanel>
                    When the user needs access to all of the content on the page, when there is too little content &
                    when the hierarchy of the content is complex.
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}

// --

/**
 * Icon position at the start, instead of the end (default).
 */
export const IconPosition = () => {
    return (
        <Accordion iconPosition="start">
            <AccordionItem>
                <AccordionHeading>Benefits of using an accordion</AccordionHeading>
                <AccordionPanel>
                    Accordions reduce clutter & keep users from getting overwhelmed by letting them focus on the
                    information at hand.
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionHeading>Typical places to use an accordion</AccordionHeading>
                <AccordionPanel>
                    FAQ sections, nested navigational items, product information section & content with simple
                    hierarchy.
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionHeading>When to avoid using accordions</AccordionHeading>
                <AccordionPanel>
                    When the user needs access to all of the content on the page, when there is too little content &
                    when the hierarchy of the content is complex.
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}

// --

/**
 * The icon is changeable, however, at the moment the switch animation relies on the default icons and is not available with custom icons.
 */
export const CustomIcon = () => {
    return (
        <Accordion iconPosition="start">
            <AccordionItem icons={{ open: 'arrow-up', closed: 'arrow-down' }}>
                <AccordionHeading>Benefits of using an accordion</AccordionHeading>
                <AccordionPanel>
                    Accordions reduce clutter & keep users from getting overwhelmed by letting them focus on the
                    information at hand.
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem icons={{ open: 'arrow-up', closed: 'arrow-down' }}>
                <AccordionHeading>Typical places to use an accordion</AccordionHeading>
                <AccordionPanel>
                    FAQ sections, nested navigational items, product information section & content with simple
                    hierarchy.
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem icons={{ open: 'arrow-up', closed: 'arrow-down' }}>
                <AccordionHeading>When to avoid using accordions</AccordionHeading>
                <AccordionPanel>
                    When the user needs access to all of the content on the page, when there is too little content &
                    when the hierarchy of the content is complex.
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}

// --

/**
 * Uncontrolled Accordion components' AccordionItem children can be collapsed & expanded indepedently of each other.
 */
export const Uncontrolled = () => {
    return (
        <Accordion uncontrolled>
            <AccordionItem>
                <AccordionHeading>Benefits of using an accordion</AccordionHeading>
                <AccordionPanel>
                    Accordions reduce clutter & keep users from getting overwhelmed by letting them focus on the
                    information at hand.
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionHeading>Typical places to use an accordion</AccordionHeading>
                <AccordionPanel>
                    FAQ sections, nested navigational items, product information section & content with simple
                    hierarchy.
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionHeading>When to avoid using accordions</AccordionHeading>
                <AccordionPanel>
                    When the user needs access to all of the content on the page, when there is too little content &
                    when the hierarchy of the content is complex.
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}
