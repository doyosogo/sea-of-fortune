import { useState } from 'react';
import { PageProps } from '../App';
import SceneLayout from '../components/SceneLayout';

export default function Settings({ state, actions }: PageProps) {
  const [name, setName] = useState(state.name);
  const [saveText, setSaveText] = useState('');
  return (
    <SceneLayout scene="settings" title="Settings" kicker="Captain's desk" actions={<span className="pill">localStorage save</span>}>
      <div className="grid two">
        <div className="card">
          <h2>Captain</h2>
          <label>Captain Name<input value={name} onChange={(event) => setName(event.target.value)} /></label>
          <button onClick={() => actions.setName(name || 'New Captain')}>Apply Name</button>
        </div>
        <div className="card">
          <h2>Save Controls</h2>
          <div className="button-row">
            <button onClick={actions.save}>Save Game</button>
            <button onClick={actions.load}>Load Game</button>
            <button className="danger" onClick={actions.reset}>Reset Save</button>
          </div>
          <textarea value={saveText} onChange={(event) => setSaveText(event.target.value)} placeholder="Exported save JSON appears here. Paste JSON here to import." />
          <div className="button-row">
            <button onClick={() => setSaveText(actions.exportText())}>Export JSON</button>
            <button onClick={() => actions.importText(saveText)}>Import JSON</button>
          </div>
        </div>
      </div>
    </SceneLayout>
  );
}
