import { Component } from "react"
import { KEYS } from "./const"
import utils from "./utils"

class Tag extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        var node = this.refs.input.getDOMNode()
        if (this.props.active) {
            node.focus()
        } else {
            node.blur()
        }
        utils.autoSize(node)
    }
    componentWillReceiveProps(nextProps) {
        var node = this.refs.input.getDOMNode()
          , tagNode = React.findDOMNode(this)
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
        var node = this.refs.input.getDOMNode()
        this.props.onSave(node.value)
    }
    handleKeyDown(e) {
        var charCode = utils.getCharcode(e)
        for (var key in KEYS) {
            if (KEYS[key] === charCode) {
                keyHandlers[key].call(this, {
                    originalEvent: e,
                    caret: utils.getCaretPos(this.refs.input.getDOMNode()),
                    node: this.refs.input.getDOMNode()
                })
            }
        }
    }
    handleChange(e) {
        var tagText = e.target.value
          , node = this.refs.input.getDOMNode()
          , caretPos = utils.getCaretPos(node)
          , lastInput = tagText.charAt(caretPos - 1)
        this.props.delimiters.split('').forEach(function(delimiter) {
            if (lastInput === delimiter) {
                var textBeforeCaret = tagText.substring(0, caretPos - 1)
                  , textAfterCaret = tagText.substring(caretPos, tagText.length)
                node.value = textBeforeCaret
                node.blur()
                this.props.onSplit(textBeforeCaret, textAfterCaret)
            }
        }, this)
        utils.autoSize(node)
    }
    render() {
        return (
            <div className={"tag" + (this.props.error? " has-error": "")} onClick={this.handleClick.bind(this)}>
                <input
                    type="text"
                    defaultValue={this.props.children.toString()}
                    ref="input"
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
        },
        ENTER: function(e) {
            var tagText = e.node.value
              , textBeforeCaret = tagText.substring(0, e.caret)
              , textAfterCaret = tagText.substring(e.caret, tagText.length)
            e.node.value = textBeforeCaret
            e.node.blur()
            e.originalEvent.preventDefault()
            this.props.onSplit(textBeforeCaret, textAfterCaret)
        }
}

export default Tag
