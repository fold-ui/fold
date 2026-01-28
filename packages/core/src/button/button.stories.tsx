import {
    Button,
    ButtonGroup,
    DarkModeButton,
    Heading,
    IconButton,
    IconLib,
    Menu,
    MenuItem,
    Popover,
    Stack,
    Text,
    View,
    useVisibility,
} from '@fold-dev/core'
import React from 'react'

export default {
    title: 'Core/Button',
    component: Button,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Button',
    subtitle: 'The Button component enables users to perform actions, make selections, and submit forms.',
    description:
        'Buttons serve as fundamental elements in user interfaces and are frequently integrated within encapsulated elements such as cards and dialogs, establishing a contextual connection with the specific component they are placed within.',
}

export const Usage = () => <Button>Okay</Button>

// --

export const Sizes = () => (
    <Stack
        spacing={5}
        wrap="wrap">
        <Button size="xs">Xsmall</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="xl">Xlarge</Button>
    </Stack>
)

// --

export const NormalVariants = () => (
    <View
        column
        wrap="wrap"
        gap="1rem"
        alignItems="flex-start">
        <Heading as="h5">Normal</Heading>
        <Stack
            spacing={5}
            wrap="wrap">
            <Button>Default</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="success">Success</Button>
            <Button variant="neutral">Neutral</Button>
            <Button variant="caution">Caution</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="highlight">Highlight</Button>
        </Stack>
        <Heading as="h5">Disabled</Heading>
        <Stack
            spacing={5}
            wrap="wrap">
            <Button disabled>Default</Button>
            <Button
                disabled
                variant="accent">
                Accent
            </Button>
            <Button
                disabled
                variant="success">
                Success
            </Button>
            <Button
                disabled
                variant="neutral">
                Neutral
            </Button>
            <Button
                disabled
                variant="caution">
                Caution
            </Button>
            <Button
                disabled
                variant="warning">
                Warning
            </Button>
            <Button
                disabled
                variant="danger">
                Danger
            </Button>
            <Button
                disabled
                variant="highlight">
                Highlight
            </Button>
        </Stack>
        <Heading as="h5">Loading</Heading>
        <Stack
            spacing={5}
            wrap="wrap">
            <Button loading>Default</Button>
            <Button
                loading
                variant="accent">
                Accent
            </Button>
            <Button
                loading
                variant="success">
                Success
            </Button>
            <Button
                loading
                variant="neutral">
                Neutral
            </Button>
            <Button
                loading
                variant="caution">
                Caution
            </Button>
            <Button
                loading
                variant="warning">
                Warning
            </Button>
            <Button
                loading
                variant="danger">
                Danger
            </Button>
            <Button
                loading
                variant="highlight">
                Highlight
            </Button>
        </Stack>
        <Heading as="h5">Active</Heading>
        <Stack
            spacing={5}
            wrap="wrap">
            <Button active>Default</Button>
            <Button
                active
                variant="accent">
                Accent
            </Button>
            <Button
                active
                variant="success">
                Success
            </Button>
            <Button
                active
                variant="neutral">
                Neutral
            </Button>
            <Button
                active
                variant="caution">
                Caution
            </Button>
            <Button
                active
                variant="warning">
                Warning
            </Button>
            <Button
                active
                variant="danger">
                Danger
            </Button>
            <Button
                active
                variant="highlight">
                Highlight
            </Button>
        </Stack>
    </View>
)

// --

export const SubtleVariants = () => (
    <View
        column
        gap="1rem"
        alignItems="flex-start">
        <Heading as="h5">Normal</Heading>
        <Stack
            spacing={5}
            wrap="wrap">
            <Button subtle>Default</Button>
            <Button
                subtle
                variant="accent">
                Accent
            </Button>
            <Button
                subtle
                variant="success">
                Success
            </Button>
            <Button
                subtle
                variant="neutral">
                Neutral
            </Button>
            <Button
                subtle
                variant="caution">
                Caution
            </Button>
            <Button
                subtle
                variant="warning">
                Warning
            </Button>
            <Button
                subtle
                variant="danger">
                Danger
            </Button>
            <Button
                subtle
                variant="highlight">
                Highlight
            </Button>
        </Stack>
        <Heading as="h5">Disabled</Heading>
        <Stack
            spacing={5}
            wrap="wrap">
            <Button
                subtle
                disabled>
                Default
            </Button>
            <Button
                subtle
                disabled
                variant="accent">
                Accent
            </Button>
            <Button
                subtle
                disabled
                variant="success">
                Success
            </Button>
            <Button
                subtle
                disabled
                variant="neutral">
                Neutral
            </Button>
            <Button
                subtle
                disabled
                variant="caution">
                Caution
            </Button>
            <Button
                subtle
                disabled
                variant="warning">
                Warning
            </Button>
            <Button
                subtle
                disabled
                variant="danger">
                Danger
            </Button>
            <Button
                subtle
                disabled
                variant="highlight">
                Highlight
            </Button>
        </Stack>
        <Heading as="h5">Loading</Heading>
        <Stack
            spacing={5}
            wrap="wrap">
            <Button
                subtle
                loading>
                Default
            </Button>
            <Button
                subtle
                loading
                variant="accent">
                Accent
            </Button>
            <Button
                subtle
                loading
                variant="success">
                Success
            </Button>
            <Button
                subtle
                loading
                variant="neutral">
                Neutral
            </Button>
            <Button
                subtle
                loading
                variant="caution">
                Caution
            </Button>
            <Button
                subtle
                loading
                variant="warning">
                Warning
            </Button>
            <Button
                subtle
                loading
                variant="danger">
                Danger
            </Button>
            <Button
                subtle
                loading
                variant="highlight">
                Highlight
            </Button>
        </Stack>
        <Heading as="h5">Active</Heading>
        <Stack
            spacing={5}
            wrap="wrap">
            <Button
                subtle
                active>
                Default
            </Button>
            <Button
                subtle
                active
                variant="accent">
                Accent
            </Button>
            <Button
                subtle
                active
                variant="success">
                Success
            </Button>
            <Button
                subtle
                active
                variant="neutral">
                Neutral
            </Button>
            <Button
                subtle
                active
                variant="caution">
                Caution
            </Button>
            <Button
                subtle
                active
                variant="warning">
                Warning
            </Button>
            <Button
                subtle
                active
                variant="danger">
                Danger
            </Button>
            <Button
                subtle
                active
                variant="highlight">
                Highlight
            </Button>
        </Stack>
    </View>
)

// --

export const OutlineVariants = () => (
    <View
        column
        gap="1rem"
        alignItems="flex-start">
        <Heading as="h5">Normal</Heading>
        <Stack
            spacing={5}
            wrap="wrap">
            <Button outline>Default</Button>
            <Button
                outline
                variant="accent">
                Accent
            </Button>
            <Button
                outline
                variant="success">
                Success
            </Button>
            <Button
                outline
                variant="neutral">
                Neutral
            </Button>
            <Button
                outline
                variant="caution">
                Caution
            </Button>
            <Button
                outline
                variant="warning">
                Warning
            </Button>
            <Button
                outline
                variant="danger">
                Danger
            </Button>
            <Button
                outline
                variant="highlight">
                Highlight
            </Button>
        </Stack>
        <Heading as="h5">Disabled</Heading>
        <Stack
            spacing={5}
            wrap="wrap">
            <Button
                outline
                disabled>
                Default
            </Button>
            <Button
                outline
                disabled
                variant="accent">
                Accent
            </Button>
            <Button
                outline
                disabled
                variant="success">
                Success
            </Button>
            <Button
                outline
                disabled
                variant="neutral">
                Neutral
            </Button>
            <Button
                outline
                disabled
                variant="caution">
                Caution
            </Button>
            <Button
                outline
                disabled
                variant="warning">
                Warning
            </Button>
            <Button
                outline
                disabled
                variant="danger">
                Danger
            </Button>
            <Button
                outline
                disabled
                variant="highlight">
                Highlight
            </Button>
        </Stack>
        <Heading as="h5">Loading</Heading>
        <Stack
            spacing={5}
            wrap="wrap">
            <Button
                outline
                loading>
                Default
            </Button>
            <Button
                outline
                loading
                variant="accent">
                Accent
            </Button>
            <Button
                outline
                loading
                variant="success">
                Success
            </Button>
            <Button
                outline
                loading
                variant="neutral">
                Neutral
            </Button>
            <Button
                outline
                loading
                variant="caution">
                Caution
            </Button>
            <Button
                outline
                loading
                variant="warning">
                Warning
            </Button>
            <Button
                outline
                loading
                variant="danger">
                Danger
            </Button>
            <Button
                outline
                loading
                variant="highlight">
                Highlight
            </Button>
        </Stack>
        <Heading as="h5">Active</Heading>
        <Stack
            spacing={5}
            wrap="wrap">
            <Button
                outline
                active>
                Default
            </Button>
            <Button
                outline
                active
                variant="accent">
                Accent
            </Button>
            <Button
                outline
                active
                variant="success">
                Success
            </Button>
            <Button
                outline
                active
                variant="neutral">
                Neutral
            </Button>
            <Button
                outline
                active
                variant="caution">
                Caution
            </Button>
            <Button
                outline
                active
                variant="warning">
                Warning
            </Button>
            <Button
                outline
                active
                variant="danger">
                Danger
            </Button>
            <Button
                outline
                active
                variant="highlight">
                Highlight
            </Button>
        </Stack>
    </View>
)

// --

export const WithPrefixAndSuffix = () => (
    <Stack
        spacing={5}
        wrap="wrap">
        <Button
            as="a"
            href="https://google.com"
            target="_blank"
            prefix={<IconLib icon="circle" />}>
            With Prefix
        </Button>
        <Button
            outline
            variant="accent"
            suffix={<IconLib icon="circle" />}>
            With Suffix
        </Button>
        <Button
            subtle
            variant="danger"
            prefix={<IconLib icon="circle" />}
            suffix={<IconLib icon="circle" />}>
            With Prefix & Suffix
        </Button>
    </Stack>
)

// --

/**
 * Sometimes you need the text of the button to wrap. For this, the Button component offers the handy `ellipsis` prop.
 */
export const EllipsisMode = () => (
    <Button
        prefix={<IconLib icon="circle" />}
        width={150}
        ellipsis>
        This is some really long text!
    </Button>
)

// --

export const AsLink = () => (
    <Stack
        spacing={5}
        wrap="wrap">
        <Button
            as="a"
            href="https://google.com"
            target="_blank">
            Default
        </Button>
        <Button
            as="a"
            href="https://google.com"
            target="_blank"
            subtle
            underlined>
            Subtle
        </Button>
        <Button
            as="a"
            href="https://google.com"
            target="_blank"
            variant="accent"
            subtle
            underlined>
            Accent
        </Button>
        <Button
            as="a"
            href="https://google.com"
            target="_blank"
            variant="success"
            subtle
            underlined>
            Success
        </Button>
        <Button
            as="a"
            href="https://google.com"
            target="_blank"
            variant="neutral"
            subtle>
            Neutral
        </Button>
        <Button
            as="a"
            href="https://google.com"
            target="_blank"
            variant="caution"
            outline>
            Caution
        </Button>
        <Button
            as="a"
            href="https://google.com"
            target="_blank"
            variant="warning"
            outline>
            Warning
        </Button>
        <Button
            as="a"
            href="https://google.com"
            target="_blank"
            variant="danger">
            Danger
        </Button>
        <Button
            as="a"
            href="https://google.com"
            target="_blank"
            variant="highlight"
            underlined>
            Highlight
        </Button>
    </Stack>
)

// --

export const WithIcon = () => (
    <Stack
        spacing={5}
        wrap="wrap">
        <IconButton
            icon="bin"
            size="xs"
            subtle
            variant="highlight"
        />
        <IconButton
            icon="bin"
            size="sm"
            outline
            variant="accent"
        />
        <IconButton
            icon="bin"
            size="md"
        />
        <IconButton
            icon="bin"
            size="lg"
        />
        <IconButton
            icon="bin"
            size="xl"
        />
    </Stack>
)

// --

export const ButtonGroups = () => (
    <Stack
        spacing={10}
        direction="vertical">
        <ButtonGroup>
            <Button>First</Button>
            <Button>Second</Button>
            <IconButton icon="bin" />
        </ButtonGroup>
        <ButtonGroup>
            <Button size="sm">First</Button>
            <Button size="sm">Second</Button>
            <Button size="sm">Third</Button>
            <Button size="sm">Fourth</Button>
        </ButtonGroup>
        <ButtonGroup width={300}>
            <Button>With</Button>
            <Button>Fixed</Button>
            <Button>Width</Button>
        </ButtonGroup>
        <ButtonGroup>
            <Button>Normal Button</Button>
        </ButtonGroup>
        <ButtonGroup
            direction="vertical"
            width={300}>
            <Button>With</Button>
            <Button>Direction</Button>
            <Button>Going</Button>
            <Button>Vertical</Button>
        </ButtonGroup>
        <ButtonGroup>
            <Button
                variant="accent"
                outline>
                Accented
            </Button>
            <Button
                variant="accent"
                outline>
                Accented
            </Button>
        </ButtonGroup>
        <ButtonGroup
            direction="vertical"
            width={300}>
            <Button
                variant="highlight"
                outline>
                With
            </Button>
            <Button
                variant="highlight"
                outline>
                Direction
            </Button>
            <Button
                variant="highlight"
                outline>
                Going
            </Button>
            <Button
                variant="highlight"
                outline>
                Vertical
            </Button>
        </ButtonGroup>
        <ButtonGroup>
            <Button variant="accent">Accented 1</Button>
            <Button variant="accent">Accented 2</Button>
            <Button variant="accent">Accented 3</Button>
        </ButtonGroup>
        <ButtonGroup
            direction="vertical"
            width={300}>
            <Button variant="highlight">With</Button>
            <Button variant="highlight">Direction</Button>
            <Button variant="highlight">Going</Button>
            <Button variant="highlight">Vertical</Button>
        </ButtonGroup>
    </Stack>
)

// --

export const ButtonGroupMenu = () => {
    const { visible, show, hide } = useVisibility(false)

    return (
        <ButtonGroup>
            <Button>Select Action</Button>
            <Popover
                border="none"
                width="fit-content"
                anchor="bottom-right"
                isVisible={visible}
                onDismiss={hide}
                content={
                    <Menu width={200}>
                        <MenuItem>Copy</MenuItem>
                        <MenuItem>Paste</MenuItem>
                        <MenuItem>Delete</MenuItem>
                    </Menu>
                }>
                <Button onClick={show}>
                    <IconLib icon="chevron-down" />
                </Button>
            </Popover>
        </ButtonGroup>
    )
}

// --

/**
 * Fold includes a dark-mode button that automatically toggles between dark & light modes.
 */
export const DarkMode = () => <DarkModeButton />

// --

/**
 * Shorthand utility classes are available to easily apply common styles to elements that function as buttons.
 */
export const UtilityClasees = () => {
    const { visible, show, hide } = useVisibility(false)

    return (
        <Stack
            spacing={10}
            direction="vertical">
            <View
                p="1rem"
                radius="var(--f-radius)"
                width="fit-content"
                border="2px solid var(--f-color-border)"
                className="f-buttonize">
                <Text>Button with opacity</Text>
            </View>
            <View
                p="1rem"
                radius="var(--f-radius)"
                width="fit-content"
                border="2px solid var(--f-color-border)"
                className="f-buttonize-outline">
                <Text>Button with outline</Text>
            </View>
        </Stack>
    )
}
