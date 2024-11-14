import dotenv from 'dotenv';
dotenv.config();
import { minXpPerMessage, maxXpPerMessage, xpCooldown } from '../config.json';

export const {
    APP_HOST,
    APP_PROTOCOL,
    DISCORD_API_VERSION = '10',
    DISCORD_TOKEN,
    DISCORD_CLIENT_ID,
    API_KEY,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD,
} = process.env;

export {
    minXpPerMessage,
    maxXpPerMessage,
    xpCooldown
};