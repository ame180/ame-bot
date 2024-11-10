import { connection, DataTypes } from '../services/DatabaseProvider.js';
import getUserModel from './User'
import getGuildModel from './Guild'
import getUserGuildModel from './UserGuild'
import getGuildConfigModel from './GuildConfig'

const UserModel = getUserModel(connection, DataTypes);
const GuildModel = getGuildModel(connection);
const UserGuildModel = getUserGuildModel(connection, DataTypes);
const GuildConfigModel = getGuildConfigModel(connection);

UserModel.hasMany(UserGuildModel, { foreignKey: 'userId' });
UserGuildModel.belongsTo(UserModel, { foreignKey: 'userId' });
GuildModel.hasMany(UserGuildModel, { foreignKey: 'guildId' });
UserGuildModel.belongsTo(GuildModel, { foreignKey: 'guildId' });

export {
    UserModel,
    GuildModel,
    UserGuildModel,
    GuildConfigModel,
    connection
}