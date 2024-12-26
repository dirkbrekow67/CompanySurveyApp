const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const companiesPath = path.join(__dirname, '../data/companies.json');

// Lade die Firmendaten aus der JSON-Datei
async function getCompanies() {
    try {
        const data = await fs.readFile(companiesPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        if (err.code === 'ENOENT') return []; // Rückgabe eines leeren Arrays, wenn die Datei nicht existiert
        throw err;
    }
}

// Validierung von Firmenname, Abteilungsname und Passwort
async function validateCompany(name, department, password) {
    const companies = await getCompanies();
    const company = companies.find(c => c.name === name && c.department === department);

    if (!company) return false;
    const isPasswordValid = await bcrypt.compare(password, company.password);
    return isPasswordValid;
}

module.exports = { validateCompany };