import { useState } from 'react';
import { saveLead, sendResultEmail } from '../lib/supabase';
import { ProfileResult } from '../utils/scoring';

interface EmailCaptureProps {
  result: ProfileResult;
  rawAnswers: Record<number, number>;
  onOpenPrivacy: () => void;
}

export default function EmailCapture({ result, rawAnswers, onOpenPrivacy }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [gdprChecked, setGdprChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isValid = email.includes('@') && email.includes('.') && gdprChecked;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || loading) return;

    setLoading(true);
    setError('');

    const dimension_scores: Record<string, number> = {};
    for (const d of result.dimensionScores) {
      dimension_scores[d.dimensionId] = d.score;
    }

    await saveLead({
      email,
      overall_score: result.overallScore,
      profile_name: result.profileName,
      dimension_scores,
      raw_answers: rawAnswers,
    });

    const emailSent = await sendResultEmail(email, result);
    if (!emailSent) {
      setError('Az email küldése nem sikerült, de az adataidat elmentettük. Hamarosan keresünk!');
    }

    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="text-center py-6 animate-fade-up">
        <h3 className="text-base font-semibold text-white mb-1">Köszönjük!</h3>
        <p className="text-ground-muted text-sm">
          {error || 'A részletes riportod úton van — nézd meg az emailjeidet.'}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="border rounded-lg p-5" style={{ borderColor: '#1E293B', backgroundColor: '#131B2E99' }}>
        <h3 className="text-sm font-semibold text-white mb-1">
          Kéred a részletes riportot?
        </h3>
        <p className="text-xs text-ground-muted mb-4 leading-relaxed">
          Személyre szabott elemzés minden dimenzióról, konkrét javaslatokkal.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@cimed.hu"
            className="w-full px-3.5 py-2.5 rounded-lg text-sm text-white placeholder-ground-muted/40 focus:outline-none transition-all"
            style={{
              backgroundColor: '#0B1120',
              border: '1px solid #1E293B',
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = '#ded11450'; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = '#1E293B'; }}
          />

          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={gdprChecked}
              onChange={(e) => setGdprChecked(e.target.checked)}
              className="mt-0.5 w-3.5 h-3.5 rounded cursor-pointer accent-[#ded114]"
            />
            <span className="text-[11px] text-ground-muted leading-relaxed">
              Elfogadom az{' '}
              <button
                type="button"
                onClick={onOpenPrivacy}
                className="underline hover:text-white transition-colors"
              >
                adatkezelési tájékoztatót
              </button>
            </span>
          </label>

          <button
            type="submit"
            disabled={!isValid || loading}
            className="w-full py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:brightness-110 active:scale-[0.99]"
            style={{
              backgroundColor: isValid ? '#ded114' : '#1E293B',
              color: isValid ? '#0B1120' : '#475569',
            }}
          >
            {loading ? 'Küldöm...' : 'Küldés'}
          </button>
        </form>

        <p className="mt-3 text-[10px] text-ground-muted/40 text-center leading-relaxed">
          A riporton kívül alkalmanként küldünk hasznos tartalmakat vezetői fejlődésről — keveset és csak hasznosat. Bármikor leiratkozhatsz.
        </p>
      </div>
    </div>
  );
}
