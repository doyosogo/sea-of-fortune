import { achievements } from '../data/achievements';
import { quests } from '../data/quests';
import { ships } from '../data/ships';
import { zones } from '../data/zones';
import { PageProps } from '../App';
import SceneLayout from '../components/SceneLayout';
import StatCard from '../components/StatCard';
import { fmt } from '../utils/economy';
import { getPower } from '../utils/progression';

export default function Dashboard({ state, actions, setPage }: PageProps) {
  const ship = ships.find((x) => x.id === state.currentShipId)!;
  const zone = zones.find((x) => x.id === state.selectedZoneId);
  const power = getPower(state);
  const openQuest = quests.find((q) => !state.completedQuestIds.includes(q.id));
  const recentAchievements = achievements.filter((achievement) => state.achievementIds.includes(achievement.id)).slice(-3);

  return (
    <SceneLayout
      scene="harbour"
      title="Sea of Fortune"
      kicker="Captain's harbour"
      actions={<><button onClick={actions.startSailing}>Continue Sailing</button><button onClick={actions.repair}>Repair Ship</button></>}
    >
      <div className="harbour-hero">
        <div>
          <p className="eyebrow">Flagship</p>
          <h3>{ship.name}</h3>
          <p>{ship.description}</p>
          <div className="harbour-metrics">
            <StatCard label="Captain Level" value={state.level} />
            <StatCard label="Gold / Hour" value={fmt(Math.max(1, power.damage * 30))} />
            <StatCard label="XP / Hour" value={fmt(Math.max(1, state.level * 42))} />
            <StatCard label="Active Zone" value={zone?.name ?? 'Festival Waters'} />
            <StatCard label="Rare Drops" value={state.stats.rareDropsFound} />
            <StatCard label="Hours Played" value={fmt((Date.now() - state.stats.startedAt) / 3600000)} />
          </div>
        </div>
        <div className="harbour-stage">
          <div className="dock-post left" />
          <div className="big-ship showcase" title={ship.name} />
          <div className="lantern" />
          <div className="dock-post right" />
        </div>
      </div>

      <div className="grid two">
        <div className="card notice-board">
          <div className="card-head"><h2>Active Quest</h2><span className="pill">{openQuest?.type ?? 'Clear'}</span></div>
          {openQuest ? <p><b>{openQuest.title}</b><br />{openQuest.description}</p> : <p className="empty">All posted quests are complete.</p>}
        </div>
        <div className="card">
          <h2>Recent Achievements</h2>
          {recentAchievements.length ? recentAchievements.map((achievement) => <p key={achievement.id}><b>{achievement.title}</b> - {achievement.description}</p>) : <p className="empty">Achievements will appear here after your crew earns them.</p>}
        </div>
      </div>

      <div className="quick-actions">
        <button onClick={actions.startSailing}>Continue Sailing</button>
        <button onClick={() => setPage('Shipyard')}>Shipyard</button>
        <button onClick={() => setPage('Quests')}>Quests</button>
        <button onClick={() => setPage('Shop')}>Shop</button>
      </div>
    </SceneLayout>
  );
}
