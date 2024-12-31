const csrf = require('csrf-csrf');
const { doubleCsrf } = require("csrf-csrf");

// const {
//    invalidCsrfTokenError, // This is just for convenience if you plan on making your own middleware.
//    generateToken, // Use this in your routes to provide a CSRF hash + token cookie and token.
//    validateRequest, // Also a convenience if you plan on making your own middleware.
//    doubleCsrfProtection, // This is the default CSRF protection middleware.
  // } = doubleCsrf(doubleCsrfOptions);

  const { csrfSynchronisedProtection, csrfToken } = doubleCsrf({
    getTokenFromRequest: (req) => req.body._csrf || req.query._csrf,
});

//const { csrfSynchronisedProtection, csrfToken } = csrf({
//    getTokenFromRequest: (req) => req.body._csrf || req.query._csrf,
//});

module.exports = { csrfSynchronisedProtection, csrfToken };