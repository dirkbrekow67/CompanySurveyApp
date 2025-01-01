const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { saveResetToken, getResetToken, updatePassword } = require('../models/passwordResetModel');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const router = express.Router();

router.post('/request', async (req, res) => {
    const { email } = req.body;

    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Ungültige E-Mail-Adresse' });
    }
    const token = crypto.randomBytes(32).toString('hex');
    const expiry = Date.now() + 3600000; // 1 Stunde gültig

    await saveResetToken(email, token, expiry);

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Passwort zurücksetzen',
        text: `Hier ist Ihr Link zum Zurücksetzen des Passworts: ${req.protocol}://${req.get('host')}/password-reset/${token}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'E-Mail zum Zurücksetzen gesendet' });
    } catch (error) {
        res.status(500).json({ error: 'Fehler beim Senden der E-Mail' });
    }
});

router.post('/reset/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const resetEntry = await getResetToken(token);
    if (!resetEntry || resetEntry.expiry < Date.now()) {
        return res.status(400).json({ error: 'Token ist ungültig oder abgelaufen' });
    }

    await updatePassword(resetEntry.email, password);
    res.status(200).json({ message: 'Passwort erfolgreich geändert' });
});

module.exports = router;