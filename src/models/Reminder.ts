// filepath: /home/ame/Projects/ame-bot/src/models/Reminder.ts
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
        }
    });
}