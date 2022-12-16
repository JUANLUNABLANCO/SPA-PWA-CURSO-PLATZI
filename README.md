# curso-webpack-react

<a href="https://gitmoji.dev">
  <img src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square" alt="Gitmoji">
</a>
<br/>

## Instalaciones necesarias y configuración
### Genéricas
git init
git config --local user.email "desarrolloaplicacionesweb.jmlb@gmail.com"
git config --local user.name "JUANLUNABLANCO"
git branch -M  main

En este punto debes crear un repositorio nuevo en github vacío y enlazarlo

<!-- > git remote add origin https://github.com/JUANLUNABLANCO/<tu-repo>.git -->
git remote add origin https://github.com/JUANLUNABLANCO/SPA-PWA-CURSO-PLATZI.git
> git config --list
git add .
git commit -m "scaffolding project with webpack"
git push -u origin main

### Un incsio con los eol de git

git config --global core.autocrlf true

-- .gitattributes --
* text=auto

# Archivos de soluciones de Visual Studio
*.sln text eol=crlf

# Force batch scripts to always use CRLF line endings so that if a repo is accessed
# in Windows via a file share from Linux, the scripts will work.
*.{cmd,[cC][mM][dD]} text eol=crlf
*.{bat,[bB][aA][tT]} text eol=crlf

# Force bash scripts to always use LF line endings so that if a repo is accessed
# in Unix via a file share from Windows, the scripts will work.
*.sh text eol=lf

###############################
# Git Large File System (LFS) #
###############################

# Archives
*.7z filter=lfs diff=lfs merge=lfs -text
*.br filter=lfs diff=lfs merge=lfs -text
*.gz filter=lfs diff=lfs merge=lfs -text
*.tar filter=lfs diff=lfs merge=lfs -text
*.zip filter=lfs diff=lfs merge=lfs -text

# Documents
*.pdf filter=lfs diff=lfs merge=lfs -text

# Images
*.gif binary
*.ico binary
*.jpg binary
*.png binary
*.pdf filter=lfs diff=lfs merge=lfs -text
*.psd filter=lfs diff=lfs merge=lfs -text
*.webp filter=lfs diff=lfs merge=lfs -text

# Fonts
*.woff2 filter=lfs diff=lfs merge=lfs -text

# Other
*.exe filter=lfs diff=lfs merge=lfs -text
--- ---

> git add --renormalize .

> git commit -m "Renormalizing eofile eolines"

> git push origin main

## Inicializando proyecto

> npm init
### React instalations

> npm install -S react react-dom  // dependencias de produccion

### Otros

> mkdir src
> mkdir -p src/components

crear el archivo App.jsx dentro de components

--- App.jsx ---

  import React from 'react';

  const App = () => <h1>Hello React!</h1>

  export default App;
--- ---
---  index.js ---
  import React from 'react';
  import ReactDOM from 'react-dom';
  import App from './components/App';

  ReactDOM.render(<App />, document.getElementById('app'));
--- ---

render coge un componente creado y lo inserta en el segundo parámetro

--- index.html ---
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>

  <body>
    <div id="app"></div>
  </body>

  </html>
--- ---

Ya tenemos la app

## Instalaciones de babel y webpack

> npm install @babel/core  @babel/preset-env @babel/preset-react babel-loader -D

> touch .babelrc
--- .baberc ---
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ]
}
--- ---

> npm install -D webpack webpack-cli webpack-dev-server

## Frameworks librerias que funcionan con react

https://es.reactjs.org/docs/create-a-new-react-app.html

leer ese artículo del blog, es muy interesante


## webpack instalations

 ver archivo de configuración webpack.config.js

const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js'
    },
    mode: "development",
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }]
    },
    devServer: {
        static: path.join(__dirnam, 'dist'),
        compress: true,
        historyApiFallback: true,
        port: 8080,
        open: true
    }
}


## scripts package.json

"scripts": {
        "clean": "rimraf ./dist",
        "watch": "npm run dev -- --watch",
        "dev": "npm run clean && npx webpack --config webpack.config.dev.js",
        "build": "npm run clean && npx webpack --config webpack.config.prod.js",
        "start:dev": "webpack serve --config webpack.config.dev.js",
        "build:server": "node ./scripts/create-env.js && npx webpack --config webpack.config.prod.js",
        "analyzer:json": "npx webpack --profile --json > stats.json",
        "analyzer:web": "npx webpack-bundle-analyzer stats.json"
    },

> npm install -D rimraf
> npm install -D webpack-bundle-analyzer
> npm install dotenv-webpack

## Creación de ficheros necesarios para la subida anetlify

scripts/create-env.js
.env
netlfiy.toml

--- scripts/create-env.js ---
// **create-env.js**

const fs = require('fs'); // fs = file system

// fs.writeFileSync("path", `argumento a crear`);
fs.writeFileSync("./.env", `ALGO=${process.env.ALGO}\n`);
--- ---

--- .env ---
ALGO=ALGO
--- ---

--- netlify.toml---
[build]
  publish = "dist"
  command = "npm run build:server"
--- ---



## Plugins y loaders para react con webpack

> npm install -D html-loader html-webpack-plugin

configurar el webpack

--- webpack.config.dev.js ---
const path = require('path');
const HtmlWebapckPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js'
    },
    mode: "development",
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                use: [
                    { loader: 'html-loader' }
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebapckPlugin({
            template: './public/index.html',
            filename: './index.html'
        })
    ],
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        historyApiFallback: true,
        port: 8080,
        open: true
    }
}
--- ---

## CSS para el proeycto

> npm install -D mini-css-extract-plugin css-loader style-loader sass sass-loader


## optimización en producción

> npm install -D css-minimizer-webpack-plugin terser-webpack-plugin dotenv-webpack

Ver los archivos: webpack.config.dev.js && webpack.config.prod.js

así como el package.json


