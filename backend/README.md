# Y2Y Leadership Readiness Index - Backend

Email küldő és adattároló backend a Leadership Readiness Index alkalmazáshoz.

## Telepítés

1. Másold át a `.env.example` fájlt `.env` névre:
```bash
copy .env.example .env
```

2. Töltsd ki a `.env` fájlt a saját adataiddal:
   - **Gmail használata esetén:**
     - EMAIL_HOST: `smtp.gmail.com`
     - EMAIL_PORT: `587`
     - EMAIL_USER: a Gmail címed
     - EMAIL_PASS: Gmail App Password (nem a normál jelszavad!)
     - Hogyan készíts App Password-öt: https://support.google.com/accounts/answer/185833

3. Telepítsd a függőségeket:
```bash
npm install
```

## Használat

### Fejlesztői mód (auto-restart):
```bash
npm run dev
```

### Éles mód:
```bash
npm start
```

A szerver alapértelmezetten a `http://localhost:3001` címen fut.

## API Endpointok

### POST /api/submit-results
Email küldés és eredmények mentése.

**Request body:**
```json
{
  "email": "user@example.com",
  "scores": [4.2, 3.8, 4.5, 3.9, 4.1, 3.7, 4.3, 4.0]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sikeresen elküldve!"
}
```

### GET /api/submissions
Összes kitöltés lekérdezése (admin célra).

### GET /api/health
Szerver állapot ellenőrzése.

## Adatbázis

Az alkalmazás SQLite adatbázist használ (`emails.db`), amely automatikusan létrejön az első indításkor.

**Tábla struktúra:**
- `id`: Egyedi azonosító
- `email`: Felhasználó email címe
- `scores`: JSON formátumban tárolt pontszámok
- `submitted_at`: Kitöltés időpontja
- `email_sent`: Email küldés státusza

## Biztonság

- Rate limiting: max 10 kérés / 15 perc
- Helmet.js biztonsági headerek
- CORS védelem
- Email validáció
- Környezeti változók használata érzékeny adatokhoz

## Hibaelhárítás

### Gmail App Password létrehozása:
1. Google Account beállítások
2. Security → 2-Step Verification (be kell kapcsolni)
3. App passwords → Select app: Mail → Generate
4. Másold be a generált jelszót a `.env` fájlba

### "Invalid login" hiba:
- Ellenőrizd, hogy App Password-öt használsz-e (nem a normál jelszavadat)
- Ellenőrizd, hogy a 2-Step Verification be van-e kapcsolva

### Port már használatban:
Változtasd meg a PORT értéket a `.env` fájlban.
