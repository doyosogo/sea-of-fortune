import { Quest } from '../types/game';
import { fmt } from '../utils/economy';
import ProgressBar from './ProgressBar';

export default function QuestCard({ quest, progress, completed, canClaim, onClaim }: { quest: Quest; progress: number; completed: boolean; canClaim: boolean; onClaim: () => void }) {
  return (
    <article className={`card quest-card ${completed ? 'complete' : ''} ${canClaim && !completed ? 'claimable' : ''}`} title={quest.description}>
      <div className="pin" />
      <div className="card-head">
        <h3>{quest.title}</h3>
        <span className="pill">{quest.type}</span>
      </div>
      <p>{quest.description}</p>
      <ProgressBar value={Math.min(progress, quest.target.count)} max={quest.target.count} label="Progress" />
      <p className="reward-line">
        Rewards: {quest.rewards.gold ? `${fmt(quest.rewards.gold)} gold ` : ''}{quest.rewards.xp ? `${fmt(quest.rewards.xp)} XP ` : ''}{quest.rewards.diamonds ? `${quest.rewards.diamonds} diamonds ` : ''}{quest.rewards.unlockShipId ? 'ship unlock ' : ''}
      </p>
      <button disabled={!canClaim || completed} onClick={onClaim}>{completed ? 'Completed' : canClaim ? 'Claim' : 'In Progress'}</button>
    </article>
  );
}
