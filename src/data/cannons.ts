import { Cannon } from '../types/game';

export const cannons: Cannon[] = [
  { id: 'rusty-cannon', name: 'Rusty Cannon', damage: 14, accuracy: 0.78, critChance: 0.03, rarity: 'Common', price: 120 },
  { id: '6-pounder', name: '6-Pounder', damage: 24, accuracy: 0.82, critChance: 0.04, rarity: 'Common', price: 650 },
  { id: '9-pounder', name: '9-Pounder', damage: 38, accuracy: 0.84, critChance: 0.05, rarity: 'Uncommon', price: 2200 },
  { id: '12-pounder', name: '12-Pounder', damage: 58, accuracy: 0.86, critChance: 0.07, rarity: 'Uncommon', price: 6200 },
  { id: 'iron-falcon', name: 'Iron Falcon', damage: 86, accuracy: 0.88, critChance: 0.09, rarity: 'Rare', price: 16000 },
  { id: 'storm-cannon', name: 'Storm Cannon', damage: 125, accuracy: 0.9, critChance: 0.11, rarity: 'Epic', price: 42000 },
  { id: 'royal-cannon', name: 'Royal Cannon', damage: 172, accuracy: 0.92, critChance: 0.13, rarity: 'Epic', price: 90000 },
  { id: 'dragonfire-cannon', name: 'Dragonfire Cannon', damage: 238, accuracy: 0.89, critChance: 0.18, rarity: 'Legendary', price: 210000 },
  { id: 'ghost-cannon', name: 'Ghost Cannon', damage: 320, accuracy: 0.94, critChance: 0.16, rarity: 'Legendary', price: 450000 },
  { id: 'frost-cannon', name: 'Frost Cannon', damage: 155, accuracy: 0.91, critChance: 0.14, rarity: 'Event', price: 0 },
];
