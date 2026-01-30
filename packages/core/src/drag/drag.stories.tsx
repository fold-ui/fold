import {
    Card,
    DragArea,
    DragElement,
    DragElementArea,
    Heading,
    Stack,
    Text,
    View,
    moveElementInArray,
    useDrag,
    useDragEvent,
} from '@fold-ui/core'
import React, { useState } from 'react'
import { renderToString } from 'react-dom/server'

export default {
    title: 'Core/Drag',
    component: DragArea,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Drag',
    subtitle: 'The Drag component is a flexible drag-and-drop element that supports a wide range of applications.',
    description:
        'Drag and drop components have a wide range of applications, including moving tasks in a todo list application or dropping an element onto a sidebar. The Fold Drag component has been designed with maximum flexibility to support almost any type of application.',
}

export const Usage = () => (
    <DragArea width="100%">
        <Text
            p={10}
            bgToken="surface-strong"
            width="100%">
            ✅ Pick up a dozen unicorn feathers from the magic shop.
        </Text>
        <Text
            p={10}
            bgToken="surface-strong"
            width="100%">
            ✅ Visit the invisible ink store and ask for their new collection.
        </Text>
        <Text
            p={10}
            bgToken="surface-strong"
            width="100%">
            ✅ Purchase a left-handed screwdriver and a bucket of steam at the hardware store.
        </Text>
        <Text
            p={10}
            bgToken="surface-strong"
            width="100%">
            ✅ Retrieve a book on "How to Train Your Pet Rock" from the library.
        </Text>
        <Text
            p={10}
            bgToken="surface-strong"
            width="100%">
            ✅ Attend a top-secret meeting with the Tooth Fairy to discuss dental hygiene.
        </Text>
        <Text
            p={10}
            bgToken="surface-strong"
            width="100%">
            ✅ Get a selfie with Bigfoot in the deep woods.
        </Text>
    </DragArea>
)

// --

/**
 * Groups allow you to seperate draggable items into different droppable areas.
 */
export const Groups = () => (
    <View
        row
        alignItems="flex-start"
        gap={10}>
        <View flex={1}>
            <Heading
                as="h4"
                p={10}>
                Group A
            </Heading>
            <DragArea group="a">
                <Text
                    p={10}
                    bgToken="surface-strong"
                    width="100%">
                    ✅ Buy a gallon of polka-dotted paint.
                </Text>
                <Text
                    p={10}
                    bgToken="surface-strong"
                    width="100%">
                    ✅ Pick up a dozen unicorn feathers from the magic shop.
                </Text>
                <Text
                    p={10}
                    bgToken="surface-strong"
                    width="100%">
                    ✅ Visit the invisible ink store and ask for their new collection.
                </Text>
                <Text
                    p={10}
                    bgToken="surface-strong"
                    width="100%">
                    ✅ Take a dragon for a walk in the park.
                </Text>
            </DragArea>
        </View>
        <View flex={1}>
            <Heading
                as="h4"
                p={10}>
                Group A
            </Heading>
            <DragArea group="a">
                <Text
                    p={10}
                    bgToken="surface-strong"
                    width="100%">
                    ✅ Find the end of a rainbow and collect the leprechaun's pot of gold.
                </Text>
                <Text
                    p={10}
                    bgToken="surface-strong"
                    width="100%">
                    ✅ Pick up a lifetime supply of laughter at the comedy club.
                </Text>
                <Text
                    p={10}
                    bgToken="surface-strong"
                    width="100%">
                    ✅ Purchase a left-handed screwdriver and a bucket of steam at the hardware store.
                </Text>
            </DragArea>
        </View>
        <View flex={1}>
            <Heading
                as="h4"
                p={10}>
                Group B
            </Heading>
            <DragArea group="b">
                <Text
                    p={10}
                    bgToken="surface-strong"
                    width="100%">
                    ❌ Retrieve a book on "How to Train Your Pet Rock" from the library.
                </Text>
                <Text
                    p={10}
                    bgToken="surface-strong"
                    width="100%">
                    ❌ Attend a top-secret meeting with the Tooth Fairy to discuss dental hygiene.
                </Text>
                <Text
                    p={10}
                    bgToken="surface-strong"
                    width="100%">
                    ❌ Get a selfie with Bigfoot in the deep woods.
                </Text>
            </DragArea>
        </View>
    </View>
)

// --

/**
 * Variants define the style of the drag aesthetic. Possible options are `animated` (default), `lined`, `lined-focus` & `focus`.
 */
export const Variants = () => (
    <Stack
        direction="vertical"
        spacing={20}>
        <View
            row
            alignItems="flex-start"
            gap={20}>
            <View flex={1}>
                <Heading
                    as="h4"
                    p={10}>
                    Animated
                </Heading>
                <DragArea
                    group="a"
                    variant="animated">
                    <Text
                        p={10}
                        bgToken="surface-strong"
                        width="100%">
                        ✅ Buy a gallon of polka-dotted paint.
                    </Text>
                    <Text
                        p={10}
                        bgToken="surface-strong"
                        width="100%">
                        ✅ Pick up a dozen unicorn feathers from the magic shop.
                    </Text>
                    <Text
                        p={10}
                        bgToken="surface-strong"
                        width="100%">
                        ✅ Visit the invisible ink store and ask for their new collection.
                    </Text>
                    <Text
                        p={10}
                        bgToken="surface-strong"
                        width="100%">
                        ✅ Take a dragon for a walk in the park.
                    </Text>
                </DragArea>
            </View>
            <View flex={1}>
                <Heading
                    as="h4"
                    p={10}>
                    Focus
                </Heading>
                <DragArea
                    group="b"
                    variant="focus">
                    <Text
                        p={10}
                        bgToken="surface-strong"
                        width="100%">
                        ✅ Find the end of a rainbow and collect the leprechaun's pot of gold.
                    </Text>
                    <Text
                        p={10}
                        bgToken="surface-strong"
                        width="100%">
                        ✅ Pick up a lifetime supply of laughter at the comedy club.
                    </Text>
                    <Text
                        p={10}
                        bgToken="surface-strong"
                        width="100%"
                        data-nofocus={true}>
                        ❌ Purchase a left-handed screwdriver and a bucket of steam at the hardware store (not
                        focusable).
                    </Text>
                    <Text
                        p={10}
                        bgToken="surface-strong"
                        width="100%">
                        ✅ Head to the time-traveling bookstore to find a rare edition of "Wizards and Wyrms: A
                        Comprehensive Guide."
                    </Text>
                </DragArea>
            </View>
        </View>
        <View
            row
            alignItems="flex-start"
            gap={20}>
            <View flex={1}>
                <Heading
                    as="h4"
                    p={10}>
                    Lined
                </Heading>
                <DragArea
                    group="c"
                    variant="lined">
                    <Text
                        p={10}
                        bgToken="surface-strong"
                        width="100%">
                        ✅ Retrieve a book on "How to Train Your Pet Rock" from the library.
                    </Text>
                    <Text
                        p={10}
                        bgToken="surface-strong"
                        width="100%">
                        ✅ Attend a top-secret meeting with the Tooth Fairy to discuss dental hygiene.
                    </Text>
                    <Text
                        p={10}
                        bgToken="surface-strong"
                        width="100%">
                        ✅ Get a selfie with Bigfoot in the deep woods.
                    </Text>
                    <Text
                        p={10}
                        bgToken="surface-strong"
                        width="100%">
                        ✅ Go visit the enchanted forest to exchange potions with the woodland creatures.
                    </Text>
                </DragArea>
            </View>
            <View flex={1}>
                <Heading
                    as="h4"
                    p={10}>
                    Lined Focus
                </Heading>
                <DragArea
                    group="d"
                    variant="lined-focus">
                    <Text
                        p={10}
                        bgToken="surface-strong"
                        width="100%">
                        ✅ Swing by the intergalactic post office to mail a package to Mars.
                    </Text>
                    <Text
                        p={10}
                        bgToken="surface-strong"
                        width="100%">
                        ✅ Drop off the dragon's dry cleaning at the fireproof laundromat.
                    </Text>
                    <Text
                        p={10}
                        bgToken="surface-strong"
                        width="100%">
                        ✅ Fetch a special blend of star-dust coffee beans from the celestial coffee shop.
                    </Text>
                    <Text
                        p={10}
                        bgToken="surface-strong"
                        width="100%">
                        ✅ Deliver a message to the mermaids in the underwater kingdom.
                    </Text>
                </DragArea>
            </View>
        </View>
    </Stack>
)

// --

/**
 * Target variants enable the dragged element to activate variants, based on the droppable `<DragArea />` group. For example; they are useful for dragging a task onto a navigation item.
 */
export const TargetVariants = () => (
    <View>
        <DragArea
            group="e"
            m="0 0 20px 0"
            targetVariant={{
                a: 'focus',
                b: 'lined',
                c: 'lined-focus',
                d: 'animated',
            }}>
            <Text
                p={10}
                bgToken="surface-strong"
                width="100%">
                ✅ Pick up a gallon of elbow grease from the hardware store.
            </Text>
            <Text
                p={10}
                bgToken="surface-strong"
                width="100%">
                ✅ Buy a lottery ticket with the winning numbers already circled.
            </Text>
            <Text
                p={10}
                bgToken="surface-strong"
                width="100%">
                ✅ Pick up a can of striped paint from the paint store.
            </Text>
            <Text
                p={10}
                bgToken="surface-strong"
                width="100%">
                ✅ Get a ladder for your pet giraffe.
            </Text>
        </DragArea>

        <Stack
            direction="vertical"
            spacing={20}>
            <View
                row
                alignItems="flex-start"
                gap={20}>
                <View flex={1}>
                    <Heading
                        as="h4"
                        p={10}>
                        Animated / Focus
                    </Heading>
                    <DragArea
                        group="a"
                        variant="animated">
                        <Text
                            p={10}
                            bgToken="surface-strong"
                            width="100%">
                            ✅ Buy a gallon of polka-dotted paint.
                        </Text>
                        <Text
                            p={10}
                            bgToken="surface-strong"
                            width="100%">
                            ✅ Pick up a dozen unicorn feathers from the magic shop.
                        </Text>
                        <Text
                            p={10}
                            bgToken="surface-strong"
                            width="100%">
                            ✅ Visit the invisible ink store and ask for their new collection.
                        </Text>
                        <Text
                            p={10}
                            bgToken="surface-strong"
                            width="100%">
                            ✅ Take a dragon for a walk in the park.
                        </Text>
                    </DragArea>
                </View>
                <View flex={1}>
                    <Heading
                        as="h4"
                        p={10}>
                        Focus / Lined
                    </Heading>
                    <DragArea
                        group="b"
                        variant="focus">
                        <Text
                            p={10}
                            bgToken="surface-strong"
                            width="100%">
                            ✅ Find the end of a rainbow and collect the leprechaun's pot of gold.
                        </Text>
                        <Text
                            p={10}
                            bgToken="surface-strong"
                            width="100%">
                            ✅ Pick up a lifetime supply of laughter at the comedy club.
                        </Text>
                        <Text
                            p={10}
                            bgToken="surface-strong"
                            width="100%">
                            ✅ Purchase a left-handed screwdriver and a bucket of steam at the hardware store.
                        </Text>
                        <Text
                            p={10}
                            bgToken="surface-strong"
                            width="100%">
                            ✅ Head to the time-traveling bookstore to find a rare edition of "Wizards and Wyrms: A
                            Comprehensive Guide."
                        </Text>
                    </DragArea>
                </View>
            </View>
            <View
                row
                alignItems="flex-start"
                gap={20}>
                <View flex={1}>
                    <Heading
                        as="h4"
                        p={10}>
                        Lined / Lined Focus
                    </Heading>
                    <DragArea
                        group="c"
                        variant="lined">
                        <Text
                            p={10}
                            bgToken="surface-strong"
                            width="100%">
                            ✅ Retrieve a book on "How to Train Your Pet Rock" from the library.
                        </Text>
                        <Text
                            p={10}
                            bgToken="surface-strong"
                            width="100%">
                            ✅ Attend a top-secret meeting with the Tooth Fairy to discuss dental hygiene.
                        </Text>
                        <Text
                            p={10}
                            bgToken="surface-strong"
                            width="100%">
                            ✅ Get a selfie with Bigfoot in the deep woods.
                        </Text>
                        <Text
                            p={10}
                            bgToken="surface-strong"
                            width="100%">
                            ✅ Go visit the enchanted forest to exchange potions with the woodland creatures.
                        </Text>
                    </DragArea>
                </View>
                <View flex={1}>
                    <Heading
                        as="h4"
                        p={10}>
                        Lined Focus / Animated
                    </Heading>
                    <DragArea
                        group="d"
                        variant="lined-focus">
                        <Text
                            p={10}
                            bgToken="surface-strong"
                            width="100%">
                            ✅ Swing by the intergalactic post office to mail a package to Mars.
                        </Text>
                        <Text
                            p={10}
                            bgToken="surface-strong"
                            width="100%">
                            ✅ Drop off the dragon's dry cleaning at the fireproof laundromat.
                        </Text>
                        <Text
                            p={10}
                            bgToken="surface-strong"
                            width="100%">
                            ✅ Fetch a special blend of star-dust coffee beans from the celestial coffee shop.
                        </Text>
                        <Text
                            p={10}
                            bgToken="surface-strong"
                            width="100%">
                            ✅ Deliver a message to the mermaids in the underwater kingdom.
                        </Text>
                    </DragArea>
                </View>
            </View>
        </Stack>
    </View>
)

// --

export const BasicKanban = () => (
    <View
        row
        wrap="wrap"
        alignItems="flex-start"
        gap={5}>
        <View flex={1}>
            <Heading
                as="h4"
                p={10}>
                To Do
            </Heading>
            <DragArea>
                <Text
                    p={10}
                    bgToken="surface-strong"
                    width="100%">
                    ✅ Buy a gallon of polka-dotted paint.
                </Text>
                <Text
                    p={10}
                    bgToken="surface-strong"
                    width="100%">
                    ✅ Pick up a dozen unicorn feathers from the magic shop.
                </Text>
                <Text
                    p={10}
                    bgToken="surface-strong"
                    width="100%">
                    ✅ Visit the invisible ink store and ask for their new collection.
                </Text>
                <Text
                    p={10}
                    bgToken="surface-strong"
                    width="100%">
                    ✅ Take a dragon for a walk in the park.
                </Text>
            </DragArea>
        </View>
        <View flex={1}>
            <Heading
                as="h4"
                p={10}>
                Doing
            </Heading>
            <DragArea>
                <Text
                    p={10}
                    bgToken="surface-strong"
                    width="100%">
                    ✅ Find the end of a rainbow and collect the leprechaun's pot of gold.
                </Text>
                <Text
                    p={10}
                    bgToken="surface-strong"
                    width="100%">
                    ✅ Pick up a lifetime supply of laughter at the comedy club.
                </Text>
                <Text
                    p={10}
                    bgToken="surface-strong"
                    width="100%">
                    ✅ Purchase a left-handed screwdriver and a bucket of steam at the hardware store.
                </Text>
                <Text
                    p={10}
                    bgToken="surface-strong"
                    width="100%">
                    ✅ Head to the time-traveling bookstore to find a rare edition of "Wizards and Wyrms: A
                    Comprehensive Guide."
                </Text>
            </DragArea>
        </View>
        <View flex={1}>
            <Heading
                as="h4"
                p={10}>
                Done
            </Heading>
            <DragArea>
                <Text
                    p={10}
                    bgToken="surface-strong"
                    width="100%">
                    ✅ Retrieve a book on "How to Train Your Pet Rock" from the library.
                </Text>
                <Text
                    p={10}
                    bgToken="surface-strong"
                    width="100%">
                    ✅ Attend a top-secret meeting with the Tooth Fairy to discuss dental hygiene.
                </Text>
                <Text
                    p={10}
                    bgToken="surface-strong"
                    width="100%">
                    ✅ Get a selfie with Bigfoot in the deep woods.
                </Text>
                <Text
                    p={10}
                    bgToken="surface-strong"
                    width="100%">
                    ✅ Go visit the enchanted forest to exchange potions with the woodland creatures.
                </Text>
            </DragArea>
        </View>
        <View flex={1}>
            <Heading
                as="h4"
                p={10}>
                Backlog
            </Heading>
            <DragArea>
                <Text
                    p={10}
                    bgToken="surface-strong"
                    width="100%">
                    ✅ Swing by the intergalactic post office to mail a package to Mars.
                </Text>
                <Text
                    p={10}
                    bgToken="surface-strong"
                    width="100%">
                    ✅ Drop off the dragon's dry cleaning at the fireproof laundromat.
                </Text>
                <Text
                    p={10}
                    bgToken="surface-strong"
                    width="100%">
                    ✅ Fetch a special blend of star-dust coffee beans from the celestial coffee shop.
                </Text>
                <Text
                    p={10}
                    bgToken="surface-strong"
                    width="100%">
                    ✅ Deliver a message to the mermaids in the underwater kingdom.
                </Text>
            </DragArea>
        </View>
    </View>
)

// --

export const SavingAfterDrop = () => {
    const [items, setItems] = useState([
        { id: 'id1', text: '✅ Swing by the intergalactic post office to mail a package to Mars.' },
        { id: 'id2', text: "✅ Drop off the dragon's dry cleaning at the fireproof laundromat." },
        { id: 'id3', text: '✅ Fetch a special blend of star-dust coffee beans from the celestial coffee shop.' },
        { id: 'id4', text: '✅ Deliver a message to the mermaids in the underwater kingdom.' },
        { id: 'id5', text: '✅ Break into the secret underground hotel.' },
        { id: 'id6', text: '✅ Clean up after my pet Pheonix.' },
    ])

    const handleDragOnDrop = ({ detail: { target, origin } }) => {
        if (origin.group == 'save-after-drop') {
            setItems(moveElementInArray(items, origin, target))
        }
    }

    useDragEvent('ondrop', handleDragOnDrop)

    return (
        <View
            row
            width="100%"
            alignItems="flex-start">
            <DragArea
                width="100%"
                group="save-after-drop">
                {items.map((item, index) => (
                    <Text
                        key={index}
                        p={10}
                        bgToken="surface-strong"
                        width="100%">
                        {item.text} (index #{index})
                    </Text>
                ))}
            </DragArea>
        </View>
    )
}

// --

export const CustomGhostElement = () => {
    const { setCustomGhostElement } = useDrag()
    const [items, setItems] = useState([
        { id: 'id1', text: 'Swing by the intergalactic post office to mail a package to Mars.' },
        { id: 'id2', text: "Drop off the dragon's dry cleaning at the fireproof laundromat." },
        { id: 'id3', text: 'Fetch a special blend of star-dust coffee beans from the celestial coffee shop.' },
        { id: 'id4', text: 'Deliver a message to the mermaids in the underwater kingdom.' },
        { id: 'id5', text: 'Break into the secret underground hotel.' },
        { id: 'id6', text: 'Clean up after my pet Pheonix.' },
    ])

    const handleDragOnDrop = ({ detail: { target, origin } }) => {
        if (origin.group == 'custom-ghost-element') {
            setItems(moveElementInArray(items, origin, target))
        }
    }

    useDragEvent('ondrop', handleDragOnDrop)

    return (
        <View
            column
            gap="1rem"
            width="100%"
            alignItems="flex-start">
            <Heading as="h4">Drag Area</Heading>
            <DragArea
                variant="lined"
                width="100%"
                group="custom-ghost-element">
                {items.map((item, index) => (
                    <Text
                        key={index}
                        p={10}
                        bgToken="surface-strong"
                        width="100%"
                        onMouseDown={(e) => {
                            console.log('1')
                            setCustomGhostElement(
                                renderToString(
                                    <div
                                        className="f-card f-text"
                                        style={{ padding: 10, width: 'fit-content' }}>
                                        <div className="f-text">
                                            Dragging {items[index].text.toLowerCase().substring(0, 10)} ...
                                        </div>
                                    </div>
                                )
                            )
                        }}>
                        {item.text} (index #{index})
                    </Text>
                ))}
            </DragArea>
            <Heading as="h4">Drag Element Area</Heading>
            <DragElementArea
                variant="lined"
                width="100%"
                group="custom-ghost-element">
                {items.map((item, index) => (
                    <DragElement
                        key={index}
                        onMouseDown={(e) => {
                            setCustomGhostElement(
                                renderToString(
                                    <div
                                        className="f-card f-text"
                                        style={{ padding: 10, width: 'fit-content' }}>
                                        <div className="f-text">
                                            Dragging {items[index].text.toLowerCase().substring(0, 10)} ...
                                        </div>
                                    </div>
                                )
                            )
                        }}>
                        <Text
                            key={index}
                            p={10}
                            bgToken="surface-strong"
                            width="100%">
                            {item.text} (index #{index})
                        </Text>
                    </DragElement>
                ))}
            </DragElementArea>
        </View>
    )
}

// --

/**
 * The `<DragElementArea />` & `<DragElement />` components offer a more granular control over draggable items, instead of `<DragArea />` that wraps each child in a `<DragElement />` automatically.
 */
export const DragElementTargetVariants = () => (
    <View>
        <Heading
            as="h4"
            p={10}>
            Draggable items that target variant groups below.
        </Heading>
        <DragElementArea
            group="e"
            m="0 0 20px 0"
            targetVariant={{
                a: 'focus',
                b: 'lined',
                c: 'animated',
                d: 'lined-focus',
            }}>
            <DragElement>
                <Text
                    p={10}
                    bgToken="surface-strong"
                    width="100%">
                    ✅ Pick up a gallon of elbow grease from the hardware store.
                </Text>
            </DragElement>
            <DragElement>
                <Text
                    p={10}
                    bgToken="surface-strong"
                    width="100%">
                    ✅ Buy a lottery ticket with the winning numbers already circled.
                </Text>
            </DragElement>
            <DragElement>
                <Text
                    p={10}
                    bgToken="surface-strong"
                    width="100%">
                    ✅ Pick up a can of striped paint from the paint store.
                </Text>
            </DragElement>
            <DragElement>
                <Text
                    p={10}
                    bgToken="surface-strong"
                    width="100%">
                    ✅ Get a ladder for your pet giraffe.
                </Text>
            </DragElement>
        </DragElementArea>

        <Stack
            direction="vertical"
            spacing={20}>
            <View
                row
                alignItems="flex-start"
                gap={20}>
                <View flex={1}>
                    <Heading
                        as="h4"
                        p={10}>
                        Lined Focus
                    </Heading>
                    <Heading
                        as="h5"
                        p={10}>
                        Target variant: Lined Focus
                    </Heading>
                    <DragElementArea
                        group="d"
                        variant="lined-focus">
                        <DragElement>
                            <Text
                                p={10}
                                bgToken="surface-strong"
                                width="100%">
                                ✅ Retrieve a book on "How to Train Your Pet Rock" from the library.
                            </Text>
                        </DragElement>
                        <DragElement noFocus>
                            <Text
                                p={10}
                                bgToken="surface-strong"
                                width="100%">
                                ✅ Attend a top-secret meeting with the Tooth Fairy to discuss dental hygiene (not
                                focusable).
                            </Text>
                        </DragElement>
                        <DragElement>
                            <Text
                                p={10}
                                bgToken="surface-strong"
                                width="100%">
                                ✅ Get a selfie with Bigfoot in the deep woods.
                            </Text>
                        </DragElement>
                        <DragElement>
                            <Text
                                p={10}
                                bgToken="surface-strong"
                                width="100%">
                                ✅ Go visit the enchanted forest to exchange potions with the woodland creatures.
                            </Text>
                        </DragElement>
                    </DragElementArea>
                </View>
            </View>
            <View
                row
                alignItems="flex-start"
                gap={20}>
                <View flex={1}>
                    <Heading
                        as="h4"
                        p={10}>
                        Animated
                    </Heading>
                    <Heading
                        as="h5"
                        p={10}>
                        Target variant: Focus
                    </Heading>
                    <DragElementArea
                        group="a"
                        variant="animated">
                        <DragElement>
                            <Text
                                p={10}
                                bgToken="surface-strong"
                                width="100%">
                                ✅ Buy a gallon of polka-dotted paint.
                            </Text>
                        </DragElement>
                        <DragElement>
                            <Text
                                p={10}
                                bgToken="surface-strong"
                                width="100%">
                                ✅ Pick up a dozen unicorn feathers from the magic shop.
                            </Text>
                        </DragElement>
                        <DragElement>
                            <Text
                                p={10}
                                bgToken="surface-strong"
                                width="100%">
                                ✅ Visit the invisible ink store and ask for their new collection.
                            </Text>
                        </DragElement>
                        <DragElement>
                            <Text
                                p={10}
                                bgToken="surface-strong"
                                width="100%">
                                ✅ Take a dragon for a walk in the park.
                            </Text>
                        </DragElement>
                    </DragElementArea>
                </View>
                <View flex={1}>
                    <Heading
                        as="h4"
                        p={10}>
                        Focus
                    </Heading>
                    <Heading
                        as="h5"
                        p={10}>
                        Target variant: Lined
                    </Heading>
                    <DragElementArea
                        group="b"
                        variant="focus">
                        <DragElement>
                            <Text
                                p={10}
                                bgToken="surface-strong"
                                width="100%">
                                ✅ Find the end of a rainbow and collect the leprechaun's pot of gold.
                            </Text>
                        </DragElement>
                        <DragElement>
                            <Text
                                p={10}
                                bgToken="surface-strong"
                                width="100%">
                                ✅ Pick up a lifetime supply of laughter at the comedy club.
                            </Text>
                        </DragElement>
                        <DragElement>
                            <Text
                                p={10}
                                bgToken="surface-strong"
                                width="100%">
                                ✅ Purchase a left-handed screwdriver and a bucket of steam at the hardware store.
                            </Text>
                        </DragElement>
                        <DragElement>
                            <Text
                                p={10}
                                bgToken="surface-strong"
                                width="100%">
                                ✅ Head to the time-traveling bookstore to find a rare edition of "Wizards and Wyrms: A
                                Comprehensive Guide."
                            </Text>
                        </DragElement>
                    </DragElementArea>
                </View>
            </View>
            <View
                row
                alignItems="flex-start"
                gap={20}>
                <View flex={1}>
                    <Heading
                        as="h4"
                        p={10}>
                        Lined
                    </Heading>
                    <Heading
                        as="h5"
                        p={10}>
                        Target variant: Animated
                    </Heading>
                    <DragElementArea
                        group="c"
                        variant="lined">
                        <DragElement>
                            <Text
                                p={10}
                                bgToken="surface-strong"
                                width="100%">
                                ✅ Retrieve a book on "How to Train Your Pet Rock" from the library.
                            </Text>
                        </DragElement>
                        <DragElement>
                            <Text
                                p={10}
                                bgToken="surface-strong"
                                width="100%">
                                ✅ Attend a top-secret meeting with the Tooth Fairy to discuss dental hygiene.
                            </Text>
                        </DragElement>
                        <DragElement>
                            <Text
                                p={10}
                                bgToken="surface-strong"
                                width="100%">
                                ✅ Get a selfie with Bigfoot in the deep woods.
                            </Text>
                        </DragElement>
                        <DragElement>
                            <Text
                                p={10}
                                bgToken="surface-strong"
                                width="100%">
                                ✅ Go visit the enchanted forest to exchange potions with the woodland creatures.
                            </Text>
                        </DragElement>
                    </DragElementArea>
                </View>
            </View>
        </Stack>
    </View>
)
