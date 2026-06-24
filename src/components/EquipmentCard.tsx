import { cannons } from '../data/cannons';
import { decks } from '../data/decks';
import { harpoons } from '../data/harpoons';
import { OwnedEquipment } from '../types/game';
import { fmt, getBaseEquipment, upgradeCost } from '../utils/economy';

export default function EquipmentCard({ item, equipped, onEquip, onUpgrade }: { item: OwnedEquipment; equipped?: boolean; onEquip?: () => void; onUpgrade?: () => void }) {
  const base = getBaseEquipment(item);
  const cost = upgradeCost(item);
  const stat =
    item.type === 'cannon'
      ? `${Math.round(cannons.find((x) => x.id === item.baseId)!.damage * (1 + item.upgrade * 0.12))} dmg`
      : item.type === 'harpoon'
        ? `${Math.round(harpoons.find((x) => x.id === item.baseId)!.damage * (1 + item.upgrade * 0.12))} dmg`
        : `+${Math.round(decks.find((x) => x.id === item.baseId)!.hp * (1 + item.upgrade * 0.08))} HP`;
  return (
    <article className="card equipment-card" title={`${base.rarity} ${item.type}: ${stat}`}>
      <div className={`pixel-icon rarity-${base.rarity.toLowerCase()}`} />
      <div>
        <div className="card-head">
          <h3>{base.name} +{item.upgrade}</h3>
          <span className="pill">{base.rarity}</span>
        </div>
        <p>{item.type.toUpperCase()} - {stat} {equipped ? '- Equipped' : ''}</p>
        <div className="button-row">
          {onEquip && <button onClick={onEquip}>{equipped ? 'Equipped' : 'Equip'}</button>}
          {onUpgrade && <button disabled={item.upgrade >= 10} onClick={onUpgrade}>Upgrade {fmt(cost.gold)}</button>}
        </div>
      </div>
    </article>
  );
}
