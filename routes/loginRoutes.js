const express = require('express');
const router = express.Router();
const { renderLogin, handleLogin } = require('../controllers/loginController');

// GET-Route: Rendert die Login-Seite
router.get('/', renderLogin);

// POST-Route: Verarbeitet die Anmeldedaten und überprüft sie
router.post('/', handleLogin);

module.exports = router; // Exportiert die Routen, damit sie in `app.js` eingebunden werden können