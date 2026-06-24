import { Quest } from '../types/game';

export const quests: Quest[] = [
  { id: 'first-wake', title: 'First Wake', type: 'Main', description: 'Defeat raiders near the Calm Coast.', target: { kind: 'defeat', count: 8 }, rewards: { gold: 500, xp: 120, materials: { wood: 10 } } },
  { id: 'salt-stained-ledger', title: 'Salt-Stained Ledger', type: 'Main', description: 'Earn enough gold to fund your first refit.', target: { kind: 'gold', count: 1500 }, rewards: { gold: 750, diamonds: 2, materials: { iron: 6 } } },
  { id: 'bay-chart', title: 'Bay Chart', type: 'Zone', description: 'Reach level 3 and chart Smuggler Bay.', target: { kind: 'level', count: 3 }, rewards: { gold: 900, xp: 180 } },
  { id: 'coral-cleanup', title: 'Coral Cleanup', type: 'Zone', description: 'Clear hostile sails from the coral lanes.', target: { kind: 'defeat', id: 'smuggler-cutter', count: 10 }, rewards: { gold: 1800, materials: { cloth: 10, gunpowder: 4 } } },
  { id: 'daily-bounty', title: 'Daily Bounty Board', type: 'Daily', description: 'Sink any 20 enemies for the harbor master.', target: { kind: 'defeat', count: 20 }, rewards: { gold: 2200, diamonds: 1, materials: { wood: 12, iron: 8 } } },
  { id: 'secrets-sand', title: 'Secrets of the Sand Sea', type: 'Ship Unlock', description: 'Gather rumors from ships beyond Black Reef.', target: { kind: 'defeat', count: 30 }, rewards: { gold: 3500, xp: 800 } },
  { id: 'broken-compass', title: 'Broken Compass', type: 'Ship Unlock', description: 'Collect relic fragments for a strange compass.', target: { kind: 'gold', count: 18000 }, rewards: { materials: { relics: 4 }, diamonds: 2 } },
  { id: 'fire-waves', title: 'Fire Beneath the Waves', type: 'Ship Unlock', description: 'Survive the heat of the Deserted Oasis Sea.', target: { kind: 'level', count: 14 }, rewards: { gold: 6000, materials: { gunpowder: 12 } } },
  { id: 'corsair-trial', title: 'Corsair Trial', type: 'Ship Unlock', description: 'Defeat hardened crews to prove your command.', target: { kind: 'defeat', id: 'armoured-brig', count: 18 }, rewards: { gold: 9000, xp: 1600 } },
  { id: 'eye-storm', title: 'Eye of the Storm', type: 'Ship Unlock', description: 'Complete the final rite and unlock the Desert Corsair.', target: { kind: 'defeat', id: 'sea-serpent', count: 8 }, rewards: { diamonds: 5, unlockShipId: 'desert-corsair', materials: { relics: 5 } } },
  { id: 'frozen-frontier', title: 'Frozen Frontier', type: 'Zone', description: 'Reach the Frozen Current.', target: { kind: 'level', count: 22 }, rewards: { diamonds: 4, gold: 15000, materials: { iron: 20 } } },
];
