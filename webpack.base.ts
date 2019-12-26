import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';
import SpriteLoaderPlugin from 'svg-sprite-loader/plugin';
import DirectoryNamedWebpackPlugin from 'directory-named-webpack-plugin';

const config: webpack.Configuration = {
  entry: './src/main.ts',
  resolve: {
    // import './file-name-without-esxtension'
    extensions: ['.vue', '.js', '.ts', '.scss'],
    // import './folder' intstead of './folder/index.ext'
    plugins: [new DirectoryNamedWebpackPlugin(true)],
    alias: {
      // v-runtime-template package and possibly other vue problems fix
      vue$: 'vue/dist/vue.common',
      // import '@/file' intstead of import '../../../file'
      '@': path.resolve(__dirname, 'src'),
    },
    // for webpack performance
    symlinks: false,
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
              // type checking fix for vue sfc written with typescript
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
                /*
                  <div>
                    text
                  </div>
                  =>
                  <div> text</div>

                  fix for that behaviour
                */
                whitespace: 'condense',
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new SpriteLoaderPlugin({
      // simpler version of svg sprite
      plainSprite: true,
      spriteAttrs: {
        // svg sprite was breaking page layout
        style: 'display: none;',
      },
    }),
    new VueLoaderPlugin(),
  ],
};

export default config;
