import { enemies } from '../data/enemies';
import { frozenFestival } from '../data/events';
import { zones } from '../data/zones';
import { PageProps } from '../App';
import SceneLayout from '../components/SceneLayout';

export default function SeaMap({ state, actions }: PageProps) {
  const mapZones = [...zones, frozenFestival.zone];

  return (
    <SceneLayout scene="map" title="Sea Map" kicker="Chart table" actions={<button onClick={actions.startSailing}>Start Selected Zone</button>}>
      <div className="map-grid">
        {mapZones.map((zone) => {
          const unlocked = state.unlockedZoneIds.includes(zone.id) || (zone.id === frozenFestival.zone.id && state.level >= 6);
          const zoneEnemies = zone.enemyIds.map((id) => enemies.find((enemy) => enemy.id === id)?.name).filter(Boolean).join(', ');
          const boss = enemies.find((enemy) => enemy.id === zone.bossId)?.name ?? zone.bossId;
          return (
            <article key={zone.id} className={`card map-card ${state.selectedZoneId === zone.id ? 'selected' : ''} ${!unlocked ? 'locked' : ''}`}>
              <div className={`map-tile map-${zone.id}`} />
              <div className="card-head"><h3>{zone.name}</h3><span className="pill">Lv {zone.requiredLevel}</span></div>
              <p>{zone.unlockCondition}</p>
              <div className="zone-details">
                <span title="Enemies in these waters">Enemies <b>{zoneEnemies}</b></span>
                <span title="Zone boss">Boss <b>{boss}</b></span>
                <span title="Reward modifiers">Rewards <b>Gold x{zone.goldMultiplier} / XP x{zone.xpMultiplier}</b></span>
                <span title="Material drops">Drops <b>{zone.materialDrops.join(', ')}</b></span>
              </div>
              <button disabled={!unlocked} onClick={() => actions.selectZone(zone.id)}>{state.selectedZoneId === zone.id ? 'Selected' : unlocked ? 'Select Zone' : 'Locked'}</button>
            </article>
          );
        })}
      </div>
    </SceneLayout>
  );
}
