const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function getStylusLoaders(mode) {
  let loaders = ['css-loader', {
    loader: 'postcss-loader',
    options: {
      plugins: () => [
        require('autoprefixer')()
      ],
      sourceMap: true
    }
  }, {
    loader: 'stylus-loader',
    options: {
      import: [
        path.resolve(__dirname, '../../client/global-styles.styl')
      ]
    }
  }];

  if (mode === 'development') {
    return ['style-loader', ...loaders];
  } else {
    return [MiniCssExtractPlugin.loader, ...loaders];
  }
}

module.exports = getStylusLoaders;
