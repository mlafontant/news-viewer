const path = require('path');
const webpack = require('webpack');

const SRC_DIR = path.join(__dirname, '/src');
const STYLE_DIR = path.join(__dirname, '/styles');
const DIST_DIR = path.join(__dirname, './dist/');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  mode: 'development',
  output: {
    path: DIST_DIR,
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css'],
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015'],
          },
        },
      },
      {
        test: /(.css)$/,
        include: STYLE_DIR,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ],
  },
  // plugins: [
  //   new webpack.DefinePlugin({
  //     'process.env.NODE_ENV': JSON.stringify('production'),
  //   }),
  // ],
};
