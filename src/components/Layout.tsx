import { ReactNode } from 'react';
import { GameState, Page } from '../types/game';
import { fmt } from '../utils/economy';
import { xpForLevel } from '../utils/progression';
import ProgressBar from './ProgressBar';
import Sidebar from './Sidebar';

const resources = [
  { label: 'Gold', icon: 'G', value: (state: GameState) => fmt(state.gold), tip: 'Gold used for ships, gear, repairs, and upgrades.' },
  { label: 'Diamonds', icon: 'D', value: (state: GameState) => fmt(state.diamonds), tip: 'Premium quest and achievement currency.' },
  { label: 'XP', icon: 'XP', value: (state: GameState) => `${fmt(state.xp)} / ${fmt(xpForLevel(state.level))}`, tip: 'Experience toward the next captain level.' },
  { label: 'Level', icon: 'LV', value: (state: GameState) => state.level, tip: 'Captain level unlocks zones, ships, and event access.' },
  { label: 'Wood', icon: 'W', value: (state: GameState) => fmt(state.materials.wood), tip: 'Wood gathered from coastal raids and repairs.' },
  { label: 'Iron', icon: 'I', value: (state: GameState) => fmt(state.materials.iron), tip: 'Iron used by shipwrights and weaponsmiths.' },
  { label: 'Cloth', icon: 'C', value: (state: GameState) => fmt(state.materials.cloth), tip: 'Cloth for sails and deck fittings.' },
  { label: 'Gunpowder', icon: 'P', value: (state: GameState) => fmt(state.materials.gunpowder), tip: 'Gunpowder for cannon upgrades.' },
  { label: 'Ancient Relics', icon: 'R', value: (state: GameState) => fmt(state.materials.relics), tip: 'Rare relics recovered from dangerous waters.' },
];

export default function Layout({ state, page, setPage, children }: { state: GameState; page: Page; setPage: (page: Page) => void; children: ReactNode }) {
  return (
    <div className="app-shell">
      <Sidebar page={page} setPage={setPage} />
      <main className="main">
        <header className="topbar">
          <div className="captain-strip">
            <strong>{state.name}</strong>
            <ProgressBar value={state.xp} max={xpForLevel(state.level)} label={`Level ${state.level}`} />
          </div>
          <div className="resources">
            {resources.map((resource) => (
              <span className="resource-chip" title={resource.tip} key={resource.label}>
                <b>{resource.icon}</b>
                <small>{resource.label}</small>
                {resource.value(state)}
              </span>
            ))}
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
