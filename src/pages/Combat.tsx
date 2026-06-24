import CombatPanel from '../components/CombatPanel';
import SceneLayout from '../components/SceneLayout';
import { PageProps } from '../App';

export default function Combat({ state, combat, actions }: PageProps) {
  return (
    <SceneLayout scene="battle" title="Combat" kicker="Open waters" actions={<span className="pill">{combat.sailing ? 'Sailing' : 'Docked'}</span>}>
      <CombatPanel state={state} combat={combat} onStart={actions.startSailing} onStop={actions.stopSailing} onRepair={actions.repair} />
    </SceneLayout>
  );
}
