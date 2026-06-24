import { Page } from '../types/game';

const pages: Page[] = ['Dashboard', 'My Ship', 'Sea Map', 'Combat', 'Shipyard', 'Shop', 'Quests', 'Inventory', 'Collections', 'Crew', 'Expeditions', 'Events', 'Settings'];
const icons = ['HB', 'SH', 'MP', 'CB', 'YD', 'MK', 'QT', 'IN', 'CO', 'CR', 'EX', 'EV', 'ST'];

export default function Sidebar({ page, setPage }: { page: Page; setPage: (page: Page) => void }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">ST</div>
        <div>
          <h1 className="logo-text">Sea of Fortune</h1>
          <span>Idle Naval RPG</span>
        </div>
      </div>
      <nav>
        {pages.map((item, index) => (
          <button key={item} className={page === item ? 'active' : ''} onClick={() => setPage(item)} title={item}>
            <span className="nav-icon">{icons[index]}</span>
            <span className="nav-label">{item === 'Dashboard' ? 'Harbour' : item}</span>
          </button>
        ))}
      </nav>
      <button className="sidebar-collapse" title="Collapse menu">Collapse</button>
    </aside>
  );
}
