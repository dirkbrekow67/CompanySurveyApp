const fs = require('fs');
const path = require('path');

module.exports = () => {
    const logsDir = path.join(__dirname, '../logs');
    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir);
    }
};