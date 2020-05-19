const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  mode: process.env.NODE_ENV || 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|dist)/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: {
          loader: '@svgr/webpack',
          options: {
            ref: true,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      react: path.resolve(__dirname, 'node_modules', 'react'),
      'react-dom': path.resolve(__dirname, 'node_modules', 'react-dom'),
      components: path.resolve(__dirname, 'src', 'components'),
      layouts: path.resolve(__dirname, 'src', 'layouts'),
      styles: path.resolve(__dirname, 'src', 'styles'),
      shared: path.resolve(__dirname, 'src', 'shared'),
      '~components': path.resolve(__dirname, 'src', 'components'),
      '~hooks': path.resolve(__dirname, 'src', 'hooks'),
      '~styles': path.resolve(__dirname, 'src', 'styles'),
      '~templates': path.resolve(__dirname, 'src', 'templates'),
      '~contexts': path.resolve(__dirname, 'src', 'contexts'),
      '~resources': path.resolve(__dirname, 'src', 'resources'),
      '~connections': path.resolve(__dirname, 'src', 'connections'),
      '~types': path.resolve(__dirname, 'src', 'types'),
      '~api': path.resolve(__dirname, 'src', 'api'),
    },
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MonacoWebpackPlugin({
      languages: ['javascript', 'typescript'],
    }),
  ],
};
