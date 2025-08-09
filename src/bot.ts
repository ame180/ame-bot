
import { bootstrap } from './bootstrap';
import { Client, GatewayIntentBits, Partials } from 'discord.js';

const core = bootstrap();
console.log('Starting bot');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMembers,
	],
	partials: [
		Partials.Message,
		Partials.Reaction,
		Partials.User,
	],
});

void import('./events').then(({ events }) => {
	for (const event of events) {
		if (event.once) {
			client.once(event.name, async (...args) => {
				try { await event.execute(...args); } catch (e) { console.error(e); }
			});
		} else {
			client.on(event.name, async (...args) => {
				try { await event.execute(...args); } catch (e) { console.error(e); }
			});
		}
	}
});

void client.login(core.config.DISCORD_TOKEN);