const { validateCompany } = require('../models/companyModel');


function renderLogin(req, res) {
    res.render('login', { error: null });
}

// Handle login form submission
async function handleLogin(req, res) {
    const { companyName, departmentName, hashpassword } = req.body;

    try {
        const isValid = await validateCompany(companyName, departmentName, hashpassword);

        console.log('Eingegebene Daten:', { companyName, departmentName, password });

        if (!isValid) {
            return res.render('login', { error: 'Ungültige Anmeldedaten', language: 'de' });
        }

        // Bei erfolgreicher Anmeldung weiterleiten
        res.redirect(`/dashboard?company=${encodeURIComponent(companyName)}&department=${encodeURIComponent(departmentName)}`);
    } catch (error) {
        console.error('Login-Fehler:', error);
        res.status(500).send('Serverfehler');
    }
}

module.exports = { renderLogin, handleLogin };