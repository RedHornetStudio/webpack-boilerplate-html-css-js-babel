const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/main/assets/js/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'assets/js/bundle.js',
    publicPath: ''
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          attributes: {
            list: [
              // All default supported tags and attributes
              '...',
              {
                tag: 'link',
                attribute: 'href',
                type: 'src',
                filter: (tag, attribute, attributes, resourcePath) => {
                  if (attributes.rel && attributes.rel.trim().toLowerCase() === 'icon') {
                    return true;
                  }
                  return false;
                }
              }
            ]
          }
        }
      },
      {
        test: /\.scss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../../',
            },
          }, 
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        loader: 'file-loader',
        options: {
          name: 'assets/img/[contenthash].[ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        loader: 'file-loader',
        options: {
          name: 'assets/fonts/[contenthash].[ext]'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['./assets', './index.html']
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/main/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/style.css'
    })
  ]
};