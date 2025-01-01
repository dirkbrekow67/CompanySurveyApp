// routes/adminRoutes.js: Routen für Admin-Funktionen
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { addAdmin } = require('../models/adminModel');
const fs = require('fs').promises;
const path = require('path');
const loginLogPath = path.join(__dirname, '../data/loginLog.json');
const accessControl = require('../middleware/accessControl');


// GET: Admin-Login-Seite
router.get('/login', (req, res) => {
    res.render('adminLogin', { error: null });
});

// POST: Admin-Login verarbeiten
router.post('/login', adminController.handleAdminLogin);

// GET: Letzte Anmeldungen anzeigen
router.get('/logins', async (req, res, next) => {
    try {
        const logs = JSON.parse(await fs.readFile(loginLogPath, 'utf8') || '[]');
        res.render('loginLog', { logs });
    } catch (error) {
        next(error); // Fehler an den globalen Fehlerhandler weitergeben
    }
});

// POST: Benutzer hinzufügen
router.post('/add-user', async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        await addAdmin(name, email, password);
        res.redirect('/dashboard');
    } catch (error) {
        next(error); // Fehler an den globalen Fehlerhandler weitergeben
    }
});

// Nur Admins dürfen auf diese Routen zugreifen
router.use(accessControl('Admin'));

router.get('/manage', adminController.renderAdminManagement);

module.exports = router;