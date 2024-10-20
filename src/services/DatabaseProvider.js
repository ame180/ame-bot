const path = require('node:path');
const { Sequelize, DataTypes} = require('sequelize');

const connection = new Sequelize({
    dialect: 'sqlite',
    logging: false,
    storage: path.join(__dirname, '../../db.sqlite')
});

connection
    .authenticate()
    .then(() => {
        console.info("INFO - Database connected.")
    })
    .catch((err) => {
        console.error("ERROR - Unable to connect to the database:", err)
    })

module.exports = {
    connection,
    DataTypes
}