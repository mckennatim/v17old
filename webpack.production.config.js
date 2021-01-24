var path = require('path');
var webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const outdir = 'cascada2'

module.exports=env=>{
  const{appdir,proddir} =env
  return{
    mode:'production',
    stats: {
      assetsSort: '!size',
      cached: true,
      chunks:true
    },
    entry: path.resolve(__dirname, `./${appdir}/src/index.js`),
    output: {
      filename: '[name].[hash].js',
      path: path.resolve(__dirname, `./${appdir}/${proddir}`),
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
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 8192,
                fallback: 'file-loader'
              }
            }
          ]
        }
      ],
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
         vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true
         }
        }
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['*.js', '*.js.map']  
      }),
      new HtmlWebpackPlugin({
        hash: false,
        template: './src/index.html',
        filename: './index.html'
      }),
    ]
  }
}
