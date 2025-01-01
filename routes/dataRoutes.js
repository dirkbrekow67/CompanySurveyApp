const express = require('express');
const { getDataByUser } = require('../models/dataModel');
const accessControl = require('../middleware/accessControl');
const { Parser } = require('json2csv');
const activityLogger = require('../middleware/activityLogger');
const router = express.Router();

router.get('/', accessControl('User'), async (req, res) => {
    const user = req.session.user; // Angenommen: Benutzerinfo ist in der Session gespeichert
    let data;

    if (user.role === 'Administrator' || user.role === 'Betriebsarzt') {
        data = JSON.parse(fs.readFileSync('../data/data.json', 'utf8'));
    } else if (user.role === 'User') {
        data = await getDataByUser(user.email);
    }

    res.status(200).json(data);
});

router.delete('/:id', accessControl('User'), async (req, res) => {
    const { id } = req.params;
    const user = req.session.user;

    const data = JSON.parse(fs.readFileSync('../data/data.json', 'utf8'));
    const entry = data.find(item => item.id === id);

    if (!entry) {
        return res.status(404).json({ error: 'Datensatz nicht gefunden' });
    }

    if (entry.createdBy !== user.email && user.role !== 'Administrator') {
        return res.status(403).json({ error: 'Keine Berechtigung zum Löschen' });
    }

    const updatedData = data.filter(item => item.id !== id);
    fs.writeFileSync('../data/data.json', JSON.stringify(updatedData));

    res.status(200).json({ message: 'Datensatz gelöscht' });
});

router.get('/search', accessControl('User'), async (req, res) => {
    const { query, start, end } = req.query;
    const user = req.session.user;

    let data = JSON.parse(fs.readFileSync('../data/data.json', 'utf8'));

    // Filtern basierend auf Benutzerrolle
    if (user.role === 'User') {
        data = data.filter(entry => entry.createdBy === user.email);
    }

    // Suchlogik
    if (query) {
        data = data.filter(entry => entry.data.toLowerCase().includes(query.toLowerCase()));
    }

    if (start) {
        data = data.filter(entry => new Date(entry.createdAt) >= new Date(start));
    }

    if (end) {
        data = data.filter(entry => new Date(entry.createdAt) <= new Date(end));
    }

    res.status(200).json(data);
});

router.get('/export', accessControl('User'), async (req, res) => {
    const data = JSON.parse(fs.readFileSync('../data/data.json', 'utf8'));
    const csvParser = new Parser();
    const csv = csvParser.parse(data);

    res.header('Content-Type', 'text/csv');
    res.attachment('search_results.csv');
    res.send(csv);
});

// Anwenden der Middleware auf alle Datenoperationen
router.use(activityLogger);

router.post('/add', dataController.addData);
router.delete('/:id', dataController.deleteData);

module.exports = router;