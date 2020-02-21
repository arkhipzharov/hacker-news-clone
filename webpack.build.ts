import path from 'path';
import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import merge from 'webpack-merge';
import baseConfig from './webpack.base';

const config: webpack.Configuration = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.[hash].js',
  },
  performance: {
    // to not show warnings about too big bundle size
    hints: false,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        // for webpack performance
        cache: true,
        parallel: true,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              // for scss
              importLoaders: 1,
            },
          },
          'postcss-loader',
          'fast-sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                // import content from that files in all vue sfc
                './src/scss/helpers/**/*.scss',
              ],
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              // preserve folder structure in bundle
              useRelativePath: true,
              // webpack build script is not running if path is specified with
              // path.resolve, so it's like this
              outputPath: 'assets/fonts',
              // preserve name in bundle
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(jpg|png)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // inline images if size under 10000 bytes
              limit: 10000,
              // preserve folder structure and name in bundle
              context: path.resolve(__dirname, 'src'),
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
              // put all svg icons in separate file sprite.svg
              extract: true,
            },
          },
          {
            loader: 'svgo-loader',
            options: {
              // doesn't use external config by default
              externalConfig: '.svgo.yml',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // change bundled css filename
      filename: 'style.[hash].css',
    }),
    new CleanWebpackPlugin(),
  ],
};

export default merge(baseConfig, config);
