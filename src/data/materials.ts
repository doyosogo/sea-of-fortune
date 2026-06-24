import { MaterialInfo } from '../types/game';

export const materialInfo: MaterialInfo[] = [
  { id: 'wood', name: 'Wood', description: 'Ship timber, crates, and repair planks.', icon: 'WD', dropSource: 'Coastal zones and expeditions', rarity: 'Common' },
  { id: 'iron', name: 'Iron', description: 'Hull braces, cannon bands, and fittings.', icon: 'IR', dropSource: 'Reefs, brigs, and shipyard expeditions', rarity: 'Uncommon' },
  { id: 'cloth', name: 'Cloth', description: 'Sails, ropes, and cabin upgrades.', icon: 'CL', dropSource: 'Smugglers and merchant salvage', rarity: 'Common' },
  { id: 'gunpowder', name: 'Gunpowder', description: 'Ammunition stores for cannon upgrades.', icon: 'GP', dropSource: 'Smuggler Bay, Black Reef, and storm waters', rarity: 'Rare' },
  { id: 'relics', name: 'Ancient Relic', description: 'Old-world fragments used for legendary craft.', icon: 'AR', dropSource: 'Zone 8+ enemies', rarity: 'Legendary', dropRate: '0.10%' },
  { id: 'ghostEssence', name: 'Ghost Essence', description: 'Pale residue from cursed wrecks.', icon: 'GE', dropSource: 'Ghostwater Abyss', rarity: 'Legendary', dropRate: '0.05%' },
  { id: 'leviathanHeart', name: 'Leviathan Heart', description: 'A living trophy from leviathan-class bosses.', icon: 'LH', dropSource: 'Leviathan bosses', rarity: 'Legendary', dropRate: '0.05%' },
  { id: 'krakenEye', name: 'Kraken Eye', description: 'A future world-boss trophy for mythic crafting.', icon: 'KE', dropSource: 'Future world bosses', rarity: 'Mythic', dropRate: '0.01%' },
];
