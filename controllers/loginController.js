const { validateCompany } = require('../models/companyModel');

async function handleLogin(req, res) {
    const { companyName, departmentName, password } = req.body;

    try {
        const isValid = await validateCompany(companyName, departmentName, password);

        if (!isValid) {
            return res.render('login', { error: 'Ungültige Anmeldedaten', language: 'de' });
        }

        res.redirect('/dashboard'); // Umleitung bei erfolgreicher Anmeldung
    } catch (error) {
        console.error('Login-Fehler:', error);
        res.status(500).send('Serverfehler');
    }
}

module.exports = { renderLogin, handleLogin };