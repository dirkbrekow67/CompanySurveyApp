const csrf = require('csrf-csrf');

const { csrfSynchronisedProtection, csrfToken } = csrf({
    getTokenFromRequest: (req) => req.body._csrf || req.query._csrf,
});

module.exports = { csrfSynchronisedProtection, csrfToken };