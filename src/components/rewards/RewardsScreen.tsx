import React from 'react';
import confetti from 'canvas-confetti';
import { BADGES_CATALOG } from '../../data/learningData';
import { Mascot, MASCOT_INFO } from '../mascots/Mascot';
import { MascotId } from '../../types';
import { sound } from '../../services/sound';
import { ArrowLeft, Sparkles, Trophy, Star } from 'lucide-react';

interface RewardsScreenProps {
  onBack: () => void;
  stars: number;
  mascotAccessories: Record<string, string>;
  onEquipAccessory: (mascotId: string, accessory: string) => void;
}

export const RewardsScreen: React.FC<RewardsScreenProps> = ({
  onBack,
  stars,
  mascotAccessories,
  onEquipAccessory,
}) => {
  // Star Garden Growth Level based on total stars
  const gardenLevel = Math.min(6, Math.floor(stars / 10));

  const gardenStages = [
    { name: 'Sprouting Seeds 🌱', desc: 'Little seeds waking up in the morning sun!' },
    { name: 'Sunny Flower Garden 🌸', desc: 'Pink daisies and yellow sunflowers in bloom!' },
    { name: 'Butterfly Haven 🦋', desc: 'Gentle butterflies drinking sweet nectar!' },
    { name: 'Apple Orchard 🍎', desc: 'Juicy red apples hanging from branches!' },
    { name: 'Rainbow Starlight Paradise 🌈', desc: 'A glittering rainbow arching over your garden!' },
    { name: 'Wonder Palace Garden 🏰', desc: 'A magical kingdom garden filled with starlight!' },
  ];

  const mascots: MascotId[] = ['bobo', 'mimi', 'coco', 'tiko', 'sunny'];

  return (
    <div className="min-h-screen bg-yellow-50/60 pb-16 pt-4 px-4">
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
            ⭐ My Wonder Rewards & Garden
          </h2>
          <span className="text-xs sm:text-sm font-semibold text-amber-800">
            Collect Stars, Grow Your Garden & Win Badges!
          </span>
        </div>

        <div className="w-24" />
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Star Bank Banner */}
        <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 rounded-3xl p-6 sm:p-8 shadow-xl text-center text-amber-950 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-white/30 backdrop-blur flex items-center justify-center text-5xl mb-2 animate-bounce">
            ⭐
          </div>
          <div className="text-5xl sm:text-7xl font-black drop-shadow">
            {stars} Stars!
          </div>
          <p className="text-lg sm:text-xl font-bold mt-1 text-amber-950/90">
            Great job, Little Explorer! You are doing amazing!
          </p>
          <button
            onClick={() => {
              confetti({ particleCount: 50, spread: 80 });
              sound.playFanfare();
            }}
            className="mt-4 px-6 py-2.5 bg-white hover:bg-amber-50 text-amber-900 font-black text-sm rounded-2xl shadow btn-bouncy flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-500" /> Celebrate Stars!
          </button>
        </div>

        {/* The Star Garden */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-emerald-300">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-black text-emerald-950">
                🌿 Magical Star Garden
              </h3>
              <p className="text-slate-600 text-sm">
                Each 10 stars helps your wonder garden grow bigger!
              </p>
            </div>
            <span className="text-sm font-black text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full">
              Level {gardenLevel + 1} / 6
            </span>
          </div>

          {/* Garden Visual Scene */}
          <div className="w-full h-48 sm:h-56 rounded-3xl bg-gradient-to-b from-sky-200 via-emerald-100 to-emerald-300 border-2 border-emerald-300 p-6 flex items-end justify-around relative overflow-hidden">
            <div className="absolute top-3 left-6 text-2xl">☁️</div>
            <div className="absolute top-4 right-10 text-3xl">☀️</div>

            {/* Garden Objects based on level */}
            <div className="text-4xl sm:text-5xl animate-bounce">🌱</div>
            {gardenLevel >= 1 && <div className="text-5xl sm:text-6xl animate-pulse">🌸</div>}
            {gardenLevel >= 2 && <div className="text-4xl sm:text-5xl animate-float">🦋</div>}
            {gardenLevel >= 3 && <div className="text-5xl sm:text-6xl animate-bounce">🍎</div>}
            {gardenLevel >= 4 && <div className="text-5xl sm:text-6xl">🌈</div>}
            {gardenLevel >= 5 && <div className="text-5xl sm:text-6xl animate-wiggle">🏰</div>}
          </div>

          <div className="mt-4 p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
            <span className="font-extrabold text-emerald-900 text-base">
              Current Stage: {gardenStages[Math.min(gardenLevel, gardenStages.length - 1)].name}
            </span>
            <p className="text-xs text-emerald-700 mt-0.5">
              {gardenStages[Math.min(gardenLevel, gardenStages.length - 1)].desc}
            </p>
          </div>
        </div>

        {/* Mascot Dress-Up Closet */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-pink-300">
          <h3 className="text-2xl font-black text-pink-950 mb-1">
            👗 Mascot Dress-Up Closet
          </h3>
          <p className="text-slate-600 text-sm mb-6">
            Equip fun accessories on your mascot buddies!
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {mascots.map((mId) => {
              const info = MASCOT_INFO[mId];
              const curAcc = mascotAccessories[mId] || 'none';
              return (
                <div key={mId} className="flex flex-col items-center bg-pink-50 p-3 rounded-2xl border border-pink-200">
                  <Mascot id={mId} size="md" accessory={curAcc} />
                  <span className="font-black text-sm text-slate-800 mt-2">{info.name}</span>
                  
                  {/* Accessory selector buttons */}
                  <div className="flex gap-1 mt-2">
                    {['none', 'crown', 'ribbon', 'cap'].map((acc) => (
                      <button
                        key={acc}
                        onClick={() => {
                          onEquipAccessory(mId, acc);
                          sound.playPop();
                        }}
                        className={`text-xs px-1.5 py-0.5 rounded-lg font-bold ${
                          curAcc === acc ? 'bg-pink-500 text-white' : 'bg-white text-slate-600 border'
                        }`}
                      >
                        {acc === 'none' ? '—' : acc === 'crown' ? '👑' : acc === 'ribbon' ? '🎀' : '🧢'}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Collectible Badges Gallery */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-amber-300">
          <h3 className="text-2xl font-black text-amber-950 mb-1">
            🏆 Collectible Explorer Badges
          </h3>
          <p className="text-slate-600 text-sm mb-6">
            Keep playing games and learning to unlock each badge!
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {BADGES_CATALOG.map((badge) => {
              const isUnlocked = stars >= badge.starsNeeded;
              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-2xl border-2 flex flex-col items-center text-center transition-all ${
                    isUnlocked
                      ? 'bg-amber-50 border-amber-300 shadow-sm'
                      : 'bg-slate-50 border-slate-200 opacity-50 grayscale'
                  }`}
                >
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <span className="font-black text-sm text-slate-800">{badge.title}</span>
                  <p className="text-[11px] text-slate-500 mt-1">{badge.desc}</p>
                  <span className="mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border text-amber-800">
                    {isUnlocked ? 'Unlocked ✓' : `${badge.starsNeeded} ⭐ needed`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
