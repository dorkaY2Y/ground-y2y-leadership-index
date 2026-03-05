# 🧠 Ground by Y2Y — Windsurf Brief

## Mi ez?

**Ground** egy neuroscience-alapú vezetői tudatossági felmérés, amit a Y2Y Hungary Kft. (www.y2y.hu) használ lead generálásra. Nem ígéri, hogy jövőbiztos leszel. Megmutatja, hol állsz most. A felhasználó kitölt 24 kérdést, kap egy radar chart eredményt az oldalon, és emailért cserébe részletes riportot is kérhet.

---

## Projekt setup

Kérlek hozz létre egy **Vite + React + TypeScript** projektet az alábbi struktúrával:

```
y2y-leadership-index/
├── src/
│   ├── components/
│   │   ├── IntroScreen.tsx
│   │   ├── QuizScreen.tsx
│   │   ├── ResultScreen.tsx
│   │   ├── RadarChart.tsx
│   │   ├── ProgressBar.tsx
│   │   └── EmailCapture.tsx
│   ├── data/
│   │   ├── dimensions.ts
│   │   └── questions.ts
│   ├── lib/
│   │   └── supabase.ts
│   ├── utils/
│   │   └── scoring.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env.example
├── package.json
├── vercel.json
└── README.md
```

### Dependencies
- `react`, `react-dom`
- `@supabase/supabase-js` (lead capture)
- Tailwind CSS (styling)
- Google Fonts: **DM Sans** (body) + **Space Mono** (numbers, labels)

### Deploy target
- **Vercel** (legyen `vercel.json` konfigurálva)
- A `.env.example` tartalmazza: `VITE_SUPABASE_URL` és `VITE_SUPABASE_ANON_KEY`

---

## Design

### Vizuális irány
- **Sötét téma** — háttér: `#0B1120`, szöveg: `#E2E8F0`
- **Elegáns, tudományos érzet** — NEM Nők Lapja kvíz, hanem inkább Stanford/NeuroLeadership vibe
- Szubtilis háttér effektek: grain overlay, lassú lebegő radial gradient orbs
- Animációk: fade-up belépés, slide-in kérdések, radar chart rajzolódás
- Mobile-first, teljesen reszponzív

### Színpaletta (dimenzió-specifikus)
```
Kognitív Rugalmasság:       #2D5BFF (kék)
Bizonytalanság-tűrés:       #00C2A8 (türkiz)
Autonómia-tervezés:         #FF6B35 (narancs)
Pszichológiai Biztonság:    #A855F7 (lila)
Adaptív Döntéshozatal:      #F43F5E (piros)
Csoportkultúra-tudatosság:  #FACC15 (arany)
CTA gradient:               linear-gradient(135deg, #2D5BFF, #00C2A8)
```

---

## Az 5 dimenzió

Minden dimenzióhoz tartozik 4 kérdés (összesen 24).

### 1. Kognitív Rugalmasság 🧠
- Tudományos alap: Prefrontális kéreg aktivitás, kognitív flexibilitás (Diamond, 2013)
- Y2Y twist: Mennyire képes a vezető gyorsan váltani kontextusok, gondolkodási módok és ember-AI együttműködés között

### 2. Bizonytalanság-tűrés 🌊
- Tudományos alap: SCARF modell Certainty dimenzió (Rock, 2008), Intolerance of Uncertainty Scale (Buhr & Dugas, 2002)
- Y2Y twist: Hogyan kezeli a vezető a FLUX évtized kiszámíthatatlanságát és az állandó változást

### 3. Autonómia-tervezés 🎯
- Tudományos alap: SCARF modell Autonomy dimenzió (Rock, 2008), Self-Determination Theory (Deci & Ryan, 2000)
- Y2Y twist: Mennyire képes a vezető valódi döntési teret adni a csapatának ahelyett, hogy mikro-menedzselne

### 4. Pszichológiai Biztonság 🛡️
- Tudományos alap: Edmondson (1999), SCARF: Relatedness & Status (Rock, 2008)
- Y2Y twist: Mennyire teremt olyan közeget, ahol az emberek mernek hibázni, kérdezni és innoválni

### 5. Adaptív Döntéshozatal ⚡
- Tudományos alap: Dual-Process Theory (Kahneman, 2011), SCARF: Fairness (Rock, 2008)
- Y2Y twist: Hogyan hoz döntéseket gyorsan változó környezetben, mennyire ismeri fel saját kognitív torzításait

### 6. Csoportkultúra-tudatosság 🧩
- Tudományos alap: Riemann-féle csoportdinamikai modell (Riemann, 1961), Csoportkultúra-tipológia (távolság-közelség, változás-maradandóság tengelyek)
- Y2Y twist: Mennyire tudatosan alakítja a vezető a csapata kultúráját, és mennyire képes felismerni és kezelni a különböző kultúratípusok dinamikáját

---

## A 24 kérdés (4 kérdés × 6 dimenzió)

Minden kérdés szituáció-alapú, 5 válaszlehetőséggel (score: 1-5, de a felhasználó NEM látja a score-t). A válaszok felülről lefelé: legjobb → leggyengébb (de a megjelenítésnél random sorrendben jelenítsük meg a válaszokat!).

### KOGNITÍV RUGALMASSÁG

**K1:** Amikor egy jól bevált folyamatról kiderül, hogy már nem működik, hogyan reagálsz?
- Azonnal elkezdem keresni az alternatívákat és kísérletezni (5)
- Összegyűjtöm az adatokat és átgondolom a lehetőségeket (4)
- Megpróbálom először finomhangolni a meglévő folyamatot (3)
- Várok, hátha a helyzet magától rendeződik (2)
- Ragaszkodom a bevált módszerhez – eddig működött (1)

**K2:** Egy nap alatt stratégiai meetingről operatív tűzoltásba, onnan coaching beszélgetésbe váltasz. Hogyan éled meg?
- Élvezem a változatosságot, könnyen váltok módok között (5)
- Tudatosan készülök a váltásokra, szüneteket iktatok be (4)
- Megbirkózom vele, de a nap végére kimerülök (3)
- Nehezen váltok, az egyik téma gondolatai átszűrődnek a másikba (2)
- Ez a tempó szétszed – nem tudok egyikre sem fókuszálni (1)

**K3:** Egy kollégád radikálisan más megközelítést javasol egy projektre, mint amit te elképzeltél. Mi a reakciód?
- Kíváncsi vagyok – kérem, hogy fejtse ki részletesen az érveit (5)
- Meghallgatom, de közben összehasonlítom a sajátommal (4)
- Elfogadom, de belül azért fenntartásaim vannak (3)
- Udvariasan meghallgatom, de ragaszkodom az eredetihez (2)
- Frusztráló, hogy nem látja be, miért jobb az én elképzelésem (1)

**K4:** Az elmúlt félévben hányszor változtattál meg egy saját meggyőződésedet egy csapattag érvelése alapján?
- Többször – aktívan keresem azokat a helyzeteket, ahol tévedhetek (5)
- Néhányszor, és minden alkalommal tanultam belőle (4)
- Egyszer-kétszer, de nem volt könnyű beismernem (3)
- Nem igazán emlékszem ilyenre – általában nekem van igazam (2)
- A vezető dolga, hogy irányt mutasson, nem az, hogy folyton változtasson (1)

### BIZONYTALANSÁG-TŰRÉS

**K5:** Egy fontos projekt közben hirtelen megváltoznak a piaci feltételek. Mit teszel először?
- Gyorsan felmérem, mi változott, és az első 48 órában új tervet rakok össze (5)
- Összehívom a csapatot, hogy közösen értékeljük a helyzetet és adaptáljunk (4)
- Szünetet tartok, átgondolom a lehetőségeket, mielőtt reagálnék (3)
- Próbálom a meglévő tervet menteni amennyire lehet (2)
- Megbénulok – a kiszámíthatatlanság nagyon stresszessé tesz (1)

**K6:** Hogyan kommunikálsz a csapatoddal, amikor te sem tudod, mi lesz a következő negyedévben?
- Nyíltan mondom, hogy nem tudom – és közösen keressük az irányt (5)
- Megosztom, amit tudok, és keretet adok a bizonytalanságnak (4)
- Próbálom a bizonytalanságot "kontrollált üzenetekbe" csomagolni (3)
- Inkább várok, amíg lesz valami konkrétum, amit mondhatok (2)
- Megnyugtató üzeneteket küldök, még ha nem is teljesen reálisak (1)

**K7:** A te iparágadban komoly átalakulás várható a következő 3 évben (technológiai, szabályozási vagy piaci). Hogyan készülsz rá?
- Már most kísérletezek és építek új képességeket a csapatban (5)
- Van egy konkrét fejlődési tervem, ami rendszeresen frissül (4)
- Figyelemmel kísérem a trendeket, de még nem léptem konkrétan (3)
- Remélem, hogy a változás lassabb lesz, mint amit jósolnak (2)
- Majd alkalmazkodom, ha tényleg eljön – most más a prioritás (1)

**K8:** Vezetőként hogyan viszonyulsz a hosszú távú tervezéshez a jelenlegi környezetben?
- Rövid iterációkban gondolkodom, de van egy adaptálható vízióm (5)
- 3-6 hónapos ciklusokban tervezek, rugalmas kerettel (4)
- Éves tervet készítek, és negyedévente felülvizsgálom (3)
- Ragaszkodom az éves tervhez, különben elveszítem a fókuszt (2)
- Hosszú távú terv nélkül nem tudok vezetni (1)

### AUTONÓMIA-TERVEZÉS

**K9:** Egy csapattagod más módszert választ egy feladatra, mint amit te javasolnál. Mit teszel?
- Hagyom – az eredmény számít, nem az út (5)
- Megkérdezem, mi az indoka, és ha van logikája, támogatom (4)
- Elmondom a véleményem, de rábízom a döntést (3)
- Megpróbálom finoman a saját módszerem felé terelni (2)
- Megmondom, hogy csinálja az én módszeremmel – az bevált (1)

**K10:** Hogyan delegálsz egy komplex projektet?
- Megadom a célt és a kereteket, a hogyanra a csapat talál megoldást (5)
- Megbeszéljük együtt a megközelítést, utána ők viszik (4)
- Részletes tervet adok, de nyitott vagyok módosításokra (3)
- Részletes tervet adok és rendszeresen ellenőrzöm a haladást (2)
- Inkább magam csinálom – gyorsabb és biztosabb (1)

**K11:** Milyen gyakran kérsz státuszfrissítést a csapatodtól egy folyamatban lévő projektnél?
- A csapattal közösen alakítjuk ki a check-in ritmust a projekt igényei szerint (5)
- Heti egy rövid szinkron, a közbülső időben bízom bennük (4)
- Heti 2-3 alkalommal rákérdezek informálisan (3)
- Naponta szeretek tudni a státuszról (2)
- Folyamatosan figyelemmel kísérem és azonnal jelzek, ha eltérést látok (1)

**K12:** Egy junior kolléga hibázik egy fontos prezentációban. Mi a reakciód?
- Megbeszéljük, mit tanult belőle, és legközelebb ő fogja jobban csinálni (5)
- Átbeszéljük a hibát és közösen készítünk tervet a következőre (4)
- Segítek kijavítani, és felajánlom, hogy legközelebb átnézem előtte (3)
- Legközelebb én nézem át a prezentációt, mielőtt bemutatja (2)
- Legközelebb inkább én tartom a fontos prezentációkat (1)

### PSZICHOLÓGIAI BIZTONSÁG

**K13:** Egy meetingen senki nem mond ellent a te javaslatodnak. Hogyan értékeled ezt?
- Gyanús – aktívan provokálom a kritikus gondolkodást (5)
- Közvetlenül megkérdezem: "Mi az, ami ebben nem működhet?" (4)
- Megkérdezem, van-e kérdés vagy hozzáfűznivaló (3)
- Örülök, hogy egyetértenek, és lépünk tovább (2)
- Ez azt jelenti, hogy jó az ötletem – menjünk tovább (1)

**K14:** Milyen gyakran beszélsz nyíltan a saját hibáidról a csapatod előtt?
- Rendszeresen – ez teremti meg a közeget, ahol mások is mernek hibázni (5)
- Amikor releváns, megosztom a tanulságot belőle (4)
- Alkalmanként, ha segíti a helyzetet (3)
- Ritkán – a vezető legyen a stabil pont (2)
- Soha – a vezető gyengeségeit nem kell közszemlére tenni (1)

**K15:** Egy csapattagod zavartan bevallja, hogy nem érti az AI-t és fél, hogy el fogja veszíteni a munkáját. Mit válaszolsz?
- Megköszönöm az őszinteségét, és közösen készítünk fejlődési tervet (5)
- Normalizálom az érzést és konkrét támogatást ajánlok (4)
- Megnyugtatom, hogy nem lesz olyan vészes (3)
- Elmondom, hogy alkalmazkodnia kell – ez a jövő (2)
- Mindenki felelős a saját fejlődéséért – elérhető a képzés (1)

**K16:** Hogyan kezeled, ha egy megbeszélésen két kollégád hevesen vitatkozik?
- Facilitálom a vitát – elválasztom a személyt az ügytől és mélyítjük a megértést (5)
- Hagyom kibontakozni a vitát, de figyelek a hangnemre (4)
- Szünetet kérek és külön beszélek mindkettőjükkel (3)
- Gyorsan leállítom – a meetingen nem vitatkozunk (2)
- Eldöntöm a kérdést és lépünk tovább (1)

### ADAPTÍV DÖNTÉSHOZATAL

**K17:** Egy fontos döntésnél ellentmondásos adataid vannak. Mit teszel?
- Hozok egy "elég jó" döntést gyorsan, és iterálok az eredmények alapján (5)
- Meghatározom, mi az a minimum adat, ami a döntéshez kell, és azt megszerzem (4)
- Több adatot gyűjtök, amíg egyértelmű nem lesz a helyzet (3)
- Konzultálok a felettemmel vagy külső tanácsadóval (2)
- Várok, amíg teljesen tiszta lesz a kép – rossz döntés rosszabb, mint késői döntés (1)

**K18:** Az utolsó igazán nehéz döntésednél hogyan jutottál el a végső válaszig?
- Megnéztem az adatokat, meghallgattam az intuíciómat, és tudatosan mérlegeltem, hol mondanak mást (5)
- Elsősorban az adatokra támaszkodtam, de figyeltem a megérzéseimre is (4)
- Összegyűjtöttem az elérhető adatokat és azok alapján döntöttem (3)
- A megérzésemre hallgattam – eddig ritkán csapott be (2)
- Nem emlékszem, hogy tudatosan végig gondoltam volna a folyamatot (1)

**K19:** Visszavontál-e nyilvánosan egy korábbi döntésedet, amikor új információ érkezett?
- Igen, rendszeresen – a jó vezető korrigál, nem ragaszkodik (5)
- Igen, néhányszor – de nem volt könnyű (4)
- Egyszer-kétszer, kivételes helyzetben (3)
- Inkább csendben módosítok irányt (2)
- Nem – a következetesség fontosabb, mint a korrekció (1)

**K20:** Egy döntés meghozatala előtt mennyire vagy tudatában a saját kognitív torzításaidnak (pl. megerősítési torzítás, status quo torzítás)?
- Aktívan keresem a torzításaimat és rendszereket építek ellenük (5)
- Ismerem a főbb torzításokat és igyekszem figyelni rájuk (4)
- Hallottam róluk, de a gyakorlatban nehéz alkalmazni (3)
- Nem nagyon foglalkozom ezzel – ösztönösen döntök (2)
- Ez túl elméleti – a tapasztalat fontosabb (1)

### CSOPORTKULTÚRA-TUDATOSSÁG

**K21:** Hogyan jellemeznéd a csapatod jelenlegi működési kultúráját?
- Pontosan tudom, milyen kultúrát építünk, és tudatosan döntöttem így – ismerem az előnyeit és a korlátait is (5)
- Van egy elképzelésem róla, és időnként tudatosan formálom (4)
- Nem gondolkodtam még kultúra-kategóriákban, de érzem, mi működik (3)
- A kultúra magától alakult ki, nem nagyon foglalkozom vele (2)
- Nem értem, miért kellene ezen gondolkodni – csináljuk a dolgunkat (1)

**K22:** A csapatodban van, aki a stabilitást szereti, és van, aki a változást. Hogyan kezeled ezt a feszültséget?
- Tudatosan használom: a stabilitás-pártiak adják a keretet, a változás-pártiak az innovációt (5)
- Megpróbálom megértetni mindkét oldallal a másik nézőpontját (4)
- Általában az egyik oldal felé húzok, de tudom, hogy ez nem ideális (3)
- Frusztráló, hogy nem gondolkodik mindenki ugyanúgy (2)
- Akinek nem tetszik az irány, az alkalmazkodik vagy továbbáll (1)

**K23:** Egy új projekt indul. A csapatod egyik fele szoros együttműködést, közös ötletelést akar, a másik fele önálló munkát, tiszta felelősségi köröket. Mit teszel?
- Felmérem, melyik feladathoz melyik működési mód illik jobban, és ennek megfelelően szervezem a munkát (5)
- Kompromisszumot keresek: közös kickoff, utána önálló munka, rendszeres szinkron (4)
- Általában az egyik stílust választom, amit jobban ismerek (3)
- Megmondom, hogyan fogunk dolgozni – a vezető dönt a keretről (2)
- Nem gondolom, hogy ez lényeges – az eredmény számít, nem a módszer (1)

**K24:** Mennyire tudatosan váltasz vezetői stílust attól függően, hogy a csapatodnak épp struktúrára, innovációra, kapcsolódásra vagy önállóságra van szüksége?
- Tudatosan figyelem és diagnosztizálom, mire van szükség, és adaptálom a stílusomat (5)
- Érzem, mikor kell váltanom, és többnyire sikerül is (4)
- Van egy bevált stílusom, de néha kilépek belőle (3)
- Következetesen egy stílusban vezetek – az emberek tudják, mire számíthatnak (2)
- A jó vezető autentikus – nem kell szerepeket játszani (1)

---

## Scoring logika

### Dimenzió pontszám
Minden dimenzióban a 4 kérdés score-jának átlaga (1.0 – 5.0).

### Összesített profil

| Átlag score | Profil neve | Leírás |
|---|---|---|
| 4.2 – 5.0 | 🚀 Adaptív Vezető | Rendkívül fejlett változáskezelési és innovációs kapacitás. A FLUX évtized kihívásaira felkészült. |
| 3.4 – 4.19 | 📈 Fejlődő Stratéga | Erős alapok, aktív fejlődés. Néhány dimenzióban kiemelkedő, másokban van tér a növekedésre. |
| 2.6 – 3.39 | 🏗️ Stabil Alapozó | Bevált módszerekkel vezet. A FLUX évtized új kompetenciákat követel. |
| 1.0 – 2.59 | 🔄 Hagyományos Vezető | A bevált módszerekre épít. A következő évtized radikálisan más készségeket követel. |

### Dimenzió szintek

| Átlag | Szint | Szín |
|---|---|---|
| 4.2+ | Kiváló | #10B981 |
| 3.4 – 4.19 | Fejlett | #3B82F6 |
| 2.6 – 3.39 | Fejlődő | #F59E0B |
| < 2.6 | Fejlesztendő | #EF4444 |

---

## Válaszok megjelenítése

**FONTOS:** A válaszok sorrendjét RANDOM-osan keverd meg minden kérdésnél! A felhasználó NEM láthatja, hogy melyik a "legjobb" válasz. A score rejtve marad.

---

## Funkciók részletesen

### 1. Intro Screen
- Y2Y branding (logó opcionális, szöveges is jó)
- "Ground" mint főcím, nagy, merész tipográfiával
- "by Y2Y" alcímként, kisebb, elegánsabb
- Tagline: "Nem ígérjük, hogy jövőbiztos leszel. Megmutatjuk, hol állsz most."
- Az 6 dimenzió vizuális megjelenítése (ikonok + nevek)
- Tudományos háttér blokk (SCARF, Edmondson, Kahneman, Diamond, Riemann)
- "24 kérdés • 6 dimenzió • ~6 perc" statisztikák
- "Indítsd el a felmérést →" CTA gomb
- "Nincsenek jó vagy rossz válaszok." disclaimer

### 2. Quiz Screen
- Felül: progress bar (X / 24 kérdés + dimenzió neve)
- Dimenzió váltásnál: dimenzió ikon + név + tudományos alap megjelenítése
- A kérdés szövege nagy betűvel
- 5 válaszgomb (kattintásra azonnal továbblép, nincs "Tovább" gomb)
- Szép animáció a váltásnál (fade out → fade in)

### 3. Result Screen
- Profil emoji + "A te profilod" label + profil név
- Összesített score (X.X / 5.0)
- Profil leírás
- **SVG Radar Chart** (pókháló diagram) a 6 dimenzióval
  - 6 tengelyes pókháló, közepéből kifelé 1-5 szintek
  - Az adatpontok összekötve, kitöltve félátlátszóan
  - Minden saroknál a dimenzió ikonja, neve, score-ja
  - Animált rajzolódás
- **Dimenzió részletezés** — 6 kártya, mindegyikben:
  - Ikon, név, tudományos alap
  - Score + szint label (Kiváló/Fejlett/Fejlődő/Fejlesztendő)
  - Vizuális score bar
  - Rövid leírás

### 4. Email Lead Capture (az eredmény oldalon)
- A radar chart ÉS a dimenzió kártyák UTÁN
- "📊 Részletes riport és fejlődési terv" cím
- "Kapj személyre szabott elemzést minden dimenzióban, konkrét fejlődési javaslatokkal és tudományos háttérrel." leírás
- Email input + "Küldés →" gomb
- "Nem küldünk spamot. Csak a riportot kapod meg." disclaimer
- Sikeres küldés után: ✅ visszajelzés

### 5. Supabase Lead Capture

Hozz létre a Supabase-ben egy `leads` táblát:

```sql
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  overall_score NUMERIC(3,2),
  profile_name TEXT,
  cognitive_flexibility NUMERIC(3,2),
  uncertainty_tolerance NUMERIC(3,2),
  autonomy_design NUMERIC(3,2),
  psychological_safety NUMERIC(3,2),
  adaptive_decision NUMERIC(3,2),
  group_culture_awareness NUMERIC(3,2),
  raw_answers JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

Amikor a felhasználó megadja az emailjét, mentsd el az összes adatot (email + score-ok + nyers válaszok).

**Supabase Row Level Security (RLS):**
```sql
-- Engedélyezd az RLS-t
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Csak INSERT engedélyezett anonim felhasználóknak (senki ne tudja olvasni a többi lead adatait)
CREATE POLICY "Allow anonymous inserts" ON leads
  FOR INSERT
  WITH CHECK (true);

-- SELECT csak autentikált admin felhasználóknak (Supabase dashboard-on keresztül nézitek)
```

**Error handling:**
- Ha a Supabase mentés sikertelen (nincs internet, hiba, stb.), akkor is mutasd a ✅ visszajelzést a felhasználónak (ne veszítsd el a UX-et), de logold a hibát a console-ba.
- Opcionálisan: fallback-ként mentsd localStorage-ba, és próbáld újra küldeni később.

### 5b. GDPR compliance

Az email input MELLETT legyen egy checkbox:
- [ ] Elfogadom az [adatkezelési tájékoztatót](https://www.y2y.hu/adatkezeles) *(link a Y2Y adatkezelési oldalára)*
- A "Küldés" gomb CSAK AKKOR legyen aktív, ha a checkbox be van pipálva
- A checkbox szövege: `fontSize: 12px, color: #64748B`

### 5c. Visszalépés a kvízben

A quiz screen-en legyen egy diszkrét "← Vissza" link a bal felső sarokban, amivel az előző kérdésre lehet visszalépni. NE legyen feltűnő, csak egy halvány szöveg-link.

### 6. Y2Y CTA blokk
- Az email capture után
- Profilhoz kapcsolt CTA szöveg
- "Tudj meg többet a Y2Y-ról →" gomb → https://www.y2y.hu
- "Újrakezdés" gomb

### 7. Footer
- © 2026 Y2Y Hungary Kft. · Ground v1.0
- Tudományos referenciák

---

## Open Graph / SEO meta tagok

```html
<title>Ground by Y2Y — Vezetői Tudatossági Felmérés</title>
<meta name="description" content="Nem ígérjük, hogy jövőbiztos leszel. Megmutatjuk, hol állsz most. Neuroscience-alapú vezetői felmérés. 24 kérdés, 6 dimenzió, ~6 perc." />
<meta property="og:title" content="Ground by Y2Y — Hol állsz most, mint vezető?" />
<meta property="og:description" content="Nem ígérjük, hogy jövőbiztos leszel. Megmutatjuk, hol állsz most. Töltsd ki az ingyenes felmérést!" />
<meta property="og:type" content="website" />
<meta property="og:image" content="/og-image.png" />
```

Az `og-image.png`-t generáld le: 1200×630px, sötét háttér, "Ground" szöveg nagy betűkkel, alatta "by Y2Y", tagline.

---

## Teljes flow összefoglalás

```
[Intro] → [Kérdés 1-4: Kognitív Rugalmasság] → [Kérdés 5-8: Bizonytalanság-tűrés] → [Kérdés 9-12: Autonómia-tervezés] → [Kérdés 13-16: Pszichológiai Biztonság] → [Kérdés 17-20: Adaptív Döntéshozatal] → [Kérdés 21-24: Csoportkultúra-tudatosság] → [Eredmény + Radar Chart + Email Capture + Y2Y CTA]
```

---

## Deploy checklist

1. ✅ Vite + React + TypeScript projekt
2. ✅ Tailwind CSS konfiguráció
3. ✅ Supabase kliens + .env.example
4. ✅ Vercel deploy konfiguráció (vercel.json)
5. ✅ OG meta tagek
6. ✅ Mobile-first reszponzív design
7. ✅ Minden animáció és interakció működik
8. ✅ Válaszok random sorrendben jelennek meg
9. ✅ Score rejtve a felhasználó elől
10. ✅ GDPR checkbox az email capture-nél
11. ✅ Supabase RLS policy beállítva
12. ✅ Visszalépés gomb a kvízben
13. ✅ Error handling a Supabase hívásoknál

---

## ⚠️ Megjegyzés a Windsurf AI-nak

Ez a brief MAGYAR nyelvű alkalmazást ír le. Az UI szövegek, kérdések, válaszok MIND MAGYARUL maradnak – ne fordítsd le őket angolra. A kód és a kommentek lehetnek angolul, de minden user-facing szöveg magyar.

---

*Ezt a briefet a Y2Y Hungary Kft. számára készítette Claude (Anthropic), 2026.*
