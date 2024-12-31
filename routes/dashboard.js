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

module.exports = router;