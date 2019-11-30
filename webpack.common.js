const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/main.[hash].js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.scss'],
    plugins: [
      new DirectoryNamedWebpackPlugin(true),
    ],
    alias: {
      // Для работоспособности v-runtime-template
      vue$: 'vue/dist/vue.common',
      /*
        import '@/path/file.ext';

        вместо import '../../../src/path/file.ext';
      */
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            compilerOptions: {
              /*
                <span>
                  Многострочный текст
                </span>
                =>
                <span> Многострочный текст</span>

                Появлялся нежелательный пробел в начале текста
              */
              whitespace: 'condense',
            },
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new SpriteLoaderPlugin({
      // Упрощенная версия svg спрайта в бандле
      plainSprite: true,
      spriteAttrs: {
        // Svg спрайт занимал много места в макете и ломал его
        style: 'display: none;',
      },
    }),
    new VueLoaderPlugin(),
  ],
};
