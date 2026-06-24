type SoundKey = 'buttonClick' | 'cannonFire' | 'questComplete' | 'achievementUnlock';

const placeholders: Record<SoundKey, string> = {
  buttonClick: 'button-click',
  cannonFire: 'cannon-fire',
  questComplete: 'quest-complete',
  achievementUnlock: 'achievement-unlock',
};

export const soundManager = {
  play(_key: SoundKey) {
    return placeholders;
  },
  placeholders,
};
