const express = require('express');
const { getAdmins, addAdmin, removeAdmin } = require('../models/adminModel');
const router = express.Router();

router.get('/', async (req, res) => {
    const admins = await getAdmins();
    res.json(admins);
});

router.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    await addAdmin({ username, email, password });
    res.status(201).json({ message: 'Admin hinzugefügt' });
});

router.delete('/:email', async (req, res) => {
    const { email } = req.params;
    await removeAdmin(email);
    res.status(200).json({ message: 'Admin entfernt' });
});

module.exports = router;