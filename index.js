require('dotenv').config()
const rateLimiter = require('express-rate-limit')
const helmet = require('helmet')
const xss = require('xss-clean')
const mysql = require('mysql2')
const cool = require('cool-ascii-faces')
const express = require('express')
const ejs = require('ejs');
const axios = require('axios');
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
app.set('view engine', 'ejs');

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

function generatePassword(length) {
    // Define the set of characters to use in the password
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]<>?/:;|-=";
  
    // Generate a random password using the specified length and set of characters
    let password = "";
    for (let i = 0; i < length; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    return password;
  }

  app.get('/characters', async (req, res) => {
    try {
      // Make a GET request to the Rick and Morty API to retrieve character data
      const response = await axios.get('https://rickandmortyapi.com/api/character');
      const characters = response.data.results;
  
      // Return the character data as a JSON response
      res.json(characters);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving character data from the API');
    }
  });


  app.get('/customers', (req, res) => {
    // Select all rows from the customers table
    const sql = 'SELECT * FROM customers';
    connection.query(sql, (error, results, fields) => {
      if (error) {
        res.status(500).send('Error retrieving customers from database');
      } else {
        res.render('customers.ejs', { customers: results });
        // res.json(results);
      }
    });
  });


app.get('/password', (req, res) => {
    // Generate a random 10-character password
    const password = generatePassword(10);
    
    // Send the password as the response to the client
    res.send(`Your random password is: ${password}`);
  });

app.listen(port, () => {
    console.log(`start listening ${port}`)
})

