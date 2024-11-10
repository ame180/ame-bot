import { DataTypes, QueryInterface } from "sequelize";

const migration = {
    up: async (queryInterface: QueryInterface) => {
        await queryInterface.changeColumn('GuildConfigs', 'guildId', {
            type: DataTypes.INTEGER,
            allowNull: false
        });
        await queryInterface.removeColumn('GuildConfigs', 'externalId');
    },
    down: async (queryInterface: QueryInterface) => {
        await queryInterface.addColumn('GuildConfigs', 'externalId', {
            type: DataTypes.STRING,
            allowNull: false
        });
        await queryInterface.changeColumn('GuildConfigs', 'guildId', {
            type: DataTypes.INTEGER,
            allowNull: true
        });
    }
}

module.exports = migration;