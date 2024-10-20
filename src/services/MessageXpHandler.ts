import { UserModel, UserGuildModel } from '../models';

const minXpPerMessage = 5;
const maxXpPerMessage = 8;
const xpCooldown = 20;

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
    await userGuild.save();

    if (userGuild.lastMessageAt && ((new Date()).getSeconds() - userGuild.lastMessageAt.getSeconds()) < xpCooldown) return;

    const xpGain = Math.floor(Math.random() * (maxXpPerMessage - minXpPerMessage + 1) + minXpPerMessage);
    userGuild.xp += xpGain;
    userGuild.lastMessageAt = new Date();

    await userGuild.save();
}