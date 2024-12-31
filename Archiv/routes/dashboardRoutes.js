const express = require('express');
const router = express.Router();

// Render the dashboard
router.get('/', (req, res) => {
    const { company, department } = req.query;
    res.render('dashboard/index', { company, department });
});

module.exports = router;