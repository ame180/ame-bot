export default (connection, DataTypes) => {
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
        'username': {
            type: DataTypes.STRING,
        },
        'displayName': {
            type: DataTypes.STRING,
        },
        'avatar': {
            type: DataTypes.STRING,
        }
    });
}