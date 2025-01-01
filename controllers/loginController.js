// controllers/loginController.js: Benutzer-Login-Logik
const { validateCompany } = require('../models/companyModel');

module.exports = {
    login: (req, res) => {
        const { email, password } = req.body;
        if (email === 'admin@example.com' && password === 'password123') {
            res.status(200).json({ message: 'Erfolgreich angemeldet' });
        } else {
            res.status(401).json({ error: 'Ungültige Anmeldeinformationen' });
        }
    },
    handleLogin: async (req, res) => {
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
};
