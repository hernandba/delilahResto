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

/* ----------------------------- ROUTE /products ---------------------------- */
const products = require('./routes/products')
app.use('/products', products)

/* ---------------------------------- ERROR --------------------------------- */
//Generic Error
app.use((err, req, res, next) => {
  if (err) res.status(400).send({status: 'Error', message:'Unexpected Error'});
  next();
});

//Endpoint not found error
app.use((req, res) => {
  res.status(404).send({
    status: 'Error',
    message: 'Endpoint not found'
  })
});

/* ------------------------------- CONNECTION ------------------------------- */
app.listen(PORT, err => {
  if (err) console.log(err);
  console.log('Server listening on PORT:', PORT);
});