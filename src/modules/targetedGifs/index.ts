import { getCommands } from './GifCommandProvider';


export const name = 'targetedGifs';

export async function getGuildCommands(guild) {
    return await getCommands(guild);
}