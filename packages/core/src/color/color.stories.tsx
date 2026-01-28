import { ColorPicker, Palette, Text, View } from '@fold-dev/core'
import React, { useState } from 'react'
import * as Token from '@fold-dev/design/tokens'

export default {
    title: 'Core/Color',
    component: ColorPicker,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Color',
    subtitle:
        'The Color Palette and Color Picker components present the user with a set of input options for color values.',
    description: 'Color pickers & palettes are useful for configuring application settings related to color.',
}

/**
 * The Color Picker component enable users to choose their desired color visually, eliminating the need for them to be familiar with the exact HEX, RGB, or HSL color codes.
 */
export const Picker = () => {
    const [color, setColor] = useState(Token.ColorCyan400)

    return (
        <ColorPicker
            border="0.1rem solid var(--f-color-border)"
            radius="var(--f-radius)"
            p={20}
            color={color}
            onChange={setColor}
            footer={
                <View
                    row
                    p={10}>
                    <Text size="sm">Color Picker v0.1</Text>
                </View>
            }
        />
    )
}

// --

/**
 * The Color Palette component displays a list of predefined values the user can choose from.
 */
export const ColorPalette = () => {
    const [color, setColor] = useState(Token.ColorPink400)

    return (
        <Palette
            width={150}
            color={color}
            colors={[
                Token.ColorPink400,
                Token.ColorPink400,
                Token.ColorRed400,
                Token.ColorOrange400,
                Token.ColorYellow400,
                Token.ColorGreen400,
                Token.ColorTeal500,
                Token.ColorTeal400,
                Token.ColorCyan400,
                Token.ColorBlue400,
                Token.ColorBlue400,
                Token.ColorViolet400,
                Token.ColorPurple400,
                Token.ColorGray400,
                Token.ColorStone400,
            ]}
            onChange={setColor}
        />
    )
}
