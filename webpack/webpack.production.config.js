const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = () => ({

  output: {
    path: path.resolve(__dirname, '../build/assets'),
    filename: '[name].[chunkhash].js',
    publicPath: '/assets/'
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: path.resolve(__dirname, '../client/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: "[name]-[contenthash].css",
      chunkFilename: "[id]-[contenthash].css"
    }),
    new UglifyJsPlugin(),
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i
    })
  ]
});
