import React, { CSSProperties, HTMLAttributes } from 'react'
import { classNames } from '../helpers'

export type ProjectPreviewPosition = 'left' | 'center' | 'right'

export type ProjectPreviewProps = {
    src?: string
    nextSrc?: string
    alt?: string
    nextAlt?: string
    visible?: boolean
    position?: ProjectPreviewPosition
    x?: string | number
    y?: string | number
} & HTMLAttributes<HTMLDivElement>

type ProjectPreviewStyle = CSSProperties & {
    '--f-project-preview-x': string
    '--f-project-preview-y': string
}

const toCssLength = (value: string | number) => (typeof value === 'number' ? `${value}px` : value)

export const ProjectPreview = ({
    src,
    nextSrc,
    alt = '',
    nextAlt = '',
    visible = false,
    position = 'center',
    x = '50vw',
    y = '50vh',
    className,
    style,
    ...rest
}: ProjectPreviewProps) => {
    const previewStyle: ProjectPreviewStyle = {
        '--f-project-preview-x': toCssLength(x),
        '--f-project-preview-y': toCssLength(y),
        ...style,
    }

    return (
        <div
            {...rest}
            aria-hidden="true"
            className={classNames(
                {
                    'f-project-preview': true,
                    [`f-project-preview--${position}`]: true,
                    'is-visible': visible && Boolean(src),
                },
                [className]
            )}
            style={previewStyle}>
            {src && (
                <div
                    key={src}
                    className="f-project-preview__track">
                    <img
                        src={src}
                        alt={alt}
                    />
                    <img
                        src={nextSrc || src}
                        alt={nextAlt}
                    />
                </div>
            )}
        </div>
    )
}
