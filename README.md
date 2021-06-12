# DelilahResto
**Proyecto Delilah Restó**

API para gestión de pedidos de un restaurante. Los clientes pueden registrarse, ver el listado de productos y realizar ordenes. Los administradores pueden recibir pedidos y actualizarlos, crear y modificar productos y gestionar informacion de los usuarios.

## Requisitos

### Instalar NodeJS
  - [Descargar Nodejs](https://nodejs.org/en/download/)

### Instalar XAMPP
  - [Descargar XAMPP](https://www.apachefriends.org/es/download.html)

### Instalar Postman
  - [Descargar Postman](https://www.postman.com/product/api-client/)

## Despliegue
**1) Clonar proyecto**

* Clonar el repositorio desde github accediendo al link: [delilahResto](https://github.com/hernandba/delilahResto)
* Ó desde consola ejecutar:
```
git clone https://github.com/hernandba/delilahResto.git
```

**2) Instalar dependencias**
```
npm install
```

**3) Crear base de datos**
* Abrir XAMPP e iniciar los servicios de **Apache Web Server** y **MySQL Database**
* Para abrir MYSQL presionar el botón **Go to Application** ó acceder a **[phpmyadmin](http://localhost/phpmyadmin/)**.
* Generar la base de datos **delilahresto**, dentro del panel de control de la base de datos ejecutar y/o importar el archivo que se encuentra en: **/database/deliahrestoDB.sql**

**4) Iniciar el servidor**

```
node ./src/index.js
```

## Documentación de la API

Abrir el archivo **delilahResto_Apispec.yml** y copiarlo en **[Swagger](https://editor.swagger.io/)** o importar el mismo desde opciones.

Endpoints:

**URL: http://localhost:3000/**

| Métod | Endpoints | Descripción | Rol |
| ---- | ---- | ---- | ---- |
| POST | /login | Autenticación e inicio de sesión en el sistema | all |
| POST | /users/register | Crear un nuevo usuario | all |
| GET | /users/all | Obtiene información de todos los usuarios | **admin** |
| GET | /users/{id_user} | Obtiene información de un usuario con su id | **admin** |
| PUT | /users/{id_user} | Modifica la información de un usuario con su id | **admin** |
| GET | /users | Obtiene información del usuario que inició sesión | all |
| PUT | /users | Modifica la información del usuario que inició sesión | all |
| GET | /products | Obtiene información de todos los productos | all |
| GET | /products/{id_product} | Obtiene información de un producto | all |
| PUT | /products/{id_product} | Modifica la información de un producto con su id | **admin** |
| DELETE | /products/{id_product} | Elimina un producto con su id | **admin** |
| POST | /products | Crea un nuevo producto | **admin** |
| GET | /orders/all | Obtiene información de todos los pedidos | **admin** |
| GET | /orders/{id_order} | Obtiene información de un pedido con su id | **admin** |
| PUT | /orders/{id_order} | Modifica el estado de un pedido con su id | **admin** |
| DELETE | /orders/{id_order} | Cancela un pedido con su id | **admin** |
| GET | /orders | Obtiene información de los pedidos del usuario que inició sesión | all |
| POST | /orders | Crea un nuevo pedido el usuario que inició sesión | all |
## Testing
Testear endpoints con postman para usar API y base de datos

## Recursos y tecnologías utilizadas
* NodeJS
* Postman
* XAMPP
* Swagger
* NPM PACKAGES:
  * express
  * nodemon
  * jsonwebtoken
  * express-jwt
  * dotenv
  * mysql2
  * cors
  * compression
  * helmet

## Autor
**Hernán D Belalcázar A** - [Github hernandba](https://github.com/hernandba).
