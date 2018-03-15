const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const common = require('./webpack.common.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = merge(common, {
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new UglifyJSPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ],
      },
      {
        test: /\.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'stylus-loader'
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: ['babel-loader', 'eslint-loader'],
            css: ['vue-style-loader', 'css-loader', 'postcss-loader'],
            stylus: ['vue-style-loader', 'css-loader', 'postcss-loader', 'stylus-loader'],
          },
        },
      },
    ],
  },
  mode: 'production',
})
