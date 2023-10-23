// Euan Chree
// 1912490

// Imports
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import config from "./config.js";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import url from 'url';
import path from "path";

// Configs
const portNumber = config.port;
const mongodbUrl = config.mongoUri;

// App
var app = express();

// Configuring which headers to allow
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

// Connecting to database
mongoose.Promise = global.Promise
mongoose.connect(mongodbUrl, {dbName : "users"});

// Error when connecting to the database
mongoose.connection.on("error", err => {
    throw new Error("Unable to conenct to database");
});

// Json parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use routes
app.use(authRoutes);
app.use(userRoutes);

// Authorisation error
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({"error" : err.name + ": " + err.message});
    } else if (err) {
        res.status(400).json({"error" : err.name + ": " + err.message});
        console.log(err);
    }
});

// Error 404 page
app.use(function(req, res, next) {
    res.send("This page does not exist!!");
});

// Listening
app.listen(portNumber, function() {
    console.log("Listening at http://localhost:" + portNumber + "/");
});