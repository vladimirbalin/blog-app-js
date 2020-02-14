const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');

const isDev = process.env.NODE_ENV === 'development';
const filename = extra => isDev ? `[name].${extra}` : `[name].[hash].${extra}`;


module.exports = {
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HTMLPlugin({
      filename: 'index.html',
      template: './src/index.html',
      minify: {
        collapseWhitespace: !isDev
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(
      {
        filename: filename('css')
      }
    )
  ],
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  resolve: {
    extensions: ['.js']
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    hot: isDev,
    watchContentBase: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node-modules/,
        loader: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use : [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: isDev,
            reloadAll: true
          },
        }, 'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer()
              ],
              sourceMap: true
            }
          },
        ]
      }
    ]
  }
}