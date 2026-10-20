import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mascot, MASCOT_INFO } from '../mascots/Mascot';
import { sound } from '../../services/sound';
import { MascotId } from '../../types';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

interface HomeScreenProps {
  onSelectSection: (section: string) => void;
  stars: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectSection,
  stars,
  soundEnabled,
  onToggleSound,
}) => {
  const [activeMascotSpeech, setActiveMascotSpeech] = useState<string | null>(null);

  const mascotsList: MascotId[] = ['bobo', 'mimi', 'coco', 'tiko', 'sunny'];

  const handleMascotClick = (mId: MascotId) => {
    const info = MASCOT_INFO[mId];
    sound.playPop();
    sound.playSuccess();
    setActiveMascotSpeech(info.speech);
    sound.speak(info.speech);
    confetti({ particleCount: 20, spread: 50 });
  };

  return (
    <div className="relative min-h-screen bg-[#DFF1FD] overflow-x-hidden pb-28 select-none">
      {/* Scenic Pastel Landscape Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Sun Glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-yellow-100/40 rounded-full blur-3xl" />
        
        {/* Rolling Hills at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#BEE9CD] via-[#C9EED7] to-transparent opacity-80" />
      </div>

      {/* Main Container - Mobile First Frame matching reference screenshot */}
      <div className="relative z-10 max-w-md mx-auto px-4 pt-3 flex flex-col items-center">
        
        {/* Sound & Star Header Quick Bar */}
        <div className="w-full flex items-center justify-between px-2 mb-1">
          <button
            onClick={() => {
              sound.playTap();
              onSelectSection('rewards');
            }}
            className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm border border-amber-200 active:scale-95 transition-transform"
          >
            <span className="text-lg">⭐</span>
            <span className="font-black text-[#1E295A] text-sm">{stars}</span>
          </button>

          <button
            onClick={onToggleSound}
            className="p-1.5 rounded-full bg-white/90 backdrop-blur-sm text-[#1E295A] shadow-sm hover:bg-white active:scale-95 transition-transform"
            aria-label="Toggle sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-sky-600" /> : <VolumeX className="w-4 h-4 text-rose-500" />}
          </button>
        </div>

        {/* Top White Cloud Banner Card */}
        <div className="w-full bg-white/95 rounded-[36px] pt-4 pb-3 px-4 shadow-sm border-2 border-white/80 text-center flex flex-col items-center">
          {/* Main Title: WonderKids World */}
          <h1 className="text-[34px] sm:text-[38px] font-black text-[#152B75] tracking-tight leading-none drop-shadow-sm font-['Fredoka',sans-serif]">
            WonderKids World
          </h1>

          {/* Subtitle: ✦ Play • Discover • Learn ✦ */}
          <div className="flex items-center justify-center gap-1.5 mt-1.5 text-xs sm:text-sm font-extrabold text-[#FF6384] tracking-wide">
            <span className="text-amber-400 text-xs">✦</span>
            <span>Play</span>
            <span className="text-[#FF6384]">•</span>
            <span>Discover</span>
            <span className="text-[#FF6384]">•</span>
            <span>Learn</span>
            <span className="text-amber-400 text-xs">✦</span>
          </div>

          {/* Mascots Pill on Soft Rainbow Background */}
          <div className="relative w-full mt-3 pt-2 pb-1.5 px-2 rounded-[28px] bg-gradient-to-r from-sky-100 via-rose-50 to-amber-100 border border-white/80 shadow-inner overflow-hidden">
            {/* Rainbow curve behind mascots */}
            <div className="absolute top-0 left-0 right-0 h-6 opacity-35 pointer-events-none">
              <svg viewBox="0 0 300 30" preserveAspectRatio="none" className="w-full h-full">
                <path d="M 0 25 Q 150 -5 300 25" fill="none" stroke="#F43F5E" strokeWidth="3" />
                <path d="M 0 28 Q 150 -2 300 28" fill="none" stroke="#F59E0B" strokeWidth="3" />
                <path d="M 0 31 Q 150 1 300 31" fill="none" stroke="#38BDF8" strokeWidth="3" />
              </svg>
            </div>

            {/* 5 Mascots in a row */}
            <div className="relative z-10 flex items-center justify-around w-full">
              {mascotsList.map((mId) => (
                <button
                  key={mId}
                  onClick={() => handleMascotClick(mId)}
                  className="flex flex-col items-center cursor-pointer group hover:scale-110 active:scale-95 transition-transform"
                >
                  <Mascot id={mId} size="xs" mood="happy" className="w-12 h-14 sm:w-14 sm:h-16" />
                </button>
              ))}
            </div>
          </div>

          {/* Mascot Speech Bubble if tapped */}
          {activeMascotSpeech && (
            <div className="mt-2.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs font-bold text-amber-900 animate-bounce">
              {activeMascotSpeech}
            </div>
          )}
        </div>

        {/* Start Learning! Section Title */}
        <div className="w-full flex items-center justify-start gap-1.5 px-2 mt-5 mb-3">
          <h2 className="text-[26px] font-black text-[#152B75] tracking-tight">
            Start Learning!
          </h2>
          <span className="text-amber-400 text-lg">✦</span>
        </div>

        {/* 6 Large Colorful Pillowy Cards (2 columns x 3 rows) */}
        <div className="w-full grid grid-cols-2 gap-3.5 sm:gap-4">
          
          {/* CARD 1: ABC ADVENTURE (Sky Blue) */}
          <button
            onClick={() => {
              sound.playPop();
              onSelectSection('abc');
            }}
            className="group relative flex flex-col items-center justify-between p-4 rounded-[28px] bg-gradient-to-b from-[#56C4FD] to-[#36A8F5] text-center shadow-md border-3 border-[#7BD4FD] active:scale-95 transition-all text-white min-h-[190px]"
          >
            {/* Top Shine Highlight */}
            <div className="absolute top-2 left-4 right-4 h-2 bg-white/30 rounded-full" />

            {/* ABC Toy Blocks Vector Graphic */}
            <div className="w-20 h-20 my-1 flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
                {/* Yellow A Block */}
                <rect x="34" y="8" width="32" height="32" rx="6" fill="#FACC15" stroke="#CA8A04" strokeWidth="2.5" />
                <text x="50" y="32" textAnchor="middle" fill="#FFFFFF" fontSize="22" fontWeight="900" fontFamily="Fredoka">A</text>
                <circle cx="58" cy="14" r="2" fill="#FEF08A" />

                {/* Pink B Block */}
                <rect x="16" y="44" width="32" height="32" rx="6" fill="#F43F5E" stroke="#BE123C" strokeWidth="2.5" />
                <text x="32" y="68" textAnchor="middle" fill="#FFFFFF" fontSize="22" fontWeight="900" fontFamily="Fredoka">B</text>

                {/* Green C Block */}
                <rect x="52" y="44" width="32" height="32" rx="6" fill="#10B981" stroke="#047857" strokeWidth="2.5" />
                <text x="68" y="68" textAnchor="middle" fill="#FFFFFF" fontSize="22" fontWeight="900" fontFamily="Fredoka">C</text>

                {/* Star Accent */}
                <polygon points="76,14 80,24 90,24 82,30 85,40 76,34 67,40 70,30 62,24 72,24" fill="#FDE047" />
              </svg>
            </div>

            {/* Title & Subtitle */}
            <div className="mt-1">
              <span className="block text-[19px] sm:text-[21px] font-black text-[#152B75] leading-tight">
                ABC<br />Adventure
              </span>
              <span className="block text-[11px] sm:text-xs font-extrabold text-[#152B75]/80 mt-0.5">
                Letters & Phonics
              </span>
            </div>
          </button>

          {/* CARD 2: NUMBER KINGDOM (Bright Yellow) */}
          <button
            onClick={() => {
              sound.playPop();
              onSelectSection('numbers');
            }}
            className="group relative flex flex-col items-center justify-between p-4 rounded-[28px] bg-gradient-to-b from-[#FFDC5E] to-[#F5C834] text-center shadow-md border-3 border-[#FFE68C] active:scale-95 transition-all min-h-[190px]"
          >
            {/* Top Shine */}
            <div className="absolute top-2 left-4 right-4 h-2 bg-white/40 rounded-full" />

            {/* 123 + Graphic */}
            <div className="w-20 h-20 my-1 flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
                <text x="45" y="66" textAnchor="middle" fill="#152B75" fontSize="42" fontWeight="900" fontFamily="Fredoka">123</text>
                {/* Plus sign */}
                <path d="M 78 48 L 78 62 M 71 55 L 85 55" stroke="#38BDF8" strokeWidth="5" strokeLinecap="round" />
                {/* Sparkle */}
                <path d="M 22 22 L 25 14 L 28 22 L 36 25 L 28 28 L 25 36 L 22 28 L 14 25 Z" fill="#F8FAFC" />
              </svg>
            </div>

            {/* Title & Subtitle */}
            <div className="mt-1">
              <span className="block text-[19px] sm:text-[21px] font-black text-[#152B75] leading-tight">
                Number<br />Kingdom
              </span>
              <span className="block text-[11px] sm:text-xs font-extrabold text-[#152B75]/80 mt-0.5">
                Counting & Math
              </span>
            </div>
          </button>

          {/* CARD 3: COLOR GARDEN (Coral Pink) */}
          <button
            onClick={() => {
              sound.playPop();
              onSelectSection('colors');
            }}
            className="group relative flex flex-col items-center justify-between p-4 rounded-[28px] bg-gradient-to-b from-[#FF7A95] to-[#F7597A] text-center shadow-md border-3 border-[#FF9DB2] active:scale-95 transition-all min-h-[190px]"
          >
            {/* Top Shine */}
            <div className="absolute top-2 left-4 right-4 h-2 bg-white/30 rounded-full" />

            {/* Artist Paint Palette & Brush Graphic */}
            <div className="w-20 h-20 my-1 flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
                {/* Wooden Palette */}
                <path d="M 20 46 C 18 25 40 14 62 20 C 80 25 88 44 82 64 C 76 80 56 86 40 82 C 30 79 34 68 28 66 C 22 64 21 54 20 46 Z" fill="#FDE68A" stroke="#D97706" strokeWidth="2.5" />
                <circle cx="34" cy="72" r="5" fill="#F7597A" />
                {/* Paint Blobs */}
                <circle cx="36" cy="28" r="4.5" fill="#EF4444" />
                <circle cx="52" cy="25" r="4.5" fill="#3B82F6" />
                <circle cx="68" cy="34" r="4.5" fill="#22C55E" />
                <circle cx="74" cy="50" r="4.5" fill="#FACC15" />
                {/* Wooden Paintbrush */}
                <g transform="translate(48, 26) rotate(35)">
                  <rect x="-3" y="0" width="6" height="46" rx="2" fill="#B45309" />
                  <rect x="-4" y="44" width="8" height="8" rx="1" fill="#E2E8F0" />
                  <polygon points="-4,52 4,52 0,62" fill="#F43F5E" />
                </g>
                {/* Small Pink Flower */}
                <circle cx="86" cy="74" r="3" fill="#F472B6" />
              </svg>
            </div>

            {/* Title & Subtitle */}
            <div className="mt-1">
              <span className="block text-[19px] sm:text-[21px] font-black text-[#152B75] leading-tight">
                Color<br />Garden
              </span>
              <span className="block text-[11px] sm:text-xs font-extrabold text-[#152B75]/80 mt-0.5">
                Colors & Art
              </span>
            </div>
          </button>

          {/* CARD 4: SHAPE CITY (Mint Green) */}
          <button
            onClick={() => {
              sound.playPop();
              onSelectSection('shapes');
            }}
            className="group relative flex flex-col items-center justify-between p-4 rounded-[28px] bg-gradient-to-b from-[#60E6BD] to-[#3CD2A2] text-center shadow-md border-3 border-[#87F2CE] active:scale-95 transition-all min-h-[190px]"
          >
            {/* Top Shine */}
            <div className="absolute top-2 left-4 right-4 h-2 bg-white/30 rounded-full" />

            {/* Shapes Floating Over Buildings Graphic */}
            <div className="w-20 h-20 my-1 flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
                {/* Shapes on top: Red Circle, Blue Triangle, Pink Square */}
                <circle cx="28" cy="22" r="9" fill="#FF6B8B" stroke="#BE123C" strokeWidth="2" />
                <polygon points="50,12 60,30 40,30" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
                <rect x="70" y="14" width="16" height="16" rx="3" fill="#FDA4AF" stroke="#E11D48" strokeWidth="2" />

                {/* City Buildings Skyline below */}
                <rect x="15" y="44" width="16" height="38" rx="2" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
                <rect x="18" y="48" width="4" height="4" fill="#FEF08A" />
                <rect x="18" y="56" width="4" height="4" fill="#FEF08A" />

                <rect x="35" y="38" width="18" height="44" rx="2" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
                <rect x="39" y="44" width="4" height="4" fill="#FFFFFF" />
                <rect x="39" y="52" width="4" height="4" fill="#FFFFFF" />
                <rect x="45" y="44" width="4" height="4" fill="#FFFFFF" />

                <rect x="57" y="42" width="16" height="40" rx="2" fill="#60A5FA" stroke="#2563EB" strokeWidth="2" />
                <rect x="61" y="48" width="4" height="4" fill="#FEF08A" />

                <rect x="77" y="50" width="14" height="32" rx="2" fill="#F472B6" stroke="#BE185D" strokeWidth="2" />
              </svg>
            </div>

            {/* Title & Subtitle */}
            <div className="mt-1">
              <span className="block text-[19px] sm:text-[21px] font-black text-[#152B75] leading-tight">
                Shape<br />City
              </span>
              <span className="block text-[11px] sm:text-xs font-extrabold text-[#152B75]/80 mt-0.5">
                Shapes & Logic
              </span>
            </div>
          </button>

          {/* CARD 5: ANIMAL SAFARI (Soft Peach/Orange) */}
          <button
            onClick={() => {
              sound.playPop();
              onSelectSection('animals');
            }}
            className="group relative flex flex-col items-center justify-between p-4 rounded-[28px] bg-gradient-to-b from-[#FFAF68] to-[#F59445] text-center shadow-md border-3 border-[#FFC794] active:scale-95 transition-all min-h-[190px]"
          >
            {/* Top Shine */}
            <div className="absolute top-2 left-4 right-4 h-2 bg-white/30 rounded-full" />

            {/* Safari Binoculars, Paw & Animals Graphic */}
            <div className="w-20 h-20 my-1 flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
                {/* Binoculars */}
                <rect x="25" y="16" width="16" height="24" rx="4" fill="#0284C7" stroke="#0C4A6E" strokeWidth="2" />
                <circle cx="33" cy="32" r="5" fill="#38BDF8" />
                <rect x="45" y="16" width="16" height="24" rx="4" fill="#0284C7" stroke="#0C4A6E" strokeWidth="2" />
                <circle cx="53" cy="32" r="5" fill="#38BDF8" />
                <rect x="39" y="24" width="8" height="6" fill="#0F172A" />

                {/* Paw Print & Leaf */}
                <path d="M 74 18 C 76 12 84 14 82 22 C 80 26 72 26 74 18 Z" fill="#22C55E" />
                <circle cx="70" cy="30" r="2.5" fill="#78350F" />
                <circle cx="76" cy="28" r="2.5" fill="#78350F" />
                <ellipse cx="73" cy="36" rx="4" ry="3" fill="#78350F" />

                {/* Baby Giraffe */}
                <g transform="translate(20, 46)">
                  <rect x="12" y="12" width="6" height="24" rx="2" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
                  <ellipse cx="15" cy="8" rx="6" ry="5" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
                  <circle cx="12" cy="7" r="1" fill="#1E293B" />
                  <rect x="10" y="28" width="12" height="10" rx="3" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
                  <line x1="12" y1="38" x2="12" y2="44" stroke="#CA8A04" strokeWidth="2" />
                  <line x1="20" y1="38" x2="20" y2="44" stroke="#CA8A04" strokeWidth="2" />
                </g>

                {/* Baby Zebra */}
                <g transform="translate(48, 48)">
                  <rect x="10" y="10" width="16" height="14" rx="4" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
                  <ellipse cx="8" cy="8" rx="6" ry="6" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
                  <line x1="14" y1="12" x2="14" y2="22" stroke="#1E293B" strokeWidth="2" />
                  <line x1="18" y1="12" x2="18" y2="22" stroke="#1E293B" strokeWidth="2" />
                  <line x1="22" y1="12" x2="22" y2="22" stroke="#1E293B" strokeWidth="2" />
                  <line x1="12" y1="24" x2="12" y2="34" stroke="#1E293B" strokeWidth="2" />
                  <line x1="22" y1="24" x2="22" y2="34" stroke="#1E293B" strokeWidth="2" />
                </g>
              </svg>
            </div>

            {/* Title & Subtitle */}
            <div className="mt-1">
              <span className="block text-[19px] sm:text-[21px] font-black text-[#152B75] leading-tight">
                Animal<br />Safari
              </span>
              <span className="block text-[11px] sm:text-xs font-extrabold text-[#152B75]/80 mt-0.5">
                Animals & Nature
              </span>
            </div>
          </button>

          {/* CARD 6: CREATIVE PLAY (Lavender/Lilac) */}
          <button
            onClick={() => {
              sound.playPop();
              onSelectSection('creative');
            }}
            className="group relative flex flex-col items-center justify-between p-4 rounded-[28px] bg-gradient-to-b from-[#E688FF] to-[#D56BFC] text-center shadow-md border-3 border-[#EEAAFF] active:scale-95 transition-all min-h-[190px]"
          >
            {/* Top Shine */}
            <div className="absolute top-2 left-4 right-4 h-2 bg-white/30 rounded-full" />

            {/* Crayons, Star & Magic Sparkles Graphic */}
            <div className="w-20 h-20 my-1 flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
                {/* Big Crayon */}
                <g transform="translate(32, 22) rotate(25)">
                  <rect x="-6" y="0" width="12" height="42" rx="2" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
                  <polygon points="-6,0 6,0 0,-10" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
                  <line x1="-6" y1="10" x2="6" y2="10" stroke="#78350F" strokeWidth="1.5" />
                  <line x1="-6" y1="32" x2="6" y2="32" stroke="#78350F" strokeWidth="1.5" />
                </g>

                {/* Pink Crayon */}
                <g transform="translate(68, 48) rotate(-40)">
                  <rect x="-4" y="0" width="8" height="28" rx="2" fill="#F43F5E" stroke="#BE123C" strokeWidth="1.5" />
                  <polygon points="-4,0 4,0 0,-7" fill="#F43F5E" stroke="#BE123C" strokeWidth="1.5" />
                </g>

                {/* Golden Stars & Sparkles */}
                <polygon points="68,16 71,24 80,24 73,30 76,38 68,33 60,38 63,30 56,24 65,24" fill="#FDE047" stroke="#EAB308" strokeWidth="1" />
                <polygon points="84,52 86,57 91,57 87,60 88,65 84,62 80,65 81,60 77,57 82,57" fill="#FDE047" />
                <path d="M 22 72 L 24 66 L 26 72 L 32 74 L 26 76 L 24 82 L 22 76 L 16 74 Z" fill="#FFFFFF" />
              </svg>
            </div>

            {/* Title & Subtitle */}
            <div className="mt-1">
              <span className="block text-[19px] sm:text-[21px] font-black text-[#152B75] leading-tight">
                Creative<br />Play
              </span>
              <span className="block text-[11px] sm:text-xs font-extrabold text-[#152B75]/80 mt-0.5">
                Crafts & Imagination
              </span>
            </div>
          </button>

        </div>
      </div>

      {/* Clean White Bottom Navigation Bar matching screenshot */}
      <nav className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-md bg-white/95 backdrop-blur-md h-16 rounded-[28px] shadow-xl border-2 border-white flex items-center justify-around px-2">
        {/* Home Tab - Active Coral Rounded Square */}
        <button
          onClick={() => {
            sound.playTap();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="w-13 h-12 rounded-[20px] bg-[#FF6B7A] flex items-center justify-center text-white shadow-sm active:scale-95 transition-transform"
          aria-label="Home"
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
            <path d="M 12 3 L 3 11 L 5 11 L 5 20 C 5 20.6 5.4 21 6 21 L 10 21 L 10 15 L 14 15 L 14 21 L 18 21 C 18.6 21 19 20.6 19 20 L 19 11 L 21 11 Z" />
          </svg>
        </button>

        {/* Nursery Rhymes / Book Tab */}
        <button
          onClick={() => {
            sound.playTap();
            onSelectSection('rhymes');
          }}
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-[#5A92E5] hover:bg-sky-50 active:scale-95 transition-transform"
          aria-label="Nursery Rhymes"
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
            <path d="M 19 2 L 6 2 C 4.9 2 4 2.9 4 4 L 4 20 C 4 21.1 4.9 22 6 22 L 19 22 C 20.1 22 21 21.1 21 20 L 21 4 C 21 2.9 20.1 2 19 2 Z M 19 20 L 6 20 C 5.4 20 5 19.6 5 19 L 5 5 C 5 4.4 5.4 4 6 4 L 19 4 L 19 20 Z" />
            <line x1="8" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* My Stars / Rewards Tab */}
        <button
          onClick={() => {
            sound.playTap();
            onSelectSection('rewards');
          }}
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-[#F9C74F] hover:bg-amber-50 active:scale-95 transition-transform"
          aria-label="My Stars"
        >
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current drop-shadow-sm">
            <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
          </svg>
        </button>

        {/* Mini-Games / Puzzle Tab */}
        <button
          onClick={() => {
            sound.playTap();
            onSelectSection('games');
          }}
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-[#40C9A2] hover:bg-emerald-50 active:scale-95 transition-transform"
          aria-label="Games"
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
            <path d="M 19 10 C 19 8.9 18.1 8 17 8 L 15 8 L 15 6 C 15 4.3 13.7 3 12 3 C 10.3 3 9 4.3 9 6 L 9 8 L 7 8 C 5.9 8 5 8.9 5 10 L 5 12 L 6 12 C 7.7 12 9 13.3 9 15 C 9 16.7 7.7 18 6 18 L 5 18 L 5 20 C 5 21.1 5.9 22 7 22 L 9 22 L 9 21 C 9 19.3 10.3 18 12 18 C 13.7 18 15 19.3 15 21 L 15 22 L 17 22 C 18.1 22 19 21.1 19 20 L 19 18 L 20 18 C 21.7 18 23 16.7 23 15 C 23 13.3 21.7 12 20 12 L 19 12 Z" />
          </svg>
        </button>

        {/* Parent Zone Profile Tab */}
        <button
          onClick={() => {
            sound.playTap();
            onSelectSection('parent');
          }}
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-[#9CA3AF] hover:bg-slate-100 active:scale-95 transition-transform"
          aria-label="Parents Zone"
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
            <path d="M 12 2 C 9.2 2 7 4.2 7 7 C 7 9.8 9.2 12 12 12 C 14.8 12 17 9.8 17 7 C 17 4.2 14.8 2 12 2 Z M 12 14 C 7.6 14 4 16.2 4 19 L 4 21 C 4 21.6 4.4 22 5 22 L 19 22 C 19.6 22 20 21.6 20 21 L 20 19 C 20 16.2 16.4 14 12 14 Z" />
          </svg>
        </button>
      </nav>
    </div>
  );
};
