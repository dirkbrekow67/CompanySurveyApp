// routes/adminRoutes.js: Routen für Admin-Login
const express = require('express');
const router = express.Router();
const { handleAdminLogin } = require('../controllers/adminController');
const { getSurveyResults } = require('../models/surveyModel');

// GET: Admin-Login-Seite anzeigen
rrouter.get('/login', (req, res) => {
    res.render('adminLogin'); // CSRF-Token wird automatisch eingefügt
});

// POST: Admin-Login-Daten verarbeiten
router.post('/login', handleAdminLogin);

router.get('/dashboard/results', async (req, res) => {
    const results = await getSurveyResults();
    res.render('results', { results });
});

router.get('/forgot-password', (req, res) => {
    res.render('forgotPassword', { error: null });
});

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    const admin = admins.find(a => a.email === email);

    if (!admin) {
        return res.render('forgotPassword', { error: 'E-Mail nicht gefunden' });
    }

    // Logik für Passwort-Reset-Link (z. B. per E-Mail senden)
    console.log(`Passwort-Reset-Link generiert für: ${email}`);
    res.send('Ein Passwort-Reset-Link wurde an Ihre E-Mail gesendet.');
});

module.exports = router;