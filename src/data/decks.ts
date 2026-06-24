import { Deck } from '../types/game';

export const decks: Deck[] = [
  { id: 'beech-deck', name: 'Beech Deck', hp: 45, cannonDamage: 0.02, harpoonDamage: 0.02, goldBonus: 0.02, repairEfficiency: 0.02, rarity: 'Common', price: 0, evolvesTo: 'oak-deck' },
  { id: 'oak-deck', name: 'Oak Deck', hp: 120, cannonDamage: 0.04, harpoonDamage: 0.04, goldBonus: 0.04, repairEfficiency: 0.04, rarity: 'Common', price: 250000, materialCost: { wood: 500, cloth: 250, iron: 100 }, evolvesTo: 'ironwood-deck' },
  { id: 'ironwood-deck', name: 'Ironwood Deck', hp: 260, cannonDamage: 0.07, harpoonDamage: 0.06, goldBonus: 0.06, repairEfficiency: 0.07, rarity: 'Uncommon', price: 750000, materialCost: { wood: 1500, cloth: 700, iron: 350 }, evolvesTo: 'reinforced-war-deck' },
  { id: 'reinforced-war-deck', name: 'Reinforced Deck', hp: 520, cannonDamage: 0.1, harpoonDamage: 0.08, goldBonus: 0.07, repairEfficiency: 0.1, rarity: 'Rare', price: 2000000, materialCost: { wood: 5000, cloth: 2500, iron: 1000, gunpowder: 250 }, evolvesTo: 'royal-deck' },
  { id: 'royal-deck', name: 'Royal Deck', hp: 860, cannonDamage: 0.14, harpoonDamage: 0.12, goldBonus: 0.1, repairEfficiency: 0.13, rarity: 'Epic', price: 9000000, materialCost: { wood: 14000, cloth: 8000, iron: 4000, gunpowder: 1200 }, evolvesTo: 'storm-deck' },
  { id: 'storm-deck', name: 'Storm Deck', hp: 1300, cannonDamage: 0.19, harpoonDamage: 0.18, goldBonus: 0.13, repairEfficiency: 0.16, rarity: 'Epic', price: 45000000, materialCost: { wood: 40000, cloth: 22000, iron: 14000, gunpowder: 6000, relics: 6 }, evolvesTo: 'ancient-treasure-deck' },
  { id: 'ancient-treasure-deck', name: 'Ancient Treasure Deck', hp: 2100, cannonDamage: 0.26, harpoonDamage: 0.24, goldBonus: 0.22, repairEfficiency: 0.22, rarity: 'Legendary', price: 250000000, materialCost: { wood: 120000, cloth: 60000, iron: 42000, gunpowder: 22000, relics: 25, ghostEssence: 3 } },
  { id: 'frost-deck', name: 'Frost Deck', hp: 1050, cannonDamage: 0.16, harpoonDamage: 0.2, goldBonus: 0.12, repairEfficiency: 0.18, rarity: 'Event', price: 0 },
  { id: 'mythic-deck', name: 'Mythic Deck Silhouette', hp: 4000, cannonDamage: 0.4, harpoonDamage: 0.38, goldBonus: 0.3, repairEfficiency: 0.3, rarity: 'Mythic', price: 0, locked: true },
];
