# Google Forms + Apps Script Beállítási Útmutató

## Miért ez a jobb megoldás?

✅ **Teljesen ingyenes** - nincs limit, nincs költség
✅ **Biztonságos** - nem kell jelszavakat megadni
✅ **Automatikus adattárolás** - Google Sheets-ben minden kitöltés
✅ **Automatikus email küldés** - Apps Script kezeli
✅ **Nincs backend szükség** - egyszerűbb, kevesebb karbantartás

---

## 1. lépés: Google Form létrehozása

1. Menj a <https://forms.google.com>
2. Kattints a **+ Blank form** gombra
3. Add meg a form címét: **"Y2Y Leadership Readiness Index - Eredmények"**

### Mezők hozzáadása:

Adj hozzá **9 Short answer** mezőt:

1. **Email cím** (Short answer, Required)
2. **Önismeret pontszám** (Short answer)
3. **Érzelmi intelligencia pontszám** (Short answer)
4. **Kommunikáció pontszám** (Short answer)
5. **Döntéshozatal pontszám** (Short answer)
6. **Vízió és stratégia pontszám** (Short answer)
7. **Csapatépítés pontszám** (Short answer)
8. **Változáskezelés pontszám** (Short answer)
9. **Etika és integritás pontszám** (Short answer)

**Settings:**
- Kapcsold ki: "Collect email addresses"
- Kapcsold ki: "Limit to 1 response"
- Kapcsold be: "Allow response editing"

---

## 2. lépés: Responses Sheet létrehozása

1. A form-ban kattints a **Responses** tabra
2. Kattints a zöld Sheets ikonra
3. **Create a new spreadsheet** → Create

Megnyílik a Google Sheets, ahol minden kitöltés automatikusan tárolódik.

---

## 3. lépés: Apps Script email küldés beállítása

1. A Google Sheets-ben: **Extensions** → **Apps Script**
2. Töröld a meglévő kódot
3. Másold be ezt a kódot:

```javascript
function onFormSubmit(e) {
  try {
    // Form válaszok
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
    
    // Email küldés a felhasználónak
    sendUserEmail(userEmail, scores);
    
    // Értesítés neked
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

4. **Save project** (Ctrl+S) - nevezd el: "Y2Y Email Automation"
5. **Deploy** → **New deployment**:
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Deploy
   - Másold ki a **Web app URL**-t (később kell!)

---

## 4. lépés: Trigger beállítása

1. Apps Script-ben: bal oldali menü → **Triggers** (óra ikon)
2. **Add Trigger**:
   - Function: `onFormSubmit`
   - Event source: **From spreadsheet**
   - Event type: **On form submit**
   - Save

**Engedélyek megadása:**
- Kattints **Review permissions**
- Válaszd ki a Google fiókod
- **Advanced** → **Go to [project name] (unsafe)**
- **Allow**

---

## 5. lépés: Form URL megszerzése

1. Menj vissza a Google Form-hoz
2. Jobb felül: **Send** gomb
3. Kattints a **<>** (link) ikonra
4. Másold ki a form URL-t

**VAGY** a form ID-t:
- URL formátuma: `https://docs.google.com/forms/d/FORM_ID/edit`
- Másold ki a `FORM_ID` részt

---

## 6. lépés: Frontend módosítása

A frontend kódban cseréld le az email küldést Google Forms submit-ra.

Szükséges adatok:
- **Form ID**: `[a fenti FORM_ID]`
- **Mező ID-k**: A form mezőinek entry ID-i

Mező ID-k megszerzése:
1. Form → **Preview** (szem ikon)
2. Jobb klikk → **Inspect** (F12)
3. Keresd meg az input mezőket: `name="entry.XXXXXXXX"`

---

## ✅ Kész!

Most már:
- ✅ Nincs szükség backend-re
- ✅ Nincs szükség jelszavakra
- ✅ Automatikus email küldés
- ✅ Automatikus adattárolás Google Sheets-ben
- ✅ Teljesen ingyenes

**Következő:** Add meg a Form ID-t és a mező ID-kat, hogy frissítsem a frontend kódot!
