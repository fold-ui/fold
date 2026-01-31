import {
    IconLib,
    Menu,
    MenuButton,
    MenuContext,
    MenuDivider,
    MenuHeading,
    MenuItem,
    MenuItemOption,
    MenuOptionGroup,
    MenuProvider,
    Text,
} from '@fold-ui/core'
import React from 'react'

export default {
    title: 'Core/Menu',
    component: Menu,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Menu',
    subtitle:
        'The Menu component displays a set of options within a popover element, which becomes visible when the user interacts with an element or performs an action.',
    description:
        'Menu components are a very common feature of almost any user interface. They are useful when screen real estate is limited or when there is a need to provide additional functionality to the relevant menu target.',
}

/**
 * Whilst not recommended, the automatic focus on the first item can be disabled. It's disabled here so the page doesn't jump down (to focus on the first item).
 */
export const Usage = () => (
    <Menu>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuItem>Cut</MenuItem>
        <MenuItem>Paste</MenuItem>
        <MenuItem>Select</MenuItem>
        <MenuDivider />
        <MenuHeading>Rotation</MenuHeading>
        <MenuItem>Rotate Left</MenuItem>
        <MenuItem>Rotate Right</MenuItem>
        <MenuItem>Flip Horizontal</MenuItem>
        <MenuItem>Flip Vertical</MenuItem>
    </Menu>
)

// --

export const PrefixAndSuffix = () => (
    <Menu>
        <MenuHeading
            prefix={<IconLib icon="circle" />}
            suffix={<IconLib icon="circle" />}>
            Core
        </MenuHeading>
        <MenuItem prefix={<IconLib icon="pen" />}>Edit</MenuItem>
        <MenuItem prefix={<IconLib icon="copy" />}>Copy</MenuItem>
        <MenuItem prefix={<IconLib icon="bin" />}>Cut</MenuItem>
        <MenuItem prefix={<IconLib icon="clipboard" />}>Paste</MenuItem>
        <MenuItem prefix={<IconLib icon="link" />}>Select</MenuItem>
        <MenuItem prefix={<IconLib icon="warning" />}>Delete</MenuItem>
        <MenuItem
            prefix={<IconLib icon="gift" />}
            suffix={<IconLib icon="warning" />}>
            More
        </MenuItem>
    </Menu>
)

// --

export const States = () => (
    <Menu>
        <MenuItem>Normal</MenuItem>
        <MenuItem active>Active</MenuItem>
        <MenuItem disabled>Disabled</MenuItem>
    </Menu>
)

// --

export const OptionGroup = () => (
    <Menu>
        <MenuOptionGroup
            title="Favourite State Manager"
            defaultValue="Context"
            type="radio">
            <MenuItemOption value="Redux">Redux</MenuItemOption>
            <MenuItemOption value="MobX">MobX</MenuItemOption>
            <MenuItemOption value="Zustand">Zustand</MenuItemOption>
            <MenuItemOption value="Context">Context</MenuItemOption>
            <MenuItemOption value="None">None</MenuItemOption>
        </MenuOptionGroup>
    </Menu>
)

// --

export const Submenu = () => (
    <Menu>
        <MenuItem prefix={<IconLib icon="pen" />}>Edit</MenuItem>
        <MenuItem prefix={<IconLib icon="copy" />}>Copy</MenuItem>
        <MenuItem prefix={<IconLib icon="bin" />}>Cut</MenuItem>
        <MenuItem prefix={<IconLib icon="clipboard" />}>Paste</MenuItem>
        <MenuItem prefix={<IconLib icon="link" />}>Select</MenuItem>
        <MenuItem prefix={<IconLib icon="warning" />}>Delete</MenuItem>
        <MenuItem
            prefix={<IconLib icon="gift" />}
            suffix={<IconLib icon="chevron-right" />}
            menu={
                <Menu>
                    <MenuItem>Rotate 45deg</MenuItem>
                    <MenuItem>Rotate 90deg</MenuItem>
                    <MenuItem>Rotate 135deg</MenuItem>
                    <MenuItem>Rotate 180deg</MenuItem>
                    <MenuItem
                        suffix={<IconLib icon="chevron-right" />}
                        menu={
                            <Menu>
                                <MenuItem>Rotate 180deg</MenuItem>
                                <MenuItem>Rotate 270deg</MenuItem>
                                <MenuItem>Rotate 360deg</MenuItem>
                            </Menu>
                        }>
                        Even more
                    </MenuItem>
                </Menu>
            }>
            More
        </MenuItem>
    </Menu>
)

// --

export const Context = () => (
    <MenuProvider
        menu={({ data, dismiss }) => (
            <Menu>
                <MenuHeading>{data.heading ?? 'Context Menu'}</MenuHeading>
                <MenuItem prefix={<IconLib icon="pen" />}>Edit</MenuItem>
                <MenuItem prefix={<IconLib icon="copy" />}>Copy</MenuItem>
                <MenuItem prefix={<IconLib icon="bin" />}>Cut</MenuItem>
                <MenuItem prefix={<IconLib icon="clipboard" />}>Paste</MenuItem>
                <MenuItem prefix={<IconLib icon="link" />}>Select</MenuItem>
                <MenuItem prefix={<IconLib icon="warning" />}>Delete</MenuItem>
            </Menu>
        )}>
        <MenuContext
            p={50}
            m="0 0 1rem 0"
            data={{ heading: 'First block' }}
            bgToken="surface-strong">
            <Text>Right-click anywhere here.</Text>
        </MenuContext>
        <MenuContext
            p={50}
            data={{ heading: 'Second block' }}
            bgToken="surface-strong">
            <Text>Right-click anywhere here.</Text>
        </MenuContext>
    </MenuProvider>
)

// --

export const DropdownMenuButton = () => (
    <MenuButton
        menu={({ dismiss }) => (
            <Menu>
                <MenuItem prefix={<IconLib icon="pen" />}>Edit</MenuItem>
                <MenuItem prefix={<IconLib icon="copy" />}>Copy</MenuItem>
                <MenuItem prefix={<IconLib icon="bin" />}>Cut</MenuItem>
                <MenuItem prefix={<IconLib icon="clipboard" />}>Paste</MenuItem>
                <MenuItem prefix={<IconLib icon="link" />}>Select</MenuItem>
                <MenuItem prefix={<IconLib icon="warning" />}>Delete</MenuItem>
            </Menu>
        )}>
        Options
    </MenuButton>
)

// --

export const MenuBar = () => (
    <Menu variant="menubar">
        <MenuItem prefix={<IconLib icon="pen" />}>Edit</MenuItem>
        <MenuItem prefix={<IconLib icon="copy" />}>Copy</MenuItem>
        <MenuItem prefix={<IconLib icon="bin" />}>Cut</MenuItem>
        <MenuItem prefix={<IconLib icon="clipboard" />}>Paste</MenuItem>
        <MenuItem prefix={<IconLib icon="link" />}>Select</MenuItem>
        <MenuItem prefix={<IconLib icon="warning" />}>Delete</MenuItem>
        <MenuDivider />
        <MenuItem
            prefix={<IconLib icon="gift" />}
            suffix={<IconLib icon="chevron-down" />}
            menu={
                <Menu>
                    <MenuHeading>Rotation</MenuHeading>
                    <MenuItem>Rotate 45deg</MenuItem>
                    <MenuItem>Rotate 90deg</MenuItem>
                    <MenuDivider />
                    <MenuItem>Rotate 135deg</MenuItem>
                    <MenuItem>Rotate 180deg</MenuItem>
                </Menu>
            }>
            More
        </MenuItem>
    </Menu>
)
