// Middleware: Überprüft, ob ein Benutzer eingeloggt ist
module.exports = (req, res, next) => {
    if (!req.session || !req.session.isLoggedIn) {
        return res.redirect('/login'); // Weiterleitung zur Login-Seite, falls nicht eingeloggt
    }
    next(); // Weiterleitung zur nächsten Middleware oder Route
};