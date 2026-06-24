import { useMemo, useState } from 'react';
import EquipmentCard from './EquipmentCard';
import { GameState, OwnedEquipment } from '../types/game';
import { getBaseEquipment } from '../utils/economy';

const rarityRank = { Common: 1, Uncommon: 2, Rare: 3, Epic: 4, Legendary: 5, Event: 6, Mythic: 7 };

export default function InventoryPanel({ state, onEquip, onUpgrade }: { state: GameState; onEquip: (id: string) => void; onUpgrade: (id: string) => void }) {
  const [filter, setFilter] = useState<'all' | OwnedEquipment['type']>('all');
  const [sort, setSort] = useState<'rarity' | 'upgrade' | 'type'>('rarity');
  const equippedIds = useMemo(() => [...state.equipped.cannons, ...state.equipped.harpoons, ...state.equipped.decks], [state.equipped]);
  const items = useMemo(() => {
    return state.equipment
      .filter((item) => filter === 'all' || item.type === filter)
      .sort((a, b) => {
        if (sort === 'upgrade') return b.upgrade - a.upgrade;
        if (sort === 'type') return a.type.localeCompare(b.type);
        return rarityRank[getBaseEquipment(b).rarity] - rarityRank[getBaseEquipment(a).rarity];
      });
  }, [filter, sort, state.equipment]);

  return (
    <>
      <div className="inventory-controls">
        <label>Sort<select value={sort} onChange={(event) => setSort(event.target.value as typeof sort)}><option value="rarity">Rarity</option><option value="upgrade">Upgrade</option><option value="type">Type</option></select></label>
        <label>Filter<select value={filter} onChange={(event) => setFilter(event.target.value as typeof filter)}><option value="all">All Gear</option><option value="cannon">Cannons</option><option value="harpoon">Harpoons</option><option value="deck">Decks</option></select></label>
      </div>
      <div className="equipment-grid">
        {items.map((item) => {
          const equipped = equippedIds.includes(item.instanceId);
          return <EquipmentCard key={item.instanceId} item={item} equipped={equipped} onEquip={() => onEquip(item.instanceId)} onUpgrade={() => onUpgrade(item.instanceId)} />;
        })}
      </div>
    </>
  );
}
