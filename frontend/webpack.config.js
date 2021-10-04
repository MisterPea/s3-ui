const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { watch } = require('fs');

module.exports = {
  entry: {
    main: path.resolve(__dirname) + '/src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js',
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(js)$/,
        use: 'babel-loader',
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|png)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
  mode: process.env.NODE_ENV == 'production' ? 'production' : 'development',
  // This particular devServer setup works with Docker hot-reload
  // devServer: {
  //   port:8081,
  // host: '0.0.0.0',
  //   disableHostCheck: true,
  // },
  // This particular devServer setup is for standalone
  devServer: {
    historyApiFallback: true,
    inline: true,
    // port: 8080, // removed port for localhost use.
    host: 'localhost'
    // host: '192.168.1.152',
    // host: '192.168.1.145',
  },
};