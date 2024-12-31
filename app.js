// app.js: Hauptanwendungsdatei
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const loginRoutes = require('./routes/loginRoutes'); // Benutzer-Login-Routen
const adminRoutes = require('./routes/adminRoutes'); // Admin-Login-Routen

const app = express();

// Middleware für Sessions (für Authentifizierung)
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
}));

// Middleware für Formular- und JSON-Daten
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Statische Dateien bereitstellen
app.use(express.static(path.join(__dirname, 'public')));

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

// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});