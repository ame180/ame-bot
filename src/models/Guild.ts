import { DataTypes } from 'sequelize';

export default (connection) => {
    return connection.define('Guild', {
        'id': {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        'externalId': {
            type: DataTypes.STRING,
            allowNull: false
        },
        'name': {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
}