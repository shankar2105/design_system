const { resolve } = require('path');

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
  devtool: 'cheap-module-eval-source-map',

  entry: [
    './scss/main.scss',
  ],

  output: {
    filename: 'design_system.css',
    path: resolve(__dirname, 'dist'),
    publicPath: '',
  },

  context: resolve(__dirname),

  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'build'),
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path]/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        include: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/vendor/[name].[ext]'
            }
          }
        ]
      },
      { test: /\.eot(\?v=\d+.\d+.\d+)?$/, use: 'file-loader?&name=assets/fonts/[name].[ext]' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: 'url-loader?limit=10000&mimetype=application/font-woff&name=assets/fonts/[name].[ext]' },
      { test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/octet-stream&name=assets/fonts/[name].[ext]' },
    ]
  },

  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CopyWebpackPlugin([{ from: 'scss', to: 'scss' }]),
  ],
};

module.exports = config;
