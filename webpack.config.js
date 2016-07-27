var path = require('path');
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
  'process.env':{
    'NODE_ENV': JSON.stringify('production')
  },
  compress:{
    warnings: true
  },
  devtool: 'source-maps',
  resolve: {
    extensions: ["", ".js", ".jsx" ]
  }
};
