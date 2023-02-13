require('dotenv').config()
const rateLimiter = require('express-rate-limit')
const helmet = require('helmet')
const xss = require('xss-clean')
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

const limiter = rateLimiter.rateLimit({
    windowMs: 60 * 60 * 1000, 
    max: 1000, 
    message: "You have exceeded the 1 request in 24 hours"
})

app.use(limiter)
app.use(xss())
app.use(helmet())
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
    res.send(`<H1>Hello World</H1>`);
})

app.get('/welcome', (req, res) => {
    res.send(req.query.text)
})

app.get('/cool', (req, res) => {
    res.send(cool());
})

app.listen(port, () => {
    console.log(`start listening ${port}`)
})

