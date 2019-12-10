const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

module.exports = merge(baseConfig, {
  performance: { hints: false },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
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
        test: /\.(woff|woff2|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              useRelativePath: true,
              outputPath: 'assets/fonts/',
              publicPath: '../../assets/fonts/',
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(jpg|webp)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              context: 'src/',
              name: '[path][name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(mp3|wav)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              context: 'src/',
              name: '[path][name].[ext]',
            },
          },
        ],
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
          {
            loader: 'svgo-loader',
            options: {
              externalConfig: 'svgo.config.yml',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/style.[hash].css',
    }),
    new CleanWebpackPlugin(),
  ],
});
