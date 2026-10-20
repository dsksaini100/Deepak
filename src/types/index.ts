export interface LetterData {
  letter: string;
  lowercase: string;
  word: string;
  phonics: string;
  fact: string;
  color: string;
  iconName: string;
  category: string;
}

export interface NumberData {
  num: number;
  word: string;
  item: string;
  itemEmoji: string;
  color: string;
}

export interface ColorData {
  id: string;
  name: string;
  hex: string;
  textColor: string;
  example: string;
  items: string[];
}

export interface ShapeData {
  id: string;
  name: string;
  sides: number;
  realWorldExample: string;
  color: string;
  description: string;
}

export interface AnimalData {
  id: string;
  name: string;
  category: 'farm' | 'wild' | 'pets' | 'birds' | 'ocean';
  sound: string;
  habitat: string;
  food: string;
  fact: string;
  emoji: string;
  color: string;
}

export interface RhymeData {
  id: string;
  title: string;
  theme: string;
  duration: string;
  lyrics: string[];
  notes: number[]; // Frequencies for procedural Web Audio music
}

export interface UserProgress {
  stars: number;
  lettersExplored: string[];
  numbersExplored: number[];
  colorsCompleted: string[];
  shapesCompleted: string[];
  animalsExplored: string[];
  gamesCompletedCount: number;
  badgesUnlocked: string[];
  mascotAccessories: Record<string, string>; // mascotId -> accessory
  savedDrawings: string[]; // data urls
  settings: {
    soundEffects: boolean;
    voicePrompts: boolean;
    backgroundMusic: boolean;
    reducedMotion: boolean;
    screenTimeMinutes: number;
  };
}

export type MascotId = 'bobo' | 'mimi' | 'coco' | 'tiko' | 'sunny';
