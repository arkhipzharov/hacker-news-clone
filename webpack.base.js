const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');

module.exports = {
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/main.[hash].js',
  },
  resolve: {
    extensions: ['.vue', '.ts', '.js', '.scss'],
    plugins: [new DirectoryNamedWebpackPlugin(true)],
    alias: {
      vue$: 'vue/dist/vue.common',
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                whitespace: 'condense',
              },
              loaders: {
                ts: 'ts-loader',
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new SpriteLoaderPlugin({
      plainSprite: true,
      spriteAttrs: {
        style: 'display: none;',
      },
    }),
    new VueLoaderPlugin(),
  ],
};
