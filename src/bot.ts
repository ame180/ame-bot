import { DISCORD_TOKEN } from './config';
import { client } from './services/ClientProvider';
import './models/index';

void client.login(DISCORD_TOKEN);