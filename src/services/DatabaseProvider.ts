import { MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD } from '../config';
import { Sequelize, DataTypes } from 'sequelize';

const connection = new Sequelize(
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD,
    {
        dialect: 'mysql',
        host: 'mysql',
        port: 3306,
        logging: false
    }
);

connection
    .authenticate()
    .then(() => {
        console.info("INFO - Database connected.")
    })
    .catch((err) => {
        console.error("ERROR - Unable to connect to the database:", err)
    });

export { connection, DataTypes };