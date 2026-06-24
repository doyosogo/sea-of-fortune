import SceneLayout from '../components/SceneLayout';
import { cannons } from '../data/cannons';
import { decks } from '../data/decks';
import { enemies } from '../data/enemies';
import { harpoons } from '../data/harpoons';
import { materialInfo } from '../data/materials';
import { ships } from '../data/ships';
import { PageProps } from '../App';

export default function Collections({ state }: PageProps) {
  const groups = [
    { title: 'Ships', total: ships.length, found: state.discovered.ships.length },
    { title: 'Enemies', total: enemies.length, found: state.discovered.enemies.length },
    { title: 'Materials', total: materialInfo.length, found: state.discovered.materials.length },
    { title: 'Cannons', total: cannons.length, found: state.discovered.cannons.length },
    { title: 'Harpoons', total: harpoons.length, found: state.discovered.harpoons.length },
    { title: 'Decks', total: decks.length, found: state.discovered.decks.length },
  ];
  const total = groups.reduce((sum, group) => sum + group.total, 0);
  const found = groups.reduce((sum, group) => sum + group.found, 0);
  return (
    <SceneLayout scene="cabin" title="Collections" kicker="Captain's ledger">
      <div className="stats-row"><div className="stat-card"><span>Completion</span><strong>{Math.round(found / total * 100)}%</strong></div><div className="stat-card"><span>Discovered</span><strong>{found} / {total}</strong></div></div>
      <div className="collection-grid">
        {groups.map((group) => (
          <article className="card collection-card" key={group.title} title={`${group.found} of ${group.total} discovered`}>
            <h3>{group.title}</h3>
            <p>{Math.round(group.found / group.total * 100)}% complete</p>
            <span className="pill">{group.found} discovered</span>
            <span className="pill">{group.total - group.found} undiscovered</span>
          </article>
        ))}
      </div>
    </SceneLayout>
  );
}
