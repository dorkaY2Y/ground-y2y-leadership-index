import { dimensions } from '../data/dimensions';

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
  currentDimensionId: string;
}

export default function ProgressBar({ currentQuestion, totalQuestions, currentDimensionId }: ProgressBarProps) {
  const dimension = dimensions.find((d) => d.id === currentDimensionId);
  const progress = ((currentQuestion) / totalQuestions) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-ground-muted font-space-mono">
          {currentQuestion + 1} / {totalQuestions}
        </span>
        {dimension && (
          <span className="text-sm flex items-center gap-1.5" style={{ color: dimension.color }}>
            <span>{dimension.icon}</span>
            <span className="font-medium">{dimension.name}</span>
          </span>
        )}
      </div>
      <div className="w-full h-1.5 bg-ground-border rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${progress}%`,
            background: dimension
              ? `linear-gradient(90deg, ${dimension.color}88, ${dimension.color})`
              : 'linear-gradient(90deg, #ded114, #ded114)',
          }}
        />
      </div>
    </div>
  );
}
