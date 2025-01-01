const express = require('express');
const { getAdmins, addAdmin, removeAdmin } = require('../models/adminModel');
const accessControl = require('../middleware/accessControl');
const router = express.Router();

router.get('/', accessControl('Betriebsarzt'), async (req, res) => {
    const admins = await getAdmins();
    res.json(admins);
});

router.post('/', accessControl('User'), async (req, res) => {
    const { username, email, password, role } = req.body;
    await addAdmin({ username, email, password, role });
    res.status(201).json({ message: 'Admin hinzugefügt' });
});

router.delete('/:email', accessControl('User'), async (req, res) => {
    const { email } = req.params;
    await removeAdmin(email);
    res.status(200).json({ message: 'Admin entfernt' });
});

module.exports = router;