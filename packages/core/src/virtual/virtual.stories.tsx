import { Virtual, VirtualExperimental } from '@fold-ui/core'
import React, { useEffect, useMemo, useState } from 'react'

export default {
    title: 'Core/Virtual',
    component: Virtual,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Virtual',
    subtitle: 'The Virtual component is a element list strategy that can be used to enable infinite scroll.',
    description:
        'Virtual scrolling enable users to efficiently navigate through vast amounts of data without requiring React to render every single child element.',
    experimental: true,
}

export const Usage = () => {
    const items = useMemo(() => {
        return new Array(20).fill(null).map((_: any, index: number) => {
            const nextIndex = index
            return {
                index: nextIndex,
                name: `Item ${nextIndex}`,
            }
        })
    }, [])

    return (
        <Virtual
            bgToken="surface-strong"
            width="100%"
            watch={[]}
            numItems={items.length}
            itemHeight={40}
            maxHeight={400}
            render={({ index, style }) => {
                const item = items[index]

                return (
                    <div
                        key={index}
                        className="f-row"
                        style={{
                            ...style,
                            borderTop: '2px solid var(--f-color-border)',
                            width: '100%',
                        }}>
                        <label>{item.name}</label>
                    </div>
                )
            }}
        />
    )
}

// --

/**
 * Please note that this version is in alpha.
 * More records can be automatically fetched when a user scrolls to the top or bottom boundary.
 * Rerendering inner components (when external data changes) can be triggering by updating the `watch` prop, which acts as a reactive hook.
 */
export const AutoFetchOnBoundary = () => {
    const [items, setItems] = useState<any>([])

    useEffect(() => {
        setItems(
            new Array(20).fill(null).map((_: any, index: number) => {
                const nextIndex = index
                return {
                    index: nextIndex,
                    name: `Item ${nextIndex}`,
                }
            })
        )
    }, [])

    const handleLoadNext = () => {
        const highestIndex = items[items.length - 1].index

        setItems([
            ...items,
            ...new Array(5).fill(null).map((_: any, index: number) => {
                const nextIndex = index + highestIndex + 1

                return {
                    index: nextIndex,
                    name: `Item ${nextIndex}`,
                }
            }),
        ])
    }

    const handleLoadPrevious = () => {
        const lowestIndex = items[0].index

        setItems([
            ...new Array(5).fill(null).map((_: any, index: number) => {
                const nextIndex = lowestIndex - 1 - (5 - index)

                return {
                    index: nextIndex,
                    name: `Item ${nextIndex}`,
                }
            }),
            ...items,
        ])
    }

    return (
        <VirtualExperimental
            bgToken="surface-strong"
            watch={[]}
            loadNext={handleLoadNext}
            loadPrevious={handleLoadPrevious}
            numItems={items.length}
            itemHeight={40}
            maxHeight={400}
            width="100%"
            render={({ index, style }) => {
                const item = items[index]

                return (
                    <div
                        key={index}
                        className="f-row"
                        style={{
                            ...style,
                            padding: 5,
                            background: 'var(--f-color-surface-strong)',
                            borderTop: '2px solid var(--f-color-border)',
                            height: 40,
                            width: '100%',
                        }}>
                        <label>{item.name}</label>
                    </div>
                )
            }}
        />
    )
}
