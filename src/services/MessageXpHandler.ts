import { User, UserGuild } from '../models';

const minXpPerMessage = 5;
const maxXpPerMessage = 8;
const xpCooldown = 20;

export async function handle(message) {
    if (message.author.bot) return;

    const [user, userCreated] = await User.findOrCreate({ where: { externalId: message.author.id } });
    userCreated && await user.save();

    const [userGuild, guildCreated] = await UserGuild.findOrCreate({
        where: {
            externalId: message.guildId,
            userId: user.id
        }
    });
    guildCreated && await userGuild.save();

    if (userGuild.lastMessageAt && ((new Date()).getSeconds() - userGuild.lastMessageAt.getSeconds()) < xpCooldown) return;

    const xpGain = Math.floor(Math.random() * (maxXpPerMessage - minXpPerMessage + 1) + minXpPerMessage);
    userGuild.xp += xpGain;
    userGuild.lastMessageAt = new Date();

    await userGuild.save();
}