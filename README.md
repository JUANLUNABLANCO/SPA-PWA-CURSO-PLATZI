# curso-webpack-react

<a href="https://gitmoji.dev">
  <img src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square" alt="Gitmoji">
</a>
<br/>

## Instalaciones necesarias y configuración
### Genéricas

console:
``` 
git init
git config --local user.email "desarrolloaplicacionesweb.jmlb@gmail.com"
git config --local user.name "JUANLUNABLANCO"
git branch -M  main
```
En este punto debes crear un repositorio nuevo en github vacío y enlazarlo

console:
<!-- > git remote add origin https://github.com/JUANLUNABLANCO/<tu-repo>.git -->
```
 git remote add origin https://github.com/JUANLUNABLANCO/SPA-PWA-CURSO-PLATZI.git
 git config --list
 git add .
 git commit -m "scaffolding project with webpack"
 git push -u origin main
```

## CONTENIDOS
* [WEBPACK + REACT  TUTORIAL](#LINK1)
* [WEBPACK + VANILLA JS TUTORIAL](#LINK2)


### Un inciso con los eol de git

console:
```
git config --global core.autocrlf true
```


.gitattributes
```
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
```

console:
```
git add --renormalize .

git commit -m "Renormalizing eofile eolines"

git push origin main
```

## antes de nada iremos ala documentación de nuestra API expuesta 

https://rickandmortyapi.com/documentation

```
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
```
### Filter characters
You can also include filters in the URL by including additional query parameters. To start filtering add a ? followed by the query <query>=<value>. If you want to chain several queries in the same call, use & followed by the query.

For example, If you want to check how many alive Ricks exist, just add ?name=rick&status=alive to the URL.

Available parameters:

name: filter by the given name.
status: filter by the given status (alive, dead or unknown).
species: filter by the given species.
type: filter by the given type.
gender: filter by the given gender (female, male, genderless or unknown).

```
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
``` 

PARA SABER MAS VER DOCUMENTACION


## Inicializando proyecto

console:
```
npm init
```

## Instalaciones de babel y webpack

console:
```
npm install @babel/core  babel-loader @babel/preset-env -D

touch .babelrc
```

.babelrc
```
{
  "presets": [
    "@babel/preset-env"
  ]
}
```

console:
```
npm install -D webpack webpack-cli webpack-dev-server  html-webpack-plugin
```

## webpack instalations

 ver archivo de configuración webpack.config.js

```
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
```

## scripts package.json

```
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
```

console:
```
npm install -D rimraf
npm install -D webpack-bundle-analyzer
npm install dotenv-webpack
```

## Archivos del proyecto

Home.js 
```
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
```

Esta es la forma de crear un template con js, porque js con las `` entiende html y lo puede insertar en un elemento de tipo HTML Element, o un webcomponent

para que js entienda html y nos complete y nos reconozca ese html, debemos configurar emmet en el apartado de languages includes y proponer { "javascript": "html" }

Otro archivo importante es el index.js que recogerá el home y renderizará esa view en el main del HTML --> index.html, veámos cómo.


index.js 

```
console.log("Hello world!"); // de momento esto es l oque contendrá
```

y el index.html

index.html
```
    ...
    <main class="Main" id="app">
        <header class="Header" id="header"></header>
        <section>
            <div class="loading"></div>
        </section>
    </main>
    ...
```


routes/index.js
```
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
```

Date cuenta de una cosa:
  1. creas la configuracion del proyecto scaffolding, probar que funciona y tenemos un hello world en consola
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


scripts/create-env.js
```
// **create-env.js**

const fs = require('fs'); // fs = file system

// fs.writeFileSync("path", `argumento a crear`);
fs.writeFileSync("./.env", `API=${process.env.API}\n`);
```


.env
```
API="..."
```

netlify.toml
```
[build]
  publish = "dist"
  command = "npm run build:server"
```

no olvides definir la variable de entorno API, en la configuración de netlify 


<a name="LINK1"></a>
## REACT + WEBPACK TUTORIAL

// WARNING si no usas react solo vanilla js pincha en el enlace
[WEBPACK + VANILLA JS TUTORIAL](#LINK2)

## Plugins y loaders para react con webpack

> npm install -D html-loader html-webpack-plugin

configurar el webpack

webpack.config.dev.js
```
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
```

## CSS para el proyecto

> npm install -D mini-css-extract-plugin css-loader style-loader sass sass-loader


## optimización en producción

> npm install -D css-minimizer-webpack-plugin terser-webpack-plugin dotenv-webpack

Ver los archivos: webpack.config.dev.js && webpack.config.prod.js

así como el package.json


## Github y Travis (automatizando scripts)

### Github token access key

generas una access key in git hub (new personal access token)
selecciona opción repo y repo hook
generar llave y guaradar en el .env

.env
```
API= "..."
GITHUB_TOKEN_ACCESS = "d3easasatss5raeadasaeawa3a4a45252w2fwfw2f"  // por ejemplo
```



### Travis darse de alta 

1. darse de alta y vincular con github.
2. sync account para que pueda reconocer el ultimo proyecto que subiste de git hub
3. settings
  GITHUB_TOKEN_ACCESS = ...

4. creamos el archivo .travis.yml

.travis.yml 
```
language: node_js
cache: 
  directories:
    - ~/.npm
node_js:
  - '12'
git:
  depth: 3
script:
  - yarn build
deploy:
  provider: pages
  edge: true
  skip-cleanup: true  
  keep-history: true
  github-tokrn: $GITHUB_TOKEN_ACCESS
  local-dir: dist/
  target-branch: gh-pages
  commit_message: "Deply Release"
  on:
    branch: main
```

fichero de travis que prepara a través de este yml el repo de travis y de github para deploiments automáticos


## generar el trigger y mandar a produccion el proyecto

desde travis, una vez runnning this trigger se genera una nueva rama en el proyecto llamada gh-pages que te devuelve a través de github una github pages, con un nombre de dominio y listo servida en github-pages

me gusta más netlify






<a name="LINK2"></a>
## TUTORIAL WEBPACK + JS COMPLETO Y SENCILLO

https://github.com/forkrintt/vanilla-js-boilerplate


# Webpack 4 Boilerplate

## Table of Contents

- [Table of Contents](#table-of-contents)
- [TL;DR](#tldr)
- [Getting Started](#getting-started)
- [Support ES6 and Beyond](#support-es6-and-beyond)
- [Auto Inject bundle to HTML](#auto-inject-your-bundle-javascript-code-to-html)
- [Add CSS configuration](#support-css)
- [Add SASS/SCSS configuration](#support-sassscss)
- [Add PostCSS/Autoprefixer](#add-postcssautoprefixer)
- [Caching and Hashing](#caching-and-hashingremoved)
- [Clean up before build](#keep-clean-and-fresh)
- [Add images configuration](#support-images-file)
- [Add html configuration for Images references](#support-html-images-references)
- [Full Code webpack.config.js](#wrap-it-up)
- [Optimization for Production](#optimization-for-production)
- [Full code webpack config Production](#wrap-it-up-dev-prod)

## TL;DR

If you only want to use this webpack 4 configuration and dont want to know how to implement it, well just clone this repo and start develop.

1. `git clone https://github.com/finmavis/webpack-4-boilerplate.git`
2. Navigate to folder you just clone
3. Install all Dependencies, `yarn` or `npm install`
4. Then for development just run the script `yarn start` or `npm run start`
5. To build for production just run the script `yarn build` or `npm run build`, it will generate folder `build`.

## Getting Started

- initial your project with `npm init` or `yarn init`
- Create `config` and `src` folder
- Create `webpack.config.js` inside `config` folder
- Create `index.html` and `index.js` inside `src` folder

  Folder structure

  ```
  |-- config
      |-- webpack.config.js
  |-- src
      |-- index.html
      |-- index.js
  |-- package.json
  ```

- Install `webpack webpack-cli webpack-dev-server` as Development Dependencies

  If you're using **yarn**

  ```
  yarn add --dev webpack webpack-cli webpack-dev-server
  ```

  If you're using **npm**

  ```
  npm install --save-dev webpack webpack-cli webpack-dev-server
  ```

- Open `src/index.html` and add code below :

  ```
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title>Webpack 4 Boilerplate</title>
  </head>
  <body>
    <h1>Webpack 4 boilerplate</h1>
  </body>
  </html>
  ```

- Open `src/index.js` and add code below :

  ```
  const hello = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve("Hello World"), 2000);
    });
  }

  hello()
    .then(value => console.log(value));
  ```

## Support ES6 and Beyond

- Install `@babel/core @babel/preset-env babel-loader` as Development Dependencies

  If you're using **yarn**

  ```
  yarn add --dev @babel/core @babel/preset-env babel-loader
  ```

  If you're using **npm**

  ```
  npm install --save-dev @babel/core @babel/preset-env babel-loader
  ```

- Install `@babel/polyfill core-js@3` as dependencies

  If you're using **yarn**

  ```
  yarn add @babel/polyfill core-js@3
  ```

  If you're using **npm**

  ```
  npm install --save @babel/polyfill core-js@3
  ```

  **Notes** : These are the packages we will be using :

  - `@babel/core` <br>
    This package, as the name would suggest, is the core package. The package is responsible for compiling javascript code and outputting usable code. By default it uses your local configuration, but we will get into that later on.

  - `@babel/preset-env` <br>
    Knowing what browser supports what javascript feature is essential in transforming your code. Here is where preset-env comes in. It handles what transforms should be applied, based on your own input. You tell Babel: “I need support for these browsers” and it will transform your javascript so it will work on the list you provide.

  - `@babel/polyfill` <br>
    Sometimes the browsers you want to support need a little extra help for certain features. @babel/polyfill will provide polyfills for those featured, based on what browsers you wish to support.

  - `babel-loader` <br>
    Since we will be using Webpack, this package allows us to transpile our code using Babel and Webpack.

  - `core-js@3` <br>
    It is a polyfill of the JavaScript standard library, which supports: The latest ECMAScript standard.

- Create file `.babelrc` and fill it with :

  ```
  {
    "presets": [
  	  ["@babel/preset-env", {
        "useBuiltIns": "usage",
  	    "debug": true,
        "corejs": 3
  	  }]
  	]
  }
  ```

- Then add your target browser you want to support in `package.json`. <br>
  Note: you can check browserlist [Here](https://browserl.ist/) <br>
  In this case we will use this configuration :

  ```
  "browserslist": [
    "> 1%",
    "not ie <= 9",
    "last 2 versions"
  ]
  ```

- Let's use babel with webpack, create `webpack.config.js` file inside `config` folder, and code inside file is

  ```
  const path = require("path");

  module.exports = {
    entry: {
      main: './src/index.js'
    },
    output: {
      path: path.join(__dirname, '../build'),
      filename: '[name].bundle.js'
    },
    mode: 'development',
    devServer: {
      contentBase: path.join(__dirname, '../build'),
      compress: true,
      port: 3000,
      overlay: true,
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    },
  };
  ```

- Add `Lazy Load` feature

  - Install `@babel/plugin-syntax-dynamic-import` as development dependencies
  - Update .babelrc

    ```
    {
      "presets": [
        [
          "@babel/preset-env",
          {
            "useBuiltIns": "usage",
            "debug": true,
            "corejs": 3
          }
        ]
      ],
      "plugins": ["@babel/plugin-syntax-dynamic-import"]
    }
    ```

  - Now you can start using lazy load module. For Example :

    ```
    /**
    * lazy-load-example.js
    */
    export const lazyLoad = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve("Hello from lazy load!"), 1000);
      });
    }

    /**
    * index.js
    */
    async function lazyLoadExample() {
      const { lazyLoad } = await import('./scripts/lazy-load-example');
      lazyLoad().then(res => console.log(res));
    };

    document.querySelector("#lazy-load").addEventListener('click', lazyLoadExample);
    ```

## Auto Inject your bundle javascript code to HTML

- Install `html-webpack-plugin` as Development Dependencies

  If you're using **yarn**

  ```
  yarn add --dev html-webpack-plugin
  ```

  If you're using **npm**

  ```
  npm install --save-dev html-webpack-plugin
  ```

  **Notes** : These are the packages we will be using :

  - `html-webpack-plugin` <br>
    This is a webpack plugin that simplifies creation of HTML files to serve your webpack bundles. This is especially useful for webpack bundles that include a hash in the filename which changes every compilation.

- Open `config/webpack.config.js` and add code below :

  ```
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    // ... others configuration,
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html'
      })
    ]
  }
  ```

- Open `package.json` and add script for webpack to compile

  ```
  "scripts": {
    "start": "webpack-dev-server --open --config=config/webpack.config.js"
  },
  ```

- Now you can start your `development` by running `npm run start` or `yarn start`.

## Support CSS

- Install `style-loader css-loader` as Development Dependencies

  If you're using **yarn**

  ```
  yarn add --dev style-loader css-loader
  ```

  If you're using **npm**

  ```
  npm install --save-dev style-loader css-loader
  ```

  **Notes** : These are the packages we will be using :

  - `style-loader` <br>
    This package will Adds CSS to the DOM by injecting a `<style>` tag

  - `css-loader` <br>
    This package will interprets @import and url() like import/require() and will resolve them.

- Open `config/webpack.config.js` and add to module.rules :

  ```
  module.exports = {
    // ... others configuration
    module: {
      rules: [
        // ... others module rules configuration
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        }
      ]
    },
  }
  ```

## Support SASS/SCSS

- Install `node-sass sass-loader` as Development Dependencies

  If you're using **yarn**

  ```
  yarn add --dev node-sass sass-loader
  ```

  If you're using **npm**

  ```
  npm install --save-dev node-sass sass-loader
  ```

  **Notes** : These are the packages we will be using :

  - `node-sass` <br>
    Node-sass is a library that provides binding for Node.js to LibSass, the C version of the popular stylesheet preprocessor, Sass. It allows you to natively compile .scss/.sass files to css at incredible speed and automatically via a connect middleware.

  - `sass-loader` <br>
    Loads a Sass/SCSS file and compiles it to CSS for webpack.

- Open `config/webpack.config.js` and change a little bit css module like this

  ```
  module.exports = {
    // ... others configuration
    module: {
      rules: [
        // ... others module rules configuration
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    },
  }
  ```

## Add PostCSS/Autoprefixer

- Install `postcss-loader postcss-preset-env cssnano` as Development Dependencies

  If you're using **yarn**

  ```
  yarn add --dev postcss-loader postcss-preset-env cssnano
  ```

  If you're using **npm**

  ```
  npm install --save-dev postcss-loader postcss-preset-env cssnano
  ```

  **Notes** : These are the packages we will be using :

  - `postcss-loader` <br>
    Loader for webpack to process CSS with PostCSS

  - `postcss-preset-env` <br>
    PostCSS Preset Env lets you convert modern CSS into something most browsers can understand, determining the polyfills you need based on your targeted browsers or runtime environments, using [cssdb](https://cssdb.org/). Also you can check [Can I Use](https://caniuse.com) for browserlist.

  - `css-nano` <br>
    cssnano takes your nicely formatted CSS and runs it through many focused optimisations, to ensure that the final result is as small as possible for a production environment.

- create `postcss.config.js` for PostCSS Config

  ```
  module.exports = {
    plugins: [
      require('postcss-preset-env')(),
      require('cssnano')(),
    ]
  }
  ```

- Add `postcss` to your `css`, `sass` and `scss` loader

  ```
  module.exports = {
    // ... others configuration
    module: {
      rules: [
        // ... others module rules configuration
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
      ]
    },
  }
  ```

## Keep Clean and Fresh

- Install `clean-webpack-plugin` as Development Dependencies

  If you're using **yarn**

  ```
  yarn add --dev clean-webpack-plugin
  ```

  If you're using **npm**

  ```
  npm install --save-dev clean-webpack-plugin
  ```

  **Notes** : These are the packages we will be using :

  - `clean-webpack-plugin` <br>
    A webpack plugin to remove your build folder(s) before building

- Open `config/webpack.config.js` and add code below :

  ```
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');

  module.exports = {
    // ... others configuration
    plugins: [
      // ... others plugins configuration
      new CleanWebpackPlugin(),
    ]
  }
  ```

## Support images file

- Install `file-loader` as development dependencies

  If you're using **yarn**

  ```
  yarn add --dev file-loader
  ```

  If you're using **npm**

  ```
  npm install --save-dev file-loader
  ```

  **Notes** : These are the packages we will be using :

  - `file-loader` <br>
    The file-loader resolves import/require() on a file into a url and emits the file into the output directory.

- Open `config/webpack.config.js` and add Add new rules webpack to handle images files

  ```
  module.exports = {
    // ... others configuration
    module: {
      rules: [
        // ... others rules configuration
        {
          test: /\.(png|svg|jpe?g|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'assets/',
              },
            },
          ],
        },
      ]
    }
  }
  ```

## Support HTML Images references

- Install `html-loader` as development dependencies

  If you're using **yarn**

  ```
  yarn add --dev html-loader
  ```

  If you're using **npm**

  ```
  npm install --save-dev html-loader
  ```

  **Notes** : These are the packages we will be using :

  - `html-loader` <br>
    Exports HTML as string. HTML is minimized when the compiler demands. By default every local `<img src="image.png">` is required `require('./image.png')`, and this loader will resolve it.

- Open `config/webpack.config.js` and Add new rules webpack to handle html files

  ```
  module.exports = {
    // ... others configuration
    module: {
      rules: [
        // ... others rules configuration
        {
          test: /\.html$/,
          use: {
            loader: 'html-loader',
            options: {
              attrs: ['img:src', ':data-src'],
              minimize: true,
            },
          },
        },
      ]
    }
  }
  ```

## Wrap it up

- All code inside `webpack.config.js` :

  ```
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');

  module.exports = {
    entry: {
      main: './src/index.js',
    },
    output: {
      path: path.join(__dirname, '../build'),
      filename: '[name].bundle.js',
    },
    mode: 'development',
    devServer: {
      contentBase: path.join(__dirname, '../build'),
      compress: true,
      port: 3000,
      overlay: true,
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader', // transpiling our JavaScript files using Babel and webpack
          },
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            'style-loader', // creates style nodes from JS strings
            'css-loader', // translates CSS into CommonJS
            'postcss-loader', // Loader for webpack to process CSS with PostCSS
            'sass-loader', // compiles Sass to CSS, using Node Sass by default
          ],
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/,
          use: [
            {
              loader: 'file-loader', // This will resolves import/require() on a file into a url and emits the file into the output directory.
              options: {
                name: '[name].[ext]',
                outputPath: 'assets/',
              },
            },
          ],
        },
        {
          test: /\.html\$/,
          use: {
            loader: 'html-loader',
            options: {
              attrs: ['img:src', ':data-src'],
              minimize: true,
            },
          },
        },
      ],
    },
    plugins: [
      // CleanWebpackPlugin will do some clean up/remove folder before build
      // In this case, this plugin will remove 'dist' and 'build' folder before re-build again
      new CleanWebpackPlugin(),
      // The plugin will generate an HTML5 file for you that includes all your webpack bundles in the body using script tags
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
      }),
    ],
  };
  ```

## Optimization for Production

- Create 2 webpack configuration. You can copy paste from `webpack.config.js`.

  - `config/webpack.dev.js` for Development Mode
  - `config/webpack.prod.js` for Production and optimized

- Delete `webpack.config.js`
- Update package.json `scripts` to :

  ```
  "scripts": {
    "start": "webpack-dev-server --open --config=config/webpack.dev.js",
    "build": "webpack --config=config/webpack.prod.js"
  },
  ```

- Update webpack config for production `config/webpack.prod.js`.

  - Update `output` filename to

    ```
    output: {
      path: path.join(__dirname, '../build'),
      filename: '[name].[chunkhash:8].bundle.js',
      chunkFilename: '[name].[chunkhash:8].chunk.js',
    },
    ```

  - Change `Mode` webpack to production

    ```
    mode: 'production',
    ```

  - Delete `dev-tool` webpack config for Production

  - Delete `devServer` configuration

- Optimize CSS and JS

  - Install `mini-css-extract-plugin terser-webpack-plugin optimize-css-assets-webpack-plugin` as Development Dependencies

    If you're using **yarn**

    ```
    yarn add --dev mini-css-extract-plugin terser-webpack-plugin optimize-css-assets-webpack-plugin
    ```

    If you're using **npm**

    ```
    npm install --save-dev mini-css-extract-plugin terser-webpack-plugin optimize-css-assets-webpack-plugin
    ```

    **Notes** : These are the packages we will be using :

    - `mini-css-extract-plugin` <br>
      This plugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS. It supports On-Demand-Loading of CSS and SourceMaps.

    - `terser-webpack-plugin` <br>
      This plugin will minify ours JavaScript.

    - `optimize-css-assets-webpack-plugin` <br>
      This plugin will search for CSS assets during the Webpack build and will optimize \ minimize the CSS (by default it uses cssnano but a custom CSS processor can be specified).

- Import all packages that we install in `config/webpack.prod.js`

  ```
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');
  const TerserJSPlugin = require('terser-webpack-plugin');
  const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
  ```

- Update `config/webpack.prod.js` for `css`, `sass` and `scss` rules config.

  ```
  module.exports = {
    // ... others configuration
    module: {
      rules: [
        // ... others rules configuration
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader', // translates CSS into CommonJS
            'postcss-loader', // Loader for webpack to process CSS with PostCSS
            'sass-loader', // compiles Sass to CSS, using Node Sass by default
          ],
        },
      ]
    }
  }
  ```

- Update `plugins` config to use `MiniCssExtractPlugin`

  ```
  module.exports = {
    // ... others configuration
    plugins: [
      // ... others plugins configuration
      // This plugin will extract all css to one file
      new MiniCssExtractPlugin({
        filename: "[name].[chunkhash:8].bundle.css",
        chunkFilename: "[name].[chunkhash:8].chunk.css",
      }),
    ]
  }

  ```

- Now use our `css` and `js` optimization

  ```
  module.exports = {
    // ... others configuration
    module: {
      // ... module configuration
    }
    optimization: {
      minimizer: [
        new TerserJSPlugin(),
        new OptimizeCSSAssetsPlugin(),
      ],
    },
    plugins: [
      // ... Plugins configuration
    ]
  }
  ```

- Optimize bundle - Remove unused CSS

  - Install `purgecss-webpack-plugin` as development dependencies
  - Add new import on webpack.prod.js

  ```
  // ... others import
  const PurgecssPlugin = require('purgecss-webpack-plugin');
  const glob = require("glob");

  module.exports = {
    // ... others configuration
    module: {
      rules: [
        // ... others config
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader", // translates CSS into CommonJS
            "postcss-loader", // Loader for webpack to process CSS with PostCSS
            "sass-loader" // compiles Sass to CSS, using Node Sass by default
          ]
        },
      ],
    },
    plugins: [
      // ... others plugin configuration
      new PurgecssPlugin({
        paths: glob.sync(path.resolve(__dirname, '../src/**/*'), { nodir: true })
      }),
    ],
  }
  ```

- Optimize bundle - make our bundle smaller (Smaller = Faster)

  - Update our production config `config/webpack.prod.js`

  ```
  module.exports = {
    // ... others configuration
    module: {
      // ... module configuration
    },
    optimization: {
      minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin()],
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all"
          }
        },
        chunks: "all"
      },
      runtimeChunk: {
        name: "runtime"
      }
    },
    // ... others configuration
  }
  ```

- Optimize bundle (Compression using gzip and brotli)

  - Install `compression-webpack-plugin brotli-webpack-plugin` as development dependencies

    If you're using **yarn**

    ```
    yarn add --dev compression-webpack-plugin brotli-webpack-plugin
    ```

    If you're using **npm**

    ```
    npm install --save-dev compression-webpack-plugin brotli-webpack-plugin
    ```

    **Notes** : These are the packages we will be using :

    - `compression-webpack-plugin` <br>
      This plugin will Prepare compressed versions of assets to serve them with Content-Encoding gz.

    - `brotli-webpack-plugin` <br>
      This plugin will Prepare Brotli-compressed versions of assets to serve them with Content-Encoding: br

  - Import all packages that we install

    ```
    const CompressionPlugin = require('compression-webpack-plugin');
    const BrotliPlugin = require('brotli-webpack-plugin');
    ```

  - And at `plugin` configuration use our compression plugin

    ```
    module.exports = {
      // ... others configuration
      plugins: [
        // ... others plugin configuration
        // ComppresionPlugin will Prepare compressed versions of assets to serve them with Content-Encoding.
        // In this case we use gzip
        // But, you can also use the newest algorithm like brotli, and it's supperior than gzip
        new CompressionPlugin({
          algorithm: 'gzip',
        }),
        new BrotliPlugin(),
      ]
    }
    ```

## Wrap it up (Dev Prod)

- `webpack.dev.js`

  ```
  const path = require("path");
  const HtmlWebpackPlugin = require("html-webpack-plugin");
  const { CleanWebpackPlugin } = require("clean-webpack-plugin");

  module.exports = {
    entry: {
      main: "./src/index.js"
    },
    output: {
      path: path.join(__dirname, "../build"),
      filename: "[name].bundle.js"
    },
    mode: "development",
    devServer: {
      contentBase: path.join(__dirname, "../build"),
      compress: true,
      port: 3000,
      overlay: true
    },
    devtool: "cheap-module-eval-source-map",
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader" // transpiling our JavaScript files using Babel and webpack
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            "style-loader", // creates style nodes from JS strings
            "css-loader", // translates CSS into CommonJS
            "postcss-loader", // Loader for webpack to process CSS with PostCSS
            "sass-loader" // compiles Sass to CSS, using Node Sass by default
          ]
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/,
          use: [
            {
              loader: "file-loader", // This will resolves import/require() on a file into a url and emits the file into the output directory.
              options: {
                name: "[name].[ext]",
                outputPath: "assets/"
              }
            }
          ]
        },
        {
          test: /\.html$/,
          use: {
            loader: "html-loader",
            options: {
              attrs: ["img:src", ":data-src"],
              minimize: true
            }
          }
        }
      ]
    },
    plugins: [
      // CleanWebpackPlugin will do some clean up/remove folder before build
      // In this case, this plugin will remove 'dist' and 'build' folder before re-build again
      new CleanWebpackPlugin(),
      // The plugin will generate an HTML5 file for you that includes all your webpack bundles in the body using script tags
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "index.html"
      })
    ]
  };
  ```

- `webpack.prod.js`

  ```
  const path = require('path');
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');
  const CompressionPlugin = require('compression-webpack-plugin');
  const TerserJSPlugin = require('terser-webpack-plugin');
  const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
  const BrotliPlugin = require('brotli-webpack-plugin');
  const PurgecssPlugin = require('purgecss-webpack-plugin');
  const glob = require("glob");

  module.exports = {
    entry: {
      main: './src/index.js',
    },
    output: {
      path: path.join(__dirname, '../build'),
      filename: '[name].[chunkhash:8].bundle.js',
      chunkFilename: '[name].[chunkhash:8].chunk.js',
    },
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader', // transpiling our JavaScript files using Babel and webpack
          },
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader', // translates CSS into CommonJS
            'postcss-loader', // Loader for webpack to process CSS with PostCSS
            'sass-loader', // compiles Sass to CSS, using Node Sass by default
          ],
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/,
          use: [
            {
              loader: 'file-loader', // This will resolves import/require() on a file into a url and emits the file into the output directory.
              options: {
                name: '[name].[ext]',
                outputPath: 'assets/',
              },
            },
          ],
        },
        {
          test: /\.html\$/,
          use: {
            loader: 'html-loader',
            options: {
              attrs: ['img:src', ':data-src'],
              minimize: true,
            },
          },
        },
      ],
    },
    optimization: {
      minimizer: [
        new TerserJSPlugin(),
        new OptimizeCSSAssetsPlugin(),
      ],
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
        chunks: 'all',
      },
      runtimeChunk: {
        name: 'runtime'
      },
    },
    plugins: [
      // CleanWebpackPlugin will do some clean up/remove folder before build
      // In this case, this plugin will remove 'dist' and 'build' folder before re-build again
      new CleanWebpackPlugin(),
      // PurgecssPlugin will remove unused CSS
      new PurgecssPlugin({
        paths: glob.sync(path.resolve(__dirname, '../src/**/*'), { nodir: true })
      }),
      // This plugin will extract all css to one file
      new MiniCssExtractPlugin({
        filename: "[name].[chunkhash:8].bundle.css",
        chunkFilename: "[name].[chunkhash:8].chunk.css",
      }),
      // The plugin will generate an HTML5 file for you that includes all your webpack bundles in the body using script tags
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
      }),
      // ComppresionPlugin will Prepare compressed versions of assets to serve them with Content-Encoding.
      // In this case we use gzip
      // But, you can also use the newest algorithm like brotli, and it's supperior than gzip
      new CompressionPlugin({
        algorithm: 'gzip',
      }),
      new BrotliPlugin(),
    ],
  };
  ```