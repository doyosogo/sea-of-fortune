import { Deck } from '../types/game';

export const decks: Deck[] = [
  { id: 'beech-deck', name: 'Beech Deck', hp: 45, cannonDamage: 0.02, harpoonDamage: 0.02, goldBonus: 0.02, repairEfficiency: 0.02, rarity: 'Common', price: 150 },
  { id: 'oak-deck', name: 'Oak Deck', hp: 120, cannonDamage: 0.04, harpoonDamage: 0.04, goldBonus: 0.04, repairEfficiency: 0.04, rarity: 'Common', price: 1400 },
  { id: 'ironwood-deck', name: 'Ironwood Deck', hp: 260, cannonDamage: 0.07, harpoonDamage: 0.06, goldBonus: 0.06, repairEfficiency: 0.07, rarity: 'Uncommon', price: 6200 },
  { id: 'reinforced-war-deck', name: 'Reinforced War Deck', hp: 520, cannonDamage: 0.1, harpoonDamage: 0.08, goldBonus: 0.07, repairEfficiency: 0.1, rarity: 'Rare', price: 21000 },
  { id: 'royal-deck', name: 'Royal Deck', hp: 860, cannonDamage: 0.14, harpoonDamage: 0.12, goldBonus: 0.1, repairEfficiency: 0.13, rarity: 'Epic', price: 76000 },
  { id: 'storm-deck', name: 'Storm Deck', hp: 1300, cannonDamage: 0.19, harpoonDamage: 0.18, goldBonus: 0.13, repairEfficiency: 0.16, rarity: 'Epic', price: 165000 },
  { id: 'ancient-treasure-deck', name: 'Ancient Treasure Deck', hp: 2100, cannonDamage: 0.26, harpoonDamage: 0.24, goldBonus: 0.22, repairEfficiency: 0.22, rarity: 'Legendary', price: 390000 },
  { id: 'frost-deck', name: 'Frost Deck', hp: 1050, cannonDamage: 0.16, harpoonDamage: 0.2, goldBonus: 0.12, repairEfficiency: 0.18, rarity: 'Event', price: 0 },
];
