import ShipCard from '../components/ShipCard';
import SceneLayout from '../components/SceneLayout';
import { ships } from '../data/ships';
import { PageProps } from '../App';
import { getCurrentShip } from '../utils/progression';

export default function Shipyard({ state, actions }: PageProps) {
  const current = getCurrentShip(state);
  return (
    <SceneLayout scene="shipyard" title="Shipyard" kicker="Dry dock" actions={<span className="pill">Original fleet progression</span>}>
      <div className="drydock-intro">
        <div className="dock-crane" />
        <p>Shipwrights compare hulls, slots, speed, and level requirements without changing the underlying fleet progression.</p>
      </div>
      <div className="ship-grid">
        {ships.map((ship) => (
          <ShipCard
            key={ship.id}
            ship={ship}
            owned={state.ownedShipIds.includes(ship.id)}
            unlocked={state.unlockedShipIds.includes(ship.id) && state.level >= ship.requiredLevel}
            current={state.currentShipId === ship.id}
            compareHp={current.hp}
            onBuy={() => actions.buyShip(ship.id)}
            onEquip={() => actions.equipShip(ship.id)}
          />
        ))}
      </div>
    </SceneLayout>
  );
}
