// routes/adminRoutes.js: Routen für Admin-Login
const express = require('express');
const router = express.Router();
const { handleAdminLogin } = require('../controllers/adminController');

// GET: Admin-Login-Seite anzeigen
router.get('/login', (req, res) => {
    res.render('adminLogin', { error: null });
});

// POST: Admin-Login-Daten verarbeiten
router.post('/login', handleAdminLogin);

module.exports = router;