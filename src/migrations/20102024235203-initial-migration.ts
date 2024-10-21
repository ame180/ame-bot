import { DataTypes, QueryInterface } from "sequelize";

const migration = {
    up: async (queryInterface: QueryInterface) => {
        await queryInterface.createTable('Users', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            externalId: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            username: {
                type: DataTypes.STRING,
            },
            displayName: {
                type: DataTypes.STRING,
            },
            avatar: {
                type: DataTypes.STRING,
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
        await queryInterface.createTable('UserGuilds', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            externalId: {
                type: DataTypes.STRING,
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            userDisplayName: {
                type: DataTypes.STRING
            },
            xp: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            lastMessageAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
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

        return await queryInterface.addIndex('UserGuilds', ['userId', 'externalId'], {
            unique: true
        });
    },
    down: async (queryInterface: QueryInterface) => {
        await queryInterface.dropTable('UserGuilds');
        return await queryInterface.dropTable('Users');
    }
}

module.exports = migration;