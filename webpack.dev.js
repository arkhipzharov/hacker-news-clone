const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

module.exports = merge(baseConfig, {
  devServer: {
    clientLogLevel: 'none',
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'fast-sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                './src/scss/helpers/variables.scss',
                './src/scss/helpers/mixins/*.scss',
              ],
            },
          },
        ],
      },
      {
        test: /\.(jpg|webp)$/,
        use: 'file-loader',
      },
      {
        test: /\.(woff|woff2|otf)$/,
        use: 'file-loader',
      },
      {
        test: /\.(mp3|wav)$/,
        use: 'file-loader',
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
            },
          },
        ],
      },
    ],
  },
});
