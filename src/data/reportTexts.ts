export interface DimensionReport {
  summary: string;
  strengths: string;
  advice: string;
  practice: string;
}

// 4 levels per dimension: strength (>=4.2), good (>=3.4), developing (>=2.6), focus (<2.6)
type LevelKey = 'strength' | 'good' | 'developing' | 'focus';

function getLevelKey(score: number): LevelKey {
  if (score >= 4.2) return 'strength';
  if (score >= 3.4) return 'good';
  if (score >= 2.6) return 'developing';
  return 'focus';
}

const reports: Record<string, Record<LevelKey, DimensionReport>> = {
  cognitive_flexibility: {
    strength: {
      summary: 'Kiemelkedően rugalmas gondolkodó vagy — gyorsan váltasz kontextusok, nézőpontok és megoldási módok között. Ez a FLUX évtized egyik legértékesebb vezetői kompetenciája.',
      strengths: 'Természetesen mozogsz különböző gondolkodási keretrendszerek között. Nyitott vagy az új információkra, és képes vagy felülírni korábbi feltételezéseidet, ha a helyzet megváltozik.',
      advice: 'Ezen a szinten a legnagyobb kihívás az, hogy másoknak is segíts fejleszteni ezt a képességet. Figyelj arra, hogy a csapatod is tudjon váltani — ne csak te lásd a több perspektívát.',
      practice: 'Próbáld ki: amikor legközelebb megoldást javasolsz, kérd meg a csapatot, hogy találjanak rá 3 teljesen más megközelítést. Aztán válasszátok ki együtt a legjobbat — lehet, hogy nem a tiéd lesz.',
    },
    good: {
      summary: 'Erős kognitív rugalmassággal rendelkezel — a legtöbb helyzetben képes vagy váltani és alkalmazkodni. Van néhány terület, ahol még tudatosabb lehetsz.',
      strengths: 'Jól kezeled a váratlan helyzeteket, és általában nyitott vagy az új megközelítésekre. A csapatod érzi, hogy nem ragaszkodsz mereven egy megoldáshoz.',
      advice: 'Figyeld meg, mikor esik nehezedre a váltás — jellemzően stressz alatt vagy időnyomásban csökken a rugalmasság. Építs be tudatos „megállók"-at a döntéshozatalba.',
      practice: 'Mielőtt fontos döntést hozol, kérdezd meg magadtól: „Milyen információ változtatná meg a véleményemet?" Ha kapásból SEMMILYEN nem jut eszedbe, állj meg egy percre — valószínűleg túl mereven gondolkodsz.',
    },
    developing: {
      summary: 'A kognitív rugalmasságod fejlődő szinten van — a megszokott helyzetekben jól boldogulsz, de új vagy összetett szituációkban nehezebben váltasz.',
      strengths: 'Van benned hajlandóság arra, hogy meghallgass más véleményeket, és a jól ismert területeken képes vagy alkalmazkodni.',
      advice: 'Kezdd tudatosan gyakorolni a perspektívaváltást. A legtöbb vezető ezen a szinten azért akad el, mert a bevált megoldásokhoz ragaszkodik — még akkor is, ha a kontextus megváltozott.',
      practice: 'Hetente egyszer próbálj ki egy teljesen új megközelítést egy rutinfeladatban. Nem kell nagy dolog legyen — az a lényeg, hogy az agyad hozzászokjon a váltáshoz.',
    },
    focus: {
      summary: 'A kognitív rugalmasság a legfontosabb fókuszterületed. A gyorsan változó környezetben ez a képesség kritikus — és a jó hír, hogy fejleszthető.',
      strengths: 'A stabilitás és a konzisztencia, amit képviselsz, értékes. Erre lehet építeni, miközben fokozatosan növeled a rugalmasságot.',
      advice: 'Kezdd kicsiben: a cél nem az, hogy azonnal mindent másképp csinálj, hanem hogy érzékenyebbé válj arra, mikor van szükség váltásra. Figyelj a jelekre, amikor a megszokott megoldás nem működik.',
      practice: 'Minden héten kérdezz meg egy kollégát, hogy ő hogyan közelítené meg az aktuális legnagyobb kihívásodat. Csak hallgasd meg — nem kell egyetértened, de gyakorold az alternatív nézőpont befogadását.',
    },
  },

  uncertainty_tolerance: {
    strength: {
      summary: 'Kiemelkedő bizonytalanság-tűréssel rendelkezel. Nemcsak elviseled a kiszámíthatatlanságot, hanem képes vagy benne dönteni és cselekedni.',
      strengths: 'Nyugodtan navigálsz bizonytalan helyzetekben, és a csapatodnak is biztonságot adsz olyankor, amikor nincs egyértelmű válasz. Nem blokkol a „nem tudom" érzése.',
      advice: 'Figyelj arra, hogy a magas tűrőképességed ne váljon a csapatod számára láthatatlan elvárássá. Amit te könnyedén kezelsz, az másoknak stresszes lehet — kommunikáld, hogy rendben van, ha valaki nehezebben viseli.',
      practice: 'Amikor bizonytalan helyzetben vagy, mondd ki hangosan: „Ezt most nem tudjuk biztosan, és ez rendben van. Ezzel fogunk dolgozni." Ez modellezi a csapatnak, hogyan lehet egészségesen kezelni a bizonytalanságot.',
    },
    good: {
      summary: 'Jól kezeled a bizonytalanságot — a legtöbb helyzetben nem blokkol az ismeretlen, és képes vagy haladni anélkül is, hogy minden kérdésre lenne válasz.',
      strengths: 'Van egy egészséges egyensúlyod a tervezés és az improvizáció között. Általában nem keresel hamis bizonyosságot, és elviseled, ha nem minden tiszta.',
      advice: 'A következő szint az, hogy aktívan keresd a bizonytalanságot mint lehetőséget. A leginnovatívabb megoldások ott születnek, ahol nincs előre megírt forgatókönyv.',
      practice: 'Havonta egyszer vállalj be egy projektet vagy döntést, ahol tudatosan kevesebb információval dolgozol, mint amennyit szeretnél. Figyeld meg, hogyan változik a komfortérzeted.',
    },
    developing: {
      summary: 'A bizonytalanság-tűrésed fejlődő szinten van. Stabil környezetben jól működsz, de amikor a dolgok kiszámíthatatlanná válnak, hajlamos vagy túltervezni vagy elkerülni a döntést.',
      strengths: 'Az óvatosságod és alaposságod értékes — nem rohansz bele kapkodva a dolgokba. Erre a stabilitásra lehet építeni.',
      advice: 'A bizonytalanság nem ellenség — hanem a jövő alapállapota. A cél nem az, hogy ne érezd a feszültséget, hanem hogy cselekedni tudj mellette.',
      practice: 'Amikor legközelebb bizonytalan helyzetbe kerülsz, próbáld ki a „70%-os szabályt": ha a rendelkezésre álló információ 70%-a elérhető, hozd meg a döntést. A tökéletes információ soha nem lesz meg.',
    },
    focus: {
      summary: 'A bizonytalanság-tűrés a legfontosabb fejlődési területed. A FLUX évtizedben a kiszámíthatatlanság az új norma — és a te képességed erre reagálni kulcsfontosságú.',
      strengths: 'Az, hogy szereted a dolgokat kiszámíthatóan — ez nem gyengeség. Sok szervezeti funkció pont erre épül. A kérdés az, hogy vezetőként hogyan bővíted a komfortzónádat.',
      advice: 'Kezdd azzal, hogy különválasztod a kockázatot a bizonytalanságtól. Nem minden ismeretlen veszélyes — és a legtöbb bizonytalan helyzet kezelhető, ha kicsi lépésekben haladsz.',
      practice: 'Vezess „bizonytalansági naplót" egy héten át: írd le, mikor érezted magad bizonytalannak, mit tettél, és mi lett az eredmény. Gyakran meglepő, mennyire jól boldogulsz a bizonytalansággal — csak nem veszed észre.',
    },
  },

  autonomy_design: {
    strength: {
      summary: 'Kiváló autonómia-tervező vagy. Tudatosan adsz döntési teret a csapatodnak, és az embereid érzik, hogy megbízol bennük.',
      strengths: 'Nem mikro-menedzselsz, hanem kereteket adsz. A csapatod tagjai érzik, hogy van beleszólásuk, és ez láthatóan növeli az elköteleződésüket és a teljesítményüket.',
      advice: 'Ügyelj a „szabadság-felelősség" egyensúlyra: a nagy autonómia csak akkor működik, ha a visszajelzési rendszer is erős. Ellenőrizd, hogy a csapatod tudja-e, hogyan kérjen segítséget, ha elakad.',
      practice: 'Rendszeresen kérdezd meg: „Miben szeretnétek több szabadságot?" és „Hol éreznétek, hogy több támogatásra van szükségetek?" Ez az egyensúly fenntartásának kulcsa.',
    },
    good: {
      summary: 'Jól adagolod az autonómiát — általában érzed, mikor kell elengedni és mikor beavatkozni. Van néhány terület, ahol még tudatosabban lehetne.',
      strengths: 'A csapatod tagjai általában érzik a bizalmadat, és van mozgásterük. Nem vagy túlkontrolláló, de ott vagy, amikor szükség van rád.',
      advice: 'Figyeld meg, mikor veszel vissza kontrollt feleslegesen — jellemzően stressz alatt vagy fontos projekt esetén szoktuk túlzásba vinni a felügyeletet.',
      practice: 'Válassz ki egy közepes fontosságú projektet, és delegáld teljes egészében — beleértve a „hogyan"-t is, ne csak a „mit"-et. Aztán ne avatkozz közbe 2 hétig, hacsak nem kérnek segítséget. Figyeld meg, mi történik.',
    },
    developing: {
      summary: 'Az autonómia-tervezésed fejlődő szinten van. Hajlamos lehetsz többet kontrollálni, mint amennyire szükséges — nem feltétlenül szándékosan, hanem megszokásból.',
      strengths: 'Az, hogy odafigyelsz a részletekre és gondoskodó vagy, értékes. A kérdés az, hogyan fordítod ezt a figyelmet a keretek megteremtésére a mikro-menedzsment helyett.',
      advice: 'A delegálás nem azt jelenti, hogy elengedsz mindent — hanem azt, hogy a „mi a cél" és a „hogyan csináljuk" között húzol egy vonalat. Te határozod meg a célt, a csapat a hogyan-t.',
      practice: 'Készíts egy „döntési mátrixot" a csapatoddal: melyik döntéseket hozzák meg önállóan, melyeket egyeztetéssel, és melyeket te. Írd le és tartsd be.',
    },
    focus: {
      summary: 'Az autonómia-tervezés a legfontosabb fókuszterületed. Ha a csapatod nem érez valódi döntési teret, hosszú távon csökken az innovációs készségük és az elköteleződésük.',
      strengths: 'A részletekre figyelés és a minőségigény, ami nálad jelen van, értékes. Erre lehet építeni úgy, hogy a minőségi elvárásokat kommunikálod, nem a folyamatot írod elő.',
      advice: 'Kezdd azzal, hogy észreveszed, mikor mondod meg a „hogyan"-t. Sokszor nem is tudatosan tesszük — egyszerűen csak annyira ismerjük a dolgot, hogy automatikusan megmondjuk a megoldást.',
      practice: 'Egy héten át, minden alkalommal, amikor utasítást adnál, előtte kérdezd meg: „Neked mi lenne az ötleted?" Meglepő, milyen jó megoldásokkal jönnek az emberek, ha teret kapnak.',
    },
  },

  psychological_safety: {
    strength: {
      summary: 'Kiemelkedő pszichológiai biztonságot teremtesz. Az emberek körülötted mernek hibázni, kérdezni és újat próbálni — ez a legértékesebb, amit vezető adhat.',
      strengths: 'A csapatod tagjai érzik, hogy nálad nem kell „tökéletesnek" lenniük. Nyíltan beszélnek a problémákról, és nem félnek rossz hírt hozni. Ez az innováció alapfeltétele.',
      advice: 'Tartsd fenn ezt tudatosan — a pszichológiai biztonság törékeny, és egy rossz pillanat hónapok munkáját teheti tönkre. Különösen nyomás alatt figyelj oda a reakcióidra.',
      practice: 'A következő meetingen mondj el egy saját hibát az elmúlt hétről — konkrétan, mit tanultál belőle. Ha te modellezed a sebezhetőséget, a csapat is merni fogja.',
    },
    good: {
      summary: 'Jó szintű pszichológiai biztonságot teremtesz — a csapatod tagjai általában mernek szólni, de lehet, hogy vannak helyzetek, ahol ez visszafogottabb.',
      strengths: 'Alapvetően nyitott vagy a visszajelzésekre, és a csapatod érzi, hogy nem bünteted a hibákat. Ez erős alap.',
      advice: 'Figyelj meg, mikor „záródik be" a csapat: jellemzően stressz alatt, fontos döntéseknél vagy státuszkülönbségek mentén csökken a pszichológiai biztonság.',
      practice: 'Vezess be „előre tervezett hibákat": rendszeresen kérdezd meg a csapatot, „Mi mehet rosszul ebben a tervben?" Ha ezt a te ötletednél is alkalmazod, modellezed, hogy a kritika nem személyes támadás.',
    },
    developing: {
      summary: 'A pszichológiai biztonság terén van fejlődési lehetőséged. Lehet, hogy a csapatod tagjai nem mindig merik elmondani, amit gondolnak — és ez észrevétlenül visszafogja az innovációt.',
      strengths: 'Az, hogy gondolkodsz ezen, már önmagában fontos lépés. A legtöbb vezető nem is tudatosítja, milyen hatással van a csapat biztonságérzetére.',
      advice: 'A pszichológiai biztonság a kis pillanatokban épül: hogyan reagálsz egy rossz hírre, hogyan fogadod a kritikát, mit teszel, amikor valaki hibázik.',
      practice: 'Egy héten át figyeld meg, mi történik, amikor valaki hibát hoz a tudomásodra. Mi az első reakciód? Ha az arcod, a hangod vagy a szavaid bármilyen negatív jelzést adnak — a csapat megjegyzi.',
    },
    focus: {
      summary: 'A pszichológiai biztonság a legfontosabb területed, amin érdemes dolgozni. Ha az emberek nem érzik magukat biztonságban, minden más kompetencia hatékonysága csökken.',
      strengths: 'Az, hogy hajlandó vagy belenézni ebbe a tükörbe, már bátorság. Sok vezető soha nem jut el idáig.',
      advice: 'A legtöbben nem tanultuk meg, hogyan teremtsünk pszichológiai biztonságot, pedig ez alapvető a csapat hatékonyságához.',
      practice: 'Kezdd azzal, hogy a következő megbeszélésen te mondod el először, amiben bizonytalan voltál a héten. Ha te mutatod meg a sebezhetőséget, a csapat is merni fogja.',
    },
  },

  adaptive_decision: {
    strength: {
      summary: 'Kiváló adaptív döntéshozó vagy — gyorsan, tudatosan és rugalmasan döntesz, miközben felismered saját kognitív torzításaidat.',
      strengths: 'Jól érzed, mikor kell gyorsan dönteni és mikor érdemes lassítani. Ismered a saját elfogultságaidat, és aktívan dolgozol azok ellen.',
      advice: 'Ezen a szinten a legnagyobb hozzáadott értéked az, ha másokat is megtanítasz jobb döntéseket hozni. Oszd meg a csapatoddal a döntéshozatali keretrendszereidet.',
      practice: 'Vezess be „döntési retrospektíveket": havonta egyszer vizsgáljátok meg a csapattal, mely döntések váltak be és melyek nem — és miért. Ez mindenkit jobb döntéshozóvá tesz.',
    },
    good: {
      summary: 'Erős döntéshozó vagy, aki a legtöbb helyzetben jól egyensúlyoz a gyorsaság és az alaposság között.',
      strengths: 'Általában jó döntéseket hozol, és elég rugalmas vagy ahhoz, hogy korrigálj, ha kell. A csapatod bízik a döntéseidben.',
      advice: 'Figyelj azokra a helyzetekre, ahol hajlamos vagy halogatni: a tökéletes döntés várása gyakran rosszabb, mint egy elég jó döntés most. Valamint érdemes tudatosabban figyelned a kognitív torzításokra.',
      practice: 'Minden fontos döntésnél kérdezd meg magadtól: „Mi az, amit nem akarok meglátni?" A megerősítési torzítás a leggyakoribb csapda — aktívan keresd az ellentétes bizonyítékokat.',
    },
    developing: {
      summary: 'A döntéshozatalod fejlődő szinten van — rutinhelyzetben jól boldogulsz, de összetett vagy gyorsan változó szituációkban hajlamos lehetsz elakadni.',
      strengths: 'Az alaposságod és az, hogy nem döntesz kapkodva, értékes. Erre lehet építeni, miközben növeled a döntési sebességedet.',
      advice: 'A legtöbb döntés visszafordítható — és a visszafordítható döntéseknél a gyorsaság fontosabb, mint a tökéletesség. Tanuld meg megkülönböztetni a „kétirányú ajtókat" az „egyirányú ajtóktól".',
      practice: 'Egy héten át jegyezd fel, mennyi időt töltöttél döntésekkel. Jelöld meg, melyik volt visszafordítható és melyik nem.',
    },
    focus: {
      summary: 'Az adaptív döntéshozatal a legfontosabb fókuszterületed. A FLUX évtizedben a döntési sebesség és rugalmasság kritikus — és ez fejleszthető.',
      strengths: 'Az, hogy körültekintő vagy, alapvetően jó tulajdonság. A kérdés az, hogy ez mikor válik döntésképtelenséggé.',
      advice: 'Kezdd azzal, hogy elfogadod: a rossz döntés általában jobb, mint a nem-döntés. A legtöbb helyzetben az információ 70%-a elegendő — a maradék 30% soha nem lesz meg.',
      practice: 'Vezess be egy „5 perces szabályt" a kisebb döntéseknél: ha 5 perc alatt eldönthető, döntsd el azonnal. Ez felszabadítja az agyadat a nagyobb döntésekre.',
    },
  },

  group_culture_awareness: {
    strength: {
      summary: 'Kiemelkedő csoportkultúra-tudatossággal rendelkezel. Látod és tudatosan alakítod a csapatod kultúráját — ez ritka és rendkívül értékes képesség.',
      strengths: 'Felismered a különböző csoportdinamikákat, és képes vagy alkalmazkodni hozzájuk. Tudod, hogy a kultúra nem véletlenül alakul — és aktívan formálod.',
      advice: 'Használd ezt a tudatosságodat arra, hogy a csapatod tagjait is érzékenyebbé tedd a kultúrára. Minél többen látják, annál erősebb lesz.',
      practice: 'Negyedévente tarts „kultúra-check-in"-t a csapatoddal: „Milyen viselkedést jutalmazunk itt valójában? Milyet kellene? Mi az, ami kimondatlanul elfogadott?"',
    },
    good: {
      summary: 'Jó kultúra-tudatossággal rendelkezel — érzed a csoportdinamikákat, és általában tudatosan alakítod a csapatkultúrát.',
      strengths: 'Felismered, amikor a csapatban valami „nem stimmel", és hajlandó vagy foglalkozni vele. A legtöbb embered érzi, hogy odafigyelsz a csapat működésére.',
      advice: 'A következő szint az, hogy ne csak reagálj a kultúrára, hanem proaktívan formáld. Gondolkodj el: milyen kultúrát szeretnél, és milyen viselkedéseiddel teremted meg azt?',
      practice: 'Írd le 3 mondatban, milyen kultúrát szeretnél a csapatodban. Aztán kérdezd meg 3 kollégádat, ők hogyan írnák le a jelenlegi kultúrát. A kettő közötti rés a fejlődési lehetőséged.',
    },
    developing: {
      summary: 'A csoportkultúra-tudatosságod fejlődő szinten van. Érzékelsz dinamikákat, de nem mindig tudatosan reagálsz rájuk.',
      strengths: 'Intuitívan érzed, ha a csapatban feszültség van. Ez jó alap — a kérdés az, hogy hogyan fordítod ezt tudatos kultúra-alakítássá.',
      advice: 'A csoportkultúra nem véletlenül alakul — mindig a vezető viselkedése formálja a legerősebben. Amit te csinálsz, az lesz a norma, függetlenül attól, mit mondasz.',
      practice: 'Figyelj meg egy héten át, milyen viselkedéseket „jutalmazol" (figyelemmel, dicsérettel, idővel) és milyeneket „büntetsz" (figyelmen kívül hagyással, kritikával). Ez a csapatkultúrád valódi képe.',
    },
    focus: {
      summary: 'A csoportkultúra-tudatosság a legfontosabb fejlődési területed. Ha nem tudatosan alakítod a kultúrát, az magától alakul — és nem mindig jó irányba.',
      strengths: 'Az, hogy ezt most felismered, fontos első lépés. A legtöbb vezető nem is gondol arra, hogy a csapatkultúra az ő felelőssége.',
      advice: 'Kezdd azzal, hogy megfigyeled: milyen viselkedés „terjedő" a csapatodban? Mi az, ami elfogadott és mi nem? Ezek a csapatkultúra jelei.',
      practice: 'A következő csapatmegbeszélésen figyeld meg: ki szólal meg először? Ki hallgat? Ki kivel ért egyet automatikusan? Ezek a minták sokat elárulnak a csapatod kultúrájáról — és arról, mit érdemes változtatni.',
    },
  },
};

export function getDimensionReport(dimensionId: string, score: number): DimensionReport {
  const levelKey = getLevelKey(score);
  const dimReports = reports[dimensionId];
  if (!dimReports) {
    return {
      summary: '',
      strengths: '',
      advice: '',
      practice: '',
    };
  }
  return dimReports[levelKey];
}
