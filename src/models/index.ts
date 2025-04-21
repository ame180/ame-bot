import { connection, DataTypes } from '../services/DatabaseProvider.js';
import getUserModel from './User'
import getGuildModel from './Guild'
import getUserGuildModel from './UserGuild'
import getGuildConfigModel from './GuildConfig'
import getReminderModel from './Reminder'

const UserModel = getUserModel(connection, DataTypes);
const GuildModel = getGuildModel(connection);
const UserGuildModel = getUserGuildModel(connection, DataTypes);
const GuildConfigModel = getGuildConfigModel(connection);
const ReminderModel = getReminderModel(connection, DataTypes);

UserModel.hasMany(UserGuildModel, { foreignKey: 'userId' });
UserGuildModel.belongsTo(UserModel, { foreignKey: 'userId' });
GuildModel.hasMany(GuildConfigModel, { foreignKey: 'guildId' });
GuildConfigModel.belongsTo(GuildModel, { foreignKey: 'guildId' });

GuildModel.hasMany(ReminderModel, { foreignKey: 'guildId' });
ReminderModel.belongsTo(GuildModel, { foreignKey: 'guildId' });
UserModel.hasMany(ReminderModel, { foreignKey: 'userId' });
ReminderModel.belongsTo(UserModel, { foreignKey: 'userId' });

export {
    UserModel,
    GuildModel,
    UserGuildModel,
    GuildConfigModel,
    ReminderModel,
    connection
}