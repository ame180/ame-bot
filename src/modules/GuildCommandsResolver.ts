import {guildCommands} from "./index";

export function getGuildCommands(guildId: string) {
    // TODO: Implement Config based command loading
    return {
        ...guildCommands.levelCommands
    }
}