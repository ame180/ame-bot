import { DataTypes, QueryInterface } from 'sequelize';

const migration = {
    up: async (queryInterface: QueryInterface) => {
        return await queryInterface.addColumn('UserGuilds', 'messageCount', {
            type: DataTypes.INTEGER,
            defaultValue: 0
        });
    },
    down: async (queryInterface: QueryInterface) => {
        return await queryInterface.removeColumn('UserGuilds', 'messageCount');
    }
}

module.exports = migration;