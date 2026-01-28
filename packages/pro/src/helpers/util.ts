import { FOCUSABLE, documentObject, plural, windowObject } from '@fold-dev/core'
import { CalendarTypes } from 'calendar'
import { UserSelectUser } from 'common'

export const addNumberSuffix = (number) => {
    switch (+number) {
        case 0:
            return number + ''
        case 1:
            return number + ''
        case 21:
            return number + 'st'
        case 31:
            return number + 'st'
        case 2:
            return number + 'nd'
        case 22:
            return number + 'nd'
        case 32:
            return number + 'nd'
        case 3:
            return number + 'rd'
        case 23:
            return number + 'rd'
        case 33:
            return number + 'rd'
        default:
            return number + 'th'
    }
}

export const getRepeatFrequencyText = (repeat: CalendarTypes.Repeat, weekdays: string[]) => {
    const { interval = 1, weekday = [], frequency = 'day', from = new Date(), to, repetitions = 0 } = repeat

    let label = ''

    if (frequency == 'day' || frequency == 'week' || frequency == 'month' || frequency == 'year') {
        if (interval == 1) {
            label = 'Every ' + frequency
        } else {
            label = 'Every ' + addNumberSuffix(interval) + ' ' + frequency
        }
    }

    if (frequency == 'weekday') {
        label = 'Every ' + weekday.map((i) => weekdays[i]).join(', ')
    }

    if (frequency == 'monthday') {
        label = 'Every ' + addNumberSuffix(interval) + ' day of the month'
    }

    if (frequency == 'monthweek') {
        label = 'Every ' + addNumberSuffix(interval) + ' week of the month'
    }

    label +=
        ' from ' +
        from.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        })

    if (to && !repetitions) {
        label +=
            ' until ' +
            to.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
            })
    }

    if (repetitions && !to) {
        label += ' for ' + repetitions + plural(repetitions, ' time')
    }

    return label
}

export const getUserGroupName = (users: UserSelectUser[]) => {
    switch (users.length) {
        case 0:
            return ''
        case 1:
            return `You & ${users[0].name.split(' ')[0]}`
        case 2:
            return `You, ${users[0].name.split(' ')[0]} & ${users[1].name.split(' ')[0]}`
        default:
            return `You, ${users[0].name.split(' ')[0]}, ${users[1].name.split(' ')[0]} & ${users.length - 2} more`
    }
}

export const focusOnFirstFosableElement = (container) => {
    const elements = container.querySelectorAll(FOCUSABLE.join(','))
    const firstFocusableElement = elements[0]
    firstFocusableElement?.focus()
}

export const focusOnLastFosableElement = (container) => {
    const elements = container.querySelectorAll(FOCUSABLE.join(','))
    const lastFocusableElement = elements[elements.length - 1]
    lastFocusableElement?.focus()
}

const invalidDate = (date) => isNaN(new Date(date).getTime())

export const getShortDateFormat = (date) => {
    if (invalidDate(date) || !date) return '--'
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
    })
}

export const getDatePickerDateFormat = (date) => {
    if (invalidDate(date) || !date) return '--'
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    })
}

export const getMediumDateFormat = (date) => {
    if (invalidDate(date) || !date) return '--'
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}

export const getDateFormat = (date) => {
    if (invalidDate(date) || !date) return '--'
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    })
}

export const getTimeFormat = (date) => {
    if (invalidDate(date) || !date) return '--'
    return date.toLocaleTimeString()
}

export const getDateSelectTimeFormat = (date) => {
    if (invalidDate(date) || !date) return '--'
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
}

export const getShortTimeFormat = (date) => {
    if (invalidDate(date) || !date) return '--'
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
    })
}

export const stopEvent = (e) => {
    e.preventDefault()
    e.stopPropagation()
}

export const processHTML = (html) => {
    const encapsulated = `<div>${html}</div>`.replace(/&nbsp;/g, ' ')
    const fragment = new DOMParser().parseFromString(encapsulated, 'text/xml')
    const entities = fragment.getElementsByClassName('f-rich-input-entity')

    const labels = []
    const users = []
    let date = undefined

    Array.from(entities).forEach((entity) => {
        const type = entity.getAttribute('data-type')
        const value = entity.getAttribute('data-value')
        const text = entity.innerHTML

        switch (type) {
            case 'user':
                users.push({ id: value, name: text.replace('@', '') })
                break
            case 'label':
                labels.push({ id: value, text: text.replace('#', '') })
                entity.remove()
                break
            case 'date':
                const timestamp = Date.parse(value)
                date = !isNaN(timestamp) ? new Date(timestamp) : undefined
                entity.remove()
                break
        }
    })

    const title = fragment.documentElement.innerHTML.replace(/  +/g, ' ')

    return {
        labels,
        users,
        title,
        from: date,
        to: date,
    }
}

export const getLastChar = (str: string = '') => str.charAt(str.length - 1) + ''

export const isOffScreenX = (element, position) => {
    if (!element) return false

    const bounding = element.getBoundingClientRect()
    const left = position.x
    const right = left + bounding.width

    return left < 0 || right > (windowObject.innerWidth || documentObject.documentElement.clientWidth)
}

export const isOffScreenY = (element, position) => {
    if (!element) return false

    const bounding = element.getBoundingClientRect()
    const top = position.y
    const bottom = top + bounding.height

    return top < 0 || bottom > (windowObject.innerHeight || documentObject.documentElement.clientHeight)
}

export const getCustomGhostElement = (title, amount) => {
    return `
        <div class="f-card" style="padding: var(--f-space-inset-x-2); width: fit-content; max-width: 300px;">
            <div class="f-text"><strong>${title}</strong></div>
            ${
                amount == 1
                    ? '<div class="f-text sm">+ 1 other</div>'
                    : amount > 1
                    ? '<div class="f-text sm">+ ' + (amount - 1) + ' others</div>'
                    : ''
            }
        </div>
    `
}

export const setEndOfContenteditable = (contentEditableElement) => {
    let range, selection
    if (documentObject.createRange) {
        range = documentObject.createRange()
        range.selectNodeContents(contentEditableElement)
        range.collapse(false)
        selection = windowObject.getSelection()
        selection.removeAllRanges()
        selection.addRange(range)
    } else if (documentObject.selection) {
        range = documentObject.body.createTextRange()
        range.moveToElementText(contentEditableElement)
        range.collapse(false)
        range.select()
    }
}
