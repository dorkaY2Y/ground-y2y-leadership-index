export interface Dimension {
  id: string;
  name: string;
  icon: string;
  color: string;
  scienceBasis: string;
  y2yTwist: string;
}

export const dimensions: Dimension[] = [
  {
    id: 'cognitive_flexibility',
    name: 'Kognitív Rugalmasság',
    icon: '🧠',
    color: '#6B8DD6',
    scienceBasis: 'Prefrontális kéreg aktivitás, kognitív flexibilitás (Diamond, 2013)',
    y2yTwist: 'Mennyire képes a vezető gyorsan váltani kontextusok, gondolkodási módok és ember-AI együttműködés között',
  },
  {
    id: 'uncertainty_tolerance',
    name: 'Bizonytalanság-tűrés',
    icon: '🌊',
    color: '#5DBAAA',
    scienceBasis: 'SCARF modell Certainty dimenzió (Rock, 2008), Intolerance of Uncertainty Scale (Buhr & Dugas, 2002)',
    y2yTwist: 'Hogyan kezeli a vezető a FLUX évtized kiszámíthatatlanságát és az állandó változást',
  },
  {
    id: 'autonomy_design',
    name: 'Autonómia-tervezés',
    icon: '🎯',
    color: '#D4926F',
    scienceBasis: 'SCARF modell Autonomy dimenzió (Rock, 2008), Self-Determination Theory (Deci & Ryan, 2000)',
    y2yTwist: 'Mennyire képes a vezető valódi döntési teret adni a csapatának ahelyett, hogy mikro-menedzselne',
  },
  {
    id: 'psychological_safety',
    name: 'Pszichológiai Biztonság',
    icon: '🛡️',
    color: '#B08AC7',
    scienceBasis: 'Edmondson (1999), SCARF: Relatedness & Status (Rock, 2008)',
    y2yTwist: 'Mennyire teremt olyan közeget, ahol az emberek mernek hibázni, kérdezni és innoválni',
  },
  {
    id: 'adaptive_decision',
    name: 'Adaptív Döntéshozatal',
    icon: '⚡',
    color: '#D97B8F',
    scienceBasis: 'Dual-Process Theory (Kahneman, 2011), SCARF: Fairness (Rock, 2008)',
    y2yTwist: 'Hogyan hoz döntéseket gyorsan változó környezetben, mennyire ismeri fel saját kognitív torzításait',
  },
  {
    id: 'group_culture_awareness',
    name: 'Csoportkultúra-tudatosság',
    icon: '🧩',
    color: '#D4B86A',
    scienceBasis: 'Riemann-féle csoportdinamikai modell (Riemann, 1961), Csoportkultúra-tipológia',
    y2yTwist: 'Mennyire tudatosan alakítja a vezető a csapata kultúráját, és mennyire képes felismerni és kezelni a különböző kultúratípusok dinamikáját',
  },
];
