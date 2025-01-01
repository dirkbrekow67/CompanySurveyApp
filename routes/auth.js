const express = require('express');
const activityLogger = require('../middleware/activityLogger');
const router = express.Router();

router.post('/logout', (req, res) => {
    activityLogger('Logout durchgeführt', req.body.email);
    req.session.destroy(() => {
        res.status(200).json({ message: 'Erfolgreich abgemeldet' });
    });
});

module.exports = router;