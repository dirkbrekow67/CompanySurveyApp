const { saveCompany, getCompanies } = require('../models/companyModel');
const validator = require('validator'); // Für Passwortvalidierung

// Render-Funktion für das Hinzufügen einer neuen Firma
function renderAddCompany(req, res) {
    res.render('addCompany');
}

// Verarbeitung der Firmendaten
async function handleAddCompany(req, res) {
    const { name, department, password } = req.body;

    try {
        // Prüfen, ob alle Felder ausgefüllt sind
        if (!name || !department || !password) {
            return res.status(400).render('addCompany', { error: 'Alle Felder sind erforderlich' });
        }

        // Prüfen, ob Firma und Abteilung bereits existieren
        const companies = await getCompanies();
        const exists = companies.some(c => c.name === name && c.department === department);
        if (exists) {
            return res.status(400).render('addCompany', { error: 'Die Firma und Abteilung existieren bereits' });
        }

        // Prüfen, ob das Passwort sicher ist
        const isPasswordStrong = validator.isStrongPassword(password, {
            minLength: 12,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        });

        console.log('Eingabepasswort:', password);
        console.log('Validierungsergebnis:', isPasswordStrong);

        if (!password || password.length < 12 || !/[A-Z]/.test(password)) {
            return res.status(400).render('addCompany', { error: 'Ungültiges Passwort' });
        }
        
        if (!isPasswordStrong) {
            return res.status(400).render('addCompany', {
                error: 'Das Passwort muss mindestens 12 Zeichen, Großbuchstaben, Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten',
            });
        }

        // Firma speichern
        await saveCompany({ name, department, password });
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Fehler beim Speichern der Firma:', error);
        res.status(500).render('addCompany', { error: 'Serverfehler beim Speichern der Firma' });
    }
}

module.exports = { renderAddCompany, handleAddCompany };