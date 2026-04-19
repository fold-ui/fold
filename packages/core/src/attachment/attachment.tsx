import React, { ReactElement, ReactNode } from 'react'
import { Icon, If, Image, Progress, Spinner, SpinnerOverlay, View } from '../'
import { bytesToSize, classNames, windowObject } from '../helpers'
import { Text } from '../text/text'
import { CoreViewProps } from '../types'
import { IconLib } from '../icon'

export const F_ATTACHMENT_MIME_TYPES = 'F_ATTACHMENT_MIME_TYPES'

windowObject[F_ATTACHMENT_MIME_TYPES] = {
    DESCRIPTION: {
        'audio/aac': 'AAC audio',
        'application/x-abiword': 'AbiWorddocument',
        'application/x-freearc': 'Archive document (multiple files embedded)',
        'video/x-msvideo': 'AVI: Audio Video Interleave',
        'application/vnd.amazon.ebook': 'Amazon Kindle eBook format',
        'application/octet-stream': 'Any kind of binary data',
        'image/bmp': 'Windows OS/2 Bitmap Graphics',
        'application/x-bzip': 'BZip archive',
        'application/x-bzip2': 'BZip2 archive',
        'application/x-csh': 'C-Shell script',
        'text/css': 'Cascading Style Sheets (CSS)',
        'text/csv': 'Comma-separated values (CSV)',
        'application/msword': 'Microsoft Word',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Microsoft Word (OpenXML)',
        'application/vnd.ms-fontobject': 'MS Embedded OpenType fonts',
        'application/epub+zip': 'Electronic publication (EPUB)',
        'application/gzip': 'GZip Compressed Archive',
        'image/gif': 'Graphics Interchange Format (GIF)',
        'text/html': 'HyperText Markup Language (HTML)',
        'image/vnd.microsoft.icon': 'Icon format',
        'text/calendar': 'iCalendar format',
        'application/java-archive': 'Java Archive (JAR)',
        'image/jpeg': 'JPEG images',
        'text/javascript': 'JavaScript',
        'application/json': 'JSON format',
        'application/ld+json': 'JSON-LD format',
        'audio/midiaudio/x-midi': 'Musical Instrument Digital Interface (MIDI)',
        'audio/mpeg': 'MP3 audio',
        'video/mpeg': 'MPEG Video',
        'application/vnd.apple.installer+xml': 'Apple Installer Package',
        'application/vnd.oasis.opendocument.presentation': 'OpenDocument presentation document',
        'application/vnd.oasis.opendocument.spreadsheet': 'OpenDocument spreadsheet document',
        'application/vnd.oasis.opendocument.text': 'OpenDocument text document',
        'audio/ogg': 'OGG audio',
        'video/ogg': 'OGG video',
        'application/ogg': 'OGG',
        'audio/opus': 'Opus audio',
        'font/otf': 'OpenType font',
        'image/png': 'Portable Network Graphics',
        'application/pdf': 'AdobePortable Document Format(PDF)',
        'appliction/php': 'Hypertext Preprocessor (Personal Home Page)',
        'application/vnd.ms-powerpoint': 'Microsoft PowerPoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'Microsoft PowerPoint (OpenXML)',
        'application/x-rar-compressed': 'RAR archive',
        'application/rtf': 'Rich Text Format (RTF)',
        'application/x-sh': 'Bourne shell script',
        'image/svg+xml': 'Scalable Vector Graphics (SVG)',
        'application/x-shockwave-flash': 'Small web format(SWF) or Adobe Flash document',
        'application/x-tar': 'Tape Archive (TAR)',
        'image/tiff': 'Tagged Image File Format (TIFF)',
        'video/mp2t': 'MPEG transport stream',
        'font/ttf': 'TrueType Font',
        'text/plain': 'Text',
        'application/vnd.visio': 'Microsoft Visio',
        'audio/wav': 'Waveform Audio Format',
        'audio/webm': 'WEBM audio',
        'video/webm': 'WEBM video',
        'video/mp4': 'Video File',
        'image/webp': 'WEBP image',
        'font/woff': 'Web Open Font Format (WOFF)',
        'font/woff2': 'Web Open Font Format (WOFF)',
        'application/xhtml+xml': 'XHTML',
        'application/vnd.ms-excel': 'Microsoft Excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Microsoft Excel (OpenXML)',
        'application/xmlifnotreadable from casual users (RFC 3023': ' section 3)',
        'text/xmlif readable from casual users': 'XML',
        'application/vnd.mozilla.xul+xml': 'XUL',
        'application/zip': 'ZIP archive',
        'audio/3gpp': '3GPPaudio/video container',
        'audio/3gpp2': '3GPP2audio/video container',
        'application/x-7z-compressed': '7-ziparchive',
        'task': 'Task',
    },
    ICON: {
        'audio/aac': 'audio',
        'application/x-abiword': 'paperclip',
        'application/x-freearc': 'paperclip',
        'video/x-msvideo': 'video',
        'application/vnd.amazon.ebook': 'paperclip',
        'application/octet-stream': 'paperclip',
        'image/bmp': 'image',
        'application/x-bzip': 'paperclip',
        'application/x-bzip2': 'paperclip',
        'application/x-csh': 'paperclip',
        'text/css': 'paperclip',
        'text/csv': 'paperclip',
        'application/msword': 'paperclip',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'paperclip',
        'application/vnd.ms-fontobject': 'paperclip',
        'application/epub+zip': 'paperclip',
        'application/gzip': 'paperclip',
        'image/gif': 'image',
        'text/html': 'paperclip',
        'image/vnd.microsoft.icon': 'image',
        'text/calendar': 'paperclip',
        'application/java-archive': 'paperclip',
        'image/jpeg': 'image',
        'text/javascript': 'paperclip',
        'application/json': 'paperclip',
        'application/ld+json': 'paperclip',
        'audio/midiaudio/x-midi': 'paperclip',
        'audio/mpeg': 'audio',
        'video/mpeg': 'video',
        'application/vnd.apple.installer+xml': 'paperclip',
        'application/vnd.oasis.opendocument.presentation': 'paperclip',
        'application/vnd.oasis.opendocument.spreadsheet': 'paperclip',
        'application/vnd.oasis.opendocument.text': 'paperclip',
        'audio/ogg': 'audio',
        'video/ogg': 'video',
        'application/ogg': 'video',
        'audio/opus': 'audio',
        'font/otf': 'paperclip',
        'image/png': 'image',
        'application/pdf': 'paperclip',
        'appliction/php': 'paperclip',
        'application/vnd.ms-powerpoint': 'paperclip',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'paperclip',
        'application/x-rar-compressed': 'paperclip',
        'application/rtf': 'paperclip',
        'application/x-sh': 'paperclip',
        'image/svg+xml': 'image',
        'application/x-shockwave-flash': 'video',
        'application/x-tar': 'paperclip',
        'image/tiff': 'image',
        'video/mp2t': 'video',
        'font/ttf': 'paperclip',
        'text/plain': 'paperclip',
        'application/vnd.visio': 'paperclip',
        'audio/wav': 'audio',
        'audio/webm': 'audio',
        'video/webm': 'video',
        'video/mp4': 'video',
        'image/webp': 'image',
        'font/woff': 'paperclip',
        'font/woff2': 'paperclip',
        'application/xhtml+xml': 'paperclip',
        'application/vnd.ms-excel': 'paperclip',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'paperclip',
        'application/xmlifnotreadable from casual users (RFC 3023': 'paperclip',
        'text/xmlif readable from casual users': 'paperclip',
        'application/vnd.mozilla.xul+xml': 'paperclip',
        'application/zip': 'paperclip',
        'audio/3gpp': 'audio',
        'audio/3gpp2': 'audio',
        'application/x-7z-compressed': 'paperclip',
        'task': 'check',
    },
}

export type AttachmentProps = {
    as?: string
    heroPosterHeight?: number
    heroPosterContent?: ReactNode
    heroPoster?: string
    poster?: string
    filesize?: number
    mime?: string
    tools?: ReactNode
    error?: boolean
    size?: 'sm' | 'md' | 'lg'
    loading?: boolean
    loadingProgress?: number
    label?: string
} & CoreViewProps & { href?: string; target?: string }

export const Attachment = (props: AttachmentProps) => {
    const {
        as = 'div',
        heroPosterHeight = 150,
        heroPosterContent,
        heroPoster,
        poster,
        filesize,
        mime,
        tools,
        error,
        size = 'md',
        loading,
        loadingProgress = 0,
        label,
        ...rest
    } = props
    const className = classNames(
        {
            'f-attachment': true,
            'is-error': error,
            'is-loading': loading,
        },
        [props.className, size]
    )

    const icon: string = mime ? windowObject[F_ATTACHMENT_MIME_TYPES].ICON[mime] : error ? 'warning' : 'paperclip'

    return (
        <View
            {...rest}
            as={as}
            className={className}>
            {heroPoster && (
                <div
                    className="f-attachment__hero-poster"
                    style={{ height: heroPosterHeight }}>
                    <Image
                        loader
                        src={heroPoster}
                        height={heroPosterHeight}
                    />
                    {heroPosterContent}
                </div>
            )}

            <span className="f-attachment__content f-row">
                <span className="f-attachment__icon f-row">
                    {loading && (
                        <Spinner
                            size={size}
                            thickness={4}
                        />
                    )}
                    {poster && !loading && (
                        <Image
                            loader
                            src={poster}
                        />
                    )}
                    {!poster && !loading && (
                        <IconLib
                            icon={icon}
                            size={size}
                        />
                    )}
                </span>

                <span className="f-attachment__text f-col">
                    {loading && (
                        <Progress
                            value={loadingProgress}
                            thickness={3}
                            width="100%"
                            animated
                            variant="accent"
                        />
                    )}

                    {!loading && (
                        <>
                            <Text
                                as="span"
                                size={size}
                                color="currentColor"
                                className="f-attachment__text-label">
                                <span>{label}</span>
                            </Text>
                            {mime && (
                                <Text
                                    size="sm"
                                    as="span"
                                    className="f-attachment__text-meta">
                                    <span>{windowObject[F_ATTACHMENT_MIME_TYPES].DESCRIPTION[mime]}</span>
                                </Text>
                            )}
                            {!!filesize && (
                                <Text
                                    size="sm"
                                    as="span"
                                    className="f-attachment__text-meta">
                                    {bytesToSize(filesize)}
                                </Text>
                            )}
                        </>
                    )}
                </span>

                {tools}
            </span>
        </View>
    )
}

export type AttachmentThumbProps = {
    as?: string
    poster?: string
    mime?: string
    error?: boolean
    tools?: ReactNode
    filesize?: number
    loading?: boolean
    loadingProgress?: number
    label?: string
} & CoreViewProps & { href?: string }

export const AttachmentThumb = (props: AttachmentThumbProps) => {
    const { as = 'div', poster, mime, error, loading, tools, loadingProgress, label, filesize, ...rest } = props
    const className = classNames(
        {
            'f-attachment-thumb': true,
            'is-error': error,
            'is-loading': loading,
            'f-row': true,
        },
        [props.className]
    )
    const icon: string = mime ? windowObject[F_ATTACHMENT_MIME_TYPES].ICON[mime] : error ? 'warning' : 'paperclip'

    return (
        <View
            {...rest}
            as={as}
            className={className}>
            {loading && !loadingProgress && <SpinnerOverlay thickness={4} />}
            {loading && loadingProgress && (
                <Progress
                    value={loadingProgress}
                    thickness={5}
                    variant="accent"
                />
            )}
            {poster && !loading && (
                <Image
                    loader
                    src={poster}
                />
            )}

            {!poster && !loading && (
                <span className="f-attachment-thumb__details f-col">
                    <IconLib
                        icon={icon}
                        size="lg"
                    />
                    <Text
                        color="currentColor"
                        size="sm">
                        {label}
                    </Text>
                    {filesize && (
                        <Text
                            size="sm"
                            className="f-attachment-thumb__text-meta">
                            {bytesToSize(filesize)}
                        </Text>
                    )}
                </span>
            )}

            {tools && <span className="f-attachment-thumb__tools f-row">{tools}</span>}
        </View>
    )
}
