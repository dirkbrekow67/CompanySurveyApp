const fs = require('fs');
const path = require('path');

module.exports = (req, res, next) => {
    const logPath = path.join(__dirname, '../logs/loginErrors.log');
    if (res.statusCode === 401) {
        const logEntry = `[${new Date().toISOString()}] [Email: ${req.body.email || 'Unbekannt'}] Fehlerhafte Anmeldung\n`;
        fs.appendFileSync(logPath, logEntry);
    }
    next();
};