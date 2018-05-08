const express = require('express');

const portVal = 9000;

const api = express();
// setting port
api.set('port', portVal);

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
