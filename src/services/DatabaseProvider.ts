import { config } from '../config/configLoader';
import { Sequelize, DataTypes } from 'sequelize';

const connection = new Sequelize(
    config.MYSQL_DATABASE,
    config.MYSQL_USER,
    config.MYSQL_PASSWORD,
    {
        dialect: 'mysql',
        host: 'mysql',
        port: 3306,
        logging: false,
        define: {
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci',
        },
        dialectOptions: {
            charset: 'utf8mb4',
        }
    }
);

connection
    .authenticate()
    .then(() => {
        console.info('INFO - Database connected.')
    })
    .catch((err) => {
        console.error('ERROR - Unable to connect to the database:', err)
    });

export { connection, DataTypes };