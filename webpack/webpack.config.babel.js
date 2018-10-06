const webpack = require('webpack');
const path = require('path');
const webpackMerge = require("webpack-merge");

const getStylusLoader = require('./build-utils/get-stylus-loader');

const modeConfig = (env, mode) => require(`./webpack.${mode}.config`)(env);

module.exports = (env) => {
  const { mode } = env;

  const commonConfig = {
    mode,
    entry: {
      app: path.resolve(__dirname, '../client/index.js')
    },
    output: {
      path: path.resolve(__dirname, '../build'),
      filename: '[name].js',
      publicPath: '/'
    },
    resolve: {
      modules: [
        path.resolve(__dirname, '../'),
        'node_modules'
      ]
    },
    module: {
      rules: [
        {
          test: /.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.styl$/,
          use: getStylusLoader(mode),
        }
      ]
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        ...process.env
      }),
    ]
  };

  return webpackMerge(
    commonConfig,
    modeConfig(env, mode)
  );
};
