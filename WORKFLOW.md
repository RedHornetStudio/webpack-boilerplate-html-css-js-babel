# first of all init package.json file which will track all installed packages
npm init

# create .gitignore with following lines:

...
lines which will exclude node.js generated files (you can generate lines following by the link: https://www.toptal.com/developers/gitignore)
...

...
lines which will exclude vscode generated files (you can generate lines following by the link: https://www.toptal.com/developers/gitignore)
...

# create files and folders with following structure:
src
  main
    assets
      js
        index.js // you need to import scss file into js file to bundle it
        // et cetera
      scss
        style.scss
        // et cetera
      img
        asfsd.jpg
        // et cetera
      fonts
        dssdfsd.otf
        // et cetera
    index.html
  about
    assets
      js
        index.js // you need to import scss file into js file to bundle it
        // et cetera
      scss
        style.scss
        // et cetera
      img
        asfsd.jpg
        // et cetera
      fonts
        dssdfsd.otf
        // et cetera
    index.html
  // et cetera

# install following packages
npm install webpack webpack-cli webpack-dev-server html-loader html-webpack-plugin sass-loader node-sass css-loader mini-css-extract-plugin file-loader babel-loader @babel/core @babel/preset-env clean-webpack-plugin --save-dev

# add to package.json new scripts which you will use to start development server or bundle html, scss and js files. For each page create two scripts for example: build-main and start-main, build-about and start-about. To build all pages chain them into one script "build" using && (&& runs scripts sequentially)
"build-main": "webpack --mode production -c ./webpack.config/main.webpack.config.js",
"start-main": "webpack serve --mode development -c ./webpack.config/main.webpack.config.js",
"build-about": "webpack --mode production -c ./webpack.config/about.webpack.config.js",
"start-about": "webpack serve --mode development -c ./webpack.config/about.webpack.config.js",
"build": "npm run build-main && npm run build-about"

# create webpack.config folder with webpack.config.js files for each page for exapmle: webpack.config/main.webpack.config.js and webpack.config/about.webpack.config.js

## main.webpack.config.js example:

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

## about.webpack.config.js example: (change all "about" on your page name)

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/about/assets/js/index.js',
  output: {
    path: path.resolve(__dirname, '../dist/about'),
    filename: 'assets/js/bundle.js',
    publicPath: ''
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../dist/about'),
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
    new CleanWebpackPlugin(), //use lines from main.webpack.config.js if you will have some nested pages in this page
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/about/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/style.css'
    })
  ]
};

# to run development server use following command: (you need to run development server for each page separatly, to stop development server use "ctrl + c")
npm run start-main

# to bundle html, scss and js files use following command:
npm run build