const rateLimit = require('express-rate-limit');

const strictLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10, // Nur 10 Anfragen pro 15 Minuten
    message: { error: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.' },
});

const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, // 100 Anfragen pro 15 Minuten
    message: { error: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.' },
});

module.exports = { strictLimiter, generalLimiter };