document.querySelector('form').addEventListener('submit', function (e) {
    const name = document.getElementById('name').value.trim();
    const department = document.getElementById('department').value.trim();
    const password = document.getElementById('password').value;

    const errorDiv = document.getElementById('error');
    errorDiv.innerHTML = ''; // Fehlerfeld leeren

    if (!name || !department || !password) {
        e.preventDefault(); // Verhindert das Absenden des Formulars
        errorDiv.innerHTML = 'Alle Felder sind erforderlich';
        return;
    }

    // Passwortvalidierung
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{12,}$/;
    if (!passwordRegex.test(password)) {
        e.preventDefault();
        errorDiv.innerHTML = 'Das Passwort muss mindestens 12 Zeichen, Großbuchstaben, Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten';
        return;
    }
});