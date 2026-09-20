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
    size: number
    phase: number
    direction: number
    pace: number
    offsetX: number
    offsetY: number
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

        const stars: Star[] = Array.from({ length: Math.max(0, count) }, () => ({
            x: Math.random(),
            y: Math.random(),
            size: 0.4 + Math.random() * 1.4,
            phase: Math.random() * Math.PI * 2,
            direction: Math.random() * Math.PI * 2,
            pace: 0.5 + Math.random(),
            offsetX: 0,
            offsetY: 0,
        }))
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
        const pointer = { x: 0, y: 0, active: false }
        const pointerTarget = container.parentElement || container
        let width = 1
        let height = 1
        let elapsed = 0
        let previousTime = 0
        let frameId = 0
        let isInView = true

        const draw = (now = 0) => {
            const dpr = window.devicePixelRatio || 1
            const frameScale =
                previousTime && now && !reducedMotion.matches
                    ? Math.max(0, Math.min((now - previousTime) / (1000 / 60), 2))
                    : 0
            previousTime = now
            elapsed += frameScale / 60

            context.setTransform(dpr, 0, 0, dpr, 0, 0)
            context.clearRect(0, 0, width, height)
            context.fillStyle =
                color || getComputedStyle(container).getPropertyValue('--f-starry-background-color').trim() || '#34303d'

            const easing = 1 - Math.exp(-frameScale * 0.06)
            // Wrap beyond the visible edges so stars don't pop in and out.
            const padding = 12
            const fieldWidth = width + padding * 2
            const fieldHeight = height + padding * 2

            stars.forEach((star) => {
                const depth = (star.size - 0.4) / 1.4
                const time = elapsed * star.pace
                const direction =
                    star.direction +
                    Math.sin(time * 0.17 + star.phase) * 0.65 +
                    Math.sin(time * 0.07 + star.phase * 2) * 0.35
                const distance = speed * Math.min(width, height) * star.pace * (0.4 + depth * 0.6) * frameScale

                star.x = (((star.x + (Math.cos(direction) * distance) / fieldWidth) % 1) + 1) % 1
                star.y = (((star.y + (Math.sin(direction) * distance) / fieldHeight) % 1) + 1) % 1

                const x = star.x * fieldWidth - padding
                const y = star.y * fieldHeight - padding
                let targetX = 0
                let targetY = 0

                if (pointer.active && !reducedMotion.matches) {
                    const dx = pointer.x - x
                    const dy = pointer.y - y
                    const influence = Math.max(0, 1 - Math.hypot(dx, dy) / 180) ** 2
                    // A bounded displacement gives a gentle pull without gathering stars at the cursor.
                    targetX = dx * influence * (0.08 + depth * 0.16)
                    targetY = dy * influence * (0.08 + depth * 0.16)
                }

                star.offsetX = reducedMotion.matches ? 0 : star.offsetX + (targetX - star.offsetX) * easing
                star.offsetY = reducedMotion.matches ? 0 : star.offsetY + (targetY - star.offsetY) * easing
                const opacity = reducedMotion.matches
                    ? 0.75
                    : Math.max(0.15, Math.min(1, 0.5 + depth * 0.25 + Math.sin(time * 0.5 + star.phase) * twinkle))

                context.globalAlpha = opacity
                context.beginPath()
                context.arc(x + star.offsetX, y + star.offsetY, star.size, 0, Math.PI * 2)
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
            pointer.active = false

            if (!document.hidden && isInView && !reducedMotion.matches) {
                frameId = requestAnimationFrame(animate)
            } else {
                draw(0)
            }
        }

        const clearPointer = () => {
            pointer.active = false
        }

        const handlePointerMove = (event: PointerEvent) => {
            if (event.pointerType === 'touch' || reducedMotion.matches || document.hidden || !isInView) {
                clearPointer()
                return
            }

            const bounds = container.getBoundingClientRect()
            pointer.x = ((event.clientX - bounds.left) / Math.max(bounds.width, 1)) * width
            pointer.y = ((event.clientY - bounds.top) / Math.max(bounds.height, 1)) * height
            pointer.active = pointer.x >= 0 && pointer.x <= width && pointer.y >= 0 && pointer.y <= height
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
        // The background itself ignores pointer events so foreground content stays interactive.
        pointerTarget.addEventListener('pointermove', handlePointerMove, { passive: true })
        pointerTarget.addEventListener('pointerleave', clearPointer)
        window.addEventListener('blur', clearPointer)
        window.addEventListener('scroll', clearPointer, true)
        resize()
        updateAnimation()

        return () => {
            cancelAnimationFrame(frameId)
            resizeObserver?.disconnect()
            intersectionObserver?.disconnect()
            if (!resizeObserver) window.removeEventListener('resize', resize)
            document.removeEventListener('visibilitychange', updateAnimation)
            reducedMotion.removeEventListener('change', updateAnimation)
            pointerTarget.removeEventListener('pointermove', handlePointerMove)
            pointerTarget.removeEventListener('pointerleave', clearPointer)
            window.removeEventListener('blur', clearPointer)
            window.removeEventListener('scroll', clearPointer, true)
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
