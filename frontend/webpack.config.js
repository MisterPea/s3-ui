const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer'),
    },
  },
  entry: {
    main: `${path.resolve(__dirname)}/src/index.js`,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js',
    publicPath: '/',
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
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new DefinePlugin({
      HOSTNAME: process.env.NODE_ENV === 'production' ? JSON.stringify('s3ui.misterpea.me') : JSON.stringify('192.168.1.152:5001'),
      SSL: process.env.PREFIX ? JSON.stringify(process.env.PREFIX) : JSON.stringify('http://'),
      API_ROUTE: process.env.NODE_ENV === 'production' ? JSON.stringify('/api') : JSON.stringify(''),
    }),
  ],
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devServer: {
    historyApiFallback: true,
    host: '192.168.1.152',
  },
};
