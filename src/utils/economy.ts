import { Cannon, Deck, Harpoon, Materials, OwnedEquipment } from '../types/game';
import { cannons } from '../data/cannons';
import { decks } from '../data/decks';
import { harpoons } from '../data/harpoons';

export const emptyMaterials = (): Materials => ({ wood: 0, iron: 0, cloth: 0, gunpowder: 0, relics: 0, ghostEssence: 0, leviathanHeart: 0, krakenEye: 0 });

export const fmt = (value: number) => Math.floor(value).toLocaleString();

export const addMaterials = (base: Materials, add: Partial<Materials>): Materials => ({
  wood: base.wood + (add.wood ?? 0),
  iron: base.iron + (add.iron ?? 0),
  cloth: base.cloth + (add.cloth ?? 0),
  gunpowder: base.gunpowder + (add.gunpowder ?? 0),
  relics: base.relics + (add.relics ?? 0),
  ghostEssence: base.ghostEssence + (add.ghostEssence ?? 0),
  leviathanHeart: base.leviathanHeart + (add.leviathanHeart ?? 0),
  krakenEye: base.krakenEye + (add.krakenEye ?? 0),
});

export const canAffordMaterials = (owned: Materials, cost: Partial<Materials>) =>
  Object.entries(cost).every(([key, value]) => owned[key as keyof Materials] >= (value ?? 0));

export const spendMaterials = (owned: Materials, cost: Partial<Materials>): Materials => ({
  wood: owned.wood - (cost.wood ?? 0),
  iron: owned.iron - (cost.iron ?? 0),
  cloth: owned.cloth - (cost.cloth ?? 0),
  gunpowder: owned.gunpowder - (cost.gunpowder ?? 0),
  relics: owned.relics - (cost.relics ?? 0),
  ghostEssence: owned.ghostEssence - (cost.ghostEssence ?? 0),
  leviathanHeart: owned.leviathanHeart - (cost.leviathanHeart ?? 0),
  krakenEye: owned.krakenEye - (cost.krakenEye ?? 0),
});

export const getBaseEquipment = (item: OwnedEquipment): Cannon | Harpoon | Deck => {
  if (item.type === 'cannon') return cannons.find((c) => c.id === item.baseId)!;
  if (item.type === 'harpoon') return harpoons.find((h) => h.id === item.baseId)!;
  return decks.find((d) => d.id === item.baseId)!;
};

export const upgradeCost = (item: OwnedEquipment) => {
  const level = item.upgrade + 1;
  const base = getBaseEquipment(item);
  const tierBase = Math.max(base.price || 5000, item.type === 'deck' ? 250000 : 25000);
  return {
    gold: Math.round(tierBase * (0.18 + level ** 2.15 * 0.16)),
    materials: {
      wood: Math.round(level ** 2 * (item.type === 'deck' ? 120 : 32)),
      iron: Math.round(level ** 2 * (item.type === 'cannon' ? 65 : 38)),
      cloth: Math.round(level ** 2 * (item.type === 'harpoon' || item.type === 'deck' ? 58 : 22)),
      gunpowder: Math.round(level ** 2 * (item.type === 'cannon' ? 42 : 18)),
      relics: base.rarity === 'Epic' || base.rarity === 'Legendary' ? level : 0,
      ghostEssence: base.rarity === 'Legendary' && level >= 4 ? 1 : 0,
    },
  };
};
