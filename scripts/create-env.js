// **create-env.js**
const fs = require('fs'); // fs = file system

// debes crear esta variable de entorno en NETLIFY cuando configures el proyecto, con los valores que mantienes en el .env local, el cual no se sube al repo,  está en .gitignores
fs.writeFileSync("./.env", `API=${process.env.API}\n`);