import React, { CSSProperties, HTMLAttributes } from 'react'
import { classNames } from '../helpers'

export type AuroraVariant = 'sweep' | 'orbit' | 'wave'

type AuroraStyle = CSSProperties & {
    '--f-aurora-height'?: string | number
    '--f-aurora-base'?: string
    '--f-aurora-primary'?: string
    '--f-aurora-secondary'?: string
    '--f-aurora-complement'?: string
    '--f-aurora-highlight'?: string
}

export type AuroraProps = {
    baseColor?: string
    variant?: AuroraVariant
    style?: AuroraStyle
} & Omit<HTMLAttributes<HTMLDivElement>, 'style'>

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

const hexToHsl = (color: string) => {
    const hex = color.replace('#', '')
    const normalized = hex.length === 3 ? hex.replace(/(.)/g, '$1$1') : hex

    if (!/^[0-9a-f]{6}$/i.test(normalized)) {
        return { hue: 245, saturation: 76, lightness: 62 }
    }

    const [red, green, blue] = [0, 2, 4].map((offset) => parseInt(normalized.slice(offset, offset + 2), 16) / 255)
    const max = Math.max(red, green, blue)
    const min = Math.min(red, green, blue)
    const delta = max - min
    const lightness = (max + min) / 2
    let hue = 0

    if (delta) {
        if (max === red) hue = ((green - blue) / delta) % 6
        if (max === green) hue = (blue - red) / delta + 2
        if (max === blue) hue = (red - green) / delta + 4
        hue = (hue * 60 + 360) % 360
    }

    const saturation = delta ? delta / (1 - Math.abs(2 * lightness - 1)) : 0

    return {
        hue: Math.round(hue),
        saturation: Math.round(saturation * 100),
        lightness: Math.round(lightness * 100),
    }
}

const hsl = (hue: number, saturation: number, lightness: number, alpha: number) =>
    `hsl(${Math.round(hue % 360)} ${Math.round(saturation)}% ${Math.round(lightness)}% / ${alpha})`

export const Aurora = ({ baseColor = '#fdfdff', variant = 'sweep', className, style, ...rest }: AuroraProps) => {
    const { hue, saturation, lightness } = hexToHsl(baseColor)
    const colorSaturation = clamp(saturation, 58, 92)
    const lightDirection = lightness > 60 ? -1 : 1
    const primaryLightness = clamp(lightness + lightDirection * 18, 42, 82)
    const secondaryLightness = clamp(lightness + lightDirection * 10, 50, 88)
    const complementLightness = clamp(lightness + lightDirection * 14, 48, 86)
    const auroraStyle: AuroraStyle = {
        '--f-aurora-base': baseColor,
        '--f-aurora-primary': hsl(hue, colorSaturation, primaryLightness, 0.68),
        '--f-aurora-secondary': hsl(hue + 34, colorSaturation * 0.82, secondaryLightness, 0.58),
        '--f-aurora-complement': hsl(hue + 180, colorSaturation * 0.72, complementLightness, 0.45),
        '--f-aurora-highlight': hsl(hue + 12, colorSaturation * 0.32, lightness > 60 ? 98 : 88, 0.82),
        ...style,
    }

    return (
        <div
            {...rest}
            aria-hidden="true"
            className={classNames({ 'f-aurora': true }, [className])}
            data-variant={variant}
            style={auroraStyle}>
            <div className="f-aurora__stage">
                <span className="f-aurora__ribbon f-aurora__ribbon--primary" />
                <span className="f-aurora__ribbon f-aurora__ribbon--secondary" />
                <span className="f-aurora__ribbon f-aurora__ribbon--complement" />
            </div>
            <span className="f-aurora__bloom" />
        </div>
    )
}
