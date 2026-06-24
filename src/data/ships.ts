import { Ship } from '../types/game';

export const ships: Ship[] = [
  { id: 'old-dinghy', name: 'Old Dinghy', price: 0, requiredLevel: 1, hp: 120, cannonSlots: 1, harpoonSlots: 1, deckSlots: 1, speed: 9, repairCostMultiplier: 1, description: 'A patched starter boat with more courage than timber.' },
  { id: 'coastal-sloop', name: 'Coastal Sloop', price: 850, requiredLevel: 2, hp: 220, cannonSlots: 2, harpoonSlots: 1, deckSlots: 1, speed: 12, repairCostMultiplier: 1.05, description: 'Fast enough to chase smugglers along warm shallows.' },
  { id: 'raider-brig', name: 'Raider Brig', price: 3200, requiredLevel: 5, hp: 420, cannonSlots: 3, harpoonSlots: 1, deckSlots: 1, speed: 13, repairCostMultiplier: 1.12, description: 'A lean brig built for bold raids and quick escapes.' },
  { id: 'war-brig', name: 'War Brig', price: 8500, requiredLevel: 8, hp: 720, cannonSlots: 4, harpoonSlots: 1, deckSlots: 2, speed: 12, repairCostMultiplier: 1.2, description: 'Heavy ribs and a hungry broadside.' },
  { id: 'scout-frigate', name: 'Scout Frigate', price: 18000, requiredLevel: 11, hp: 1120, cannonSlots: 4, harpoonSlots: 2, deckSlots: 2, speed: 16, repairCostMultiplier: 1.28, description: 'A crisp frigate for captains who value speed and range.' },
  { id: 'desert-corsair', name: 'Desert Corsair', price: 36000, requiredLevel: 14, hp: 1550, cannonSlots: 5, harpoonSlots: 2, deckSlots: 2, speed: 17, repairCostMultiplier: 1.35, description: 'Sailed from mirage seas with sun-gold sails.', questUnlock: 'eye-storm' },
  { id: 'royal-paladin', name: 'Royal Paladin', price: 74000, requiredLevel: 17, hp: 2200, cannonSlots: 6, harpoonSlots: 2, deckSlots: 3, speed: 15, repairCostMultiplier: 1.48, description: 'A decorated warship with disciplined gun crews.' },
  { id: 'storm-frigate', name: 'Storm Frigate', price: 135000, requiredLevel: 20, hp: 3050, cannonSlots: 6, harpoonSlots: 3, deckSlots: 3, speed: 18, repairCostMultiplier: 1.58, description: 'Built to cut through thunderheads and black rain.' },
  { id: 'dread-galleon', name: 'Dread Galleon', price: 260000, requiredLevel: 25, hp: 4400, cannonSlots: 8, harpoonSlots: 3, deckSlots: 3, speed: 13, repairCostMultiplier: 1.75, description: 'A floating fortress with a horizon-filling shadow.' },
  { id: 'leviathan-hunter', name: 'Leviathan Hunter', price: 520000, requiredLevel: 30, hp: 6100, cannonSlots: 8, harpoonSlots: 5, deckSlots: 4, speed: 16, repairCostMultiplier: 1.9, description: 'Reinforced for trench hunts and impossible prey.' },
  { id: 'ghost-man-o-war', name: 'Ghost Man-o-War', price: 980000, requiredLevel: 36, hp: 8200, cannonSlots: 10, harpoonSlots: 4, deckSlots: 4, speed: 17, repairCostMultiplier: 2.1, description: 'Cold lanterns burn along its silent gun decks.' },
  { id: 'treasure-sovereign', name: 'Treasure Sovereign', price: 1800000, requiredLevel: 45, hp: 12000, cannonSlots: 12, harpoonSlots: 6, deckSlots: 5, speed: 19, repairCostMultiplier: 2.35, description: 'A legendary flagship crowned in brass and sapphire.' },
];
