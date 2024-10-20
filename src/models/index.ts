import { connection, DataTypes } from '../services/DatabaseProvider.js';
import getUserModel from './User'
import getUserGuildModel from './UserGuild'

const UserModel = getUserModel(connection, DataTypes);
const UserGuildModel = getUserGuildModel(connection, DataTypes);

UserModel.hasOne(UserGuildModel, { foreignKey: 'userId' });
UserGuildModel.belongsTo(UserModel, { foreignKey: 'userId' });

export {
    UserModel,
    UserGuildModel,
    connection
}