require('dotenv').config();

const PORT = process.env.PORT,
      ADMINKEY = process.env.ADMINKEY;

const express = require('express'),
      app = express();

const compression = require('compression'),
      helmet = require('helmet'),
      cors = require('cors'),
      jwt = require('jsonwebtoken'),
      expressJwt = require('express-jwt');

/* --------------------------- GLOBAL MIDDLEWARES --------------------------- */
app.use(express.json(), compression(), helmet(), cors());

/* ------------------------------ ROUTE /login ------------------------------ */
const login = require('./routes/login')
app.use('/login', login)

/* ------------------------------ ROUTE /users ------------------------------ */
const users = require('./routes/users')
app.use('/users', users)

/* ------------------------------ ROUTE /orders ----------------------------- */
const orders = require('./routes/orders')
app.use('/orders', orders)

/* ----------------------------- RUTA /productos ---------------------------- */
app.get('/products', (req, res) => {
  res.send('Se listan todos los productos');
});

app.post('/products', (req, res) => {
  //ONLY ADMIN
  res.send('Se crea un nuevo plato');
});

//Generic Error
app.use((err, req, res, next) => {
  if (err) res.status(err.status).send(err);
  next();
});

//Endpoint not found error
app.use((req, res) => {
  res.status(404).send({
    error: 'Endpoint not found'
  });
});

//Connection
app.listen(PORT, err => {
  if (err) console.log(err);
  console.log('Server listening on PORT:', PORT);
});