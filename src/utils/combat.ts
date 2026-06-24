import { enemies } from '../data/enemies';
import { frozenFestival } from '../data/events';
import { zones } from '../data/zones';
import { Enemy, GameState, Zone } from '../types/game';
import { addMaterials } from './economy';
import { gainXp, getPower } from './progression';

export const allZones: Zone[] = [...zones, frozenFestival.zone as Zone];

export const getZone = (id: string) => allZones.find((zone) => zone.id === id) ?? zones[0];
export const getEnemy = (id: string) => enemies.find((enemy) => enemy.id === id)!;

export const spawnEnemy = (zoneId: string, boss = false): Enemy => {
  const zone = getZone(zoneId);
  if (boss) return { ...getEnemy(zone.bossId), boss: true };
  const id = zone.enemyIds[Math.floor(Math.random() * zone.enemyIds.length)];
  return { ...getEnemy(id) };
};

export const defeatEnemy = (state: GameState, enemy: Enemy, zoneId: string) => {
  const zone = getZone(zoneId);
  const power = getPower(state);
  const gold = Math.round(enemy.rewardGold * zone.goldMultiplier * (1 + power.goldBonus));
  const xp = Math.round(enemy.rewardXp * zone.xpMultiplier);
  let materials = { ...enemy.drops };
  for (const material of zone.materialDrops) {
    materials[material] = (materials[material] ?? 0) + Math.max(1, Math.floor(zone.requiredLevel / 3));
  }
  let next = {
    ...state,
    gold: state.gold + gold,
    materials: addMaterials(state.materials, materials),
    eventCurrency: zoneId === frozenFestival.zone.id ? { ...state.eventCurrency, [frozenFestival.id]: (state.eventCurrency[frozenFestival.id] ?? 0) + (enemy.boss ? 10 : 3) } : state.eventCurrency,
    stats: {
      ...state.stats,
      enemiesDefeated: state.stats.enemiesDefeated + 1,
      bossesDefeated: state.stats.bossesDefeated + (enemy.boss ? 1 : 0),
      goldEarned: state.stats.goldEarned + gold,
    },
  };
  next = gainXp(next, xp);
  return { state: next, rewards: { gold, xp, materials } };
};

export const repairCost = (state: GameState) => {
  const power = getPower(state);
  return Math.max(25, Math.round(power.maxHp * 0.42 * (1 - Math.min(0.45, power.repairEfficiency))));
};

export const offlineRewards = (state: GameState, now = Date.now()) => {
  const elapsedSeconds = Math.max(0, Math.floor((now - state.lastSavedAt) / 1000));
  const capped = Math.min(elapsedSeconds, 8 * 60 * 60);
  if (capped < 60) return null;
  const zone = getZone(state.lastOfflineZoneId || state.selectedZoneId);
  const power = getPower(state);
  const sample = zone.enemyIds.map(getEnemy);
  const avgHp = sample.reduce((sum, enemy) => sum + enemy.hp, 0) / sample.length;
  const kills = Math.max(1, Math.floor((capped / 12) * Math.min(2.5, power.damage / Math.max(80, avgHp))));
  const avgGold = sample.reduce((sum, enemy) => sum + enemy.rewardGold, 0) / sample.length;
  const avgXp = sample.reduce((sum, enemy) => sum + enemy.rewardXp, 0) / sample.length;
  const gold = Math.round(kills * avgGold * zone.goldMultiplier * (1 + power.goldBonus) * 0.65);
  const xp = Math.round(kills * avgXp * zone.xpMultiplier * 0.65);
  const materials = zone.materialDrops.reduce((acc, material) => ({ ...acc, [material]: Math.max(1, Math.floor(kills / 3)) }), {});
  return { seconds: capped, kills, gold, xp, materials, zoneName: zone.name };
};
