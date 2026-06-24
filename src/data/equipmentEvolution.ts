export const cannonEvolution: Record<string, string | undefined> = {
  'rusty-cannon': '6-pounder',
  '6-pounder': '9-pounder',
  '9-pounder': '12-pounder',
  '12-pounder': 'iron-falcon',
  'iron-falcon': 'storm-cannon',
  'storm-cannon': 'royal-cannon',
  'royal-cannon': 'dragonfire-cannon',
  'dragonfire-cannon': 'ghost-cannon',
};

export const harpoonEvolution: Record<string, string | undefined> = {
  'wooden-harpoon': 'class-i-harpoon',
  'class-i-harpoon': 'class-ii-harpoon',
  'class-ii-harpoon': 'iron-harpoon',
  'iron-harpoon': 'hunter-harpoon',
  'hunter-harpoon': 'storm-harpoon',
  'storm-harpoon': 'leviathan-harpoon',
};

export const deckEvolution: Record<string, string | undefined> = {
  'beech-deck': 'oak-deck',
  'oak-deck': 'ironwood-deck',
  'ironwood-deck': 'reinforced-war-deck',
  'reinforced-war-deck': 'royal-deck',
  'royal-deck': 'storm-deck',
  'storm-deck': 'ancient-treasure-deck',
};

export const nextEvolution = (type: 'cannon' | 'harpoon' | 'deck', baseId: string) => {
  if (type === 'cannon') return cannonEvolution[baseId];
  if (type === 'harpoon') return harpoonEvolution[baseId];
  return deckEvolution[baseId];
};
