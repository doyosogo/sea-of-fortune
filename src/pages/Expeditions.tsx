import SceneLayout from '../components/SceneLayout';
import { expeditions } from '../data/expeditions';
import { PageProps } from '../App';
import { fmt } from '../utils/economy';

export default function Expeditions({ state, actions }: PageProps) {
  return (
    <SceneLayout scene="map" title="Expeditions" kicker="Offline voyages">
      <div className="expedition-grid">
        {expeditions.map((expedition) => (
          <article className="card expedition-card" key={expedition.id} title={expedition.description}>
            <h3>{expedition.name}</h3>
            <p>{expedition.description}</p>
            <p>{expedition.durationMinutes < 60 ? `${expedition.durationMinutes} Minutes` : `${expedition.durationMinutes / 60} Hours`} - {fmt(expedition.rewards.gold)} Gold</p>
            <button onClick={() => actions.startExpedition(expedition.id)}>Send Expedition</button>
          </article>
        ))}
      </div>
      <div className="card">
        <h2>Active Expeditions</h2>
        <div className="expedition-grid">
          {state.activeExpeditions.length ? state.activeExpeditions.map((active) => {
            const expedition = expeditions.find((item) => item.id === active.expeditionId)!;
            const ready = Date.now() - active.startedAt >= expedition.durationMinutes * 60000;
            return <article className="shop-item" key={active.instanceId}><h3>{expedition.name}</h3><p>{ready ? 'Ready to claim' : 'In progress while online or offline'}</p><button disabled={!ready} onClick={() => actions.claimExpedition(active.instanceId)}>Claim</button></article>;
          }) : <p className="empty">No crews are away from harbour.</p>}
        </div>
      </div>
    </SceneLayout>
  );
}
