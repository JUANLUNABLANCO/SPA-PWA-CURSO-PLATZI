# Curso de módulos JS

<a href="https://gitmoji.dev">
  <img src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square" alt="Gitmoji">
</a>
<br/>


## CONTENIDOS DE ESTE CURSO
* [INSTALACIONES DE ESTE PROYECTO](#LINK0)
* [INTRODUCCION A LOS MODULOS EN JS](#LINK1)
* [WEBPACK + REACT  TUTORIAL](#LINK2)
* [WEBPACK + VANILLA JS TUTORIAL](#LINK3)

<a name="LINK0"></a>
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

## INTRODUCCION A LOS MODULOS EN JS

### CONTENIDOS DE ESTE CURSO
* [INSTALACIONES DE ESTE PROYECTO](#LINK0)
* [INTRODUCCION A LOS MODULOS EN JS](#LINK1)
* [WEBPACK + REACT  TUTORIAL](#LINK2)
* [WEBPACK + VANILLA JS TUTORIAL](#LINK3)


A medida que nuestra aplicación crece, queremos dividirla en múltiples archivos, llamados “módulos”. Un módulo puede contener una clase o una biblioteca de funciones para un propósito específico.

Durante mucho tiempo, JavaScript existió sin una sintaxis de módulo a nivel de lenguaje. Eso no fue un problema, porque inicialmente los scripts eran pequeños y simples, por lo que no era necesario.

Pero con el tiempo los scripts se volvieron cada vez más complejos, por lo que la comunidad inventó una variedad de formas de organizar el código en módulos, bibliotecas especiales para cargar módulos a pedido.

Para nombrar algunos (por razones históricas):

AMD – uno de los sistemas de módulos más antiguos, implementado inicialmente por la biblioteca require.js.
CommonJS – el sistema de módulos creado para el servidor Node.js.
UMD – un sistema de módulos más, sugerido como universal, compatible con AMD y CommonJS.
Ahora, todo esto se convierte lentamente en una parte de la historia, pero aún podemos encontrarlos en viejos scripts.

El sistema de módulos a nivel de idioma apareció en el estándar en 2015, evolucionó gradualmente desde entonces y ahora es compatible con todos los principales navegadores y en Node.js. Así que estudiaremos los módulos modernos de Javascript de ahora en adelante.

### ¿Qué es un módulo?
Un módulo es solo un archivo. Un script es un módulo. Tan sencillo como eso.

Los módulos pueden cargarse entre sí y usar directivas especiales export e import para intercambiar funcionalidad, llamar a funciones de un módulo de otro:

La palabra clave export etiqueta las variables y funciones que deberían ser accesibles desde fuera del módulo actual.
import permite importar funcionalidades desde otros módulos.
Por ejemplo, si tenemos un archivo sayHi.js que exporta una función:

// 📁 sayHi.js
export function sayHi(user) {
  alert(`Hello, ${user}!`);
}
…Luego, otro archivo puede importarlo y usarlo:

// 📁 main.js
import {sayHi} from './sayHi.js';

alert(sayHi); // function...
sayHi('John'); // Hello, John!
La directiva import carga el módulo por la ruta ./sayHi.js relativo con el archivo actual, y asigna la función exportada sayHi a la variable correspondiente.

Ejecutemos el ejemplo en el navegador.

Como los módulos admiten palabras clave y características especiales, debemos decirle al navegador que un script debe tratarse como un módulo, utilizando el atributo <script type =" module ">.

Asi:

Resultadosay.jsindex.html
<!doctype html>
<script type="module">
  import {sayHi} from './say.js';

  document.body.innerHTML = sayHi('John');
</script>

El navegador busca y evalúa automáticamente el módulo importado (y sus importaciones si es necesario), y luego ejecuta el script.

Los módulos funcionan solo a través de HTTP(s), no localmente
Si intenta abrir una página web localmente a través del protocolo file://, encontrará que las directivas import y export no funcionan. Use un servidor web local, como static-server o use la capacidad de “servidor en vivo” de su editor, como VS Code Live Server Extension para probar los módulos.

### Características del módulo central
¿Qué hay de diferente en los módulos en comparación con los scripts “normales”?

Hay características principales, válidas tanto para el navegador como para JavaScript del lado del servidor.

`Siempre en modo estricto`
Los módulos siempre trabajan en modo estricto. Por ejemplo, asignar a una variable sin declarar nos dará un error.

<script type="module">
  a = 5; // error
</script>

`Alcance a nivel de módulo`
Cada módulo tiene su propio alcance de nivel superior. En otras palabras, las variables y funciones de nivel superior de un módulo no se ven en otros scripts.

En el siguiente ejemplo, se importan dos scripts y hello.js intenta usar la variable user declarada en user.js. Falla, porque es un módulo separado (puedes ver el error en la consola):

hello.js
```
alert(user); // no existe tal variable (cada módulo tiene variables independientes)
```

user.js
```
let user = "John";
```

index.html
<!doctype html>
<script type="module" src="user.js"></script>
<script type="module" src="hello.js"></script>




Los módulos deben hacer export a lo que ellos quieren que esté accesible desde afuera y hacer import de lo que necesiten.

* user.js debe exportar la variable user .
* hello.js debe importarla desde el módulo user.js.
En otra palabras, con módulos usamos import/export en lugar de depender de variables globales.

Esta es la variante correcta:

hello.js
```
import {user} from './user.js';

document.body.innerHTML = user; // John
```

user.js
```
export let user = "John";
```

index.html
```
<!doctype html>
<script type="module" src="hello.js"></script>
```

resultado
```
John
```


document.body.innerHTML = user; // John
En el navegador, hablando de páginas HTML, también existe el alcance independiente de nivel superior para cada <script type="module">:

Aquí hay dos scripts en la misma página, ambos type="module". No ven entre sí sus variables de nivel superior:

<script type="module">
  // La variable sólo es visible en éste script de módulo
  let user = "John";
</script>

<script type="module">
  alert(user); // Error: user no está definido
</script>


`Por favor tome nota:`
En el navegador, podemos hacer que una variable sea global a nivel window si explícitamente la asignamos a la propiedad window, por ejemplo window.user = "John".

Así todos los scripts la verán, con o sin type="module".

Dicho esto, hacer este tipo de variables globales está muy mal visto. Por favor evítalas.

### Un código de módulo se evalúa solo la primera vez cuando se importa
Si el mismo módulo se importa en varios otros módulos, su código se ejecuta solo una vez: en el primer import. Luego, sus exportaciones se otorgan a todos los importadores que siguen.

Eso tiene consecuencias importantes para las que debemos estar prevenidos.

Echemos un vistazo usando ejemplos:

Primero, si ejecutar un código de módulo trae efectos secundarios, como mostrar un mensaje, importarlo varias veces lo activará solo una vez, la primera vez:

// 📁 alert.js
alert("Módulo es evaluado!");
// Importar el mismo módulo desde archivos distintos

// 📁 1.js
import `./alert.js`; // Módulo es evaluado!

// 📁 2.js
import `./alert.js`; // (no muestra nada)
El segundo import no muestra nada, porque el módulo ya fue evaluado.

Existe una regla: el código de módulos del nivel superior debe ser usado para la inicialización y creación de estructuras de datos internas específicas del módulo. Si necesitamos algo que pueda ser llamado varias veces debemos exportarlo como una función, como hicimos con el sayHi de arriba.

Consideremos un ejemplo más avanzado.

Digamos que un módulo exporta un objeto:

// 📁 admin.js
export let admin = {
  name: "John"
};
Si este módulo se importa desde varios archivos, el módulo solo se evalúa la primera vez, se crea el objeto admin y luego se pasa a todos los importadores adicionales.

Todos los importadores obtienen exactamente el único objeto admin:

// 📁 1.js
import {admin} from './admin.js';
admin.name = "Pete";

// 📁 2.js
import {admin} from './admin.js';
alert(admin.name); // Pete

// Ambos 1.js y 2.js hacen referencia al mismo objeto admin
// Los cambios realizados en 1.js son visibles en 2.js
Como puedes ver, cuando 1.js cambia la propiedad name en el admin importado, entonces 2.js puede ver el nuevo admin.name.

Esto es porque el modulo se ejecuta solo una vez. Los exports son generados y luego compartidos entre importadores, entonces si algo cambia en el objeto admin, otros importadores lo verán.

Tal comportamiento es en verdad muy conveniente, porque nos permite configurar módulos.

En otras palabras, un módulo puede brindar una funcionalidad genérica que necesite ser configurada. Por ejemplo, la autenticación necesita credenciales. Entonces se puede exportar un objeto de configuración esperando que el código externo se lo asigne.

Aquí está el patrón clásico:

Un módulo exporta algún medio de configuración, por ejemplo un objeto configuración.
En el primer import lo inicializamos, escribimos en sus propiedades. Los scripts de la aplicación de nivel superior pueden hacerlo.
Importaciones posteriores usan el módulo.
Por ejemplo, el módulo admin.js puede proporcionar cierta funcionalidad (ej. autenticación), pero espera que las credenciales entren al objeto admin desde afuera:

// 📁 admin.js
export let config = { };

export function sayHi() {
  alert(`Ready to serve, ${config.user}!`);
}
Aquí admin.js exporta el objeto config (inicialmente vacío, pero podemos tener propiedades por defecto también).

Entonces en init.js, el primer script de nuestra app, importamos config de él y establecemos config.user:

// 📁 init.js
import {config} from './admin.js';
config.user = "Pete";
…Ahora el módulo admin.js está configurado.

Importadores posteriores pueden llamarlo, y él muestra correctamente el usuario actual:

// 📁 another.js
import {sayHi} from './admin.js';

sayHi(); // Ready to serve, Pete!


`import.meta`
El objeto import.meta contiene la información sobre el módulo actual.

Su contenido depende del entorno. En el navegador, contiene la URL del script, o la URL de una página web actual si está dentro de HTML:

<script type="module">
  alert(import.meta.url); // script URL
  // para un script inline es la URL de la página HTML actual
</script>

`En un módulo, “this” es indefinido (undefined).`
Esa es una característica menor, pero para completar, debemos mencionarla.

En un módulo, el nivel superior this no está definido.

Compárelo con scripts que no sean módulos, donde this es un objeto global:

<script>
  alert(this); // window
</script>

<script type="module">
  alert(this); // undefined
</script>

### Funciones específicas del navegador
También hay varias diferencias de scripts específicas del navegador con type ="module" en comparación con las normales.

Es posible que desee omitir esta sección por ahora si está leyendo por primera vez o si no usa JavaScript en un navegador.

### Los módulos son diferidos
Los módulos están siempre diferidos, el mismo efecto que el atributo defer (descrito en el capítulo Scripts: async, defer), para ambos scripts externos y en línea.

En otras palabras:

descargar módulos externo <script type="module" src="..."> no bloquea el procesamiento de HTML, se cargan en paralelo con otros recursos.
los módulos esperan hasta que el documento HTML esté completamente listo (incluso si son pequeños y cargan más rápido que HTML), y luego lo ejecuta.
se mantiene el orden relativo de los scripts: los scripts que van primero en el documento, se ejecutan primero.
Como efecto secundario, los módulos siempre “ven” la página HTML completamente cargada, incluidos los elementos HTML debajo de ellos.

Por ejemplo:

<script type="module">
  alert(typeof button); // objeto: el script puede 'ver' el botón de abajo
  // debido que los módulos son diferidos, el script se ejecuta después de que la página entera se haya cargado
</script>

Abajo compare con un script normal:

<script>
  alert(typeof button); // button es indefinido, el script no puede ver los elementos de abajo
  // los scripts normales corren inmediatamente, antes que el resto de la página sea procesada
</script>

<button id="button">Button</button>
Note que: ¡el segundo script se ejecuta antes que el primero! Entonces vemos primero undefined, y después object.

Esto se debe a que los módulos están diferidos, por lo que esperamos a que se procese el documento. El script normal se ejecuta inmediatamente, por lo que vemos su salida primero.

Al usar módulos, debemos tener en cuenta que la página HTML se muestra a medida que se carga, y los módulos JavaScript se ejecutan después de eso, por lo que el usuario puede ver la página antes de que la aplicación JavaScript esté lista. Es posible que algunas funciones aún no funcionen. Deberíamos poner “indicadores de carga”, o asegurarnos de que el visitante no se confunda con eso.

### Async funciona en scripts en línea
Para los scripts que no son módulos, el atributo async solo funciona en scripts externos. Los scripts asíncronos se ejecutan inmediatamente cuando están listos, independientemente de otros scripts o del documento HTML.

Para los scripts de módulo, también funciona en scripts en línea.

Por ejemplo, el siguiente script en línea tiene async, por lo que no espera nada.

Realiza la importación (extrae ./Analytics.js) y se ejecuta cuando está listo, incluso si el documento HTML aún no está terminado o si aún hay otros scripts pendientes.

Eso es bueno para la funcionalidad que no depende de nada, como contadores, anuncios, detectores de eventos a nivel de documento.

<!-- todas las dependencias se extraen (analytics.js), y el script se ejecuta -->
<!-- no espera por el documento u otras etiquetas <script> -->
<script async type="module">
  import {counter} from './analytics.js';

  counter.count();
</script>

### Scripts externos
Los scripts externos que tengan type="module" son diferentes en dos aspectos:

Los scripts externos con el mismo src sólo se ejecutan una vez:

<!-- el script my.js se extrae y ejecuta sólo una vez -->
<script type="module" src="my.js"></script>
<script type="module" src="my.js"></script>
Los scripts externos que se buscan desde otro origen (p.ej. otra sitio web) require encabezados CORS, como se describe en el capítulo Fetch: Cross-Origin Requests. En otras palabras, si un script de módulo es extraído desde otro origen, el servidor remoto debe proporcionar un encabezado Access-Control-Allow-Origin permitiendo la búsqueda.

<!-- otro-sitio-web.com debe proporcionar Access-Control-Allow-Origin -->
<!-- si no, el script no se ejecutará -->
<script type="module" src="http://otro-sitio-web.com/otro.js"></script>
Esto asegura mejor seguridad de forma predeterminada.


### No se permiten módulos sueltos
En el navegador, import debe obtener una URL relativa o absoluta. Los módulos sin ninguna ruta se denominan módulos sueltos. Dichos módulos no están permitidos en import.

Por ejemplo, este import no es válido:

import {sayHi} from 'sayHi'; // Error, módulo suelto
// el módulo debe tener una ruta, por ejemplo './sayHi.js' o dondequiera que el módulo esté
Ciertos entornos, como Node.js o herramientas de paquete permiten módulos simples sin ninguna ruta, ya que tienen sus propias formas de encontrar módulos y hooks para ajustarlos. Pero los navegadores aún no admiten módulos sueltos.

### Compatibilidad, “nomodule”
Los navegadores antiguos no entienden type = "module". Los scripts de un tipo desconocido simplemente se ignoran. Para ellos, es posible proporcionar un respaldo utilizando el atributo nomodule:

<script type="module">
  alert("Ejecuta en navegadores modernos");
</script>

<script nomodule>
  alert("Los navegadores modernos conocen tanto type=module como nomodule, así que omita esto")
  alert("Los navegadores antiguos ignoran la secuencia de comandos con type=module desconocido, pero ejecutan esto.");
</script>


### Herramientas de Ensamblaje
En la vida real, los módulos de navegador rara vez se usan en su forma “pura”. Por lo general, los agrupamos con una herramienta especial como Webpack y los implementamos en el servidor de producción.

Uno de los beneficios de usar empaquetadores – dan más control sobre cómo se resuelven los módulos, permitiendo módulos simples y mucho más, como los módulos CSS/HTML.

Las herramientas de compilación hacen lo siguiente:

Toman un módulo “principal”, el que se pretende colocar en <script type="module"> en HTML.
Analiza sus dependencias: las importa y luego importaciones de importaciones etcétera.
Compila un único archivo con todos los módulos (o múltiples archivos, eso es ajustable), reemplazando los llamados nativos de import con funciones del empaquetador para que funcione. Los módulos de tipo “Especial” como módulos HTML/CSS también son supported.
Durante el proceso, otras transformaciones y optimizaciones se pueden aplicar:
Se elimina código inaccesible.
Se elimina exportaciones sin utilizar (“tree-shaking”).
Sentencias específicas de desarrollo tales como console y debugger se eliminan.
La sintaxis JavaScript moderna puede transformarse en una sintaxis más antigua con una funcionalidad similar utilizando Babel.
El archivo resultante se minimiza. (se eliminan espacios, las variables se reemplazan con nombres cortos, etc).
Si utilizamos herramientas de ensamblaje, entonces, a medida que los scripts se agrupan en un solo archivo (o pocos archivos), las declaraciones import/export dentro de esos scripts se reemplazan por funciones especiales de ensamblaje. Por lo tanto, el script “empaquetado” resultante no contiene ninguna import/export, no requiere type="module", y podemos ponerla en un script normal:

<!-- Asumiendo que obtenemos bundle.js desde una herramienta como Webpack -->
<script src="bundle.js"></script>
Dicho esto, los módulos nativos también se pueden utilizar. Por lo tanto no estaremos utilizando Webpack aquí: tú lo podrás configurar más adelante.

### Resumen
Para resumir, los conceptos centrales son:

Un módulo es un archivo. Para que funcione import/export, los navegadores necesitan <script type="module">. Los módulos tienen varias diferencias:
Diferido por defecto.
Async funciona en scripts en línea.
Para cargar scripts externos de otro origen (dominio/protocolo/puerto), se necesitan encabezados CORS.
Se ignoran los scripts externos duplicados.
Los módulos tienen su propio alcance local de alto nivel y funcionalidad de intercambio a través de ‘import/export’.
Los módulos siempre usan use strict.
El código del módulo se ejecuta solo una vez. Las exportaciones se crean una vez y se comparten entre los importadores.
Cuando usamos módulos, cada módulo implementa la funcionalidad y la exporta. Luego usamos import para importarlo directamente donde sea necesario. El navegador carga y evalúa los scripts automáticamente.

En la producción, las personas a menudo usan paquetes como Webpack para agrupar módulos por rendimiento y otras razones.



<a name="LINK2"></a>

## REACT + WEBPACK TUTORIAL

### CONTENIDOS DE ESTE CURSO
* [INSTALACIONES DE ESTE PROYECTO](#LINK0)
* [INTRODUCCION A LOS MODULOS EN JS](#LINK1)
* [WEBPACK + REACT  TUTORIAL](#LINK2)
* [WEBPACK + VANILLA JS TUTORIAL](#LINK3)

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






<a name="LINK3"></a>

## TUTORIAL WEBPACK + JS COMPLETO Y SENCILLO

https://github.com/forkrintt/vanilla-js-boilerplate

### CONTENIDOS DE ESTE CURSO
* [INSTALACIONES DE ESTE PROYECTO](#LINK0)
* [INTRODUCCION A LOS MODULOS EN JS](#LINK1)
* [WEBPACK + REACT  TUTORIAL](#LINK2)
* [WEBPACK + VANILLA JS TUTORIAL](#LINK3)


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