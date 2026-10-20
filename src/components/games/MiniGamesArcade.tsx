import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Mascot } from '../mascots/Mascot';
import { sound } from '../../services/sound';
import { ArrowLeft, RotateCcw, Sparkles } from 'lucide-react';

interface MiniGamesArcadeProps {
  onBack: () => void;
  onEarnStar: (amount?: number) => void;
  onGameWin: () => void;
}

type GameType = 'memory' | 'shadow' | 'odd' | 'puzzle';

export const MiniGamesArcade: React.FC<MiniGamesArcadeProps> = ({
  onBack,
  onEarnStar,
  onGameWin,
}) => {
  const [activeGame, setActiveGame] = useState<GameType>('memory');

  /* ----------------------------------------------------
     GAME 1: PICTURE MEMORY MATCH
  ---------------------------------------------------- */
  const ALL_CARDS = ['🍎', '🦁', '⭐', '🚗', '🐱', '🎈'];
  const [memoryCards, setMemoryCards] = useState<{ id: number; symbol: string; flipped: boolean; matched: boolean }[]>([]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);

  const setupMemoryGame = useCallback((numPairs = 4) => {
    const selectedSymbols = ALL_CARDS.slice(0, numPairs);
    const pool = [...selectedSymbols, ...selectedSymbols]
      .sort(() => 0.5 - Math.random())
      .map((sym, idx) => ({
        id: idx,
        symbol: sym,
        flipped: false,
        matched: false
      }));
    setMemoryCards(pool);
    setFlippedIds([]);
  }, []);

  useEffect(() => {
    if (activeGame === 'memory') {
      setupMemoryGame();
    }
  }, [activeGame, setupMemoryGame]);

  const handleCardClick = (id: number) => {
    if (flippedIds.length === 2) return;
    const clicked = memoryCards.find(c => c.id === id);
    if (!clicked || clicked.flipped || clicked.matched) return;

    sound.playTap();
    const newFlipped = [...flippedIds, id];
    setFlippedIds(newFlipped);

    setMemoryCards(prev => prev.map(c => c.id === id ? { ...c, flipped: true } : c));

    if (newFlipped.length === 2) {
      const card1 = memoryCards.find(c => c.id === newFlipped[0]);
      const card2 = memoryCards.find(c => c.id === newFlipped[1]);

      if (card1 && card2 && card1.symbol === card2.symbol) {
        sound.playSuccess();
        setTimeout(() => {
          setMemoryCards(prev => prev.map(c => 
            c.id === newFlipped[0] || c.id === newFlipped[1] ? { ...c, matched: true } : c
          ));
          setFlippedIds([]);
          onEarnStar(1);

          // Check if won
          const remaining = memoryCards.filter(c => !c.matched && c.id !== newFlipped[0] && c.id !== newFlipped[1]);
          if (remaining.length === 0) {
            confetti({ particleCount: 40 });
            sound.playFanfare();
            sound.speak('You matched all the memory cards! High five!');
            onGameWin();
          }
        }, 600);
      } else {
        sound.playGentleBoing();
        setTimeout(() => {
          setMemoryCards(prev => prev.map(c => 
            c.id === newFlipped[0] || c.id === newFlipped[1] ? { ...c, flipped: false } : c
          ));
          setFlippedIds([]);
        }, 900);
      }
    }
  };

  const renderMemory = () => (
    <div className="flex flex-col items-center max-w-lg mx-auto w-full">
      <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-amber-300 w-full text-center">
        <h3 className="text-2xl font-black text-amber-950 mb-1">
          Picture Memory Match!
        </h3>
        <p className="text-slate-600 text-sm mb-4">
          Tap two cards to find matching pairs!
        </p>

        <div className="grid grid-cols-4 gap-3 my-4">
          {memoryCards.map((c) => (
            <button
              key={c.id}
              onClick={() => handleCardClick(c.id)}
              disabled={c.matched}
              className={`h-20 sm:h-24 rounded-2xl text-4xl flex items-center justify-center transition-all transform ${
                c.flipped || c.matched
                  ? 'bg-amber-100 border-2 border-amber-400 rotate-0'
                  : 'bg-amber-400 hover:bg-amber-500 shadow-md text-transparent'
              }`}
            >
              {c.flipped || c.matched ? c.symbol : '❓'}
            </button>
          ))}
        </div>

        <button
          onClick={() => setupMemoryGame()}
          className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl flex items-center gap-1.5 mx-auto"
        >
          <RotateCcw className="w-4 h-4" /> Restart Game
        </button>
      </div>
    </div>
  );

  /* ----------------------------------------------------
     GAME 2: ANIMAL SHADOW MATCHING
  ---------------------------------------------------- */
  const SHADOW_ITEMS = [
    { id: 'lion', emoji: '🦁', name: 'Lion' },
    { id: 'cat', emoji: '🐱', name: 'Cat' },
    { id: 'duck', emoji: '🦆', name: 'Duck' },
  ];

  const [matchedShadows, setMatchedShadows] = useState<string[]>([]);
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);

  const handleAnimalSelect = (id: string) => {
    sound.playTap();
    setSelectedAnimal(id);
  };

  const handleShadowSelect = (id: string) => {
    if (!selectedAnimal) return;
    if (selectedAnimal === id) {
      sound.playSuccess();
      confetti({ particleCount: 25 });
      setMatchedShadows(prev => [...prev, id]);
      setSelectedAnimal(null);
      onEarnStar(1);

      if (matchedShadows.length + 1 === SHADOW_ITEMS.length) {
        sound.playFanfare();
        sound.speak('Every animal found its shadow! Splendid!');
        onGameWin();
      }
    } else {
      sound.playGentleBoing();
      sound.speak('Not quite the right silhouette! Look at the ears or beak!');
    }
  };

  const renderShadow = () => (
    <div className="flex flex-col items-center max-w-lg mx-auto w-full">
      <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-indigo-300 w-full text-center">
        <h3 className="text-2xl font-black text-indigo-950 mb-1">
          Animal Shadow Match!
        </h3>
        <p className="text-slate-600 text-sm mb-4">
          Tap an animal first, then tap its dark shadow!
        </p>

        <div className="grid grid-cols-2 gap-6 my-4">
          {/* Animals Column */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase text-slate-500">Animals</span>
            {SHADOW_ITEMS.map((item) => (
              <button
                key={item.id}
                disabled={matchedShadows.includes(item.id)}
                onClick={() => handleAnimalSelect(item.id)}
                className={`p-4 rounded-2xl text-4xl flex items-center justify-center transition-all ${
                  matchedShadows.includes(item.id)
                    ? 'bg-slate-100 opacity-40'
                    : selectedAnimal === item.id
                    ? 'bg-indigo-500 text-white scale-105 ring-4 ring-indigo-300'
                    : 'bg-indigo-50 hover:bg-indigo-100 border-2 border-indigo-200 btn-bouncy'
                }`}
              >
                {item.emoji}
              </button>
            ))}
          </div>

          {/* Shadows Column */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase text-slate-500">Shadows</span>
            {SHADOW_ITEMS.map((item) => (
              <button
                key={item.id}
                disabled={matchedShadows.includes(item.id)}
                onClick={() => handleShadowSelect(item.id)}
                className={`p-4 rounded-2xl text-4xl flex items-center justify-center transition-all ${
                  matchedShadows.includes(item.id)
                    ? 'bg-emerald-100 opacity-80'
                    : 'bg-slate-900 text-white/30 hover:bg-slate-800 btn-bouncy'
                }`}
              >
                {/* Silhouette filter */}
                <span className={matchedShadows.includes(item.id) ? 'opacity-100' : 'brightness-0 opacity-40'}>
                  {item.emoji}
                </span>
              </button>
            ))}
          </div>
        </div>

        {matchedShadows.length === SHADOW_ITEMS.length && (
          <div className="p-3 bg-indigo-100 text-indigo-900 rounded-2xl font-black animate-bounce mt-2">
            ⭐ You found all shadows!
          </div>
        )}
      </div>
    </div>
  );

  /* ----------------------------------------------------
     GAME 3: ODD ONE OUT
  ---------------------------------------------------- */
  const ODD_ROUNDS = [
    { items: ['🍎', '🍌', '🍓', '🚗'], oddIdx: 3, reason: 'A car is a vehicle, not a delicious fruit!' },
    { items: ['🐶', '🐱', '🐮', '✈️'], oddIdx: 3, reason: 'An airplane flies in the sky, not a furry animal!' },
    { items: ['⚽', '🏀', '🏈', '🍕'], oddIdx: 3, reason: 'Pizza is yummy food, not a bouncy sports ball!' },
  ];

  const [oddRoundIdx, setOddRoundIdx] = useState(0);
  const curOdd = ODD_ROUNDS[oddRoundIdx];

  const handlePickOdd = (idx: number) => {
    if (idx === curOdd.oddIdx) {
      sound.playSuccess();
      confetti({ particleCount: 30 });
      sound.speak(`Bingo! ${curOdd.reason}`);
      onEarnStar(1);

      setTimeout(() => {
        setOddRoundIdx((oddRoundIdx + 1) % ODD_ROUNDS.length);
      }, 1800);
    } else {
      sound.playGentleBoing();
      sound.speak('That one belongs! Which one is completely different?');
    }
  };

  const renderOddOne = () => (
    <div className="flex flex-col items-center max-w-lg mx-auto w-full">
      <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-rose-300 w-full text-center">
        <h3 className="text-2xl font-black text-rose-950 mb-1">
          Find the Odd One Out!
        </h3>
        <p className="text-slate-600 text-sm mb-6">
          Which one doesn&apos;t belong in this group?
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
          {curOdd.items.map((it, i) => (
            <button
              key={i}
              onClick={() => handlePickOdd(i)}
              className="h-24 rounded-2xl bg-rose-50 hover:bg-rose-100 border-2 border-rose-200 text-5xl flex items-center justify-center btn-bouncy"
            >
              {it}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-amber-50/60 pb-16 pt-4 px-4">
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
            🎮 Fun Mini-Games Arcade
          </h2>
          <span className="text-xs sm:text-sm font-semibold text-amber-800">
            Memory, Shadows, & Brain Boosters!
          </span>
        </div>

        <div className="w-24" />
      </div>

      {/* Game Mode Tabs */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-center gap-2">
        <button
          onClick={() => {
            sound.playTap();
            setActiveGame('memory');
          }}
          className={`px-4 sm:px-5 py-2.5 rounded-2xl font-bold text-sm transition-all ${
            activeGame === 'memory'
              ? 'bg-amber-500 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-amber-50 shadow-sm'
          }`}
        >
          🃏 Memory Match
        </button>
        <button
          onClick={() => {
            sound.playTap();
            setActiveGame('shadow');
          }}
          className={`px-4 sm:px-5 py-2.5 rounded-2xl font-bold text-sm transition-all ${
            activeGame === 'shadow'
              ? 'bg-amber-500 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-amber-50 shadow-sm'
          }`}
        >
          👥 Shadow Match
        </button>
        <button
          onClick={() => {
            sound.playTap();
            setActiveGame('odd');
          }}
          className={`px-4 sm:px-5 py-2.5 rounded-2xl font-bold text-sm transition-all ${
            activeGame === 'odd'
              ? 'bg-amber-500 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-amber-50 shadow-sm'
          }`}
        >
          🔍 Odd One Out
        </button>
      </div>

      {/* Main Game Screen */}
      <div className="max-w-4xl mx-auto">
        {activeGame === 'memory' && renderMemory()}
        {activeGame === 'shadow' && renderShadow()}
        {activeGame === 'odd' && renderOddOne()}
      </div>

      {/* Mascot Friend */}
      <div className="max-w-md mx-auto mt-8 flex items-center justify-center gap-3 bg-white/70 backdrop-blur px-4 py-2.5 rounded-2xl border border-amber-200 shadow-sm">
        <Mascot id="tiko" size="sm" mood="excited" />
        <span className="text-xs sm:text-sm font-bold text-amber-950">
          Tiko the Turtle loves solving smart puzzles!
        </span>
      </div>
    </div>
  );
};
