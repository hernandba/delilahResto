require('dotenv').config();
const port = process.env.PORT;
const express = require('express');
const app = express();
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');

/* --------------------------- GLOBAL MIDDLEWARES --------------------------- */
app.use(express.json());
app.use(compression(), helmet(), cors());

const only_admin = (req, res, next) => {
  //Validation
  if (true) {
    next();
  } else {
    res.status(400).send('Invalid Request: No Admin')
  }
}

/* --------------------------------- ROUTERS -------------------------------- */
// const r_usuarios = require('../routes/r_usuarios.js');
// app.use('/usuarios', r_usuarios);

/* --------------------------------- ROUTE / -------------------------------- */
app.post('/', (req, res) => {
  //Identificar y hacer login
});

/* ----------------------------- ROUTE /users ----------------------------- */
app.post('/users', (req, res) => {
  //Registrar nuevo usuario
});

app.get('/users/:id/favs', (req, res) => {
  //Obtener los favoritos de un determinado usuario
})

/* ------------------------------ ROUTE /orders ----------------------------- */
app.get('/orders', only_admin, (req, res) => {
  //Se muestran todos los pedidos
});

app.get('/orders/:id', (req, res) => {
  //Obtener informacion de determinado pedido
});

app.post('/orders', (req, res) => {
  //Crear un nuevo pedido
});

app.put('/orders/:id', only_admin, (req, res) => {
  //Actualizar un pedido
});


/* ----------------------------- RUTA /productos ---------------------------- */
app.get('/products', (req, res) => {
  res.send('Se listan todos los productos');
});

app.post('/products', only_admin, (req, res) => {
  res.send('Se crea un nuevo plato');
});

app.use((err, req, res, next) => {
  if (err) res.status(500).send(err);
  next();
});

app.use((req, res) => {
  res.status(404).send({error: 'Endpoint not found'});
});

app.listen(port, err => {
  if (err) console.log(err);
  console.log('Server listening on PORT', port);
});