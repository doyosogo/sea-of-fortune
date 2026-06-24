import { ExpeditionDefinition } from '../types/game';

export const expeditions: ExpeditionDefinition[] = [
  { id: 'harbour-errand', name: 'Harbour Errand', durationMinutes: 30, description: 'A short supply run through friendly waters.', rewards: { gold: 1500, materials: { wood: 60, cloth: 30 }, crewChance: 0.05 } },
  { id: 'smuggler-cache', name: 'Smuggler Cache', durationMinutes: 120, description: 'Follow a half-burned map to hidden contraband.', rewards: { gold: 12000, materials: { iron: 90, cloth: 120, gunpowder: 25 }, equipmentChance: 0.08, crewChance: 0.1 } },
  { id: 'abyssal-salvage', name: 'Abyssal Salvage', durationMinutes: 480, description: 'Send a trusted crew into dangerous old wreckage.', rewards: { gold: 95000, materials: { wood: 700, iron: 520, gunpowder: 160, relics: 1 }, equipmentChance: 0.18, crewChance: 0.18 } },
];
