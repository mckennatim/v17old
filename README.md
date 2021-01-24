# Creating a common stack
It is January 24, 2021 and I want to write software using react 17, react-router 6-beta and webpack 5. This is a DIY approach to create a common stack, I want to be able to spin up even a tiny test app quickly without waiting for create-react-app every time on my sub $1000, not new, not M1 computer. It turns out that, for short periods, I use a lot of the same node_modules in projects I develop.

Every time I decide to use a bunch of the latest versions of stuff from npm (ie plenty of breaking changes for existing apps), I set up a new stack. To do that I set it up as a subdirectory of the place where I put my front-end react apps ex: `www/react/v17`. I put all the node_modules there. For the most part, apps will look up the directory tree until the find a module they need. From there I create subdirectories for all the apps that will use this `v17` stack. In the following an example app directory `tcard-jobs` is used. Because of the way my mind works, I have to do this in stages. 

## webpack 5 new stack setup
In both `v17` and `v17/tcard-jobs` I initialize npm running `npm init -y` in each. The `package.json` for the `v17` stack will get the list of all the packages the stack is using. All the apps, ex: `tcard-jobs` app, will get their own `package.json` which mostly contains just the scripts to run and build that app. In `t17/package.json` gets these base packages

    npm --save install react react-dom react-dom-router@next

    npm --save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader clean-webpack-plugin eslint eslint-loader eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks file-loader html-loader html-webpack-plugin style-loader url-loader webpack webpack-cli

Also into `react/v17` copy over `.eslintrc.json` and `.gitignore`.  babelrc is kept in the webpack config files as options to babel-loader. 

Each app in the `t17 stack` gets its own package.json. note:
* you have to add the path back to the stack for the webpack binary
* the `dev` script neeeds an `--env appdir=tcard-jobs`
* the `prod` script needs that as well as `--env proddir=jobs`
Now all the apps in the stack can share the same `webpack.config.js` and `webpack.production.config.js`

      {
        "name": "tcard-jobs",
        "version": "1.0.0",
        "description": "",
        "main": "webpack.config.js",
        "scripts": {
          "help": "../node_modules/webpack/bin/webpack.js --help=verbose",
          "dev": "../node_modules/webpack/bin/webpack.js watch --env appdir=tcard-jobs --config ../webpack.config.js",
          "prod": "../node_modules/webpack/bin/webpack.js --env appdir=tcard-jobs --env proddir=jobs --config ../webpack.production.config.js",
          "test": "echo \"Error: no test specified\" && exit 1"
        },
        "author": "Timothy S. McKenna <mckenna.tim@gmail.com>",
        "license": "MIT"
      }

For the webpack config files, you need to pull out the env variables and use them to send you to the right app.

    module.exports=env=>{
      const{appdir,proddir} =env
      return{
        ...
        entry: path.resolve(__dirname, `./${appdir}/src/index.js`),
        ...
        output: {
          filename: '[name].[hash].js',
          path: path.resolve(__dirname, `./${appdir}/${proddir}`),
        },
        
What used to be in babelrc goes with the babel-loader

    ...
    use: {
      loader: 'babel-loader',
      options: {
        "presets": [
          "@babel/preset-env",
          "@babel/preset-react"
        ]
      },
    }
    ...

Otherwise I adapt the rest of webpack.config.js and webpack.production.config.js from files that worked in prior stacks, modifying them until any errors go away. 

### Serving and deploying a stack project
Succesfully setting up the stack means that both development and production builds are working. 

I don't use hot-reload or the webpack-server for that matter as I have a mirror image of my ubuntu nginx server running in Windows System for Linux (wsl) on my laptop.

Deploying a project is easy. Run `npm run prod` and then check if everything is copacetic on the local server. If it is grab the `proddir` of the project and scp it over to the server with a .sh file that runs a command like: 

    scp -r ./cascada2 root@sitebuilt.net:/home/iot/public_html/v3


      
