import { CombatState, GameState } from '../types/game';
import { fmt } from '../utils/economy';
import { getPower } from '../utils/progression';
import ProgressBar from './ProgressBar';

export default function CombatPanel({ state, combat, onStart, onStop, onRepair }: { state: GameState; combat: CombatState; onStart: () => void; onStop: () => void; onRepair: () => void }) {
  const power = getPower(state);
  const hours = combat.startedAt ? Math.max(1 / 3600, (Date.now() - combat.startedAt) / 3600000) : 1;
  const killsPerHour = combat.sessionGold > 0 ? Math.max(1, Math.round(combat.log.filter((line) => line.startsWith('Defeated')).length / hours)) : 0;

  return (
    <section className="combat-layout">
      <div className="card battle-card">
        <div className={`battle-ocean ${combat.sailing ? 'active' : ''}`}>
          <div className="ship-sprite player"><span className="cannon-flash" /></div>
          <div className="projectile" />
          {combat.enemy && <div className={`ship-sprite enemy ${combat.enemyHp <= 0 ? 'sinking' : ''}`}><span className="damage-number">-{fmt(Math.max(0, combat.enemy.hp - combat.enemyHp))}</span></div>}
        </div>
        <ProgressBar value={state.hp} max={power.maxHp} label="Ship HP" />
        {combat.enemy ? <ProgressBar value={combat.enemyHp} max={combat.enemy.hp} label={combat.enemy.name} /> : <p className="empty">No enemy in sight.</p>}
        <div className="button-row">
          {!combat.sailing ? <button onClick={onStart}>Start Sailing</button> : <button className="danger" onClick={onStop}>Stop Sailing</button>}
          <button onClick={onRepair}>Repair</button>
        </div>
      </div>
      <div className="card">
        <h2>Farming Rate</h2>
        <div className="stat-grid">
          <span>Gold/hour <b>{fmt(combat.sessionGold / hours)}</b></span>
          <span>XP/hour <b>{fmt(combat.sessionXp / hours)}</b></span>
          <span>Kills/hour <b>{fmt(killsPerHour)}</b></span>
          <span>Power <b>{fmt(power.score)}</b></span>
        </div>
        <h2>Combat Log</h2>
        <div className="combat-log">
          {combat.log.length ? combat.log.map((line, index) => <p className={line.startsWith('Defeated') ? 'victory-line' : ''} key={`${line}-${index}`}>{formatCombatLine(line)}</p>) : <p className="empty">Set sail to begin automatic combat.</p>}
        </div>
      </div>
    </section>
  );
}

function formatCombatLine(line: string) {
  if (!line.startsWith('Defeated')) return line;
  const match = line.match(/^Defeated (.*): \+(\d+) gold, \+(\d+) XP\.$/);
  if (!match) return line;
  return `${match[1]} sunk! +${match[2]} Gold +${match[3]} XP`;
}
