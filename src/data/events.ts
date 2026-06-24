export const frozenFestival = {
  id: 'frozen-festival',
  name: 'Festival of the Frozen Sea',
  currency: 'Frost Coins',
  zone: {
    id: 'festival-frozen-sea',
    name: 'Festival Frozen Sea',
    requiredLevel: 6,
    enemyIds: ['frost-raider', 'ice-corsair'],
    bossId: 'frozen-dreadnought',
    goldMultiplier: 1.9,
    xpMultiplier: 1.75,
    materialDrops: ['iron', 'cloth'],
    unlockCondition: 'Temporary event, level 6',
  },
  shop: [
    { id: 'frost-cannon', name: 'Frost Cannon', cost: 140 },
    { id: 'frost-harpoon', name: 'Frost Harpoon', cost: 120 },
    { id: 'frost-deck', name: 'Frost Deck', cost: 180 },
  ],
};
