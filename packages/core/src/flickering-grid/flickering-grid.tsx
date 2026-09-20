import React, { HTMLAttributes, useCallback, useEffect, useMemo, useRef } from 'react'
import { classNames } from '../helpers'

export type FlickeringGridProps = {
    squareSize?: number
    gridGap?: number
    flickerChance?: number
    color?: string
    width?: number
    height?: number
    maxOpacity?: number
    speed?: number
} & HTMLAttributes<HTMLDivElement>

export const FlickeringGrid = ({
    squareSize = 4,
    gridGap = 6,
    flickerChance = 0.003,
    color = 'rgb(0, 0, 0)',
    width,
    height,
    className,
    maxOpacity = 0.3,
    speed = 50,
    style,
    ...rest
}: FlickeringGridProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const isInViewRef = useRef(true)

    const rgbaColor = useMemo(() => {
        if (typeof document === 'undefined') return 'rgba(0, 0, 0,'

        const colorCanvas = document.createElement('canvas')
        colorCanvas.width = 1
        colorCanvas.height = 1
        const context = colorCanvas.getContext('2d')
        if (!context) return 'rgba(0, 0, 0,'

        context.fillStyle = color
        context.fillRect(0, 0, 1, 1)
        const [red, green, blue] = Array.from(context.getImageData(0, 0, 1, 1).data)

        return `rgba(${red}, ${green}, ${blue},`
    }, [color])

    const setupCanvas = useCallback(
        (canvas: HTMLCanvasElement, canvasWidth: number, canvasHeight: number) => {
            const dpr = window.devicePixelRatio || 1
            canvas.width = canvasWidth * dpr
            canvas.height = canvasHeight * dpr
            canvas.style.width = `${canvasWidth}px`
            canvas.style.height = `${canvasHeight}px`
            const cols = Math.floor(canvasWidth / (squareSize + gridGap))
            const rows = Math.floor(canvasHeight / (squareSize + gridGap))
            const squares = new Float32Array(cols * rows)

            for (let index = 0; index < squares.length; index++) {
                squares[index] = Math.random() * maxOpacity
            }

            return { cols, rows, squares, dpr }
        },
        [gridGap, maxOpacity, squareSize]
    )

    const updateSquares = useCallback(
        (squares: Float32Array) => {
            for (let index = 0; index < squares.length; index++) {
                if (Math.random() < flickerChance) {
                    squares[index] = Math.random() * maxOpacity
                }
            }
        },
        [flickerChance, maxOpacity]
    )

    const drawGrid = useCallback(
        (context: CanvasRenderingContext2D, cols: number, rows: number, squares: Float32Array, dpr: number) => {
            context.clearRect(0, 0, context.canvas.width, context.canvas.height)
            context.scale(dpr, dpr)

            for (let column = 0; column < cols; column++) {
                for (let row = 0; row < rows; row++) {
                    const opacity = squares[column * rows + row]
                    context.fillStyle = `${rgbaColor}${opacity})`
                    context.fillRect(
                        column * (squareSize + gridGap),
                        row * (squareSize + gridGap),
                        squareSize,
                        squareSize
                    )
                }
            }

            context.setTransform(1, 0, 0, 1, 0, 0)
        },
        [gridGap, rgbaColor, squareSize]
    )

    useEffect(() => {
        const canvas = canvasRef.current
        const container = containerRef.current
        if (!canvas || !container) return

        const context = canvas.getContext('2d')
        if (!context) return

        let animationFrameId = 0
        let gridParams: ReturnType<typeof setupCanvas>
        let lastTime = 0

        const updateCanvasSize = () => {
            const nextWidth = width || container.clientWidth
            const nextHeight = height || container.clientHeight
            gridParams = setupCanvas(canvas, nextWidth, nextHeight)
            drawGrid(context, gridParams.cols, gridParams.rows, gridParams.squares, gridParams.dpr)
        }

        const animate = (time: number) => {
            if (isInViewRef.current && time - lastTime >= speed) {
                lastTime = time
                updateSquares(gridParams.squares)
                drawGrid(context, gridParams.cols, gridParams.rows, gridParams.squares, gridParams.dpr)
            }

            animationFrameId = requestAnimationFrame(animate)
        }

        updateCanvasSize()

        const resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(updateCanvasSize)
        resizeObserver?.observe(container)
        if (!resizeObserver) window.addEventListener('resize', updateCanvasSize)

        const intersectionObserver =
            typeof IntersectionObserver === 'undefined'
                ? null
                : new IntersectionObserver(([entry]) => {
                      isInViewRef.current = Boolean(entry?.isIntersecting)
                  })
        intersectionObserver?.observe(canvas)

        animationFrameId = requestAnimationFrame(animate)

        return () => {
            cancelAnimationFrame(animationFrameId)
            resizeObserver?.disconnect()
            intersectionObserver?.disconnect()
            if (!resizeObserver) window.removeEventListener('resize', updateCanvasSize)
        }
    }, [drawGrid, height, setupCanvas, speed, updateSquares, width])

    return (
        <div
            {...rest}
            ref={containerRef}
            aria-hidden="true"
            className={classNames({ 'f-flickering-grid': true }, [className])}
            style={{
                width: width ? `${width}px` : undefined,
                height: height ? `${height}px` : undefined,
                ...style,
            }}>
            <canvas ref={canvasRef} />
        </div>
    )
}
