export type Material = 'wood' | 'iron' | 'cloth' | 'gunpowder' | 'relics';
export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Event';
export type Page =
  | 'Dashboard'
  | 'My Ship'
  | 'Sea Map'
  | 'Combat'
  | 'Shipyard'
  | 'Shop'
  | 'Quests'
  | 'Inventory'
  | 'Events'
  | 'Settings';

export type Materials = Record<Material, number>;

export interface Ship {
  id: string;
  name: string;
  price: number;
  requiredLevel: number;
  hp: number;
  cannonSlots: number;
  harpoonSlots: number;
  deckSlots: number;
  speed: number;
  repairCostMultiplier: number;
  description: string;
  questUnlock?: string;
}

export interface Cannon {
  id: string;
  name: string;
  damage: number;
  accuracy: number;
  critChance: number;
  rarity: Rarity;
  price: number;
}

export interface Harpoon {
  id: string;
  name: string;
  damage: number;
  monsterBonus: number;
  rarity: Rarity;
  price: number;
}

export interface Deck {
  id: string;
  name: string;
  hp: number;
  cannonDamage: number;
  harpoonDamage: number;
  goldBonus: number;
  repairEfficiency: number;
  rarity: Rarity;
  price: number;
}

export interface OwnedEquipment {
  instanceId: string;
  baseId: string;
  type: 'cannon' | 'harpoon' | 'deck';
  upgrade: number;
}

export interface Enemy {
  id: string;
  name: string;
  hp: number;
  damage: number;
  rewardGold: number;
  rewardXp: number;
  drops: Partial<Materials>;
  monster?: boolean;
  boss?: boolean;
}

export interface Zone {
  id: string;
  name: string;
  requiredLevel: number;
  enemyIds: string[];
  bossId: string;
  goldMultiplier: number;
  xpMultiplier: number;
  materialDrops: Material[];
  unlockCondition: string;
}

export interface Quest {
  id: string;
  title: string;
  type: 'Main' | 'Zone' | 'Daily' | 'Ship Unlock';
  description: string;
  target: { kind: 'defeat' | 'gold' | 'level' | 'zone' | 'ship'; id?: string; count: number };
  rewards: { gold?: number; xp?: number; diamonds?: number; materials?: Partial<Materials>; unlockShipId?: string };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  rewards: { gold?: number; diamonds?: number; materials?: Partial<Materials> };
  check: 'enemies100' | 'gold100k' | 'frigate' | 'cannon5' | 'quests10' | 'boss1' | 'frozen' | 'level20';
}

export interface PlayerStats {
  enemiesDefeated: number;
  bossesDefeated: number;
  goldEarned: number;
  questsCompleted: number;
  highestCannonUpgrade: number;
}

export interface GameState {
  name: string;
  level: number;
  xp: number;
  gold: number;
  diamonds: number;
  materials: Materials;
  currentShipId: string;
  ownedShipIds: string[];
  unlockedShipIds: string[];
  unlockedZoneIds: string[];
  selectedZoneId: string;
  equipment: OwnedEquipment[];
  equipped: { cannons: string[]; harpoons: string[]; decks: string[] };
  questProgress: Record<string, number>;
  completedQuestIds: string[];
  achievementIds: string[];
  inventory: string[];
  eventCurrency: Record<string, number>;
  stats: PlayerStats;
  lastSavedAt: number;
  lastOfflineZoneId: string;
  hp: number;
}

export interface CombatState {
  sailing: boolean;
  enemy: Enemy | null;
  enemyHp: number;
  log: string[];
  sessionGold: number;
  sessionXp: number;
  startedAt: number;
}
