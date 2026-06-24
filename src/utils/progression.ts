import { achievements } from '../data/achievements';
import { cannons } from '../data/cannons';
import { decks } from '../data/decks';
import { harpoons } from '../data/harpoons';
import { ships } from '../data/ships';
import { zones } from '../data/zones';
import { GameState, Materials, OwnedEquipment } from '../types/game';
import { addMaterials, emptyMaterials } from './economy';

export const xpForLevel = (level: number) => Math.round(90 * level ** 1.72 + level * 35);

export const makeEquipment = (baseId: string, type: OwnedEquipment['type']): OwnedEquipment => ({
  instanceId: `${type}-${baseId}-${crypto.randomUUID()}`,
  baseId,
  type,
  upgrade: 0,
});

export const createInitialState = (): GameState => {
  const starterCannon = makeEquipment('rusty-cannon', 'cannon');
  const starterHarpoon = makeEquipment('wooden-harpoon', 'harpoon');
  const starterDeck = makeEquipment('beech-deck', 'deck');
  return {
    name: 'New Captain',
    level: 1,
    xp: 0,
    gold: 650,
    diamonds: 0,
    materials: { wood: 20, iron: 8, cloth: 10, gunpowder: 4, relics: 0, ghostEssence: 0, leviathanHeart: 0, krakenEye: 0 },
    currentShipId: 'old-dinghy',
    ownedShipIds: ['old-dinghy'],
    unlockedShipIds: ['old-dinghy', 'coastal-sloop'],
    unlockedZoneIds: ['calm-coast'],
    selectedZoneId: 'calm-coast',
    equipment: [starterCannon, starterHarpoon, starterDeck],
    equipped: { cannons: [starterCannon.instanceId], harpoons: [starterHarpoon.instanceId], decks: [starterDeck.instanceId] },
    questProgress: {},
    completedQuestIds: [],
    achievementIds: [],
    inventory: [],
    eventCurrency: { 'frozen-festival': 0 },
    discovered: {
      ships: ['old-dinghy'],
      enemies: [],
      materials: ['wood', 'iron', 'cloth', 'gunpowder'],
      cannons: ['rusty-cannon'],
      harpoons: ['wooden-harpoon'],
      decks: ['beech-deck'],
    },
    crewIds: [],
    activeExpeditions: [],
    completedExpeditionIds: [],
    stats: { enemiesDefeated: 0, bossesDefeated: 0, goldEarned: 0, questsCompleted: 0, highestCannonUpgrade: 0, rareDropsFound: 0, startedAt: Date.now() },
    lastSavedAt: Date.now(),
    lastOfflineZoneId: 'calm-coast',
    hp: 120,
  };
};

export const getCurrentShip = (state: GameState) => ships.find((ship) => ship.id === state.currentShipId)!;

export const getPower = (state: GameState) => {
  const ship = getCurrentShip(state);
  const equippedCannons = state.equipment.filter((item) => state.equipped.cannons.includes(item.instanceId));
  const equippedHarpoons = state.equipment.filter((item) => state.equipped.harpoons.includes(item.instanceId));
  const equippedDecks = state.equipment.filter((item) => state.equipped.decks.includes(item.instanceId));
  const deckHp = equippedDecks.reduce((sum, item) => sum + decks.find((d) => d.id === item.baseId)!.hp * (1 + item.upgrade * 0.08), 0);
  const cannonBonus = equippedDecks.reduce((sum, item) => sum + decks.find((d) => d.id === item.baseId)!.cannonDamage + item.upgrade * 0.01, 0);
  const harpoonBonus = equippedDecks.reduce((sum, item) => sum + decks.find((d) => d.id === item.baseId)!.harpoonDamage + item.upgrade * 0.01, 0);
  const goldBonus = equippedDecks.reduce((sum, item) => sum + decks.find((d) => d.id === item.baseId)!.goldBonus + item.upgrade * 0.008, 0);
  const repairEfficiency = equippedDecks.reduce((sum, item) => sum + decks.find((d) => d.id === item.baseId)!.repairEfficiency + item.upgrade * 0.008, 0);
  const cannonDamage = equippedCannons.reduce((sum, item) => sum + cannons.find((c) => c.id === item.baseId)!.damage * (1 + item.upgrade * 0.12), 0) * (1 + cannonBonus);
  const harpoonDamage = equippedHarpoons.reduce((sum, item) => sum + harpoons.find((h) => h.id === item.baseId)!.damage * (1 + item.upgrade * 0.12), 0) * (1 + harpoonBonus);
  return {
    maxHp: Math.round(ship.hp + deckHp),
    damage: Math.max(8, Math.round(cannonDamage + harpoonDamage + ship.speed * 1.2)),
    goldBonus,
    repairEfficiency,
    score: Math.round(ship.hp / 8 + cannonDamage * 3 + harpoonDamage * 2 + ship.speed * 12),
  };
};

export const gainXp = (state: GameState, xp: number): GameState => {
  let next = { ...state, xp: state.xp + xp };
  while (next.xp >= xpForLevel(next.level)) {
    next = { ...next, xp: next.xp - xpForLevel(next.level), level: next.level + 1, diamonds: next.diamonds + (next.level % 5 === 0 ? 1 : 0) };
  }
  const unlockedZoneIds = zones.filter((zone) => zone.requiredLevel <= next.level).map((zone) => zone.id);
  return { ...next, unlockedZoneIds: Array.from(new Set([...next.unlockedZoneIds, ...unlockedZoneIds])) };
};

export const applyRewards = (state: GameState, rewards: { gold?: number; xp?: number; diamonds?: number; materials?: Partial<Materials>; unlockShipId?: string }) => {
  let next = {
    ...state,
    gold: state.gold + (rewards.gold ?? 0),
    diamonds: state.diamonds + (rewards.diamonds ?? 0),
    materials: addMaterials(state.materials, rewards.materials ?? emptyMaterials()),
    unlockedShipIds: rewards.unlockShipId ? Array.from(new Set([...state.unlockedShipIds, rewards.unlockShipId])) : state.unlockedShipIds,
  };
  next.stats = { ...next.stats, goldEarned: next.stats.goldEarned + (rewards.gold ?? 0) };
  return rewards.xp ? gainXp(next, rewards.xp) : next;
};

export const migrateState = (raw: Partial<GameState>): GameState => {
  const initial = createInitialState();
  const materials = { ...initial.materials, ...(raw.materials ?? {}) };
  const stats = { ...initial.stats, ...(raw.stats ?? {}) };
  const discovered = { ...initial.discovered, ...(raw.discovered ?? {}) };
  return {
    ...initial,
    ...raw,
    materials,
    stats,
    discovered,
    crewIds: raw.crewIds ?? initial.crewIds,
    activeExpeditions: raw.activeExpeditions ?? initial.activeExpeditions,
    completedExpeditionIds: raw.completedExpeditionIds ?? initial.completedExpeditionIds,
  };
};

export const claimAvailableAchievements = (state: GameState) => {
  let next = state;
  const hasFrigate = state.ownedShipIds.some((id) => id.includes('frigate'));
  for (const achievement of achievements) {
    if (next.achievementIds.includes(achievement.id)) continue;
    const passed =
      (achievement.check === 'enemies100' && next.stats.enemiesDefeated >= 100) ||
      (achievement.check === 'gold100k' && next.stats.goldEarned >= 100000) ||
      (achievement.check === 'frigate' && hasFrigate) ||
      (achievement.check === 'cannon5' && next.stats.highestCannonUpgrade >= 5) ||
      (achievement.check === 'quests10' && next.stats.questsCompleted >= 10) ||
      (achievement.check === 'boss1' && next.stats.bossesDefeated >= 1) ||
      (achievement.check === 'frozen' && next.unlockedZoneIds.includes('frozen-current')) ||
      (achievement.check === 'level20' && next.level >= 20) ||
      (achievement.check === 'enemies1000' && next.stats.enemiesDefeated >= 1000) ||
      (achievement.check === 'gold10m' && next.stats.goldEarned >= 10000000) ||
      (achievement.check === 'ships6' && next.ownedShipIds.length >= 6) ||
      (achievement.check === 'crew3' && next.crewIds.length >= 3) ||
      (achievement.check === 'collections25' && Object.values(next.discovered).reduce((sum, values) => sum + values.length, 0) >= 25) ||
      (achievement.check === 'expeditions5' && next.completedExpeditionIds.length >= 5);
    if (passed) {
      next = applyRewards({ ...next, achievementIds: [...next.achievementIds, achievement.id] }, achievement.rewards);
    }
  }
  return next;
};
