// controllers/adminController.js: Logik für Admin-Login
const logger = require('../logger');
const bcrypt = require('bcrypt');
const { admins } = require('../models/adminModel');
const fs = require('fs').promises;
const path = require('path');
const loginLogPath = path.join(__dirname, '../data/loginLog.json');

// Funktion: Admin-Login verarbeiten
async function handleAdminLogin(req, res) {
    const { name, email, password } = req.body;

    try {
        const admin = admins.find(a => a.email === email && a.name === name);

        if (!admin || !(await bcrypt.compare(password, admin.hashpassword))) {
            logger.warn('Ungültiger Login-Versuch', { email });
            return res.render('adminLogin', { error: 'Ungültige Anmeldedaten' });
        }

        logger.info('Admin erfolgreich eingeloggt', { email });
        await logAdminLogin(admin); // Anmeldung protokollieren

        req.session.isAdmin = true;
        req.session.adminName = name;

        res.redirect('/dashboard');
    } catch (error) {
        logger.error('Fehler beim Admin-Login', { error });
        res.status(500).render('adminLogin', { error: 'Serverfehler bei der Anmeldung' });
    }
}

// Funktion: Admin-Anmeldungen protokollieren
async function logAdminLogin(admin) {
    const logEntry = { name: admin.name, email: admin.email, timestamp: new Date().toISOString() };
    const logs = JSON.parse(await fs.readFile(loginLogPath, 'utf8') || '[]');
    logs.push(logEntry);
    await fs.writeFile(loginLogPath, JSON.stringify(logs, null, 2));
}

module.exports = { handleAdminLogin };