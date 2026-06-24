import { frozenFestival } from '../data/events';
import { PageProps } from '../App';
import SceneLayout from '../components/SceneLayout';

export default function Events({ state, actions }: PageProps) {
  const coins = state.eventCurrency[frozenFestival.id] ?? 0;
  return (
    <SceneLayout scene="festival" title="Events" kicker="Festival harbour">
      <div className="event-banner">
        <div>
          <p className="eyebrow">Current event</p>
          <h2>{frozenFestival.name}</h2>
          <p>Farm the temporary frozen sea for Frost Coins, then trade them for event equipment.</p>
          <div className="event-meta">
            <span className="pill">Countdown: Seasonal</span>
            <span className="pill">Currency: Frost Coins</span>
            <span className="pill">Progress tracked by event shop purchases</span>
          </div>
          <div className="button-row">
            <button disabled={state.level < 6} onClick={() => actions.selectZone(frozenFestival.zone.id)}>Select Event Zone</button>
            <button disabled={state.level < 6} onClick={actions.startSailing}>Start Event Sailing</button>
          </div>
        </div>
        <div className="ice-crystal">{coins} Frost Coins</div>
      </div>
      <div className="shop-grid">
        {frozenFestival.shop.map((item) => (
          <article className="card shop-item event-reward" key={item.id}>
            <div className="pixel-icon rarity-event" />
            <h3>{item.name}</h3>
            <p>Costs {item.cost} Frost Coins.</p>
            <button disabled={coins < item.cost} onClick={() => actions.buyEventItem(item.id)}>Buy</button>
          </article>
        ))}
      </div>
    </SceneLayout>
  );
}
