import React, { HTMLAttributes, useEffect, useRef } from 'react'
import { classNames } from '../helpers'

export type StarryBackgroundProps = {
    count?: number
    color?: string
    speed?: number
    twinkle?: number
} & HTMLAttributes<HTMLDivElement>

type Star = {
    x: number
    y: number
    z: number
    size: number
    phase: number
}

export const StarryBackground = ({
    count = 2000,
    color,
    speed = 0.000015,
    twinkle = 0.25,
    className,
    ...rest
}: StarryBackgroundProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const container = containerRef.current
        const canvas = canvasRef.current
        if (!container || !canvas) return

        const context = canvas.getContext('2d')
        if (!context) return

        const stars: Star[] = Array.from({ length: Math.max(0, count) }).map(() => {
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(2 * Math.random() - 1)

            return {
                x: Math.sin(phi) * Math.cos(theta),
                y: Math.sin(phi) * Math.sin(theta),
                z: Math.cos(phi),
                size: 0.4 + Math.random() * 1.4,
                phase: Math.random() * Math.PI * 2,
            }
        })
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
        let width = 1
        let height = 1
        let rotationX = 0
        let rotationY = 0
        let previousTime = 0
        let frameId = 0
        let isInView = true

        const draw = (now = 0) => {
            const dpr = window.devicePixelRatio || 1
            const frameScale = previousTime ? Math.min((now - previousTime) / (1000 / 60), 2) : 1
            previousTime = now

            if (!reducedMotion.matches) {
                rotationY += speed * frameScale
                rotationX += speed * 0.33 * frameScale
            }

            context.setTransform(dpr, 0, 0, dpr, 0, 0)
            context.clearRect(0, 0, width, height)
            context.fillStyle =
                color || getComputedStyle(container).getPropertyValue('--f-starry-background-color').trim() || '#34303d'

            const cosY = Math.cos(rotationY)
            const sinY = Math.sin(rotationY)
            const cosX = Math.cos(rotationX)
            const sinX = Math.sin(rotationX)

            stars.forEach((star) => {
                const rotatedX = star.x * cosY + star.z * sinY
                const rotatedZ = -star.x * sinY + star.z * cosY
                const rotatedY = star.y * cosX - rotatedZ * sinX
                const depth = star.y * sinX + rotatedZ * cosX
                const longitude = Math.atan2(rotatedX, depth)
                const latitude = Math.asin(Math.max(-1, Math.min(1, rotatedY)))
                const x = (longitude / (Math.PI * 2) + 0.5) * width
                const y = (0.5 - latitude / Math.PI) * height
                const opacity = reducedMotion.matches
                    ? 0.75
                    : Math.max(0.15, Math.min(1, 0.65 + Math.sin(now * 0.0005 + star.phase) * twinkle))

                context.globalAlpha = opacity
                context.beginPath()
                context.arc(x, y, star.size, 0, Math.PI * 2)
                context.fill()
            })

            context.globalAlpha = 1
        }

        const resize = () => {
            const dpr = window.devicePixelRatio || 1
            width = Math.max(container.clientWidth, 1)
            height = Math.max(container.clientHeight, 1)
            canvas.width = width * dpr
            canvas.height = height * dpr
            canvas.style.width = `${width}px`
            canvas.style.height = `${height}px`
            draw(performance.now())
        }

        const animate = (now: number) => {
            draw(now)
            frameId = requestAnimationFrame(animate)
        }

        const updateAnimation = () => {
            cancelAnimationFrame(frameId)
            previousTime = 0

            if (!document.hidden && isInView && !reducedMotion.matches) {
                frameId = requestAnimationFrame(animate)
            } else {
                draw(0)
            }
        }

        const resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(resize)
        resizeObserver?.observe(container)
        if (!resizeObserver) window.addEventListener('resize', resize)

        const intersectionObserver =
            typeof IntersectionObserver === 'undefined'
                ? null
                : new IntersectionObserver(([entry]) => {
                      isInView = Boolean(entry?.isIntersecting)
                      updateAnimation()
                  })
        intersectionObserver?.observe(container)

        document.addEventListener('visibilitychange', updateAnimation)
        reducedMotion.addEventListener('change', updateAnimation)
        resize()
        updateAnimation()

        return () => {
            cancelAnimationFrame(frameId)
            resizeObserver?.disconnect()
            intersectionObserver?.disconnect()
            if (!resizeObserver) window.removeEventListener('resize', resize)
            document.removeEventListener('visibilitychange', updateAnimation)
            reducedMotion.removeEventListener('change', updateAnimation)
        }
    }, [color, count, speed, twinkle])

    return (
        <div
            {...rest}
            ref={containerRef}
            aria-hidden="true"
            className={classNames({ 'f-starry-background': true }, [className])}>
            <canvas ref={canvasRef} />
        </div>
    )
}
