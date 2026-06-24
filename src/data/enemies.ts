import { Enemy } from '../types/game';

export const enemies: Enemy[] = [
  { id: 'pirate-scout', name: 'Pirate Scout', hp: 90, damage: 8, rewardGold: 85, rewardXp: 12, drops: { wood: 3, cloth: 1 } },
  { id: 'raider-ship', name: 'Raider Ship', hp: 180, damage: 15, rewardGold: 180, rewardXp: 24, drops: { wood: 4, iron: 1 } },
  { id: 'smuggler-cutter', name: 'Smuggler Cutter', hp: 260, damage: 22, rewardGold: 320, rewardXp: 38, drops: { cloth: 4, gunpowder: 1 } },
  { id: 'armoured-brig', name: 'Armoured Brig', hp: 520, damage: 40, rewardGold: 760, rewardXp: 72, drops: { iron: 5, gunpowder: 2 } },
  { id: 'sea-serpent', name: 'Sea Serpent', hp: 760, damage: 54, rewardGold: 1250, rewardXp: 105, drops: { wood: 8 }, monster: true },
  { id: 'ghost-ship', name: 'Ghost Ship', hp: 980, damage: 72, rewardGold: 2100, rewardXp: 145, drops: { gunpowder: 4 } },
  { id: 'ice-corsair', name: 'Ice Corsair', hp: 1380, damage: 96, rewardGold: 4200, rewardXp: 215, drops: { iron: 8, cloth: 7 } },
  { id: 'leviathan-spawn', name: 'Leviathan Spawn', hp: 2100, damage: 140, rewardGold: 8200, rewardXp: 340, drops: { iron: 12 }, monster: true },
  { id: 'ancient-guardian', name: 'Ancient Guardian', hp: 3100, damage: 205, rewardGold: 15000, rewardXp: 520, drops: { gunpowder: 12 }, boss: true },
  { id: 'frost-raider', name: 'Frost Raider', hp: 850, damage: 65, rewardGold: 1850, rewardXp: 130, drops: { iron: 5, cloth: 5 } },
  { id: 'frozen-dreadnought', name: 'Frozen Dreadnought', hp: 2600, damage: 150, rewardGold: 11500, rewardXp: 440, drops: { gunpowder: 10 }, boss: true },
];
