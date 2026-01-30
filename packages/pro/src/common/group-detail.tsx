import {
    Button,
    Flexer,
    Heading,
    Input,
    InputControl,
    InputPrefix,
    Label,
    Modal,
    ModalClose,
    Palette,
    Portal,
    Textarea,
    View,
    useDialog,
} from '@fold-ui/core'
import React, { useContext, useRef, useState } from 'react'
import { ColorButton } from './color-button'
import { CommonContext } from './common.provider'

export type GroupDetailProps = {
    onCancel: () => void
    onSave: (value) => void
    onDelete: (value) => void
    item: any
}

export const GroupDetail = (props: GroupDetailProps) => {
    const { onCancel, onSave, onDelete, item } = props
    const [name, setName] = useState(item.name)
    const { colors } = useContext(CommonContext)
    const [description, setDescription] = useState(item.description)
    const [color, setColor] = useState(item.color)
    const { setDialog, closeDialog } = useDialog()
    const bodyRef = useRef(null)
    const deleteRef = useRef(null)

    const handleDelete = (e) => {
        setDialog({
            title: 'Are you sure?',
            description: 'This action cannot be undone.',
            portal: Portal,
            onDismiss: (e) => deleteRef.current.focus(),
            footer: (
                <View
                    width="100%"
                    row
                    justifyContent="space-between">
                    <Button onClick={closeDialog}>Cancel</Button>
                    <Button
                        onClick={() => {
                            onDelete(item)
                            closeDialog()
                        }}
                        variant="danger">
                        Delete
                    </Button>
                </View>
            ),
        })
    }

    const handleSave = (e) => {
        onSave({ ...item, name, description, color })
    }

    return (
        <Modal
            focusTrap
            dismissOnEscape
            ref={bodyRef}
            portal={Portal}
            width={500}
            style={{ maxWidth: 1000 }}
            height="fit-content"
            anchor="middle-center"
            onDismiss={(e) => onCancel()}
            isVisible={true}
            headerProps={{ style: { background: 'var(--f-color-surface-strong)' } }}
            footer={
                <View
                    row
                    justifyContent="space-between"
                    width="100%"
                    gap={10}>
                    <Button onClick={onCancel}>Cancel</Button>
                    <Flexer />
                    <Button
                        outline
                        ref={deleteRef}
                        variant="danger"
                        onClick={handleDelete}>
                        Delete
                    </Button>
                    <Button
                        variant="accent"
                        onClick={handleSave}>
                        Save
                    </Button>
                </View>
            }>
            <View
                row
                alignItems="flex-start"
                alignContent="flex-start"
                justifyContent="flex-start">
                <View
                    p={20}
                    column
                    gap="0.75rem"
                    width="100%"
                    alignItems="flex-start">
                    <Label
                        fontWeight={600}
                        colorToken="accent"
                        size="sm">
                        Group title
                    </Label>
                    <InputControl onFocus={(e) => console.log('Focused')}>
                        <InputPrefix>
                            <ColorButton
                                color={color}
                                onChange={setColor}
                                colors={colors}
                            />
                        </InputPrefix>
                        <Input
                            placeholder="Title"
                            type="text"
                            size="lg"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </InputControl>
                    <Label
                        fontWeight={600}
                        colorToken="accent"
                        size="sm">
                        Group description
                    </Label>
                    <Textarea
                        value={description}
                        height={100}
                        className="f-scrollbar"
                        placeholder="Add description"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </View>
            </View>
        </Modal>
    )
}
