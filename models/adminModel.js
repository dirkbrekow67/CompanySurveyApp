const bcrypt = require('bcryptjs'); // CommonJS-Syntax

function hashPassword(password) {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
}

function comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
}

function findAdminByEmail(email) {
    return admins.find(admin => admin.email === email);
}

const admins = [
    {
        name: 'Admin1',
        email: 'admin1@example.com',
        hashpassword: bcrypt.hashSync('securePassword123', 10),
    },
    {
        name: 'Admin2',
        email: 'admin2@example.com',
        hashpassword: bcrypt.hashSync('anotherSecurePassword456', 10),
    },
];

module.exports = { hashPassword, comparePassword, findAdminByEmail, admins };