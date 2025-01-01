const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const adminPath = path.join(__dirname, '../data/admins.json');

async function getAdmins() {
    return JSON.parse(fs.readFileSync(adminPath, 'utf8'));
}

async function addAdmin({ username, email, password, role = 'User' }) {
    const admins = await getAdmins();
    const hashedPassword = await bcrypt.hash(password, 10);
    admins.push({ username, email, password: hashedPassword, role });
    fs.writeFileSync(adminPath, JSON.stringify(admins));
}

async function removeAdmin(email) {
    const admins = await getAdmins();
    const updatedAdmins = admins.filter(admin => admin.email !== email);
    fs.writeFileSync(adminPath, JSON.stringify(updatedAdmins));
}

module.exports = { getAdmins, addAdmin, removeAdmin };