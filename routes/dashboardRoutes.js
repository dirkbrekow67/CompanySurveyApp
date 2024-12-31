const express = require('express');
const router = express.Router();
const { renderDashboard } = require('../controllers/dashboardController');
const auth = require('../middleware/auth');

// GET-Route: Rendert die Dashboard-Seite für angemeldete Benutzer
router.get('/', auth, renderDashboard);

router.get('/admin', (req, res) => {
    // Admin-Daten könnten später aus einer Datenbank kommen
    const admins = [
        { username: 'admin1', email: 'admin1@example.com' },
        { username: 'admin2', email: 'admin2@example.com' }
    ];
    res.render('adminDashboard', { admins });
});

module.exports = router; // Exportiert die Routen, damit sie in `app.js` eingebunden werden können