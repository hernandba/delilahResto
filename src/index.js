require('dotenv').config();

const PORT = process.env.PORT,
      ADMINKEY = process.env.ADMINKEY;

const express = require('express'),
      app = express();

const compression = require('compression'),
      helmet = require('helmet'),
      cors = require('cors'),
      expressJWT = require('express-jwt');

/* --------------------------- GLOBAL MIDDLEWARES --------------------------- */
app.use(express.json(), compression(), helmet(), cors());
//Global token validation
app.use(expressJWT({ secret: ADMINKEY, algorithms: ['HS256'] }).unless({ path: ["/login", "/users/register"] }));

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
//Endpoint not found error
app.use((req, res) => {
  res.status(404).send({
    status: 'Error',
    message: 'Endpoint not found'
  })
});

// Generic Error (MUST BE LAST)
app.use((err, req, res, next) => {
  if (err) res.status(err.status).send({status: 'Error', message: err});
  // next();
});

/* ------------------------------- CONNECTION ------------------------------- */
app.listen(PORT, err => {
  if (err) console.log(err);
  console.log('Server listening on PORT:', PORT);
});