const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Middleware-Module importieren
const logger = require('./middleware/logger');
const errorHandling = require('./middleware/errorHandling');

const companyRoutes = require('./routes/companyRoutes');
const loginRoutes = require('./routes/loginRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

// Middleware: Logger
app.use(logger);

// Middleware: Body-Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Statische Dateien bereitstellen
app.use(express.static(path.join(__dirname, 'public')));

// Template-Engine setzen
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routen einbinden
app.use('/companies', companyRoutes);
app.use('/login', loginRoutes);
app.use('/dashboard', dashboardRoutes);

// Fehlerbehandlung-Middleware einbinden
app.use(errorHandling);

// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});