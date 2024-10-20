const { connection, DataTypes } = require('../services/DatabaseProvider.js');
const getUserModel = require('./User.js')
const getUserGuildModel = require('./UserGuild.js')

const User = getUserModel(connection, DataTypes);
const UserGuild = getUserGuildModel(connection, DataTypes);

User.hasOne(UserGuild, { foreignKey: 'userId' });
UserGuild.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
    User,
    UserGuild,
    connection
}