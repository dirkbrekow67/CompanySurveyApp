const fs = require('fs');
const path = require('path');

// Pfad zur Log-Datei
const logFilePath = path.join(__dirname, '../logs', 'requests.log');

// Middleware: Protokolliert jede Anfrage
module.exports = (req, res, next) => {
    const logEntry = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;

    // Schreibt den Log-Eintrag in die Datei (erstellt die Datei, falls sie nicht existiert)
    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) {
            console.error('Fehler beim Schreiben der Log-Datei:', err);
        }
    });

    console.log(logEntry.trim()); // Log in die Konsole
    next(); // Ruft die nächste Middleware oder Route auf
};