const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (options) => {
  return {
    entry: './src/index.js',
    watch: false,
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.(png|jp(e*)g|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8000, // Convert images < 8kb to base64 strings
                name: 'images/[hash]-[name].[ext]'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html'
      })
    ]
  };
};
