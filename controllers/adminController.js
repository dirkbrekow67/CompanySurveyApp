// controllers/adminController.js: Admin-Login-Logik
const { getAdmins } = require('../models/adminModel');
const bcrypt = require('bcrypt');

async function handleAdminLogin(req, res) {
    const { name, email, password } = req.body;

    try {
        // Admin-Daten abrufen
        const admins = await getAdmins();
        const admin = admins.find(a => a.email === email && a.name === name);

        // Validierung des Admins
        if (!admin || !(await bcrypt.compare(password, admin.hashpassword))) {
            return res.render('adminLogin', { error: 'Ungültige Anmeldedaten' });
        }

        // Admin-Session setzen
        req.session.isAdmin = true;
        req.session.adminName = name;

        res.redirect('/dashboard'); // Weiterleitung zum Dashboard
    } catch (error) {
        console.error('Admin-Login-Fehler:', error);
        res.status(500).render('adminLogin', { error: 'Serverfehler bei der Anmeldung' });
    }
}

module.exports = { handleAdminLogin };