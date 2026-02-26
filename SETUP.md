# Ground by Y2Y — Beüzemelési útmutató

## 1. Deploy (Vercel + GitHub)

### GitHub repo létrehozása
```bash
cd y2y-leadership-index
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TE-USERED/ground-by-y2y.git
git push -u origin main
```

### Vercel deploy
1. Menj a [vercel.com](https://vercel.com) oldalra és lépj be a GitHub accountoddal
2. Kattints "Add New Project" → válaszd ki a `ground-by-y2y` repót
3. Framework Preset: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Environment Variables-nél add hozzá az alábbi változókat (lásd 2. és 3. pont)
7. Deploy!

A Vercel automatikusan újradeployol minden `git push` után.

---

## 2. Supabase beállítása (email cím gyűjtés)

### Supabase projekt
1. [supabase.com](https://supabase.com) — hozz létre egy ingyenes projektet
2. A Dashboard-on másold ki:
   - **Project URL** → ez lesz a `VITE_SUPABASE_URL`
   - **anon/public key** → ez lesz a `VITE_SUPABASE_ANON_KEY`

### Leads tábla létrehozása
A Supabase SQL Editor-ban futtasd:

```sql
CREATE TABLE leads (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  email TEXT NOT NULL,
  overall_score NUMERIC(3,2),
  profile_name TEXT,
  cognitive_flexibility NUMERIC(3,2),
  uncertainty_tolerance NUMERIC(3,2),
  autonomy_design NUMERIC(3,2),
  psychological_safety NUMERIC(3,2),
  adaptive_decision NUMERIC(3,2),
  group_culture_awareness NUMERIC(3,2),
  raw_answers JSONB
);

-- RLS (Row Level Security) bekapcsolása
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Insert policy: bárki tud sort beilleszteni (a felmérés frontend-ről)
CREATE POLICY "Allow anonymous inserts" ON leads
  FOR INSERT WITH CHECK (true);

-- Select policy: csak authenticated user (te) tud olvasni
CREATE POLICY "Allow authenticated reads" ON leads
  FOR SELECT USING (auth.role() = 'authenticated');
```

### Leads exportálása
A Supabase Dashboard → Table Editor → `leads` táblánál bármikor exportálhatsz CSV-t.

---

## 3. Email küldés (Resend)

### Resend account
1. [resend.com](https://resend.com) — ingyenes account (havi 3000 email)
2. Domain hitelesítés: add hozzá a `y2y.hu` domaint és állítsd be a DNS rekordokat (SPF, DKIM)
3. API Key: hozz létre egyet → ez lesz a `RESEND_API_KEY`

### Supabase Edge Function deploy
```bash
# Supabase CLI telepítése (ha még nincs)
npm install -g supabase

# Belépés
supabase login

# Linkeld a projektet
supabase link --project-ref TE-PROJECT-REF

# Secrets beállítása
supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxxxxx
supabase secrets set FROM_EMAIL="Ground by Y2Y <ground@y2y.hu>"

# Edge Function deploy
supabase functions deploy send-result-email
```

A deploy után az Edge Function URL-je:
```
https://TE-PROJECT-REF.supabase.co/functions/v1/send-result-email
```

Ez lesz a `VITE_EMAIL_API_URL`.

---

## 4. Environment változók összefoglalása

### Vercel-ben (vagy `.env` lokálisan):
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUz...
VITE_EMAIL_API_URL=https://xxxxx.supabase.co/functions/v1/send-result-email
```

### Supabase Secrets (Edge Function):
```
RESEND_API_KEY=re_xxxxxxxxxxxxx
FROM_EMAIL=Ground by Y2Y <ground@y2y.hu>
```

---

## 5. Tesztelés

1. Nyisd meg az appot (lokálisan `npm run dev` vagy a Vercel URL-en)
2. Töltsd ki a felmérést
3. Add meg az email címed
4. Ellenőrizd:
   - Supabase `leads` táblában megjelent-e a sor
   - Megkaptad-e az emailt a részletes riporttal
5. Ha az email nem jön: nézd a Supabase Edge Function logokat (`supabase functions logs send-result-email`)

---

## Működés nélkülük

Az app **email API és Supabase nélkül is működik**:
- Ha nincs Supabase: a leadek `localStorage`-ba mentődnek (fejlesztői konzolban elérhető)
- Ha nincs Email API: a felhasználó a „Köszönjük!" üzenetet látja, email nem megy ki
- A felmérés és az eredmény oldal mindig működik

---

## Fájlstruktúra

```
src/
  components/
    IntroScreen.tsx      — Bevezető oldal
    QuizScreen.tsx       — Kérdőív
    ResultScreen.tsx     — Eredmény oldal
    EmailCapture.tsx     — Email bekérés + GDPR
    PrivacyPolicy.tsx    — Adatkezelési tájékoztató
    RadarChart.tsx       — Radar diagram
    ProgressBar.tsx      — Haladásjelző
  data/
    dimensions.ts        — 6 dimenzió definíció
    questions.ts         — 24 kérdés
    reportTexts.ts       — 24 részletes riport szöveg (6×4)
  utils/
    scoring.ts           — Pontozás és profil logika
  lib/
    supabase.ts          — Supabase + email küldés
supabase/
  functions/
    send-result-email/   — Edge Function (Resend email)
```
