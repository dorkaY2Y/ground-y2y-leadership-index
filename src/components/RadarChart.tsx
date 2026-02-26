import { useEffect, useState } from 'react';
import { DimensionScore } from '../utils/scoring';

interface RadarChartProps {
  dimensionScores: DimensionScore[];
}

export default function RadarChart({ dimensionScores }: RadarChartProps) {
  const [animProgress, setAnimProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 1200;
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimProgress(eased);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, []);

  const size = 320;
  const center = size / 2;
  const maxRadius = 120;
  const levels = 5;
  const sides = dimensionScores.length;
  const angleStep = (Math.PI * 2) / sides;
  const startAngle = -Math.PI / 2;

  const getPoint = (angle: number, radius: number) => ({
    x: center + Math.cos(angle) * radius,
    y: center + Math.sin(angle) * radius,
  });

  // Grid levels
  const gridLevels = Array.from({ length: levels }, (_, i) => {
    const r = (maxRadius / levels) * (i + 1);
    const points = Array.from({ length: sides }, (_, j) => {
      const angle = startAngle + angleStep * j;
      return getPoint(angle, r);
    });
    return points.map((p) => `${p.x},${p.y}`).join(' ');
  });

  // Data points
  const dataPoints = dimensionScores.map((d, i) => {
    const angle = startAngle + angleStep * i;
    const r = (d.score / 5) * maxRadius * animProgress;
    return getPoint(angle, r);
  });
  const dataPath = dataPoints.map((p) => `${p.x},${p.y}`).join(' ');

  // Axis lines
  const axes = Array.from({ length: sides }, (_, i) => {
    const angle = startAngle + angleStep * i;
    return getPoint(angle, maxRadius);
  });

  return (
    <div className="flex flex-col items-center">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[400px] h-auto">
        {/* Grid */}
        {gridLevels.map((points, i) => (
          <polygon
            key={i}
            points={points}
            fill="none"
            stroke="#1E293B"
            strokeWidth="1"
            opacity={0.5 + i * 0.1}
          />
        ))}

        {/* Axes */}
        {axes.map((point, i) => (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={point.x}
            y2={point.y}
            stroke="#1E293B"
            strokeWidth="1"
          />
        ))}

        {/* Data area */}
        <polygon
          points={dataPath}
          fill="url(#dataGradient)"
          fillOpacity="0.25"
          stroke="url(#strokeGradient)"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {dataPoints.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="4"
            fill={dimensionScores[i].color}
            stroke="#0B1120"
            strokeWidth="2"
          />
        ))}

        {/* Gradients */}
        <defs>
          <linearGradient id="dataGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ded114" />
            <stop offset="50%" stopColor="#ded114" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ded114" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ded114" />
            <stop offset="100%" stopColor="#ded114" stopOpacity="0.7" />
          </linearGradient>
        </defs>
      </svg>

      {/* Labels outside SVG for better responsiveness */}
      <div className="relative w-full max-w-[400px] -mt-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {dimensionScores.map((d) => (
            <div key={d.dimensionId} className="flex items-center gap-1.5 text-xs">
              <span>{d.icon}</span>
              <span className="text-ground-muted">{d.name}</span>
              <span className="font-space-mono font-bold" style={{ color: d.color }}>
                {d.score.toFixed(1)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
