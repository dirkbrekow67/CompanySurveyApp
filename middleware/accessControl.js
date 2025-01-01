module.exports = function requiredRole(role) {
    return (req, res, next) => {
        const user = req.session.user; // Benutzerinformationen aus der Session
        if (!user || user.role !== role) {
            return res.status(403).send('Zugriff verweigert');
        }
        next();
    };
};