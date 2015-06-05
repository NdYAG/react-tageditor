var validateTags =  function(currentTag, tags) {
    if (tags.length > 3) {
        var error = new Error('Describe the book in no more than 3 words.')
        error.name = 'ReachLimitError'
        throw error
    }
}
var App = React.createClass({displayName: "App",
getInitialState: function () {
    return {
        tags: ["heart-wrenching", "beautiful", "amazing"],
        error: null
    }
},
handleTagsChange: function (tagsChanged, allTags, action) {
    this.setState({
        tags: allTags,
        error: null
    })
},
handleTagsError: function (error) {
    // bypass the empty error
    if (error.name === 'TagEmptyError') { return }
    this.setState({
        error: error.name + ': ' + error.message
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
            validate: validateTags,
            onChange: this.handleTagsChange,
            onError: this.handleTagsError}),
            React.createElement("div", {className: "output"},
            React.createElement("strong", null,  this.state.error || 'Error message will be shown here.'),
            React.createElement("br", null), React.createElement("br", null),
            "Tags Output: ",  this.state.tags.join(',')
        )
    )
)
}
})
React.render(React.createElement(App, null), document.getElementById('app'))
