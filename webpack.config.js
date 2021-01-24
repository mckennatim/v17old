var path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = env =>{
  const{appdir} =env
  return {
    mode:'development',
    entry: path.resolve(__dirname, `./${appdir}/src/index.js`),
    output: {
      filename: '[name].[hash].js',
      path: path.resolve(__dirname, `./${appdir}/dist`),
    },
    module: {
      rules: [
        { test: /\.jsx?$/, 
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              "presets": [
                "@babel/preset-env",
                "@babel/preset-react"
              ]
            },
          }
        },
        { test: /\.html$/, loader: "html-loader" },
        {
          test: /\.css$/,
          use: [
            {loader: 'style-loader'}, 
            {loader: 'css-loader'} 
          ]
        },
        {
          test: /\.(png|jpg|svg)$/,
          loader: 'url-loader'
        }      
      ],
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['*.js', '*.js.map'] 
      }),
      new HtmlWebpackPlugin({
        hash: false,
        template: './src/index.html',
        filename: './index.html',
        title: 'mydogfood'
      })
    ],
    devtool: "source-map",   
  }   
}