const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV === 'production'
    ? 'production'
    : 'development',

  entry: './src/index.jsx',

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'js/[name].[contenthash].js',
    clean: true,
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]'
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './static/index.html'
    })
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, 'static')
    },
    port: 8601,
    hot: true,
    historyApiFallback: true
  },

  devtool: 'source-map'
};
const path = require('path');

module.exports = {
    mode: 'production',

    entry: './src/index.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'nuclearmod-vm.js',

        library: {
            name: 'NuclearModVM',
            type: 'umd'
        },

        globalObject: 'this'
    },

    target: ['web', 'es2018'],

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    }
};