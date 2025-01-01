const express = require('express');
const fs = require('fs');
const path = require('path');
const { Parser } = require('json2csv');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        const resultsPath = path.join(__dirname, '../data/surveyResults.json');
        if (!fs.existsSync(resultsPath)) {
            return res.status(404).json({ error: 'Keine Ergebnisse gefunden' });
        }

        const surveyResults = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
        const json2csvParser = new Parser();
        const csv = json2csvParser.parse(surveyResults);

        res.header('Content-Type', 'text/csv');
        res.attachment('survey_results.csv');
        res.send(csv);
    } catch (error) {
        res.status(500).json({ error: 'Fehler beim Exportieren der Ergebnisse' });
    }
});

module.exports = router;