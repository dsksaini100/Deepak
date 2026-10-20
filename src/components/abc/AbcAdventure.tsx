import React, { useState, useRef, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { ALPHABET_DATA } from '../../data/learningData';
import { Mascot } from '../mascots/Mascot';
import { sound } from '../../services/sound';
import { ArrowLeft, Volume2, ChevronLeft, ChevronRight, RotateCcw, Sparkles } from 'lucide-react';

interface AbcAdventureProps {
  onBack: () => void;
  onEarnStar: (amount?: number) => void;
  onExploreLetter: (letter: string) => void;
  exploredLetters: string[];
}

type AbcSimpleMode = 'letter' | 'trace' | 'balloon' | 'missing';

export const AbcAdventure: React.FC<AbcAdventureProps> = ({
  onBack,
  onEarnStar,
  onExploreLetter,
  exploredLetters,
}) => {
  const [activeMode, setActiveMode] = useState<AbcSimpleMode>('letter');
  const [currentLetterIdx, setCurrentLetterIdx] = useState(0);
  const currentLetter = ALPHABET_DATA[currentLetterIdx];

  const handleSelectLetter = useCallback((idx: number) => {
    setCurrentLetterIdx(idx);
    const item = ALPHABET_DATA[idx];
    onExploreLetter(item.letter);
    sound.playTap();
    sound.speak(`${item.letter}! ${item.lowercase}. ${item.word}!`);
  }, [onExploreLetter]);

  // Initial speech when opening or changing letter
  useEffect(() => {
    if (activeMode === 'letter') {
      sound.speak(`${currentLetter.letter}! ${currentLetter.word}!`);
    }
  }, [currentLetterIdx, activeMode, currentLetter]);

  const handlePrev = () => {
    const nextIdx = currentLetterIdx > 0 ? currentLetterIdx - 1 : ALPHABET_DATA.length - 1;
    handleSelectLetter(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = currentLetterIdx < ALPHABET_DATA.length - 1 ? currentLetterIdx + 1 : 0;
    handleSelectLetter(nextIdx);
  };

  /* ----------------------------------------------------
     MODE 1: BIG LETTER & WORD (SUPER SIMPLE FOR TODDLERS)
  ---------------------------------------------------- */
  const renderBigLetter = () => (
    <div className="flex flex-col items-center max-w-sm sm:max-w-md mx-auto w-full">
      {/* Huge White Pillowy Card */}
      <div className="relative w-full bg-white rounded-[36px] p-6 shadow-xl border-4 border-[#7BD4FD] text-center flex flex-col items-center">
        
        {/* Giant Touchable Letters */}
        <div 
          onClick={() => {
            sound.playPop();
            sound.speak(`${currentLetter.letter} says ${currentLetter.phonics}! ${currentLetter.word}!`);
            confetti({ particleCount: 20 });
          }}
          className="cursor-pointer group flex items-baseline justify-center gap-3 my-2 active:scale-95 transition-transform"
        >
          <span className="text-[100px] sm:text-[120px] font-black text-[#FF597B] leading-none drop-shadow-md">
            {currentLetter.letter}
          </span>
          <span className="text-[70px] sm:text-[85px] font-black text-[#38BDF8] leading-none drop-shadow-sm">
            {currentLetter.lowercase}
          </span>
        </div>

        {/* Word Display with Big Sound Button */}
        <div className="flex items-center justify-center gap-3 mt-2 mb-2">
          <span className="text-3xl sm:text-4xl font-black text-[#152B75]">
            {currentLetter.word}
          </span>
          <button
            onClick={() => {
              sound.playTap();
              sound.speak(`${currentLetter.letter} is for ${currentLetter.word}!`);
            }}
            className="w-13 h-13 rounded-full bg-[#FFDC5E] hover:bg-yellow-400 text-[#152B75] flex items-center justify-center shadow-md active:scale-90 transition-transform"
            aria-label="Hear pronunciation"
          >
            <Volume2 className="w-7 h-7" />
          </button>
        </div>

        {/* Phonics Tag */}
        <div className="bg-sky-100 text-sky-900 font-extrabold px-5 py-2 rounded-full text-base sm:text-lg my-2">
          Says: &quot;{currentLetter.phonics}&quot;
        </div>

        {/* Friendly mascot note */}
        <div className="flex items-center gap-2.5 bg-amber-50 px-4 py-2 rounded-2xl border border-amber-200 mt-2">
          <Mascot id="coco" size="xs" mood="happy" className="w-10 h-10" />
          <span className="text-xs sm:text-sm font-bold text-amber-900">
            Tap letter to hear sound!
          </span>
        </div>

        {/* Large Navigation Controls for Toddler Fingers */}
        <div className="flex items-center justify-between w-full mt-6 pt-3 border-t border-slate-100">
          <button
            onClick={handlePrev}
            className="flex items-center gap-1 px-5 py-3 rounded-2xl bg-[#38BDF8] hover:bg-sky-500 text-white font-black text-lg shadow-md active:scale-95 btn-bouncy"
          >
            <ChevronLeft className="w-6 h-6" /> Back
          </button>

          <button
            onClick={() => {
              confetti({ particleCount: 30, spread: 60 });
              sound.playSuccess();
              onEarnStar(1);
            }}
            className="px-4 py-2.5 bg-[#FFDC5E] hover:bg-yellow-400 text-[#152B75] font-black rounded-2xl text-sm shadow-md flex items-center gap-1 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-amber-600" /> Got It! ⭐
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-1 px-5 py-3 rounded-2xl bg-[#38BDF8] hover:bg-sky-500 text-white font-black text-lg shadow-md active:scale-95 btn-bouncy"
          >
            Next <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* A-Z Quick Selector Strip */}
      <div className="w-full mt-4 bg-white/90 backdrop-blur rounded-[24px] p-2.5 shadow-md overflow-x-auto">
        <div className="flex gap-2 min-w-max pb-1">
          {ALPHABET_DATA.map((item, idx) => {
            const isSelected = idx === currentLetterIdx;
            const isExplored = exploredLetters.includes(item.letter);
            return (
              <button
                key={item.letter}
                onClick={() => handleSelectLetter(idx)}
                className={`w-11 h-11 rounded-2xl font-black text-lg transition-all ${
                  isSelected
                    ? 'bg-[#FF597B] text-white scale-110 shadow-md ring-3 ring-rose-200'
                    : isExplored
                    ? 'bg-sky-100 text-sky-900 hover:bg-sky-200'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {item.letter}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  /* ----------------------------------------------------
     MODE 2: TRACE THE LETTER
  ---------------------------------------------------- */
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [traceDone, setTraceDone] = useState(false);

  const clearCanvas = useCallback(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    setTraceDone(false);
  }, []);

  useEffect(() => {
    clearCanvas();
  }, [currentLetterIdx, clearCanvas]);

  const handleStartTrace = (e: React.MouseEvent | React.TouchEvent) => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    sound.playTap();

    const rect = cvs.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : (e as React.MouseEvent).clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 22;
    ctx.strokeStyle = '#38BDF8';
  };

  const handleMoveTrace = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;

    const rect = cvs.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : (e as React.MouseEvent).clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handleEndTrace = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    if (!traceDone) {
      setTraceDone(true);
      sound.playSuccess();
      confetti({ particleCount: 30 });
      onEarnStar(1);
    }
  };

  const renderTrace = () => (
    <div className="flex flex-col items-center max-w-sm sm:max-w-md mx-auto w-full">
      <div className="bg-white rounded-[36px] p-6 shadow-xl border-4 border-[#60E6BD] w-full text-center">
        <h3 className="text-2xl font-black text-[#152B75] mb-1">
          Trace Letter {currentLetter.letter}
        </h3>
        <p className="text-slate-500 text-xs font-bold mb-4">
          Draw along the shape with your finger!
        </p>

        {/* Tracing Canvas with Dotted Letter */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto rounded-[32px] bg-sky-50 border-4 border-dashed border-[#60E6BD] flex items-center justify-center overflow-hidden touch-none shadow-inner">
          <span className="absolute text-[160px] sm:text-[180px] font-black text-sky-200/80 font-mono select-none pointer-events-none">
            {currentLetter.letter}
          </span>
          <canvas
            ref={canvasRef}
            width={288}
            height={288}
            onMouseDown={handleStartTrace}
            onMouseMove={handleMoveTrace}
            onMouseUp={handleEndTrace}
            onMouseLeave={handleEndTrace}
            onTouchStart={handleStartTrace}
            onTouchMove={handleMoveTrace}
            onTouchEnd={handleEndTrace}
            className="absolute inset-0 cursor-crosshair w-full h-full"
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 mt-5">
          <button
            onClick={clearCanvas}
            className="flex items-center gap-1 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm"
          >
            <RotateCcw className="w-4 h-4" /> Clear
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-1 px-6 py-2.5 rounded-2xl bg-[#60E6BD] hover:bg-emerald-400 text-emerald-950 font-black text-base shadow btn-bouncy"
          >
            Next Letter <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {traceDone && (
          <div className="mt-4 p-2.5 bg-emerald-100 text-emerald-950 rounded-2xl font-black text-base animate-bounce flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" /> Beautiful Tracing! +1 Star ⭐
          </div>
        )}
      </div>
    </div>
  );

  /* ----------------------------------------------------
     MODE 3: BALLOON POP (as in screenshot)
  ---------------------------------------------------- */
  const [targetBalloonLetter, setTargetBalloonLetter] = useState('A');
  const [balloons, setBalloons] = useState<{ id: number; letter: string; color: string; x: number; y: number }[]>([]);

  const setupBalloons = useCallback(() => {
    const target = ALPHABET_DATA[Math.floor(Math.random() * ALPHABET_DATA.length)].letter;
    setTargetBalloonLetter(target);
    sound.speak(`Pop balloons with letter ${target}!`);

    const colors = ['bg-[#FF7A95]', 'bg-[#56C4FD]', 'bg-[#FFDC5E]', 'bg-[#60E6BD]', 'bg-[#E688FF]'];
    const newBalloons = [
      { id: 1, letter: target, color: colors[0], x: 25, y: 30 },
      { id: 2, letter: target, color: colors[3], x: 70, y: 60 },
      { id: 3, letter: 'O', color: colors[4], x: 75, y: 25 },
      { id: 4, letter: 'N', color: colors[2], x: 48, y: 45 },
      { id: 5, letter: 'S', color: colors[1], x: 30, y: 75 },
    ];
    setBalloons(newBalloons);
  }, []);

  useEffect(() => {
    if (activeMode === 'balloon') {
      setupBalloons();
    }
  }, [activeMode, setupBalloons]);

  const handlePopBalloon = (id: number, letter: string) => {
    if (letter === targetBalloonLetter) {
      sound.playPop();
      sound.playSuccess();
      confetti({ particleCount: 25 });
      setBalloons(prev => prev.filter(b => b.id !== id));
      onEarnStar(1);

      const remaining = balloons.filter(b => b.id !== id && b.letter === targetBalloonLetter);
      if (remaining.length === 0) {
        sound.speak(`Super! You popped all letter ${targetBalloonLetter}s!`);
        setTimeout(setupBalloons, 1200);
      }
    } else {
      sound.playGentleBoing();
      sound.speak(`That is ${letter}. Pop letter ${targetBalloonLetter}!`);
    }
  };

  const renderBalloon = () => (
    <div className="relative w-full max-w-sm sm:max-w-md mx-auto h-[440px] bg-gradient-to-b from-[#FF7A95] via-[#FF9BB2] to-[#FFD1DC] rounded-[36px] p-5 shadow-2xl border-4 border-white overflow-hidden">
      {/* Target prompt */}
      <div className="relative z-10 bg-white/95 backdrop-blur rounded-[24px] p-3 shadow-md text-center max-w-xs mx-auto">
        <h3 className="text-lg font-black text-[#FF597B]">
          Pop balloons with letter:
        </h3>
        <div className="flex items-center justify-center gap-2 mt-0.5">
          <span className="text-4xl font-black text-[#FF597B] animate-bounce">
            {targetBalloonLetter}
          </span>
          <button
            onClick={() => sound.speak(`Pop letter ${targetBalloonLetter}`)}
            className="p-1.5 rounded-full bg-rose-100 text-rose-600 hover:bg-rose-200"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Floating balloons */}
      <div className="relative w-full h-[300px] mt-2">
        {balloons.map((b) => (
          <div
            key={b.id}
            onClick={() => handlePopBalloon(b.id, b.letter)}
            style={{ left: `${b.x}%`, top: `${b.y}%` }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-110 active:scale-95 animate-float"
          >
            <div className={`relative w-20 h-24 rounded-full ${b.color} shadow-lg flex items-center justify-center border-2 border-white/70`}>
              <span className="text-3xl font-black text-white drop-shadow">
                {b.letter}
              </span>
              <div className="absolute -bottom-2 w-3 h-2 bg-inherit rounded-sm mx-auto" />
              <div className="absolute -bottom-6 w-0.5 h-5 bg-slate-500/40" />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={setupBalloons}
        className="absolute bottom-3 right-4 bg-white/90 text-[#FF597B] font-bold px-3 py-1.5 rounded-xl text-xs shadow flex items-center gap-1"
      >
        <RotateCcw className="w-3.5 h-3.5" /> New Game
      </button>
    </div>
  );

  /* ----------------------------------------------------
     MODE 4: MISSING LETTER (Screenshot 615423d5.jpg)
  ---------------------------------------------------- */
  const WORDS = [
    { word: 'FISH', missingIdx: 1, letter: 'I', hint: 'Swims in water! 🐟' },
    { word: 'CAT', missingIdx: 1, letter: 'A', hint: 'Says meow! 🐱' },
    { word: 'DOG', missingIdx: 2, letter: 'G', hint: 'Wags its tail! 🐶' },
    { word: 'SUN', missingIdx: 0, letter: 'S', hint: 'Shines bright! ☀️' },
  ];

  const [wordIdx, setWordIdx] = useState(0);
  const [filledChar, setFilledChar] = useState<string | null>(null);
  const curPuzzle = WORDS[wordIdx];

  const handlePickMissing = (char: string) => {
    if (char === curPuzzle.letter) {
      setFilledChar(char);
      sound.playSuccess();
      confetti({ particleCount: 25 });
      sound.speak(`Awesome! ${curPuzzle.word}!`);
      onEarnStar(1);

      setTimeout(() => {
        setFilledChar(null);
        setWordIdx((wordIdx + 1) % WORDS.length);
      }, 1500);
    } else {
      sound.playGentleBoing();
      sound.speak('Try another letter!');
    }
  };

  const renderMissing = () => {
    const choices = [curPuzzle.letter, 'A', 'E', 'O'].filter((v, i, a) => a.indexOf(v) === i).slice(0, 4);

    return (
      <div className="flex flex-col items-center max-w-sm sm:max-w-md mx-auto w-full">
        <div className="bg-gradient-to-b from-[#56C4FD] via-[#7BD4FD] to-teal-100 rounded-[36px] p-6 shadow-xl border-4 border-white w-full text-center">
          <h3 className="text-2xl font-black text-[#152B75] mb-1">
            Find the Missing Letter!
          </h3>
          <p className="text-sky-900 text-xs font-bold mb-4">
            {curPuzzle.hint}
          </p>

          {/* Letter Boxes */}
          <div className="flex items-center justify-center gap-2.5 my-5">
            {curPuzzle.word.split('').map((char, idx) => {
              const isMissing = idx === curPuzzle.missingIdx;
              const val = isMissing ? filledChar || '' : char;
              return (
                <div
                  key={idx}
                  className={`w-14 h-18 sm:w-16 sm:h-20 rounded-2xl flex items-center justify-center text-4xl font-black shadow-md ${
                    isMissing
                      ? filledChar
                        ? 'bg-[#60E6BD] text-white animate-bounce'
                        : 'bg-white/80 border-3 border-dashed border-[#152B75] text-[#152B75]'
                      : 'bg-white text-[#152B75]'
                  }`}
                >
                  {val}
                </div>
              );
            })}
          </div>

          {/* Tap the letter options */}
          <div className="flex items-center justify-center gap-3 my-4">
            {choices.map((opt) => (
              <button
                key={opt}
                onClick={() => handlePickMissing(opt)}
                className="w-14 h-14 rounded-2xl bg-[#FFDC5E] hover:bg-yellow-400 text-[#152B75] text-2xl font-black shadow-md btn-bouncy"
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            <Mascot id="tiko" size="xs" mood="happy" className="w-10 h-10" />
            <span className="text-xs font-bold text-sky-950">
              Can you spell {curPuzzle.word}?
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#DFF1FD] pb-24 pt-3 px-3 select-none">
      {/* Top Header Bar */}
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
          🔤 ABC Adventure
        </h2>

        <div className="w-14" />
      </div>

      {/* 4 Simple Kid-Friendly Tabs */}
      <div className="max-w-md mx-auto mb-4 flex justify-around bg-white/80 backdrop-blur p-1.5 rounded-2xl shadow-sm">
        {[
          { id: 'letter', label: '📖 Letters', color: 'bg-[#56C4FD]' },
          { id: 'trace', label: '✍️ Trace', color: 'bg-[#60E6BD]' },
          { id: 'balloon', label: '🎈 Balloons', color: 'bg-[#FF7A95]' },
          { id: 'missing', label: '🔍 Spell', color: 'bg-[#FFAF68]' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              sound.playTap();
              setActiveMode(tab.id as AbcSimpleMode);
            }}
            className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all ${
              activeMode === tab.id
                ? `${tab.color} text-white shadow-sm scale-105`
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Body */}
      <div className="max-w-md mx-auto">
        {activeMode === 'letter' && renderBigLetter()}
        {activeMode === 'trace' && renderTrace()}
        {activeMode === 'balloon' && renderBalloon()}
        {activeMode === 'missing' && renderMissing()}
      </div>
    </div>
  );
};
