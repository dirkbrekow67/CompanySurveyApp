// routes/loginRoutes.js: Routen für Benutzer-Login und Fragebogen
const express = require('express');
const router = express.Router();
const { handleLogin } = require('../controllers/loginController');
const { saveSurveyResults } = require('../models/surveyModel');

// GET: Login-Seite anzeigen
router.get('/', (req, res) => {
    res.render('login', { error: null });
});

// POST: Login-Daten verarbeiten
router.post('/', handleLogin);


router.post('/survey/submit', async (req, res) => {
    const { company, department } = req.query;
    const { q1, q2 } = req.body;

    await saveSurveyResults(company, department, { q1, q2 });

    res.send('Vielen Dank für Ihre Teilnahme!');
});

module.exports = router;