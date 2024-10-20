require('dotenv').config();
const token = process.env.DISCORD_TOKEN;
import { client } from './services/ClientProvider';
import './models/index';

client.login(token)