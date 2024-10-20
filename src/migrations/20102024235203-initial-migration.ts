import { DataTypes, QueryInterface } from "sequelize";

const migration = {
    up: async (queryInterface: QueryInterface) => {
        await queryInterface.createTable('users', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            discordId: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
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

        // noinspection TypeScriptValidateTypes
        await queryInterface.createTable('user_guilds', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            guildId: {
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

        return await queryInterface.addIndex('user_guilds', ['userId', 'guildId'], {
            unique: true
        });
    },
    down: async (queryInterface: QueryInterface) => {
        await queryInterface.dropTable('user_guilds');
        return await queryInterface.dropTable('users');
    }
}

module.exports = migration;