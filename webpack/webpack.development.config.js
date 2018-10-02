const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = () => ({
  devtool: 'eval-source-map',

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../client/index.html')
    }),
    // do not emit compiled assets that include errors
    new webpack.NoEmitOnErrorsPlugin()
  ],

  devServer: {
    host: 'localhost',
    port: 3000,

    // respond to 404s with index.html
    historyApiFallback: true,
  }
});
