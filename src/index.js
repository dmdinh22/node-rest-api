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

// createnew user
api.post('/newUser', (req, res, next) => {
    // data from JSON
    var name = req.body.name;
    var emai = req.body.email;
    var password = req.body.password;

    // connect db
    pool.getConnection((err, connection) => {
        if (err) {
            console.log('ERROR connecting to DB: ', config.database);
        }

        // query to insert into db
        var newUserQueryString =
            'INSERT INTO users (name, email, password) VALUES (?,?,?)';

        // db query
        connection.query(
            newUserQueryString,
            [name, email, password],
            (error, results, fields) => {
                if (error) {
                    throw error;
                }

                // return success
                res.json({ msg: 'user added' });
            }
        );
        // disconnect db
        connection.release();
    });
});

// GET
api.get('/getUsers', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log('ERROR connecting to DB: ', config.database);
        }

        // query string for getting users
        var selectQuery = 'SELECT * FROM users';

        // connect to db
        connection.query(selectQuery, (error, results, fields) => {
            if (error) {
                throw error;
            }

            //return users
            res.json(results);
        });
        connection.release();
    });
});

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
