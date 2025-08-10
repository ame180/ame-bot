import { DataTypes, QueryInterface } from 'sequelize';

const migration = {
    up: async (queryInterface: QueryInterface) => {
        // Step 1: Add column with default false so existing rows get false
        await queryInterface.addColumn('Reminders', 'sendAsDM', {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        });
        
        // Step 2: Change default to true for future inserts using changeColumn
        await queryInterface.changeColumn('Reminders', 'sendAsDM', {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        });
    },
    down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn('Reminders', 'sendAsDM');
    }
};

module.exports = migration;
