const getTranslation = require('../utils/i18n');

module.exports = (req, res, next) => {
    const lang = req.headers['accept-language'] || 'en';
    const t = getTranslation(lang);

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: t('REQUIRED_FIELDS') });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: t('INVALID_EMAIL') });
    }

    if (password.length < 8) {
        return res.status(400).json({ error: t('INVALID_PASSWORD') });
    }

    next();
};