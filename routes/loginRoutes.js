const express = require('express');
const router = express.Router();
const { renderLogin, handleLogin } = require('../controllers/loginController');

// GET-Route für die Login-Seite
router.get('/', renderLogin);

// POST-Route für die Login-Verarbeitung
router.post('/', handleLogin);

module.exports = router;         // Exportiert die Routen