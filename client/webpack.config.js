const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = options => {
  return {
    entry: './src/index.js',
    watch: true,
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html'
      })
    ]
  }
}
