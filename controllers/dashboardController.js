// GET-Controller: Zeigt das Dashboard an
function renderDashboard(req, res) {
    const { company, department } = req.query; // Extrahiert Firmen- und Abteilungsinformationen aus der URL
    res.render('dashboard', { company, department }); // Rendert die `dashboard`-View mit den übergebenen Daten
}

module.exports = { renderDashboard }; // Exportiert die Funktion