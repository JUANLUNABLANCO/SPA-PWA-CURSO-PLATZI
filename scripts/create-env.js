// **create-env.js**

const fs = require('fs'); // fs = file system

// fs.writeFileSync("path", `argumento a crear`);
fs.writeFileSync("./.env", `ALGO=${process.env.ALGO}\n`);