import React, { useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { ANIMALS_DATA } from '../../data/learningData';
import { AnimalData } from '../../types';
import { sound } from '../../services/sound';
import { Mascot } from '../mascots/Mascot';
import { ArrowLeft, Volume2, Sparkles, RotateCcw } from 'lucide-react';

interface AnimalSafariProps {
  onBack: () => void;
  onEarnStar: (amount?: number) => void;
  onExploreAnimal: (animalId: string) => void;
  exploredAnimals: string[];
}

export const AnimalSafari: React.FC<AnimalSafariProps> = ({
  onBack,
  onEarnStar,
  onExploreAnimal,
  exploredAnimals,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'farm' | 'wild' | 'pets' | 'birds' | 'ocean'>('all');
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalData>(ANIMALS_DATA[0]);
  const [activeTab, setActiveTab] = useState<'safari' | 'guess'>('safari');

  const filteredAnimals = activeCategory === 'all' 
    ? ANIMALS_DATA 
    : ANIMALS_DATA.filter(a => a.category === activeCategory);

  const handleSelectAnimal = (animal: AnimalData) => {
    setSelectedAnimal(animal);
    onExploreAnimal(animal.id);
    sound.playTap();
    sound.playAnimalSound(animal.id);
    sound.speak(`${animal.name}! ${animal.sound}. ${animal.fact}`);
  };

  /* ----------------------------------------------------
     MODE 2: GUESS THE ANIMAL GAME
  ---------------------------------------------------- */
  const [guessTarget, setGuessTarget] = useState<AnimalData>(ANIMALS_DATA[0]);
  const [guessOptions, setGuessOptions] = useState<AnimalData[]>(ANIMALS_DATA.slice(0, 3));

  const setupGuessGame = useCallback(() => {
    const target = ANIMALS_DATA[Math.floor(Math.random() * ANIMALS_DATA.length)];
    setGuessTarget(target);
    sound.speak(`Who says ${target.sound}?`);
    const others = ANIMALS_DATA.filter(a => a.id !== target.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);
    setGuessOptions([target, ...others].sort(() => 0.5 - Math.random()));
  }, []);

  const handlePickGuess = (choice: AnimalData) => {
    if (choice.id === guessTarget.id) {
      sound.playSuccess();
      sound.playAnimalSound(choice.id);
      confetti({ particleCount: 30 });
      sound.speak(`That's right! It's the ${choice.name}!`);
      onEarnStar(1);
      setTimeout(setupGuessGame, 1500);
    } else {
      sound.playGentleBoing();
      sound.speak(`That's the ${choice.name}. Who says ${guessTarget.sound}?`);
    }
  };

  const renderSafari = () => (
    <div className="flex flex-col lg:flex-row gap-6 max-w-5xl mx-auto w-full">
      {/* Left Details Card */}
      <div className="w-full lg:w-1/2 bg-white rounded-3xl p-6 shadow-xl border-4 border-emerald-300 text-center flex flex-col items-center">
        {/* Big Emoji Card */}
        <div 
          onClick={() => {
            sound.playAnimalSound(selectedAnimal.id);
            sound.speak(selectedAnimal.sound);
          }}
          className="w-36 h-36 rounded-3xl bg-emerald-50 border-4 border-emerald-200 flex items-center justify-center text-8xl shadow-inner cursor-pointer hover:scale-105 active:scale-95 transition-transform"
        >
          {selectedAnimal.emoji}
        </div>

        {/* Animal Name & Sound button */}
        <div className="flex items-center gap-3 my-3">
          <span className="text-4xl font-black text-slate-800">
            {selectedAnimal.name}
          </span>
          <button
            onClick={() => {
              sound.playAnimalSound(selectedAnimal.id);
              sound.speak(`${selectedAnimal.name} says ${selectedAnimal.sound}`);
            }}
            className="p-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-md"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* Sound Pill */}
        <div className="bg-emerald-100 text-emerald-900 font-black text-lg px-5 py-1.5 rounded-full mb-4">
          Sound: &quot;{selectedAnimal.sound}&quot;
        </div>

        {/* Educational Info */}
        <div className="w-full space-y-2 text-left bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="text-sm">
            <span className="font-bold text-slate-500">🏡 Home: </span>
            <span className="font-extrabold text-slate-800">{selectedAnimal.habitat}</span>
          </div>
          <div className="text-sm">
            <span className="font-bold text-slate-500">🥗 Favorite Food: </span>
            <span className="font-extrabold text-slate-800">{selectedAnimal.food}</span>
          </div>
          <div className="text-sm">
            <span className="font-bold text-slate-500">💡 Fun Fact: </span>
            <span className="text-slate-700 font-medium">{selectedAnimal.fact}</span>
          </div>
        </div>

        <button
          onClick={() => {
            confetti({ particleCount: 25 });
            sound.playSuccess();
            onEarnStar(1);
          }}
          className="mt-6 px-6 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-amber-950 font-black rounded-2xl shadow flex items-center gap-2 btn-bouncy"
        >
          <Sparkles className="w-5 h-5 text-amber-600" /> Friend Made! ⭐
        </button>
      </div>

      {/* Right Grid of Animals */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Category Filter Chips */}
        <div className="flex flex-wrap gap-2 mb-3">
          {[
            { id: 'all', label: '🐾 All' },
            { id: 'farm', label: '🐮 Farm' },
            { id: 'wild', label: '🦁 Safari' },
            { id: 'pets', label: '🐶 Pets' },
            { id: 'birds', label: '🦉 Birds' },
            { id: 'ocean', label: '🐬 Ocean' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sound.playTap();
                setActiveCategory(cat.id as typeof activeCategory);
              }}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                activeCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-emerald-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Scrollable Animals Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 max-h-[460px] overflow-y-auto p-1 bg-white/60 rounded-3xl border border-emerald-200">
          {filteredAnimals.map((animal) => {
            const isSelected = selectedAnimal.id === animal.id;
            const isExplored = exploredAnimals.includes(animal.id);
            return (
              <button
                key={animal.id}
                onClick={() => handleSelectAnimal(animal)}
                className={`p-3 rounded-2xl flex flex-col items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-emerald-500 text-white shadow-md scale-105'
                    : isExplored
                    ? 'bg-white text-slate-800 hover:bg-emerald-50 shadow-sm'
                    : 'bg-white/80 text-slate-600 hover:bg-white shadow-sm'
                }`}
              >
                <span className="text-3xl sm:text-4xl drop-shadow-sm">{animal.emoji}</span>
                <span className="text-xs font-black mt-1 truncate max-w-full">
                  {animal.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderGuess = () => (
    <div className="flex flex-col items-center max-w-lg mx-auto w-full">
      <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-amber-300 w-full text-center">
        <h3 className="text-2xl font-black text-amber-900 mb-1">
          Guess the Animal!
        </h3>
        <p className="text-slate-600 text-sm mb-4">
          Who makes this sound?
        </p>

        <div className="p-6 bg-amber-50 rounded-3xl border-2 border-amber-200 my-4 flex flex-col items-center">
          <button
            onClick={() => {
              sound.playAnimalSound(guessTarget.id);
              sound.speak(guessTarget.sound);
            }}
            className="w-20 h-20 rounded-full bg-amber-400 hover:bg-amber-500 text-amber-950 flex items-center justify-center shadow-lg active:scale-95 transition-transform"
          >
            <Volume2 className="w-10 h-10" />
          </button>
          <div className="text-3xl font-black text-amber-950 mt-4">
            &quot;{guessTarget.sound}&quot;
          </div>
          <span className="text-xs font-bold text-amber-700 mt-1">Tap speaker to replay</span>
        </div>

        {/* Options to guess */}
        <div className="grid grid-cols-3 gap-3 my-4">
          {guessOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handlePickGuess(opt)}
              className="p-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-amber-400 flex flex-col items-center justify-center btn-bouncy"
            >
              <span className="text-5xl">{opt.emoji}</span>
              <span className="text-sm font-black text-slate-800 mt-2 truncate max-w-full">
                {opt.name}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={setupGuessGame}
          className="text-xs font-bold text-slate-500 hover:underline flex items-center justify-center gap-1 mx-auto mt-2"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Next Animal Sound
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-emerald-50/60 pb-16 pt-4 px-4">
      {/* Top Header */}
      <div className="max-w-5xl mx-auto flex items-center justify-between mb-4">
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
          <h2 className="text-2xl sm:text-3xl font-black text-emerald-950 flex items-center justify-center gap-2">
            🦁 Animal Safari
          </h2>
          <span className="text-xs sm:text-sm font-semibold text-emerald-800">
            25+ Friendly Animals & Sounds!
          </span>
        </div>

        <div className="w-24" />
      </div>

      {/* Tabs */}
      <div className="max-w-5xl mx-auto mb-6 flex justify-center gap-2">
        <button
          onClick={() => {
            sound.playTap();
            setActiveTab('safari');
          }}
          className={`px-5 py-2.5 rounded-2xl font-bold text-sm transition-all ${
            activeTab === 'safari'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-emerald-50 shadow-sm'
          }`}
        >
          🗺️ Safari Explorer
        </button>
        <button
          onClick={() => {
            sound.playTap();
            setActiveTab('guess');
            setupGuessGame();
          }}
          className={`px-5 py-2.5 rounded-2xl font-bold text-sm transition-all ${
            activeTab === 'guess'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-emerald-50 shadow-sm'
          }`}
        >
          🔊 Guess the Sound
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto">
        {activeTab === 'safari' && renderSafari()}
        {activeTab === 'guess' && renderGuess()}
      </div>

      {/* Mascot Friend */}
      <div className="max-w-md mx-auto mt-8 flex items-center justify-center gap-3 bg-white/70 backdrop-blur px-4 py-2.5 rounded-2xl border border-emerald-200 shadow-sm">
        <Mascot id="bobo" size="sm" mood="happy" />
        <span className="text-xs sm:text-sm font-bold text-emerald-950">
          Bobo the Panda loves meeting new animal friends!
        </span>
      </div>
    </div>
  );
};
