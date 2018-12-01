const path = require('path')
module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname),
    filename: 'index.bundle.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: "babel-loader"
    }]
  }
}
