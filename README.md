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

## antes de nada iremos ala documentación de nuestra API expuesta 

https://rickandmortyapi.com/documentation

GET https://rickandmortyapi.com/api
{
  "characters": "https://rickandmortyapi.com/api/character",
  "locations": "https://rickandmortyapi.com/api/location",
  "episodes": "https://rickandmortyapi.com/api/episode"
}

GET https://rickandmortyapi.com/api/character
{
  "info": {
    "count": 826,
    "pages": 42,
    "next": "https://rickandmortyapi.com/api/character/?page=2",
    "prev": null
  },
  "results": [
    // ...
  ]
}

GET https://rickandmortyapi.com/api/character/?page=19
{
  "info": {
    "count": 826,
    "pages": 42,
    "next": "https://rickandmortyapi.com/api/character/?page=20",
    "prev": "https://rickandmortyapi.com/api/character/?page=18"
  },
  "results": [
    {
      "id": 361,
      "name": "Toxic Rick",
      "status": "Dead",
      "species": "Humanoid",
      "type": "Rick's Toxic Side",
      "gender": "Male",
      "origin": {
        "name": "Alien Spa",
        "url": "https://rickandmortyapi.com/api/location/64"
      },
      "location": {
        "name": "Earth",
        "url": "https://rickandmortyapi.com/api/location/20"
      },
      "image": "https://rickandmortyapi.com/api/character/avatar/361.jpeg",
      "episode": [
        "https://rickandmortyapi.com/api/episode/27"
      ],
      "url": "https://rickandmortyapi.com/api/character/361",
      "created": "2018-01-10T18:20:41.703Z"
    },
    // ...
  ]
}

GET https://rickandmortyapi.com/api/character/2
{
  "id": 2,
  "name": "Morty Smith",
  "status": "Alive",
  "species": "Human",
  "type": "",
  "gender": "Male",
  "origin": {
    "name": "Earth",
    "url": "https://rickandmortyapi.com/api/location/1"
  },
  "location": {
    "name": "Earth",
    "url": "https://rickandmortyapi.com/api/location/20"
  },
  "image": "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
  "episode": [
    "https://rickandmortyapi.com/api/episode/1",
    "https://rickandmortyapi.com/api/episode/2",
    // ...
  ],
  "url": "https://rickandmortyapi.com/api/character/2",
  "created": "2017-11-04T18:50:21.651Z"
}

### Filter characters
You can also include filters in the URL by including additional query parameters. To start filtering add a ? followed by the query <query>=<value>. If you want to chain several queries in the same call, use & followed by the query.

For example, If you want to check how many alive Ricks exist, just add ?name=rick&status=alive to the URL.

Available parameters:

name: filter by the given name.
status: filter by the given status (alive, dead or unknown).
species: filter by the given species.
type: filter by the given type.
gender: filter by the given gender (female, male, genderless or unknown).

GET https://rickandmortyapi.com/api/character/?name=rick&status=alive
"info": {
    "count": 29,
    "pages": 2,
    "next": "https://rickandmortyapi.com/api/character/?page=2&name=rick&status=alive",
    "prev": null
  },
  "results": [
    {
      "id": 1,
      "name": "Rick Sanchez",
      "status": "Alive",
      "species": "Human",
      "type": "",
      "gender": "Male",
      "origin": {
        "name": "Earth",
        "url": "https://rickandmortyapi.com/api/location/1"
      },
      "location": {
        "name": "Earth",
        "url": "https://rickandmortyapi.com/api/location/20"
      },
      "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      "episode": [
        "https://rickandmortyapi.com/api/episode/1",
        "https://rickandmortyapi.com/api/episode/2",
        //...
      ],
      "url": "https://rickandmortyapi.com/api/character/1",
      "created": "2017-11-04T18:48:46.250Z"
    },
    // ...
  ]
}

--- PARA SABER MAS VER DOCUMENTACION ---


## Inicializando proyecto

> npm init

## Instalaciones de babel y webpack

> npm install @babel/core  babel-loader @babel/preset-env -D

> touch .babelrc
--- .babelrc ---
{
  "presets": [
    "@babel/preset-env"
  ]
}
--- ---

> npm install -D webpack webpack-cli webpack-dev-server  html-webpack-plugin


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


## Archivos del proyecto

--- Home.js ---
const Home = () => {
    const view = `
    <div class="Characters">
      <article class="Charcacter-item">
        <a href="#/1/">
          <img src="image" alt="name">
          <h2>Name</h2>
        </a>
      </article>
    </div>
  `;
    return view;
}
export default Home;
--- ---

Esta es la forma de crear un template con js, porque js con las `` entiende html y lo puede insertar en un elemento de tipo HTML Element, o un webcomponent

para que js entienda html y nos complete y nos reconozca ese html, debemos configurar emmet en el apartado de languages includes y proponer { "javascript": "html" }

Otro archivo importante es el index.js que recogerá el home y renderizará esa view en el main del HTML --> index.html, veámos cómo.


--- index.js ---
console.log("Hello world!"); // de momento esto es l oque contendrá
--- ---

y el index.html

--- index.html ---
...
    <main class="Main" id="app">
        <header class="Header" id="header"></header>
        <section>
            <div class="loading"></div>
        </section>
    </main>
...
--- ---

--- routes/index.js ---
import Header from '../templates/Header';
import Home from '../Pages/Home';
import Character from '../Pages/Character';
import Error404 from '../Pages/Error404';

// Objeto de rutas 
const Routes = {
    '/': Home,
    '/:id': Character,
    '/Contact': 'Contact'
}

const Router = async() => {
    const header = null || document.getElementById('header');
    const content = null || document.getElementById('content');

    header.innerHTML = await Header();
}

Date cuenta de una cosa:
  1. creas la configuracion del proyecto scaffolding, probar que funciona y tenemos un hello world en ocnsola
  2. ahora estructura del src con los elementos básicos
  3. templates staticos sin info real
  4. router 
  5. index.js que llamará al router y hará el render del header tras el window load, en elelemnto header
  6. Manejo de rutas que se renderizarán en content
  7. servicios que obtienen la data

  



## Creación de ficheros necesarios para la subida anetlify

scripts/create-env.js
.env
netlfiy.toml

--- scripts/create-env.js ---
// **create-env.js**

const fs = require('fs'); // fs = file system

// fs.writeFileSync("path", `argumento a crear`);
fs.writeFileSync("./.env", `API=${process.env.API}\n`);
--- ---

--- .env ---
API="..."
--- ---

--- netlify.toml---
[build]
  publish = "dist"
  command = "npm run build:server"
--- ---
no olvides definir la variable de entorno API, en la configuración de netlify 


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

## CSS para el proyecto

> npm install -D mini-css-extract-plugin css-loader style-loader sass sass-loader


## optimización en producción

> npm install -D css-minimizer-webpack-plugin terser-webpack-plugin dotenv-webpack

Ver los archivos: webpack.config.dev.js && webpack.config.prod.js

así como el package.json


