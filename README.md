## Neue Funktionen

### Benutzeraktivitäts-Logging
- Protokolliert Aktionen wie Login, Logout und Ergebnisbearbeitung.
- Logs befinden sich in `logs/activity.log`.

### Ergebnisfilterung
- Admins können Ergebnisse nach Firma und Abteilung filtern.
- Filterfunktion ist über das Dashboard verfügbar.

### Logout-Endpunkt
- Endpunkt: `POST /auth/logout`
- Zerstört die Benutzersitzung und protokolliert die Abmeldung.

### Installation und Nutzung
- Installieren Sie alle Abhängigkeiten:
  ```bash
  npm install