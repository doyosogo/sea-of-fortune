import { CrewMember } from '../types/game';

export const crewMembers: CrewMember[] = [
  { id: 'gunner', name: 'Master Gunner', role: 'Gunner', quality: 'Rare', bonus: '+15% Cannon Damage', description: 'Keeps broadsides disciplined and devastating.' },
  { id: 'navigator', name: 'Star Navigator', role: 'Navigator', quality: 'Uncommon', bonus: '+8% Expedition Rewards', description: 'Reads currents, stars, and bad omens.' },
  { id: 'carpenter', name: 'Veteran Carpenter', role: 'Carpenter', quality: 'Rare', bonus: '+20% Ship HP', description: 'Can make a cracked hull feel new.' },
  { id: 'quartermaster', name: 'Iron Quartermaster', role: 'Quartermaster', quality: 'Epic', bonus: '-10% Upgrade Materials', description: 'Finds the exact bolt before anyone asks.' },
  { id: 'treasure-hunter', name: 'Treasure Hunter', role: 'Treasure Hunter', quality: 'Legendary', bonus: '+10% Rare Drop Chance', description: 'Smells relic dust through a locked chest.' },
  { id: 'rookie-gunner', name: 'Rookie Gunner', role: 'Gunner', quality: 'Common', bonus: '+3% Cannon Damage', description: 'Eager, loud, and improving.' },
];
