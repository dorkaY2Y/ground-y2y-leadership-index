import { dimensions } from '../data/dimensions';

export interface DimensionScore {
  dimensionId: string;
  name: string;
  icon: string;
  color: string;
  score: number;
  level: string;
  levelColor: string;
}

export interface ProfileResult {
  overallScore: number;
  profileName: string;
  profileEmoji: string;
  profileDescription: string;
  dimensionScores: DimensionScore[];
}

function getDimensionLevel(score: number): { level: string; levelColor: string } {
  if (score >= 4.2) return { level: 'Erősséged', levelColor: '#10B981' };
  if (score >= 3.4) return { level: 'Jó úton jársz', levelColor: '#3B82F6' };
  if (score >= 2.6) return { level: 'Figyelj rá', levelColor: '#ded114' };
  return { level: 'Javasolt fókuszterület', levelColor: '#F59E0B' };
}

function getProfile(score: number): { name: string; emoji: string; description: string } {
  if (score >= 4.2) {
    return {
      name: 'Adaptív Vezető',
      emoji: '🚀',
      description: 'Nagyon erős alapokon állsz — rugalmasan navigálsz a változásban, és magabiztosan vezeted a csapatod. Tartsd ezt az irányt!',
    };
  }
  if (score >= 3.4) {
    return {
      name: 'Tudatos Stratéga',
      emoji: '📈',
      description: 'Szilárd alapjaid vannak, és van benned nyitottság a fejlődésre. Több helyen kiemelkedő vagy — érdemes azokra építened, ahol még van mozgástér.',
    };
  }
  if (score >= 2.6) {
    return {
      name: 'Stabil Alapozó',
      emoji: '🏗️',
      description: 'Kipróbált módszerekre építesz, ami sok helyzetben jól működik. Az alábbiakban megmutatjuk, hol érdemes új irányokat kipróbálnod.',
    };
  }
  return {
    name: 'Útkereső Vezető',
    emoji: '🧭',
    description: 'Most van a legjobb időpont elkezdeni — és az, hogy itt vagy, már önmagában sokat elárul a nyitottságodról. Nézd meg, mivel érdemes kezdened.',
  };
}

export function calculateResults(answers: Record<number, number>): ProfileResult {
  const dimensionScoresMap: Record<string, number[]> = {};

  for (const dim of dimensions) {
    dimensionScoresMap[dim.id] = [];
  }

  for (const [questionId, score] of Object.entries(answers)) {
    const qId = Number(questionId);
    const dimIndex = Math.floor((qId - 1) / 4);
    const dim = dimensions[dimIndex];
    if (dim) {
      dimensionScoresMap[dim.id].push(score);
    }
  }

  const dimensionScores: DimensionScore[] = dimensions.map((dim) => {
    const scores = dimensionScoresMap[dim.id];
    const avg = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
    const roundedAvg = Math.round(avg * 100) / 100;
    const { level, levelColor } = getDimensionLevel(roundedAvg);
    return {
      dimensionId: dim.id,
      name: dim.name,
      icon: dim.icon,
      color: dim.color,
      score: roundedAvg,
      level,
      levelColor,
    };
  });

  const overallScore =
    Math.round(
      (dimensionScores.reduce((sum, d) => sum + d.score, 0) / dimensionScores.length) * 100
    ) / 100;

  const profile = getProfile(overallScore);

  return {
    overallScore,
    profileName: profile.name,
    profileEmoji: profile.emoji,
    profileDescription: profile.description,
    dimensionScores,
  };
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
