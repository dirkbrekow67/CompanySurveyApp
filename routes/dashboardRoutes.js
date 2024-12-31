const express = require('express');
const router = express.Router();
const { renderDashboard } = require('../controllers/dashboardController');
const auth = require('../middleware/auth');

// GET-Route: Rendert die Dashboard-Seite für angemeldete Benutzer
router.get('/', auth, renderDashboard);

module.exports = router; // Exportiert die Routen, damit sie in `app.js` eingebunden werden können