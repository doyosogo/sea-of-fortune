import { ReactNode } from 'react';

export type SceneName = 'harbour' | 'ship' | 'battle' | 'map' | 'shipyard' | 'market' | 'tavern' | 'cabin' | 'festival' | 'settings';

export default function SceneLayout({ scene, title, kicker, actions, children }: { scene: SceneName; title: string; kicker?: string; actions?: ReactNode; children: ReactNode }) {
  return (
    <section className={`page scene scene-${scene}`}>
      <div className="scene-layer clouds" />
      <div className="scene-layer fog" />
      <div className="scene-layer waves" />
      <div className="scene-header">
        <div>
          {kicker && <p className="eyebrow">{kicker}</p>}
          <h2>{title}</h2>
        </div>
        {actions && <div className="scene-actions">{actions}</div>}
      </div>
      <div className="scene-content">{children}</div>
    </section>
  );
}
