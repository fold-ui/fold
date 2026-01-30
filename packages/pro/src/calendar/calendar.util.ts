import { FDate, documentObject, pad } from '@fold-ui/core'
import { useContext, useEffect, useMemo } from 'react'
import { CalendarContext, HOUR_CHUNKS, TIME_SIZE } from './calendar.provider'

export type CalendarEventName = string

export const dispatchCalendarEvent = (eventName: CalendarEventName, data: any = {}) =>
    documentObject.dispatchEvent(new CustomEvent('calendar-' + eventName, { detail: data }))

export const useCalendarEvent = (event: CalendarEventName, handler, passive = false) => {
    useEffect(() => {
        documentObject.addEventListener('calendar-' + event, handler, passive)
        return () => documentObject.removeEventListener('calendar-' + event, handler)
    })
}

export const dayIsPartOfDays = (day, days = []) => {
    return days.reduce((acc, val) => FDate(val).isSame(day) || acc, false)
}

export const timeToDecimal = (time) => {
    // Split the time string into hours and minutes
    var parts = time.split(':')
    var hours = parseInt(parts[0], 10)
    var minutes = parseInt(parts[1], 10)

    // Calculate the decimal equivalent
    var decimal = hours + minutes / 60

    return decimal
}

export const useLineSegments = () => {
    const { segments, chunksInHour, gridSize } = useContext(CalendarContext)

    const lines = useMemo(() => {
        return Array(segments)
            .fill(null)
            .map((_, index) => ({
                top: index * (100 / segments) + '%',
                height: 100 / gridSize / chunksInHour + '%',
                highlighted: index % chunksInHour == 0,
                time: (gridSize / segments) * index,
            }))
    }, [segments, chunksInHour, gridSize])

    return lines
}

export const getPosition = (date, width = 175) => {
    const minsFromMidnight = date.getHours() * 60 + date.getMinutes()
    const quarterHours = minsFromMidnight / HOUR_CHUNKS

    return {
        x: date.getDay() * width,
        y: quarterHours * TIME_SIZE + '%',
    }
}

export const getHeight = (date) => {
    const { start, end } = date
    const minsDuration = (end.valueOf() - start.valueOf()) / 60000
    const quarterHours = minsDuration / HOUR_CHUNKS

    return quarterHours * TIME_SIZE + '%'
}

export const collides = (a, b) => {
    return a.end > b.start && a.start < b.end
}

export const expand = (event, index, cols) => {
    let colSpan = 1
    cols.slice(index + 1).some((col) => {
        if (col.some((evt) => collides(event, evt))) return true
        colSpan += 1
        return false
    })
    return colSpan
}

export const setMidnight = (date) => {
    return new Date(new Date(date).setHours(0, 0, 0, 0))
}

export const getColumnName = (date) => {
    return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
}

export const findWeekdayColumnForDate = (days, date) => {
    let index = -1
    days.map((day, i) => {
        if (getColumnName(day) == getColumnName(date)) index = i
    })
    return index
}

export const dateString = (date) => {
    return date.toString().split(' ').slice(1, 3).join(' ')
}

export const isSpaceAvailableOnRow = (row = [], column, length) => {
    return row.reduce(
        (acc, val, index) => (acc === false ? false : index >= column && index <= column + length ? !val : acc),
        true
    )
}

export const findAvailableSpaceInMatrix = (arr, column, length) => {
    let rowIndex = 0
    let foundSpace = false
    let space = null

    while (!foundSpace) {
        const row = arr[rowIndex]
        const spaceAvailable = isSpaceAvailableOnRow(row, column, length)

        if (spaceAvailable) {
            space = { rowIndex, column }
            foundSpace = true
        } else {
            rowIndex++
        }
    }

    return space
}

export const isDateOnThisDay = (event, day) => {
    const d = setMidnight(day)
    const start = setMidnight(event.start)
    const end = setMidnight(event.end)

    return (end >= d && end <= d) || (start >= d && start <= d) || (start < d && end > d)
}

export const millisecondsInDay = () => {
    // Create a date object for the start of the day
    let startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0) // Set hours, minutes, seconds, and milliseconds to 0

    // Create a date object for the end of the day
    let endOfDay = new Date(startOfDay)
    endOfDay.setDate(endOfDay.getDate() + 1) // Move to the next day

    // Calculate the difference in milliseconds between the start and end of the day
    let milliseconds = endOfDay.getTime() - startOfDay.getTime()

    return milliseconds
}

export const convert24toAmPm = (hour) => {
    if (hour >= 1 && hour < 13) return pad(hour) + ' am'
    return pad(hour - 12) + ' pm'
}
