// Middleware: Behandelt Fehler im gesamten Express-Stack
module.exports = (err, req, res, next) => {
    console.error('Fehler:', err.message); // Gibt den Fehler in die Konsole aus

    // Antwort an den Benutzer
    res.status(err.status || 500).render('error', {
        error: err.message || 'Interner Serverfehler', // Zeigt die Fehlermeldung an
    });
};