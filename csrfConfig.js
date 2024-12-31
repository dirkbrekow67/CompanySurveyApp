// csrfConfig.js: Konfiguration der CSRF-Middleware
// csrfConfig.js: Konfiguration der CSRF-Middleware
const csrf = require('csrf-csrf');

// Initialisierung der CSRF-Middleware
const { csrfSynchronisedProtection, csrfToken } = csrf({
    getTokenFromRequest: (req) => req.body._csrf, // Token aus Anfrage lesen
});

// Exporte für app.js
module.exports = { csrfSynchronisedProtection, csrfToken };