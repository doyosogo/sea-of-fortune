import { Achievement } from '../types/game';

export const achievements: Achievement[] = [
  { id: 'defeat-100', title: 'Hundred Sails Down', description: 'Defeat 100 enemies.', check: 'enemies100', rewards: { gold: 3500, diamonds: 2 } },
  { id: 'earn-100k', title: 'Chest Heavy With Coin', description: 'Earn 100,000 total gold.', check: 'gold100k', rewards: { diamonds: 5, materials: { relics: 3 } } },
  { id: 'first-frigate', title: 'First Frigate', description: 'Buy your first frigate.', check: 'frigate', rewards: { gold: 8500, materials: { cloth: 20 } } },
  { id: 'cannon-five', title: 'Tempered Thunder', description: 'Upgrade a cannon to +5.', check: 'cannon5', rewards: { diamonds: 3, materials: { gunpowder: 15 } } },
  { id: 'ten-quests', title: 'Harbor Favorite', description: 'Complete 10 quests.', check: 'quests10', rewards: { gold: 12000, diamonds: 4 } },
  { id: 'first-boss', title: 'Boss Breaker', description: 'Defeat your first boss.', check: 'boss1', rewards: { gold: 5000, materials: { relics: 2 } } },
  { id: 'frozen-current', title: 'Cold Horizon', description: 'Unlock Frozen Current.', check: 'frozen', rewards: { diamonds: 4, materials: { iron: 20 } } },
  { id: 'level-20', title: 'Veteran Captain', description: 'Reach level 20.', check: 'level20', rewards: { gold: 25000, diamonds: 5 } },
];
