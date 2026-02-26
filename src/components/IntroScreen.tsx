interface IntroScreenProps {
  onStart: () => void;
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-10 relative z-10">
      <div className="max-w-lg w-full text-center animate-fade-up">
        {/* Branding */}
        <div className="mb-6">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-1" style={{ color: '#ded114' }}>
            Ground
          </h1>
          <p className="text-sm text-ground-muted font-light tracking-[0.25em] uppercase">
            by Y2Y
          </p>
        </div>

        {/* Tagline */}
        <p className="text-lg sm:text-xl text-ground-text/90 leading-relaxed mb-5">
          Nem ígérjük, hogy jövőbiztos leszel.
          <br />
          <span className="font-semibold text-white">Megmutatjuk, hol állsz most.</span>
        </p>

        {/* Self-assessment philosophy */}
        <div className="mb-6 max-w-md mx-auto">
          <p className="text-sm text-ground-text/80 leading-relaxed mb-3">
            Sokan kértétek, hogy legyen egy egyszerű self-assessment, amihez magatokat méritek. 
            Nem érdekel minket a benchmark — csak az, hogy <span className="font-semibold text-white">te magad hogy tudsz fejlődni</span>.
          </p>
          <p className="text-xs text-ground-muted leading-relaxed">
            Az eredményeidet nem tároljuk és nem nézzük meg — csak akkor van értelme kitöltened, ha őszinte vagy magaddal.
          </p>
        </div>

        {/* Stats line */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6 text-ground-muted text-sm">
          <span><span className="font-space-mono font-bold" style={{ color: '#ded114' }}>24</span> kérdés</span>
          <span className="text-ground-border">·</span>
          <span><span className="font-space-mono font-bold" style={{ color: '#ded114' }}>6</span> dimenzió</span>
          <span className="text-ground-border">·</span>
          <span><span className="font-space-mono font-bold" style={{ color: '#ded114' }}>~6</span> perc</span>
        </div>

        {/* CTA */}
        <button
          onClick={onStart}
          className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-base transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
          style={{ backgroundColor: '#ded114', color: '#0B1120' }}
        >
          Kezdjük el
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
        </button>

        {/* Sub-note */}
        <p className="mt-4 text-xs text-ground-muted/70">
          Nincsenek jó vagy rossz válaszok.
        </p>

        {/* Scientific foundation */}
        <div className="mt-12 pt-8 border-t border-ground-border/30">
          <p className="text-xs text-ground-muted/60 uppercase tracking-wider mb-4">
            Tudományos alapok
          </p>
          <p className="text-sm text-ground-text/70 leading-relaxed mb-4 max-w-md mx-auto">
            Az elmúlt 10 évben ezekre a modellekre hivatkoztunk a legtöbbet:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto text-left">
            <div className="bg-ground-card/30 border border-ground-border/20 rounded-lg p-3">
              <p className="text-xs font-semibold text-white mb-1">SCARF modell</p>
              <p className="text-[10px] text-ground-muted">Rock, 2008</p>
            </div>
            <div className="bg-ground-card/30 border border-ground-border/20 rounded-lg p-3">
              <p className="text-xs font-semibold text-white mb-1">Pszichológiai Biztonság</p>
              <p className="text-[10px] text-ground-muted">Edmondson, 1999</p>
            </div>
            <div className="bg-ground-card/30 border border-ground-border/20 rounded-lg p-3">
              <p className="text-xs font-semibold text-white mb-1">Dual-Process Theory</p>
              <p className="text-[10px] text-ground-muted">Kahneman, 2011</p>
            </div>
            <div className="bg-ground-card/30 border border-ground-border/20 rounded-lg p-3">
              <p className="text-xs font-semibold text-white mb-1">Kognitív Flexibilitás</p>
              <p className="text-[10px] text-ground-muted">Diamond, 2013</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
