import QuestCard from '../components/QuestCard';
import SceneLayout from '../components/SceneLayout';
import { achievements } from '../data/achievements';
import { quests } from '../data/quests';
import { PageProps, getQuestProgress } from '../App';

export default function Quests({ state, actions }: PageProps) {
  return (
    <SceneLayout scene="tavern" title="Quests" kicker="Tavern board" actions={<button onClick={actions.claimAchievements}>Claim Achievements</button>}>
      <div className="quest-board">
        {quests.map((quest) => {
          const progress = getQuestProgress(state, quest.id);
          const completed = state.completedQuestIds.includes(quest.id);
          return <QuestCard key={quest.id} quest={quest} progress={progress} completed={completed} canClaim={progress >= quest.target.count} onClaim={() => actions.claimQuest(quest.id)} />;
        })}
      </div>
      <div className="card achievement-wall">
        <h2>Achievements</h2>
        <div className="achievement-grid">
          {achievements.map((achievement) => (
            <div className={`achievement ${state.achievementIds.includes(achievement.id) ? 'complete' : ''}`} key={achievement.id}>
              <b>{achievement.title}</b>
              <span>{achievement.description}</span>
            </div>
          ))}
        </div>
      </div>
    </SceneLayout>
  );
}
