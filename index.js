require('dotenv').config()
const mysql = require('mysql2')
const cool = require('cool-ascii-faces')
const express = require('express')
const port = process.env.PORT || 3001
const app = express()

const mysqlConfig = {
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
};

const connection = mysql.createConnection(mysqlConfig);

app.get('/data', (req, res) => {
    connection.query(
        "SELECT * FROM user",
        (error, results, fields) => {
            if (error) console.log(error); 
            res.json(results);
        }
    )
});

app.get('/', (req, res) => {
    res.send(`Hello World`);
})

app.get('/welcome', (req, res) => {
    res.send(`welcome`);
})

app.get('/cool', (req, res) => {
    res.send(cool());
})

app.listen(port, () => {
    console.log(`start listening ${port}`)
})