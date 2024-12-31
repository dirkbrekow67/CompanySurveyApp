const { saveCompany } = require('../models/companyModel');

// GET-Controller: Zeigt das Formular zum Hinzufügen einer neuen Firma
function renderAddCompany(req, res) {
    res.render('addCompany', { error: null }); // Rendert die `addCompany`-View und setzt die Fehlermeldung standardmäßig auf `null`
}

// POST-Controller: Speichert die neue Firma
async function handleAddCompany(req, res) {
    const { name, department, password, startDate, endDate } = req.body;

    try {
        // Validierung
        if (!name || !department || !password || !startDate || !endDate) {
            return res.render('addCompany', { error: 'Alle Felder sind erforderlich' });
        }

        // Firma speichern
        await saveCompany({ name, department, password, startDate, endDate });
        res.redirect('/dashboard'); // Weiterleitung nach erfolgreicher Speicherung
    } catch (error) {
        console.error('Fehler beim Speichern der Firma:', error);
        res.status(500).render('addCompany', { error: 'Serverfehler beim Speichern der Firma' });
    }
}

module.exports = { renderAddCompany, handleAddCompany }; // Exportiert die Funktionen