const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const tokensPath = path.join(__dirname, '../data/passwordResetTokens.json');

async function saveResetToken(email, token, expiry) {
    const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));
    tokens.push({ email, token, expiry });
    fs.writeFileSync(tokensPath, JSON.stringify(tokens));
}

async function getResetToken(token) {
    const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));
    return tokens.find(entry => entry.token === token);
}

async function updatePassword(email, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // Logic to update the user password in the database.
    console.log(`Updated password for ${email}`);
}

module.exports = { saveResetToken, getResetToken, updatePassword };