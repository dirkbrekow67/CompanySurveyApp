const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const logger = require('./middleware/logger'); // Logger-Middleware
const errorHandling = require('./middleware/errorHandling'); // Fehlerbehandlungs-Middleware
const auth = require('./middleware/auth'); // Authentifizierungs-Middleware

const companyRoutes = require('./routes/companyRoutes');
const loginRoutes = require('./routes/loginRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

// Logger-Middleware einbinden
app.use(logger);

// Session-Middleware einbinden
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
}));

// Body-Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Statische Dateien bereitstellen
app.use(express.static(path.join(__dirname, 'public')));

// Template-Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routen einbinden
app.use('/companies', companyRoutes);
app.use('/login', loginRoutes);
app.use('/dashboard', auth, dashboardRoutes); // Authentifizierungsmiddleware für Dashboard

// Fehlerbehandlung
app.use(errorHandling);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});