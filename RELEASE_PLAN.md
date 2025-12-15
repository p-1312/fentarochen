# FentaRochen – Deployment & Infrastruktur Guide

## 1. Projekt-Übersicht

| Kategorie | Details |
| :--- | :--- |
| **Projektname** | FentaRochen |
| **Live URL** | **https://fentarochen.net** |
| **Cloud Server** | **https://cloud.fentarochen.net** |
| **Status** | v0.7.3 Beta (Lokaler Test erfolgreich) |

---

## 2. Schritt-für-Schritt: Website Online bringen

Damit deine React-App unter `fentarochen.net` erreichbar ist, musst du sie "deployen". Wir nutzen hierfür **Vercel**, da es der Industriestandard für diese Art von Apps ist.

### Phase A: Code Hosting (GitHub)
1.  Erstelle einen Account auf [GitHub.com](https://github.com).
2.  Erstelle ein neues "Repository" (öffentlich oder privat).
3.  Lade deine Projektdateien hoch (alles AUSSER `node_modules` und `.env`).
    *   *Tipp:* Wenn du Git installiert hast, nutze im Terminal:
        ```bash
        git init
        git add .
        git commit -m "Initial Release"
        git branch -M main
        git remote add origin <DEINE_GITHUB_URL>
        git push -u origin main
        ```

### Phase B: Web Hosting (Vercel)
1.  Gehe auf [Vercel.com](https://vercel.com) und logge dich mit GitHub ein.
2.  Klicke "Add New Project" und importiere dein FentaRochen-Repository.
3.  **WICHTIG - Environment Variables:**
    *   Suche das Feld "Environment Variables".
    *   Füge hinzu: Name `API_KEY`, Wert `Dein_Google_Gemini_Key`.
4.  Klicke auf "Deploy".

### Phase C: Domain verbinden (DNS)
1.  Gehe im Vercel Dashboard zu deinem Projekt -> **Settings** -> **Domains**.
2.  Gib `fentarochen.net` ein und klicke Add.
3.  Vercel zeigt dir nun DNS-Daten an (meist ein **A-Record** mit IP `76.76.21.21`).
4.  Logge dich bei deinem Domain-Anbieter ein (IONOS, Strato, GoDaddy etc.).
5.  Gehe zur DNS-Verwaltung deiner Domain.
6.  Ändere den **A-Record (@)** auf die IP-Adresse, die Vercel dir angezeigt hat.
7.  Warte bis zu 24 Stunden (meist geht es in 1 Stunde), bis die Änderung weltweit aktiv ist.

---

## 3. Schritt-für-Schritt: Nextcloud Server einrichten

Damit die Adresse `https://cloud.fentarochen.net` wirklich funktioniert, benötigst du einen separaten Server. Diese React-App ist nur die "Fassade", die Nextcloud ist der "Lagerraum".

### Phase A: Server beschaffen
*   Du benötigst einen **Managed Nextcloud** Anbieter oder einen **VPS (Virtual Private Server)**.
*   *Empfehlung:* Hetzner Storage Share oder IONOS Managed Nextcloud.

### Phase B: Subdomain einrichten
1.  Gehe wieder zu deinem Domain-Anbieter (DNS-Verwaltung).
2.  Erstelle eine neue **Subdomain** namens `cloud` (also `cloud.fentarochen.net`).
3.  Setze den A-Record dieser Subdomain auf die **IP-Adresse deines Nextcloud-Servers** (diese IP bekommst du von deinem Hosting-Anbieter aus Phase A).

### Phase C: Verbindung prüfen
1.  Öffne `https://cloud.fentarochen.net` im Browser. Du solltest jetzt den echten Nextcloud-Login sehen.
2.  Gehe in deine FentaRochen Web-App (lokal oder online).
3.  Gehe auf **Profil**.
4.  Gib `https://cloud.fentarochen.net` ein und klicke "Verbinden".
5.  Die App bestätigt nun, dass die Adresse gültig ist (Simulation).

---

## 4. Wichtiger Hinweis zur "Echten" Datensynchronisation

Aktuell ist die Anzeige in der FentaRochen-App (`StorageDashboard.tsx` und `FileManager.tsx`) eine **Simulation** bzw. ein UI-Mockup. 

Um **echte** Dateien aus deiner Nextcloud in dieser Website anzuzeigen, wäre Entwicklungsarbeit nötig:
1.  **CORS:** Dein Nextcloud-Server muss so konfiguriert werden, dass er Anfragen von `fentarochen.net` erlaubt.
2.  **WebDAV:** Die App müsste umprogrammiert werden, um das WebDAV-Protokoll zu nutzen.
3.  **Auth:** Der Nutzer müsste sein Nextcloud-Passwort in der App eingeben.

*Für Version 1.0 bleibt die App ein Dashboard, das den Status anzeigt und auf die Nextcloud verlinkt, ohne die Dateien direkt zu streamen.*
