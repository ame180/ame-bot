import { connection, DataTypes } from '../services/DatabaseProvider.js';
import getUserModel from './User'
import getUserGuildModel from './UserGuild'

const User = getUserModel(connection, DataTypes);
const UserGuild = getUserGuildModel(connection, DataTypes);

User.hasOne(UserGuild, { foreignKey: 'userId' });
UserGuild.belongsTo(User, { foreignKey: 'userId' });

export {
    User,
    UserGuild,
    connection
}