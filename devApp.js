
const nodemon = require('nodemon');


nodemon({
    script: 'app.js',
    ext: 'js'
});

nodemon.on("restart", () => {
    console.log("Server restart.");
});

