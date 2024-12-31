module.exports = (req, res, next) => {
    if (!req.query.company || !req.query.department) {
        return res.redirect('/login');
    }
    next();
};