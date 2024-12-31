const express = require('express');
const router = express.Router();
const { renderAddCompany, handleAddCompany } = require('../controllers/companyController');

// GET-Route für das Formular
router.get('/add', renderAddCompany);

// POST-Route für die Verarbeitung der Firmendaten
router.post('/add', handleAddCompany);

module.exports = router;