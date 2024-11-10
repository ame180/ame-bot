import { DataTypes, QueryInterface } from "sequelize";

const migration = {
    up: async (queryInterface: QueryInterface) => {
        await queryInterface.createTable('Guilds', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            externalId: {
                type: DataTypes.STRING,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
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
        await queryInterface.addIndex('Guilds', ['externalId'], {
            unique: true
        });

        await queryInterface.removeIndex('GuildConfigs', ['guildId', 'name']);
        await queryInterface.renameColumn('GuildConfigs', 'guildId', 'externalId');
        await queryInterface.addIndex('GuildConfigs', ['externalId', 'name'], {
            unique: true
        });

        await queryInterface.addColumn('GuildConfigs', 'guildId', {
            type: DataTypes.INTEGER,
            after: 'id',
            allowNull: true,
            references: {
                model: 'Guilds',
                key: 'id'
            }
        } as any);
    },
    down: async (queryInterface: QueryInterface) => {
        await queryInterface.removeColumn('GuildConfigs', 'guildId');

        await queryInterface.removeIndex('GuildConfigs', ['externalId', 'name']);
        await queryInterface.renameColumn('GuildConfigs', 'externalId', 'guildId');
        await queryInterface.addIndex('GuildConfigs', ['guildId', 'name'], {
            unique: true
        });

        await queryInterface.dropTable('Guilds');
    }
}

module.exports = migration;