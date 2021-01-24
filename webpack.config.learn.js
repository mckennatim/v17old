/*webpack plugins */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
 
module.exports = env =>{
  const{appdir} =env
  console.log('`./${appdir/src/index.js`: ', `./${appdir}/src/index.js`)
  return {
    entry: path.resolve(__dirname, `./${appdir}/src/index.js`),
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
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
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'],
    },
    output: {
      path: path.resolve(__dirname, `./${appdir}/dist`),
      filename: 'bundle.js',
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        hash: false,
        template: './src/index.html',
        filename: './index.html'
      })
    ],
    devServer: {
      index: './index.html',
      contentBase: path.resolve(__dirname, `./${appdir}/dist`),
      hot:true,
      writeToDisk:true,
    },
  }
}


/*version 5 adding hot loader 
const webpack = require('webpack');
const path = require('path');
 
module.exports = env =>{
  const{appdir} =env
  console.log('`./${appdir/src/index.js`: ', `./${appdir}/src/index.js`)
  return {
    entry: path.resolve(__dirname, `./${appdir}/src/index.js`),
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
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
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'],
    },
    output: {
      path: path.resolve(__dirname, `./${appdir}/dist`),
      filename: 'bundle.js',
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    devServer: {
      contentBase: path.resolve(__dirname, `./${appdir}/dist`),
      hot:true
    },
  }
}
*/

/*version 4 adding react support 
const path = require('path');
module.exports = env =>{
  const{appdir} =env
  console.log('`./${appdir/src/index.js`: ', `./${appdir}/src/index.js`)
  return {
    entry: path.resolve(__dirname, `./${appdir}/src/index.js`),
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
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
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'],
    },
    output: {
      path: path.resolve(__dirname, `./${appdir}/dist`),
      filename: 'bundle.js',
    },
    devServer: {
      contentBase: path.resolve(__dirname, `./${appdir}/dist`),
    },
  }
};
*/

/*version 3 using babel transpiler 
const path = require('path');
module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": [
              "@babel/preset-env",
            ]
          },
        }
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
  }
};
*/


/*version 2 create a bundle.js using watch or devServer 
const path = require('path');
module.exports = env =>{
  const{appdir} =env
  console.log('`./${appdir/src/index.js`: ', `./${appdir}/src/index.js`)
  return {
  entry: path.resolve(__dirname, `./${appdir}/src/index.js`),
    output: {
      path: path.resolve(__dirname, `./${appdir}/dist`),
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: './dist'
    }
  }
}
*/

/*config using env and path 
const path = require('path');
module.exports = env =>{
  const{appdir} =env
  console.log('`./${appdir/src/index.js`: ', `./${appdir}/src/index.js`)
  return {
  entry: path.resolve(__dirname, `./${appdir}/src/index.js`),
    output: {
      path: '/dist',
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: './dist'
    }
  }
}
*/