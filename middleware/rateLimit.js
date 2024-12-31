const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 Minuten
    max: 100, // Maximal 100 Anfragen
    message: { error: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.' },
});

module.exports = limiter;