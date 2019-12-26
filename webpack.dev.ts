import webpack from 'webpack';
import merge from 'webpack-merge';
import baseConfig from './webpack.base';

const config: webpack.Configuration = {
  output: {
    // sourcemaps for vue sfc written with typescript
    //
    // https://www.mistergoodcat.com/post/the-joy-that-is-source-maps-with-vuejs-and-typescript
    devtoolModuleFilenameTemplate: (info) => {
      let $filename = `sources://${info.resourcePath}`;
      if (
        info.resourcePath.match(/\.vue$/) &&
        !info.query.match(/type=script/)
      ) {
        $filename = `webpack-generated:///${info.resourcePath}?${info.hash}`;
      }
      return $filename;
    },
    devtoolFallbackModuleFilenameTemplate: 'webpack:///[resource-path]?[hash]',
  },
  devServer: {
    // was showing '[WDS] Live Reloading enabled' after startup
    clientLogLevel: 'none',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              // for scss
              importLoaders: 1,
            },
          },
          'fast-sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                // import content from that files in all vue sfc
                'src/scss/helpers/variables.scss',
                'src/scss/helpers/mixins/*.scss',
              ],
            },
          },
        ],
      },
      {
        test: /\.(jpg|png)$/,
        use: 'file-loader',
      },
      {
        test: /\.(woff|woff2)$/,
        use: 'file-loader',
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
        ],
      },
    ],
  },
};

export default merge(baseConfig, config);
