import {
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD
} from './config';

const config = {
    prod: {
        dialect: 'mysql',
        username: MYSQL_USER,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
        host: 'mysql',
        port: 3306
    }
}

module.exports = config;