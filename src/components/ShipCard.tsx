import { Ship } from '../types/game';
import { fmt } from '../utils/economy';

export default function ShipCard({ ship, owned, unlocked, current, compareHp, onBuy, onEquip }: { ship: Ship; owned: boolean; unlocked: boolean; current: boolean; compareHp: number; onBuy: () => void; onEquip: () => void }) {
  return (
    <article className={`card ship-card ${!unlocked ? 'locked' : ''} ${current ? 'current' : ''}`} title={ship.description}>
      <div className="ship-banner">{current ? 'CURRENT FLAGSHIP' : !unlocked ? 'LOCKED' : owned ? 'OWNED' : 'FOR SALE'}</div>
      <div className="pixel-ship" />
      <div className="card-head">
        <h3>{ship.name}</h3>
        <span className="pill">Lv {ship.requiredLevel}</span>
      </div>
      <p>{ship.description}</p>
      <div className="stat-grid small">
        <span>HP <b>{fmt(ship.hp)}</b></span>
        <span>Cannons <b>{ship.cannonSlots}</b></span>
        <span>Harpoons <b>{ship.harpoonSlots}</b></span>
        <span>Decks <b>{ship.deckSlots}</b></span>
        <span>Speed <b>{ship.speed}</b></span>
        <span>Price <b>{fmt(ship.price)}</b></span>
      </div>
      <p className={ship.hp >= compareHp ? 'positive' : 'negative'}>HP comparison: {ship.hp - compareHp >= 0 ? '+' : ''}{fmt(ship.hp - compareHp)}</p>
      <div className="button-row">
        {!owned && <button disabled={!unlocked} onClick={onBuy}>Buy {fmt(ship.price)}</button>}
        {owned && !current && <button onClick={onEquip}>Equip</button>}
      </div>
    </article>
  );
}
