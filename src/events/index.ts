import * as ClientReady from './ClientReady';
import * as InteractionCreate from './InteractionCreate';
import * as MessageCreated from './MessageCreated';
import * as MessageReactionAdd from './MessageReactionAdd';
import * as MessageReactionRemove from './MessageReactionRemove';

export type Event = {
    name: string,
    once: boolean | undefined,
    execute: (...args: any[]) => Promise<void>|void
}

export const events = [
    ClientReady,
    InteractionCreate,
    MessageCreated,
    MessageReactionAdd,
    MessageReactionRemove
] as Event[];