const merge = require('webpack-merge');
const dev = require('./webpack.prod.js');
const nodeExternals = require('webpack-node-externals');

module.exports = merge(dev, {
  devtool: 'inline-source-map',
  externals: [nodeExternals()]
})