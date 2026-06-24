import { cannons } from '../data/cannons';
import { decks } from '../data/decks';
import { harpoons } from '../data/harpoons';
import { PageProps } from '../App';
import SceneLayout from '../components/SceneLayout';
import { fmt } from '../utils/economy';

export default function Shop({ actions }: PageProps) {
  const sections = [
    { title: 'Cannons', items: cannons, type: 'cannon' as const },
    { title: 'Harpoons', items: harpoons, type: 'harpoon' as const },
    { title: 'Decks', items: decks, type: 'deck' as const },
  ];
  return (
    <SceneLayout scene="market" title="Shop" kicker="Pirate market" actions={<span className="pill">No real-money purchases</span>}>
      {sections.map((section) => (
        <div className="card shop-section market-stall" key={section.title}>
          <div className="card-head"><h2>{section.title}</h2><span className="stall-sign">Merchant stock</span></div>
          <div className="shop-grid">
            {section.items.map((item) => (
              <article className="shop-item" key={item.id} title={`${item.rarity} ${section.type}`}>
                <div className={`pixel-icon rarity-${item.rarity.toLowerCase()}`} />
                <h3>{item.name}</h3>
                <p>{item.rarity}</p>
                {item.locked ? <button disabled>Coming In Future Updates</button> : ['rusty-cannon', 'wooden-harpoon', 'beech-deck'].includes(item.id) || item.rarity === 'Event' ? <button disabled={item.price <= 0} onClick={() => actions.buyEquipment(item.id, section.type)}>Buy {fmt(item.price)}</button> : <button disabled>Unlock By Evolution</button>}
              </article>
            ))}
          </div>
        </div>
      ))}
      <div className="card shop-section market-stall">
        <div className="card-head"><h2>Supplies</h2><span className="stall-sign">Dockside goods</span></div>
        <div className="shop-grid">
          <article className="shop-item"><div className="pixel-icon" /><h3>Repair Supplies</h3><p>Use your current repair action.</p><button onClick={actions.repair}>Repair Now</button></article>
          <article className="shop-item"><div className="pixel-icon" /><h3>Ammunition Boost</h3><p>Placeholder stock for future timed buffs.</p><button disabled>Coming Soon</button></article>
          <article className="shop-item"><div className="pixel-icon" /><h3>Banner Dye</h3><p>Cosmetic placeholder for ship banners.</p><button disabled>Coming Soon</button></article>
        </div>
      </div>
    </SceneLayout>
  );
}
