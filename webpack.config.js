const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

const plugins = [
  new MiniCssExtractPlugin({ 
    filename: 'styles/[name].css' 
  }),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, './src/index.html'),
    inject: true,
    filename: path.join(__dirname, './public/index.html')
  })
];

if (devMode) {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = {
  entry: ['./src/js/main.js', './src/css/main.css'],
  output: {
    path: path.resolve(__dirname, 'public/'),
    filename: 'js/bundle.js'
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src/js')
        ],
        exclude: [/node_modules/,  /\.test\.js$/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ["@babel/preset-env", { "targets": "> 0.25%", "useBuiltIns": "usage" }],
            ],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",  
        ],
      },
    ]
  },
  devtool: 'source-map',
  mode: 'development'
};