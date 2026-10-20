import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { SHAPES_DATA } from '../../data/learningData';
import { Mascot } from '../mascots/Mascot';
import { sound } from '../../services/sound';
import { ArrowLeft, Volume2, Sparkles, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

interface ShapeCityProps {
  onBack: () => void;
  onEarnStar: (amount?: number) => void;
  onExploreShape: (shapeId: string) => void;
  completedShapes: string[];
}

export const ShapeCity: React.FC<ShapeCityProps> = ({
  onBack,
  onEarnStar,
  onExploreShape,
}) => {
  const [activeTab, setActiveTab] = useState<'explorer' | 'builder' | 'match'>('explorer');
  const [selectedShapeIdx, setSelectedShapeIdx] = useState(0);

  const currentShape = SHAPES_DATA[selectedShapeIdx];

  const handleSelectShape = (idx: number) => {
    setSelectedShapeIdx(idx);
    const s = SHAPES_DATA[idx];
    onExploreShape(s.id);
    sound.playTap();
    sound.speak(`${s.name}! ${s.description}!`);
  };

  const renderShapeSvg = (id: string, sizeClass = 'w-32 h-32') => {
    switch (id) {
      case 'circle':
        return (
          <svg viewBox="0 0 100 100" className={sizeClass}>
            <circle cx="50" cy="50" r="44" fill="#F43F5E" stroke="#BE123C" strokeWidth="4" />
          </svg>
        );
      case 'square':
        return (
          <svg viewBox="0 0 100 100" className={sizeClass}>
            <rect x="10" y="10" width="80" height="80" rx="8" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="4" />
          </svg>
        );
      case 'triangle':
        return (
          <svg viewBox="0 0 100 100" className={sizeClass}>
            <polygon points="50,10 90,88 10,88" fill="#10B981" stroke="#047857" strokeWidth="4" />
          </svg>
        );
      case 'rectangle':
        return (
          <svg viewBox="0 0 100 100" className={sizeClass}>
            <rect x="6" y="24" width="88" height="52" rx="6" fill="#F59E0B" stroke="#B45309" strokeWidth="4" />
          </svg>
        );
      case 'oval':
        return (
          <svg viewBox="0 0 100 100" className={sizeClass}>
            <ellipse cx="50" cy="50" rx="44" ry="28" fill="#06B6D4" stroke="#0E7490" strokeWidth="4" />
          </svg>
        );
      case 'star':
        return (
          <svg viewBox="0 0 100 100" className={sizeClass}>
            <polygon points="50,8 62,38 95,38 68,58 78,90 50,70 22,90 32,58 5,38 38,38" fill="#FACC15" stroke="#CA8A04" strokeWidth="3" />
          </svg>
        );
      case 'heart':
        return (
          <svg viewBox="0 0 100 100" className={sizeClass}>
            <path d="M 50 86 C 20 60 4 40 16 22 C 26 8 44 14 50 28 C 56 14 74 8 84 22 C 96 40 80 60 50 86 Z" fill="#EC4899" stroke="#BE185D" strokeWidth="3" />
          </svg>
        );
      case 'diamond':
        return (
          <svg viewBox="0 0 100 100" className={sizeClass}>
            <polygon points="50,10 88,50 50,90 12,50" fill="#8B5CF6" stroke="#6D28D9" strokeWidth="4" />
          </svg>
        );
      case 'crescent':
        return (
          <svg viewBox="0 0 100 100" className={sizeClass}>
            <path d="M 65 14 A 40 40 0 1 0 65 86 A 34 34 0 0 1 65 14 Z" fill="#6366F1" stroke="#4338CA" strokeWidth="3" />
          </svg>
        );
      default:
        return null;
    }
  };

  /* ----------------------------------------------------
     TAB 1: SHAPE EXPLORER
  ---------------------------------------------------- */
  const renderExplorer = () => (
    <div className="flex flex-col items-center max-w-xl mx-auto w-full">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-amber-300 w-full text-center flex flex-col items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
          Shape City Explorer
        </span>

        {/* Animated Shape Illustration */}
        <div 
          onClick={() => {
            sound.playPop();
            sound.speak(`${currentShape.name}`);
          }}
          className="my-4 cursor-pointer transform hover:scale-110 transition-transform"
        >
          {renderShapeSvg(currentShape.id, 'w-36 h-36 drop-shadow-lg')}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-4xl sm:text-5xl font-black text-slate-800">
            {currentShape.name}
          </span>
          <button
            onClick={() => sound.speak(`${currentShape.name}! ${currentShape.description} Real world example: ${currentShape.realWorldExample}!`)}
            className="p-2.5 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-full"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        <p className="text-base sm:text-lg text-slate-600 font-medium my-2 max-w-md">
          {currentShape.description}
        </p>

        {/* Real-world badge */}
        <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl p-3 my-2 text-sm sm:text-base font-bold flex items-center justify-center gap-2">
          <span>🔍</span> Looks like: {currentShape.realWorldExample}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between w-full mt-6 pt-4 border-t border-slate-100">
          <button
            onClick={() => handleSelectShape(selectedShapeIdx > 0 ? selectedShapeIdx - 1 : SHAPES_DATA.length - 1)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold btn-bouncy"
          >
            <ChevronLeft className="w-5 h-5" /> Prev
          </button>

          <button
            onClick={() => {
              confetti({ particleCount: 25 });
              sound.playSuccess();
              onEarnStar(1);
            }}
            className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-amber-950 font-black rounded-2xl text-sm shadow-sm"
          >
            Discovered! ⭐
          </button>

          <button
            onClick={() => handleSelectShape(selectedShapeIdx < SHAPES_DATA.length - 1 ? selectedShapeIdx + 1 : 0)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold btn-bouncy"
          >
            Next <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Grid of shapes */}
      <div className="grid grid-cols-5 gap-2 w-full mt-4">
        {SHAPES_DATA.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => handleSelectShape(idx)}
            className={`p-2 rounded-2xl bg-white shadow-sm border-2 flex flex-col items-center justify-center transition-all ${
              idx === selectedShapeIdx ? 'border-amber-500 ring-2 ring-amber-300 scale-105' : 'border-transparent hover:border-slate-200'
            }`}
          >
            {renderShapeSvg(s.id, 'w-8 h-8')}
            <span className="text-[11px] font-bold text-slate-700 mt-1 truncate max-w-full">
              {s.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  /* ----------------------------------------------------
     TAB 2: SHAPE BUILDER (BUILD A HOUSE OR ROCKET!)
  ---------------------------------------------------- */
  const [housePieces, setHousePieces] = useState<{ roof: boolean; walls: boolean; door: boolean; window: boolean }>({
    roof: false,
    walls: false,
    door: false,
    window: false
  });

  const handleSnapPiece = (piece: keyof typeof housePieces) => {
    if (!housePieces[piece]) {
      setHousePieces(prev => ({ ...prev, [piece]: true }));
      sound.playPop();
      sound.playSuccess();
      onEarnStar(1);

      const allSnapping = { ...housePieces, [piece]: true };
      if (allSnapping.roof && allSnapping.walls && allSnapping.door && allSnapping.window) {
        sound.playFanfare();
        confetti({ particleCount: 50, spread: 80 });
        sound.speak('You built a beautiful shape house!');
      }
    }
  };

  const renderBuilder = () => (
    <div className="flex flex-col items-center max-w-lg mx-auto w-full">
      <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-emerald-300 w-full text-center">
        <h3 className="text-2xl font-black text-emerald-900 mb-1">
          Build a Shape House!
        </h3>
        <p className="text-slate-600 text-sm mb-4">
          Tap each shape part below to snap it onto your house!
        </p>

        {/* House construction area */}
        <div className="relative w-64 h-72 mx-auto bg-sky-50 rounded-3xl border-4 border-dashed border-sky-300 flex flex-col items-center justify-end p-4">
          {/* Triangle Roof */}
          <div className={`transition-all duration-300 ${housePieces.roof ? 'opacity-100 scale-100' : 'opacity-20 scale-90'}`}>
            <svg viewBox="0 0 160 80" className="w-48 h-24">
              <polygon points="80,5 155,75 5,75" fill="#EF4444" stroke="#B91C1C" strokeWidth="4" />
            </svg>
          </div>

          {/* Square Walls */}
          <div className={`relative w-44 h-40 bg-amber-200 border-4 border-amber-400 rounded-b-xl flex items-end justify-center transition-all duration-300 ${housePieces.walls ? 'opacity-100' : 'opacity-20'}`}>
            {/* Window (Circle) */}
            <div className={`absolute top-4 left-6 w-10 h-10 rounded-full bg-cyan-300 border-2 border-cyan-500 transition-all ${housePieces.window ? 'opacity-100' : 'opacity-0'}`} />

            {/* Door (Rectangle) */}
            <div className={`w-14 h-24 bg-amber-700 border-2 border-amber-900 rounded-t-lg flex items-center justify-end pr-1 transition-all ${housePieces.door ? 'opacity-100' : 'opacity-0'}`}>
              <div className="w-2.5 h-2.5 bg-yellow-300 rounded-full" />
            </div>
          </div>
        </div>

        {/* Shape Parts buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-6">
          <button
            onClick={() => handleSnapPiece('roof')}
            className={`p-3 rounded-2xl font-bold text-xs flex flex-col items-center gap-1 btn-bouncy ${
              housePieces.roof ? 'bg-slate-100 text-slate-400' : 'bg-red-100 text-red-900'
            }`}
          >
            <span>🔺 Triangle</span>
            <span>Roof</span>
          </button>

          <button
            onClick={() => handleSnapPiece('walls')}
            className={`p-3 rounded-2xl font-bold text-xs flex flex-col items-center gap-1 btn-bouncy ${
              housePieces.walls ? 'bg-slate-100 text-slate-400' : 'bg-amber-100 text-amber-900'
            }`}
          >
            <span>🟧 Square</span>
            <span>Walls</span>
          </button>

          <button
            onClick={() => handleSnapPiece('door')}
            className={`p-3 rounded-2xl font-bold text-xs flex flex-col items-center gap-1 btn-bouncy ${
              housePieces.door ? 'bg-slate-100 text-slate-400' : 'bg-amber-100 text-amber-900'
            }`}
          >
            <span>🚪 Rectangle</span>
            <span>Door</span>
          </button>

          <button
            onClick={() => handleSnapPiece('window')}
            className={`p-3 rounded-2xl font-bold text-xs flex flex-col items-center gap-1 btn-bouncy ${
              housePieces.window ? 'bg-slate-100 text-slate-400' : 'bg-cyan-100 text-cyan-900'
            }`}
          >
            <span>⚪ Circle</span>
            <span>Window</span>
          </button>
        </div>

        {Object.values(housePieces).every(Boolean) && (
          <div className="mt-4 p-3 bg-emerald-100 text-emerald-950 font-black rounded-2xl animate-bounce flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" /> House Built! Awesome Architect! ⭐
          </div>
        )}

        <button
          onClick={() => setHousePieces({ roof: false, walls: false, door: false, window: false })}
          className="mt-4 text-xs font-bold text-slate-500 hover:underline flex items-center justify-center gap-1 mx-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Rebuild House
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-amber-50/70 pb-16 pt-4 px-4">
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
          <h2 className="text-2xl sm:text-3xl font-black text-amber-950 flex items-center justify-center gap-2">
            🔷 Shape City
          </h2>
          <span className="text-xs sm:text-sm font-semibold text-amber-800">
            Learn Shapes, Trace & Build Objects!
          </span>
        </div>

        <div className="w-24" />
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-center gap-2">
        <button
          onClick={() => {
            sound.playTap();
            setActiveTab('explorer');
          }}
          className={`px-5 py-2.5 rounded-2xl font-bold text-sm transition-all ${
            activeTab === 'explorer'
              ? 'bg-amber-500 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-amber-100 shadow-sm'
          }`}
        >
          📐 Discover Shapes
        </button>
        <button
          onClick={() => {
            sound.playTap();
            setActiveTab('builder');
          }}
          className={`px-5 py-2.5 rounded-2xl font-bold text-sm transition-all ${
            activeTab === 'builder'
              ? 'bg-amber-500 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-amber-100 shadow-sm'
          }`}
        >
          🏠 Shape Builder
        </button>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto">
        {activeTab === 'explorer' && renderExplorer()}
        {activeTab === 'builder' && renderBuilder()}
      </div>

      {/* Mascot Friend */}
      <div className="max-w-md mx-auto mt-8 flex items-center justify-center gap-3 bg-white/70 backdrop-blur px-4 py-2.5 rounded-2xl border border-amber-200 shadow-sm">
        <Mascot id="sunny" size="sm" mood="happy" />
        <span className="text-xs sm:text-sm font-bold text-amber-950">
          Sunny the Lion loves building towering shape castles!
        </span>
      </div>
    </div>
  );
};
