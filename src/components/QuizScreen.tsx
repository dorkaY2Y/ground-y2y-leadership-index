import { useState, useEffect } from 'react';
import { questions } from '../data/questions';
import { dimensions } from '../data/dimensions';
import ProgressBar from './ProgressBar';

interface QuizScreenProps {
  onComplete: (answers: Record<number, number>) => void;
}

export default function QuizScreen({ onComplete }: QuizScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [sliderValue, setSliderValue] = useState<number>(3);
  const [animState, setAnimState] = useState<'in' | 'out'>('in');
  const [prevDimensionId, setPrevDimensionId] = useState<string | null>(null);
  const [showDimensionIntro, setShowDimensionIntro] = useState(true);

  const currentQuestion = questions[currentIndex];
  const currentDimension = dimensions.find((d) => d.id === currentQuestion.dimensionId);

  useEffect(() => {
    if (prevDimensionId !== currentQuestion.dimensionId) {
      setShowDimensionIntro(true);
      const timer = setTimeout(() => setShowDimensionIntro(false), 2500);
      setPrevDimensionId(currentQuestion.dimensionId);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, currentQuestion.dimensionId, prevDimensionId]);

  useEffect(() => {
    // Reset slider to previous answer or default to 3
    setSliderValue(answers[currentQuestion.id] || 3);
  }, [currentIndex, currentQuestion.id, answers]);

  const handleNext = () => {
    const newAnswers = { ...answers, [currentQuestion.id]: sliderValue };
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
          {/* Forced-choice slider with opposing statements */}
          <div className="mb-8">
            {/* Endpoint statements */}
            <div className="flex justify-between gap-6 mb-6">
              <div className="flex-1 text-left">
                <p className="text-sm sm:text-base text-ground-text leading-relaxed">
                  {currentQuestion.leftStatement}
                </p>
              </div>
              <div className="flex-1 text-right">
                <p className="text-sm sm:text-base text-ground-text leading-relaxed">
                  {currentQuestion.rightStatement}
                </p>
              </div>
            </div>

            {/* Slider */}
            <div className="relative">
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={sliderValue}
                onChange={(e) => setSliderValue(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer slider-custom"
                style={{
                  background: `linear-gradient(to right, #ded114 0%, #ded114 ${((sliderValue - 1) / 4) * 100}%, #1E293B ${((sliderValue - 1) / 4) * 100}%, #1E293B 100%)`
                }}
              />
              
              {/* Tick marks */}
              <div className="flex justify-between mt-2 px-0.5">
                {[1, 2, 3, 4, 5].map((val) => (
                  <div
                    key={val}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      sliderValue >= val ? 'bg-y2y' : 'bg-ground-border'
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Next button */}
          <button
            onClick={handleNext}
            className="w-full py-4 rounded-xl font-bold text-base tracking-tight transition-all duration-200 hover:brightness-110 hover:scale-[1.01] active:scale-[0.99] shadow-lg"
            style={{ backgroundColor: '#ded114', color: '#0B1120' }}
          >
            {currentIndex < questions.length - 1 ? 'Következő' : 'Eredmény megtekintése'}
          </button>
        </div>
      </div>
    </div>
  );
}
