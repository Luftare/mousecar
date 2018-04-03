const path = require("path");

module.exports = options => {
  return {
    entry: './src/index.js',
    watch: true,
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js',
    },
  }
}
