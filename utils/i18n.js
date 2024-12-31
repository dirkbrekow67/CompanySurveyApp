const translations = {
    en: {
        INVALID_EMAIL: 'Invalid email address',
        INVALID_PASSWORD: 'Password must be at least 8 characters long',
        REQUIRED_FIELDS: 'Email and password are required',
    },
    de: {
        INVALID_EMAIL: 'Ungültige E-Mail-Adresse',
        INVALID_PASSWORD: 'Passwort muss mindestens 8 Zeichen lang sein',
        REQUIRED_FIELDS: 'E-Mail und Passwort sind erforderlich',
    },
};

module.exports = (lang = 'en') => (key) => translations[lang][key] || translations['en'][key];