import { Harpoon } from '../types/game';

export const harpoons: Harpoon[] = [
  { id: 'wooden-harpoon', name: 'Wooden Harpoon', damage: 10, monsterBonus: 0.05, rarity: 'Common', price: 90 },
  { id: 'class-i-harpoon', name: 'Class I Harpoon', damage: 22, monsterBonus: 0.08, rarity: 'Common', price: 700 },
  { id: 'class-ii-harpoon', name: 'Class II Harpoon', damage: 42, monsterBonus: 0.12, rarity: 'Uncommon', price: 3300 },
  { id: 'iron-harpoon', name: 'Iron Harpoon', damage: 70, monsterBonus: 0.16, rarity: 'Rare', price: 11000 },
  { id: 'hunter-harpoon', name: 'Hunter Harpoon', damage: 116, monsterBonus: 0.25, rarity: 'Rare', price: 31000 },
  { id: 'storm-harpoon', name: 'Storm Harpoon', damage: 180, monsterBonus: 0.32, rarity: 'Epic', price: 88000 },
  { id: 'leviathan-harpoon', name: 'Leviathan Harpoon', damage: 285, monsterBonus: 0.45, rarity: 'Legendary', price: 240000 },
  { id: 'frost-harpoon', name: 'Frost Harpoon', damage: 155, monsterBonus: 0.34, rarity: 'Event', price: 0 },
];
