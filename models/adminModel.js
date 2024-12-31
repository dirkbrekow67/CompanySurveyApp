// models/adminModel.js: Admin-Daten
const admins = [
    {
        name: 'Admin1',
        email: 'admin1@example.com',
        hashpassword: '$2b$10$...', // Beispiel-Hash
        secret: 'KJASHDKJASHD' // Beispiel-2FA-Schlüssel
    },
    {
        name: 'Admin2',
        email: 'admin2@example.com',
        hashpassword: '$2b$10$...' // Beispiel-Hash
    }
];

async function getAdmins() {
    return admins; // Gibt die Admin-Daten zurück
}

module.exports = { getAdmins };