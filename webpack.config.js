var path = require('path');
const webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: path.join(__dirname, 'frontend', 'kelp.jsx'),
  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  devtool: 'cheap-module-source-map',
  resolve: {
    extensions: ["", ".js", ".jsx" ]
  }
};
