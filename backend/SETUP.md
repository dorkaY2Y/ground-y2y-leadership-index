# Backend Beállítási Útmutató

## 1. Hozd létre a `.env` fájlt

A `backend` mappában hozz létre egy `.env` fájlt a következő tartalommal:

```env
PORT=3001
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=dorka@y2y.hu
EMAIL_PASS=YOUR_GMAIL_APP_PASSWORD_HERE
EMAIL_FROM=dorka@y2y.hu
RECIPIENT_EMAIL=dorka@y2y.hu
NODE_ENV=development
```

## 2. Gmail App Password beállítása

**FONTOS:** Ne használd a normál Gmail jelszavadat! App Password kell:

### Lépések:
1. Menj a Google Account beállításokhoz: https://myaccount.google.com/
2. **Security** → **2-Step Verification** (ha nincs bekapcsolva, kapcsold be!)
3. Görgess le az **App passwords** részhez
4. Kattints **App passwords**-ra
5. Válaszd: **Mail** vagy **Other** → írd be: "Y2Y Leadership"
6. Kattints **Generate**
7. Másold ki a 16 karakteres jelszót (pl: `abcd efgh ijkl mnop`)
8. Illeszd be a `.env` fájlba az `EMAIL_PASS` értékéhez (szóközök nélkül: `abcdefghijklmnop`)

## 3. Szerver indítása

```bash
cd backend
npm start
```

Vagy fejlesztői módban (auto-restart):
```bash
npm run dev
```

## 4. Tesztelés

A szerver a `http://localhost:3001` címen fut.

Ellenőrizd: http://localhost:3001/api/health

## Hibaelhárítás

### "Invalid login" hiba
- Ellenőrizd, hogy App Password-öt használsz (nem normál jelszót)
- Ellenőrizd, hogy 2-Step Verification be van kapcsolva
- Próbáld újra generálni az App Password-öt

### Port foglalt
Változtasd meg a `PORT` értéket a `.env` fájlban (pl. 3002)

### Email nem érkezik meg
- Ellenőrizd a spam mappát
- Nézd meg a backend konzol logokat
- Ellenőrizd, hogy a `RECIPIENT_EMAIL` jó-e
