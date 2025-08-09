import * as reactionAdd from './handlers/ReactionAdd';
import * as reactionRemove from './handlers/ReactionRemove';
import { syncAllEnabledGuilds } from './ReactionRolesService';

export const name = 'reactionRoles';

export const eventHandlers = [
    reactionAdd,
    reactionRemove
];

export async function setup() {
    await syncAllEnabledGuilds();
}
