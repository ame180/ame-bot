export default (connection, DataTypes) => {
    return connection.define('Reminder', {
        'id': {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        'channelId': {
            type: DataTypes.STRING,
            allowNull: false
        },
        'message': {
            type: DataTypes.STRING,
            allowNull: true
        },
        'pingTime': {
            type: DataTypes.DATE,
            allowNull: false
        },
        'completed': {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        'sendAsDM': {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    });
}