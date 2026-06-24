import { GameState } from '../types/game';
import { createInitialState, migrateState } from './progression';

const SAVE_KEY = 'sea-of-fortune-save-v2';
const LEGACY_SAVE_KEY = 'sea-of-treasure-save-v1';

export const saveGame = (state: GameState) => {
  localStorage.setItem(SAVE_KEY, JSON.stringify({ ...state, lastSavedAt: Date.now(), lastOfflineZoneId: state.selectedZoneId }));
};

export const loadGame = (): GameState => {
  const raw = localStorage.getItem(SAVE_KEY) ?? localStorage.getItem(LEGACY_SAVE_KEY);
  if (!raw) return createInitialState();
  try {
    return migrateState(JSON.parse(raw));
  } catch {
    return createInitialState();
  }
};

export const resetSave = () => {
  localStorage.removeItem(SAVE_KEY);
  localStorage.removeItem(LEGACY_SAVE_KEY);
  return createInitialState();
};

export const exportSave = (state: GameState) => JSON.stringify({ ...state, lastSavedAt: Date.now() }, null, 2);

export const importSave = (raw: string): GameState => migrateState({ ...JSON.parse(raw), lastSavedAt: Date.now() });
