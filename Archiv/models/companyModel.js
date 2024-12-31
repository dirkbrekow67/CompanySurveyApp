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
async function validateCompany(name, department, inputPassword) {
    const companies = await getCompanies();
    const company = companies.find(c => c.name === name && c.department === department);

    console.log('Gefundene Firma:', company); // Debug

    if (!company) {
        console.log('Firma nicht gefunden');return false};

        console.log('Passwort eingeben:', inputPassword);
        console.log('Gespeicherter Hash:', company.hashpassword);

    // Vergleiche das eingegebene Passwort mit dem gespeicherten Hash
    const isPasswordValid = await bcrypt.compare(inputPassword, company.hashpassword);
    return isPasswordValid;
}
async function saveCompany(company) {
    // Unverschlüsseltes Passwort bleibt
    const companies = await getCompanies();
    // Doppelte Firma und Abteilung prüfen
    const exists = companies.some(c => c.name === company.name && c.department === company.department);
    if (exists) {
        throw new Error('Die Firma und Abteilung existieren bereits');
    }

    const hashedPassword = await bcrypt.hash(company.password, 10);
    companies.push({
        name: company.name,
        department: company.department,
        password: company.password,
        hashpassword: hashedPassword,
    });

    await fs.writeFile(companiesPath, JSON.stringify(companies, null, 2));
}

module.exports = { validateCompany, saveCompany, getCompanies };
