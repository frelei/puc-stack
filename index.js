require('dotenv').config()
const cool = require('cool-ascii-faces')
const express = require('express')
const port = process.env.PORT || 3001
const app = express()

app.get('/', (req, res) => {
    res.send(`Hello World`);
})

app.get('/cool', (req, res) => {
    res.send(cool());
})

app.listen(port, () => {
    console.log(`start listening ${port}`)
})