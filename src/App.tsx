import React, { useState, useEffect } from 'react';
import { UserProgress } from './types';
import { loadProgress, saveProgress, resetProgress } from './services/storage';
import { sound } from './services/sound';
import { HomeScreen } from './components/home/HomeScreen';
import { AbcAdventure } from './components/abc/AbcAdventure';
import { NumberKingdom } from './components/numbers/NumberKingdom';
import { ColorGarden } from './components/colors/ColorGarden';
import { ShapeCity } from './components/shapes/ShapeCity';
import { AnimalSafari } from './components/animals/AnimalSafari';
import { CreativePlay } from './components/creative/CreativePlay';
import { NurseryRhymes } from './components/rhymes/NurseryRhymes';
import { MiniGamesArcade } from './components/games/MiniGamesArcade';
import { RewardsScreen } from './components/rewards/RewardsScreen';
import { ParentZone } from './components/parent/ParentZone';
import { Mascot } from './components/mascots/Mascot';

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(loadProgress);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [showScreenTimeModal, setShowScreenTimeModal] = useState<boolean>(false);

  // Sync settings with audio service on initial mount
  useEffect(() => {
    sound.sfxEnabled = progress.settings.soundEffects;
    sound.voiceEnabled = progress.settings.voicePrompts;
    sound.musicEnabled = progress.settings.backgroundMusic;
  }, [progress.settings]);

  // Screen time reminder timer
  useEffect(() => {
    if (progress.settings.screenTimeMinutes > 0) {
      const timer = setTimeout(() => {
        setShowScreenTimeModal(true);
      }, progress.settings.screenTimeMinutes * 60 * 1000);
      return () => clearTimeout(timer);
    }
  }, [progress.settings.screenTimeMinutes]);

  // Save progress helper
  const updateProgress = (updater: (prev: UserProgress) => UserProgress) => {
    setProgress((prev) => {
      const updated = updater(prev);
      saveProgress(updated);
      return updated;
    });
  };

  const handleEarnStar = (amount: number = 1) => {
    updateProgress((prev) => ({
      ...prev,
      stars: prev.stars + amount,
    }));
  };

  const handleExploreLetter = (letter: string) => {
    updateProgress((prev) => ({
      ...prev,
      lettersExplored: prev.lettersExplored.includes(letter)
        ? prev.lettersExplored
        : [...prev.lettersExplored, letter],
    }));
  };

  const handleExploreNumber = (num: number) => {
    updateProgress((prev) => ({
      ...prev,
      numbersExplored: prev.numbersExplored.includes(num)
        ? prev.numbersExplored
        : [...prev.numbersExplored, num],
    }));
  };

  const handleExploreColor = (colorId: string) => {
    updateProgress((prev) => ({
      ...prev,
      colorsCompleted: prev.colorsCompleted.includes(colorId)
        ? prev.colorsCompleted
        : [...prev.colorsCompleted, colorId],
    }));
  };

  const handleExploreShape = (shapeId: string) => {
    updateProgress((prev) => ({
      ...prev,
      shapesCompleted: prev.shapesCompleted.includes(shapeId)
        ? prev.shapesCompleted
        : [...prev.shapesCompleted, shapeId],
    }));
  };

  const handleExploreAnimal = (animalId: string) => {
    updateProgress((prev) => ({
      ...prev,
      animalsExplored: prev.animalsExplored.includes(animalId)
        ? prev.animalsExplored
        : [...prev.animalsExplored, animalId],
    }));
  };

  const handleGameWin = () => {
    updateProgress((prev) => ({
      ...prev,
      gamesCompletedCount: prev.gamesCompletedCount + 1,
      stars: prev.stars + 2,
    }));
  };

  const handleSaveDrawing = (dataUrl: string) => {
    updateProgress((prev) => ({
      ...prev,
      savedDrawings: [dataUrl, ...prev.savedDrawings.slice(0, 19)], // Keep up to 20 drawings
    }));
  };

  const handleEquipAccessory = (mascotId: string, accessory: string) => {
    updateProgress((prev) => ({
      ...prev,
      mascotAccessories: {
        ...prev.mascotAccessories,
        [mascotId]: accessory,
      },
    }));
  };

  const handleToggleSound = () => {
    const next = !progress.settings.soundEffects;
    sound.sfxEnabled = next;
    sound.voiceEnabled = next;
    updateProgress((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        soundEffects: next,
        voicePrompts: next,
      },
    }));
    if (next) sound.playSuccess();
  };

  const handleUpdateSettings = (newSettings: UserProgress['settings']) => {
    updateProgress((prev) => ({
      ...prev,
      settings: newSettings,
    }));
  };

  const handleReset = () => {
    const refreshed = resetProgress();
    setProgress(refreshed);
  };

  return (
    <div className={`min-h-screen ${progress.settings.reducedMotion ? 'motion-reduce' : ''}`}>
      {/* Route Views */}
      {activeSection === 'home' && (
        <HomeScreen
          onSelectSection={setActiveSection}
          stars={progress.stars}
          soundEnabled={progress.settings.soundEffects}
          onToggleSound={handleToggleSound}
        />
      )}

      {activeSection === 'abc' && (
        <AbcAdventure
          onBack={() => setActiveSection('home')}
          onEarnStar={handleEarnStar}
          onExploreLetter={handleExploreLetter}
          exploredLetters={progress.lettersExplored}
        />
      )}

      {activeSection === 'numbers' && (
        <NumberKingdom
          onBack={() => setActiveSection('home')}
          onEarnStar={handleEarnStar}
          onExploreNumber={handleExploreNumber}
          exploredNumbers={progress.numbersExplored}
        />
      )}

      {activeSection === 'colors' && (
        <ColorGarden
          onBack={() => setActiveSection('home')}
          onEarnStar={handleEarnStar}
          onExploreColor={handleExploreColor}
          completedColors={progress.colorsCompleted}
        />
      )}

      {activeSection === 'shapes' && (
        <ShapeCity
          onBack={() => setActiveSection('home')}
          onEarnStar={handleEarnStar}
          onExploreShape={handleExploreShape}
          completedShapes={progress.shapesCompleted}
        />
      )}

      {activeSection === 'animals' && (
        <AnimalSafari
          onBack={() => setActiveSection('home')}
          onEarnStar={handleEarnStar}
          onExploreAnimal={handleExploreAnimal}
          exploredAnimals={progress.animalsExplored}
        />
      )}

      {activeSection === 'creative' && (
        <CreativePlay
          onBack={() => setActiveSection('home')}
          onEarnStar={handleEarnStar}
          onSaveDrawing={handleSaveDrawing}
          savedDrawings={progress.savedDrawings}
        />
      )}

      {activeSection === 'rhymes' && (
        <NurseryRhymes
          onBack={() => setActiveSection('home')}
          onEarnStar={handleEarnStar}
        />
      )}

      {activeSection === 'games' && (
        <MiniGamesArcade
          onBack={() => setActiveSection('home')}
          onEarnStar={handleEarnStar}
          onGameWin={handleGameWin}
        />
      )}

      {activeSection === 'rewards' && (
        <RewardsScreen
          onBack={() => setActiveSection('home')}
          stars={progress.stars}
          mascotAccessories={progress.mascotAccessories}
          onEquipAccessory={handleEquipAccessory}
        />
      )}

      {activeSection === 'parent' && (
        <ParentZone
          onBack={() => setActiveSection('home')}
          progress={progress}
          onUpdateSettings={handleUpdateSettings}
          onResetProgress={handleReset}
        />
      )}

      {/* Screen Time Break Modal */}
      {showScreenTimeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border-4 border-amber-300 animate-bounce">
            <Mascot id="bobo" size="lg" mood="happy" className="mx-auto mb-2" />
            <h3 className="text-2xl font-black text-slate-800 mb-1">
              Time for a Stretch Break! 🌿
            </h3>
            <p className="text-slate-600 text-sm mb-6">
              Bobo and friends are taking a quick rest. Great job learning today!
            </p>
            <button
              onClick={() => {
                setShowScreenTimeModal(false);
                sound.playTap();
              }}
              className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-amber-950 font-black rounded-2xl shadow btn-bouncy"
            >
              Continue Playing ✨
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
