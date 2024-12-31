const fs = require('fs');
const path = require('path');

// Middleware: Behandelt Fehler im gesamten Express-Stack
module.exports = (err, req, res, next) => {
    console.error('Fehler:', err.message); // Gibt den Fehler in die Konsole aus

    // Antwort an den Benutzer
    res.status(err.status || 500).render('error', {
        error: err.message || 'Interner Serverfehler', // Zeigt die Fehlermeldung an
    });
};

function logErrorToFile(err) {
    const logFilePath = path.join(__dirname, '../logs/errors.log');
    const logEntry = `[${new Date().toISOString()}] ${err.message}\n`;

    fs.appendFile(logFilePath, logEntry, (error) => {
        if (error) console.error('Fehler beim Schreiben in die Fehler-Logdatei:', error);
    });
}

module.exports = (err, req, res, next) => {
    console.error('Fehler:', err.message);
    logErrorToFile(err); // Fehler in Logdatei schreiben

    res.status(err.status || 500).render('error', {
        error: err.message || 'Interner Serverfehler',
    });
};