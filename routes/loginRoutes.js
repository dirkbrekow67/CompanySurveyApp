const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login');         // Rendert die Login-Seite
});

module.exports = router;         // Exportiert die Routen