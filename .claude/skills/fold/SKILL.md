---
name: fold
description: >
  Contextual guide for developing with and contributing to the Fold UI component library. Use this skill whenever working on Fold code, adding components, fixing bugs, writing stories, or building apps with @fold-ui/core or @fold-ui/pro. Trigger on any mention of fold, fold-ui, @fold-ui/core, @fold-ui/pro, or when the working directory is within /Users/joduplessis/work/fold/fold/. Also use when the user references Fold components like View, Stack, Button, Input, Modal, Tabs, DataGrid, Calendar, Kanban, or any component from the Fold library.
---

# Fold UI Development Guide

Fold is a zero-dependency, fully customizable React component library for building scalable products. It provides 80+ core components and specialized pro components (Calendar, Kanban, Todo).

**Docs:** https://fold.dev/docs
**Repository:** /Users/joduplessis/work/fold/fold/

## Architecture Overview

Monorepo with 3 published packages under `@fold-ui` scope:

```
packages/
  core/     → 80+ base UI components (@fold-ui/core)
  pro/      → Advanced components: Calendar, Kanban, Todo (@fold-ui/pro)
  design/   → Design tokens via Style Dictionary (@fold-ui/design)
```

**Tech stack:** TypeScript 4.8, React 18, Storybook 7, Jest 29, ESBuild, PostCSS, npm workspaces.

## Component Directory Structure

Every component follows this structure:

```
packages/core/src/{component-name}/
  ├── {component-name}.tsx          → Component implementation
  ├── {component-name}.stories.tsx  → Storybook stories & docs
  ├── {component-name}.test.tsx     → Jest tests (optional)
  ├── {component-name}.css          → Component styles
  └── index.ts                      → Re-exports
```

All components are re-exported from `packages/core/src/index.ts`.

## Component Implementation Pattern

Components use `forwardRef`, extend `CoreViewProps`, and use the `classNames` helper:

```tsx
import { CoreViewProps, classNames } from '../helpers'
import React, { forwardRef } from 'react'

export type MyComponentProps = {
    variant?: Variant
    size?: Size
    disabled?: boolean
    loading?: boolean
} & CoreViewProps

export const MyComponent = forwardRef((props: MyComponentProps, ref) => {
    const { variant = 'default', size = 'md', ...rest } = props

    const className = classNames(
        {
            'f-mycomponent': true,
            'is-active': props.active,
            'is-disabled': props.disabled,
        },
        [size, props.className, getActionClass(variant)]
    )

    return (
        <View {...rest} className={className} ref={ref}>
            {props.children}
        </View>
    )
})
```

## Stories Pattern

Every stories file follows this exact format:

```tsx
import { ComponentName, View, Stack } from '@fold-ui/core'
import React from 'react'

export default {
    title: 'Core/ComponentName',       // Storybook nav path
    component: ComponentName,
    excludeStories: 'docs',
}

export const docs = {
    title: 'ComponentName',
    subtitle: 'One-line description of the component.',
    description: 'Detailed description of the component purpose and usage.',
}

export const Usage = () => <ComponentName>Basic usage</ComponentName>

// --

export const Sizes = () => (
    <Stack spacing={5} wrap="wrap">
        <ComponentName size="xs">Xsmall</ComponentName>
        <ComponentName size="md">Medium</ComponentName>
    </Stack>
)
```

- Stories are separated by `// --` comments
- The `docs` export provides metadata (title, subtitle, description)
- `excludeStories: 'docs'` prevents docs from rendering as a story

## Core Type System

All components extend `CoreViewProps` which provides:

### ShorthandProps (layout/styling)
- `bg`, `bgToken`, `color`, `colorToken` - colors
- `width`, `height` - dimensions
- `p` (padding), `m` (margin) - spacing
- `radius`, `shadow`, `border` - decoration
- `fontSize`, `fontWeight`, `lineHeight`, `font` - typography
- `row`, `column` - flex direction shortcuts
- `gap`, `flex`, `grow`, `shrink`, `wrap` - flex layout
- `alignItems`, `justifyContent`, `alignContent`, `alignSelf` - alignment
- `position`, `zIndex`, `display` - positioning
- `align` - ViewAlign shorthand (e.g., `"h-middle-center"`)

### CommonProps
- `children`, `id`, `className`, `style`, `disabled`, `tabIndex`, `role`

### Shared Types
- **Size:** `'xs' | 'sm' | 'md' | 'lg' | 'xl'`
- **Variant:** `'default' | 'accent' | 'success' | 'neutral' | 'caution' | 'warning' | 'danger' | 'highlight'`
- **Weight:** `'hairline' | 'thin' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black'`
- **PopoutPosition:** `'bottom-left' | 'bottom-right' | 'bottom-center' | 'top-left' | 'top-right' | 'top-center' | 'middle-left' | 'middle-right'`

## Key Components Reference

### Layout
- **View** - Base div wrapper, supports all shorthand props, `row`/`column` shortcuts
- **Stack** - Flex container with `spacing` and `direction` props
- **Grid** - CSS Grid wrapper
- **Layout** - App-level layout with header/sidebar/content regions
- **Splitter** - Resizable split panels
- **Divider** - Horizontal/vertical separator

### Form
- **Input** - Text input with `InputPrefix`, `InputSuffix`, `InputControl`, `InputPopover`
- **Textarea** - Multi-line text input
- **Checkbox** - Checkbox with label
- **Radio** - Radio button group
- **Select** - Dropdown select
- **Toggle** - Toggle switch
- **Range** - Range slider
- **PinInput** - PIN code input
- **TagInput** - Tag/chip input with `TagInputField`
- **ColorPicker** - Color selection
- **DatePicker** - Date selection

### Display
- **Button** - Buttons with `variant`, `size`, `subtle`, `outline`, `loading`, `active`, `prefix`/`suffix`
- **IconButton** - Icon-only button with `icon` prop
- **ButtonGroup** - Groups buttons together
- **Badge** - Status badge
- **Pill** - Tag/chip display
- **Avatar** - User avatar
- **Text** - Text display
- **Heading** - Heading element (`as="h1"` through `as="h6"`)

### Overlay
- **Modal** - Modal dialog with `Portal`, `ModalClose`, `isVisible`, `onDismiss`, `anchor`
- **Drawer** - Slide-in panel
- **Popover** - Popover with `anchor`, `isVisible`, `onDismiss`, `content` prop
- **Tooltip** - Hover tooltip
- **Dialog** - Confirmation dialog (via FoldContext)
- **Toast** - Notification toasts

### Navigation
- **Tabs** - Tab navigation
- **Pagination** - Page navigation
- **Breadcrumb** - Breadcrumb trail
- **Menu** / **MenuItem** - Menu lists
- **Navigation** - Sidebar navigation

### Data
- **Table** - HTML table wrapper
- **DataGrid** - Advanced data grid
- **List** / **Li** - List components

### Feedback
- **Spinner** - Loading spinner
- **Skeleton** - Content placeholder
- **Progress** - Progress bar
- **Alert** - Alert message
- **Notification** - Notification display

### Utility
- **Portal** - Renders children in a portal
- **Icon** / **IconLib** - Icon rendering (use `IconLib` for registered icons)
- **If** - Conditional rendering
- **Copy** - Copy-to-clipboard
- **Kbd** - Keyboard shortcut display
- **Flexer** - Flex spacer element
- **Hidden** - Responsive hide/show
- **Collapsible** - Expandable content

### Pro Components (`@fold-ui/pro`)
- **Calendar** - Full calendar with date/range selection
- **Kanban** - Drag-and-drop kanban board
- **Todo** - Task management interface

## Common Hooks

- `useVisibility(initialState)` - Returns `{ visible, show, hide }` for toggle state
- `useTheme()` - Access/toggle theme (light/dark)
- `useEvent()` - Add DOM event listeners
- `useCustomEvent()` - Custom event pub/sub
- `useWindowEvent()` - Window-level event listeners

## CSS Conventions

- Component class: `f-{componentname}` (e.g., `f-button`, `f-modal`)
- State modifiers: `is-{state}` (e.g., `is-active`, `is-disabled`, `is-loading`)
- Feature modifiers: `has-{feature}`
- CSS variables: `var(--f-color-accent)`, `var(--f-radius)`, `var(--f-color-border)`
- Utility classes: `f-buttonize`, `f-buttonize-outline`, `f-row`, `f-col`
- Variant classes via `getActionClass(variant)` helper

## Design Tokens (packages/design/)

Generated via Style Dictionary from JSON tokens at `packages/design/tokens/theme/`:
- `tokens.css` - All CSS variables
- `tokens-light.css` / `tokens-dark.css` - Theme-specific
- Token prefix: `--f-` (e.g., `--f-color-accent`, `--f-radius`, `--f-font-size-md`)

## AppProvider

Root context provider required at app root:
- Theme management with localStorage persistence
- Dialog/Alert system via context
- Drag manager for drag-and-drop
- Toast container
- Icon registration (30+ default icons)

## Build & Dev Commands

```bash
npm run dev          # Start Storybook + file watchers
npm run storybook    # Storybook on port 6006
npm run build        # TypeScript compilation (per package)
npm run build:styles # CSS processing (per package)
npm run build:prod   # Production build with minified CSS
npm run test         # Jest tests
npm run lint         # ESLint
npm run lint:fix     # ESLint with auto-fix
```

## Common Patterns

### Visibility toggle (modals, popovers, drawers)
```tsx
const { visible, show, hide } = useVisibility(false)
<Button onClick={show}>Open</Button>
<Modal isVisible={visible} onDismiss={hide} portal={Portal}>...</Modal>
```

### Polymorphic rendering
```tsx
<Button as="a" href="https://example.com" target="_blank">Link Button</Button>
```

### Prefix/Suffix icons
```tsx
<Button prefix={<IconLib icon="circle" />} suffix={<IconLib icon="arrow-right" />}>
    Label
</Button>
```

### Form input with controls
```tsx
<Input value={text} onChange={(e) => setText(e.target.value)}
    prefix={<InputPrefix>$</InputPrefix>}
    suffix={<InputSuffix>.00</InputSuffix>}
/>
```

## Gotchas

1. **Always use `Portal` prop** on Modal/Drawer to render in a portal
2. **`classNames` helper** takes an object of conditional classes and an array of additional classes
3. **Imports** - always import from `@fold-ui/core` or `@fold-ui/pro`, not relative paths (in stories/consuming apps)
4. **forwardRef** - all components must use forwardRef for ref forwarding
5. **`// --` separators** in stories files are used by the docs system to separate examples
6. **`excludeStories: 'docs'`** must be set in story defaults to prevent the docs metadata from rendering
