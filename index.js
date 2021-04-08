require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;

/* --------------------------------- ROUTERS -------------------------------- */
const r_usuarios = require('./routes/r_usuarios.js');
// app.use('/usuarios', r_usuarios);

/* --------------------------- GLOBAL MIDDLEWARES --------------------------- */
app.use(express.json());

const only_admin = (req, res, next) => {
  //Validation
  if(true){
    next();
  }else{
    res.status(400).send('Invalid Request: No Admin')
  }
}

/* ----------------------------- RUTA /usuarios ----------------------------- */
app.get('/users', only_admin, (req, res) => {
  res.send('Se listan todos los usuarios');
});

app.post('/users', (req, res) => {
  res.send('Un nuevo usuario podra registrarse');
});

/* ----------------------------- RUTA /productos ---------------------------- */
app.get('/products', (req, res) => {
  res.send('Se listan todos los productos');
});

app.post('/products', only_admin, (req, res) => {
  res.send('Se crea un nuevo plato');
});

/* ----------------------------- RUTA /pedidos ---------------------------- */
app.get('/orders', only_admin, (req, res) => {
  res.send('Se listan todos los pedidos');
});

app.put('/orders', only_admin, (req, res) => {
  res.send('Actualizar (el estado de) un pedido');
});

app.post('/orders', (req, res) => {
  res.send('Crear un nuevo pedido');
});

app.use((req, res) => {
  res.status(404).send({error: 'Endpoint no disponible'});
});

app.listen(port, err => {
  if (err) console.log(err);
  console.log('Server listening on PORT', port);
});