const express = require('express');
mysql = require('mysql');
bodyParser = require('body-parser');

// DB info
const config = {
    host: 'localhost',
    userName: 'root',
    password: 'Password1',
    database: 'sampleapi'
};

// configure db connection
const pool = mysql.createPool({
    host: config.host,
    userName: config.userName,
    password: config.password,
    database: config.database
});

const portVal = 9000;

const api = express();
// setting port
api.set('port', portVal);

// add support for JSON parsing
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());

// POST

// GET

// GET endpoint to sennd response to web client
api.get('/', (req, res) => {
    res.send('Hello world.');
});

// err handling
api.use((req, res, next) => {
    res.status(404).send('404 route not found.');
});

// listen to port
api.listen(portVal, () => {
    console.log('Port ' + portVal + ' fired up.');
});
