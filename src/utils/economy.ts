import { Cannon, Deck, Harpoon, Materials, OwnedEquipment } from '../types/game';
import { cannons } from '../data/cannons';
import { decks } from '../data/decks';
import { harpoons } from '../data/harpoons';

export const emptyMaterials = (): Materials => ({ wood: 0, iron: 0, cloth: 0, gunpowder: 0, relics: 0 });

export const fmt = (value: number) => Math.floor(value).toLocaleString();

export const addMaterials = (base: Materials, add: Partial<Materials>): Materials => ({
  wood: base.wood + (add.wood ?? 0),
  iron: base.iron + (add.iron ?? 0),
  cloth: base.cloth + (add.cloth ?? 0),
  gunpowder: base.gunpowder + (add.gunpowder ?? 0),
  relics: base.relics + (add.relics ?? 0),
});

export const canAffordMaterials = (owned: Materials, cost: Partial<Materials>) =>
  Object.entries(cost).every(([key, value]) => owned[key as keyof Materials] >= (value ?? 0));

export const spendMaterials = (owned: Materials, cost: Partial<Materials>): Materials => ({
  wood: owned.wood - (cost.wood ?? 0),
  iron: owned.iron - (cost.iron ?? 0),
  cloth: owned.cloth - (cost.cloth ?? 0),
  gunpowder: owned.gunpowder - (cost.gunpowder ?? 0),
  relics: owned.relics - (cost.relics ?? 0),
});

export const getBaseEquipment = (item: OwnedEquipment): Cannon | Harpoon | Deck => {
  if (item.type === 'cannon') return cannons.find((c) => c.id === item.baseId)!;
  if (item.type === 'harpoon') return harpoons.find((h) => h.id === item.baseId)!;
  return decks.find((d) => d.id === item.baseId)!;
};

export const upgradeCost = (item: OwnedEquipment) => {
  const level = item.upgrade + 1;
  const base = getBaseEquipment(item);
  return {
    gold: Math.round((base.price || 25000) * 0.32 * level ** 1.55 + 120 * level),
    materials: {
      wood: item.type === 'deck' ? level * 5 : level * 2,
      iron: level * (item.type === 'cannon' ? 4 : 2),
      cloth: item.type === 'harpoon' || item.type === 'deck' ? level * 3 : level,
      gunpowder: item.type === 'cannon' ? level * 3 : level,
      relics: level >= 6 ? level - 5 : 0,
    },
  };
};
