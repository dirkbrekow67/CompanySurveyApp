const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../logs/access.log');

module.exports = {
    logError: (err, req, res, next) => {
        const errorLog = `[${new Date().toISOString()}] [IP: ${req.ip}] ${err.stack || err.message}\n`;
        fs.appendFileSync(path.join(__dirname, '../logs/errors.log'), errorLog);
        next(err);
    },
    logAccess: (req, res, next) => {
        const accessLog = `[${new Date().toISOString()}] [IP: ${req.ip}] ${req.method} ${req.url}\n`;
        fs.appendFileSync(logFilePath, accessLog);
        next();
    },
};

module.exports.logSecurityIncident = (message, req) => {
    const incidentLog = `[${new Date().toISOString()}] [IP: ${req.ip}] ${message}\n`;
    fs.appendFileSync(path.join(__dirname, '../logs/security.log'), incidentLog);
};