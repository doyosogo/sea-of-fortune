export type Material = 'wood' | 'iron' | 'cloth' | 'gunpowder' | 'relics' | 'ghostEssence' | 'leviathanHeart' | 'krakenEye';
export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Event' | 'Mythic';
export type Page =
  | 'Dashboard'
  | 'My Ship'
  | 'Sea Map'
  | 'Combat'
  | 'Shipyard'
  | 'Shop'
  | 'Quests'
  | 'Inventory'
  | 'Collections'
  | 'Crew'
  | 'Expeditions'
  | 'Events'
  | 'Settings';

export type Materials = Record<Material, number>;

export interface Ship {
  id: string;
  name: string;
  price: number;
  materialCost?: Partial<Materials>;
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
  evolvesTo?: string;
  locked?: boolean;
}

export interface Harpoon {
  id: string;
  name: string;
  damage: number;
  monsterBonus: number;
  rarity: Rarity;
  price: number;
  evolvesTo?: string;
  locked?: boolean;
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
  materialCost?: Partial<Materials>;
  evolvesTo?: string;
  locked?: boolean;
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
  lootTableId?: string;
  monster?: boolean;
  boss?: boolean;
}

export interface MaterialInfo {
  id: Material;
  name: string;
  description: string;
  icon: string;
  dropSource: string;
  rarity: Rarity;
  dropRate?: string;
}

export interface CrewMember {
  id: string;
  name: string;
  role: 'Gunner' | 'Navigator' | 'Carpenter' | 'Quartermaster' | 'Treasure Hunter';
  quality: Exclude<Rarity, 'Event' | 'Mythic'>;
  bonus: string;
  description: string;
}

export interface ExpeditionDefinition {
  id: string;
  name: string;
  durationMinutes: number;
  description: string;
  rewards: { gold: number; materials?: Partial<Materials>; equipmentChance?: number; crewChance?: number };
}

export interface ActiveExpedition {
  instanceId: string;
  expeditionId: string;
  startedAt: number;
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
  category?: 'Combat' | 'Economy' | 'Collection' | 'Ships' | 'Crew' | 'Exploration';
  rewards: { gold?: number; diamonds?: number; materials?: Partial<Materials> };
  check: string;
}

export interface PlayerStats {
  enemiesDefeated: number;
  bossesDefeated: number;
  goldEarned: number;
  questsCompleted: number;
  highestCannonUpgrade: number;
  rareDropsFound: number;
  startedAt: number;
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
  discovered: { ships: string[]; enemies: string[]; materials: Material[]; cannons: string[]; harpoons: string[]; decks: string[] };
  crewIds: string[];
  activeExpeditions: ActiveExpedition[];
  completedExpeditionIds: string[];
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
