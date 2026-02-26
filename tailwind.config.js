/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        y2y: '#ded114',
        ground: {
          bg: '#0B1120',
          text: '#E2E8F0',
          muted: '#94A3B8',
          card: '#131B2E',
          border: '#1E293B',
        },
        dim: {
          cognitive: '#2D5BFF',
          uncertainty: '#00C2A8',
          autonomy: '#FF6B35',
          safety: '#A855F7',
          decision: '#F43F5E',
          culture: '#FACC15',
        },
        level: {
          excellent: '#10B981',
          advanced: '#3B82F6',
          developing: '#F59E0B',
          needs: '#EF4444',
        },
      },
      fontFamily: {
        sans: ['Exo', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
