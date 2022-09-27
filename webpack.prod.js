const HtmlWebpackPlugin = require('html-webpack-plugin')
const CssExtractPlugin = require('mini-css-extract-plugin')
const { EnvironmentPlugin } = require('webpack')

const { merge } = require('webpack-merge')
const common = require('./webpack.common')
module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      use: [{
        loader: CssExtractPlugin.loader
      }, {
        loader: 'css-loader',
        options: {
          modules: true
        }
      }, {
        loader: 'sass-loader'
      }]
    }]
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        template: './template.prod.html'
      }
    ),
    new EnvironmentPlugin({
      API_URL: 'http://fordevs.herokuapp.com/api'
    }),
    new CssExtractPlugin({
      filename: 'main-bundle[chunkhash].css'
    })
  ]
})
