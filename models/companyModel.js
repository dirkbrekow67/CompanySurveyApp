const fs = require('fs').promises; // Dateioperationen mit Promises
const path = require('path'); // Modul zum Arbeiten mit Dateipfaden
const bcrypt = require('bcrypt'); // Für die Passwortverschlüsselung und -validierung

const companiesPath = path.join(__dirname, '../data/companies.json'); // Pfad zur `companies.json`

// Funktion: Lädt die Firmendaten aus der JSON-Datei
async function getCompanies() {
    try {
        const data = await fs.readFile(companiesPath, 'utf8'); // Lese die Datei im UTF-8-Format
        return JSON.parse(data); // Parsen der JSON-Daten in ein JavaScript-Objekt
    } catch (err) {
        if (err.code === 'ENOENT') {
            return []; // Gibt ein leeres Array zurück, falls die Datei nicht existiert
        }
        throw err; // Wirft andere Fehler weiter
    }
}

// Funktion: Speichert eine neue Firma in der JSON-Datei
async function saveCompany(company) {
    const companies = await getCompanies(); // Bestehende Firmen laden
    const hashedPassword = await bcrypt.hash(company.password, 10); // Passwort verschlüsseln

    // Neue Firma hinzufügen
    companies.push({
        name: company.name, // Name der Firma
        department: company.department, // Abteilung
        password: company.password, // Klartextpasswort
        hashpassword: hashedPassword, // Hashpasswort
        startDate: company.startDate, // Startdatum
        endDate: company.endDate, // Ablaufdatum
    });

    // Aktualisierte Daten speichern
    await fs.writeFile(companiesPath, JSON.stringify(companies, null, 2));
}

// Funktion: Validiert die Anmeldedaten
async function validateCompany(name, department, inputPassword) {
    const companies = await getCompanies(); // Bestehende Firmen laden
    const company = companies.find(c => c.name === name && c.department === department);

    if (!company) {
        console.error('Firma oder Abteilung nicht gefunden');
        return false;
    }

    if (!inputPassword || !company.hashpassword) {
        console.error('Eingegebenes Passwort oder gespeicherter Hash fehlt');
        return false;
    }

    // Passwort validieren
    const isPasswordValid = await bcrypt.compare(inputPassword, company.hashpassword);
    return isPasswordValid;
}

module.exports = { getCompanies, saveCompany, validateCompany }; // Exportiert die Funktionen