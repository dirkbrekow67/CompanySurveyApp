// models/adminModel.js: Verwaltung der Admin-Daten
const bcrypt = require('bcrypt');

// Beispiel-Admins mit gehashten Passwörtern
const admins = [
    {
        name: 'Admin1',
        email: 'admin1@example.com',
        hashpassword: '$2b$10$...', // Gehashtes Passwort
    },
    {
        name: 'Admin2',
        email: 'admin2@example.com',
        hashpassword: '$2b$10$...', // Gehashtes Passwort
    },
];

// Funktion: Passwort sicher hashen
async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

// Funktion: Neuen Admin hinzufügen
async function addAdmin(name, email, password) {
    const hashpassword = await hashPassword(password); // Passwort hashen
    admins.push({ name, email, hashpassword });
    console.log('Neuer Admin hinzugefügt:', name);
}

// Exporte
module.exports = { admins, hashPassword, addAdmin };