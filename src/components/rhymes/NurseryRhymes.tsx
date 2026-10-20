import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { RHYMES_DATA } from '../../data/learningData';
import { RhymeData } from '../../types';
import { Mascot } from '../mascots/Mascot';
import { sound } from '../../services/sound';
import { ArrowLeft, Play, Pause, RotateCcw, Volume2, Sparkles, Music } from 'lucide-react';

interface NurseryRhymesProps {
  onBack: () => void;
  onEarnStar: (amount?: number) => void;
}

export const NurseryRhymes: React.FC<NurseryRhymesProps> = ({
  onBack,
  onEarnStar,
}) => {
  const [selectedRhyme, setSelectedRhyme] = useState<RhymeData>(RHYMES_DATA[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLineIdx, setCurrentLineIdx] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Play procedural melody + speak lyrics line by line
  useEffect(() => {
    if (isPlaying) {
      sound.speak(selectedRhyme.lyrics[currentLineIdx]);
      // Play a corresponding musical tone from rhyme notes
      if (selectedRhyme.notes && selectedRhyme.notes.length > 0) {
        const note = selectedRhyme.notes[currentLineIdx % selectedRhyme.notes.length];
        sound.playTone(note, 0.4);
      }

      timerRef.current = setTimeout(() => {
        if (currentLineIdx < selectedRhyme.lyrics.length - 1) {
          setCurrentLineIdx(prev => prev + 1);
        } else {
          setIsPlaying(false);
          setCurrentLineIdx(0);
          sound.playSuccess();
          confetti({ particleCount: 35 });
          onEarnStar(1);
        }
      }, 3200);
    } else {
      if (timerRef.current) clearTimeout(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentLineIdx, selectedRhyme, onEarnStar]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      sound.stopSpeaking();
    } else {
      setIsPlaying(true);
    }
  };

  const handleRestart = () => {
    setIsPlaying(false);
    setCurrentLineIdx(0);
    sound.stopSpeaking();
    setTimeout(() => {
      setIsPlaying(true);
    }, 200);
  };

  const handleSelectRhyme = (rhyme: RhymeData) => {
    setIsPlaying(false);
    sound.stopSpeaking();
    setSelectedRhyme(rhyme);
    setCurrentLineIdx(0);
  };

  return (
    <div className="min-h-screen bg-purple-50/60 pb-16 pt-4 px-4">
      {/* Top Header */}
      <div className="max-w-4xl mx-auto flex items-center justify-between mb-4">
        <button
          onClick={() => {
            sound.stopSpeaking();
            sound.playTap();
            onBack();
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white text-slate-800 font-bold shadow-md hover:bg-slate-50 btn-bouncy"
        >
          <ArrowLeft className="w-5 h-5" /> Back Home
        </button>

        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-purple-950 flex items-center justify-center gap-2">
            🎵 Nursery Rhymes & Chants
          </h2>
          <span className="text-xs sm:text-sm font-semibold text-purple-800">
            Sing along, dance & learn!
          </span>
        </div>

        <div className="w-24" />
      </div>

      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Main Player Stage */}
        <div className="w-full md:w-2/3 bg-white rounded-3xl p-6 shadow-xl border-4 border-purple-300 flex flex-col items-center text-center">
          {/* Animated Stage */}
          <div className="relative w-full h-60 rounded-3xl bg-gradient-to-b from-purple-500 via-indigo-500 to-sky-400 p-6 flex flex-col items-center justify-center overflow-hidden shadow-inner">
            {/* Floating Music Notes */}
            <div className={`absolute top-4 left-6 text-3xl text-yellow-300 ${isPlaying ? 'animate-bounce' : 'opacity-60'}`}>
              🎵
            </div>
            <div className={`absolute top-8 right-8 text-4xl text-pink-300 ${isPlaying ? 'animate-bounce' : 'opacity-60'}`}>
              🎶
            </div>

            {/* Bouncing Mascots on Stage */}
            <div className="flex items-end justify-center gap-4 mt-2">
              <Mascot id="mimi" size="md" mood={isPlaying ? 'excited' : 'happy'} />
              <Mascot id="sunny" size="lg" mood={isPlaying ? 'waving' : 'happy'} />
              <Mascot id="coco" size="md" mood={isPlaying ? 'excited' : 'happy'} />
            </div>
          </div>

          {/* Current Rhyme Title */}
          <h3 className="text-2xl font-black text-purple-950 mt-4 mb-1">
            {selectedRhyme.title}
          </h3>
          <span className="text-xs font-bold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
            {selectedRhyme.theme}
          </span>

          {/* Karaoke Synced Lyrics Display */}
          <div className="w-full my-6 min-h-[90px] flex items-center justify-center p-4 bg-purple-50 rounded-2xl border border-purple-200">
            <p className="text-xl sm:text-2xl font-extrabold text-purple-900 transition-all duration-300">
              &quot;{selectedRhyme.lyrics[currentLineIdx]}&quot;
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleRestart}
              className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 btn-bouncy"
              title="Repeat"
            >
              <RotateCcw className="w-6 h-6" />
            </button>

            <button
              onClick={handleTogglePlay}
              className={`px-8 py-3.5 rounded-3xl font-black text-xl flex items-center gap-2 shadow-lg btn-bouncy ${
                isPlaying
                  ? 'bg-amber-400 hover:bg-amber-500 text-amber-950'
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-6 h-6 fill-current" /> Pause
                </>
              ) : (
                <>
                  <Play className="w-6 h-6 fill-current" /> Sing & Play
                </>
              )}
            </button>
          </div>
        </div>

        {/* Playlist of Songs */}
        <div className="w-full md:w-1/3 flex flex-col gap-3">
          <span className="text-sm font-bold uppercase text-slate-500 tracking-wider">
            Wonder Rhymes Jukebox:
          </span>

          {RHYMES_DATA.map((rhyme) => {
            const isSelected = selectedRhyme.id === rhyme.id;
            return (
              <button
                key={rhyme.id}
                onClick={() => handleSelectRhyme(rhyme)}
                className={`p-4 rounded-2xl text-left border-2 transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-purple-600 text-white border-purple-700 shadow-md scale-102'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-purple-300 shadow-sm'
                }`}
              >
                <div>
                  <div className="font-black text-base">{rhyme.title}</div>
                  <div className={`text-xs mt-0.5 ${isSelected ? 'text-purple-200' : 'text-slate-500'}`}>
                    {rhyme.theme}
                  </div>
                </div>
                <Music className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-purple-400'}`} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
