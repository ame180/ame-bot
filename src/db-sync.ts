import { connection } from './models';

connection.sync({ alter: true }).then(
    () => console.log('Database synced!')
).catch(
    error => console.error('Error syncing database:', error)
)