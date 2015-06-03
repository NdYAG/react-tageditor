module.exports = {
    entry: "./src/TagEditor.js",
    output: {
        path: __dirname,
        filename: "./dist/TagEditor.js"
    },
    module: {
        loaders: [
            {
                loader: "expose?TagEditor"
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel"
            }
        ]
    },
    externals: {
        "react": "React"
    }
}
