import React, { useState, useRef, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { NUMBERS_DATA } from '../../data/learningData';
import { Mascot } from '../mascots/Mascot';
import { sound } from '../../services/sound';
import { ArrowLeft, Volume2, ChevronLeft, ChevronRight, RotateCcw, Plus, Minus, Sparkles } from 'lucide-react';

interface NumberKingdomProps {
  onBack: () => void;
  onEarnStar: (amount?: number) => void;
  onExploreNumber: (num: number) => void;
  exploredNumbers: number[];
}

type NumberSimpleMode = 'count' | 'addition' | 'subtraction' | 'trace';

export const NumberKingdom: React.FC<NumberKingdomProps> = ({
  onBack,
  onEarnStar,
  onExploreNumber,
  exploredNumbers,
}) => {
  const [activeMode, setActiveMode] = useState<NumberSimpleMode>('count');
  const [currentNumIdx, setCurrentNumIdx] = useState(1);
  const [tappedIndices, setTappedIndices] = useState<number[]>([]);

  const currentNumber = NUMBERS_DATA[currentNumIdx];

  const handleSelectNumber = useCallback((idx: number) => {
    setCurrentNumIdx(idx);
    setTappedIndices([]);
    const item = NUMBERS_DATA[idx];
    onExploreNumber(item.num);
    sound.playTap();
    sound.speak(`Number ${item.num}! ${item.word}!`);
  }, [onExploreNumber]);

  useEffect(() => {
    if (activeMode === 'count') {
      sound.speak(`Number ${currentNumber.num}! ${currentNumber.word}!`);
    }
  }, [currentNumIdx, activeMode, currentNumber]);

  const handleTapObject = (idx: number) => {
    if (!tappedIndices.includes(idx)) {
      const nextCount = tappedIndices.length + 1;
      setTappedIndices([...tappedIndices, idx]);
      sound.playPop();
      sound.speak(`${nextCount}`);

      if (nextCount === currentNumber.num) {
        sound.playSuccess();
        confetti({ particleCount: 25 });
        sound.speak(`Awesome! That is ${currentNumber.num} ${currentNumber.item}!`);
        onEarnStar(1);
      }
    }
  };

  /* ----------------------------------------------------
     MODE 1: COUNT ALONG (SUPER TACTILE FOR KIDS)
  ---------------------------------------------------- */
  const renderCount = () => (
    <div className="flex flex-col items-center max-w-sm sm:max-w-md mx-auto w-full">
      <div className="bg-white rounded-[36px] p-6 shadow-xl border-4 border-[#FFDC5E] w-full text-center flex flex-col items-center">
        
        {/* Big Number & Word */}
        <div 
          onClick={() => {
            sound.playPop();
            sound.speak(`Number ${currentNumber.num}!`);
          }}
          className="flex items-center justify-center gap-4 my-2 cursor-pointer active:scale-95 transition-transform"
        >
          <span className="text-[100px] sm:text-[110px] font-black text-[#152B75] leading-none drop-shadow">
            {currentNumber.num}
          </span>
          <div className="text-left">
            <span className="block text-3xl sm:text-4xl font-black text-[#152B75]">
              {currentNumber.word}
            </span>
            <span className="block text-sm font-bold text-sky-600 mt-0.5">
              {currentNumber.item}
            </span>
          </div>
        </div>

        {/* Tap Each Item to Count */}
        <div className="w-full my-4 p-4 rounded-3xl bg-amber-50/80 border-2 border-amber-200">
          <div className="text-xs font-black text-amber-900 mb-2">
            Tap to count: ({tappedIndices.length} / {currentNumber.num})
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 min-h-[90px]">
            {currentNumber.num === 0 ? (
              <span className="text-base font-bold text-slate-500 py-4">
                Zero means none! 🪹
              </span>
            ) : (
              Array.from({ length: currentNumber.num }).map((_, i) => {
                const isTapped = tappedIndices.includes(i);
                return (
                  <button
                    key={i}
                    onClick={() => handleTapObject(i)}
                    className={`w-13 h-13 rounded-2xl flex flex-col items-center justify-center text-3xl transition-all ${
                      isTapped
                        ? 'bg-[#FFDC5E] ring-3 ring-amber-400 scale-110 shadow-sm'
                        : 'bg-white shadow border border-amber-100 active:scale-95'
                    }`}
                  >
                    <span>{currentNumber.itemEmoji}</span>
                    {isTapped && (
                      <span className="text-[10px] font-black text-[#152B75]">
                        {tappedIndices.indexOf(i) + 1}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between w-full mt-4 pt-3 border-t border-slate-100">
          <button
            onClick={() => handleSelectNumber(currentNumIdx > 0 ? currentNumIdx - 1 : NUMBERS_DATA.length - 1)}
            className="flex items-center gap-1 px-4 py-2.5 rounded-2xl bg-[#FFDC5E] hover:bg-yellow-400 text-[#152B75] font-black text-base shadow btn-bouncy"
          >
            <ChevronLeft className="w-5 h-5" /> Back
          </button>

          <button
            onClick={() => {
              confetti({ particleCount: 25 });
              sound.playSuccess();
              onEarnStar(1);
            }}
            className="px-3 py-2 bg-yellow-400 hover:bg-yellow-500 text-[#152B75] font-black rounded-2xl text-xs shadow"
          >
            Counted It! ⭐
          </button>

          <button
            onClick={() => handleSelectNumber(currentNumIdx < NUMBERS_DATA.length - 1 ? currentNumIdx + 1 : 0)}
            className="flex items-center gap-1 px-4 py-2.5 rounded-2xl bg-[#FFDC5E] hover:bg-yellow-400 text-[#152B75] font-black text-base shadow btn-bouncy"
          >
            Next <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 0-20 Selector */}
      <div className="w-full mt-3 bg-white/90 backdrop-blur rounded-[24px] p-2.5 shadow-md overflow-x-auto">
        <div className="flex gap-1.5 min-w-max pb-1">
          {NUMBERS_DATA.map((item, idx) => (
            <button
              key={item.num}
              onClick={() => handleSelectNumber(idx)}
              className={`w-10 h-10 rounded-2xl font-black text-base transition-all ${
                idx === currentNumIdx
                  ? 'bg-[#152B75] text-white scale-110 shadow-md ring-2 ring-sky-300'
                  : 'bg-amber-100 text-[#152B75] hover:bg-amber-200'
              }`}
            >
              {item.num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  /* ----------------------------------------------------
     MODE 2: VISUAL ADDITION
  ---------------------------------------------------- */
  const [addA, setAddA] = useState(2);
  const [addB, setAddB] = useState(1);
  const [addSelected, setAddSelected] = useState<number | null>(null);

  const generateAddition = useCallback(() => {
    const a = Math.floor(Math.random() * 3) + 1;
    const b = Math.floor(Math.random() * 3) + 1;
    setAddA(a);
    setAddB(b);
    setAddSelected(null);
    sound.speak(`${a} plus ${b}. How many apples?`);
  }, []);

  const handlePickAdd = (ans: number) => {
    setAddSelected(ans);
    const sum = addA + addB;
    if (ans === sum) {
      sound.playSuccess();
      confetti({ particleCount: 30 });
      sound.speak(`Yes! ${addA} plus ${addB} equals ${sum}!`);
      onEarnStar(1);
      setTimeout(generateAddition, 1800);
    } else {
      sound.playGentleBoing();
      sound.speak('Count the apples together!');
    }
  };

  const renderAddition = () => {
    const sum = addA + addB;
    const choices = [sum, sum + 1, Math.max(1, sum - 1)].sort(() => 0.5 - Math.random());

    return (
      <div className="flex flex-col items-center max-w-sm sm:max-w-md mx-auto w-full">
        <div className="bg-white rounded-[36px] p-6 shadow-xl border-4 border-[#60E6BD] w-full text-center">
          <h3 className="text-2xl font-black text-[#152B75] mb-1">
            Fun Addition!
          </h3>
          <p className="text-slate-500 text-xs font-bold mb-4">
            Count the apples together!
          </p>

          <div className="flex items-center justify-center gap-3 p-4 rounded-3xl bg-emerald-50 border-2 border-emerald-200 my-4">
            <div className="flex flex-col items-center">
              <div className="flex gap-1">
                {Array.from({ length: addA }).map((_, i) => (
                  <span key={i} className="text-3xl animate-bounce">🍎</span>
                ))}
              </div>
              <span className="text-2xl font-black text-[#152B75] mt-1">{addA}</span>
            </div>

            <Plus className="w-6 h-6 text-emerald-600" />

            <div className="flex flex-col items-center">
              <div className="flex gap-1">
                {Array.from({ length: addB }).map((_, i) => (
                  <span key={i} className="text-3xl animate-bounce">🍏</span>
                ))}
              </div>
              <span className="text-2xl font-black text-[#152B75] mt-1">{addB}</span>
            </div>

            <span className="text-2xl font-black text-[#152B75]">=</span>

            <div className="w-13 h-13 rounded-2xl bg-white border-2 border-dashed border-emerald-400 flex items-center justify-center text-2xl font-black text-[#152B75] shadow-inner">
              {addSelected === sum ? sum : '?'}
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mt-4">
            {choices.map((c) => (
              <button
                key={c}
                onClick={() => handlePickAdd(c)}
                className={`w-14 h-14 rounded-2xl text-2xl font-black shadow-md btn-bouncy ${
                  addSelected === c
                    ? c === sum
                      ? 'bg-emerald-500 text-white'
                      : 'bg-rose-400 text-white'
                    : 'bg-emerald-100 text-[#152B75] hover:bg-emerald-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <button
            onClick={generateAddition}
            className="mt-5 text-xs text-emerald-700 font-bold hover:underline flex items-center justify-center gap-1 mx-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Next Math Riddle
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#DFF1FD] pb-24 pt-3 px-3 select-none">
      <div className="max-w-md mx-auto flex items-center justify-between mb-3">
        <button
          onClick={() => {
            sound.playTap();
            onBack();
          }}
          className="flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-white text-[#152B75] font-black text-sm shadow-sm active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" /> Home
        </button>

        <h2 className="text-xl font-black text-[#152B75]">
          🔢 Number Kingdom
        </h2>

        <div className="w-14" />
      </div>

      {/* Tabs */}
      <div className="max-w-md mx-auto mb-4 flex justify-around bg-white/80 backdrop-blur p-1.5 rounded-2xl shadow-sm">
        {[
          { id: 'count', label: '🖐️ Count 0-20', color: 'bg-[#FFDC5E]' },
          { id: 'addition', label: '➕ Add Apples', color: 'bg-[#60E6BD]' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              sound.playTap();
              setActiveMode(tab.id as NumberSimpleMode);
            }}
            className={`px-4 py-2 rounded-xl font-black text-xs transition-all ${
              activeMode === tab.id
                ? `${tab.color} text-[#152B75] shadow-sm scale-105`
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="max-w-md mx-auto">
        {activeMode === 'count' && renderCount()}
        {activeMode === 'addition' && renderAddition()}
      </div>
    </div>
  );
};
