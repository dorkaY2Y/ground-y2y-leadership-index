export interface Answer {
  text: string;
  score: number;
}

export interface Question {
  id: number;
  dimensionId: string;
  text: string;
  leftStatement: string;
  rightStatement: string;
  answers: Answer[];
}

export const questions: Question[] = [
  // KOGNITÍV RUGALMASSÁG (1-4)
  {
    id: 1,
    dimensionId: 'cognitive_flexibility',
    text: '',
    leftStatement: 'Ragaszkodom a bevált módszerhez – eddig működött',
    rightStatement: 'Azonnal keresem az alternatívákat és kísérletezek',
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
    text: '',
    leftStatement: 'Ez a tempó szétszed – nem tudok fókuszálni',
    rightStatement: 'Élvezem a változatosságot, könnyen váltok',
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
    text: '',
    leftStatement: 'Frusztráló, hogy nem látja be az én elképzelésemet',
    rightStatement: 'Kíváncsi vagyok – kérem, fejtse ki részletesen',
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
    text: '',
    leftStatement: 'A vezető dolga az irányt mutatni, nem változtatni',
    rightStatement: 'Aktívan keresem, hol tévedhetek',
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
    text: '',
    leftStatement: 'Megbénulok – a bizonytalanság stresszessé tesz',
    rightStatement: 'Gyorsan felmérem és új tervet rakok össze',
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
    text: '',
    leftStatement: 'Várok, amíg lesz konkrétum, amit mondhatok',
    rightStatement: 'Nyíltan mondom – közösen keressük az irányt',
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
    text: '',
    leftStatement: 'Majd alkalmazkodom, ha eljön – most más a prioritás',
    rightStatement: 'Már most kísérletezek és építek új képességeket',
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
    text: '',
    leftStatement: 'Hosszú távú terv nélkül nem tudok vezetni',
    rightStatement: 'Rövid iterációkban gondolkodom, adaptálható vízióval',
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
    text: '',
    leftStatement: 'Csínálja az én módszeremmel – az bevált',
    rightStatement: 'Hagyom – az eredmény számít, nem az út',
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
    text: '',
    leftStatement: 'Inkább magam csinálom – gyorsabb és biztosabb',
    rightStatement: 'Megadom a célt, a megoldást a csapat találja meg',
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
    text: '',
    leftStatement: 'Folyamatosan figyelem és azonnal jelzek',
    rightStatement: 'Közösen alakítjuk ki a check-in ritmust',
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
    text: '',
    leftStatement: 'Legközelebb inkább én tartom a fontos prezentációkat',
    rightStatement: 'Megbeszéljük a tanulságot, legközelebb ő jobban csálja',
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
    text: '',
    leftStatement: 'Ez azt jelenti, hogy jó az ötletem – megyünk tovább',
    rightStatement: 'Gyanús – aktívan provokálom a kritikus gondolkodást',
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
    text: '',
    leftStatement: 'Soha – a vezető gyengeségeit nem kell közszemlére tenni',
    rightStatement: 'Rendszeresen – ez teremti meg a közeget',
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
    text: '',
    leftStatement: 'Mindenki felelős a saját fejlődéséért',
    rightStatement: 'Megköszönöm az őszinteséget és támogatást ajánlok',
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
    text: '',
    leftStatement: 'Eldöntöm a kérdést és lépünk tovább',
    rightStatement: 'Facilitálom – elválasztom a személyt az ügytől',
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
    text: '',
    leftStatement: 'Várok, amíg teljesen tisztán látom a képet',
    rightStatement: 'Hozok egy „elég jó” döntést és iterálok',
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
    text: '',
    leftStatement: 'A megérzésemre hallgatok – eddig ritkán csapott be',
    rightStatement: 'Tudatosan mérlegelem az adatokat és az intuíciót',
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
    text: '',
    leftStatement: 'A következetesség fontosabb, mint a korrekció',
    rightStatement: 'Rendszeresen korrigálok nyílvánosan új info alapján',
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
    text: '',
    leftStatement: 'Ez túl elméleti – a tapasztalat fontosabb',
    rightStatement: 'Aktívan keresem a torzításaimat és rendszereket építek',
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
    text: '',
    leftStatement: 'Nem értem, miért kellene ezen gondolkodni',
    rightStatement: 'Pontosan tudom, milyen kultúrát építünk és miért',
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
    text: '',
    leftStatement: 'Akinek nem tetszik az irány, alkalmazkodik vagy továbbáll',
    rightStatement: 'Tudatosan használom a különböző preferenciákat',
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
    text: '',
    leftStatement: 'Megmondom, hogyan fogunk dolgozni – a vezető dönt',
    rightStatement: 'Felmérem, melyik mód illik a feladathoz',
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
    text: '',
    leftStatement: 'A jó vezető autentikus – nem kell szerepeket játszani',
    rightStatement: 'Diagnosztizálom a szükségleteket és adaptálom a stílusom',
    answers: [
      { text: '', score: 5 },
      { text: '', score: 4 },
      { text: '', score: 3 },
      { text: '', score: 2 },
      { text: '', score: 1 },
    ],
  },
];
