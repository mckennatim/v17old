# Creating a common stack
It is January 24, 2021 and I want to write software using react 17, react-router 6-beta and webpack 5. This is a DIY approach to create a common stack, I want to be able to spin up even a tiny test app quickly without waiting for create-react-app every time on my sub $1000, not new, not M1 computer. It turns out that, for short periods, I use a lot of the same node_modules in projects I develop.

Every time I decide to use a bunch of the latest versions of stuff from npm (ie plenty of breaking changes for existing apps), I set up a new stack. To do that I set it up as a subdirectory of the place where I put my front-end react apps ex: `www/react/v17`. I put all the node_modules there. From there I create subdirectories for all the apps that will use this `v17` stack. In the following an example app directory `tcard-jobs` is used. Because of the way my mind works, I have to do this in stages. Robin Wieruch understands my mind.

https://www.robinwieruch.de/minimal-react-webpack-babel-setup https://www.robinwieruch.de/webpack-babel-setup-tutorial/

## condensed Robin Wieruch
I will modify Robin's great guides for the common stack setup. Quotes are by Robin

### webpack 5 setup version 1
In both `v17` and `v17/tcard-jobs` I initialize npm running `npm init -y` in each. The `package.json` for the `v17` stack will get the list of all the packages the stack is using. All the apps, ex: `tcard-jobs` app, will get their own `package.json which mostly contains just the scripts to run and build that app.

in the stack directory `v17`

    npm install --save-dev webpack webpack-dev-server webpack-cli

in `tcard-jobs` 

    mkdir dist src

Also add this script block to its `tcard-jobs/package.json`. Here is the first tricky part to having a stack that all your apps below it use. You have to add the path back to the stack for the webpack binary, in this case: 

    "scripts": {
      "start": "../node_modules/webpack/bin/webpack.js serve --mode development",
      "test": "echo \"Error: no test specified\" && exit 1"
    },

in `tcard-jobs/dist` put an index.html

    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      <h1>hello webpack</h1>
      <div id="app"></div>
      <script src="./bundle.js"></script>
    </body>
    </html>  


Run `npm start` from `tcard-jobs` and open up localhost:8080/dist and you will see Hello Webpack but console will say it cannot find bundle.js. Let us fix this by adding a `webpack.config.js` file.

#### Adding a common `webpack.config.js` file to the stack
##### modify `package.json` scripts
Change the npm start script, adding a ../ path back to `v17` where the` webpack.config.js` file will live. You also need to tell the config file which app directory the script was being run from so it can assemble the app files from there. To do that we will add `--env appdir=tcard-jobs` to the script. Env is cool, you can have more than one --env and each will be a key/val in the module.exports env

    "start": "../node_modules/webpack/bin/webpack.js serve --env appdir=tcard-jobs --config ../webpack.config.js --mode development",
##### config using env and path
Add a `webpack.config.js` to the stack in `v17`. This webpack.config.js magically serves a bundle.js with the index.html in localhost:8080. No bundle.js is put into ./dist. In order to find the index.js file for `tcard-jobs` you need `path` and a modified function that can find env.appdir.

    /*config using env and path */
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

### webpack 5 setup: serve or watch? version2

`..webpack.js serve` starts a webserver at :8080 but never writes `bundle.js` anywhere. You are not able to go to an apps `/dist` directory and use the nginx webserver in wsl unbuntu to run it any time. Do I really care about live reloading? `..webpack.js watch` does write the file (a big combination of alll files referred to by index.js).

Replacing start script with `dev` and `serve` scripts in `package.json` allows both. The same `webpack.config.js` works for watch and serve and this version tells us to put the `bundle.js` file in `tcard-jobs/dist`.

    "scripts": {
      "help": "../node_modules/webpack/bin/webpack.js --help=verbose",
      "dev": "../node_modules/webpack/bin/webpack.js watch --env appdir=tcard-jobs --config ../webpack.config.js --mode development",
      "serve": "../node_modules/webpack/bin/webpack.js serve --env appdir=tcard-jobs --config ../webpack.config.js --mode development",
      "test": "echo \"Error: no test specified\" && exit 1"
    },

    /*version 2 create a bundle.js using watch or devServer */
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

### webpack 5 with babel
"By using Babel, the latest javascript code which isn't supported yet, will get transpiled back to vanilla JavaScript so that every environment (e.g. browser) can interpret it. In order to get Babel running, you need to install two of its main dependencies" + a Webpack Loader: All this goes in the `v17` software stack

    npm install --save-dev @babel/core @babel/preset-env babel-loader

"You need to tell Webpack on which files to use the babel-loader (e.g. .js files), which folders to exclude from the process (e.g. node_modules)." You do that by adding a module.rules and a reolve block. Options contains the babel configuration directive on which presets to use. The `webpack.config.js` now becomes:    

    /*version 3 using babel transpiler */
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

### webpack 5 with react
"React's syntax -- and its file extension .jsx, aren't natively supported. Babel makes sure to transpile our React code to vanilla JavaScript." Install the npm's in `v17`, modify `webpack.config.js` with|jsx and "@babel/preset-react" and extensions and  modify index.js

    npm install --save-dev @babel/preset-react 
    npm install --save react react-dom  


    /*version 4 adding react support */
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

    /*webpack 5 with react */
    import React from 'react';
    import ReactDOM from 'react-dom';
    import {App} from './components/App.jsx'
    
    const title = 'React with Webpack and Babel';

    console.log('hello webpack dod')
    
    ReactDOM.render(
      <App title={title}/>,
      document.getElementById('app')
    );  

#### hot load server plugin 
The hot-loader adds functionality to `npm run serve`. npm install, modify config to use it. It also needs you to add `module.hot.accept();` to the end of index.js. If you don't want it `run npm run dev` and the extra code will be ignored

    npm install --save-dev react-hot-loader  

    /*version 5 adding hot loader */
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

### Advanced webpack 
Based on https://www.robinwieruch.de/webpack-advanced-setup-tutorial. The HotModuleReplacementPlugin does some cool things. Let's look at the basic default setup. It creates a bundle.js and a default html page.

    npm install --save-dev html-webpack-plugin

    ...
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    ...
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin()
    ], 
    ...   

You can also add page elements but I don't really care about that now. The default operation for HtmlWebpackPlugin creates an index.html file that is generic to the point of pointless.

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      hash: false,
      template: './src/index.html',
      filename: './index.html',
      title: 'mydogfood'
    })
    ], 


A companion is CleanWebpackPlugin "will wipe the content of your dist/ folder before creating the new dist/index.html and dist/bundle.js files from scratch"

    npm install --save-dev clean-webpack-plugin

    const { CleanWebpackPlugin } = require('clean-webpack-plugin');
    ...
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin()
    ],
    ...







    

