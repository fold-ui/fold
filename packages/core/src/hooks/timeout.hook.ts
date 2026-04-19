import React, { useEffect, useRef } from 'react'

export const useTimeout = (callback, delay) => {
    const savedCallback = useRef(callback)

    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    useEffect(() => {
        if (delay === null) return
        const id = setTimeout(() => {
            if (savedCallback.current) savedCallback.current()
        }, delay)
        return () => clearTimeout(id)
    }, [delay])
}
