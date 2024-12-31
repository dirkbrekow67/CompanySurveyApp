const { validateCompany } = require('../models/companyModel');

// GET-Controller: Zeigt die Login-Seite an
function renderLogin(req, res) {
    res.render('login', { error: null }); // Rendert die `login`-View und setzt die Fehlermeldung standardmäßig auf `null`
}

// POST-Controller: Verarbeitet die Anmeldedaten
async function handleLogin(req, res) {
    const { companyName, departmentName, password } = req.body; // Extrahiert die Formulardaten

    try {
        // Validierung der Anmeldedaten
        const isValid = await validateCompany(companyName, departmentName, password);

        if (!isValid) {
            return res.render('login', { error: 'Ungültige Anmeldedaten' }); // Fehlermeldung bei ungültigen Daten
        }

        // Weiterleitung zum Dashboard bei erfolgreicher Anmeldung
        res.redirect(`/dashboard?company=${encodeURIComponent(companyName)}&department=${encodeURIComponent(departmentName)}`);
    } catch (error) {
        console.error('Login-Fehler:', error); // Fehlerlog
        res.status(500).render('login', { error: 'Serverfehler bei der Anmeldung' }); // Zeigt eine Fehlermeldung an
    }
}

module.exports = { renderLogin, handleLogin }; // Exportiert die Funktionen