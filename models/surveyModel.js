const fs = require('fs').promises;
const path = require('path');
const resultsPath = path.join(__dirname, '../data/results.json');

async function saveSurveyResults(company, department, answers) {
    const data = { company, department, answers, submittedAt: new Date().toISOString() };
    const existingResults = await getSurveyResults();

    existingResults.push(data);
    await fs.writeFile(resultsPath, JSON.stringify(existingResults, null, 2));
}

async function getSurveyResults() {
    try {
        const data = await fs.readFile(resultsPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        if (err.code === 'ENOENT') {
            return []; // Falls Datei nicht existiert, leeres Array zurückgeben
        }
        throw err;
    }
}

module.exports = { saveSurveyResults, getSurveyResults };