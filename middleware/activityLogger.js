const fs = require('fs');
const path = require('path');

module.exports = (req, res, next) => {
    const logPath = path.join(__dirname, '../logs/activity.log');
    const logEntry = `[${new Date().toISOString()}] [${req.method}] ${req.originalUrl} von ${req.session.user?.email || 'Unbekannt'}\n`;
    fs.appendFileSync(logPath, logEntry);
    next();
};