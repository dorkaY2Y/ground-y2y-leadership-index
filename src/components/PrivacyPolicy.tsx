interface PrivacyPolicyProps {
  onBack: () => void;
}

export default function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  return (
    <div className="min-h-screen px-5 py-10 relative z-10">
      <div className="max-w-lg mx-auto">
        <button
          onClick={onBack}
          className="text-ground-muted hover:text-white text-sm mb-6 transition-colors"
        >
          ← Vissza
        </button>

        <h1 className="text-2xl font-bold text-white mb-6" style={{ color: '#ded114' }}>
          Adatkezelési Tájékoztató
        </h1>

        <div className="space-y-6 text-sm text-ground-muted leading-relaxed">
          <section>
            <h2 className="text-white font-semibold mb-2">1. Az adatkezelő</h2>
            <p>
              Y2Y Hungary Kft. (székhely: Budapest, Magyarország)<br />
              E-mail: hello@y2y.hu<br />
              Weboldal: <a href="https://www.y2y.hu" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">www.y2y.hu</a>
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-2">2. Milyen adatokat kezelünk?</h2>
            <p>
              A „Ground by Y2Y" felmérés kitöltése során az alábbi adatokat kezeljük:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Email cím (kizárólag ha megadod a riport kéréséhez)</li>
              <li>A felmérés válaszaiból számított dimenzió-pontszámok</li>
              <li>Összesített profil eredmény</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-2">3. Az adatkezelés célja</h2>
            <p>
              Az adatkezelés kizárólag arra szolgál, hogy elküldjük neked a személyre szabott
              vezetői riportot az általad megadott email címre. Az eredményeidet
              nem használjuk marketing célra, nem adjuk el harmadik félnek, és nem
              készítünk belőle névhez köthető statisztikát.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-2">4. Az adatkezelés jogalapja</h2>
            <p>
              Az adatkezelés az EU 2016/679 rendelet (GDPR) 6. cikk (1) bekezdés a) pontja
              alapján, az érintett hozzájárulásával történik. A hozzájárulásodat az email megadásakor
              az adatkezelési tájékoztató elfogadásával adod meg.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-2">5. Az adatkezelés időtartama</h2>
            <p>
              Az email címedet és a felmérés eredményeit a riport elküldését követő 30 napig
              tároljuk, majd automatikusan töröljük. Ha a felmérést email megadása nélkül töltöd
              ki, semmilyen személyes adatot nem tárolunk.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-2">6. Adatfeldolgozók</h2>
            <p>Az adatkezelés során az alábbi szolgáltatókat vesszük igénybe:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Supabase Inc. — adatbázis tárhely (EU régió)</li>
              <li>Resend Inc. — email küldés</li>
              <li>Vercel Inc. — weboldal üzemeltetés</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-2">7. A te jogaid</h2>
            <p>A GDPR alapján az alábbi jogokkal élhetsz:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Hozzáférés joga — kérheted, milyen adataidat kezeljük</li>
              <li>Helyesbítés joga — kérheted adataid módosítását</li>
              <li>Törlés joga — kérheted adataid törlését</li>
              <li>Hozzájárulás visszavonása — bármikor, a hello@y2y.hu címen</li>
              <li>Felügyeleti hatósághoz fordulás joga (NAIH, naih.hu)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-2">8. Kapcsolat</h2>
            <p>
              Adatkezeléssel kapcsolatos kérdésekkel fordulj hozzánk bizalommal:<br />
              <a href="mailto:hello@y2y.hu" className="underline hover:text-white">hello@y2y.hu</a>
            </p>
          </section>

          <section>
            <p className="text-xs text-ground-muted/50 pt-4" style={{ borderTop: '1px solid #1E293B30' }}>
              Utolsó frissítés: 2026. február
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
