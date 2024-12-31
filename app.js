// app.js: Hauptanwendungsdatei
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const { csrfSynchronisedProtection, csrfToken } = require('./csrfConfig');

const loginRoutes = require('./routes/loginRoutes'); // Benutzer-Login-Routen
const adminRoutes = require('./routes/adminRoutes'); // Admin-Login-Routen

const limiter = require('./middleware/rateLimit');

const logger = require('./middleware/logger');

const app = express();

// Middleware für Sessions (für Authentifizierung)
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
}));

// Body-Parser aktivieren
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(limiter); // Globale Anwendung des Limiters

// Logging-Middleware
app.use(logger);

// CSRF-Schutz aktivieren
app.use(csrfSynchronisedProtection);

// CSRF-Token in Views bereitstellen
app.use((req, res, next) => {
    res.locals.csrfToken = csrfToken(req);
    next();
});

// Statische Dateien bereitstellen
app.use(express.static(path.join(__dirname, 'public')));

app.use((err, req, res, next) => {
    if (err.code === 'EBADCSRFTOKEN') {
        res.status(403).send('Ungültiger CSRF-Token. Bitte laden Sie die Seite neu.');
    } else {
        next(err); // Andere Fehler weiterleiten
    }
});

// Template-Engine für Views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routen für Benutzer und Admins
app.get('/', (req, res) => {
    res.redirect('/login'); // Weiterleitung zur Login-Seite
});
app.use('/login', loginRoutes); // Benutzer-Login
app.use('/admin', adminRoutes); // Admin-Login
app.get('/survey', (req, res) => {
    res.render('survey', { company: req.query.company, department: req.query.department }); // Fragebogen anzeigen
});

// Beispiel: Admin-Login-Seite
app.get('/admin/login', (req, res) => {
    res.render('adminLogin'); // CSRF-Token ist verfügbar
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login'); // Zur Login-Seite zurückleiten
});

// Globale Fehlerbehandlung
app.use((err, req, res, next) => {
    console.error(err.stack); // Fehler im Server-Log ausgeben
    res.status(500).send('Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
});

app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    next();
});

// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});