var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false')),
});

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3013',
    'webpack/hot/only-dev-server',
    path.join(__dirname, 'src/main'),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    devFlagPlugin,
    new ExtractTextPlugin('app.css'),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src'),
      },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader?module!cssnext-loader') },
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: __dirname,
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.json'],
    alias: {
      react: path.join(__dirname, '/node_modules/react'),
    },
    modulesDirectories: [
      'src',
      'node_modules',
    ],
  },
};
