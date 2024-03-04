"use strict";

// importing required modules
const express = require("express");
const bodyParser = require("body-parser");

// setting up port number
const port = 4000;

// importing route handlers
const home = require('./routes/home');

// creating express application
let app = express();

// setting view engine to ejs
app.set('view engine', 'ejs')

// middleware for parsing json and url-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend : false}));

// middleware for serving static files (stylesheets, images, etc.)
app.use(express.static(__dirname + '/public/stylesheets'));
app.use(express.static(__dirname + '/public/images'));
app.use(express.static(__dirname + '/public/static'));

// routing for home page
app.use('/', home);

// starting the server
let server = app.listen(port, () => {
    console.log(`Server listetning on ${port}`);
    console.log("Press Ctlr+C to stop server");
});

// setting server timeout to a large value
server.setTimeout(5000000);