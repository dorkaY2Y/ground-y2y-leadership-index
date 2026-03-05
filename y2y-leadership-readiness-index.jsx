import { useState, useEffect, useRef } from "react";

// ============================================================
// Y2Y LEADERSHIP READINESS INDEX
// Neuroscience-based leadership assessment tool
// 5 dimensions × 4 questions = 20 questions
// ============================================================

const DIMENSIONS = [
  {
    id: "cognitive_flexibility",
    name: "Kognitív Rugalmasság",
    shortName: "Kognitív\nRugalmasság",
    icon: "🧠",
    science: "Prefrontális kéreg aktivitás, kognitív flexibilitás (Diamond, 2013)",
    description: "Mennyire képes a vezető gyorsan váltani kontextusok, gondolkodási módok és ember-AI együttműködés között.",
    color: "#2D5BFF",
  },
  {
    id: "uncertainty_tolerance",
    name: "Bizonytalanság-tűrés",
    shortName: "Bizonytalanság-\ntűrés",
    icon: "🌊",
    science: "SCARF modell: Certainty dimenzió (Rock, 2008), Intolerance of Uncertainty Scale (Buhr & Dugas, 2002)",
    description: "Hogyan kezeli a vezető a FLUX évtized kiszámíthatatlanságát és az állandó változást.",
    color: "#00C2A8",
  },
  {
    id: "autonomy_design",
    name: "Autonómia-tervezés",
    shortName: "Autonómia-\ntervezés",
    icon: "🎯",
    science: "SCARF modell: Autonomy dimenzió (Rock, 2008), Self-Determination Theory (Deci & Ryan, 2000)",
    description: "Mennyire képes a vezető valódi döntési teret adni a csapatának ahelyett, hogy mikro-menedzselne.",
    color: "#FF6B35",
  },
  {
    id: "psychological_safety",
    name: "Pszichológiai Biztonság",
    shortName: "Pszichológiai\nBiztonság",
    icon: "🛡️",
    science: "Edmondson (1999), SCARF: Relatedness & Status (Rock, 2008)",
    description: "Mennyire teremt olyan közeget, ahol az emberek mernek hibázni, kérdezni és innoválni.",
    color: "#A855F7",
  },
  {
    id: "adaptive_decision",
    name: "Adaptív Döntéshozatal",
    shortName: "Adaptív\nDöntéshozatal",
    icon: "⚡",
    science: "Dual-Process Theory (Kahneman, 2011), SCARF: Fairness (Rock, 2008)",
    description: "Hogyan hoz döntéseket gyorsan változó környezetben, mennyire ismeri fel saját kognitív torzításait.",
    color: "#F43F5E",
  },
  {
    id: "group_culture",
    name: "Csoportkultúra-tudatosság",
    shortName: "Csoportkultúra-\ntudatosság",
    icon: "🧩",
    science: "Riemann-féle csoportdinamikai modell (1961), Csoportkultúra-tipológia",
    description: "Mennyire tudatosan alakítja a vezető a csapata kultúráját, és mennyire képes kezelni a különböző kultúratípusok dinamikáját.",
    color: "#FACC15",
  },
];

const QUESTIONS = [
  // COGNITIVE FLEXIBILITY (4)
  {
    dimension: "cognitive_flexibility",
    text: "Amikor egy jól bevált folyamatról kiderül, hogy már nem működik, hogyan reagálsz?",
    answers: [
      { text: "Azonnal elkezdem keresni az alternatívákat és kísérletezni", score: 5 },
      { text: "Összegyűjtöm az adatokat és átgondolom a lehetőségeket", score: 4 },
      { text: "Megpróbálom először finomhangolni a meglévő folyamatot", score: 3 },
      { text: "Várok, hátha a helyzet magától rendeződik", score: 2 },
      { text: "Ragaszkodom a bevált módszerhez – eddig működött", score: 1 },
    ],
  },
  {
    dimension: "cognitive_flexibility",
    text: "Egy nap alatt stratégiai meetingről operatív tűzoltásba, onnan coaching beszélgetésbe váltasz. Hogyan éled meg?",
    answers: [
      { text: "Élvezem a változatosságot, könnyen váltok módok között", score: 5 },
      { text: "Tudatosan készülök a váltásokra, szüneteket iktatok be", score: 4 },
      { text: "Megbirkózom vele, de a nap végére kimerülök", score: 3 },
      { text: "Nehezen váltok, az egyik téma gondolatai átszűrődnek a másikba", score: 2 },
      { text: "Ez a tempó szétszed – nem tudok egyikre sem fókuszálni", score: 1 },
    ],
  },
  {
    dimension: "cognitive_flexibility",
    text: "Egy kollégád radikálisan más megközelítést javasol egy projektre, mint amit te elképzeltél. Mi a reakciód?",
    answers: [
      { text: "Kíváncsi vagyok – kérem, hogy fejtse ki részletesen az érveit", score: 5 },
      { text: "Meghallgatom, de közben összehasonlítom a sajátommal", score: 4 },
      { text: "Elfogadom, de belül azért fenntartásaim vannak", score: 3 },
      { text: "Udvariasan meghallgatom, de ragaszkodom az eredetihez", score: 2 },
      { text: "Frusztráló, hogy nem látja be, miért jobb az én elképzelésem", score: 1 },
    ],
  },
  {
    dimension: "cognitive_flexibility",
    text: "Az elmúlt félévben hányszor változtattál meg egy saját meggyőződésedet egy csapattag érvelése alapján?",
    answers: [
      { text: "Többször – aktívan keresem azokat a helyzeteket, ahol tévedhetek", score: 5 },
      { text: "Néhányszor, és minden alkalommal tanultam belőle", score: 4 },
      { text: "Egyszer-kétszer, de nem volt könnyű beismernem", score: 3 },
      { text: "Nem igazán emlékszem ilyenre – általában nekem van igazam", score: 2 },
      { text: "A vezető dolga, hogy irányt mutasson, nem az, hogy folyton változtasson", score: 1 },
    ],
  },
  // UNCERTAINTY TOLERANCE (4)
  {
    dimension: "uncertainty_tolerance",
    text: "Egy fontos projekt közben hirtelen megváltoznak a piaci feltételek. Mit teszel először?",
    answers: [
      { text: "Gyorsan felmérem, mi változott, és az első 48 órában új tervet rakok össze", score: 5 },
      { text: "Összehívom a csapatot, hogy közösen értékeljük a helyzetet és adaptáljunk", score: 4 },
      { text: "Szünetet tartok, átgondolom a lehetőségeket, mielőtt reagálnék", score: 3 },
      { text: "Próbálom a meglévő tervet menteni amennyire lehet", score: 2 },
      { text: "Megbénulok – a kiszámíthatatlanság nagyon stresszessé tesz", score: 1 },
    ],
  },
  {
    dimension: "uncertainty_tolerance",
    text: "Hogyan kommunikálsz a csapatoddal, amikor te sem tudod, mi lesz a következő negyedévben?",
    answers: [
      { text: "Nyíltan mondom, hogy nem tudom – és közösen keressük az irányt", score: 5 },
      { text: "Megosztom, amit tudok, és keretet adok a bizonytalanságnak", score: 4 },
      { text: "Próbálom a bizonytalanságot \"kontrollált üzenetekbe\" csomagolni", score: 3 },
      { text: "Inkább várok, amíg lesz valami konkrétum, amit mondhatok", score: 2 },
      { text: "Megnyugtató üzeneteket küldök, még ha nem is teljesen reálisak", score: 1 },
    ],
  },
  {
    dimension: "uncertainty_tolerance",
    text: "A te iparágadban komoly átalakulás várható a következő 3 évben (technológiai, szabályozási vagy piaci). Hogyan készülsz rá?",
    answers: [
      { text: "Már most kísérletezek és építek új képességeket a csapatban", score: 5 },
      { text: "Van egy konkrét fejlődési tervem, ami rendszeresen frissül", score: 4 },
      { text: "Figyelemmel kísérem a trendeket, de még nem léptem konkrétan", score: 3 },
      { text: "Remélem, hogy a változás lassabb lesz, mint amit jósolnak", score: 2 },
      { text: "Majd alkalmazkodom, ha tényleg eljön – most más a prioritás", score: 1 },
    ],
  },
  {
    dimension: "uncertainty_tolerance",
    text: "Vezetőként hogyan viszonyulsz a hosszú távú tervezéshez a jelenlegi környezetben?",
    answers: [
      { text: "Rövid iterációkban gondolkodom, de van egy adaptálható vízióm", score: 5 },
      { text: "3-6 hónapos ciklusokban tervezek, rugalmas kerettel", score: 4 },
      { text: "Éves tervet készítek, és negyedévente felülvizsgálom", score: 3 },
      { text: "Ragaszkodom az éves tervhez, különben elveszítem a fókuszt", score: 2 },
      { text: "Hosszú távú terv nélkül nem tudok vezetni", score: 1 },
    ],
  },
  // AUTONOMY DESIGN (4)
  {
    dimension: "autonomy_design",
    text: "Egy csapattagod más módszert választ egy feladatra, mint amit te javasolnál. Mit teszel?",
    answers: [
      { text: "Hagyom – az eredmény számít, nem az út", score: 5 },
      { text: "Megkérdezem, mi az indoka, és ha van logikája, támogatom", score: 4 },
      { text: "Elmondom a véleményem, de rábízom a döntést", score: 3 },
      { text: "Megpróbálom finoman a saját módszerem felé terelni", score: 2 },
      { text: "Megmondom, hogy csinálja az én módszeremmel – az bevált", score: 1 },
    ],
  },
  {
    dimension: "autonomy_design",
    text: "Hogyan delegálsz egy komplex projektet?",
    answers: [
      { text: "Megadom a célt és a kereteket, a hogyanra a csapat talál megoldást", score: 5 },
      { text: "Megbeszéljük együtt a megközelítést, utána ők viszik", score: 4 },
      { text: "Részletes tervet adok, de nyitott vagyok módosításokra", score: 3 },
      { text: "Részletes tervet adok és rendszeresen ellenőrzöm a haladást", score: 2 },
      { text: "Inkább magam csinálom – gyorsabb és biztosabb", score: 1 },
    ],
  },
  {
    dimension: "autonomy_design",
    text: "Milyen gyakran kérsz státuszfrissítést a csapatodtól egy folyamatban lévő projektnél?",
    answers: [
      { text: "A csapattal közösen alakítjuk ki a check-in ritmust a projekt igényei szerint", score: 5 },
      { text: "Heti egy rövid szinkron, a közbülső időben bízom bennük", score: 4 },
      { text: "Heti 2-3 alkalommal rákérdezek informálisan", score: 3 },
      { text: "Naponta szeretek tudni a státuszról", score: 2 },
      { text: "Folyamatosan figyelemmel kísérem és azonnal jelzek, ha eltérést látok", score: 1 },
    ],
  },
  {
    dimension: "autonomy_design",
    text: "Egy junior kolléga hibázik egy fontos prezentációban. Mi a reakciód?",
    answers: [
      { text: "Megbeszéljük, mit tanult belőle, és legközelebb ő fogja jobban csinálni", score: 5 },
      { text: "Átbeszéljük a hibát és közösen készítünk tervet a következőre", score: 4 },
      { text: "Segítek kijavítani, és felajánlom, hogy legközelebb átnézem előtte", score: 3 },
      { text: "Legközelebb én nézem át a prezentációt, mielőtt bemutatja", score: 2 },
      { text: "Legközelebb inkább én tartom a fontos prezentációkat", score: 1 },
    ],
  },
  // PSYCHOLOGICAL SAFETY (4)
  {
    dimension: "psychological_safety",
    text: "Egy meetingen senki nem mond ellent a te javaslatodnak. Hogyan értékeled ezt?",
    answers: [
      { text: "Gyanús – aktívan provokálom a kritikus gondolkodást", score: 5 },
      { text: "Közvetlenül megkérdezem: \"Mi az, ami ebben nem működhet?\"", score: 4 },
      { text: "Megkérdezem, van-e kérdés vagy hozzáfűznivaló", score: 3 },
      { text: "Örülök, hogy egyetértenek, és lépünk tovább", score: 2 },
      { text: "Ez azt jelenti, hogy jó az ötletem – menjünk tovább", score: 1 },
    ],
  },
  {
    dimension: "psychological_safety",
    text: "Milyen gyakran beszélsz nyíltan a saját hibáidról a csapatod előtt?",
    answers: [
      { text: "Rendszeresen – ez teremti meg a közeget, ahol mások is mernek hibázni", score: 5 },
      { text: "Amikor releváns, megosztom a tanulságot belőle", score: 4 },
      { text: "Alkalmanként, ha segíti a helyzetet", score: 3 },
      { text: "Ritkán – a vezető legyen a stabil pont", score: 2 },
      { text: "Soha – a vezető gyengeségeit nem kell közszemlére tenni", score: 1 },
    ],
  },
  {
    dimension: "psychological_safety",
    text: "Egy csapattagod zavartan bevallja, hogy nem érti az AI-t és fél, hogy el fogja veszíteni a munkáját. Mit válaszolsz?",
    answers: [
      { text: "Megköszönöm az őszinteségét, és közösen készítünk fejlődési tervet", score: 5 },
      { text: "Normalizálom az érzést és konkrét támogatást ajánlok", score: 4 },
      { text: "Megnyugtatom, hogy nem lesz olyan vészes", score: 3 },
      { text: "Elmondom, hogy alkalmazkodnia kell – ez a jövő", score: 2 },
      { text: "Mindenki felelős a saját fejlődéséért – elérhető a képzés", score: 1 },
    ],
  },
  {
    dimension: "psychological_safety",
    text: "Hogyan kezeled, ha egy megbeszélésen két kollégád hevesen vitatkozik?",
    answers: [
      { text: "Facilitálom a vitát – elválasztom a személyt az ügytől és mélyítjük a megértést", score: 5 },
      { text: "Hagyom kibontakozni a vitát, de figyelek a hangnemre", score: 4 },
      { text: "Szünetet kérek és külön beszélek mindkettőjükkel", score: 3 },
      { text: "Gyorsan leállítom – a meetingen nem vitatkozunk", score: 2 },
      { text: "Eldöntöm a kérdést és lépünk tovább", score: 1 },
    ],
  },
  // ADAPTIVE DECISION-MAKING (4)
  {
    dimension: "adaptive_decision",
    text: "Egy fontos döntésnél ellentmondásos adataid vannak. Mit teszel?",
    answers: [
      { text: "Hozok egy \"elég jó\" döntést gyorsan, és iterálok az eredmények alapján", score: 5 },
      { text: "Meghatározom, mi az a minimum adat, ami a döntéshez kell, és azt megszerzem", score: 4 },
      { text: "Több adatot gyűjtök, amíg egyértelmű nem lesz a helyzet", score: 3 },
      { text: "Konzultálok a felettemmel vagy külső tanácsadóval", score: 2 },
      { text: "Várok, amíg teljesen tiszta lesz a kép – rossz döntés rosszabb, mint késői döntés", score: 1 },
    ],
  },
  {
    dimension: "adaptive_decision",
    text: "Az utolsó igazán nehéz döntésednél hogyan jutottál el a végső válaszig?",
    answers: [
      { text: "Megnéztem az adatokat, meghallgattam az intuíciómat, és tudatosan mérlegeltem, hol mondanak mást", score: 5 },
      { text: "Elsősorban az adatokra támaszkodtam, de figyeltem a megérzéseimre is", score: 4 },
      { text: "Összegyűjtöttem az elérhető adatokat és azok alapján döntöttem", score: 3 },
      { text: "A megérzésemre hallgattam – eddig ritkán csapott be", score: 2 },
      { text: "Nem emlékszem, hogy tudatosan végig gondoltam volna a folyamatot", score: 1 },
    ],
  },
  {
    dimension: "adaptive_decision",
    text: "Visszavontál-e nyilvánosan egy korábbi döntésedet, amikor új információ érkezett?",
    answers: [
      { text: "Igen, rendszeresen – a jó vezető korrigál, nem ragaszkodik", score: 5 },
      { text: "Igen, néhányszor – de nem volt könnyű", score: 4 },
      { text: "Egyszer-kétszer, kivételes helyzetben", score: 3 },
      { text: "Inkább csendben módosítok irányt", score: 2 },
      { text: "Nem – a következetesség fontosabb, mint a korrekció", score: 1 },
    ],
  },
  {
    dimension: "adaptive_decision",
    text: "Egy döntés meghozatala előtt mennyire vagy tudatában a saját kognitív torzításaidnak (pl. megerősítési torzítás, status quo torzítás)?",
    answers: [
      { text: "Aktívan keresem a torzításaimat és rendszereket építek ellenük", score: 5 },
      { text: "Ismerem a főbb torzításokat és igyekszem figyelni rájuk", score: 4 },
      { text: "Hallottam róluk, de a gyakorlatban nehéz alkalmazni", score: 3 },
      { text: "Nem nagyon foglalkozom ezzel – ösztönösen döntök", score: 2 },
      { text: "Ez túl elméleti – a tapasztalat fontosabb", score: 1 },
    ],
  },
  // GROUP CULTURE AWARENESS (4)
  {
    dimension: "group_culture",
    text: "Hogyan jellemeznéd a csapatod jelenlegi működési kultúráját?",
    answers: [
      { text: "Pontosan tudom, milyen kultúrát építünk, és tudatosan döntöttem így – ismerem az előnyeit és a korlátait is", score: 5 },
      { text: "Van egy elképzelésem róla, és időnként tudatosan formálom", score: 4 },
      { text: "Nem gondolkodtam még kultúra-kategóriákban, de érzem, mi működik", score: 3 },
      { text: "A kultúra magától alakult ki, nem nagyon foglalkozom vele", score: 2 },
      { text: "Nem értem, miért kellene ezen gondolkodni – csináljuk a dolgunkat", score: 1 },
    ],
  },
  {
    dimension: "group_culture",
    text: "A csapatodban van, aki a stabilitást szereti, és van, aki a változást. Hogyan kezeled ezt a feszültséget?",
    answers: [
      { text: "Tudatosan használom: a stabilitás-pártiak adják a keretet, a változás-pártiak az innovációt", score: 5 },
      { text: "Megpróbálom megértetni mindkét oldallal a másik nézőpontját", score: 4 },
      { text: "Általában az egyik oldal felé húzok, de tudom, hogy ez nem ideális", score: 3 },
      { text: "Frusztráló, hogy nem gondolkodik mindenki ugyanúgy", score: 2 },
      { text: "Akinek nem tetszik az irány, az alkalmazkodik vagy továbbáll", score: 1 },
    ],
  },
  {
    dimension: "group_culture",
    text: "Egy új projekt indul. A csapatod egyik fele szoros együttműködést, közös ötletelést akar, a másik fele önálló munkát, tiszta felelősségi köröket. Mit teszel?",
    answers: [
      { text: "Felmérem, melyik feladathoz melyik működési mód illik jobban, és ennek megfelelően szervezem a munkát", score: 5 },
      { text: "Kompromisszumot keresek: közös kickoff, utána önálló munka, rendszeres szinkron", score: 4 },
      { text: "Általában az egyik stílust választom, amit jobban ismerek", score: 3 },
      { text: "Megmondom, hogyan fogunk dolgozni – a vezető dönt a keretről", score: 2 },
      { text: "Nem gondolom, hogy ez lényeges – az eredmény számít, nem a módszer", score: 1 },
    ],
  },
  {
    dimension: "group_culture",
    text: "Mennyire tudatosan váltasz vezetői stílust attól függően, hogy a csapatodnak épp struktúrára, innovációra, kapcsolódásra vagy önállóságra van szüksége?",
    answers: [
      { text: "Tudatosan figyelem és diagnosztizálom, mire van szükség, és adaptálom a stílusomat", score: 5 },
      { text: "Érzem, mikor kell váltanom, és többnyire sikerül is", score: 4 },
      { text: "Van egy bevált stílusom, de néha kilépek belőle", score: 3 },
      { text: "Következetesen egy stílusban vezetek – az emberek tudják, mire számíthatnak", score: 2 },
      { text: "A jó vezető autentikus – nem kell szerepeket játszani", score: 1 },
    ],
  },
];

// Leader profiles based on score ranges
const getProfile = (avgScore) => {
  if (avgScore >= 4.2) return {
    title: "Adaptív Vezető",
    emoji: "🚀",
    summary: "Rendkívül fejlett a változáskezelési és innovációs kapacitásod. A FLUX évtized kihívásaira nemcsak felkészültél, hanem aktívan formálod is a jövőt.",
    cta: "A következő szinted: hogyan skalázod ezt a képességet a teljes szervezetedre?",
  };
  if (avgScore >= 3.4) return {
    title: "Fejlődő Stratéga",
    emoji: "📈",
    summary: "Erős alapjaid vannak, és aktívan dolgozol a fejlődéseden. Néhány dimenzióban már kiemelkedően teljesítesz, másokban van tér a növekedésre.",
    cta: "A következő szinted: az alacsonyabb pontszámú dimenziók célzott fejlesztése exponenciális hatást hozhat.",
  };
  if (avgScore >= 2.6) return {
    title: "Stabil Alapozó",
    emoji: "🏗️",
    summary: "Megbízható, bevált módszerekkel vezetsz. A FLUX évtized azonban új kompetenciákat követel – és most van a legjobb időpont elkezdeni a fejlődést.",
    cta: "A következő szinted: válassz EGY dimenziót, és 90 napos fókuszált fejlesztéssel ugorj szintet.",
  };
  return {
    title: "Hagyományos Vezető",
    emoji: "🔄",
    summary: "A bevált módszerekre építesz, ami eddig működött. De a következő évtized radikálisan más vezetői készségeket követel.",
    cta: "A következő szinted: nyitottság a változásra. Egy coach vagy mentor segíthet felgyorsítani az átállást.",
  };
};

const getDimensionLevel = (avg) => {
  if (avg >= 4.2) return { label: "Kiváló", color: "#10B981" };
  if (avg >= 3.4) return { label: "Fejlett", color: "#3B82F6" };
  if (avg >= 2.6) return { label: "Fejlődő", color: "#F59E0B" };
  return { label: "Fejlesztendő", color: "#EF4444" };
};

// Radar chart component
const RadarChart = ({ scores, size = 320 }) => {
  const center = size / 2;
  const radius = size * 0.38;
  const levels = 5;
  const dims = DIMENSIONS.length;

  const getPoint = (index, value, maxVal = 5) => {
    const angle = (Math.PI * 2 * index) / dims - Math.PI / 2;
    const r = (value / maxVal) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const gridLines = [];
  for (let l = 1; l <= levels; l++) {
    const points = [];
    for (let i = 0; i < dims; i++) {
      const p = getPoint(i, l);
      points.push(`${p.x},${p.y}`);
    }
    gridLines.push(points.join(" "));
  }

  const axisLines = [];
  for (let i = 0; i < dims; i++) {
    const p = getPoint(i, levels);
    axisLines.push({ x1: center, y1: center, x2: p.x, y2: p.y });
  }

  const dataPoints = scores.map((s, i) => getPoint(i, s));
  const dataPath = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  const labelPositions = DIMENSIONS.map((d, i) => {
    const p = getPoint(i, levels + 1.35);
    return { ...p, name: d.shortName, icon: d.icon, color: d.color };
  });

  return (
    <svg viewBox={`0 0 ${size} ${size}`} style={{ width: "100%", maxWidth: size, margin: "0 auto", display: "block" }}>
      <defs>
        <radialGradient id="radarGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2D5BFF" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#2D5BFF" stopOpacity="0.02" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {gridLines.map((pts, i) => (
        <polygon
          key={i}
          points={pts}
          fill={i === levels - 1 ? "url(#radarGrad)" : "none"}
          stroke="#334155"
          strokeWidth="0.5"
          opacity={0.4 + i * 0.12}
        />
      ))}
      {axisLines.map((line, i) => (
        <line key={i} {...line} stroke="#475569" strokeWidth="0.5" opacity="0.5" />
      ))}
      <polygon
        points={dataPath}
        fill="#2D5BFF"
        fillOpacity="0.2"
        stroke="#2D5BFF"
        strokeWidth="2.5"
        filter="url(#glow)"
        style={{
          animation: "radarDraw 1.2s ease-out forwards",
        }}
      />
      {dataPoints.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="5"
          fill={DIMENSIONS[i].color}
          stroke="#0F172A"
          strokeWidth="2"
          style={{
            animation: `dotPop 0.4s ease-out ${0.8 + i * 0.1}s both`,
          }}
        />
      ))}
      {labelPositions.map((lp, i) => (
        <g key={i}>
          <text
            x={lp.x}
            y={lp.y - 10}
            textAnchor="middle"
            style={{ fontSize: "18px" }}
          >
            {lp.icon}
          </text>
          {lp.name.split("\n").map((line, li) => (
            <text
              key={li}
              x={lp.x}
              y={lp.y + 6 + li * 13}
              textAnchor="middle"
              fill="#CBD5E1"
              style={{ fontSize: "10px", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
            >
              {line}
            </text>
          ))}
          <text
            x={lp.x}
            y={lp.y + 6 + lp.name.split("\n").length * 13 + 2}
            textAnchor="middle"
            fill={lp.color}
            style={{ fontSize: "13px", fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}
          >
            {scores[i].toFixed(1)}
          </text>
        </g>
      ))}
    </svg>
  );
};

// Progress bar
const ProgressBar = ({ current, total }) => {
  const pct = ((current + 1) / total) * 100;
  return (
    <div style={{ width: "100%", marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ color: "#94A3B8", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
          {current + 1} / {total} kérdés
        </span>
        <span style={{ color: "#64748B", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
          {DIMENSIONS.find(d => d.id === QUESTIONS[current].dimension)?.name}
        </span>
      </div>
      <div style={{ width: "100%", height: 4, background: "#1E293B", borderRadius: 2, overflow: "hidden" }}>
        <div style={{
          width: `${pct}%`,
          height: "100%",
          background: "linear-gradient(90deg, #2D5BFF, #00C2A8)",
          borderRadius: 2,
          transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        }} />
      </div>
    </div>
  );
};

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [phase, setPhase] = useState("intro"); // intro, quiz, result, email
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [fadeIn, setFadeIn] = useState(true);

  const shuffledQuestions = useRef(null);
  if (!shuffledQuestions.current) {
    // Shuffle questions within each dimension, keep dimension order
    const grouped = {};
    QUESTIONS.forEach(q => {
      if (!grouped[q.dimension]) grouped[q.dimension] = [];
      grouped[q.dimension].push(q);
    });
    const ordered = [];
    DIMENSIONS.forEach(d => {
      const dimQs = grouped[d.id] || [];
      for (let i = dimQs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [dimQs[i], dimQs[j]] = [dimQs[j], dimQs[i]];
      }
      ordered.push(...dimQs);
    });
    shuffledQuestions.current = ordered;
  }

  const questions = shuffledQuestions.current;

  const handleAnswer = (score) => {
    if (animating) return;
    setSelectedAnswer(score);
    setAnimating(true);

    setTimeout(() => {
      const newAnswers = [...answers, { dimension: questions[currentQ].dimension, score }];
      setAnswers(newAnswers);
      setSelectedAnswer(null);

      if (currentQ + 1 < questions.length) {
        setFadeIn(false);
        setTimeout(() => {
          setCurrentQ(currentQ + 1);
          setFadeIn(true);
          setAnimating(false);
        }, 200);
      } else {
        setPhase("result");
        setTimeout(() => setShowResults(true), 100);
        setAnimating(false);
      }
    }, 400);
  };

  const calcScores = () => {
    return DIMENSIONS.map(d => {
      const dimAnswers = answers.filter(a => a.dimension === d.id);
      if (dimAnswers.length === 0) return 0;
      return dimAnswers.reduce((sum, a) => sum + a.score, 0) / dimAnswers.length;
    });
  };

  const handleEmailSubmit = async () => {
    if (!email || !email.includes("@")) {
      setEmailError("Kérlek adj meg egy érvényes email címet");
      return;
    }

    setEmailSending(true);
    setEmailError("");

    try {
      const scores = calcScores();
      
      // Google Forms action URL
      const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSeW8harqt7zoZPimF9VIkJtFzNYgLMBZAu8O31hYHVWm7nI9w/formResponse";
      
      // Google Forms entry ID-k - a form forrásából kinyerve
      const formData = new FormData();
      formData.append("entry.774123597", email);
      formData.append("entry.307381788", scores[0].toFixed(2));
      formData.append("entry.1049293008", scores[1].toFixed(2));
      formData.append("entry.1686494736", scores[2].toFixed(2));
      formData.append("entry.1767359167", scores[3].toFixed(2));
      formData.append("entry.2058760180", scores[4].toFixed(2));
      formData.append("entry.740678", scores[5].toFixed(2));
      formData.append("entry.860803405", scores[6].toFixed(2));
      formData.append("entry.1061577670", scores[7].toFixed(2));

      // Google Forms submit (no-cors mode mivel a Google nem engedélyez CORS-t)
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: "POST",
        body: formData,
        mode: "no-cors"
      });

      // no-cors mode-ban nem kapunk választ, de ha idáig eljutottunk, sikeres volt
      setEmailSent(true);
    } catch (error) {
      console.error("Email sending error:", error);
      setEmailError("Hiba történt. Kérlek próbáld újra később.");
    } finally {
      setEmailSending(false);
    }
  };

  const restart = () => {
    setPhase("intro");
    setCurrentQ(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowResults(false);
    setEmail("");
    setEmailSent(false);
    // Re-shuffle
    const grouped = {};
    QUESTIONS.forEach(q => {
      if (!grouped[q.dimension]) grouped[q.dimension] = [];
      grouped[q.dimension].push({...q});
    });
    const ordered = [];
    DIMENSIONS.forEach(d => {
      const dimQs = grouped[d.id] || [];
      for (let i = dimQs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [dimQs[i], dimQs[j]] = [dimQs[j], dimQs[i]];
      }
      ordered.push(...dimQs);
    });
    shuffledQuestions.current = ordered;
  };

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0B1120",
      color: "#E2E8F0",
      fontFamily: "'DM Sans', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Space+Mono:wght@400;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        @keyframes radarDraw {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes dotPop {
          from { r: 0; opacity: 0; }
          to { r: 5; opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        .answer-btn {
          background: rgba(30, 41, 59, 0.6);
          border: 1px solid #334155;
          border-radius: 12px;
          padding: 16px 20px;
          color: #CBD5E1;
          font-size: 15px;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          text-align: left;
          width: 100%;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          line-height: 1.5;
        }
        .answer-btn:hover {
          background: rgba(45, 91, 255, 0.12);
          border-color: #2D5BFF;
          color: #F1F5F9;
          transform: translateX(4px);
        }
        .answer-btn.selected {
          background: rgba(45, 91, 255, 0.25);
          border-color: #2D5BFF;
          color: #fff;
        }

        .cta-btn {
          background: linear-gradient(135deg, #2D5BFF 0%, #00C2A8 100%);
          border: none;
          border-radius: 12px;
          padding: 16px 32px;
          color: #fff;
          font-size: 16px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 0.02em;
        }
        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(45, 91, 255, 0.3);
        }

        .email-input {
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid #334155;
          border-radius: 10px;
          padding: 14px 18px;
          color: #E2E8F0;
          font-size: 15px;
          font-family: 'DM Sans', sans-serif;
          width: 100%;
          outline: none;
          transition: border-color 0.2s;
        }
        .email-input:focus {
          border-color: #2D5BFF;
        }
        .email-input::placeholder {
          color: #64748B;
        }

        .dim-card {
          background: rgba(30, 41, 59, 0.4);
          border: 1px solid #1E293B;
          border-radius: 14px;
          padding: 20px;
          transition: all 0.3s ease;
        }
        .dim-card:hover {
          background: rgba(30, 41, 59, 0.6);
          border-color: #334155;
        }

        .grain-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          opacity: 0.03;
          pointer-events: none;
          z-index: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }
      `}</style>

      <div className="grain-overlay" />

      {/* Subtle background orbs */}
      <div style={{
        position: "fixed", top: "10%", left: "-5%", width: 400, height: 400,
        background: "radial-gradient(circle, rgba(45,91,255,0.08) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none", zIndex: 0,
        animation: "float 8s ease-in-out infinite",
      }} />
      <div style={{
        position: "fixed", bottom: "5%", right: "-5%", width: 350, height: 350,
        background: "radial-gradient(circle, rgba(0,194,168,0.06) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none", zIndex: 0,
        animation: "float 10s ease-in-out infinite 2s",
      }} />

      <div style={{
        position: "relative", zIndex: 1, maxWidth: 680,
        margin: "0 auto", padding: "40px 20px", minHeight: "100vh",
      }}>

        {/* HEADER */}
        <div style={{
          textAlign: "center", marginBottom: 8,
          animation: "fadeUp 0.6s ease-out",
        }}>
          <div style={{
            fontSize: 13, fontFamily: "'Space Mono', monospace",
            color: "#64748B", letterSpacing: "0.2em", textTransform: "uppercase",
            marginBottom: 4,
          }}>
            by Y2Y
          </div>
        </div>

        {/* ============ INTRO PHASE ============ */}
        {phase === "intro" && (
          <div style={{ animation: "fadeUp 0.8s ease-out" }}>
            <div style={{ textAlign: "center", marginTop: 40 }}>
              <div style={{
                fontSize: 52, marginBottom: 16,
                animation: "float 4s ease-in-out infinite",
              }}>🧠</div>
              <h1 style={{
                fontSize: "clamp(36px, 8vw, 64px)",
                fontWeight: 700,
                lineHeight: 1.1,
                marginBottom: 8,
                fontFamily: "'Space Mono', monospace",
                background: "linear-gradient(135deg, #E2E8F0 0%, #94A3B8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.02em",
              }}>
                Ground
              </h1>
              <p style={{
                fontSize: 17, color: "#94A3B8", lineHeight: 1.7,
                maxWidth: 520, margin: "0 auto 32px",
              }}>
                Nem ígérjük, hogy jövőbiztos leszel. Megmutatjuk, hol állsz most.
              </p>

              <div style={{
                display: "flex", flexWrap: "wrap", gap: 12,
                justifyContent: "center", marginBottom: 40,
              }}>
                {DIMENSIONS.map((d, i) => (
                  <div key={d.id} style={{
                    background: "rgba(30, 41, 59, 0.5)",
                    border: `1px solid ${d.color}22`,
                    borderRadius: 10, padding: "10px 16px",
                    fontSize: 13, color: d.color,
                    fontWeight: 500,
                    animation: `slideIn 0.4s ease-out ${i * 0.1}s both`,
                  }}>
                    {d.icon} {d.name}
                  </div>
                ))}
              </div>

              <div style={{
                background: "rgba(30, 41, 59, 0.4)",
                border: "1px solid #1E293B",
                borderRadius: 14, padding: 24,
                marginBottom: 32, textAlign: "left",
              }}>
                <div style={{ fontSize: 14, color: "#64748B", marginBottom: 12, fontWeight: 600, letterSpacing: "0.05em" }}>
                  TUDOMÁNYOS HÁTTÉR
                </div>
                <p style={{ fontSize: 14, color: "#94A3B8", lineHeight: 1.7 }}>
                  A felmérés a David Rock-féle SCARF modellre (NeuroLeadership Institute, 2008), Amy Edmondson pszichológiai biztonság kutatásaira (Harvard, 1999), Daniel Kahneman kettős folyamat elméletére (2011), a kognitív flexibilitás kutatásaira és a Riemann-féle csoportdinamikai modellre (1961) épül.
                </p>
                <div style={{ display: "flex", gap: 24, marginTop: 16, flexWrap: "wrap" }}>
                  {[
                    { num: "24", label: "kérdés" },
                    { num: "6", label: "dimenzió" },
                    { num: "~6", label: "perc" },
                  ].map((item, i) => (
                    <div key={i} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 24, fontWeight: 700, color: "#2D5BFF", fontFamily: "'Space Mono', monospace" }}>
                        {item.num}
                      </div>
                      <div style={{ fontSize: 12, color: "#64748B" }}>{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <button className="cta-btn" onClick={() => { setPhase("quiz"); setFadeIn(true); }}>
                Indítsd el a felmérést →
              </button>

              <p style={{ fontSize: 12, color: "#475569", marginTop: 16 }}>
                Nincsenek jó vagy rossz válaszok. Válaszd azt, ami leginkább jellemző rád.
              </p>
            </div>
          </div>
        )}

        {/* ============ QUIZ PHASE ============ */}
        {phase === "quiz" && (
          <div style={{ marginTop: 24 }}>
            <ProgressBar current={currentQ} total={questions.length} />

            {/* Dimension indicator */}
            {(currentQ === 0 || questions[currentQ].dimension !== questions[currentQ - 1]?.dimension) && (
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                marginBottom: 20, animation: "slideIn 0.4s ease-out",
              }}>
                <span style={{ fontSize: 24 }}>
                  {DIMENSIONS.find(d => d.id === questions[currentQ].dimension)?.icon}
                </span>
                <div>
                  <div style={{
                    fontSize: 15, fontWeight: 600,
                    color: DIMENSIONS.find(d => d.id === questions[currentQ].dimension)?.color,
                  }}>
                    {DIMENSIONS.find(d => d.id === questions[currentQ].dimension)?.name}
                  </div>
                  <div style={{ fontSize: 12, color: "#64748B" }}>
                    {DIMENSIONS.find(d => d.id === questions[currentQ].dimension)?.science}
                  </div>
                </div>
              </div>
            )}

            <div style={{
              opacity: fadeIn ? 1 : 0,
              transform: fadeIn ? "translateY(0)" : "translateY(10px)",
              transition: "all 0.3s ease",
            }}>
              <h2 style={{
                fontSize: "clamp(18px, 3.5vw, 22px)",
                fontWeight: 600,
                lineHeight: 1.45,
                marginBottom: 28,
                color: "#F1F5F9",
              }}>
                {questions[currentQ].text}
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {questions[currentQ].answers.map((a, i) => (
                  <button
                    key={i}
                    className={`answer-btn${selectedAnswer === a.score ? " selected" : ""}`}
                    onClick={() => handleAnswer(a.score)}
                    style={{
                      animation: `slideIn 0.3s ease-out ${i * 0.06}s both`,
                    }}
                  >
                    {a.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============ RESULT PHASE ============ */}
        {phase === "result" && (
          <div style={{
            animation: "fadeUp 0.8s ease-out",
            marginTop: 16,
          }}>
            {(() => {
              const scores = calcScores();
              const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
              const profile = getProfile(avgScore);

              return (
                <>
                  <div style={{ textAlign: "center", marginBottom: 32 }}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>{profile.emoji}</div>
                    <div style={{
                      fontSize: 12, fontFamily: "'Space Mono', monospace",
                      color: "#2D5BFF", letterSpacing: "0.15em", textTransform: "uppercase",
                      marginBottom: 8,
                    }}>
                      A te Ground profilod
                    </div>
                    <h2 style={{
                      fontSize: "clamp(26px, 5vw, 36px)",
                      fontWeight: 700, marginBottom: 8,
                      background: "linear-gradient(135deg, #F1F5F9 0%, #94A3B8 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}>
                      {profile.title}
                    </h2>
                    <div style={{
                      fontSize: 32, fontWeight: 700, fontFamily: "'Space Mono', monospace",
                      color: "#2D5BFF", marginBottom: 8,
                    }}>
                      {avgScore.toFixed(1)} / 5.0
                    </div>
                    <p style={{ fontSize: 15, color: "#94A3B8", lineHeight: 1.7, maxWidth: 500, margin: "0 auto" }}>
                      {profile.summary}
                    </p>
                  </div>

                  {/* Radar Chart */}
                  <div style={{
                    background: "rgba(15, 23, 42, 0.6)",
                    border: "1px solid #1E293B",
                    borderRadius: 16, padding: "24px 16px",
                    marginBottom: 28,
                  }}>
                    <RadarChart scores={scores} size={340} />
                  </div>

                  {/* Dimension Breakdown */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                    {DIMENSIONS.map((d, i) => {
                      const level = getDimensionLevel(scores[i]);
                      return (
                        <div key={d.id} className="dim-card" style={{
                          animation: `slideIn 0.4s ease-out ${i * 0.08}s both`,
                        }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <span style={{ fontSize: 22 }}>{d.icon}</span>
                              <div>
                                <div style={{ fontSize: 15, fontWeight: 600, color: d.color }}>{d.name}</div>
                                <div style={{ fontSize: 11, color: "#64748B" }}>{d.science}</div>
                              </div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                              <div style={{
                                fontSize: 22, fontWeight: 700, fontFamily: "'Space Mono', monospace",
                                color: d.color,
                              }}>
                                {scores[i].toFixed(1)}
                              </div>
                              <div style={{
                                fontSize: 11, fontWeight: 600,
                                color: level.color,
                                background: `${level.color}15`,
                                padding: "2px 8px", borderRadius: 4,
                              }}>
                                {level.label}
                              </div>
                            </div>
                          </div>
                          {/* Score bar */}
                          <div style={{ width: "100%", height: 6, background: "#1E293B", borderRadius: 3, overflow: "hidden" }}>
                            <div style={{
                              width: `${(scores[i] / 5) * 100}%`,
                              height: "100%",
                              background: `linear-gradient(90deg, ${d.color}, ${d.color}88)`,
                              borderRadius: 3,
                              transition: "width 1s cubic-bezier(0.4, 0, 0.2, 1)",
                            }} />
                          </div>
                          <p style={{ fontSize: 13, color: "#94A3B8", lineHeight: 1.6, marginTop: 10 }}>
                            {d.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* CTA / Email Capture */}
                  <div style={{
                    background: "linear-gradient(135deg, rgba(45,91,255,0.08) 0%, rgba(0,194,168,0.08) 100%)",
                    border: "1px solid rgba(45,91,255,0.2)",
                    borderRadius: 16, padding: 28,
                    textAlign: "center", marginBottom: 24,
                  }}>
                    {!emailSent ? (
                      <>
                        <div style={{ fontSize: 28, marginBottom: 12 }}>📊</div>
                        <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: "#F1F5F9" }}>
                          Részletes riport és fejlődési terv
                        </h3>
                        <p style={{ fontSize: 14, color: "#94A3B8", lineHeight: 1.6, marginBottom: 20, maxWidth: 400, margin: "0 auto 20px" }}>
                          Kapj személyre szabott elemzést minden dimenzióban, konkrét fejlődési javaslatokkal és tudományos háttérrel.
                        </p>
                        <div style={{ display: "flex", gap: 10, maxWidth: 400, margin: "0 auto" }}>
                          <input
                            type="email"
                            className="email-input"
                            placeholder="email@ceg.hu"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && !emailSending && handleEmailSubmit()}
                            disabled={emailSending}
                          />
                          <button 
                            className="cta-btn" 
                            style={{ whiteSpace: "nowrap", padding: "14px 24px", opacity: emailSending ? 0.6 : 1 }} 
                            onClick={handleEmailSubmit}
                            disabled={emailSending}
                          >
                            {emailSending ? "Küldés..." : "Küldés →"}
                          </button>
                        </div>
                        {emailError && (
                          <p style={{ fontSize: 13, color: "#EF4444", marginTop: 12, fontWeight: 500 }}>
                            ⚠️ {emailError}
                          </p>
                        )}
                        <p style={{ fontSize: 11, color: "#475569", marginTop: 12 }}>
                          Nem küldünk spamot. Csak a riportot kapod meg.
                        </p>
                      </>
                    ) : (
                      <>
                        <div style={{ fontSize: 42, marginBottom: 12 }}>✅</div>
                        <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: "#F1F5F9" }}>
                          Elküldtük!
                        </h3>
                        <p style={{ fontSize: 14, color: "#94A3B8", lineHeight: 1.6 }}>
                          A részletes riportodat hamarosan megkapod a(z) <strong style={{ color: "#E2E8F0" }}>{email}</strong> címre.
                        </p>
                      </>
                    )}
                  </div>

                  {/* Y2Y CTA */}
                  <div style={{
                    background: "rgba(30, 41, 59, 0.4)",
                    border: "1px solid #1E293B",
                    borderRadius: 14, padding: 24,
                    textAlign: "center", marginBottom: 24,
                  }}>
                    <p style={{ fontSize: 15, color: "#CBD5E1", lineHeight: 1.6, marginBottom: 4 }}>
                      <strong>{profile.cta}</strong>
                    </p>
                    <p style={{ fontSize: 14, color: "#94A3B8", lineHeight: 1.6, marginBottom: 16 }}>
                      A Y2Y Hungary neuroscience-alapú vezetőfejlesztési programjai segítenek szintet lépni.
                    </p>
                    <a
                      href="https://www.y2y.hu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cta-btn"
                      style={{ display: "inline-block", textDecoration: "none" }}
                    >
                      Tudj meg többet a Y2Y-ról →
                    </a>
                  </div>

                  {/* Restart */}
                  <div style={{ textAlign: "center", marginBottom: 40 }}>
                    <button
                      onClick={restart}
                      style={{
                        background: "none", border: "1px solid #334155",
                        borderRadius: 10, padding: "10px 24px",
                        color: "#64748B", fontSize: 14, cursor: "pointer",
                        fontFamily: "'DM Sans', sans-serif",
                        transition: "all 0.2s",
                      }}
                      onMouseOver={(e) => { e.target.style.borderColor = "#2D5BFF"; e.target.style.color = "#94A3B8"; }}
                      onMouseOut={(e) => { e.target.style.borderColor = "#334155"; e.target.style.color = "#64748B"; }}
                    >
                      Újrakezdés
                    </button>
                  </div>

                  {/* Footer */}
                  <div style={{
                    textAlign: "center", padding: "24px 0",
                    borderTop: "1px solid #1E293B",
                  }}>
                    <div style={{ fontSize: 11, color: "#475569", lineHeight: 1.6 }}>
                      © 2026 Y2Y Hungary Kft. · Ground v1.0
                      <br />
                      Tudományos háttér: SCARF Model (Rock, 2008) · Psychological Safety (Edmondson, 1999)
                      <br />
                      Dual-Process Theory (Kahneman, 2011) · Cognitive Flexibility (Diamond, 2013) · Csoportdinamika (Riemann, 1961)
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
