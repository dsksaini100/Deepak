import React from 'react';
import { MascotId } from '../../types';

interface MascotProps {
  id: MascotId;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  mood?: 'happy' | 'waving' | 'excited' | 'proud';
  accessory?: string;
  className?: string;
  interactive?: boolean;
  onClick?: () => void;
}

export const MASCOT_INFO: Record<MascotId, { name: string; title: string; speech: string }> = {
  bobo: { name: 'Bobo', title: 'The Friendly Panda', speech: 'Hi! I am Bobo the Panda! Let’s explore together!' },
  mimi: { name: 'Mimi', title: 'The Bouncy Bunny', speech: 'Hello! I am Mimi! I love crunchy carrots and hopping!' },
  coco: { name: 'Coco', title: 'The Curious Cat', speech: 'Meow! I am Coco! Look at my red bowtie!' },
  tiko: { name: 'Tiko', title: 'The Clever Turtle', speech: 'Hello friend! I am Tiko! My glasses help me read books!' },
  sunny: { name: 'Sunny', title: 'The Brave Lion', speech: 'Roar! I am Sunny! Welcome to our magical world!' },
};

export const Mascot: React.FC<MascotProps> = ({
  id,
  size = 'md',
  mood = 'happy',
  className = '',
  interactive = false,
  onClick
}) => {
  const sizeMap = {
    xs: 'w-10 h-10',
    sm: 'w-16 h-16',
    md: 'w-20 h-24 sm:w-24 sm:h-28',
    lg: 'w-32 h-36 sm:w-40 sm:h-44',
    xl: 'w-44 h-48 sm:w-52 sm:h-56'
  };

  const renderCharacter = () => {
    switch (id) {
      case 'bobo': // Panda with backpack (matching screenshot)
        return (
          <svg viewBox="0 0 100 110" className="w-full h-full drop-shadow-sm select-none">
            {/* Blue Backpack Straps / Bag behind */}
            <rect x="22" y="58" width="12" height="24" rx="4" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
            <rect x="66" y="58" width="12" height="24" rx="4" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
            
            {/* Panda Ears */}
            <circle cx="24" cy="26" r="13" fill="#1E293B" />
            <circle cx="24" cy="26" r="7" fill="#475569" />
            <circle cx="76" cy="26" r="13" fill="#1E293B" />
            <circle cx="76" cy="26" r="7" fill="#475569" />

            {/* Body */}
            <ellipse cx="50" cy="74" rx="28" ry="24" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3" />
            {/* White Tummy */}
            <ellipse cx="50" cy="76" rx="20" ry="16" fill="#F8FAFC" />

            {/* Black Paws & Arms */}
            <ellipse cx="26" cy="68" rx="8" ry="12" fill="#1E293B" transform="rotate(20 26 68)" />
            <ellipse cx="74" cy="68" rx="8" ry="12" fill="#1E293B" transform="rotate(-20 74 68)" />
            {/* Feet */}
            <ellipse cx="34" cy="94" rx="10" ry="7" fill="#1E293B" />
            <ellipse cx="66" cy="94" rx="10" ry="7" fill="#1E293B" />

            {/* Head */}
            <ellipse cx="50" cy="46" rx="34" ry="29" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3" />

            {/* Eye Patches */}
            <ellipse cx="36" cy="44" rx="9" ry="11" fill="#1E293B" transform="rotate(-15 36 44)" />
            <ellipse cx="64" cy="44" rx="9" ry="11" fill="#1E293B" transform="rotate(15 64 44)" />
            {/* Big Sparkly Eyes */}
            <circle cx="36" cy="43" r="4.5" fill="#FFFFFF" />
            <circle cx="37" cy="42" r="2.5" fill="#0F172A" />
            <circle cx="38" cy="41" r="1.2" fill="#FFFFFF" />
            <circle cx="64" cy="43" r="4.5" fill="#FFFFFF" />
            <circle cx="63" cy="42" r="2.5" fill="#0F172A" />
            <circle cx="64" cy="41" r="1.2" fill="#FFFFFF" />

            {/* Cheeks */}
            <ellipse cx="24" cy="54" rx="5" ry="3.5" fill="#FDA4AF" opacity="0.8" />
            <ellipse cx="76" cy="54" rx="5" ry="3.5" fill="#FDA4AF" opacity="0.8" />

            {/* Nose & Smile */}
            <ellipse cx="50" cy="51" rx="4" ry="3" fill="#1E293B" />
            <path d="M 45 56 Q 50 61 55 56" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );

      case 'mimi': // Bunny holding carrot (matching screenshot)
        return (
          <svg viewBox="0 0 100 110" className="w-full h-full drop-shadow-sm select-none">
            {/* Long Fluffy Ears */}
            <ellipse cx="34" cy="22" rx="9" ry="22" fill="#FFFFFF" stroke="#F472B6" strokeWidth="2.5" />
            <ellipse cx="34" cy="22" rx="5" ry="16" fill="#FBCFE8" />
            <ellipse cx="66" cy="22" rx="9" ry="22" fill="#FFFFFF" stroke="#F472B6" strokeWidth="2.5" />
            <ellipse cx="66" cy="22" rx="5" ry="16" fill="#FBCFE8" />

            {/* Yellow Scarf Collar */}
            <path d="M 32 64 Q 50 72 68 64 Q 50 78 32 64 Z" fill="#FDE047" stroke="#EAB308" strokeWidth="2" />

            {/* Body */}
            <ellipse cx="50" cy="78" rx="26" ry="22" fill="#FFFFFF" stroke="#F472B6" strokeWidth="2.5" />
            {/* Feet */}
            <ellipse cx="36" cy="98" rx="8" ry="6" fill="#FFFFFF" stroke="#F472B6" strokeWidth="2" />
            <ellipse cx="64" cy="98" rx="8" ry="6" fill="#FFFFFF" stroke="#F472B6" strokeWidth="2" />

            {/* Head */}
            <ellipse cx="50" cy="52" rx="32" ry="27" fill="#FFFFFF" stroke="#F472B6" strokeWidth="2.5" />

            {/* Cheeks */}
            <ellipse cx="26" cy="58" rx="6" ry="4" fill="#FDA4AF" opacity="0.8" />
            <ellipse cx="74" cy="58" rx="6" ry="4" fill="#FDA4AF" opacity="0.8" />

            {/* Big Sparkly Eyes */}
            <circle cx="37" cy="49" r="4.5" fill="#1E293B" />
            <circle cx="39" cy="47" r="2" fill="#FFFFFF" />
            <circle cx="36" cy="50" r="1" fill="#FFFFFF" />
            <circle cx="63" cy="49" r="4.5" fill="#1E293B" />
            <circle cx="65" cy="47" r="2" fill="#FFFFFF" />
            <circle cx="62" cy="50" r="1" fill="#FFFFFF" />

            {/* Tiny Pink Nose & Mouth */}
            <polygon points="48,55 52,55 50,58" fill="#F43F5E" />
            <path d="M 46 59 Q 50 63 54 59" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />

            {/* Orange Carrot Held by Paws */}
            <g transform="translate(48, 70) rotate(25)">
              <polygon points="0,0 16,-6 8,18" fill="#F97316" stroke="#C2410C" strokeWidth="1.5" />
              {/* Green Leaves */}
              <path d="M 0 0 C -4 -6 -1 -10 2 -8 C 5 -10 8 -6 4 0" fill="#22C55E" />
            </g>

            {/* Little Paws hugging */}
            <ellipse cx="42" cy="74" rx="5" ry="4" fill="#FFFFFF" stroke="#F472B6" strokeWidth="1.5" />
            <ellipse cx="60" cy="74" rx="5" ry="4" fill="#FFFFFF" stroke="#F472B6" strokeWidth="1.5" />
          </svg>
        );

      case 'coco': // Ginger Cat with Red Bowtie (matching screenshot)
        return (
          <svg viewBox="0 0 100 110" className="w-full h-full drop-shadow-sm select-none">
            {/* Pointy Cat Ears */}
            <polygon points="20,40 30,12 48,34" fill="#F59E0B" stroke="#D97706" strokeWidth="2.5" />
            <polygon points="26,36 32,20 44,32" fill="#FDE68A" />
            <polygon points="80,40 70,12 52,34" fill="#F59E0B" stroke="#D97706" strokeWidth="2.5" />
            <polygon points="74,36 68,20 56,32" fill="#FDE68A" />

            {/* Tail */}
            <path d="M 72 82 C 84 80 88 68 84 62" fill="none" stroke="#D97706" strokeWidth="6" strokeLinecap="round" />

            {/* Body */}
            <ellipse cx="50" cy="78" rx="26" ry="22" fill="#FBBF24" stroke="#D97706" strokeWidth="2.5" />
            <ellipse cx="50" cy="80" rx="16" ry="14" fill="#FEF3C7" />
            {/* Paws */}
            <ellipse cx="36" cy="98" rx="8" ry="6" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
            <ellipse cx="64" cy="98" rx="8" ry="6" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />

            {/* Red Bow Tie */}
            <g transform="translate(50, 66)">
              <circle cx="0" cy="0" r="3.5" fill="#DC2626" />
              <polygon points="-3,-1 -11,-6 -10,6 -3,1" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
              <polygon points="3,-1 11,-6 10,6 3,1" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
            </g>

            {/* Head */}
            <ellipse cx="50" cy="50" rx="33" ry="27" fill="#FBBF24" stroke="#D97706" strokeWidth="2.5" />
            {/* Tabby Stripes on forehead */}
            <path d="M 50 28 L 50 36 M 44 30 L 45 36 M 56 30 L 55 36" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />

            {/* Whiskers */}
            <line x1="22" y1="55" x2="10" y2="52" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="22" y1="60" x2="10" y2="62" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="78" y1="55" x2="90" y2="52" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="78" y1="60" x2="90" y2="62" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />

            {/* Big Sparkly Eyes */}
            <circle cx="38" cy="48" r="4.5" fill="#1E293B" />
            <circle cx="40" cy="46" r="2" fill="#FFFFFF" />
            <circle cx="62" cy="48" r="4.5" fill="#1E293B" />
            <circle cx="64" cy="46" r="2" fill="#FFFFFF" />

            {/* Nose & Smile */}
            <polygon points="48,54 52,54 50,57" fill="#EC4899" />
            <path d="M 45 58 Q 50 62 50 58 Q 50 62 55 58" fill="none" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );

      case 'tiko': // Green Turtle with Round Glasses (matching screenshot)
        return (
          <svg viewBox="0 0 100 110" className="w-full h-full drop-shadow-sm select-none">
            {/* Shell Body */}
            <ellipse cx="50" cy="74" rx="30" ry="24" fill="#34D399" stroke="#059669" strokeWidth="3" />
            {/* Shell hex lines */}
            <path d="M 42 64 L 58 64 L 64 74 L 58 84 L 42 84 L 36 74 Z" fill="#6EE7B7" stroke="#059669" strokeWidth="2" />
            <line x1="42" y1="64" x2="50" y2="74" stroke="#059669" strokeWidth="2" />
            <line x1="58" y1="64" x2="50" y2="74" stroke="#059669" strokeWidth="2" />

            {/* Flipper Feet */}
            <ellipse cx="22" cy="76" rx="8" ry="6" fill="#34D399" stroke="#059669" strokeWidth="2" />
            <ellipse cx="78" cy="76" rx="8" ry="6" fill="#34D399" stroke="#059669" strokeWidth="2" />
            <ellipse cx="34" cy="94" rx="7" ry="5" fill="#34D399" stroke="#059669" strokeWidth="2" />
            <ellipse cx="66" cy="94" rx="7" ry="5" fill="#34D399" stroke="#059669" strokeWidth="2" />

            {/* Head */}
            <ellipse cx="50" cy="46" rx="24" ry="22" fill="#34D399" stroke="#059669" strokeWidth="3" />

            {/* Cheeks */}
            <circle cx="35" cy="52" r="3" fill="#FCA5A5" />
            <circle cx="65" cy="52" r="3" fill="#FCA5A5" />

            {/* Eyes */}
            <circle cx="42" cy="44" r="3.5" fill="#1E293B" />
            <circle cx="43" cy="43" r="1.5" fill="#FFFFFF" />
            <circle cx="58" cy="44" r="3.5" fill="#1E293B" />
            <circle cx="59" cy="43" r="1.5" fill="#FFFFFF" />

            {/* Round Blue Glasses */}
            <circle cx="41" cy="44" r="7.5" fill="none" stroke="#0284C7" strokeWidth="2.5" />
            <circle cx="59" cy="44" r="7.5" fill="none" stroke="#0284C7" strokeWidth="2.5" />
            <line x1="48.5" y1="44" x2="51.5" y2="44" stroke="#0284C7" strokeWidth="2.5" />

            {/* Warm Friendly Smile */}
            <path d="M 45 54 Q 50 58 55 54" fill="none" stroke="#065F46" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );

      case 'sunny': // Lion Cub with Blue Crown (matching screenshot)
      default:
        return (
          <svg viewBox="0 0 100 110" className="w-full h-full drop-shadow-sm select-none">
            {/* Fluffy Rounded Mane */}
            <circle cx="50" cy="48" r="36" fill="#FBBF24" stroke="#EA580C" strokeWidth="2.5" />
            {/* Mane bumps */}
            {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((deg, i) => {
              const rad = (deg * Math.PI) / 180;
              const cx = 50 + 33 * Math.cos(rad);
              const cy = 48 + 33 * Math.sin(rad);
              return <circle key={i} cx={cx} cy={cy} r="9" fill="#F59E0B" />;
            })}

            {/* Body */}
            <ellipse cx="50" cy="78" rx="24" ry="20" fill="#FDE047" stroke="#EA580C" strokeWidth="2.5" />
            <ellipse cx="50" cy="80" rx="14" ry="12" fill="#FEF08A" />
            {/* Feet */}
            <ellipse cx="36" cy="98" rx="8" ry="6" fill="#FDE047" stroke="#EA580C" strokeWidth="2" />
            <ellipse cx="64" cy="98" rx="8" ry="6" fill="#FDE047" stroke="#EA580C" strokeWidth="2" />

            {/* Lion Head */}
            <ellipse cx="50" cy="50" rx="26" ry="23" fill="#FDE047" stroke="#EA580C" strokeWidth="2" />

            {/* Ears */}
            <circle cx="30" cy="28" r="7" fill="#FDE047" stroke="#EA580C" strokeWidth="2" />
            <circle cx="30" cy="28" r="3.5" fill="#F472B6" />
            <circle cx="70" cy="28" r="7" fill="#FDE047" stroke="#EA580C" strokeWidth="2" />
            <circle cx="70" cy="28" r="3.5" fill="#F472B6" />

            {/* Blue Crown with Pearls (matching screenshot!) */}
            <g transform="translate(50, 22)">
              <polygon points="-14,4 -9,-8 0,-3 9,-8 14,4" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
              <circle cx="-9" cy="-8" r="2" fill="#FDE047" />
              <circle cx="0" cy="-3" r="2" fill="#FDE047" />
              <circle cx="9" cy="-8" r="2" fill="#FDE047" />
            </g>

            {/* Cheeks */}
            <ellipse cx="34" cy="55" rx="5" ry="3" fill="#FDA4AF" opacity="0.8" />
            <ellipse cx="66" cy="55" rx="5" ry="3" fill="#FDA4AF" opacity="0.8" />

            {/* Big Sparkly Eyes */}
            <circle cx="41" cy="47" r="4" fill="#1E293B" />
            <circle cx="42" cy="46" r="1.8" fill="#FFFFFF" />
            <circle cx="59" cy="47" r="4" fill="#1E293B" />
            <circle cx="60" cy="46" r="1.8" fill="#FFFFFF" />

            {/* Brown Heart Nose & Cute Smile */}
            <polygon points="48,52 52,52 50,55" fill="#92400E" />
            <path d="M 45 57 Q 50 62 55 57" fill="none" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
    }
  };

  return (
    <div
      onClick={interactive ? onClick : undefined}
      className={`inline-block relative select-none ${sizeMap[size]} ${
        interactive ? 'cursor-pointer transform hover:scale-110 active:scale-95 transition-transform' : ''
      } ${mood === 'excited' ? 'animate-bounce' : mood === 'waving' ? 'animate-wiggle' : 'animate-float'} ${className}`}
    >
      {renderCharacter()}
    </div>
  );
};
