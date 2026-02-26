import { ProfileResult } from '../utils/scoring';
import RadarChart from './RadarChart';
import EmailCapture from './EmailCapture';

interface ResultScreenProps {
  result: ProfileResult;
  rawAnswers: Record<number, number>;
  onRestart: () => void;
  onOpenPrivacy: () => void;
}

export default function ResultScreen({ result, rawAnswers, onRestart, onOpenPrivacy }: ResultScreenProps) {
  const profileCtaTexts: Record<string, string> = {
    'Adaptív Vezető': 'Ha kíváncsi vagy, hogyan tarthatod meg ezt az előnyt, szívesen beszélgetünk.',
    'Tudatos Stratéga': 'Erős alapjaid vannak — segítünk, hogy a következő szintet is elérd.',
    'Stabil Alapozó': 'Van mire építened. Megmutatjuk, hogyan készülhetsz fel a következő évek kihívásaira.',
    'Útkereső Vezető': 'Segítünk megtalálni a számodra legjobb fejlődési irányt.',
  };

  return (
    <div className="min-h-screen px-5 py-10 relative z-10">
      <div className="max-w-lg mx-auto">
        {/* Profile header */}
        <div className="text-center mb-10 animate-fade-up">
          <p className="text-xs text-ground-muted uppercase tracking-[0.2em] mb-3">A te profilod</p>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#ded114' }}>
            {result.profileName}
          </h1>
          <div className="flex items-center justify-center gap-1.5 mb-4">
            <span className="font-space-mono text-2xl font-bold text-white">
              {result.overallScore.toFixed(1)}
            </span>
            <span className="text-ground-muted text-sm">/ 5.0</span>
          </div>
          <p className="text-sm text-ground-muted max-w-sm mx-auto leading-relaxed">
            {result.profileDescription}
          </p>
        </div>

        {/* Radar Chart */}
        <div className="mb-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <RadarChart dimensionScores={result.dimensionScores} />
        </div>

        {/* Dimension cards */}
        <div className="space-y-3 mb-10">
          {result.dimensionScores.map((dim, idx) => (
            <div
              key={dim.dimensionId}
              className="border rounded-lg p-4 animate-fade-up"
              style={{
                animationDelay: `${0.3 + idx * 0.08}s`,
                borderColor: '#1E293B',
                backgroundColor: '#131B2E99',
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-white text-sm">{dim.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="font-space-mono text-sm font-bold" style={{ color: dim.color }}>
                    {dim.score.toFixed(1)}
                  </span>
                  <span
                    className="text-[10px] font-medium px-2 py-0.5 rounded"
                    style={{ color: dim.levelColor, backgroundColor: `${dim.levelColor}15` }}
                  >
                    {dim.level}
                  </span>
                </div>
              </div>
              <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#1E293B' }}>
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${(dim.score / 5) * 100}%`,
                    backgroundColor: dim.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Email Capture */}
        <div className="mb-10 animate-fade-up" style={{ animationDelay: '0.8s' }}>
          <EmailCapture result={result} rawAnswers={rawAnswers} onOpenPrivacy={onOpenPrivacy} />
        </div>

        {/* Y2Y CTA */}
        <div
          className="text-center border rounded-lg p-6 mb-10 animate-fade-up"
          style={{ animationDelay: '0.9s', borderColor: '#ded11425', backgroundColor: '#131B2E66' }}
        >
          <p className="text-sm text-ground-muted mb-4 leading-relaxed">
            {profileCtaTexts[result.profileName] || 'Kíváncsi vagy, miben tudnánk segíteni?'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
            <a
              href="https://www.y2y.hu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
              style={{ backgroundColor: '#ded114', color: '#0B1120' }}
            >
              Ismerj meg minket →
            </a>
            <button
              onClick={onRestart}
              className="px-5 py-2.5 rounded-lg border text-sm text-ground-muted hover:text-white transition-all"
              style={{ borderColor: '#1E293B' }}
            >
              Újrakezdés
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center pt-6 pb-4" style={{ borderTop: '1px solid #1E293B30' }}>
          <p className="text-[10px] text-ground-muted/40">
            © 2026 Y2Y Hungary Kft. · Ground v1.0
          </p>
        </footer>
      </div>
    </div>
  );
}
