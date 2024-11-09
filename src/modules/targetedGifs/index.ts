import {getCommands} from "./GifCommandProvider";


export const name = 'targetedGifs';

export async function getGuildCommands(guildId: string) {
    return await getCommands(guildId);
}