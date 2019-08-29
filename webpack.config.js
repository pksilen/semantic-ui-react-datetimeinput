const path = require('path');

const config = {
  entry: {
    demo: './demo/demo.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'demo'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', 'jsx'],
  },
  mode: 'development'
};

module.exports = config;
