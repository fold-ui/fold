import React, { forwardRef, useEffect, useMemo, useState } from 'react'
import { Badge, IconLib, Image, ImageProps, View } from '../'
import { classNames, cleanObject, documentObject, getForegroundColor } from '../helpers'
import { Text, TextProps } from '../text/text'
import { CoreViewProps, Size } from '../types'

export type AvatarProps = {
    subtle?: boolean
    size?: Size
    color?: string
    icon?: string
    name?: string
    src?: string
    textProps?: TextProps
    imageProps?: ImageProps
    presence?: 'online' | 'busy' | 'away'
} & CoreViewProps

export const Avatar = forwardRef((props: AvatarProps, ref) => {
    const {
        subtle,
        size = 'md',
        color,
        icon,
        name = '',
        src,
        imageProps = {},
        style = {},
        textProps = {},
        presence,
        ...rest
    } = props
    const initials = useMemo(() => {
        return name
            .trim()
            .split(/\s+/, 2)
            .map((word) => word[0] ?? '')
            .join('')
            .replace(/[^\p{L}\p{N}\s]/gu, '')
    }, [name])
    const presenceVariant = useMemo(() => {
        switch (presence) {
            case 'online':
                return 'success'
            case 'away':
                return 'warning'
            case 'busy':
                return 'danger'
            default:
                return
        }
    }, [presence])
    const presenceBadgeDistance = useMemo(() => {
        switch (size) {
            case 'xs':
                return '0.3rem'
            case 'sm':
                return '0.15rem'
            case 'lg':
                return '-0.05rem'
            case 'xl':
                return '-0.3rem'
            default:
                return '0.1rem'
        }
    }, [size])
    const styles = useMemo(() => {
        if (color) {
            const foreground = getForegroundColor(color)
            const background = color
            return cleanObject({
                ...style,
                color: subtle ? background : foreground,
                backgroundColor: subtle ? foreground : background,
            })
        } else {
            return cleanObject({ ...style })
        }
    }, [color, style])
    const className = classNames(
        {
            'f-avatar': true,
            'f-row': true,
        },
        [props.className, size]
    )
    const [imageFailed, setImageFailed] = useState(false)
    const validSrc = src && !imageFailed

    useEffect(() => {
        setImageFailed(false)
        if (!src) return
        const image = documentObject.createElement('img')
        image.src = src
        image.onerror = (e) => setImageFailed(true)
    }, [src])

    return (
        <View
            {...rest}
            className={className}
            style={styles}
            as="span"
            ref={ref}>
            {/* If there is a picture */}
            {validSrc && (
                <Image
                    objectFit="cover"
                    width="100%"
                    height="100%"
                    src={src}
                    loader
                    alt={name}
                    {...imageProps}
                />
            )}

            {/* If there is an icon */}
            {icon && (
                <IconLib
                    icon={icon}
                    size={size}
                />
            )}

            {/* If there is no picture or icon */}
            {!validSrc && !icon && (
                <Text
                    as="span"
                    size={size}
                    {...textProps}>
                    {initials}
                </Text>
            )}

            {/* Otherwise, display children */}
            {props.children}

            {presence && (
                <Badge
                    variant={presenceVariant}
                    anchor="bottom-right"
                    width={8}
                    height={8}
                    zIndex={10}
                    style={{
                        '--f-badge-dot-distance': presenceBadgeDistance,
                        'outline': 'var(--f-avatar-badge-outline)',
                    }}
                />
            )}
        </View>
    )
})

export type AvatarGroupProps = {
    animated?: boolean
    invert?: boolean
} & CoreViewProps

export const AvatarGroup = forwardRef((props: AvatarGroupProps, ref) => {
    const { animated, invert, ...rest } = props
    const className = classNames(
        {
            'f-avatar-group': true,
            'f-row': true,
            'is-animated': animated,
            'is-inverted': invert,
        },
        [props.className]
    )

    return (
        <View
            {...rest}
            className={className}
            ref={ref}>
            {props.children}
        </View>
    )
})
