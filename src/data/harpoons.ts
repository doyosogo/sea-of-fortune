import { Harpoon } from '../types/game';

export const harpoons: Harpoon[] = [
  { id: 'wooden-harpoon', name: 'Wooden Harpoon', damage: 10, monsterBonus: 0.05, rarity: 'Common', price: 0, evolvesTo: 'class-i-harpoon' },
  { id: 'class-i-harpoon', name: 'Class I Harpoon', damage: 22, monsterBonus: 0.08, rarity: 'Common', price: 22000, evolvesTo: 'class-ii-harpoon' },
  { id: 'class-ii-harpoon', name: 'Class II Harpoon', damage: 42, monsterBonus: 0.12, rarity: 'Uncommon', price: 150000, evolvesTo: 'iron-harpoon' },
  { id: 'iron-harpoon', name: 'Iron Harpoon', damage: 70, monsterBonus: 0.16, rarity: 'Rare', price: 900000, evolvesTo: 'hunter-harpoon' },
  { id: 'hunter-harpoon', name: 'Hunter Harpoon', damage: 116, monsterBonus: 0.25, rarity: 'Rare', price: 5000000, evolvesTo: 'storm-harpoon' },
  { id: 'storm-harpoon', name: 'Storm Harpoon', damage: 180, monsterBonus: 0.32, rarity: 'Epic', price: 32000000, evolvesTo: 'leviathan-harpoon' },
  { id: 'leviathan-harpoon', name: 'Leviathan Harpoon', damage: 285, monsterBonus: 0.45, rarity: 'Legendary', price: 250000000 },
  { id: 'frost-harpoon', name: 'Frost Harpoon', damage: 155, monsterBonus: 0.34, rarity: 'Event', price: 0 },
  { id: 'mythic-harpoon', name: 'Mythic Harpoon Silhouette', damage: 470, monsterBonus: 0.65, rarity: 'Mythic', price: 0, locked: true },
];
