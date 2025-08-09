import { UserModel, UserGuildModel } from '../../models';
import { config } from '../../config/configLoader';
import { Events } from 'discord.js';

export const eventName = Events.MessageCreate;

export async function handle(message) {
    if (message.author.bot) return;

    const [user] = await UserModel.findOrCreate({ where: { externalId: message.author.id } });
    user.username = message.author.username;
    user.displayName = message.author.displayName;
    user.avatar = message.author.avatarURL();
    await user.save();

    const [userGuild] = await UserGuildModel.findOrCreate({
        where: {
            externalId: message.guildId,
            userId: user.id
        }
    });
    userGuild.userDisplayName = message.member.displayName;
    userGuild.messageCount++;
    await userGuild.save();


    if (userGuild.lastMessageAt && ((new Date()).getTime() - userGuild.lastMessageAt.getTime()) / 1000 < config.xpCooldown) return;

    const xpGain = Math.floor(Math.random() * (config.maxXpPerMessage - config.minXpPerMessage + 1) + config.minXpPerMessage);
    userGuild.xp += xpGain;
    userGuild.lastMessageAt = new Date();

    await userGuild.save();
}