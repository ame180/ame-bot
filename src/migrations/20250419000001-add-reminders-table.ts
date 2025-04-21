// filepath: /home/ame/Projects/ame-bot/src/migrations/20250419000001-add-reminders-table.ts
import { DataTypes, QueryInterface } from 'sequelize';

const migration = {
    up: async (queryInterface: QueryInterface) => {
        return await queryInterface.createTable('Reminders', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            guildId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Guilds',
                    key: 'id'
                }
            },
            channelId: {
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
            message: {
                type: DataTypes.STRING,
                allowNull: true
            },
            pingTime: {
                type: DataTypes.DATE,
                allowNull: false
            },
            completed: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
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
    },
    down: async (queryInterface: QueryInterface) => {
        return await queryInterface.dropTable('Reminders');
    }
}

module.exports = migration;