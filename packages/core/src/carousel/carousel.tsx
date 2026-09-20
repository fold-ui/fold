import React, { cloneElement, ReactElement, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useEvent, useResize, useTouch, View } from '../'
import { classNames, renderChildren } from '../helpers'
import { CoreViewProps } from '../types'

export const useCarousel = (index: number) => {
    const [current, setCurrent] = useState(index)
    return { current, setCurrent }
}

export type CarouselItemProps = {} & CoreViewProps

export const CarouselItem = (props: CarouselItemProps) => {
    const { ...rest } = props
    return (
        <View
            {...rest}
            role="figure"
            className="f-carousel-item"
        />
    )
}

export type CarouselPillsProps = {
    current: number
    pills: number
    onChange: (index: number) => void
    direction?: 'horizontal' | 'vertical'
    carouselPillProps?: CarouselPillProps
} & Omit<CoreViewProps, 'onChange'>

export const CarouselPills = (props: CarouselPillsProps) => {
    const { carouselPillProps = {}, current, pills, onChange, direction = 'horizontal', ...rest } = props
    const className = classNames(
        {
            'f-carousel-pills': true,
            'f-row': direction == 'horizontal',
            'f-column': direction == 'vertical',
        },
        [props.className]
    )

    return (
        <View
            {...rest}
            className={className}>
            {new Array(pills).fill(null).map((_, index: number) => {
                return (
                    <CarouselPill
                        {...carouselPillProps}
                        key={index}
                        onClick={() => onChange(index)}
                        active={index == current}
                    />
                )
            })}
        </View>
    )
}

export type CarouselPillProps = {
    active?: boolean
} & CoreViewProps

export const CarouselPill = (props: CarouselPillProps) => {
    const { active, ...rest } = props
    const className = classNames(
        {
            'f-carousel-pill': true,
            'f-buttonize': true,
            'is-active': active,
        },
        [props.className]
    )

    return (
        <View
            {...rest}
            className={className}
        />
    )
}

export type CarouselProps = {
    autoPlay?: boolean
    autoPlaySpeed?: number
    current?: number
    onChange?: (index) => void
    minSwipeDistance?: number
    swipable?: boolean
} & Omit<CoreViewProps, 'onChange'>

export const Carousel = (props: CarouselProps) => {
    const {
        autoPlay = false,
        autoPlaySpeed = 3000,
        current,
        onChange,
        minSwipeDistance = 100,
        swipable = false,
        ...rest
    } = props
    const carouselRef = useRef(null)
    const dimensions = useResize(carouselRef.current)
    const [width, setWidth] = useState(1)
    const translate = useMemo(() => current * width * -1, [width, current])
    const childrenAmount = useMemo(() => React.Children.count(props.children), [props.children])
    const className = classNames(
        {
            'f-carousel': true,
            'is-swipable': swipable,
        },
        [props.className]
    )

    const getNextItem = () => {
        const nextCurrent = current + 1
        return nextCurrent >= childrenAmount ? 0 : nextCurrent
    }

    const getPreviousItem = () => {
        const previousCurrent = current - 1
        return previousCurrent < 0 ? childrenAmount - 1 : previousCurrent
    }

    const handleSwipeLeft = () => {
        if (!swipable) return
        onChange(getNextItem())
    }

    const handleSwipeRight = () => {
        if (!swipable) return
        onChange(getPreviousItem())
    }

    const { onTouchEnd, onTouchStart, onTouchMove } = useTouch({
        minSwipeDistance,
        onSwipedLeft: handleSwipeLeft,
        onSwipedRight: handleSwipeRight,
    })

    useEvent('mouseup', onTouchEnd)

    useLayoutEffect(() => {
        setWidth(carouselRef.current.offsetWidth)
    }, [dimensions])

    useEffect(() => {
        if (!autoPlay) return
        let interval = setInterval(() => onChange(getNextItem()), autoPlaySpeed)
        return () => clearInterval(interval)
    }, [current, autoPlay, autoPlaySpeed, childrenAmount])

    return (
        <View
            {...rest}
            className={className}
            ref={carouselRef}>
            <div
                onMouseDown={onTouchStart}
                onMouseMove={onTouchMove}
                className="f-carousel__content f-row"
                style={{ transform: `translateX(${translate}px)` }}>
                {renderChildren(props.children, (child: ReactElement, index: number) => {
                    const { style = {}, ...rest } = child.props

                    return cloneElement(child, {
                        ...rest,
                        style: { ...style, width },
                    })
                })}
            </div>
        </View>
    )
}
