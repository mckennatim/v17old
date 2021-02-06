var path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = env =>{
  const{appdir} =env
  return {
    mode:'development',
    entry: path.resolve(__dirname, `./${appdir}/src/index.js`),
    output: {
      filename: '[name].[fullhash].js',
      path: path.resolve(__dirname, `./${appdir}/dist`),
    },
    module: {
      rules: [
        { test: /\.jsx?$/, 
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                "presets": [
                  "@babel/preset-env",
                  "@babel/preset-react",
                ],
                "plugins": ['@babel/plugin-syntax-dynamic-import']
              },
            }
          ]
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
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['*.js', '*.js.map', '*.txt'] 
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: './index.html',
        title: 'mydogfood'
      })
    ],
    devtool: "source-map",   
  }   
}