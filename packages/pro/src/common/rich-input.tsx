import {
    CommonProps,
    Portal,
    Size,
    classNames,
    documentObject,
    getBoundingClientRect,
    getKey,
    mergeRefs,
    useId,
    waitForRender,
    windowObject,
} from '@fold-ui/core'
import React, {
    createContext,
    forwardRef,
    useContext,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import {
    LabelSelectLabel,
    UserSelectUser,
    isOffScreenX,
    isOffScreenY,
    processHTML,
    setEndOfContenteditable,
    stopEvent,
} from '../'

export type InputEventName = 'emoticon' | 'node' | 'onenter'

export const dispatchRichInputEvent = (eventName: InputEventName, data: any = {}) =>
    documentObject.dispatchEvent(new CustomEvent(eventName, { detail: data }))

export const useRichInputEvent = (event: InputEventName, handler, passive = false) => {
    useEffect(() => {
        documentObject.addEventListener(event, handler, passive)
        return () => documentObject.removeEventListener(event, handler)
    })
}

export const OptionsMenu = ({ position, options, onSelect, index }) => {
    const [offscreenX, setOffscreenX] = useState(false)
    const [offscreenY, setOffscreenY] = useState(false)
    const ref = useRef(null)

    useLayoutEffect(() => {
        setOffscreenX(isOffScreenX(ref.current, position))
        setOffscreenY(isOffScreenY(ref.current, position))
    }, [position])

    return (
        <Portal>
            <div
                ref={ref}
                className="f-rich-input__menu"
                style={{
                    top: position.y,
                    left: position.x,
                    display: options.length == 0 ? 'none' : 'block',
                    transform:
                        offscreenX && offscreenY
                            ? 'translateX(-100%) translateY(-100%)'
                            : offscreenX
                            ? 'translateX(-100%)'
                            : offscreenY
                            ? 'translateY(-100%)'
                            : null,
                }}>
                {options.map(({ id, name }, index1: number) => (
                    <div
                        key={index1}
                        className="f-rich-input__menu-item f-row f-buttonize"
                        onClick={() => onSelect({ id, name })}
                        style={{ background: index == index1 ? 'var(--f-color-surface-strong)' : 'transparent' }}>
                        {name}
                    </div>
                ))}
            </div>
        </Portal>
    )
}

export type RichInputOption = {
    id: string
    name: string
    type: string
}

export const RichInputContext = createContext<any>({})

export type HtmlProcessorResult = {
    labels?: LabelSelectLabel
    users?: UserSelectUser
    title: string
    from?: Date
    to?: Date
}

export type RichInputProviderProps = {
    triggers: string[]
    options: RichInputOption[]
    onTrigger: (value) => void
    onWord: (value, cb, always?) => void
    htmlProcessor?: (html: string) => HtmlProcessorResult
}

export const RichInputProvider = (props: any) => {
    const { triggers = [], options = [], onWord, onTrigger, children, htmlProcessor = processHTML } = props

    return (
        <RichInputContext.Provider
            value={{
                triggers,
                options,
                onTrigger,
                onWord,
                htmlProcessor,
            }}>
            {children}
        </RichInputContext.Provider>
    )
}

export type RichInputProps = {
    dontClearOnSubmit?: boolean
    defaultValue?: string
    placeholder?: string
    className?: string
    onEnter?: (value) => void
    onCancel?: () => void
    onBlur?: (value) => void
    onIndent?: () => void
    onOutdent?: () => void
    onUp?: () => void
    onDown?: () => void
} & CommonProps

export const RichInput = forwardRef((props: RichInputProps, ref) => {
    const {
        dontClearOnSubmit,
        defaultValue = '',
        placeholder = '',
        onEnter,
        onCancel,
        onBlur,
        onIndent,
        onOutdent,
        onUp,
        onDown,
        ...rest
    } = props
    const id = useId()
    const containerRef = useRef(null)
    const editorRef = useRef(null)
    const rangeCache = useRef(null)
    const { triggers, options, onTrigger, onWord } = useContext(RichInputContext)
    const [text, setText] = useState('')
    const [html, setHtml] = useState(defaultValue)
    const [timestamp, setTimestamp] = useState(0)
    const empty = useMemo(() => editorRef.current?.innerHTML.trim() == '', [timestamp, html])
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [index, setIndex] = useState(0)
    const menuOpen = useMemo(() => !!options.length && !!position.x && !!position.y, [options, position])
    const filteredOptions = useMemo(() => {
        return options.filter(({ id, name }) => name.toLowerCase().includes(text.trim().toLowerCase()))
    }, [options, text])
    const className = classNames({ 'f-rich-input': true }, [props.className])

    const updateTimestamp = () => {
        setTimestamp(new Date().getTime())
    }

    const createHighlightNode = (value, type) => {
        const entity = documentObject.createElement('mark')

        entity.className = 'f-rich-input-entity'
        entity.contentEditable = 'false'
        entity.tabIndex = 1
        entity.dataset.type = type
        entity.dataset.value = value

        return entity
    }

    const createEntityNode = (id, text, type) => {
        const entity = documentObject.createElement('a')

        entity.className = 'f-rich-input-entity'
        entity.contentEditable = 'false'
        entity.tabIndex = 1
        entity.innerHTML = text
        entity.dataset.value = id
        entity.dataset.type = type

        return entity
    }

    const getWordBoundary = (text: string, position: number) => {
        let start
        let end

        for (let i = position; i >= 0; i--) {
            if (text[i] == ' ') {
                start = i
                break
            }
        }

        switch (start) {
            case undefined:
                start = 0
                break
            case 0:
                start = 0
                break
            default:
                start = start + 1
        }

        for (let i = position; i <= text.length; i++) {
            if (text[i] == ' ') {
                end = i
                break
            }
        }

        switch (end) {
            case undefined:
                end = text.length
                break
            default:
                end = end
        }

        return { start, end }
    }

    const getModifiedWordBoundary = (text: string, position: number) => {
        let boundary = getWordBoundary(text, position)
        if (position == boundary.end) boundary = getWordBoundary(text, position - 1)
        return boundary
    }

    const getWindowSelection = (): Selection => {
        return windowObject.getSelection() || new Selection()
    }

    const insertEntity = ({ id, name, type }) => {
        const selection: Selection = getWindowSelection()

        // Manually add it our saved range
        // from the cached version
        selection.removeAllRanges()
        selection.addRange(rangeCache.current)

        const range: Range = selection.getRangeAt(0)
        const { startContainer, startOffset } = range
        const { textContent } = startContainer
        const text = textContent || ''
        const { start, end } = getModifiedWordBoundary(text, startOffset)

        // Create a mention object
        const node = createEntityNode(id, name, type)
        const textNode = documentObject.createTextNode('\u00A0')

        // Set the range to word at the caret
        range.setStart(startContainer, start)
        range.setEnd(startContainer, end)
        range.deleteContents()

        // will be blank if there is another entity node in front
        if (!documentObject.getSelection().anchorNode.nodeValue.trim()) {
            range.insertNode(textNode)
            range.setStartAfter(textNode)
        }

        // insert entity node
        range.insertNode(node)

        // Clear the selection
        const r: Range = range.cloneRange()
        r.setStartAfter(node)
        r.collapse(true)
        selection.removeAllRanges()
        selection.addRange(r)

        // Close the menu
        closeMenu()
    }

    const getWordAtCaret = () => {
        const selection: Selection = getWindowSelection()
        const range: Range = selection.getRangeAt(0)
        const { startContainer, startOffset } = range
        const { textContent } = startContainer
        const text = textContent || ''
        const { start, end } = getModifiedWordBoundary(text, startOffset)
        const word = text.substring(start, end)

        // Get the last letter
        // If the last letter is a space then ignore
        // contentEditable will assign the spacve to the previous word
        // if there is no "next" word in the sentence
        return word.charAt(word.length - 1) == ' ' ? null : word
    }

    const focus = () => {
        editorRef.current.focus()
    }

    const openMenu = () => {
        const selection: Selection = getWindowSelection()
        const range: Range = selection.getRangeAt(0)

        if (!!range.getClientRects().length) {
            const { x, y } = range.getClientRects()[0]
            rangeCache.current = range
            setPosition({ x, y })
        }
    }

    const closeMenu = () => {
        rangeCache.current = null
        setPosition({ x: 0, y: 0 })
        setText('')
    }

    const handleInput = (e) => {
        updateTimestamp()
    }

    const handlePaste = (e) => {
        e.preventDefault()
        const paste = e.clipboardData.getData('text')
        const selection = windowObject.getSelection()
        if (!selection.rangeCount) return
        selection.deleteFromDocument()
        selection.getRangeAt(0).insertNode(documentObject.createTextNode(paste))
        selection.collapseToEnd()
    }

    const onWordCallback = (highlight = null, callback = null) => {
        if (highlight) {
            const { phrase, type, value } = highlight
            const selection: Selection = getWindowSelection()
            const range = selection.getRangeAt(0)
            const { startContainer, startOffset, endOffset } = range
            const { textContent } = startContainer
            const start = textContent.toLowerCase().indexOf(phrase.toLowerCase())
            const end = start + phrase.length

            if (start != -1 && end != -1) {
                const range1 = documentObject.createRange()

                range1.setStart(startContainer, start)
                range1.setEnd(startContainer, end)

                const entity = createHighlightNode(value, type)

                range1.surroundContents(entity)
                range1.collapse(true)
            }
        }

        if (callback) callback()
    }

    const handleKeyUp = (e) => {
        const { isSpace, isEnter, isBackspace, isEscape } = getKey(e)
        const word = getWordAtCaret()
        const firstChar = word.trim().charAt(0)

        if (triggers.includes(firstChar)) {
            onTrigger(word)
            setText(word)
            openMenu()
        } else {
            closeMenu()
        }

        if (isSpace) {
            onWord(word, onWordCallback)
        }
    }

    const handleKeyDown = (e) => {
        const inputEvent: KeyboardEvent = e.nativeEvent
        const { metaKey, key } = inputEvent
        const { isEnter, isRight, isLeft, isUp, isDown, isShift, isBackspace, isEscape, isSpace } = getKey(e)
        const word = getWordAtCaret()

        if (isEscape && !menuOpen) {
            // stopEvent(e)
            if (onCancel) onCancel()
            editorRef.current.blur()
            return
        }

        if (isEscape && menuOpen) {
            stopEvent(e)
            closeMenu()
            waitForRender(() => {
                focus()
                setEndOfContenteditable(editorRef.current)
            }, 100)
            return
        }

        if (isEnter && !menuOpen) {
            stopEvent(e)

            const submit = () => {
                onEnter(editorRef.current.innerHTML)

                if (!dontClearOnSubmit) {
                    editorRef.current.innerHTML = ''
                    setHtml('')
                    setText('')
                    updateTimestamp()
                }

                focus()
            }

            if (onEnter) {
                submit()
                // TODO
                // do we need this?
                // before hitting enter we check for any phrases to highlight
                // in the last word, otherwise we continue with normal operation
                // onWord(
                //     word,
                //     // this is a callback wrapper:
                //     // check if there is a match -> highlight -> callback (submit)
                //     (match) => {
                //         if (match) {
                //             onWordCallback(match, () => submit())
                //         } else {
                //             submit()
                //         }
                //     }
                // )
            }
        }

        if (isEnter && menuOpen) {
            stopEvent(e)
        }

        if (isShift && isRight) {
            stopEvent(e)
            if (onIndent) onIndent()
        }

        if (isShift && isLeft) {
            stopEvent(e)
            if (onOutdent) onOutdent()
        }

        if (isShift && isUp) {
            stopEvent(e)
            if (onUp) onUp()
        }

        if (isShift && isDown) {
            stopEvent(e)
            if (onDown) onDown()
        }

        if (menuOpen) {
            if (isUp) {
                stopEvent(e)
                setIndex(index == 0 ? options.length - 1 : index - 1)
            }

            if (isDown) {
                stopEvent(e)
                setIndex(index == options.length - 1 ? 0 : index + 1)
            }

            if (isEnter) {
                stopEvent(e)
                insertEntity(filteredOptions[index])
            }
        }

        if (metaKey) {
            switch (key) {
                case 'b':
                    return stopEvent(e)
                case 's':
                    return stopEvent(e)
                case 'i':
                    return stopEvent(e)
            }
        }
    }

    const handleFocus = (e) => {}

    const handleBlur = (e) => {
        onBlur(editorRef.current.innerHTML)
    }

    const handleMouseDown = (e) => {
        if (e.target.dataset.entity) {
            e.preventDefault()
            e.target.focus()
            const { left, bottom } = getBoundingClientRect(e.target)
            //setPosition({ x: left, y: bottom })
        }
    }

    const handleInsertEmoticonEvent = (e) => {
        const emoticon = e.detail
        const selection = windowObject.getSelection()
        const range = selection.getRangeAt(0)
        range.deleteContents()
        const node = documentObject.createTextNode(emoticon)
        range.insertNode(node)
        for (let position = 0; position != emoticon.length - 1; position++) {
            selection.modify('move', 'right', 'character')
        }
    }

    const handleNodeEvent = (e) => {
        const node = e.detail

        const selection = documentObject.getSelection()
        const range = documentObject.getSelection().getRangeAt(0)
        const { startContainer, endContainer, startOffset, endOffset } = range
        const isText = startContainer.nodeType == Node.TEXT_NODE
        const useList = node == 'ul' || node == 'ol'

        if (useList) {
            const list = documentObject.createElement(node)
            const item = documentObject.createElement('li')
            const contents = range.cloneContents()

            item.append(contents)
            list.append(item)

            range.deleteContents()
            range.insertNode(list)
            selection.removeAllRanges()
        } else {
            const el = documentObject.createElement(node)
            range.surroundContents(el)
            selection.removeAllRanges()
        }
    }

    const handleOnEnterEvent = (e) => {
        if (props.id == e.detail.id) {
            onEnter(editorRef.current.innerHTML)
            if (!dontClearOnSubmit) {
                editorRef.current.innerHTML = ''
                setHtml('')
                setText('')
                updateTimestamp()
            }
            focus()
        }
    }

    useRichInputEvent('emoticon', handleInsertEmoticonEvent)
    useRichInputEvent('node', handleNodeEvent)
    useRichInputEvent('onenter', handleOnEnterEvent)

    useEffect(() => {
        focus()
        setEndOfContenteditable(editorRef.current)
    }, [])

    useEffect(() => {
        updateTimestamp()
    }, [html])

    return (
        <div
            {...rest}
            className={className}>
            {empty && <div className="f-rich-input__placeholder">{placeholder}</div>}

            <div
                id={id}
                tabIndex={0}
                ref={mergeRefs([editorRef, ref])}
                className="f-rich-input__input"
                contentEditable
                suppressContentEditableWarning
                spellCheck={false}
                dangerouslySetInnerHTML={{ __html: html }}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                onMouseDown={handleMouseDown}
                onFocus={handleFocus}
                onInput={handleInput}
                onPaste={handlePaste}
                onBlur={handleBlur}
            />

            {menuOpen && (
                <OptionsMenu
                    position={position}
                    index={index}
                    options={filteredOptions}
                    onSelect={insertEntity}
                />
            )}
        </div>
    )
})
