const fs = require('fs');
const path = require('path');

module.exports = (action, user) => {
    const logPath = path.join(__dirname, '../logs/activity.log');
    const logEntry = `[${new Date().toISOString()}] [User: ${user || 'Unbekannt'}] ${action}\n`;

    fs.appendFileSync(logPath, logEntry);
};