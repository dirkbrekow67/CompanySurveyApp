// logger.js: Strukturierte Logs mit Winston
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: 'info', // Logging-Level
    format: format.combine(
        format.timestamp(), // Zeitstempel hinzufügen
        format.json() // JSON-Format für strukturierte Logs
    ),
    transports: [
        new transports.Console(), // Logs in der Konsole
        new transports.File({ filename: 'logs/app.log' }), // Logs in Datei speichern
    ],
});

module.exports = logger;