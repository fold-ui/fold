import React, { ReactElement } from 'react'

export const plural = (number, str) => (number == 1 ? str : str + 's')

export const stopEvent = (e) => {
    e.preventDefault()
    e.stopPropagation()
}

export const isRightMouseButton = (e) => {
    return e.which === 3 || e.button === 2
}

export const highlightText = (text: string, query: string) => {
    var reg = new RegExp(query, 'gi')
    return text.replace(reg, (str) => {
        return `<mark>${str}</mark>`
    })
}

export const rotate = (x, y, angle) => {
    return {
        x: x * Math.cos(angle) - y * Math.sin(angle),
        y: x * Math.sin(angle) + y * Math.cos(angle),
    }
}

export const resizeDOMElement = (width, height, el) => {
    el.style.width = width + 'px'
    el.style.height = height + 'px'
}

export const selectText = (element) => {
    const range = documentObject.createRange()
    range.selectNode(element)
    windowObject.getSelection().removeAllRanges()
    windowObject.getSelection().addRange(range)
}

export const replaceAll = (str, replaceWhat, replaceTo) => {
    const re = new RegExp(replaceWhat, 'g')
    return str.replace(re, replaceTo)
}

export const clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max)
}

export const pad = (number, max = 10) => (number < max ? '0' + number : number)

export type GlobalCursor = 'col' | 'row' | 'grabbing' | 'col-resize'

export const globalCursor = {
    add: (cursor: GlobalCursor) => addDocumentClass('f-cursor-' + cursor),
    remove: (cursor: GlobalCursor) => removeDocumentClass('f-cursor-' + cursor),
}

export const addDocumentClass = (className: string) => documentObject.body.classList.add(className)

export const removeDocumentClass = (className: string) => documentObject.body.classList.remove(className)

export const scrollToTop = (target: HTMLElement) => {
    const container = target?.parentElement
    if (container) {
        container.scrollTo({
            behavior: 'smooth',
            top: target.offsetTop,
        })
    }
}

export const scrollToCenter = (target: HTMLElement) => {
    const container = target?.parentElement
    if (container) {
        container.scrollTo({
            behavior: 'smooth',
            top: target.offsetTop - (container.offsetHeight / 2 - target.offsetHeight / 2),
        })
    }
}

export function mergeRefs<T = any>(refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>): React.RefCallback<T> {
    return (value) => {
        refs.forEach((ref) => {
            if (typeof ref === 'function') {
                ref(value)
            } else if (ref != null) {
                ;(ref as React.MutableRefObject<T | null>).current = value
            }
        })
    }
}

export const isClient: boolean = typeof window != 'undefined'

export const shortenNames = (names: string[]) => names.map((name) => name.split(' ')[0]).join(', ')

export let windowObject: Window | any =
    typeof window === 'undefined'
        ? {
              F_ICONS: {},
              F_DRAG_CACHE: {},
              F_DRAG_STATE: {},
              AudioContext: null,
              webkitAudioContext: null,
              devicePixelRatio: null,
              innerWidth: 0,
              innerHeight: 0,
              outerWidth: 0,
              outerHeight: 0,
              fetch: () => null,
              addEventListener: (event, handler, passive = null) => null,
              removeEventListener: (event, handler, passive = null) => null,
              dispatchEvent: (event) => null,
              matchMedia: (media) => ({ matches: false }),
              getSelection: () => {},
              clipboardData: null,
          }
        : window

export let documentObject: Document | any =
    typeof window === 'undefined'
        ? {
              elementFromPoint: (x, y) => null,
              querySelectorAll: (s) => [],
              querySelector: (s) => {},
              activeElement: null,
              documentElement: {
                  setAttribute: (attr) => null,
                  getAttribute: (attr) => null,
                  scrollTop: 0,
                  style: {},
              },
              body: {
                  dataset: {},
                  scrollTop: 0,
                  appendChild: (el) => null,
                  style: {
                      removeProperty: (a) => null,
                      setProperty: (a, b, c) => null,
                  },
                  classList: {
                      toggle: (className) => null,
                      add: (className) => null,
                      remove: (className) => null,
                  },
              },
              execCommand: (cmd) => null,
              createElement: (tag): any => {},
              createRange: (tag): any => {},
              getElementsByTagName: (tag) => [null],
              getElementById: (id) => ({ scrollIntoView: (params) => null }),
          }
        : document

export const focusInputAtEnd = (el) => {
    el.focus()

    executeLast(() => {
        const { type, value } = el
        const end = value.length
        if (type != 'number') el.setSelectionRange(end, end)
    })
}

export const checkParentNodesForId = (el, id) => {
    let found = false
    while (el.parentNode) {
        el = el.parentNode
        if (el.id === id) {
            found = true
            return null
        } else {
            return el
        }
    }
    return found
}

export const executeLast = (cb, delay = 100) => setTimeout(cb, delay)

export const getLetterArray = (value: string, size: number): string[] => {
    const arr = new Array(size).fill('')
    const values = value?.split('')
    return arr.map((a, i) => (!!values[i] ? values[i] : a))
}

export const getOffsetToRoot = (el) => {
    let top = 0
    let left = 0

    if (el.offsetParent) {
        do {
            top += el.offsetTop
            left += el.offsetLeft
            el = el.offsetParent
        } while (el)
    }

    return { top, left }
}

export const getOffset = (element) => {
    return {
        width: element?.offsetWidth,
        height: element?.offsetHeight,
        left: element?.offsetLeft,
        top: element?.offsetTop,
        parent: element?.offsetParent,
    }
}

export const isBoxOffScreen = ({ top, left, width, height }) => {
    const x = left + width > windowObject.innerWidth
    const y = top + height > windowObject.innerHeight
    return { x, y }
}

export const isOffScreen = (el: HTMLElement) => {
    if (!el) return { x: false, y: false }

    const { innerWidth, innerHeight } = windowObject
    const { x, y, width, height } = el.getBoundingClientRect()

    return {
        offscreenX: x + width > innerWidth,
        offscreenY: y + height > innerHeight,
    }
}

export const isOffScreenCoordinates = (rect: any) => {
    const x = rect.x + rect.width > windowObject.innerWidth
    const y = rect.y + rect.height > windowObject.innerHeight
    return { x, y }
}

export const getButton = (e) => {
    const { button } = e

    return {
        isLeftButton: button == 0,
        isMiddleButton: button == 1,
        isRightButton: button == 2,
        isBackButton: button == 3,
        isForwardButton: button == 4,
    }
}

// these are shortcuts to the most commonly used, here is the whole list:
// https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values
export const getKey = (e) => {
    const { key } = e
    const { shiftKey, ctrlKey, altKey, metaKey } = e

    return {
        isBackspace: key == 'Backspace',
        isEscape: key == 'Escape',
        isSpace: key == ' ',
        isEnter: key == 'Enter',
        isDown: key == 'ArrowDown',
        isUp: key == 'ArrowUp',
        isLeft: key == 'ArrowLeft',
        isRight: key == 'ArrowRight',
        isPageUp: key == 'PageUp',
        isPageDown: key == 'PageDown',
        isTab: key == 'Tab',
        isTabNormal: key == 'Tab' && !shiftKey,
        isTabReverse: key == 'Tab' && shiftKey,
        isShift: shiftKey,
        isCtrl: ctrlKey,
        isAlt: altKey,
        isMeta: metaKey,
    }
}

export const getValidObject = (obj: any) => {
    return obj ? { ...obj } : {}
}

export const getPercent = (n: number) => {
    return Math.ceil(n * 100)
}

export const getPropsByString = (props: any, str: string) => {
    let ariaObject = {}
    Object.keys(props)
        .filter((key: string) => key.includes(str))
        .map((key: string) => {
            ariaObject[key] = props[key]
        })
    return cleanObject(ariaObject)
}

export const renderChildren = (children: any, callback: any) => {
    return React.Children.map(children, callback)
}

export const renderWithProps = (children: any, props: any) => {
    return React.Children.map(children, (child: ReactElement, index) => {
        return React.cloneElement(child, {
            ...child.props,
            ...props,
        })
    })
}

export const classNamesOld = (object: any, classes: string[] = []): string => {
    const classList = classes.filter((c) => !!c)
    const classArray = []
    for (const property in object) {
        if (!!object[property]) classArray.push(property)
    }
    const allClasses = [...classList, ...classArray].join(' ')
    return !!allClasses ? allClasses : null
}

export const classNames = (object: any, classes: string[] = []): string => {
    const classList = classes.filter((c) => !!c)
    const classArray: string[] = []

    for (const property in object) {
        if (object[property]) classArray.push(property)
    }

    const allClasses = [...classList, ...classArray].join(' ')
    return allClasses || ''
}

export const focusElementById = (id: string) => {
    const el: HTMLElement = documentObject.getElementById(id)
    el?.focus()
}

export const focusElement = (el: HTMLElement) => el?.focus()

export const blurElement = (el: HTMLElement) => el?.blur()

export const getBoundingClientRect = (element) => {
    if (!element) return {}
    const { top, right, bottom, left, width, height, x, y } = element.getBoundingClientRect()
    return { top, right, bottom, left, width, height, x, y }
}

export const formatCSSDimension = (value: any) => {
    return isNaN(value) ? value : value + 'px'
}

export const generateUEID = () => {
    const prefix = 'f-'
    const first = (Math.random() * 46656) | 0
    const second = (Math.random() * 46656) | 0
    return prefix + (first + second)
}

export const getAlignClass = (variant: string) => {
    return variant ? `f-align-${variant}` : null
}

export const getPopoutClass = (variant: string) => {
    return variant ? `f-popout-${variant}` : null
}

export const getActionClass = (variant: string) => {
    return variant ? `is-${variant}` : null
}

export const getMimeTypeDescription = (type: string) => {
    switch (type) {
        case 'audio/aac':
            return 'AAC audio'
        case 'application/x-abiword':
            return 'AbiWorddocument'
        case 'application/x-freearc':
            return 'Archive document (multiple files embedded)'
        case 'video/x-msvideo':
            return 'AVI: Audio Video Interleave'
        case 'application/vnd.amazon.ebook':
            return 'Amazon Kindle eBook format'
        case 'application/octet-stream':
            return 'Any kind of binary data'
        case 'image/bmp':
            return 'Windows OS/2 Bitmap Graphics'
        case 'application/x-bzip':
            return 'BZip archive'
        case 'application/x-bzip2':
            return 'BZip2 archive'
        case 'application/x-csh':
            return 'C-Shell script'
        case 'text/css':
            return 'Cascading Style Sheets (CSS)'
        case 'text/csv':
            return 'Comma-separated values (CSV)'
        case 'application/msword':
            return 'Microsoft Word'
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return 'Microsoft Word (OpenXML)'
        case 'application/vnd.ms-fontobject':
            return 'MS Embedded OpenType fonts'
        case 'application/epub+zip':
            return 'Electronic publication (EPUB)'
        case 'application/gzip':
            return 'GZip Compressed Archive'
        case 'image/gif':
            return 'Graphics Interchange Format (GIF)'
        case 'text/html':
            return 'HyperText Markup Language (HTML)'
        case 'image/vnd.microsoft.icon':
            return 'Icon format'
        case 'text/calendar':
            return 'iCalendar format'
        case 'application/java-archive':
            return 'Java Archive (JAR)'
        case 'image/jpeg':
            return 'JPEG images'
        case 'text/javascript':
            return 'JavaScript'
        case 'application/json':
            return 'JSON format'
        case 'application/ld+json':
            return 'JSON-LD format'
        case 'audio/midiaudio/x-midi':
            return 'Musical Instrument Digital Interface (MIDI)'
        case 'audio/mpeg':
            return 'MP3 audio'
        case 'video/mpeg':
            return 'MPEG Video'
        case 'application/vnd.apple.installer+xml':
            return 'Apple Installer Package'
        case 'application/vnd.oasis.opendocument.presentation':
            return 'OpenDocument presentation document'
        case 'application/vnd.oasis.opendocument.spreadsheet':
            return 'OpenDocument spreadsheet document'
        case 'application/vnd.oasis.opendocument.text':
            return 'OpenDocument text document'
        case 'audio/ogg':
            return 'OGG audio'
        case 'video/ogg':
            return 'OGG video'
        case 'application/ogg':
            return 'OGG'
        case 'audio/opus':
            return 'Opus audio'
        case 'font/otf':
            return 'OpenType font'
        case 'image/png':
            return 'Portable Network Graphics'
        case 'application/pdf':
            return 'AdobePortable Document Format(PDF)'
        case 'appliction/php':
            return 'Hypertext Preprocessor (Personal Home Page)'
        case 'application/vnd.ms-powerpoint':
            return 'Microsoft PowerPoint'
        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
            return 'Microsoft PowerPoint (OpenXML)'
        case 'application/x-rar-compressed':
            return 'RAR archive'
        case 'application/rtf':
            return 'Rich Text Format (RTF)'
        case 'application/x-sh':
            return 'Bourne shell script'
        case 'image/svg+xml':
            return 'Scalable Vector Graphics (SVG)'
        case 'application/x-shockwave-flash':
            return 'Small web format(SWF) or Adobe Flash document'
        case 'application/x-tar':
            return 'Tape Archive (TAR)'
        case 'image/tiff':
            return 'Tagged Image File Format (TIFF)'
        case 'video/mp2t':
            return 'MPEG transport stream'
        case 'font/ttf':
            return 'TrueType Font'
        case 'text/plain':
            return 'Text'
        case 'application/vnd.visio':
            return 'Microsoft Visio'
        case 'audio/wav':
            return 'Waveform Audio Format'
        case 'audio/webm':
            return 'WEBM audio'
        case 'video/webm':
            return 'WEBM video'
        case 'video/mp4':
            return 'Video File'
        case 'image/webp':
            return 'WEBP image'
        case 'font/woff':
            return 'Web Open Font Format (WOFF)'
        case 'font/woff2':
            return 'Web Open Font Format (WOFF)'
        case 'application/xhtml+xml':
            return 'XHTML'
        case 'application/vnd.ms-excel':
            return 'Microsoft Excel'
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            return 'Microsoft Excel (OpenXML)'
        case 'application/xmlifnotreadable from casual users (RFC 3023':
            return ' section 3)'
        case 'text/xmlif readable from casual users':
            return 'XML'
        case 'application/vnd.mozilla.xul+xml':
            return 'XUL'
        case 'application/zip':
            return 'ZIP archive'
        case "audio/3gppif it doesn't contain video":
            return '3GPPaudio/video container'
        case "audio/3gpp2if it doesn't contain video":
            return '3GPP2audio/video container'
        case 'application/x-7z-compressed':
            return '7-ziparchive'
        default:
            return 'Document'
    }
}

export const cleanObject = (obj: any) => {
    const result: any = {}
    for (const key in obj) {
        if (obj[key] != null) result[key] = obj[key]
    }
    return result
}

export const mapBetween = (currentNum, minAllowed, maxAllowed, min, max) => {
    return ((maxAllowed - minAllowed) * (currentNum - min)) / (max - min) + minAllowed
}

export const range = (start, end) => {
    let length = end - start + 1
    return Array.from({ length }, (_, idx) => idx + start)
}

export const styleGhostElement = (element, { top, left, width, height }) => {
    element.style.boxShadow = '0px 15px 25px -4px rgba(150, 150, 150, 0.24)'
    element.style.position = 'fixed'
    element.style.pointerEvents = 'none'
    element.style.zIndex = 500
    element.style.transform = 'rotate(5deg)'
    element.style.transition = 'none'
    element.style.width = width
    element.style.height = height
    element.style.top = top
    element.style.left = left

    element.className = 'draggable dragging'
}

export const cache = {
    set: (key: string, value: any) => {
        if (window) window[key] = value
    },
    delete: (key: string) => {
        if (window) delete window[key]
    },
    get: (key: string) => {
        return window ? window[key] : null
    },
}

export const bytesToSize = (bytes: number): string => {
    if (bytes == null) return null
    const sizes = [' bytes', 'kb', 'mb', 'gb', 'tb']
    if (bytes == 0) return '0 Byte'
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)) + '', 10)
    return Math.round(bytes / Math.pow(1024, i)) + sizes[i]
}

export const urlParser = (url: string): string[] => {
    if (!url) return []
    if (typeof url != 'string') return []

    const match = url.match(/(http[s]?:\/\/.*)/i)
    return match ? match[0].split(' ') : []
}

export const logger = function (a?): void {
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        for (const argument of arguments) {
            console.log(argument)
        }
    }
}

export const removeNullProperties = (obj: any) => {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null))
}

export const timezones = [
    'Europe/Andorra',
    'Asia/Dubai',
    'Asia/Kabul',
    'Europe/Tirane',
    'Asia/Yerevan',
    'Antarctica/Casey',
    'Antarctica/Davis',
    'Antarctica/DumontDUrville', // https://bugs.chromium.org/p/chromium/issues/detail?id=928068
    'Antarctica/Mawson',
    'Antarctica/Palmer',
    'Antarctica/Rothera',
    'Antarctica/Syowa',
    'Antarctica/Troll',
    'Antarctica/Vostok',
    'America/Argentina/Buenos_Aires',
    'America/Argentina/Cordoba',
    'America/Argentina/Salta',
    'America/Argentina/Jujuy',
    'America/Argentina/Tucuman',
    'America/Argentina/Catamarca',
    'America/Argentina/La_Rioja',
    'America/Argentina/San_Juan',
    'America/Argentina/Mendoza',
    'America/Argentina/San_Luis',
    'America/Argentina/Rio_Gallegos',
    'America/Argentina/Ushuaia',
    'Pacific/Pago_Pago',
    'Europe/Vienna',
    'Australia/Lord_Howe',
    'Antarctica/Macquarie',
    'Australia/Hobart',
    'Australia/Currie',
    'Australia/Melbourne',
    'Australia/Sydney',
    'Australia/Broken_Hill',
    'Australia/Brisbane',
    'Australia/Lindeman',
    'Australia/Adelaide',
    'Australia/Darwin',
    'Australia/Perth',
    'Australia/Eucla',
    'Asia/Baku',
    'America/Barbados',
    'Asia/Dhaka',
    'Europe/Brussels',
    'Europe/Sofia',
    'Atlantic/Bermuda',
    'Asia/Brunei',
    'America/La_Paz',
    'America/Noronha',
    'America/Belem',
    'America/Fortaleza',
    'America/Recife',
    'America/Araguaina',
    'America/Maceio',
    'America/Bahia',
    'America/Sao_Paulo',
    'America/Campo_Grande',
    'America/Cuiaba',
    'America/Santarem',
    'America/Porto_Velho',
    'America/Boa_Vista',
    'America/Manaus',
    'America/Eirunepe',
    'America/Rio_Branco',
    'America/Nassau',
    'Asia/Thimphu',
    'Europe/Minsk',
    'America/Belize',
    'America/St_Johns',
    'America/Halifax',
    'America/Glace_Bay',
    'America/Moncton',
    'America/Goose_Bay',
    'America/Blanc-Sablon',
    'America/Toronto',
    'America/Nipigon',
    'America/Thunder_Bay',
    'America/Iqaluit',
    'America/Pangnirtung',
    'America/Atikokan',
    'America/Winnipeg',
    'America/Rainy_River',
    'America/Resolute',
    'America/Rankin_Inlet',
    'America/Regina',
    'America/Swift_Current',
    'America/Edmonton',
    'America/Cambridge_Bay',
    'America/Yellowknife',
    'America/Inuvik',
    'America/Creston',
    'America/Dawson_Creek',
    'America/Fort_Nelson',
    'America/Vancouver',
    'America/Whitehorse',
    'America/Dawson',
    'Indian/Cocos',
    'Europe/Zurich',
    'Africa/Abidjan',
    'Pacific/Rarotonga',
    'America/Santiago',
    'America/Punta_Arenas',
    'Pacific/Easter',
    'Asia/Shanghai',
    'Asia/Urumqi',
    'America/Bogota',
    'America/Costa_Rica',
    'America/Havana',
    'Atlantic/Cape_Verde',
    'America/Curacao',
    'Indian/Christmas',
    'Asia/Nicosia',
    'Asia/Famagusta',
    'Europe/Prague',
    'Europe/Berlin',
    'Europe/Copenhagen',
    'America/Santo_Domingo',
    'Africa/Algiers',
    'America/Guayaquil',
    'Pacific/Galapagos',
    'Europe/Tallinn',
    'Africa/Cairo',
    'Africa/El_Aaiun',
    'Europe/Madrid',
    'Africa/Ceuta',
    'Atlantic/Canary',
    'Europe/Helsinki',
    'Pacific/Fiji',
    'Atlantic/Stanley',
    'Pacific/Chuuk',
    'Pacific/Pohnpei',
    'Pacific/Kosrae',
    'Atlantic/Faroe',
    'Europe/Paris',
    'Europe/London',
    'Asia/Tbilisi',
    'America/Cayenne',
    'Africa/Accra',
    'Europe/Gibraltar',
    'America/Godthab',
    'America/Danmarkshavn',
    'America/Scoresbysund',
    'America/Thule',
    'Europe/Athens',
    'Atlantic/South_Georgia',
    'America/Guatemala',
    'Pacific/Guam',
    'Africa/Bissau',
    'America/Guyana',
    'Asia/Hong_Kong',
    'America/Tegucigalpa',
    'America/Port-au-Prince',
    'Europe/Budapest',
    'Asia/Jakarta',
    'Asia/Pontianak',
    'Asia/Makassar',
    'Asia/Jayapura',
    'Europe/Dublin',
    'Asia/Jerusalem',
    'Asia/Kolkata',
    'Indian/Chagos',
    'Asia/Baghdad',
    'Asia/Tehran',
    'Atlantic/Reykjavik',
    'Europe/Rome',
    'America/Jamaica',
    'Asia/Amman',
    'Asia/Tokyo',
    'Africa/Nairobi',
    'Asia/Bishkek',
    'Pacific/Tarawa',
    'Pacific/Enderbury',
    'Pacific/Kiritimati',
    'Asia/Pyongyang',
    'Asia/Seoul',
    'Asia/Almaty',
    'Asia/Qyzylorda',
    'Asia/Qostanay', // https://bugs.chromium.org/p/chromium/issues/detail?id=928068
    'Asia/Aqtobe',
    'Asia/Aqtau',
    'Asia/Atyrau',
    'Asia/Oral',
    'Asia/Beirut',
    'Asia/Colombo',
    'Africa/Monrovia',
    'Europe/Vilnius',
    'Europe/Luxembourg',
    'Europe/Riga',
    'Africa/Tripoli',
    'Africa/Casablanca',
    'Europe/Monaco',
    'Europe/Chisinau',
    'Pacific/Majuro',
    'Pacific/Kwajalein',
    'Asia/Yangon',
    'Asia/Ulaanbaatar',
    'Asia/Hovd',
    'Asia/Choibalsan',
    'Asia/Macau',
    'America/Martinique',
    'Europe/Malta',
    'Indian/Mauritius',
    'Indian/Maldives',
    'America/Mexico_City',
    'America/Cancun',
    'America/Merida',
    'America/Monterrey',
    'America/Matamoros',
    'America/Mazatlan',
    'America/Chihuahua',
    'America/Ojinaga',
    'America/Hermosillo',
    'America/Tijuana',
    'America/Bahia_Banderas',
    'Asia/Kuala_Lumpur',
    'Asia/Kuching',
    'Africa/Maputo',
    'Africa/Windhoek',
    'Pacific/Noumea',
    'Pacific/Norfolk',
    'Africa/Lagos',
    'America/Managua',
    'Europe/Amsterdam',
    'Europe/Oslo',
    'Asia/Kathmandu',
    'Pacific/Nauru',
    'Pacific/Niue',
    'Pacific/Auckland',
    'Pacific/Chatham',
    'America/Panama',
    'America/Lima',
    'Pacific/Tahiti',
    'Pacific/Marquesas',
    'Pacific/Gambier',
    'Pacific/Port_Moresby',
    'Pacific/Bougainville',
    'Asia/Manila',
    'Asia/Karachi',
    'Europe/Warsaw',
    'America/Miquelon',
    'Pacific/Pitcairn',
    'America/Puerto_Rico',
    'Asia/Gaza',
    'Asia/Hebron',
    'Europe/Lisbon',
    'Atlantic/Madeira',
    'Atlantic/Azores',
    'Pacific/Palau',
    'America/Asuncion',
    'Asia/Qatar',
    'Indian/Reunion',
    'Europe/Bucharest',
    'Europe/Belgrade',
    'Europe/Kaliningrad',
    'Europe/Moscow',
    'Europe/Simferopol',
    'Europe/Kirov',
    'Europe/Astrakhan',
    'Europe/Volgograd',
    'Europe/Saratov',
    'Europe/Ulyanovsk',
    'Europe/Samara',
    'Asia/Yekaterinburg',
    'Asia/Omsk',
    'Asia/Novosibirsk',
    'Asia/Barnaul',
    'Asia/Tomsk',
    'Asia/Novokuznetsk',
    'Asia/Krasnoyarsk',
    'Asia/Irkutsk',
    'Asia/Chita',
    'Asia/Yakutsk',
    'Asia/Khandyga',
    'Asia/Vladivostok',
    'Asia/Ust-Nera',
    'Asia/Magadan',
    'Asia/Sakhalin',
    'Asia/Srednekolymsk',
    'Asia/Kamchatka',
    'Asia/Anadyr',
    'Asia/Riyadh',
    'Pacific/Guadalcanal',
    'Indian/Mahe',
    'Africa/Khartoum',
    'Europe/Stockholm',
    'Asia/Singapore',
    'America/Paramaribo',
    'Africa/Juba',
    'Africa/Sao_Tome',
    'America/El_Salvador',
    'Asia/Damascus',
    'America/Grand_Turk',
    'Africa/Ndjamena',
    'Indian/Kerguelen',
    'Asia/Bangkok',
    'Asia/Dushanbe',
    'Pacific/Fakaofo',
    'Asia/Dili',
    'Asia/Ashgabat',
    'Africa/Tunis',
    'Pacific/Tongatapu',
    'Europe/Istanbul',
    'America/Port_of_Spain',
    'Pacific/Funafuti',
    'Asia/Taipei',
    'Europe/Kiev',
    'Europe/Uzhgorod',
    'Europe/Zaporozhye',
    'Pacific/Wake',
    'America/New_York',
    'America/Detroit',
    'America/Kentucky/Louisville',
    'America/Kentucky/Monticello',
    'America/Indiana/Indianapolis',
    'America/Indiana/Vincennes',
    'America/Indiana/Winamac',
    'America/Indiana/Marengo',
    'America/Indiana/Petersburg',
    'America/Indiana/Vevay',
    'America/Chicago',
    'America/Indiana/Tell_City',
    'America/Indiana/Knox',
    'America/Menominee',
    'America/North_Dakota/Center',
    'America/North_Dakota/New_Salem',
    'America/North_Dakota/Beulah',
    'America/Denver',
    'America/Boise',
    'America/Phoenix',
    'America/Los_Angeles',
    'America/Anchorage',
    'America/Juneau',
    'America/Sitka',
    'America/Metlakatla',
    'America/Yakutat',
    'America/Nome',
    'America/Adak',
    'Pacific/Honolulu',
    'America/Montevideo',
    'Asia/Samarkand',
    'Asia/Tashkent',
    'America/Caracas',
    'Asia/Ho_Chi_Minh',
    'Pacific/Efate',
    'Pacific/Wallis',
    'Pacific/Apia',
    'Africa/Johannesburg',
]

export const waitForRender = (cb, t = 0) => setTimeout(cb, t)

export const setCaretToTheEnd = (element) => {
    const position = element.textContent.length
    const [childNode] = element.childNodes
    const range = documentObject.createRange()
    const selection = windowObject.getSelection()
    if (!!range && !!selection) {
        range.setStart(childNode, position)
        range.setEnd(childNode, position)
        range.collapse(true)
        selection.removeAllRanges()
        selection.addRange(range)
    }
}

export const selectElementContents = (el) => {
    const range = documentObject.createRange()
    range.selectNodeContents(el)
    const sel = windowObject.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
}
