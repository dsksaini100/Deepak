import { UserProgress } from '../types';

const STORAGE_KEY = 'wonderkids_world_progress_v1';

const defaultProgress: UserProgress = {
  stars: 12, // Starting welcome gift so kids can immediately explore rewards!
  lettersExplored: ['A', 'B', 'C'],
  numbersExplored: [1, 2, 3],
  colorsCompleted: ['red', 'blue'],
  shapesCompleted: ['circle', 'star'],
  animalsExplored: ['lion', 'cat'],
  gamesCompletedCount: 3,
  badgesUnlocked: ['first_explorer'],
  mascotAccessories: {
    bobo: 'none',
    mimi: 'ribbon',
    coco: 'none',
    tiko: 'cap',
    sunny: 'crown'
  },
  savedDrawings: [],
  settings: {
    soundEffects: true,
    voicePrompts: true,
    backgroundMusic: true,
    reducedMotion: false,
    screenTimeMinutes: 30
  }
};

export const loadProgress = (): UserProgress => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    return { ...defaultProgress, ...JSON.parse(raw) };
  } catch {
    return defaultProgress;
  }
};

export const saveProgress = (progress: UserProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Failed to save progress to local storage', err);
  }
};

export const resetProgress = (): UserProgress => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignored
  }
  return defaultProgress;
};
