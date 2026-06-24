export interface LootEntry {
  kind: 'cannon' | 'harpoon' | 'deck' | 'inventory';
  id: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
  chance: number;
}

export const lootTables: Record<string, LootEntry[]> = {
  early: [
    { kind: 'cannon', id: 'rusty-cannon', rarity: 'Common', chance: 0.03 },
    { kind: 'harpoon', id: 'iron-harpoon', rarity: 'Rare', chance: 0.004 },
  ],
  storm: [
    { kind: 'deck', id: 'storm-deck', rarity: 'Epic', chance: 0.0025 },
    { kind: 'cannon', id: 'storm-cannon', rarity: 'Epic', chance: 0.002 },
  ],
  ghost: [
    { kind: 'cannon', id: 'ghost-cannon', rarity: 'Legendary', chance: 0.0007 },
    { kind: 'inventory', id: 'ancient-figurehead', rarity: 'Legendary', chance: 0.0009 },
  ],
};
