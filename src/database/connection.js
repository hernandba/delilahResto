const Sequelize = require('sequelize');
const path = 'mysql://root@localhost:3306/delilahresto';
const sequelize = new Sequelize(path);

sequelize.authenticate()
    .then(() => console.log('Connected to BD delilahresto...'))
    .catch(error => console.error(error));

module.exports = sequelize;