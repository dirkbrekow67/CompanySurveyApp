const express = require('express');
const router = express.Router();
const { renderAddCompany, handleAddCompany } = require('../controllers/companyController');

// GET-Route: Rendert das Formular zum Hinzufügen einer neuen Firma
router.get('/add', renderAddCompany);

// POST-Route: Verarbeitet die Daten aus dem Formular und speichert die Firma
router.post('/add', handleAddCompany);

module.exports = router; // Exportiert die Routen, damit sie in `app.js` eingebunden werden können