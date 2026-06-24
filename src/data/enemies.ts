import { Enemy } from '../types/game';

export const enemies: Enemy[] = [
  { id: 'pirate-scout', name: 'Pirate Scout', hp: 90, damage: 8, rewardGold: 55, rewardXp: 18, drops: { wood: 2, cloth: 1 } },
  { id: 'raider-ship', name: 'Raider Ship', hp: 180, damage: 15, rewardGold: 115, rewardXp: 35, drops: { wood: 3, iron: 1 } },
  { id: 'smuggler-cutter', name: 'Smuggler Cutter', hp: 260, damage: 22, rewardGold: 170, rewardXp: 55, drops: { cloth: 3, gunpowder: 1 } },
  { id: 'armoured-brig', name: 'Armoured Brig', hp: 520, damage: 40, rewardGold: 360, rewardXp: 105, drops: { iron: 4, gunpowder: 2 } },
  { id: 'sea-serpent', name: 'Sea Serpent', hp: 760, damage: 54, rewardGold: 540, rewardXp: 150, drops: { wood: 3, relics: 1 }, monster: true },
  { id: 'ghost-ship', name: 'Ghost Ship', hp: 980, damage: 72, rewardGold: 760, rewardXp: 210, drops: { relics: 2, gunpowder: 2 } },
  { id: 'ice-corsair', name: 'Ice Corsair', hp: 1380, damage: 96, rewardGold: 1080, rewardXp: 310, drops: { iron: 5, cloth: 4 } },
  { id: 'leviathan-spawn', name: 'Leviathan Spawn', hp: 2100, damage: 140, rewardGold: 1780, rewardXp: 500, drops: { relics: 3, iron: 7 }, monster: true },
  { id: 'ancient-guardian', name: 'Ancient Guardian', hp: 3100, damage: 205, rewardGold: 2700, rewardXp: 780, drops: { relics: 5, gunpowder: 6 }, boss: true },
  { id: 'frost-raider', name: 'Frost Raider', hp: 850, damage: 65, rewardGold: 650, rewardXp: 185, drops: { iron: 2, cloth: 2 } },
  { id: 'frozen-dreadnought', name: 'Frozen Dreadnought', hp: 2600, damage: 150, rewardGold: 2200, rewardXp: 620, drops: { relics: 3, gunpowder: 5 }, boss: true },
];
