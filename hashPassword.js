const bcrypt = require('bcrypt');

async function hashPassword() {
    const password = '12345678';
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
}

hashPassword();