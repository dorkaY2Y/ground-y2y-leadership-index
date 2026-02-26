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
    text: 'Amikor egy bevált folyamat már nem működik, azonnal keresem az alternatívákat és kísérletezek új megoldásokkal.',
    answers: [
      { text: '', score: 5 },
      { text: '', score: 4 },
      { text: '', score: 3 },
      { text: '', score: 2 },
      { text: '', score: 1 },
    ],
  },
  {
    id: 2,
    dimensionId: 'cognitive_flexibility',
    text: 'Könnyen váltok különböző vezetői szerepek között (stratégiai gondolkodás, operatív tűzoltás, coaching) egy napon belül.',
    answers: [
      { text: '', score: 5 },
      { text: '', score: 4 },
      { text: '', score: 3 },
      { text: '', score: 2 },
      { text: '', score: 1 },
    ],
  },
  {
    id: 3,
    dimensionId: 'cognitive_flexibility',
    text: 'Nyitott vagyok arra, hogy egy kollégám radikálisan más megközelítést javasoljon, mint amit én elképzeltem.',
    answers: [
      { text: '', score: 5 },
      { text: '', score: 4 },
      { text: '', score: 3 },
      { text: '', score: 2 },
      { text: '', score: 1 },
    ],
  },
  {
    id: 4,
    dimensionId: 'cognitive_flexibility',
    text: 'Az elmúlt félévben többször megváltoztattam egy saját meggyőződésemet egy csapattag érvelése alapján.',
    answers: [
      { text: '', score: 5 },
      { text: '', score: 4 },
      { text: '', score: 3 },
      { text: '', score: 2 },
      { text: '', score: 1 },
    ],
  },

  // BIZONYTALANSÁG-TŰRÉS (5-8)
  {
    id: 5,
    dimensionId: 'uncertainty_tolerance',
    text: 'Amikor egy projekt közben hirtelen megváltoznak a piaci feltételek, gyorsan új tervet rakok össze és adaptálok.',
    answers: [
      { text: '', score: 5 },
      { text: '', score: 4 },
      { text: '', score: 3 },
      { text: '', score: 2 },
      { text: '', score: 1 },
    ],
  },
  {
    id: 6,
    dimensionId: 'uncertainty_tolerance',
    text: 'Nyíltan kommunikálok a csapatommal, amikor én sem tudom, mi lesz a következő negyedévben.',
    answers: [
      { text: '', score: 5 },
      { text: '', score: 4 },
      { text: '', score: 3 },
      { text: '', score: 2 },
      { text: '', score: 1 },
    ],
  },
  {
    id: 7,
    dimensionId: 'uncertainty_tolerance',
    text: 'Már most aktívan készülök a várható iparági változásokra (technológiai, szabályozási, piaci átalakulás).',
    answers: [
      { text: '', score: 5 },
      { text: '', score: 4 },
      { text: '', score: 3 },
      { text: '', score: 2 },
      { text: '', score: 1 },
    ],
  },
  {
    id: 8,
    dimensionId: 'uncertainty_tolerance',
    text: 'Rövid iterációkban gondolkodom és tervezek, de van egy adaptálható hosszú távú vízióm.',
    answers: [
      { text: '', score: 5 },
      { text: '', score: 4 },
      { text: '', score: 3 },
      { text: '', score: 2 },
      { text: '', score: 1 },
    ],
  },

  // AUTONÓMIA-TERVEZÉS (9-12)
  {
    id: 9,
    dimensionId: 'autonomy_design',
    text: 'Hagyom, hogy a csapattagjaim saját módszerrel dolgozzanak, ha az eredmény jó – nem írom elő a hogyan-t.',
    answers: [
      { text: '', score: 5 },
      { text: '', score: 4 },
      { text: '', score: 3 },
      { text: '', score: 2 },
      { text: '', score: 1 },
    ],
  },
  {
    id: 10,
    dimensionId: 'autonomy_design',
    text: 'Komplex projekteket úgy delegálok, hogy megadom a célt és a kereteket, de a megoldást a csapat találja meg.',
    answers: [
      { text: '', score: 5 },
      { text: '', score: 4 },
      { text: '', score: 3 },
      { text: '', score: 2 },
      { text: '', score: 1 },
    ],
  },
  {
    id: 11,
    dimensionId: 'autonomy_design',
    text: 'A csapattal közösen alakítjuk ki a check-in ritmust a projekt igényei szerint – nem én írom elő.',
    answers: [
      { text: '', score: 5 },
      { text: '', score: 4 },
      { text: '', score: 3 },
      { text: '', score: 2 },
      { text: '', score: 1 },
    ],
  },
  {
    id: 12,
    dimensionId: 'autonomy_design',
    text: 'Amikor egy junior kolléga hibázik, megbeszéljük a tanulságot, és legközelebb ő fogja jobban csinálni.',
    answers: [
      { text: '', score: 5 },
      { text: '', score: 4 },
      { text: '', score: 3 },
      { text: '', score: 2 },
      { text: '', score: 1 },
    ],
  },

  // PSZICHOLÓGIAI BIZTONSÁG (13-16)
  {
    id: 13,
    dimensionId: 'psychological_safety',
    text: 'Aktívan provokálom a kritikus gondolkodást, ha egy meetingen senki nem mond ellent a javaslatomnak.',
    answers: [
      { text: '', score: 5 },
      { text: '', score: 4 },
      { text: '', score: 3 },
      { text: '', score: 2 },
      { text: '', score: 1 },
    ],
  },
  {
    id: 14,
    dimensionId: 'psychological_safety',
    text: 'Rendszeresen beszélek nyíltan a saját hibáimról a csapatom előtt.',
    answers: [
      { text: '', score: 5 },
      { text: '', score: 4 },
      { text: '', score: 3 },
      { text: '', score: 2 },
      { text: '', score: 1 },
    ],
  },
  {
    id: 15,
    dimensionId: 'psychological_safety',
    text: 'Amikor egy csapattag bevall egy félelmet vagy bizonytalanságot, megköszönöm az őszinteségét és konkrét támogatást ajánlok.',
    answers: [
      { text: '', score: 5 },
      { text: '', score: 4 },
      { text: '', score: 3 },
      { text: '', score: 2 },
      { text: '', score: 1 },
    ],
  },
  {
    id: 16,
    dimensionId: 'psychological_safety',
    text: 'Facilitálom a vitákat a csapatban – elválasztom a személyt az ügytől és mélyítem a megértést.',
    answers: [
      { text: '', score: 5 },
      { text: '', score: 4 },
      { text: '', score: 3 },
      { text: '', score: 2 },
      { text: '', score: 1 },
    ],
  },

  // ADAPTÍV DÖNTÉSHOZATAL (17-20)
  {
    id: 17,
    dimensionId: 'adaptive_decision',
    text: 'Ellentmondásos adatok esetén is gyorsan hozok egy "elég jó" döntést, és iterálok az eredmények alapján.',
    answers: [
      { text: '', score: 5 },
      { text: '', score: 4 },
      { text: '', score: 3 },
      { text: '', score: 2 },
      { text: '', score: 1 },
    ],
  },
  {
    id: 18,
    dimensionId: 'adaptive_decision',
    text: 'Nehéz döntéseknél tudatosan mérlegelem az adatokat és az intuíciómat, és figyelem, hol mondanak mást.',
    answers: [
      { text: '', score: 5 },
      { text: '', score: 4 },
      { text: '', score: 3 },
      { text: '', score: 2 },
      { text: '', score: 1 },
    ],
  },
  {
    id: 19,
    dimensionId: 'adaptive_decision',
    text: 'Rendszeresen visszavonom nyilvánosan egy korábbi döntésemet, amikor új információ érkezik.',
    answers: [
      { text: '', score: 5 },
      { text: '', score: 4 },
      { text: '', score: 3 },
      { text: '', score: 2 },
      { text: '', score: 1 },
    ],
  },
  {
    id: 20,
    dimensionId: 'adaptive_decision',
    text: 'Aktívan keresem a saját kognitív torzításaimat (pl. megerősítési torzítás) és rendszereket építek ellenük.',
    answers: [
      { text: '', score: 5 },
      { text: '', score: 4 },
      { text: '', score: 3 },
      { text: '', score: 2 },
      { text: '', score: 1 },
    ],
  },

  // CSOPORTKULTÚRA-TUDATOSSÁG (21-24)
  {
    id: 21,
    dimensionId: 'group_culture_awareness',
    text: 'Pontosan tudom, milyen kultúrát építünk a csapatban, és tudatosan döntöttem így – ismerem az előnyeit és a korlátait is.',
    answers: [
      { text: '', score: 5 },
      { text: '', score: 4 },
      { text: '', score: 3 },
      { text: '', score: 2 },
      { text: '', score: 1 },
    ],
  },
  {
    id: 22,
    dimensionId: 'group_culture_awareness',
    text: 'Tudatosan használom a csapatban a különböző preferenciákat: a stabilitás-pártiak adják a keretet, a változás-pártiak az innovációt.',
    answers: [
      { text: '', score: 5 },
      { text: '', score: 4 },
      { text: '', score: 3 },
      { text: '', score: 2 },
      { text: '', score: 1 },
    ],
  },
  {
    id: 23,
    dimensionId: 'group_culture_awareness',
    text: 'Felmérem, melyik feladathoz melyik működési mód (együttműködés vs. önálló munka) illik jobban, és ennek megfelelően szervezem a munkát.',
    answers: [
      { text: '', score: 5 },
      { text: '', score: 4 },
      { text: '', score: 3 },
      { text: '', score: 2 },
      { text: '', score: 1 },
    ],
  },
  {
    id: 24,
    dimensionId: 'group_culture_awareness',
    text: 'Tudatosan figyelem és diagnosztizálom, mire van szüksége a csapatnak (struktúra, innováció, kapcsolódás, önállóság), és adaptálom a vezetői stílusomat.',
    answers: [
      { text: '', score: 5 },
      { text: '', score: 4 },
      { text: '', score: 3 },
      { text: '', score: 2 },
      { text: '', score: 1 },
    ],
  },
];
