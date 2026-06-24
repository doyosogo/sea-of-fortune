import EquipmentCard from '../components/EquipmentCard';
import ProgressBar from '../components/ProgressBar';
import SceneLayout from '../components/SceneLayout';
import StatCard from '../components/StatCard';
import { PageProps } from '../App';
import { fmt } from '../utils/economy';
import { getCurrentShip, getPower } from '../utils/progression';

export default function MyShip({ state, actions }: PageProps) {
  const ship = getCurrentShip(state);
  const power = getPower(state);
  const equippedIds = [...state.equipped.cannons, ...state.equipped.harpoons, ...state.equipped.decks];
  const equipped = state.equipment.filter((item) => equippedIds.includes(item.instanceId));

  return (
    <SceneLayout scene="ship" title="My Ship" kicker="Flagship showcase" actions={<button onClick={actions.autoEquipBest}>Auto Equip Best</button>}>
      <div className="ship-showcase-panel">
        <div className="ship-portrait"><div className="big-ship showcase" title={ship.name} /></div>
        <div>
          <p className="eyebrow">Current flagship</p>
          <h3>{ship.name}</h3>
          <p>{ship.description}</p>
          <ProgressBar value={state.hp} max={power.maxHp} label="Hull Integrity" />
          <div className="stats-row compact">
            <StatCard label="HP" value={`${fmt(state.hp)} / ${fmt(power.maxHp)}`} />
            <StatCard label="Damage" value={fmt(power.damage)} />
            <StatCard label="Speed" value={ship.speed} />
            <StatCard label="Repair Cost" value={`${ship.repairCostMultiplier}x`} />
          </div>
        </div>
      </div>

      <div className="grid two">
        <div className="card equipment-slots">
          <h2>Armament Deck</h2>
          <SlotRow label="Cannons" count={ship.cannonSlots} filled={state.equipped.cannons.length} icon="CN" />
          <SlotRow label="Harpoons" count={ship.harpoonSlots} filled={state.equipped.harpoons.length} icon="HP" />
          <SlotRow label="Deck" count={ship.deckSlots} filled={state.equipped.decks.length} icon="DK" />
        </div>
        <div className="card comparison-panel">
          <h2>Comparison</h2>
          <p>Power score, hull integrity, and mounted equipment are shown from the existing ship and gear systems.</p>
          <div className="stat-grid">
            <span>Cannon Slots <b>{ship.cannonSlots}</b></span>
            <span>Harpoon Slots <b>{ship.harpoonSlots}</b></span>
            <span>Deck Slots <b>{ship.deckSlots}</b></span>
            <span>Power <b>{fmt(power.score)}</b></span>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Equipped Gear</h2>
        <div className="equipment-grid slim">
          {equipped.length ? equipped.map((item) => (
            <EquipmentCard key={item.instanceId} item={item} equipped onUpgrade={() => actions.upgradeEquipment(item.instanceId)} />
          )) : <p className="empty">No gear mounted yet. Buy or equip items from the shop and inventory.</p>}
        </div>
      </div>
    </SceneLayout>
  );
}

function SlotRow({ label, count, filled, icon }: { label: string; count: number; filled: number; icon: string }) {
  return (
    <div className="slot-row" title={`${filled} of ${count} ${label.toLowerCase()} equipped`}>
      <b>{label}</b>
      <div>
        {Array.from({ length: count }).map((_, index) => <span className={index < filled ? 'slot filled' : 'slot'} key={index}>{icon}</span>)}
      </div>
    </div>
  );
}
