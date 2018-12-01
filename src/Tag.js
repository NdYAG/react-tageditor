import React, { Component } from "react"
import { findDOMNode } from 'react-dom'
import { KEYS } from "./const"
import utils from "./utils"

class Tag extends Component {
    constructor(props) {
        super(props)
        this.inputRef = React.createRef()
    }
    componentDidMount() {
        var node = this.inputRef.current
        if (this.props.active) {
            node.focus()
        } else {
            node.blur()
        }
        utils.autoSize(node)
    }
    componentWillReceiveProps(nextProps) {
        var node = this.inputRef.current
          , tagNode = findDOMNode(this)
          , activityChanged = this.props.active !== nextProps.active

        if (nextProps.active) {
            utils.setCaretPos(node, nextProps.caret)
        } else {
            node.blur()
        }
    }
    handleClick(e) {
        e.stopPropagation()
        if (e.target.tagName === 'A') {
            // click on X to remove
            this.props.onRemove()
        }
    }
    handleFocus() {
        this.props.onFocus()
    }
    handleBlur() {
        var node = this.inputRef.current
        this.props.onSave(node.value)
    }
    handleKeyDown(e) {
        var charCode = utils.getCharcode(e)
        for (var key in KEYS) {
            if (KEYS[key] === charCode) {
                keyHandlers[key].call(this, {
                    originalEvent: e,
                    caret: utils.getCaretPos(this.inputRef.current),
                    node: this.inputRef.current
                })
            }
        }
        if (this.props.delimiterKeys.indexOf(charCode) > -1) {
            e.preventDefault()
            var node = this.inputRef.current
            this.split(node, utils.getCaretPos(node))
        }
    }
    handleChange(e) {
        var tagText = e.target.value
          , node = this.inputRef.current
          , caretPos = utils.getCaretPos(node)
          , lastInput = tagText.charAt(caretPos - 1)
        this.props.delimiterChars.forEach(delimiter =>  {
            if (lastInput === delimiter) {
                this.split(node, caretPos - 1, caretPos)
            }
        })
        utils.autoSize(node)
    }
    split(node) {
        var positions = Array.prototype.slice.call(arguments, 1)
          , tagText = node.value
          , textBeforeCaret = tagText.substring(0, positions[0])
          , textAfterCaret = tagText.substring(positions[1] || positions[0], tagText.length)
        node.value = textBeforeCaret
        node.blur()
        this.props.onSplit(textBeforeCaret, textAfterCaret)
    }
    render() {
        return (
            <div className={"tag" + (this.props.error? " has-error": "")} onClick={this.handleClick.bind(this)}>
                <input
                    type="text"
                    defaultValue={this.props.children.toString()}
                    ref={this.inputRef}
                    onFocus={this.handleFocus.bind(this)}
                    onBlur={this.handleBlur.bind(this)}
                    onKeyDown={this.handleKeyDown.bind(this)}
                    onChange={this.handleChange.bind(this)} />
                <a className="">&times;</a>
            </div>
        )
    }
}

var keyHandlers = {
        LEFT: function(e) {
            if (e.caret === 0) {
                // seems that:
                // if current node do not blur
                // can not set next node to focus
                e.node.blur()
                e.originalEvent.preventDefault()
                this.props.onBlur(e.caret, KEYS.LEFT)
            }
        },
        RIGHT: function(e) {
            if (e.caret === e.node.value.length) {
                e.node.blur()
                e.originalEvent.preventDefault()
                this.props.onBlur(e.caret, KEYS.RIGHT)
            }
        },
        BACKSPACE: function(e) {
            if (e.caret === 0) {
                var node = e.node
                if (node.selectionStart !== node.selectionEnd) { return }
                e.node.blur()
                e.originalEvent.preventDefault()
                this.props.onBlur(e.caret, KEYS.LEFT)
            }
        }
}

export default Tag
