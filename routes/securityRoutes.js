const express = require('express');
const fs = require('fs');
const path = require('path');
const { Parser } = require('json2csv');

const router = express.Router();

router.get('/logs', (req, res) => {
    const loginErrors = fs.readFileSync(path.join(__dirname, '../logs/loginErrors.log'), 'utf8').split('\n');
    const csrfIncidents = fs.readFileSync(path.join(__dirname, '../logs/csrfIncidents.log'), 'utf8').split('\n');
    const searchErrors = fs.readFileSync(path.join(__dirname, '../logs/searchErrors.log'), 'utf8').split('\n');

    res.json({
        loginErrors: loginErrors.filter(line => line.trim() !== ''),
        csrfIncidents: csrfIncidents.filter(line => line.trim() !== ''),
        searchErrors: searchErrors.filter(line => line.trim() !== ''),
    });
});

router.get('/export', (req, res) => {
    const logs = {
        loginErrors: fs.readFileSync(path.join(__dirname, '../logs/loginErrors.log'), 'utf8').split('\n'),
        csrfIncidents: fs.readFileSync(path.join(__dirname, '../logs/csrfIncidents.log'), 'utf8').split('\n'),
        searchErrors: fs.readFileSync(path.join(__dirname, '../logs/searchErrors.log'), 'utf8').split('\n'),
    };

    const csvParser = new Parser();
    const csv = csvParser.parse(logs);

    res.header('Content-Type', 'text/csv');
    res.attachment('security_logs.csv');
    res.send(csv);
});

module.exports = router;