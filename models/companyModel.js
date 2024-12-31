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
    const companies = await getCompanies(); // Lade bestehende Firmen
    const hashedPassword = await bcrypt.hash(company.password, 10); // Verschlüsselt das Passwort mit Bcrypt

    companies.push({
        name: company.name, // Name der Firma
        department: company.department, // Abteilung
        password: company.password, // Unverschlüsseltes Passwort (gewünscht)
        hashpassword: hashedPassword, // Verschlüsseltes Passwort
    });

    await fs.writeFile(companiesPath, JSON.stringify(companies, null, 2)); // Speichere die aktualisierten Daten
}

// Funktion: Validiert die Anmeldedaten
async function validateCompany(name, department, inputPassword) {
    const companies = await getCompanies(); // Lade bestehende Firmen
    const company = companies.find(c => c.name === name && c.department === department); // Suche nach der Firma und Abteilung

    if (!company) {
        console.log('Firma nicht gefunden'); // Debugging-Log
        return false; // Gibt `false` zurück, wenn die Firma nicht existiert
    }

    if (!inputPassword || !company.hashpassword) {
        console.error('Passwort oder Hash fehlt:', { inputPassword, hash: company.hashpassword }); // Debugging-Log
        return false; // Gibt `false` zurück, wenn das Passwort oder der Hash fehlt
    }

    // Überprüft das eingegebene Passwort gegen den gespeicherten Hash
    const isPasswordValid = await bcrypt.compare(inputPassword, company.hashpassword);
    return isPasswordValid; // Gibt `true` zurück, wenn das Passwort korrekt ist
}

module.exports = { getCompanies, saveCompany, validateCompany }; // Exportiert die Funktionen