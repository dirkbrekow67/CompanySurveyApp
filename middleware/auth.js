module.exports = (req, res, next) => {
    if (!req.session || !req.session.isLoggedIn) {
        return res.status(401).send('Unauthorized: Please log in.');
    }
    next();
};