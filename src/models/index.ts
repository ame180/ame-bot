import { connection, DataTypes } from '../services/DatabaseProvider.js';
import getUserModel from './User'
import getUserGuildModel from './UserGuild'
import getGuildConfigModel from './GuildConfig'

const UserModel = getUserModel(connection, DataTypes);
const UserGuildModel = getUserGuildModel(connection, DataTypes);
const GuildConfigModel = getGuildConfigModel(connection);

UserModel.hasOne(UserGuildModel, { foreignKey: 'userId' });
UserGuildModel.belongsTo(UserModel, { foreignKey: 'userId' });

export {
    UserModel,
    UserGuildModel,
    GuildConfigModel,
    connection
}