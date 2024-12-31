const express = require('express');
const router = express.Router();
const { getCompanies } = require('../models/companyModel');
const fs = require('fs').promises;
const path = require('path');
const { Parser } = require('json2csv'); // JSON zu CSV konvertieren

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

router.get('/search', async (req, res) => {
    const { query } = req.query; // Suchparameter aus der URL abrufen
    const companies = await getCompanies();

    // Firmen filtern, die den Suchbegriff enthalten
    const filteredCompanies = companies.filter(company =>
        company.name.toLowerCase().includes(query.toLowerCase()) ||
        company.department.toLowerCase().includes(query.toLowerCase())
    );

    res.json(filteredCompanies); // Gefilterte Firmen zurückgeben
});

router.get('/export', async (req, res) => {
    const companies = await getCompanies();

    const fields = ['name', 'department', 'startDate', 'endDate'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(companies);

    res.header('Content-Type', 'text/csv');
    res.attachment('companies.csv');
    res.send(csv);
});

module.exports = router; // Exportieren der Routen