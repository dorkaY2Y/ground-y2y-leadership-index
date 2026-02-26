import { useState, useEffect, useMemo } from 'react';
import { questions } from '../data/questions';
import { dimensions } from '../data/dimensions';
import { shuffleArray } from '../utils/scoring';
import ProgressBar from './ProgressBar';

interface QuizScreenProps {
  onComplete: (answers: Record<number, number>) => void;
}

export default function QuizScreen({ onComplete }: QuizScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [animState, setAnimState] = useState<'in' | 'out'>('in');
  const [prevDimensionId, setPrevDimensionId] = useState<string | null>(null);
  const [showDimensionIntro, setShowDimensionIntro] = useState(true);

  const currentQuestion = questions[currentIndex];
  const currentDimension = dimensions.find((d) => d.id === currentQuestion.dimensionId);

  const shuffledAnswers = useMemo(() => {
    return shuffleArray(currentQuestion.answers);
  }, [currentQuestion.id]);

  useEffect(() => {
    if (prevDimensionId !== currentQuestion.dimensionId) {
      setShowDimensionIntro(true);
      const timer = setTimeout(() => setShowDimensionIntro(false), 2500);
      setPrevDimensionId(currentQuestion.dimensionId);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, currentQuestion.dimensionId, prevDimensionId]);

  const handleAnswer = (score: number) => {
    const newAnswers = { ...answers, [currentQuestion.id]: score };
    setAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setAnimState('out');
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setAnimState('in');
      }, 300);
    } else {
      onComplete(newAnswers);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setAnimState('out');
      setTimeout(() => {
        setCurrentIndex((prev) => prev - 1);
        setAnimState('in');
      }, 300);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-8 relative z-10">
      <div className="max-w-lg w-full">
        {currentIndex > 0 && (
          <button
            onClick={handleBack}
            className="text-ground-muted hover:text-ground-text text-sm mb-3 transition-colors"
          >
            ← Vissza
          </button>
        )}

        <ProgressBar
          currentQuestion={currentIndex}
          totalQuestions={questions.length}
          currentDimensionId={currentQuestion.dimensionId}
        />

        {showDimensionIntro && currentDimension && (
          <div
            className="mb-5 py-2 px-3 rounded-lg border animate-fade-up flex items-center gap-2"
            style={{
              borderColor: `${currentDimension.color}25`,
              backgroundColor: `${currentDimension.color}08`,
            }}
          >
            <span className="text-sm font-semibold" style={{ color: currentDimension.color }}>
              {currentDimension.name}
            </span>
          </div>
        )}

        <div className={animState === 'in' ? 'animate-slide-in' : 'animate-slide-out'}>
          <h2 className="text-lg sm:text-xl font-semibold leading-relaxed mb-6 text-white">
            {currentQuestion.text}
          </h2>

          <div className="flex flex-col gap-2.5">
            {shuffledAnswers.map((answer, idx) => {
              const isSelected = answers[currentQuestion.id] === answer.score;
              return (
                <button
                  key={`${currentQuestion.id}-${idx}`}
                  onClick={() => handleAnswer(answer.score)}
                  className="w-full text-left px-4 py-3 rounded-lg border transition-all duration-150 active:scale-[0.99]"
                  style={
                    isSelected
                      ? { borderColor: '#ded11450', backgroundColor: '#ded11412', color: '#fff' }
                      : { borderColor: '#1E293B', backgroundColor: '#131B2E66', color: '#CBD5E1' }
                  }
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = '#334155';
                      e.currentTarget.style.backgroundColor = '#131B2Eaa';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = '#1E293B';
                      e.currentTarget.style.backgroundColor = '#131B2E66';
                    }
                  }}
                >
                  <span className="text-sm leading-relaxed">{answer.text}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
