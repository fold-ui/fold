import * as Token from '@fold-ui/design/tokens'
import {
    Avatar,
    Badge,
    Button,
    ButtonGroup,
    Card,
    CardList,
    Divider,
    Flexer,
    Heading,
    Image,
    Pill,
    Stack,
    Text,
    View,
} from '@fold-ui/core'
import React from 'react'

export default {
    title: 'Core/Card',
    component: Card,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Card',
    subtitle:
        'The Card component envelops content within a styled container to ensure a consistent visual style within a design system.',
    description:
        'Cards are platforms for presenting content related to a specific subject, they are designed to facilitate quick scanning for important and actionable information.',
}

export const Usage = () => (
    <Card
        width={300}
        footer={
            <>
                <Divider />
                <ButtonGroup
                    p={15}
                    justifyContent="stretch"
                    width="100%">
                    <Button>Book Now</Button>
                    <Button>Add to Wishlist</Button>
                </ButtonGroup>
            </>
        }
        header={
            <Image
                width="100%"
                height={150}
                src="/photos/05.jpg"
            />
        }>
        <View p={20}>
            <Stack
                direction="vertical"
                spacing={10}>
                <View
                    row
                    gap={5}
                    justifyContent="flex-start">
                    <Pill
                        color={Token.ColorBlue400}
                        subtle
                        size="sm">
                        co-working
                    </Pill>
                    <Pill
                        color={Token.ColorAccent400}
                        subtle
                        size="sm">
                        remote
                    </Pill>
                </View>
                <Heading as="h2">Perfect Getaway</Heading>
                <Text>A once in a lifetime opportunity to live and work remotely in a breathtaking location!</Text>
                <Heading
                    as="h4"
                    fontWeight="bold">
                    $ 456,00
                </Heading>
                <Text
                    size="sm"
                    colorToken="accent">
                    Terms & conditions apply
                </Text>
            </Stack>
        </View>
    </Card>
)

// --

/**
 * The CardList component provides an easy way of grouping related cards into a vertical layout.
 */
export const CardLists = () => (
    <CardList width="100%">
        <View
            row
            justifyContent="flex-start"
            p={20}>
            <Avatar
                src="/men/01.jpg"
                name="Brent Fortuin"
            />
            <View
                column
                alignItems="flex-start"
                flex={1}
                p="0 0 0 1rem">
                <Heading
                    as="h5"
                    className="f-user-list-name">
                    Brent Fortuin
                </Heading>
            </View>
            <View row>
                <Button
                    size="sm"
                    outline>
                    Message
                </Button>
            </View>
        </View>

        <View
            row
            justifyContent="flex-start"
            p={20}>
            <Avatar
                src="/women/01.jpg"
                name="Margaret Morris"
            />
            <View
                column
                alignItems="flex-start"
                flex={1}
                p="0 0 0 1rem">
                <Heading
                    as="h5"
                    className="f-user-list-name">
                    Margaret Morris
                </Heading>
            </View>
            <View row>
                <Button
                    size="sm"
                    outline>
                    Message
                </Button>
            </View>
        </View>

        <View
            row
            justifyContent="flex-start"
            p={20}>
            <Avatar
                src="/men/03.jpg"
                name="Kevin Manuel"
            />
            <View
                column
                alignItems="flex-start"
                flex={1}
                p="0 0 0 1rem">
                <Heading
                    as="h5"
                    className="f-user-list-name">
                    Kevin Manuel
                </Heading>
            </View>
            <View row>
                <Button
                    size="sm"
                    outline>
                    Message
                </Button>
            </View>
        </View>
    </CardList>
)

// --

/**
 * The CardGrid component, like the CardList, provides a convenience pattern for creating grid layouts using the Card component.
 */
export const CardGrid = () => (
    <View
        row
        wrap="wrap"
        gap="1rem"
        justifyContent="flex-start">
        <Card
            width={165}
            height={200}
            column
            alignItems="flex-start"
            p={30}>
            <View height={20} />
            <Flexer />
            <View>
                <Heading as="h3">Work</Heading>
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
            width={165}
            height={200}
            column
            alignItems="flex-start"
            p={30}>
            <View height={20} />
            <Flexer />
            <View>
                <Heading as="h3">Projects</Heading>
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
        <Card
            width={165}
            height={200}
            column
            alignItems="flex-start"
            p={30}>
            <View height={20} />
            <Flexer />
            <View>
                <Heading as="h3">Personal</Heading>
                <View row>
                    <Text>5 projects</Text>
                    <Badge
                        variant="success"
                        width={10}
                        height={10}
                        m="0.2rem 0 0 1rem"
                    />
                </View>
            </View>
        </Card>
        <Card
            width={165}
            height={200}
            column
            alignItems="flex-start"
            p={30}>
            <View height={20} />
            <Flexer />
            <View>
                <Heading as="h3">Hobbies</Heading>
                <View row>
                    <Text>9 projects</Text>
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
)
