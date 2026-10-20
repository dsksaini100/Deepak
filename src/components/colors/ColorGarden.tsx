import React, { useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { COLORS_DATA } from '../../data/learningData';
import { Mascot } from '../mascots/Mascot';
import { sound } from '../../services/sound';
import { ArrowLeft, Volume2, Sparkles, RotateCcw } from 'lucide-react';

interface ColorGardenProps {
  onBack: () => void;
  onEarnStar: (amount?: number) => void;
  onExploreColor: (colorId: string) => void;
  completedColors: string[];
}

export const ColorGarden: React.FC<ColorGardenProps> = ({
  onBack,
  onEarnStar,
  onExploreColor,
}) => {
  const [activeTab, setActiveTab] = useState<'garden' | 'quiz' | 'sort' | 'rainbow'>('garden');
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  const currentColor = COLORS_DATA[selectedColorIdx];

  const handleSelectColor = (idx: number) => {
    setSelectedColorIdx(idx);
    const c = COLORS_DATA[idx];
    onExploreColor(c.id);
    sound.playTap();
    sound.speak(`${c.name}! Like ${c.example}!`);
  };

  /* ----------------------------------------------------
     MODE 1: EXPLORE COLOR GARDEN
  ---------------------------------------------------- */
  const renderGarden = () => (
    <div className="flex flex-col items-center max-w-2xl mx-auto w-full">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-rose-300 w-full text-center">
        {/* Color Banner */}
        <div 
          style={{ backgroundColor: currentColor.hex }}
          className={`w-full py-8 rounded-3xl shadow-inner flex flex-col items-center justify-center transition-colors duration-300 ${currentColor.textColor}`}
        >
          <span className="text-5xl sm:text-7xl font-black drop-shadow-md">
            {currentColor.name}
          </span>
          <span className="text-xl sm:text-2xl font-bold mt-1 opacity-90">
            {currentColor.example}
          </span>
          <button
            onClick={() => sound.speak(`${currentColor.name}! ${currentColor.example}!`)}
            className="mt-3 p-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur transition"
          >
            <Volume2 className="w-6 h-6" />
          </button>
        </div>

        {/* Examples of this color */}
        <div className="my-6">
          <div className="text-xs font-bold uppercase text-slate-500 mb-3 tracking-wider">
            Wonderful Things That Are {currentColor.name}:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {currentColor.items.map((it, i) => (
              <button
                key={i}
                onClick={() => {
                  sound.playPop();
                  sound.speak(it);
                }}
                className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 text-base sm:text-lg font-bold text-slate-800 shadow-sm btn-bouncy"
              >
                {it}
              </button>
            ))}
          </div>
        </div>

        {/* Color Palette Selector */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4 pt-4 border-t border-slate-100">
          {COLORS_DATA.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => handleSelectColor(idx)}
              style={{ backgroundColor: c.hex }}
              className={`w-12 h-12 rounded-2xl shadow-md transition-all ${
                idx === selectedColorIdx
                  ? 'ring-4 ring-offset-2 ring-slate-800 scale-110'
                  : 'hover:scale-105 opacity-90'
              }`}
              title={c.name}
            />
          ))}
        </div>
      </div>
    </div>
  );

  /* ----------------------------------------------------
     MODE 2: TAP THE REQUESTED COLOR
  ---------------------------------------------------- */
  const [quizTarget, setQuizTarget] = useState(COLORS_DATA[0]);
  const [quizOptions, setQuizOptions] = useState(COLORS_DATA.slice(0, 4));

  const setupQuiz = useCallback(() => {
    const target = COLORS_DATA[Math.floor(Math.random() * COLORS_DATA.length)];
    setQuizTarget(target);
    sound.speak(`Can you find the color ${target.name}?`);
    const others = COLORS_DATA.filter(c => c.id !== target.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const pool = [target, ...others].sort(() => 0.5 - Math.random());
    setQuizOptions(pool);
  }, []);

  const handlePickColor = (chosen: typeof COLORS_DATA[0]) => {
    if (chosen.id === quizTarget.id) {
      sound.playSuccess();
      confetti({ particleCount: 30 });
      sound.speak(`Super! You found ${quizTarget.name}!`);
      onEarnStar(1);
      setTimeout(setupQuiz, 1200);
    } else {
      sound.playGentleBoing();
      sound.speak(`That is ${chosen.name}. Find ${quizTarget.name}!`);
    }
  };

  const renderQuiz = () => (
    <div className="flex flex-col items-center max-w-lg mx-auto w-full">
      <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-amber-300 w-full text-center">
        <h3 className="text-2xl font-black text-slate-800 mb-1">
          Color Safari Quiz!
        </h3>
        <p className="text-slate-600 text-sm mb-4">
          Tap the bucket that matches the color:
        </p>

        <div className="flex items-center justify-center gap-3 my-4">
          <span className="text-4xl font-extrabold text-amber-900">
            Find: <span style={{ color: quizTarget.hex }}>{quizTarget.name}</span>
          </span>
          <button
            onClick={() => sound.speak(`Find the color ${quizTarget.name}`)}
            className="p-2.5 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-full"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 my-6">
          {quizOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handlePickColor(opt)}
              style={{ backgroundColor: opt.hex }}
              className={`h-24 sm:h-28 rounded-3xl shadow-lg border-4 border-white flex flex-col items-center justify-center transition-transform hover:scale-105 active:scale-95 ${opt.textColor}`}
            >
              <span className="text-2xl sm:text-3xl font-black drop-shadow">
                {opt.name}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={setupQuiz}
          className="text-sm font-bold text-slate-600 hover:text-slate-900 flex items-center justify-center gap-1 mx-auto"
        >
          <RotateCcw className="w-4 h-4" /> Next Color Question
        </button>
      </div>
    </div>
  );

  /* ----------------------------------------------------
     MODE 3: PAINT A MAGICAL RAINBOW
  ---------------------------------------------------- */
  const RAINBOW_ARCS = [
    { name: 'Red', hex: '#EF4444' },
    { name: 'Orange', hex: '#F97316' },
    { name: 'Yellow', hex: '#FACC15' },
    { name: 'Green', hex: '#22C55E' },
    { name: 'Blue', hex: '#3B82F6' },
    { name: 'Purple', hex: '#8B5CF6' },
  ];

  const [paintedArcs, setPaintedArcs] = useState<number[]>([]);

  const handlePaintArc = (idx: number) => {
    if (!paintedArcs.includes(idx)) {
      setPaintedArcs([...paintedArcs, idx]);
      sound.playTone(300 + idx * 60, 0.3);
      sound.speak(RAINBOW_ARCS[idx].name);

      if (paintedArcs.length + 1 === RAINBOW_ARCS.length) {
        sound.playFanfare();
        confetti({ particleCount: 50, spread: 90 });
        sound.speak('Magical rainbow complete! Sparkling bright!');
        onEarnStar(2);
      }
    }
  };

  const renderRainbow = () => (
    <div className="flex flex-col items-center max-w-xl mx-auto w-full">
      <div className="bg-gradient-to-b from-sky-300 via-sky-200 to-emerald-100 rounded-3xl p-6 shadow-xl border-4 border-sky-300 w-full text-center">
        <h3 className="text-2xl font-black text-sky-900 mb-1">
          Paint the Magic Rainbow!
        </h3>
        <p className="text-sky-800 text-sm mb-4">
          Tap each arch to fill it with color!
        </p>

        {/* Rainbow SVG visualization */}
        <div className="relative w-80 h-44 mx-auto my-4 overflow-hidden">
          <svg viewBox="0 0 320 180" className="w-full h-full">
            {RAINBOW_ARCS.map((arc, i) => {
              const isFilled = paintedArcs.includes(i);
              const radius = 140 - i * 16;
              return (
                <path
                  key={i}
                  d={`M ${160 - radius} 170 A ${radius} ${radius} 0 0 1 ${160 + radius} 170`}
                  fill="none"
                  stroke={isFilled ? arc.hex : '#E2E8F0'}
                  strokeWidth="14"
                  strokeLinecap="round"
                  onClick={() => handlePaintArc(i)}
                  className="cursor-pointer transition-colors duration-300 hover:opacity-90"
                />
              );
            })}
          </svg>
        </div>

        {/* Arc Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          {RAINBOW_ARCS.map((arc, i) => {
            const isFilled = paintedArcs.includes(i);
            return (
              <button
                key={i}
                onClick={() => handlePaintArc(i)}
                style={{ backgroundColor: isFilled ? arc.hex : '#CBD5E1' }}
                className="px-4 py-2 rounded-xl text-white font-black text-sm shadow btn-bouncy"
              >
                {arc.name} {isFilled ? '✓' : ''}
              </button>
            );
          })}
        </div>

        {paintedArcs.length === RAINBOW_ARCS.length && (
          <div className="mt-4 p-3 bg-white/90 text-amber-900 rounded-2xl font-black text-lg animate-bounce flex items-center justify-center gap-2 shadow">
            <Sparkles className="w-5 h-5 text-amber-500" /> Beautiful Rainbow! +2 Stars ⭐
          </div>
        )}

        <button
          onClick={() => setPaintedArcs([])}
          className="mt-4 text-xs font-bold text-sky-800 hover:underline"
        >
          Paint Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-rose-50/60 pb-16 pt-4 px-4">
      {/* Top Header */}
      <div className="max-w-4xl mx-auto flex items-center justify-between mb-4">
        <button
          onClick={() => {
            sound.playTap();
            onBack();
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white text-slate-800 font-bold shadow-md hover:bg-slate-50 btn-bouncy"
        >
          <ArrowLeft className="w-5 h-5" /> Back Home
        </button>

        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-rose-950 flex items-center justify-center gap-2">
            🎨 Color Garden
          </h2>
          <span className="text-xs sm:text-sm font-semibold text-rose-800">
            Discover 11 Magical Colors & Paint!
          </span>
        </div>

        <div className="w-24" />
      </div>

      {/* Mode Tabs */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-center gap-2">
        <button
          onClick={() => {
            sound.playTap();
            setActiveTab('garden');
          }}
          className={`px-5 py-2.5 rounded-2xl font-bold text-sm transition-all ${
            activeTab === 'garden'
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-rose-50 shadow-sm'
          }`}
        >
          🌸 Explore Colors
        </button>
        <button
          onClick={() => {
            sound.playTap();
            setActiveTab('quiz');
            setupQuiz();
          }}
          className={`px-5 py-2.5 rounded-2xl font-bold text-sm transition-all ${
            activeTab === 'quiz'
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-rose-50 shadow-sm'
          }`}
        >
          🎯 Color Quiz
        </button>
        <button
          onClick={() => {
            sound.playTap();
            setActiveTab('rainbow');
          }}
          className={`px-5 py-2.5 rounded-2xl font-bold text-sm transition-all ${
            activeTab === 'rainbow'
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-rose-50 shadow-sm'
          }`}
        >
          🌈 Magic Rainbow
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        {activeTab === 'garden' && renderGarden()}
        {activeTab === 'quiz' && renderQuiz()}
        {activeTab === 'rainbow' && renderRainbow()}
      </div>

      {/* Mascot Friend */}
      <div className="max-w-md mx-auto mt-8 flex items-center justify-center gap-3 bg-white/70 backdrop-blur px-4 py-2.5 rounded-2xl border border-rose-200 shadow-sm">
        <Mascot id="mimi" size="sm" mood="happy" />
        <span className="text-xs sm:text-sm font-bold text-rose-950">
          Mimi Bunny loves every bright color of the rainbow!
        </span>
      </div>
    </div>
  );
};
