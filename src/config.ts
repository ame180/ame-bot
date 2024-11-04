require('dotenv').config();
import { minXpPerMessage, maxXpPerMessage, xpCooldown } from '../config.json';

export const {
    DISCORD_API_VERSION = '10',
    DISCORD_TOKEN,
    DISCORD_CLIENT_ID,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD,
} = process.env;

export {
    minXpPerMessage,
    maxXpPerMessage,
    xpCooldown
};