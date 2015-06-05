var App = React.createClass({displayName: "App",
getInitialState: function () {
    return {
        tags: ["Programming", "JavaScript"]
    }
},
handleTagsChange: function (tagsChanged, allTags, action) {
    this.setState({
        tags: allTags
    })
},
render: function() {
    return (
        React.createElement("div", null,
        React.createElement(TagEditor, {
            ref: "tagEditor",
            tags: this.state.tags,
            delimiters: [13, ','],
            placeholder: "Input tags...",
            onChange: this.handleTagsChange}),
            React.createElement("div", {className: "output"},
            "Tags output: ",  this.state.tags.join(', ')
        )
    )
)
}
})
React.render(React.createElement(App, null), document.getElementById('app'))
