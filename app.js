// app.js
const express = require('express'); // Lädt das Express-Framework
const app = express();              // Erstellt eine Express-App

// Middleware für statische Dateien
app.use(express.static('public'));

// Starten des Servers
const PORT = process.env.PORT || 3000; // Verwendet Umgebungsvariable oder Port 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Startet den Server