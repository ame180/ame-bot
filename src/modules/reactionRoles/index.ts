import * as reactionAdd from './handlers/ReactionAdd';
import * as reactionRemove from './handlers/ReactionRemove';

export const name = 'reactionRoles';

export const eventHandlers = [
    reactionAdd,
    reactionRemove
];
