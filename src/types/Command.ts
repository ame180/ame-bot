import { CommandInteraction, SharedSlashCommand } from "discord.js";

export type Command = {
    data: SharedSlashCommand,
    execute: (interaction: CommandInteraction) => Promise<void>|void,
}