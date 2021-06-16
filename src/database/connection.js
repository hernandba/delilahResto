require('dotenv').config();
const { DB_HOST, DB_NAME, S_USER, S_PASSWORD, DB_PORT } = process.env

const Sequelize = require('sequelize');
// const path = 'mysql://root@localhost:3306/delilahresto';
// const sequelize = new Sequelize(path);
const sequelize = new Sequelize(DB_NAME, S_USER, S_PASSWORD, 
    {
        host: DB_HOST,
        dialect: 'mysql',
        port: DB_PORT,
        dialectOptions: {
            multipleStatements: true
        }
    }
)

sequelize.authenticate()
    .then(() => console.log('Connected to BD',DB_NAME))
    .catch(error => console.error(error));

module.exports = sequelize;