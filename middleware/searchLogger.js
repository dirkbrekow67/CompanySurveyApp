const fs = require('fs');
const path = require('path');

module.exports = (req, res, next) => {
    try {
        next();
    } catch (error) {
        const logPath = path.join(__dirname, '../logs/searchErrors.log');
        const logEntry = `[${new Date().toISOString()}] [Query: ${JSON.stringify(req.query)}] Error: ${error.message}\n`;
        fs.appendFileSync(logPath, logEntry);
        next(error);
    }
};