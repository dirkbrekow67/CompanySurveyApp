// Validiert Eingaben im Formular
document.querySelector('form').addEventListener('submit', function (e) {
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);

    if (endDate < startDate) {
        e.preventDefault(); // Verhindert das Absenden des Formulars
        alert('Das Enddatum darf nicht vor dem Startdatum liegen.');
    }
});