interface IntroScreenProps {
  onStart: () => void;
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-10 relative z-10">
      <div className="max-w-lg w-full text-center animate-fade-up">
        {/* Branding */}
        <div className="mb-8">
          <h1 className="text-6xl sm:text-7xl font-black tracking-tighter mb-2" style={{ color: '#ded114' }}>
            Ground
          </h1>
          <p className="text-xs text-ground-muted font-medium tracking-[0.3em] uppercase">
            by Y2Y
          </p>
        </div>

        {/* Tagline */}
        <p className="text-xl sm:text-2xl text-ground-text/90 font-light leading-tight mb-6">
          Nem ígérjük, hogy jövőbiztos leszel.
          <br />
          <span className="font-bold text-white tracking-tight">Megmutatjuk, hol állsz most.</span>
        </p>

        {/* Self-assessment philosophy */}
        <div className="mb-8 max-w-lg mx-auto">
          <p className="text-base text-ground-text/85 font-light leading-relaxed mb-4">
            Sokan kértétek, hogy legyen egy egyszerű self-assessment, amihez magatokat méritek. 
            Titeket nem érdekel a benchmark — csak egyszerűen szeretnétek <span className="font-semibold text-white">magatokat megmérni</span>.
          </p>
          <p className="text-sm text-ground-muted/80 font-light leading-relaxed">
            Az eredményeidet nem tároljuk és nem nézzük meg — csak akkor van értelme kitöltened, ha őszinte vagy magaddal.
          </p>
        </div>

        {/* Stats line */}
        <div className="flex items-center justify-center gap-6 sm:gap-8 mb-8 text-ground-muted text-sm font-medium">
          <span><span className="font-mono font-bold text-lg" style={{ color: '#ded114' }}>24</span> kérdés</span>
          <span className="text-ground-border/50">·</span>
          <span><span className="font-mono font-bold text-lg" style={{ color: '#ded114' }}>6</span> dimenzió</span>
          <span className="text-ground-border/50">·</span>
          <span><span className="font-mono font-bold text-lg" style={{ color: '#ded114' }}>~6</span> perc</span>
        </div>

        {/* CTA */}
        <button
          onClick={onStart}
          className="group inline-flex items-center gap-2.5 px-10 py-4 rounded-xl font-bold text-base tracking-tight transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          style={{ backgroundColor: '#ded114', color: '#0B1120' }}
        >
          Kezdjük el
          <span className="transition-transform duration-200 group-hover:translate-x-1 font-normal text-lg">→</span>
        </button>

        {/* Sub-note */}
        <p className="mt-5 text-sm text-ground-muted/60 font-light">
          Nincsenek jó vagy rossz válaszok.
        </p>

        {/* Scientific foundation */}
        <div className="mt-16 pt-10 border-t border-ground-border/30">
          <p className="text-xs text-ground-muted/70 font-semibold uppercase tracking-[0.2em] mb-5">
            Tudományos alapok
          </p>
          <p className="text-base text-ground-text/75 font-light leading-relaxed mb-6 max-w-lg mx-auto">
            Az elmúlt 10 évben ezekre a modellekre hivatkoztunk a legtöbbet — ezek alapján dolgoztuk ki a kérdéseket:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto text-left">
            <div className="bg-ground-card/40 border border-ground-border/30 rounded-xl p-4 hover:border-ground-border/50 transition-colors">
              <p className="text-sm font-semibold text-white mb-1 tracking-tight">SCARF modell</p>
              <p className="text-xs text-ground-muted/80 font-mono">Rock, 2008</p>
            </div>
            <div className="bg-ground-card/40 border border-ground-border/30 rounded-xl p-4 hover:border-ground-border/50 transition-colors">
              <p className="text-sm font-semibold text-white mb-1 tracking-tight">Pszichológiai Biztonság</p>
              <p className="text-xs text-ground-muted/80 font-mono">Edmondson, 1999</p>
            </div>
            <div className="bg-ground-card/40 border border-ground-border/30 rounded-xl p-4 hover:border-ground-border/50 transition-colors">
              <p className="text-sm font-semibold text-white mb-1 tracking-tight">Dual-Process Theory</p>
              <p className="text-xs text-ground-muted/80 font-mono">Kahneman, 2011</p>
            </div>
            <div className="bg-ground-card/40 border border-ground-border/30 rounded-xl p-4 hover:border-ground-border/50 transition-colors">
              <p className="text-sm font-semibold text-white mb-1 tracking-tight">Kognitív Flexibilitás</p>
              <p className="text-xs text-ground-muted/80 font-mono">Diamond, 2013</p>
            </div>
            <div className="bg-ground-card/40 border border-ground-border/30 rounded-xl p-4 hover:border-ground-border/50 transition-colors">
              <p className="text-sm font-semibold text-white mb-1 tracking-tight">Self-Determination Theory</p>
              <p className="text-xs text-ground-muted/80 font-mono">Deci & Ryan, 1985</p>
            </div>
            <div className="bg-ground-card/40 border border-ground-border/30 rounded-xl p-4 hover:border-ground-border/50 transition-colors">
              <p className="text-sm font-semibold text-white mb-1 tracking-tight">Growth Mindset</p>
              <p className="text-xs text-ground-muted/80 font-mono">Dweck, 2006</p>
            </div>
            <div className="bg-ground-card/40 border border-ground-border/30 rounded-xl p-4 hover:border-ground-border/50 transition-colors">
              <p className="text-sm font-semibold text-white mb-1 tracking-tight">Adaptive Leadership</p>
              <p className="text-xs text-ground-muted/80 font-mono">Heifetz & Linsky, 2002</p>
            </div>
            <div className="bg-ground-card/40 border border-ground-border/30 rounded-xl p-4 hover:border-ground-border/50 transition-colors">
              <p className="text-sm font-semibold text-white mb-1 tracking-tight">Complexity Leadership</p>
              <p className="text-xs text-ground-muted/80 font-mono">Uhl-Bien et al., 2007</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
