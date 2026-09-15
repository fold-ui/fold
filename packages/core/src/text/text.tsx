import React, { createElement, forwardRef, useMemo, useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import { useVisibility, View } from '..'
import { CoreViewProps, Size } from '../types'
import { classNames, documentObject, highlightText } from '../helpers'

export type TextProps = {
    as?:
        | 'button'
        | 'a'
        | 'label'
        | 'legend'
        | 'code'
        | 'p'
        | 'span'
        | 'strong'
        | 'b'
        | 'i'
        | 'em'
        | 'mark'
        | 'small'
        | 'del'
        | 'ins'
        | 'sub'
        | 'sup'
        | 'u'
        | 'abbr'
        | 'cite'
        | 'pre'
        | 'kbd'
        | 's'
        | 'samp'
        | 'blockquote'
    size?: Size
    htmlFor?: string
    href?: string
    rel?: string
    title?: string
    target?: string
} & CoreViewProps

export const HighlightText = forwardRef((props: { highlight?: string } & TextProps, ref) => {
    const { as = 'p', size = 'md', htmlFor, href, title, target, children, highlight, ...rest } = props
    const text = useMemo(() => highlightText(children as string, highlight), [children, highlight])
    const className = classNames(
        {
            'f-text': true,
            'is-link': as == 'a',
            'is-label': as == 'label',
        },
        [props.className, size]
    )

    return (
        <View
            {...rest}
            as={as}
            className={className}
            htmlFor={htmlFor}
            href={href}
            title={title}
            target={target}
            ref={ref}
            dangerouslySetInnerHTML={{ __html: text }}
        />
    )
})

export const Text = forwardRef((props: TextProps, ref) => {
    const { as = 'p', size = 'md', htmlFor, href, title, target, ...rest } = props
    const className = classNames(
        {
            'f-text': true,
            'is-link': as == 'a',
            'is-label': as == 'label',
        },
        [props.className, size]
    )

    return (
        <View
            {...rest}
            as={as}
            className={className}
            htmlFor={htmlFor}
            href={href}
            title={title}
            target={target}
            ref={ref}
        />
    )
})

export type LinkProps = {} & TextProps

export const Link = forwardRef((props: LinkProps, ref) => (
    <Text
        {...props}
        as="a"
        ref={ref}
    />
))

export type LabelProps = {} & TextProps

export const Label = forwardRef((props: LabelProps, ref) => (
    <Text
        {...props}
        as="label"
        ref={ref}
    />
))

export type LimitedTextProps = {
    limit?: number
    html: string
    showLess?: string
    showMore?: string
} & TextProps

export const LimitedText = forwardRef((props: LimitedTextProps, ref) => {
    const { limit = 200, html, showLess = 'show less', showMore = 'show more', ...rest } = props
    const { visible, show, hide } = useVisibility(false)
    const { text, showButton } = useMemo(() => {
        const el = documentObject.createElement('span')
        el.innerHTML = html
        return {
            text: visible ? html : el.innerText.slice(0, limit),
            showButton: el.innerText.length > limit,
        }
    }, [visible, limit, html])

    const handleToggle = () => {
        if (visible) {
            hide()
        } else {
            show()
        }
    }

    return (
        <Text
            {...rest}
            as="p"
            ref={ref}>
            <span dangerouslySetInnerHTML={{ __html: text }} />
            {showButton && (
                <>
                    {' '}
                    ...{' '}
                    <span
                        className="f-limited-text"
                        onClick={handleToggle}>
                        {visible ? showLess : showMore}
                    </span>
                </>
            )}
        </Text>
    )
})
