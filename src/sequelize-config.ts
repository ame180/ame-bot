import { config } from './config/configLoader';

const dbConfig = {
    prod: {
        dialect: 'mysql',
        username: config.MYSQL_USER,
        password: config.MYSQL_PASSWORD,
        database: config.MYSQL_DATABASE,
        host: 'mysql',
        port: 3306
    }
};

module.exports = dbConfig;