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

app.use((req, res) => {
  res.status(404).send({error: 'Endpoint no disponible'});
});

app.listen(port, err => {
  if (err) console.log(err);
  console.log('Server listening on PORT', port);
});