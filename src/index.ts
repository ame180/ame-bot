import { DISCORD_TOKEN } from './config';
import { client } from './services/ClientProvider';
import './models/index';

client.login(DISCORD_TOKEN)