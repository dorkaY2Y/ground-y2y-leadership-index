import { useState } from 'react';
import IntroScreen from './components/IntroScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import PrivacyPolicy from './components/PrivacyPolicy';
import { calculateResults, ProfileResult } from './utils/scoring';

type Screen = 'intro' | 'quiz' | 'result' | 'privacy';

export default function App() {
  const [screen, setScreen] = useState<Screen>('intro');
  const [prevScreen, setPrevScreen] = useState<Screen>('intro');
  const [result, setResult] = useState<ProfileResult | null>(null);
  const [rawAnswers, setRawAnswers] = useState<Record<number, number>>({});

  const handleStart = () => {
    setScreen('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuizComplete = (answers: Record<number, number>) => {
    setRawAnswers(answers);
    const profileResult = calculateResults(answers);
    setResult(profileResult);
    setScreen('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setScreen('intro');
    setResult(null);
    setRawAnswers({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPrivacy = () => {
    setPrevScreen(screen);
    setScreen('privacy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClosePrivacy = () => {
    setScreen(prevScreen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen">
      {screen === 'intro' && <IntroScreen onStart={handleStart} />}
      {screen === 'quiz' && <QuizScreen onComplete={handleQuizComplete} />}
      {screen === 'result' && result && (
        <ResultScreen result={result} rawAnswers={rawAnswers} onRestart={handleRestart} onOpenPrivacy={handleOpenPrivacy} />
      )}
      {screen === 'privacy' && <PrivacyPolicy onBack={handleClosePrivacy} />}
    </div>
  );
}
