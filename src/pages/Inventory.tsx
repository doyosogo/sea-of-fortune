import InventoryPanel from '../components/InventoryPanel';
import SceneLayout from '../components/SceneLayout';
import { PageProps } from '../App';
import { fmt } from '../utils/economy';

export default function Inventory({ state, actions }: PageProps) {
  return (
    <SceneLayout scene="cabin" title="Inventory" kicker="Captain's cabin" actions={<button onClick={actions.autoEquipBest}>Auto Equip Best</button>}>
      <div className="inventory-tools">
        <span className="pill">Sort: Rarity</span>
        <span className="pill">Filter: All Gear</span>
        <span className="pill">Treasure Chest View</span>
      </div>
      <div className="stats-row treasure-row">
        <div className="stat-card"><span>Wood</span><strong>{fmt(state.materials.wood)}</strong></div>
        <div className="stat-card"><span>Iron</span><strong>{fmt(state.materials.iron)}</strong></div>
        <div className="stat-card"><span>Cloth</span><strong>{fmt(state.materials.cloth)}</strong></div>
        <div className="stat-card"><span>Gunpowder</span><strong>{fmt(state.materials.gunpowder)}</strong></div>
        <div className="stat-card"><span>Ancient Relics</span><strong>{fmt(state.materials.relics)}</strong></div>
        <div className="stat-card"><span>Ghost Essence</span><strong>{fmt(state.materials.ghostEssence)}</strong></div>
        <div className="stat-card"><span>Leviathan Hearts</span><strong>{fmt(state.materials.leviathanHeart)}</strong></div>
        <div className="stat-card"><span>Kraken Eyes</span><strong>{fmt(state.materials.krakenEye)}</strong></div>
      </div>
      <InventoryPanel state={state} onEquip={actions.equipEquipment} onUpgrade={actions.upgradeEquipment} />
      {!state.inventory.length && <p className="empty">No event trinkets yet. Festival currencies and future cosmetics will appear here.</p>}
    </SceneLayout>
  );
}
