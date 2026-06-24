import { useEffect, useMemo, useRef, useState } from 'react';
import type { ReactElement } from 'react';
import Layout from './components/Layout';
import { achievements } from './data/achievements';
import { cannons } from './data/cannons';
import { decks } from './data/decks';
import { frozenFestival } from './data/events';
import { harpoons } from './data/harpoons';
import { quests } from './data/quests';
import { ships } from './data/ships';
import { CombatState, GameState, Page } from './types/game';
import { defeatEnemy, offlineRewards, repairCost, spawnEnemy } from './utils/combat';
import { addMaterials, canAffordMaterials, spendMaterials, upgradeCost } from './utils/economy';
import { applyRewards, claimAvailableAchievements, createInitialState, getCurrentShip, getPower, makeEquipment } from './utils/progression';
import { exportSave, importSave, loadGame, resetSave, saveGame } from './utils/saveSystem';
import CombatPage from './pages/Combat';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Inventory from './pages/Inventory';
import MyShip from './pages/MyShip';
import Quests from './pages/Quests';
import SeaMap from './pages/SeaMap';
import Settings from './pages/Settings';
import Shipyard from './pages/Shipyard';
import Shop from './pages/Shop';

export interface GameActions {
  setName: (name: string) => void;
  selectZone: (id: string) => void;
  startSailing: () => void;
  stopSailing: () => void;
  repair: () => void;
  buyShip: (id: string) => void;
  equipShip: (id: string) => void;
  buyEquipment: (id: string, type: 'cannon' | 'harpoon' | 'deck') => void;
  equipEquipment: (id: string) => void;
  autoEquipBest: () => void;
  upgradeEquipment: (id: string) => void;
  claimQuest: (id: string) => void;
  claimAchievements: () => void;
  buyEventItem: (id: string) => void;
  save: () => void;
  load: () => void;
  reset: () => void;
  exportText: () => string;
  importText: (raw: string) => void;
}

export interface PageProps {
  state: GameState;
  combat: CombatState;
  actions: GameActions;
  setPage: (page: Page) => void;
}

const initialCombat: CombatState = { sailing: false, enemy: null, enemyHp: 0, log: [], sessionGold: 0, sessionXp: 0, startedAt: 0 };

export default function App() {
  const [page, setPage] = useState<Page>('Dashboard');
  const [state, setState] = useState<GameState>(() => loadGame());
  const stateRef = useRef(state);
  const [combat, setCombat] = useState<CombatState>(initialCombat);
  const [offline, setOffline] = useState<ReturnType<typeof offlineRewards>>(null);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    const rewards = offlineRewards(state);
    if (rewards) {
      setOffline(rewards);
      setState((prev) => claimAvailableAchievements(applyRewards(prev, rewards)));
    }
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => saveGame(state), 8000);
    return () => window.clearInterval(timer);
  }, [state]);

  useEffect(() => {
    if (!combat.sailing) return;
    const timer = window.setInterval(() => {
      const currentState = stateRef.current;
      const power = getPower(currentState);
      setCombat((prevCombat) => {
          const currentEnemy = prevCombat.enemy ?? spawnEnemy(currentState.selectedZoneId, (currentState.stats.enemiesDefeated + 1) % 12 === 0);
          let enemyHp = prevCombat.enemy ? prevCombat.enemyHp : currentEnemy.hp;
          const crit = Math.random() < 0.12;
          const dealt = Math.round(power.damage * (crit ? 1.75 : 1) * (0.86 + Math.random() * 0.28));
          enemyHp -= dealt;
          let nextState = { ...currentState, hp: Math.max(0, currentState.hp - currentEnemy.damage) };
          let log = [`You hit ${currentEnemy.name} for ${dealt}${crit ? ' critical' : ''}.`, ...prevCombat.log].slice(0, 18);
          let sessionGold = prevCombat.sessionGold;
          let sessionXp = prevCombat.sessionXp;
          let nextEnemy = currentEnemy;
          if (enemyHp <= 0) {
            const result = defeatEnemy(nextState, currentEnemy, nextState.selectedZoneId);
            const matchingQuestIds = quests.filter((quest) => quest.target.kind === 'defeat' && (!quest.target.id || quest.target.id === currentEnemy.id)).map((quest) => quest.id);
            const questProgress = { ...result.state.questProgress };
            for (const id of matchingQuestIds) questProgress[id] = (questProgress[id] ?? 0) + 1;
            nextState = claimAvailableAchievements({ ...result.state, questProgress });
            sessionGold += result.rewards.gold;
            sessionXp += result.rewards.xp;
            log = [`Defeated ${currentEnemy.name}: +${result.rewards.gold} gold, +${result.rewards.xp} XP.`, ...log].slice(0, 18);
            nextEnemy = spawnEnemy(nextState.selectedZoneId, (nextState.stats.enemiesDefeated + 1) % 12 === 0);
            enemyHp = nextEnemy.hp;
          }
          if (nextState.hp <= 0) {
            const cost = repairCost(nextState);
            nextState = { ...nextState, gold: Math.max(0, nextState.gold - cost), hp: Math.max(1, Math.floor(power.maxHp * 0.45)) };
            log = [`Your ship was defeated. Repairs cost ${cost} gold.`, ...log].slice(0, 18);
            setTimeout(() => setCombat((c) => ({ ...c, sailing: false })), 0);
          }
          setState(nextState);
          return { ...prevCombat, enemy: nextEnemy, enemyHp, log, sessionGold, sessionXp, startedAt: prevCombat.startedAt || Date.now() };
        });
    }, 2300);
    return () => window.clearInterval(timer);
  }, [combat.sailing]);

  const actions: GameActions = useMemo(() => ({
    setName: (name) => setState((s) => ({ ...s, name })),
    selectZone: (id) => setState((s) => ({ ...s, selectedZoneId: id })),
    startSailing: () => setCombat((c) => {
      const enemy = c.enemy ?? spawnEnemy(state.selectedZoneId);
      return { ...c, sailing: true, enemy, enemyHp: c.enemyHp || enemy.hp, startedAt: Date.now() };
    }),
    stopSailing: () => setCombat((c) => ({ ...c, sailing: false })),
    repair: () => setState((s) => {
      const cost = repairCost(s);
      if (s.gold < cost) return s;
      return { ...s, gold: s.gold - cost, hp: getPower(s).maxHp };
    }),
    buyShip: (id) => setState((s) => {
      const ship = ships.find((x) => x.id === id)!;
      if (!s.unlockedShipIds.includes(id) || s.level < ship.requiredLevel || s.gold < ship.price || s.ownedShipIds.includes(id)) return s;
      return claimAvailableAchievements({ ...s, gold: s.gold - ship.price, ownedShipIds: [...s.ownedShipIds, id] });
    }),
    equipShip: (id) => setState((s) => s.ownedShipIds.includes(id) ? { ...s, currentShipId: id, hp: getPower({ ...s, currentShipId: id }).maxHp } : s),
    buyEquipment: (id, type) => setState((s) => {
      const base = type === 'cannon' ? cannons.find((x) => x.id === id)! : type === 'harpoon' ? harpoons.find((x) => x.id === id)! : decks.find((x) => x.id === id)!;
      if (base.price <= 0 || s.gold < base.price) return s;
      return { ...s, gold: s.gold - base.price, equipment: [...s.equipment, makeEquipment(id, type)] };
    }),
    equipEquipment: (id) => setState((s) => {
      const item = s.equipment.find((x) => x.instanceId === id);
      if (!item) return s;
      const ship = getCurrentShip(s);
      const key = item.type === 'cannon' ? 'cannons' : item.type === 'harpoon' ? 'harpoons' : 'decks';
      const slotLimit = item.type === 'cannon' ? ship.cannonSlots : item.type === 'harpoon' ? ship.harpoonSlots : ship.deckSlots;
      const current = s.equipped[key].filter((x) => s.equipment.find((eq) => eq.instanceId === x)?.type === item.type && x !== id);
      const equipped = { ...s.equipped, [key]: [...current, id].slice(-slotLimit) };
      return { ...s, equipped, hp: Math.min(getPower({ ...s, equipped }).maxHp, s.hp) };
    }),
    autoEquipBest: () => setState((s) => {
      const ship = getCurrentShip(s);
      const score = (item: typeof s.equipment[number]) => {
        const base = item.type === 'cannon' ? cannons.find((x) => x.id === item.baseId)!.damage : item.type === 'harpoon' ? harpoons.find((x) => x.id === item.baseId)!.damage : decks.find((x) => x.id === item.baseId)!.hp / 8;
        return base * (1 + item.upgrade * 0.12);
      };
      const pick = (type: typeof s.equipment[number]['type'], limit: number) => s.equipment.filter((x) => x.type === type).sort((a, b) => score(b) - score(a)).slice(0, limit).map((x) => x.instanceId);
      const equipped = { cannons: pick('cannon', ship.cannonSlots), harpoons: pick('harpoon', ship.harpoonSlots), decks: pick('deck', ship.deckSlots) };
      return { ...s, equipped, hp: Math.min(getPower({ ...s, equipped }).maxHp, s.hp) };
    }),
    upgradeEquipment: (id) => setState((s) => {
      const item = s.equipment.find((x) => x.instanceId === id);
      if (!item || item.upgrade >= 10) return s;
      const cost = upgradeCost(item);
      if (s.gold < cost.gold || !canAffordMaterials(s.materials, cost.materials)) return s;
      const equipment = s.equipment.map((x) => x.instanceId === id ? { ...x, upgrade: x.upgrade + 1 } : x);
      return claimAvailableAchievements({ ...s, gold: s.gold - cost.gold, materials: spendMaterials(s.materials, cost.materials), equipment, stats: { ...s.stats, highestCannonUpgrade: item.type === 'cannon' ? Math.max(s.stats.highestCannonUpgrade, item.upgrade + 1) : s.stats.highestCannonUpgrade } });
    }),
    claimQuest: (id) => setState((s) => {
      const quest = quests.find((q) => q.id === id)!;
      if (s.completedQuestIds.includes(id)) return s;
      const progress = getQuestProgress(s, quest.id);
      if (progress < quest.target.count) return s;
      return claimAvailableAchievements(applyRewards({ ...s, completedQuestIds: [...s.completedQuestIds, id], stats: { ...s.stats, questsCompleted: s.stats.questsCompleted + 1 } }, quest.rewards));
    }),
    claimAchievements: () => setState((s) => claimAvailableAchievements(s)),
    buyEventItem: (id) => setState((s) => {
      const item = frozenFestival.shop.find((x) => x.id === id)!;
      const coins = s.eventCurrency[frozenFestival.id] ?? 0;
      if (coins < item.cost) return s;
      const type = id.includes('cannon') ? 'cannon' : id.includes('harpoon') ? 'harpoon' : 'deck';
      return { ...s, eventCurrency: { ...s.eventCurrency, [frozenFestival.id]: coins - item.cost }, equipment: [...s.equipment, makeEquipment(id, type)] };
    }),
    save: () => saveGame(state),
    load: () => setState(loadGame()),
    reset: () => { setCombat(initialCombat); setState(resetSave()); },
    exportText: () => exportSave(state),
    importText: (raw) => setState(importSave(raw)),
  }), [state]);

  const pageProps = { state, combat, actions, setPage };
  const pages: Record<Page, ReactElement> = {
    Dashboard: <Dashboard {...pageProps} />,
    'My Ship': <MyShip {...pageProps} />,
    'Sea Map': <SeaMap {...pageProps} />,
    Combat: <CombatPage {...pageProps} />,
    Shipyard: <Shipyard {...pageProps} />,
    Shop: <Shop {...pageProps} />,
    Quests: <Quests {...pageProps} />,
    Inventory: <Inventory {...pageProps} />,
    Events: <Events {...pageProps} />,
    Settings: <Settings {...pageProps} />,
  };

  return (
    <Layout state={state} page={page} setPage={setPage}>
      {offline && (
        <div className="modal-backdrop" onClick={() => setOffline(null)}>
          <div className="modal card" onClick={(event) => event.stopPropagation()}>
            <h2>Offline Voyage</h2>
            <p>Your crew farmed {offline.zoneName} for {Math.floor(offline.seconds / 60)} minutes.</p>
            <p>Defeated {offline.kills} enemies for {offline.gold} gold and {offline.xp} XP.</p>
            <button onClick={() => setOffline(null)}>Collect</button>
          </div>
        </div>
      )}
      {pages[page]}
    </Layout>
  );
}

export function getQuestProgress(state: GameState, questId: string) {
  const quest = quests.find((q) => q.id === questId)!;
  if (quest.target.kind === 'gold') return state.stats.goldEarned;
  if (quest.target.kind === 'level') return state.level;
  if (quest.target.kind === 'ship') return state.ownedShipIds.includes(quest.target.id ?? '') ? quest.target.count : 0;
  if (quest.target.kind === 'zone') return state.unlockedZoneIds.includes(quest.target.id ?? '') ? quest.target.count : 0;
  return state.questProgress[quest.id] ?? (quest.target.id ? 0 : state.stats.enemiesDefeated);
}

export { achievements };
