import { DataTypes } from 'sequelize';

export default (connection) => {
    return connection.define('GuildConfig', {
        'id': {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        'guildId': {
            type: DataTypes.STRING,
            allowNull: false
        },
        'name': {
            type: DataTypes.STRING,
            allowNull: false
        },
        'value': {
            type: DataTypes.JSON,
            allowNull: false
        }
    });
}