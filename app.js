const express = require('express'); // Express-Framework für die Erstellung der Serveranwendung
const bodyParser = require('body-parser'); // Middleware zum Parsen von HTTP-POST-Daten
const path = require('path'); // Hilft beim Umgang mit Dateipfaden
const morgan = require('morgan');

// Importieren der benutzerdefinierten Routen
const companyRoutes = require('./routes/companyRoutes'); // Routen für die Verwaltung von Firmen
const loginRoutes = require('./routes/loginRoutes'); // Routen für die Login-Funktionalität
const dashboardRoutes = require('./routes/dashboardRoutes'); // Routen für das Dashboard

const app = express(); // Erstellt eine Express-Anwendung

// Middleware zum Parsen von Formular- und JSON-Daten
app.use(bodyParser.urlencoded({ extended: true })); // Für x-www-form-urlencoded-Daten
app.use(bodyParser.json()); // Für JSON-Daten

// Statische Dateien (CSS, JS, Bilder) bereitstellen
app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'));

// Setzt die Template-Engine auf EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routen registrieren
app.use('/companies', companyRoutes); // Registriert die Routen für Firmen
app.use('/login', loginRoutes); // Registriert die Routen für Login
app.use('/dashboard', dashboardRoutes); // Registriert die Routen für das Dashboard

app.use((req, res, next) => {
    res.status(404).send('Seite nicht gefunden');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Serverfehler');
});

// Startet den Server auf dem angegebenen Port
const PORT = process.env.PORT || 3000; // Verwendet entweder die Umgebungsvariable PORT oder 3000 als Standardwert
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`); // Bestätigung, dass der Server läuft
});