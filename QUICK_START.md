# Y2Y Leadership Readiness Index - Gyors Indítás

## ✅ Kész van!

Az email küldő rendszer készen áll. Most már:
- ✅ Backend API létrehozva
- ✅ Email küldés Nodemailer-rel
- ✅ Adatbázis (JSON) az email címek tárolására
- ✅ Frontend integrálva a backend-del
- ✅ Biztonsági funkciók (rate limiting, CORS, Helmet)

## 🚀 Indítás 3 lépésben

### 1. Backend konfiguráció

Hozz létre egy `.env` fájlt a `backend` mappában:

```bash
cd backend
copy .env.example .env
```

Szerkeszd a `.env` fájlt és add meg:
- Gmail címed
- Gmail App Password-öt (lásd `backend/SETUP.md`)

### 2. Backend indítása

**Windows:**
```bash
# A projekt gyökér mappájából:
start-backend.bat
```

**Vagy manuálisan:**
```bash
cd backend
npm start
```

### 3. Frontend megnyitása

Nyisd meg a `y2y-leadership-readiness-index.jsx` fájlt egy böngészőben (pl. Live Server-rel).

## 📧 Hogyan működik?

1. **Felhasználó kitölti a kérdőívet** → 8 dimenzió értékelése
2. **Eredmények megjelennek** → Pontszámok és szintek
3. **Email cím megadása** → Felhasználó beírja az email címét
4. **Backend feldolgozza:**
   - Elmenti az adatokat (`backend/submissions.json`)
   - Küld egy **részletes riportot** a felhasználónak
   - Küld egy **értesítést** neked (dorka@y2y.hu)

## 📊 Tárolt adatok

Az összes kitöltés mentésre kerül a `backend/submissions.json` fájlba:
- Email cím
- 8 dimenzió pontszámai
- Kitöltés időpontja

## 🔍 Admin funkciók

Lekérheted az összes kitöltést:
```
GET http://localhost:3001/api/submissions
```

## 🛠️ Hibaelhárítás

### Email nem megy ki
1. Ellenőrizd a backend konzol logokat
2. Nézd meg a `backend/SETUP.md` fájlt
3. Ellenőrizd a Gmail App Password beállítást

### "Fetch failed" hiba
- Ellenőrizd, hogy a backend fut-e (http://localhost:3001/api/health)
- Ellenőrizd a CORS beállításokat

### Port foglalt
Változtasd meg a `PORT` értéket a `.env` fájlban

## 📁 Fájlstruktúra

```
ground by y2y/
├── y2y-leadership-readiness-index.jsx  # Frontend
├── start-backend.bat                    # Backend indító script
├── backend/
│   ├── server.js                        # Express szerver
│   ├── database.js                      # JSON adatbázis
│   ├── emailService.js                  # Email küldés
│   ├── package.json                     # Függőségek
│   ├── .env                             # Konfiguráció (TITKOS!)
│   ├── .env.example                     # Példa konfig
│   ├── submissions.json                 # Tárolt kitöltések
│   └── SETUP.md                         # Részletes beállítás
```

## 🎯 Következő lépések

1. Állítsd be a `.env` fájlt
2. Indítsd el a backend-et
3. Teszteld egy email címmel
4. Ellenőrizd a beérkező emaileket (spam mappa is!)

Minden kész! 🎉
