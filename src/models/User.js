module.exports = (connection, DataTypes) => {
    return connection.define('User', {
        'id': {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        'externalId': {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
    });
}