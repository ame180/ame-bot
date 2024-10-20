require('dotenv').config();
const token = process.env.DISCORD_TOKEN;
const { client } = require('./services/ClientProvider');
require('./models/index');

client.login(token)