import { DataTypes, QueryInterface } from 'sequelize';

const migration = {
    up: async (queryInterface: QueryInterface) => {
        await queryInterface.createTable('GuildConfigs', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            guildId: {
                type: DataTypes.STRING,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            value: {
                type: DataTypes.JSON,
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false
            }
        });

        return await queryInterface.addIndex('GuildConfigs', ['guildId', 'name'], {
            unique: true
        });
    },
    down: async (queryInterface: QueryInterface) => {
        return await queryInterface.dropTable('GuildConfigs');
    }
}

module.exports = migration;