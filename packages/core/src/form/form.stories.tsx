import {
    Checkbox,
    Form,
    FormControl,
    FormDescription,
    FormFieldset,
    FormHelperText,
    FormLabel,
    IconLib,
    Input,
    InputControl,
    InputPrefix,
    Stack,
    useCheck,
} from '@fold-ui/core'
import React, { useState } from 'react'

export default {
    title: 'Core/Form',
    component: Form,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Form',
    subtitle: 'The Form component provides quick access to native (HTML) form elements.',
    description:
        'The Form component also includes convenient status wrappers that are useful for making the user aware of input states. These can include incomplete or mandatory fields, but also special input criteria such as email addresses.',
}

export const Usage = () => {
    const [name, setName] = useState('')

    return (
        <FormControl>
            <FormLabel htmlFor="input">Full name</FormLabel>
            <FormDescription>To complete your profile, enter your full name</FormDescription>
            <InputControl>
                <InputPrefix>
                    <IconLib icon="user" />
                </InputPrefix>
                <Input
                    placeholder="Please enter your full name"
                    value={name}
                    id="input"
                    onChange={(e) => setName(e.target.value)}
                />
            </InputControl>
            <FormHelperText>Please don't leave any fields blank</FormHelperText>
        </FormControl>
    )
}

// --

export const FormAndFieldset = () => {
    const [name, setName] = useState('')

    return (
        <Form
            action="#"
            method="POST">
            <FormFieldset legend="Profile Setup">
                <FormControl>
                    <FormLabel htmlFor="input">Full name</FormLabel>
                    <FormDescription>To complete your profile, enter your full name</FormDescription>
                    <InputControl>
                        <InputPrefix>
                            <IconLib icon="user" />
                        </InputPrefix>
                        <Input
                            placeholder="Please enter your full name"
                            value={name}
                            id="input"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </InputControl>
                    <FormHelperText>Please don't leave any fields blank</FormHelperText>
                </FormControl>
            </FormFieldset>
        </Form>
    )
}

// --

export const Status = () => {
    const [name1, setName1] = useState('')
    const [name2, setName2] = useState('')
    const [name3, setName3] = useState('')

    return (
        <FormFieldset legend="Profile Setup">
            <Stack
                direction="vertical"
                spacing={20}>
                <FormControl status="error">
                    <FormLabel htmlFor="input1">First name</FormLabel>
                    <FormDescription>Enter your first name</FormDescription>
                    <InputControl>
                        <InputPrefix>
                            <IconLib icon="user" />
                        </InputPrefix>
                        <Input
                            placeholder="Please enter your first name"
                            value={name1}
                            id="input1"
                            onChange={(e) => setName1(e.target.value)}
                        />
                    </InputControl>
                    <FormHelperText
                        kind="error"
                        icon="warning">
                        Please don't leave any fields blank
                    </FormHelperText>
                </FormControl>

                <FormControl status="warning">
                    <FormLabel htmlFor="input2">Second name</FormLabel>
                    <FormDescription>Enter your second name</FormDescription>
                    <InputControl>
                        <InputPrefix>
                            <IconLib icon="user" />
                        </InputPrefix>
                        <Input
                            placeholder="Please enter your second name"
                            value={name2}
                            id="input2"
                            onChange={(e) => setName2(e.target.value)}
                        />
                    </InputControl>
                    <FormHelperText
                        kind="warning"
                        icon="warning">
                        Please don't leave any fields blank
                    </FormHelperText>
                </FormControl>

                <FormControl status="success">
                    <FormLabel htmlFor="input3">Last name</FormLabel>
                    <FormDescription>To complete your profile, enter your last name</FormDescription>
                    <InputControl>
                        <InputPrefix>
                            <IconLib icon="user" />
                        </InputPrefix>
                        <Input
                            placeholder="Please enter your last name"
                            value={name3}
                            id="input3"
                            onChange={(e) => setName3(e.target.value)}
                        />
                    </InputControl>
                    <FormHelperText
                        kind="success"
                        icon="warning">
                        Please don't leave any fields blank
                    </FormHelperText>
                </FormControl>
            </Stack>
        </FormFieldset>
    )
}

// --

/**
 * Fields can also be arranged in horizontal layouts
 */
export const RowLayout = () => {
    const { checked, check } = useCheck(false)

    return (
        <FormControl row>
            <Checkbox
                checked={checked}
                onChange={check}
                id="check"
            />
            <FormLabel htmlFor="check">Send me marketing updates</FormLabel>
        </FormControl>
    )
}
