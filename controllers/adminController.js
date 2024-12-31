// adminController.js: Logik für Admin-Login
const { hashPassword, comparePassword, findAdminByEmail } = require('../models/adminModel');

// Funktion: Admin-Login verarbeiten
function handleAdminLogin(req, res) {
    const { email, password } = req.body;

    try {
        // Admin anhand der E-Mail finden
        const admin = findAdminByEmail(email);

        // Admin existiert nicht oder Passwort stimmt nicht überein
        if (!admin || !comparePassword(password, admin.hashpassword)) {
            return res.status(401).send('Ungültige Anmeldedaten');
        }

        // Admin erfolgreich eingeloggt
        req.session.isAdmin = true; // Admin-Status in der Session speichern
        req.session.adminName = admin.name;

        res.send('Login erfolgreich');
    } catch (error) {
        console.error('Fehler beim Admin-Login:', error);
        res.status(500).send('Serverfehler');
    }
}

// Funktion: Admin hinzufügen (nur für Testzwecke)
function addAdmin(req, res) {
    const { name, email, password } = req.body;

    try {
        const hashpassword = hashPassword(password); // Passwort hashen
        const newAdmin = { name, email, hashpassword };

        // Admin-Daten in der Liste speichern
        const admins = require('../models/adminModel').admins;
        admins.push(newAdmin);

        res.send('Admin hinzugefügt');
    } catch (error) {
        console.error('Fehler beim Hinzufügen eines Admins:', error);
        res.status(500).send('Fehler beim Hinzufügen eines Admins');
    }
}

module.exports = { handleAdminLogin, addAdmin };