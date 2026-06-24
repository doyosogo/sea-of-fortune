import SceneLayout from '../components/SceneLayout';
import { crewMembers } from '../data/crew';
import { PageProps } from '../App';

export default function Crew({ state }: PageProps) {
  return (
    <SceneLayout scene="harbour" title="Crew" kicker="Dockside roster">
      <div className="crew-grid">
        {crewMembers.map((member) => {
          const owned = state.crewIds.includes(member.id);
          return (
            <article className={`card crew-card ${owned ? 'owned' : 'locked'}`} key={member.id} title={`${member.role}: ${member.bonus}`}>
              <div className={`pixel-icon rarity-${member.quality.toLowerCase()}`} />
              <h3>{owned ? member.name : 'Undiscovered Crew'}</h3>
              <p>{member.role} - {member.quality}</p>
              <p>{owned ? member.description : 'Send expeditions and hunt rare rewards to discover this crew member.'}</p>
              <span className="pill">{owned ? member.bonus : 'Unknown Bonus'}</span>
            </article>
          );
        })}
      </div>
    </SceneLayout>
  );
}
