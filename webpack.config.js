const path = require('path');

const { EnvironmentPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

require('dotenv').config();

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    main: './src/index.jsx',
    choques: './src/choques.jsx',
  },
  mode: isDevelopment ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              presets: ['@babel/env'],
              plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  devServer: {
    port: 3000,
    hot: 'only',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/assets/template.ejs',
      chunks: ['main', 'runtime', 'vendors'],
    }),
    new HtmlWebpackPlugin({
      template: 'src/assets/template.ejs',
      filename: 'choques.html',
      chunks: ['choques', 'runtime', 'vendors'],
    }),
    new EnvironmentPlugin({
      npm_package_version: undefined,
      NODE_ENV: 'development',
      ROLLBAR_ACCESS_TOKEN: undefined,
    }),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
