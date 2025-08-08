import { QueryInterface } from 'sequelize';

const migration = {
    up: async (queryInterface: QueryInterface) => {
        const sequelize: any = (queryInterface as any).sequelize;
        const [dbNameResult] = await sequelize.query('SELECT DATABASE() as db');
        const dbName = Array.isArray(dbNameResult) ? dbNameResult[0]?.db : dbNameResult?.db;
        if (dbName) {
            await sequelize.query(`ALTER DATABASE \`${dbName}\` CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci`);
        }
        const tables = ['Users', 'UserGuilds', 'Guilds', 'GuildConfigs', 'Reminders'];
        for (const table of tables) {
            await queryInterface.sequelize.query(
                `ALTER TABLE \`${table}\` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
            );
        }
    },
    down: async () => Promise.resolve()
};

module.exports = migration;
