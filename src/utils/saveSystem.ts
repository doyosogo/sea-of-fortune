import { GameState } from '../types/game';
import { createInitialState } from './progression';

const SAVE_KEY = 'sea-of-treasure-save-v1';

export const saveGame = (state: GameState) => {
  localStorage.setItem(SAVE_KEY, JSON.stringify({ ...state, lastSavedAt: Date.now(), lastOfflineZoneId: state.selectedZoneId }));
};

export const loadGame = (): GameState => {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return createInitialState();
  try {
    return { ...createInitialState(), ...JSON.parse(raw) };
  } catch {
    return createInitialState();
  }
};

export const resetSave = () => {
  localStorage.removeItem(SAVE_KEY);
  return createInitialState();
};

export const exportSave = (state: GameState) => JSON.stringify({ ...state, lastSavedAt: Date.now() }, null, 2);

export const importSave = (raw: string): GameState => ({ ...createInitialState(), ...JSON.parse(raw), lastSavedAt: Date.now() });
