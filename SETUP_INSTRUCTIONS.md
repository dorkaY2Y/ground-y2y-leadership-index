# ✅ Email Küldés Beállítása - Lépésről Lépésre

## 🎯 Amit csinálni fogsz (15 perc):

1. Google Form létrehozása (5 perc)
2. Apps Script email automatizálás (5 perc)
3. Form URL-ek beillesztése a kódba (2 perc)
4. Tesztelés (3 perc)

---

## 📝 1. LÉPÉS: Google Form Létrehozása

### 1.1 Form létrehozása

1. Menj ide: https://forms.google.com
2. Kattints a **+ Blank form** (üres űrlap) gombra
3. Cím: **Y2Y Leadership Readiness Index - Eredmények**
4. Leírás: **Automatikus eredmény küldés**

### 1.2 Mezők hozzáadása

Adj hozzá **9 darab Short answer** mezőt (kattints a jobb oldali + gombra):

**1. mező:**
- Kérdés: `Email cím`
- Típus: Short answer
- ✅ Required (kötelező)

**2. mező:**
- Kérdés: `Önismeret pontszám`
- Típus: Short answer

**3. mező:**
- Kérdés: `Érzelmi intelligencia pontszám`
- Típus: Short answer

**4. mező:**
- Kérdés: `Kommunikáció pontszám`
- Típus: Short answer

**5. mező:**
- Kérdés: `Döntéshozatal pontszám`
- Típus: Short answer

**6. mező:**
- Kérdés: `Vízió és stratégia pontszám`
- Típus: Short answer

**7. mező:**
- Kérdés: `Csapatépítés pontszám`
- Típus: Short answer

**8. mező:**
- Kérdés: `Változáskezelés pontszám`
- Típus: Short answer

**9. mező:**
- Kérdés: `Etika és integritás pontszám`
- Típus: Short answer

### 1.3 Settings beállítása

Kattints a **Settings** (fogaskerék) ikonra:

**General:**
- ❌ Collect email addresses (KI legyen kapcsolva!)
- ❌ Limit to 1 response
- ❌ Respondents can edit after submit

Kattints **Save**.

---

## 📊 2. LÉPÉS: Google Sheets Összekapcsolása

1. A form-ban kattints a **Responses** tabra (felül)
2. Kattints a zöld **Sheets** ikonra (Create Spreadsheet)
3. Válaszd: **Create a new spreadsheet**
4. Kattints **Create**

Megnyílik a Google Sheets - itt fognak tárolódni az összes kitöltés.

---

## ⚙️ 3. LÉPÉS: Apps Script Email Automatizálás

### 3.1 Apps Script megnyitása

1. A Google Sheets-ben: **Extensions** → **Apps Script**
2. Töröld ki az alapértelmezett kódot
3. Másold be az alábbi teljes kódot:

```javascript
function onFormSubmit(e) {
  try {
    const responses = e.namedValues;
    const userEmail = responses['Email cím'][0];
    const scores = [
      parseFloat(responses['Önismeret pontszám'][0]),
      parseFloat(responses['Érzelmi intelligencia pontszám'][0]),
      parseFloat(responses['Kommunikáció pontszám'][0]),
      parseFloat(responses['Döntéshozatal pontszám'][0]),
      parseFloat(responses['Vízió és stratégia pontszám'][0]),
      parseFloat(responses['Csapatépítés pontszám'][0]),
      parseFloat(responses['Változáskezelés pontszám'][0]),
      parseFloat(responses['Etika és integritás pontszám'][0])
    ];
    
    sendUserEmail(userEmail, scores);
    sendNotificationEmail(userEmail, scores);
    
  } catch (error) {
    Logger.log('Error: ' + error.toString());
  }
}

function sendUserEmail(userEmail, scores) {
  const dimensions = [
    { name: "Önismeret", icon: "🧠" },
    { name: "Érzelmi intelligencia", icon: "❤️" },
    { name: "Kommunikáció", icon: "💬" },
    { name: "Döntéshozatal", icon: "🎯" },
    { name: "Vízió és stratégia", icon: "🔭" },
    { name: "Csapatépítés", icon: "🤝" },
    { name: "Változáskezelés", icon: "🔄" },
    { name: "Etika és integritás", icon: "⚖️" }
  ];
  
  const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  
  let scoreRows = '';
  for (let i = 0; i < dimensions.length; i++) {
    const score = scores[i];
    const level = getScoreLevel(score);
    const percentage = (score / 5) * 100;
    
    scoreRows += `
      <tr>
        <td style="padding: 16px; border-bottom: 1px solid #e2e8f0;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 24px;">${dimensions[i].icon}</span>
            <strong style="color: #1e293b;">${dimensions[i].name}</strong>
          </div>
        </td>
        <td style="padding: 16px; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <strong style="color: #1e293b; font-size: 18px;">${score.toFixed(1)}</strong>
          <span style="color: #64748b; font-size: 14px;">/5.0</span>
        </td>
        <td style="padding: 16px; border-bottom: 1px solid #e2e8f0;">
          <div style="background: #f1f5f9; border-radius: 8px; height: 24px; overflow: hidden;">
            <div style="background: ${level.color}; height: 100%; width: ${percentage}%;"></div>
          </div>
        </td>
        <td style="padding: 16px; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <span style="background: ${level.color}; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;">
            ${level.label}
          </span>
        </td>
      </tr>
    `;
  }
  
  const overallLevel = getScoreLevel(avgScore);
  
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Y2Y Leadership Readiness Index - Eredményeid</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    
    <div style="background: linear-gradient(135deg, #2d5bff 0%, #00c2a8 100%); border-radius: 16px; padding: 40px; text-align: center; margin-bottom: 32px;">
      <h1 style="color: white; margin: 0 0 12px 0; font-size: 32px; font-weight: 700;">
        🎯 Leadership Readiness Index
      </h1>
      <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 16px;">
        A te személyre szabott vezetői fejlődési riportod
      </p>
    </div>

    <div style="background: white; border-radius: 16px; padding: 32px; margin-bottom: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
      <h2 style="color: #1e293b; margin: 0 0 16px 0; font-size: 24px;">Összesített eredményed</h2>
      <div style="text-align: center; padding: 24px;">
        <div style="font-size: 64px; font-weight: 700; color: ${overallLevel.color}; margin-bottom: 8px;">
          ${avgScore.toFixed(1)}
        </div>
        <div style="font-size: 18px; color: #64748b; margin-bottom: 16px;">/ 5.0</div>
        <span style="background: ${overallLevel.color}; color: white; padding: 8px 24px; border-radius: 16px; font-size: 16px; font-weight: 600; display: inline-block;">
          ${overallLevel.label}
        </span>
      </div>
    </div>

    <div style="background: white; border-radius: 16px; padding: 32px; margin-bottom: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
      <h2 style="color: #1e293b; margin: 0 0 24px 0; font-size: 24px;">Részletes eredmények</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background: #f8fafc;">
            <th style="padding: 12px 16px; text-align: left; color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase;">Dimenzió</th>
            <th style="padding: 12px 16px; text-align: center; color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase;">Pontszám</th>
            <th style="padding: 12px 16px; color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase;">Vizualizáció</th>
            <th style="padding: 12px 16px; text-align: center; color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase;">Szint</th>
          </tr>
        </thead>
        <tbody>
          ${scoreRows}
        </tbody>
      </table>
    </div>

    <div style="background: linear-gradient(135deg, rgba(45,91,255,0.1) 0%, rgba(0,194,168,0.1) 100%); border: 2px solid rgba(45,91,255,0.3); border-radius: 16px; padding: 32px; margin-bottom: 24px;">
      <h2 style="color: #1e293b; margin: 0 0 16px 0; font-size: 24px;">📈 Következő lépések</h2>
      <p style="color: #475569; line-height: 1.6; margin: 0 0 16px 0;">
        Gratulálunk az értékelés elvégzéséhez! Ez az első lépés a vezetői fejlődésed útján.
      </p>
      <ul style="color: #475569; line-height: 1.8; margin: 0; padding-left: 24px;">
        <li>Elemezd a gyengébb területeidet és tűzz ki konkrét fejlődési célokat</li>
        <li>Kérj visszajelzést kollégáidtól és mentoroktól</li>
        <li>Vegyél részt vezetőfejlesztő programokon</li>
        <li>Ismételd meg az értékelést 3-6 hónap múlva a fejlődésed nyomon követéséhez</li>
      </ul>
    </div>

    <div style="text-align: center; padding: 24px; color: #94a3b8; font-size: 14px;">
      <p style="margin: 0 0 8px 0;">
        <strong style="color: #1e293b;">Y2Y Leadership Development</strong>
      </p>
      <p style="margin: 0;">
        Kérdésed van? Írj nekünk: <a href="mailto:dorka@y2y.hu" style="color: #2d5bff; text-decoration: none;">dorka@y2y.hu</a>
      </p>
    </div>

  </div>
</body>
</html>
  `;
  
  MailApp.sendEmail({
    to: userEmail,
    subject: '🎯 A te Leadership Readiness Index eredményeid',
    htmlBody: htmlBody
  });
}

function sendNotificationEmail(userEmail, scores) {
  const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  
  const dimensions = [
    "Önismeret", "Érzelmi intelligencia", "Kommunikáció", 
    "Döntéshozatal", "Vízió és stratégia", "Csapatépítés", 
    "Változáskezelés", "Etika és integritás"
  ];
  
  let scoreList = '';
  for (let i = 0; i < dimensions.length; i++) {
    scoreList += `<li><strong>${dimensions[i]}:</strong> ${scores[i].toFixed(1)} / 5.0</li>`;
  }
  
  MailApp.sendEmail({
    to: 'dorka@y2y.hu',
    subject: `Új Leadership Index kitöltés: ${userEmail}`,
    htmlBody: `
      <h2>Új kitöltés érkezett</h2>
      <p><strong>Email:</strong> ${userEmail}</p>
      <p><strong>Átlagos pontszám:</strong> ${avgScore.toFixed(2)} / 5.0</p>
      <p><strong>Időpont:</strong> ${new Date().toLocaleString('hu-HU')}</p>
      <hr>
      <h3>Részletes pontszámok:</h3>
      <ul>${scoreList}</ul>
    `
  });
}

function getScoreLevel(score) {
  if (score >= 4.5) return { label: "Kiváló", color: "#10B981" };
  if (score >= 3.5) return { label: "Jó", color: "#3B82F6" };
  if (score >= 2.5) return { label: "Fejleszthető", color: "#F59E0B" };
  return { label: "Kezdő", color: "#EF4444" };
}
```

4. **Save project** (Ctrl+S vagy floppy disk ikon)
5. Projekt név: **Y2Y Email Automation**

### 3.2 Trigger beállítása

1. Bal oldali menü: **Triggers** (óra ikon ⏰)
2. Jobb alsó sarokban: **+ Add Trigger**
3. Beállítások:
   - **Choose which function to run:** `onFormSubmit`
   - **Choose which deployment should run:** `Head`
   - **Select event source:** `From spreadsheet`
   - **Select event type:** `On form submit`
4. **Save**

### 3.3 Engedélyek megadása

Első mentéskor kéri az engedélyeket:

1. **Review permissions**
2. Válaszd ki a Google fiókod
3. **Advanced** → **Go to Y2Y Email Automation (unsafe)**
4. **Allow**

---

## 🔗 4. LÉPÉS: Form URL-ek Megszerzése

### 4.1 Form Action URL

1. Menj vissza a Google Form-hoz
2. Kattints jobb felül a **Send** gombra
3. Kattints a **Link** (🔗) ikonra
4. Másold ki az URL-t - valami ilyesmi lesz:
   ```
   https://docs.google.com/forms/d/e/1FAIpQLSc...xyz.../viewform
   ```

5. **FONTOS:** Cseréld le a végét:
   - `viewform` → `formResponse`
   
   Tehát így kell kinéznie:
   ```
   https://docs.google.com/forms/d/e/1FAIpQLSc...xyz.../formResponse
   ```

### 4.2 Entry ID-k megszerzése

1. A form-ban kattints a **Preview** (szem ikon 👁️) gombra
2. Nyomd meg **F12** (Developer Tools)
3. Kattints a **Network** tabra
4. Töltsd ki a form-ot BÁRMILYEN adattal és kattints **Submit**
5. A Network tab-ban keresd meg a `formResponse` kérést
6. Kattints rá → **Payload** vagy **Form Data** tab
7. Látni fogod az entry ID-kat:
   ```
   entry.123456789: email@example.com
   entry.987654321: 4.5
   entry.111222333: 3.8
   ...stb
   ```

8. Másold ki az entry ID-kat (a számokat az `entry.` után)

---

## 📝 5. LÉPÉS: Kód Frissítése

Nyisd meg a `y2y-leadership-readiness-index.jsx` fájlt és keresd meg ezt a részt (kb. 615. sor):

```javascript
const GOOGLE_FORM_ACTION_URL = "YOUR_GOOGLE_FORM_URL_HERE";
```

Cseréld le a saját URL-edre:

```javascript
const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSc...xyz.../formResponse";
```

Majd alatta cseréld le az entry ID-kat:

```javascript
formData.append("entry.EMAIL_ENTRY_ID", email);  // → entry.123456789
formData.append("entry.SCORE1_ENTRY_ID", scores[0].toFixed(2));  // → entry.987654321
formData.append("entry.SCORE2_ENTRY_ID", scores[1].toFixed(2));  // → entry.111222333
// ...stb
```

---

## ✅ 6. LÉPÉS: Tesztelés

1. Nyisd meg a frontend-et böngészőben
2. Töltsd ki a kérdőívet
3. Add meg az email címed
4. Kattints **Küldés** gombra
5. Ellenőrizd:
   - ✅ Google Sheets-ben megjelent az új sor
   - ✅ Email megérkezett (spam mappa is!)
   - ✅ Te is kaptál értesítést (dorka@y2y.hu)

---

## 🎉 Kész vagy!

Most már:
- ✅ Nincs backend szükség
- ✅ Nincs jelszó kezelés
- ✅ Automatikus email küldés
- ✅ Automatikus adattárolás
- ✅ Teljesen ingyenes

**Ha elakadtál valahol, szólj!**
