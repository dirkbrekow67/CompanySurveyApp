module.exports = function (requiredRole) {
    return (req, res, next) => {
        const user = req.session.user; // Annahme: Benutzer ist in der Session gespeichert
        if (!user) {
            return res.status(401).json({ error: 'Nicht authentifiziert' });
        }

        if (user.role === 'Administrator' || user.role === requiredRole) {
            return next();
        }

        if (requiredRole === 'User' && user.role === 'User') {
            const ownerEmail = req.body.email || req.params.email;
            if (ownerEmail === user.email) {
                return next();
            }
        }

        return res.status(403).json({ error: 'Unzureichende Berechtigungen' });
    };
};