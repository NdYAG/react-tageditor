import { Component } from "react"
import TagStore from "./TagStore"

export var connectToStore = TagEditor => class extends Component {
    constructor() {
        super()
        this.state = { store: null }
    }
    componentDidMount() {
        var store = new TagStore({
            validate: function(text) {}
        })
        this.props.tags.forEach(tag => {
            store.add(tag)
        })
        this.setState({
            store: store
        })
        store.subscribe(function() {
            this.setState({
                store: store
            })
        }.bind(this))
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
