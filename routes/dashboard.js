const express = require('express');
const fs = require('fs');
const path = require('path');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.use(authMiddleware); // Authentifizierungsmiddleware

router.get('/', (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const logs = {
            accessLogs: fs.readFileSync(path.join(__dirname, '../logs/access.log'), 'utf8').split('\n').filter(Boolean),
            errorLogs: fs.readFileSync(path.join(__dirname, '../logs/errors.log'), 'utf8').split('\n').filter(Boolean),
            securityLogs: fs.readFileSync(path.join(__dirname, '../logs/security.log'), 'utf8').split('\n').filter(Boolean),
        };

        const paginatedLogs = {};
        for (const [key, value] of Object.entries(logs)) {
            const start = (page - 1) * limit;
            const end = page * limit;
            paginatedLogs[key] = value.slice(start, end);
        }

        res.json(paginatedLogs);
    } catch (error) {
        res.status(500).json({ error: 'Fehler beim Laden der Logs' });
    }
});

router.get('/results', (req, res) => {
    try {
        const { page = 1, limit = 10, company, department } = req.query;
        const resultsPath = path.join(__dirname, '../data/surveyResults.json');
        if (!fs.existsSync(resultsPath)) {
            return res.status(404).json({ error: 'Keine Ergebnisse gefunden' });
        }

        let surveyResults = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
        if (company) {
            surveyResults = surveyResults.filter(result => result.company === company);
        }
        if (department) {
            surveyResults = surveyResults.filter(result => result.department === department);
        }

        const start = (page - 1) * limit;
        const end = page * limit;

        res.json({
            results: surveyResults.slice(start, end),
            total: surveyResults.length,
        });
    } catch (error) {
        res.status(500).json({ error: 'Fehler beim Laden der Ergebnisse' });
    }
});

router.get('/statistics', (req, res) => {
    try {
        const resultsPath = path.join(__dirname, '../data/surveyResults.json');
        if (!fs.existsSync(resultsPath)) {
            return res.status(404).json({ error: 'Keine Ergebnisse gefunden' });
        }

        const surveyResults = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
        const totalResponses = surveyResults.length;

        const averageRatings = surveyResults.reduce((acc, result) => {
            Object.keys(result).forEach((key) => {
                if (key.startsWith('q')) { // Nur Fragen berücksichtigen
                    acc[key] = (acc[key] || 0) + parseInt(result[key], 10);
                }
            });
            return acc;
        }, {});

        Object.keys(averageRatings).forEach((key) => {
            averageRatings[key] = (averageRatings[key] / totalResponses).toFixed(2);
        });

        res.json({
            totalResponses,
            averageRatings,
        });
    } catch (error) {
        res.status(500).json({ error: 'Fehler beim Laden der Statistiken' });
    }
});

module.exports = router;