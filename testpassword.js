const validator = require('validator');

const password = '#Dan67niel!Helix';
const isPasswordStrong = validator.isStrongPassword(password, {
    minLength: 12,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
});

console.log('Ist das Passwort stark?', isPasswordStrong);