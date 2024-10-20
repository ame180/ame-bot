import * as level from './Level';
import * as ping from './Ping';
import * as xp from './Xp';
import * as leaderboard from './Leaderboard';
import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export type Command = {
    data: SlashCommandBuilder,
    execute: (interaction: CommandInteraction) => Promise<void>
}

export const commands = {
    level,
    ping,
    xp,
    leaderboard
}