# FentaRochen – Pre-Release Plan & Dokumentation

## 1. Projekt-Steckbrief

| Kategorie | Details |
| :--- | :--- |
| **Projektname** | FentaRochen |
| **Plattform(en)** | Web (Desktop & Mobile Browser), PWA-fähig |
| **Technologie** | React 19, TypeScript, Vite, Tailwind CSS, Google Gemini API (GenAI SDK) |
| **Ziel-Environment** | Web Hosting (z.B. Vercel, Netlify, AWS Amplify) |
| **Domain** | **fentarochen.net** |
| **Cloud Server** | **https://cloud.fentarochen.net** |
| **Status** | v0.7.3 Beta (Feature Complete + Legal + Domain Config) |
| **CI/CD** | Empfohlen: GitHub Actions (Auto-Deploy bei Push auf Main) |
| **Tests** | Manuelle Tests (derzeit), Empfohlen: Vitest für Unit-Tests |
| **i18n** | Deutsch (Hardcoded DE-DE) |
| **Datenschutz** | Implementiert (Komponente `Legal.tsx` vorhanden) |
| **Security** | API-Key Schutz (Backend-Proxy empfohlen für Prod), HTTPS |
| **Integrationen** | Google Gemini (Text & Vision), Recharts (Visualisierung) |
| **Geplantes Release** | *Datum hier eintragen* |

---

## 2. Detaillierte Aufgaben-Checkliste (Nach Priorität)

Diese Liste führt dich von der aktuellen Beta zur Version 1.0.

### Prio A: Domain Konfiguration (fentarochen.net)

#### A1. DNS Setup (Domain verbinden)
*   **Zweck:** Die Website unter `fentarochen.net` erreichbar machen.
*   **To-Do:** Melde dich bei deinem Domain-Registrar (z.B. Ionos, GoDaddy, Namecheap) an.
*   **A-Record:** Setze einen A-Record auf die IP-Adresse deines Hostings (z.B. Vercel IP: `76.76.21.21`).
*   **CNAME:** Für Subdomains (wie `www.fentarochen.net`) setze einen CNAME auf den Hosting-Alias (z.B. `cname.vercel-dns.com`).
*   **Cloud Subdomain:** Für `cloud.fentarochen.net`, stelle sicher, dass dieser auf deinen Nextcloud-Server zeigt (nicht auf diese Web-App, sofern sie getrennt laufen).

#### A2. Produktions-Build optimieren
*   **Zweck:** Sicherstellen, dass die App minifiziert ist und keine Debug-Informationen leakt.
*   **Befehle:** `npm run build`
*   **Akzeptanz:** `npm run preview` startet die App fehlerfrei.

### Prio B: Sicherheit & Rechtliches

#### B1. Environment Variables absichern
*   **To-Do:** `.env` Datei prüfen (darf nicht ins Git!), Hosting-Provider Secrets konfigurieren.

#### B2. Impressum & Datenschutz (Privacy Policy)
*   **Status:** ✅ Erledigt (`components/Legal.tsx`).

### Prio C: Deployment

#### C1. Hosting Setup
*   **Zweck:** Die Welt Zugriff gewähren.
*   **To-Do:** Account bei Vercel/Netlify erstellen, Repo verknüpfen.
*   **WICHTIG:** Trage in den Hosting-Einstellungen unter "Domains" deine Domain `fentarochen.net` ein.

---

## 3. Mini-Tutorials für die wichtigsten Aufgaben

### Tutorial 1: Der Release-Build (Vite)

Um die App für die Produktion vorzubereiten, darfst du nicht den Dev-Server nutzen.

**Schritt 1: Build starten**
```bash
# Im Terminal:
npm run build
```
*Dies erstellt einen `dist` Ordner mit optimiertem Code.*

### Tutorial 2: Deployment auf Vercel (Beispiel)

Vercel ist ideal für React/Vite Apps.

1.  **Repo pushen:** Stelle sicher, dass dein Code auf GitHub/GitLab liegt.
2.  **Vercel Dashboard:** Gehe auf [vercel.com/new](https://vercel.com/new).
3.  **Import:** Wähle dein `FentaRochen` Repository.
4.  **Framework Preset:** Vercel erkennt meist automatisch "Vite". Falls nicht, wähle es aus.
5.  **Environment Variables (WICHTIG):**
    *   Klicke auf "Environment Variables".
    *   Name: `API_KEY` (oder wie du ihn im Code nennst, oft `VITE_API_KEY` bei Vite).
    *   Value: `Dein_Google_Gemini_Key_Hier`.
6.  **Deploy:** Klicke auf "Deploy".
7.  **Domain:** Gehe in Vercel zu Settings > Domains und füge `fentarochen.net` hinzu.

---

## 4. Finale Release-Checklist (Copy-Paste)

Kopiere diese Liste in dein Ticket-System oder nutze sie hier:

- [ ] **Code Freeze:** Keine neuen Features mehr hinzufügen.
- [ ] **Linting:** `npm run lint` (falls konfiguriert) läuft ohne Fehler.
- [ ] **Build:** `npm run build` erfolgreich.
- [ ] **API Key:** Key ist in der Produktionsumgebung hinterlegt (NICHT im Code).
- [ ] **Domain:** DNS Records für `fentarochen.net` sind propagiert.
- [ ] **Cloud:** Verbindung zu `https://cloud.fentarochen.net` geprüft.
- [x] **Legal:** Datenschutzhinweis ist sichtbar.
- [ ] **Final Deployment:** Push auf `main` Branch durchgeführt.

---

## 5. Minimale Test-Prozedur (Smoke Test)

Führe diese Schritte nach dem Deployment auf der **echten URL** durch:

1.  **Start:** Seite laden unter `fentarochen.net`.
2.  **Navigation:** Klicke auf "Daten" (Specs).
    *   *Erwartet:* Header zeigt "Verbunden mit: https://cloud.fentarochen.net".
3.  **Legal Check:** Klicke im Footer auf "Impressum & Datenschutz".
4.  **Chat (Comms):** Teste eine Nachricht.
