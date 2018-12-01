import { KEYS, ERROR } from "./const"
import React, { Component } from "react"
import { connectToStore } from "./connectToStore"
import Tag from "./Tag"

class TagEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editing: null,
            caret: null,
            repeat: null
        }
    }
    handleClick() {
        this.props.store.add('', function(err, newTag, indexOfNewTag) {
            this.setState({
                editing: indexOfNewTag,
                caret: 0
            })
        }.bind(this))
    }
    handleTagSave(tag, text) {
        this.props.store.save(tag, text, function(err) {
            if (!err) {
                this.props.onChange && this.props.onChange(text, this.props.store.output(), 'add')
                return
            }
            switch(err.name) {
                case ERROR.EMPTY:
                    break
                case ERROR.REPEAT:
                    var tagIndex
                    this.props.store.tags.forEach((t, i) => {
                        if (t.text === text) {
                            tagIndex = i
                        }
                    })
                    this.setState({
                        repeat: tagIndex
                    })
                    setTimeout(() => {
                        this.setState({ repeat: null })
                    }, 1500)
                    break
                default:
                    break
            }
            this.props.onError && this.props.onError(err)
            this.handleTagRemove(tag)
        }.bind(this))
        this.setState({
            editing: null,
            caret: null
        })
    }
    handleTagFocus(tag) {
        var tagIndex
        this.props.store.tags.forEach((t, i) => {
            if (tag.id === t.id) {
                tagIndex = i
            }
        })
        if (tagIndex === void 0) { return }
        this.setState({
            editing: tagIndex
        })
    }
    handleTagBlur(tag, caretOnBlur, lastKeyOnBlur) {
        var tags = this.props.store.tags
          , tagIndex

        if (!tags.length) {
            this.handleClick()
            return
        }
        tags.forEach((t, i) => {
            if (t.id === tag.id) {
                tagIndex = i
            }
        })
        if (caretOnBlur === 0) {
            if (tagIndex > 0) {
                this.setState({
                    editing: tagIndex - 1,
                    caret: tags[tagIndex - 1].text.length
                })
            } else if (tagIndex === 0) {
                this.setState({
                    editing: 0,
                    caret: 0
                })
            } else {
                // tagIndex === void 0
                // this case happens when
                // press left/right/backspace key on empty tag
                var newState = {}
                if (lastKeyOnBlur === KEYS.LEFT) {
                    if (this.state.editing - 1 < 0) { return }
                    newState.editing = this.state.editing - 1
                    newState.caret = tags[newState.editing].text.length
                }
                if (lastKeyOnBlur === KEYS.RIGHT) {
                    newState.editing = this.state.editing
                    newState.caret = 0
                }
                this.setState(newState)
            }
        }
        if (caretOnBlur > 0) {
            if (tagIndex < tags.length - 1) {
                this.setState({
                    editing: tagIndex + 1,
                    caret: 0
                })
            } else if (tagIndex === tags.length - 1) {
                this.setState({
                    editing: tags.length - 1,
                    caret: tags[tags.length - 1].text.length
                })
            }
        }
    }
    handleTagRemove(tag) {
        var tagText = tag.text
        this.props.store.remove(tag)
        tagText.length && this.props.onChange && this.props.onChange(tagText, this.props.store.output(), 'remove')
    }
    handleTagSplit(tag, textBeforeCaret, textAfterCaret) {
        this.props.store.insertAfterTag(tag, textAfterCaret, function(err, newTag, indexOfNewTag) {
            this.setState({
                editing: indexOfNewTag,
                caret: 0
            })
        }.bind(this))
    }
    render() {
        var store = this.props.store
        if (!store) {
            return <div />
        }

        var tags = this.props.store.tags
        var tagNodes = tags.map((tag, i) => {
            return (
                <Tag
                    active={this.state.editing === i? true: false}
                    error={this.state.repeat === i? true: false}
                    caret={this.state.editing === i? this.state.caret: null}
                    onSave={this.handleTagSave.bind(this, tag)}
                    onFocus={this.handleTagFocus.bind(this, tag)}
                    onBlur={this.handleTagBlur.bind(this, tag)}
                    onRemove={this.handleTagRemove.bind(this, tag)}
                    onSplit={this.handleTagSplit.bind(this, tag)}
                    delimiterKeys={this.props.delimiters.filter( d => { return typeof d === 'number'} )}
                    delimiterChars={this.props.delimiters.filter( d=> { return typeof d === 'string'} )}
                    key={tag.id}>
                    {tag.text}
                </Tag>
            )
        })
        if (!tags.length) {
            tagNodes = <div className="tag-editor-placeholder">{this.props.placeholder}</div>
        }
        return (
            <div className={"tag-editor" + (typeof this.state.editing === 'number'? " is-active": "")} onClick={this.handleClick.bind(this)}>
                {tagNodes}
            </div>
        )
    }
}

export default connectToStore(TagEditor)
