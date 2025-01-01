// routes/loginRoutes.js: Routen für Benutzer-Login und Fragebogen
const express = require('express');
const { saveSurveyResults } = require('../models/surveyModel');
const loginLogger = require('../middleware/loginLogger');
const loginController = require('../controllers/loginController');

const router = express.Router();


// GET: Login-Seite anzeigen
router.get('/', (req, res) => {
    res.render('login', { error: null });
});



router.post('/survey/submit', async (req, res, next) => {
    try {
        const { company, department } = req.query;
        const { q1, q2 } = req.body;

        await saveSurveyResults(company, department, { q1, q2 });

        res.send('Vielen Dank für Ihre Teilnahme!');
    } catch (error) {
        next(error); // Fehler an den globalen Fehlerhandler weitergeben
    }
});


router.post('/login', loginLogger, loginController.login);

module.exports = router;