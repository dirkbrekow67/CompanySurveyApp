// controllers/loginController.js: Benutzer-Login-Logik
const { validateCompany } = require('../models/companyModel');

async function handleLogin(req, res) {
    const { companyName, departmentName, password } = req.body;

    try {
        // Firma und Abteilung validieren
        const isValid = await validateCompany(companyName, departmentName, password);

        if (!isValid) {
            return res.render('login', { error: 'Ungültige Anmeldedaten' });
        }

        // Weiterleitung zum Fragebogen
        res.redirect(`/survey?company=${encodeURIComponent(companyName)}&department=${encodeURIComponent(departmentName)}`);
    } catch (error) {
        console.error('Login-Fehler:', error);
        res.status(500).render('login', { error: 'Serverfehler bei der Anmeldung' });
    }
}

module.exports = { handleLogin };