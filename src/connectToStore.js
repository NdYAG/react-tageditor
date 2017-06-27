import React, { Component } from "react"
import TagStore from "./TagStore"

export var connectToStore = TagEditor => class extends Component {
    constructor() {
        super()
        this.state = { store: null }
    }
    componentDidMount() {
        var store = new TagStore({
            validate: this.props.validate || function() {}
        })
        this.props.tags.forEach(tag => {
            store.add(tag)
        })
        this.setState({
            store: store
        })
        store.subscribe(() => {
            this.setState({
                store: store
            })
        })
    }
    add(text) {
        var store = this.state.store
          , tagIndex = store.index(text)
        if (tagIndex > -1) {
            store.save(store.tags[tagIndex], text)
        } else {
            store.add(text)
        }
    }
    remove(text) {
        this.state.store.remove(text)
    }
    output() {
        return this.state.store.output()
    }
    render() {
        return <TagEditor {...this.props} store={this.state.store} />
    }
}
