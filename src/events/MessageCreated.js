// MessageXpHandler.js
const { handle: handleXp } = require('../services/MessageXpHandler.js');

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        await handleXp(message);
    },
}