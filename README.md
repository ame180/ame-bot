# ame-bot

My personal Discord bot. The features I wanted usually meant running several different bots, with a ton of features I didn't care about, so I made my own, modular one as a fun side project. The main idea is that every feature is a module that each server enables and configures for itself (levels, reaction roles, regex reactions, reminders and so on). That lets me add the bot to all the servers I'm in and turn on only what each one needs, and lets me keep adding features without the worry of bloat.

## Modules

- `levels`: XP from messages, level roles, `/level` and `/leaderboard`, plus a JSON leaderboard API.
- `reactionRoles`: role-picker messages where reacting grants a role.
- `messageReactions`: react to messages that match a regex.
- `remindme`: `/remindme` reminders.
- `targetedGifs`: custom per-server commands that reply with a random GIF aimed at a user.

`/ping` and `/timestamp` are available everywhere. A server enables modules in its `modules` row of the `GuildConfigs` table, e.g. `{ "levels": true, "remindme": true }`; modules that need settings read them from a row named after the module.

## Development

1. Copy `.env.dist` to `.env` and `config.dist.json` to `config.json`, then fill in the Discord values.
2. `docker login ghcr.io` (the MySQL image lives there).
3. `docker compose up -d` starts MySQL, nginx and a Node container that installs dependencies, builds and runs migrations.
4. `docker compose exec node yarn dev:bot` runs the bot; `docker compose exec node yarn dev` runs the API.

Quality gates: `yarn lint`, `yarn test`, `yarn build`.

## Production

The manually triggered Deploy workflow builds `infra/Dockerfile-prod` into a GHCR image (`dev` or `latest` tag), copies `compose-prod.yml` to the server over SSH and restarts the stack, which runs the API and the bot as separate containers.
