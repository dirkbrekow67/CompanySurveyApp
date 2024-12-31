// routes/loginRoutes.js: Routen für Benutzer-Login und Fragebogen
const express = require('express');
const router = express.Router();
const { handleLogin } = require('../controllers/loginController');

// GET: Login-Seite anzeigen
router.get('/', (req, res) => {
    res.render('login', { error: null });
});

// POST: Login-Daten verarbeiten
router.post('/', handleLogin);

module.exports = router;