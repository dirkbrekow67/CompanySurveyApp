const express = require('express');
const fs = require('fs');
const path = require('path');
const { Parser } = require('json2csv');
const router = express.Router();

router.get('/:logType', (req, res) => {
    const { logType } = req.params;
    const validLogs = ['access', 'errors', 'security'];
    if (!validLogs.includes(logType)) {
        return res.status(400).json({ error: 'Ungültiger Log-Typ' });
    }

    try {
        const logPath = path.join(__dirname, `../logs/${logType}.log`);
        if (!fs.existsSync(logPath)) {
            return res.status(404).json({ error: `Log-Datei ${logType}.log nicht gefunden` });
        }

        const logData = fs.readFileSync(logPath, 'utf8').split('\n').filter(Boolean);
        const parsedLogs = logData.map((entry) => {
            const [timestamp, message] = entry.split(']');
            return {
                timestamp: timestamp.replace('[', '').trim(),
                message: message.trim(),
            };
        });

        const json2csvParser = new Parser();
        const csv = json2csvParser.parse(parsedLogs);

        res.header('Content-Type', 'text/csv');
        res.attachment(`${logType}_logs.csv`);
        res.send(csv);
    } catch (error) {
        res.status(500).json({ error: 'Fehler beim Exportieren der Logs' });
    }
});

module.exports = router;