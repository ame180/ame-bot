module.exports = (connection, DataTypes) => {
    return connection.define('UserGuild', {
        'id': {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        'externalId': {
            type: DataTypes.STRING,
            allowNull: false
        },
        'xp': {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        'lastMessageAt': {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    });
}