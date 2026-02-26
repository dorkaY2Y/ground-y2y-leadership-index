export interface Answer {
  text: string;
  score: number;
}

export interface Question {
  id: number;
  dimensionId: string;
  text: string;
  answers: Answer[];
}

export const questions: Question[] = [
  // KOGNITÍV RUGALMASSÁG (1-4)
  {
    id: 1,
    dimensionId: 'cognitive_flexibility',
    text: 'Amikor egy jól bevált folyamatról kiderül, hogy már nem működik, hogyan reagálsz?',
    answers: [
      { text: 'Azonnal elkezdem keresni az alternatívákat és kísérletezni', score: 5 },
      { text: 'Összegyűjtöm az adatokat és átgondolom a lehetőségeket', score: 4 },
      { text: 'Megpróbálom először finomhangolni a meglévő folyamatot', score: 3 },
      { text: 'Várok, hátha a helyzet magától rendeződik', score: 2 },
      { text: 'Ragaszkodom a bevált módszerhez – eddig működött', score: 1 },
    ],
  },
  {
    id: 2,
    dimensionId: 'cognitive_flexibility',
    text: 'Egy nap alatt stratégiai meetingről operatív tűzoltásba, onnan coaching beszélgetésbe váltasz. Hogyan éled meg?',
    answers: [
      { text: 'Élvezem a változatosságot, könnyen váltok módok között', score: 5 },
      { text: 'Tudatosan készülök a váltásokra, szüneteket iktatok be', score: 4 },
      { text: 'Megbirkózom vele, de a nap végére kimerülök', score: 3 },
      { text: 'Nehezen váltok, az egyik téma gondolatai átszűrődnek a másikba', score: 2 },
      { text: 'Ez a tempó szétszed – nem tudok egyikre sem fókuszálni', score: 1 },
    ],
  },
  {
    id: 3,
    dimensionId: 'cognitive_flexibility',
    text: 'Egy kollégád radikálisan más megközelítést javasol egy projektre, mint amit te elképzeltél. Mi a reakciód?',
    answers: [
      { text: 'Kíváncsi vagyok – kérem, hogy fejtse ki részletesen az érveit', score: 5 },
      { text: 'Meghallgatom, de közben összehasonlítom a sajátommal', score: 4 },
      { text: 'Elfogadom, de belül azért fenntartásaim vannak', score: 3 },
      { text: 'Udvariasan meghallgatom, de ragaszkodom az eredetihez', score: 2 },
      { text: 'Frusztráló, hogy nem látja be, miért jobb az én elképzelésem', score: 1 },
    ],
  },
  {
    id: 4,
    dimensionId: 'cognitive_flexibility',
    text: 'Az elmúlt félévben hányszor változtattál meg egy saját meggyőződésedet egy csapattag érvelése alapján?',
    answers: [
      { text: 'Többször – aktívan keresem azokat a helyzeteket, ahol tévedhetek', score: 5 },
      { text: 'Néhányszor, és minden alkalommal tanultam belőle', score: 4 },
      { text: 'Egyszer-kétszer, de nem volt könnyű beismernem', score: 3 },
      { text: 'Nem igazán emlékszem ilyenre – általában nekem van igazam', score: 2 },
      { text: 'A vezető dolga, hogy irányt mutasson, nem az, hogy folyton változtasson', score: 1 },
    ],
  },

  // BIZONYTALANSÁG-TŰRÉS (5-8)
  {
    id: 5,
    dimensionId: 'uncertainty_tolerance',
    text: 'Egy fontos projekt közben hirtelen megváltoznak a piaci feltételek. Mit teszel először?',
    answers: [
      { text: 'Gyorsan felmérem, mi változott, és az első 48 órában új tervet rakok össze', score: 5 },
      { text: 'Összehívom a csapatot, hogy közösen értékeljük a helyzetet és adaptáljunk', score: 4 },
      { text: 'Szünetet tartok, átgondolom a lehetőségeket, mielőtt reagálnék', score: 3 },
      { text: 'Próbálom a meglévő tervet menteni amennyire lehet', score: 2 },
      { text: 'Megbénulok – a kiszámíthatatlanság nagyon stresszessé tesz', score: 1 },
    ],
  },
  {
    id: 6,
    dimensionId: 'uncertainty_tolerance',
    text: 'Hogyan kommunikálsz a csapatoddal, amikor te sem tudod, mi lesz a következő negyedévben?',
    answers: [
      { text: 'Nyíltan mondom, hogy nem tudom – és közösen keressük az irányt', score: 5 },
      { text: 'Megosztom, amit tudok, és keretet adok a bizonytalanságnak', score: 4 },
      { text: 'Próbálom a bizonytalanságot "kontrollált üzenetekbe" csomagolni', score: 3 },
      { text: 'Inkább várok, amíg lesz valami konkrétum, amit mondhatok', score: 2 },
      { text: 'Megnyugtató üzeneteket küldök, még ha nem is teljesen reálisak', score: 1 },
    ],
  },
  {
    id: 7,
    dimensionId: 'uncertainty_tolerance',
    text: 'A te iparágadban komoly átalakulás várható a következő 3 évben (technológiai, szabályozási vagy piaci). Hogyan készülsz rá?',
    answers: [
      { text: 'Már most kísérletezek és építek új képességeket a csapatban', score: 5 },
      { text: 'Van egy konkrét fejlődési tervem, ami rendszeresen frissül', score: 4 },
      { text: 'Figyelemmel kísérem a trendeket, de még nem léptem konkrétan', score: 3 },
      { text: 'Remélem, hogy a változás lassabb lesz, mint amit jósolnak', score: 2 },
      { text: 'Majd alkalmazkodom, ha tényleg eljön – most más a prioritás', score: 1 },
    ],
  },
  {
    id: 8,
    dimensionId: 'uncertainty_tolerance',
    text: 'Vezetőként hogyan viszonyulsz a hosszú távú tervezéshez a jelenlegi környezetben?',
    answers: [
      { text: 'Rövid iterációkban gondolkodom, de van egy adaptálható vízióm', score: 5 },
      { text: '3-6 hónapos ciklusokban tervezek, rugalmas kerettel', score: 4 },
      { text: 'Éves tervet készítek, és negyedévente felülvizsgálom', score: 3 },
      { text: 'Ragaszkodom az éves tervhez, különben elveszítem a fókuszt', score: 2 },
      { text: 'Hosszú távú terv nélkül nem tudok vezetni', score: 1 },
    ],
  },

  // AUTONÓMIA-TERVEZÉS (9-12)
  {
    id: 9,
    dimensionId: 'autonomy_design',
    text: 'Egy csapattagod más módszert választ egy feladatra, mint amit te javasolnál. Mit teszel?',
    answers: [
      { text: 'Hagyom – az eredmény számít, nem az út', score: 5 },
      { text: 'Megkérdezem, mi az indoka, és ha van logikája, támogatom', score: 4 },
      { text: 'Elmondom a véleményem, de rábízom a döntést', score: 3 },
      { text: 'Megpróbálom finoman a saját módszerem felé terelni', score: 2 },
      { text: 'Megmondom, hogy csinálja az én módszeremmel – az bevált', score: 1 },
    ],
  },
  {
    id: 10,
    dimensionId: 'autonomy_design',
    text: 'Hogyan delegálsz egy komplex projektet?',
    answers: [
      { text: 'Megadom a célt és a kereteket, a hogyanra a csapat talál megoldást', score: 5 },
      { text: 'Megbeszéljük együtt a megközelítést, utána ők viszik', score: 4 },
      { text: 'Részletes tervet adok, de nyitott vagyok módosításokra', score: 3 },
      { text: 'Részletes tervet adok és rendszeresen ellenőrzöm a haladást', score: 2 },
      { text: 'Inkább magam csinálom – gyorsabb és biztosabb', score: 1 },
    ],
  },
  {
    id: 11,
    dimensionId: 'autonomy_design',
    text: 'Milyen gyakran kérsz státuszfrissítést a csapatodtól egy folyamatban lévő projektnél?',
    answers: [
      { text: 'A csapattal közösen alakítjuk ki a check-in ritmust a projekt igényei szerint', score: 5 },
      { text: 'Heti egy rövid szinkron, a közbülső időben bízom bennük', score: 4 },
      { text: 'Heti 2-3 alkalommal rákérdezek informálisan', score: 3 },
      { text: 'Naponta szeretek tudni a státuszról', score: 2 },
      { text: 'Folyamatosan figyelemmel kísérem és azonnal jelzek, ha eltérést látok', score: 1 },
    ],
  },
  {
    id: 12,
    dimensionId: 'autonomy_design',
    text: 'Egy junior kolléga hibázik egy fontos prezentációban. Mi a reakciód?',
    answers: [
      { text: 'Megbeszéljük, mit tanult belőle, és legközelebb ő fogja jobban csinálni', score: 5 },
      { text: 'Átbeszéljük a hibát és közösen készítünk tervet a következőre', score: 4 },
      { text: 'Segítek kijavítani, és felajánlom, hogy legközelebb átnézem előtte', score: 3 },
      { text: 'Legközelebb én nézem át a prezentációt, mielőtt bemutatja', score: 2 },
      { text: 'Legközelebb inkább én tartom a fontos prezentációkat', score: 1 },
    ],
  },

  // PSZICHOLÓGIAI BIZTONSÁG (13-16)
  {
    id: 13,
    dimensionId: 'psychological_safety',
    text: 'Egy meetingen senki nem mond ellent a te javaslatodnak. Hogyan értékeled ezt?',
    answers: [
      { text: 'Gyanús – aktívan provokálom a kritikus gondolkodást', score: 5 },
      { text: 'Közvetlenül megkérdezem: "Mi az, ami ebben nem működhet?"', score: 4 },
      { text: 'Megkérdezem, van-e kérdés vagy hozzáfűznivaló', score: 3 },
      { text: 'Örülök, hogy egyetértenek, és lépünk tovább', score: 2 },
      { text: 'Ez azt jelenti, hogy jó az ötletem – menjünk tovább', score: 1 },
    ],
  },
  {
    id: 14,
    dimensionId: 'psychological_safety',
    text: 'Milyen gyakran beszélsz nyíltan a saját hibáidról a csapatod előtt?',
    answers: [
      { text: 'Rendszeresen – ez teremti meg a közeget, ahol mások is mernek hibázni', score: 5 },
      { text: 'Amikor releváns, megosztom a tanulságot belőle', score: 4 },
      { text: 'Alkalmanként, ha segíti a helyzetet', score: 3 },
      { text: 'Ritkán – a vezető legyen a stabil pont', score: 2 },
      { text: 'Soha – a vezető gyengeségeit nem kell közszemlére tenni', score: 1 },
    ],
  },
  {
    id: 15,
    dimensionId: 'psychological_safety',
    text: 'Egy csapattagod zavartan bevallja, hogy nem érti az AI-t és fél, hogy el fogja veszíteni a munkáját. Mit válaszolsz?',
    answers: [
      { text: 'Megköszönöm az őszinteségét, és közösen készítünk fejlődési tervet', score: 5 },
      { text: 'Normalizálom az érzést és konkrét támogatást ajánlok', score: 4 },
      { text: 'Megnyugtatom, hogy nem lesz olyan vészes', score: 3 },
      { text: 'Elmondom, hogy alkalmazkodnia kell – ez a jövő', score: 2 },
      { text: 'Mindenki felelős a saját fejlődéséért – elérhető a képzés', score: 1 },
    ],
  },
  {
    id: 16,
    dimensionId: 'psychological_safety',
    text: 'Hogyan kezeled, ha egy megbeszélésen két kollégád hevesen vitatkozik?',
    answers: [
      { text: 'Facilitálom a vitát – elválasztom a személyt az ügytől és mélyítjük a megértést', score: 5 },
      { text: 'Hagyom kibontakozni a vitát, de figyelek a hangnemre', score: 4 },
      { text: 'Szünetet kérek és külön beszélek mindkettőjükkel', score: 3 },
      { text: 'Gyorsan leállítom – a meetingen nem vitatkozunk', score: 2 },
      { text: 'Eldöntöm a kérdést és lépünk tovább', score: 1 },
    ],
  },

  // ADAPTÍV DÖNTÉSHOZATAL (17-20)
  {
    id: 17,
    dimensionId: 'adaptive_decision',
    text: 'Egy fontos döntésnél ellentmondásos adataid vannak. Mit teszel?',
    answers: [
      { text: 'Hozok egy "elég jó" döntést gyorsan, és iterálok az eredmények alapján', score: 5 },
      { text: 'Meghatározom, mi az a minimum adat, ami a döntéshez kell, és azt megszerzem', score: 4 },
      { text: 'Több adatot gyűjtök, amíg egyértelmű nem lesz a helyzet', score: 3 },
      { text: 'Konzultálok a felettemmel vagy külső tanácsadóval', score: 2 },
      { text: 'Várok, amíg teljesen tiszta lesz a kép – rossz döntés rosszabb, mint késői döntés', score: 1 },
    ],
  },
  {
    id: 18,
    dimensionId: 'adaptive_decision',
    text: 'Az utolsó igazán nehéz döntésednél hogyan jutottál el a végső válaszig?',
    answers: [
      { text: 'Megnéztem az adatokat, meghallgattam az intuíciómat, és tudatosan mérlegeltem, hol mondanak mást', score: 5 },
      { text: 'Elsősorban az adatokra támaszkodtam, de figyeltem a megérzéseimre is', score: 4 },
      { text: 'Összegyűjtöttem az elérhető adatokat és azok alapján döntöttem', score: 3 },
      { text: 'A megérzésemre hallgattam – eddig ritkán csapott be', score: 2 },
      { text: 'Nem emlékszem, hogy tudatosan végig gondoltam volna a folyamatot', score: 1 },
    ],
  },
  {
    id: 19,
    dimensionId: 'adaptive_decision',
    text: 'Visszavontál-e nyilvánosan egy korábbi döntésedet, amikor új információ érkezett?',
    answers: [
      { text: 'Igen, rendszeresen – a jó vezető korrigál, nem ragaszkodik', score: 5 },
      { text: 'Igen, néhányszor – de nem volt könnyű', score: 4 },
      { text: 'Egyszer-kétszer, kivételes helyzetben', score: 3 },
      { text: 'Inkább csendben módosítok irányt', score: 2 },
      { text: 'Nem – a következetesség fontosabb, mint a korrekció', score: 1 },
    ],
  },
  {
    id: 20,
    dimensionId: 'adaptive_decision',
    text: 'Egy döntés meghozatala előtt mennyire vagy tudatában a saját kognitív torzításaidnak (pl. megerősítési torzítás, status quo torzítás)?',
    answers: [
      { text: 'Aktívan keresem a torzításaimat és rendszereket építek ellenük', score: 5 },
      { text: 'Ismerem a főbb torzításokat és igyekszem figyelni rájuk', score: 4 },
      { text: 'Hallottam róluk, de a gyakorlatban nehéz alkalmazni', score: 3 },
      { text: 'Nem nagyon foglalkozom ezzel – ösztönösen döntök', score: 2 },
      { text: 'Ez túl elméleti – a tapasztalat fontosabb', score: 1 },
    ],
  },

  // CSOPORTKULTÚRA-TUDATOSSÁG (21-24)
  {
    id: 21,
    dimensionId: 'group_culture_awareness',
    text: 'Hogyan jellemeznéd a csapatod jelenlegi működési kultúráját?',
    answers: [
      { text: 'Pontosan tudom, milyen kultúrát építünk, és tudatosan döntöttem így – ismerem az előnyeit és a korlátait is', score: 5 },
      { text: 'Van egy elképzelésem róla, és időnként tudatosan formálom', score: 4 },
      { text: 'Nem gondolkodtam még kultúra-kategóriákban, de érzem, mi működik', score: 3 },
      { text: 'A kultúra magától alakult ki, nem nagyon foglalkozom vele', score: 2 },
      { text: 'Nem értem, miért kellene ezen gondolkodni – csináljuk a dolgunkat', score: 1 },
    ],
  },
  {
    id: 22,
    dimensionId: 'group_culture_awareness',
    text: 'A csapatodban van, aki a stabilitást szereti, és van, aki a változást. Hogyan kezeled ezt a feszültséget?',
    answers: [
      { text: 'Tudatosan használom: a stabilitás-pártiak adják a keretet, a változás-pártiak az innovációt', score: 5 },
      { text: 'Megpróbálom megértetni mindkét oldallal a másik nézőpontját', score: 4 },
      { text: 'Általában az egyik oldal felé húzok, de tudom, hogy ez nem ideális', score: 3 },
      { text: 'Frusztráló, hogy nem gondolkodik mindenki ugyanúgy', score: 2 },
      { text: 'Akinek nem tetszik az irány, az alkalmazkodik vagy továbbáll', score: 1 },
    ],
  },
  {
    id: 23,
    dimensionId: 'group_culture_awareness',
    text: 'Egy új projekt indul. A csapatod egyik fele szoros együttműködést, közös ötletelést akar, a másik fele önálló munkát, tiszta felelősségi köröket. Mit teszel?',
    answers: [
      { text: 'Felmérem, melyik feladathoz melyik működési mód illik jobban, és ennek megfelelően szervezem a munkát', score: 5 },
      { text: 'Kompromisszumot keresek: közös kickoff, utána önálló munka, rendszeres szinkron', score: 4 },
      { text: 'Általában az egyik stílust választom, amit jobban ismerek', score: 3 },
      { text: 'Megmondom, hogyan fogunk dolgozni – a vezető dönt a keretről', score: 2 },
      { text: 'Nem gondolom, hogy ez lényeges – az eredmény számít, nem a módszer', score: 1 },
    ],
  },
  {
    id: 24,
    dimensionId: 'group_culture_awareness',
    text: 'Mennyire tudatosan váltasz vezetői stílust attól függően, hogy a csapatodnak épp struktúrára, innovációra, kapcsolódásra vagy önállóságra van szüksége?',
    answers: [
      { text: 'Tudatosan figyelem és diagnosztizálom, mire van szükség, és adaptálom a stílusomat', score: 5 },
      { text: 'Érzem, mikor kell váltanom, és többnyire sikerül is', score: 4 },
      { text: 'Van egy bevált stílusom, de néha kilépek belőle', score: 3 },
      { text: 'Következetesen egy stílusban vezetek – az emberek tudják, mire számíthatnak', score: 2 },
      { text: 'A jó vezető autentikus – nem kell szerepeket játszani', score: 1 },
    ],
  },
];
