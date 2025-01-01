const fs = require('fs');
const path = require('path');

module.exports = (err, req, res, next) => {
    const logPath = path.join(__dirname, '../logs/error.log');
    const logEntry = `[${new Date().toISOString()}] [${req.method}] ${req.originalUrl} Fehler: ${err.message}\n`;
    fs.appendFileSync(logPath, logEntry);
    res.status(500).send('Ein interner Serverfehler ist aufgetreten.');
};