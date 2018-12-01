module.exports = {
  entry: "./src/TagEditor.js",
  output: {
    path: __dirname,
    filename: "./dist/TagEditor.js",
	  library: "ReactTagEditor",
	  libraryTarget: "umd",
	  umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader"
      }
    ]
  },
  externals: {
    "react": "React"
  }
}
