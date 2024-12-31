const express = require('express');
const router = express.Router();
const { getCompanies } = require('../models/companyModel');
const fs = require('fs').promises;
const path = require('path');

// GET: Alle Firmen anzeigen
router.get('/all', async (req, res) => {
    const companies = await getCompanies(); // Lädt alle Firmen
    res.json(companies); // Gibt Firmen als JSON zurück
});

// POST: Bearbeiten einer Firma
router.post('/edit/:id', async (req, res) => {
    const { name, department, startDate, endDate } = req.body;
    const companies = await getCompanies();
    const company = companies.find(c => c.id === parseInt(req.params.id));

    if (company) {
        // Aktualisieren der Firmendaten
        company.name = name;
        company.department = department;
        company.startDate = startDate;
        company.endDate = endDate;

        await fs.writeFile(
            path.join(__dirname, '../data/companies.json'),
            JSON.stringify(companies, null, 2)
        );
    }

    res.redirect('/dashboard'); // Weiterleitung nach dem Bearbeiten
});

// POST: Löschen einer Firma
router.post('/delete/:id', async (req, res) => {
    const companies = await getCompanies();
    const updatedCompanies = companies.filter(c => c.id !== parseInt(req.params.id));

    await fs.writeFile(
        path.join(__dirname, '../data/companies.json'),
        JSON.stringify(updatedCompanies, null, 2)
    );

    res.redirect('/dashboard'); // Weiterleitung nach dem Löschen
});

module.exports = router; // Exportieren der Routen