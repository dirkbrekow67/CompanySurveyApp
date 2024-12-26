// app.js
const express = require('express'); // Lädt das Express-Framework
const app = express();              // Erstellt eine Express-App
const loginRoutes = require('./routes/loginRoutes'); // Importiert die Login-Routen
const dashboardRoutes = require('./routes/dashboardRoutes');


// app.js
app.set('view engine', 'ejs');   // Setzt EJS als Template-Engine
app.set('views', './views');     // Definiert das Verzeichnis für Views

// Middleware für statische Dateien
app.use(express.static('public'));
app.use('/', loginRoutes);                           // Verknüpft die Login-Routen mit der Basis-URL
app.use('/dashboard', dashboardRoutes);

// Starten des Servers
const PORT = process.env.PORT || 3000; // Verwendet Umgebungsvariable oder Port 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Startet den Server