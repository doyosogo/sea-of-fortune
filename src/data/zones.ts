import { Zone } from '../types/game';

export const zones: Zone[] = [
  { id: 'calm-coast', name: 'Calm Coast', requiredLevel: 1, enemyIds: ['pirate-scout', 'raider-ship'], bossId: 'raider-ship', goldMultiplier: 1, xpMultiplier: 1, materialDrops: ['wood', 'cloth'], unlockCondition: 'Starting waters' },
  { id: 'smuggler-bay', name: 'Smuggler Bay', requiredLevel: 3, enemyIds: ['pirate-scout', 'smuggler-cutter'], bossId: 'smuggler-cutter', goldMultiplier: 1.25, xpMultiplier: 1.18, materialDrops: ['cloth', 'gunpowder'], unlockCondition: 'Reach level 3' },
  { id: 'coral-passage', name: 'Coral Passage', requiredLevel: 5, enemyIds: ['raider-ship', 'smuggler-cutter'], bossId: 'sea-serpent', goldMultiplier: 1.45, xpMultiplier: 1.35, materialDrops: ['wood', 'iron'], unlockCondition: 'Reach level 5' },
  { id: 'black-reef', name: 'Black Reef', requiredLevel: 8, enemyIds: ['armoured-brig', 'sea-serpent'], bossId: 'armoured-brig', goldMultiplier: 1.75, xpMultiplier: 1.65, materialDrops: ['iron', 'gunpowder'], unlockCondition: 'Reach level 8' },
  { id: 'pirate-isles', name: 'Pirate Isles', requiredLevel: 11, enemyIds: ['smuggler-cutter', 'armoured-brig'], bossId: 'ghost-ship', goldMultiplier: 2.05, xpMultiplier: 1.9, materialDrops: ['iron', 'cloth', 'gunpowder'], unlockCondition: 'Reach level 11' },
  { id: 'deserted-oasis-sea', name: 'Deserted Oasis Sea', requiredLevel: 14, enemyIds: ['armoured-brig', 'sea-serpent'], bossId: 'ancient-guardian', goldMultiplier: 2.5, xpMultiplier: 2.25, materialDrops: ['wood', 'relics'], unlockCondition: 'Reach level 14' },
  { id: 'storm-cliffs', name: 'Storm Cliffs', requiredLevel: 18, enemyIds: ['ghost-ship', 'sea-serpent'], bossId: 'ancient-guardian', goldMultiplier: 3, xpMultiplier: 2.75, materialDrops: ['gunpowder', 'relics'], unlockCondition: 'Reach level 18' },
  { id: 'frozen-current', name: 'Frozen Current', requiredLevel: 22, enemyIds: ['ice-corsair', 'ghost-ship'], bossId: 'frozen-dreadnought', goldMultiplier: 3.65, xpMultiplier: 3.25, materialDrops: ['iron', 'cloth', 'relics'], unlockCondition: 'Reach level 22' },
  { id: 'leviathan-trench', name: 'Leviathan Trench', requiredLevel: 28, enemyIds: ['leviathan-spawn', 'sea-serpent'], bossId: 'ancient-guardian', goldMultiplier: 4.4, xpMultiplier: 4, materialDrops: ['relics', 'iron'], unlockCondition: 'Reach level 28' },
  { id: 'ghostwater-abyss', name: 'Ghostwater Abyss', requiredLevel: 35, enemyIds: ['ghost-ship', 'leviathan-spawn'], bossId: 'ancient-guardian', goldMultiplier: 5.4, xpMultiplier: 5, materialDrops: ['relics', 'gunpowder'], unlockCondition: 'Reach level 35' },
];
