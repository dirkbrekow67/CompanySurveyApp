const express = require('express');
const { getDataByUser } = require('../models/dataModel');
const accessControl = require('../middleware/accessControl');
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

module.exports = router;