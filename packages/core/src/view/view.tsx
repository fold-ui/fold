import React, {
    AllHTMLAttributes,
    createElement,
    forwardRef,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import { useCustomEvent, useEvent, useTheme, useWindowEvent } from '..'
import { classNames, cleanObject, getAlignClass, getOffset, mergeRefs } from '../helpers'
import { CommonProps, CoreViewProps, ShorthandProps } from '../types'

export type ScrollViewProps = {
    freeze?: boolean
    smooth?: boolean
    watchMutations?: boolean
    stickToTop?: boolean
    stickToBottom?: boolean
    onScrollToBottom?: any
    onScrollToTop?: any
    instanceId?: string
    scrollSensitivityDelay?: number
} & CoreViewProps

export const ScrollView = forwardRef((props: ScrollViewProps, ref) => {
    const {
        freeze = false,
        smooth = true,
        watchMutations,
        stickToTop,
        stickToBottom,
        onScrollToBottom,
        onScrollToTop,
        style = {},
        instanceId,
        scrollSensitivityDelay = 50,
        ...rest
    } = props
    const scrollRef = useRef(null)
    const userIsScrolling = useRef(null)
    const spacerRef = useRef(null)
    const observerRef = useRef(null)

    const scrollToTop = () => {
        if (freeze) return
        if (userIsScrolling.current) return
        if (!scrollRef.current) return

        if (smooth) {
            scrollRef.current.scrollTop = 0
        } else {
            scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    const scrollToBottom = () => {
        if (freeze) return
        if (userIsScrolling.current) return
        if (!scrollRef.current) return

        if (smooth) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        } else {
            scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
        }
    }

    const handleScrollEvent = (e: any) => {
        if (freeze) return

        const offsetHeight = scrollRef.current.scrollHeight - scrollRef.current.scrollTop - 1
        const isBottom = scrollRef.current.offsetHeight >= offsetHeight
        const isTop = scrollRef.current.scrollTop == 0

        if (isBottom && onScrollToBottom) onScrollToBottom()
        if (isTop && onScrollToTop) onScrollToTop()
    }

    const handleWheelEvent = (e) => {
        if (freeze) return

        // give the browser time to repaint the scroll
        setTimeout(() => {
            // maybe unmounted now
            if (!scrollRef.current) return

            const offsetHeight = scrollRef.current.scrollHeight - scrollRef.current.scrollTop
            const isBottom = scrollRef.current.offsetHeight >= offsetHeight
            const isTop = scrollRef.current.scrollTop == 0

            if (isTop && stickToTop) {
                userIsScrolling.current = false
            } else if (isBottom && stickToBottom) {
                userIsScrolling.current = false
            } else {
                userIsScrolling.current = true
            }
        }, scrollSensitivityDelay)
    }

    const handleCustomEvent = ({ detail }) => {
        if (detail.instanceId == instanceId) {
            userIsScrolling.current = false
            scrollToBottom()
        }
    }

    useWindowEvent('wheel', handleWheelEvent)

    useCustomEvent('scrollview:scroll-down', handleCustomEvent)

    useEffect(() => {
        let interval = setInterval(() => {
            if (stickToBottom) scrollToBottom()
            if (stickToTop) scrollToTop()
        }, 500)

        return () => clearInterval(interval)
    })

    useEffect(() => {
        if (!watchMutations) return
        const el = scrollRef.current
        if (!el) return

        const observer = new MutationObserver(() => {
            el.scrollTop = el.scrollHeight
        })

        observer.observe(el, {
            childList: true,
            subtree: true,
        })

        if (stickToBottom) scrollToBottom()
        if (stickToTop) scrollToTop()

        return () => observer.disconnect()
    }, [props.children, stickToBottom, stickToTop, watchMutations])

    useEffect(() => {
        if (scrollRef.current) {
            observerRef.current = new ResizeObserver(() => {
                if (stickToBottom) scrollToBottom()
                if (stickToTop) scrollToTop()
            })
            observerRef.current.observe(scrollRef.current)
        }

        return () => observerRef.current?.disconnect()
    }, [props.children, stickToBottom, stickToTop])

    useEffect(() => {
        if (stickToBottom) scrollToBottom()
        if (stickToTop) scrollToTop()
    }, [stickToBottom, stickToTop, props.children])

    return (
        <View
            {...rest}
            style={{
                position: 'relative',
                top: 0,
                left: 0,
                flex: 1,
                display: 'flex',
                overflow: 'hidden',
                width: '100%',
                height: '100%',
            }}>
            <div
                className="f-scrollbar"
                ref={mergeRefs([ref, scrollRef])}
                onScroll={handleScrollEvent}
                style={{
                    ...style,
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    overflow: 'auto',
                }}>
                <div ref={spacerRef} />
                {props.children}
            </div>
        </View>
    )
})

export type ViewProps = {
    as?: string
} & ShorthandProps &
    AllHTMLAttributes<any>

export const View = forwardRef((props: ViewProps, ref) => {
    const { getColorToken } = useTheme()
    const {
        as = 'div',
        bg,
        bgToken,
        color,
        colorToken,
        width,
        height,
        position,
        display,
        p,
        m,
        zIndex,
        radius,
        blur,
        letterSpacing,
        lineHeight,
        fontWeight,
        font,
        fontSize,
        textDecoration,
        textAlign,
        shadow,
        border,
        transition,
        row,
        column,
        alignContent,
        alignItems,
        basis,
        flexDirection,
        grow,
        shrink,
        justifyContent,
        wrap,
        flex,
        flow,
        alignSelf,
        align,
        gap,
        ...all
    } = props

    const className = classNames(
        {
            'f-row': props.row,
            'f-col': props.column,
        },
        [props.className, getAlignClass(props.align)]
    )

    // Create inline style object from shorthand props
    // and from inline style props
    const style = useMemo(() => {
        const { style = {} } = props

        return cleanObject({
            background: props.bgToken ? getColorToken(props.bgToken) : props.bg,
            color: props.colorToken ? getColorToken(props.colorToken) : props.color,
            width: props.width,
            height: props.height,
            position: props.position,
            display: props.display,
            padding: props.p,
            margin: props.m,
            zIndex: props.zIndex,
            borderRadius: props.radius,
            blur: props.blur,
            letterSpacing: props.letterSpacing,
            lineHeight: props.lineHeight,
            fontWeight: props.fontWeight,
            fontFamily: props.font,
            fontSize: props.fontSize,
            textDecoration: props.textDecoration,
            textAlign: props.textAlign,
            boxShadow: props.shadow,
            border: props.border,
            transition: props.transition,
            alignItems: props.alignItems,
            alignContent: props.alignContent,
            flexBasis: props.basis,
            flexDirection: props.flexDirection,
            flexGrow: props.grow,
            justifyContent: props.justifyContent,
            flexShrink: props.shrink,
            flexWrap: props.wrap,
            flex: props.flex,
            flow: props.flow,
            alignSelf: props.alignSelf,
            gap: props.gap,
            ...style,
        })
    }, [props])

    return createElement(
        as,
        {
            ...all,
            className,
            style,
            ref,
        },
        props.children
    )
})

export const Flexer = (props: any) => <div style={{ flex: 1 }} />

export const Flex = View

export type BlurProps = {
    overlay?: any
} & CoreViewProps

export const Blur = (props: BlurProps) => {
    const { overlay, ...rest } = props
    const [box, setBox] = useState({})
    const containerRef = useRef(null)
    const className = classNames(
        {
            'f-blur': true,
        },
        [props.className]
    )

    useLayoutEffect(() => {
        setBox(getOffset(containerRef.current))
    }, [])

    return (
        <>
            {overlay && (
                <div
                    style={box}
                    className="f-blur-overlay">
                    {overlay}
                </div>
            )}
            <View
                {...rest}
                className={className}
                ref={containerRef}
            />
        </>
    )
}
