import { Page } from '../types/game';

const pages: Page[] = ['Dashboard', 'My Ship', 'Sea Map', 'Combat', 'Shipyard', 'Shop', 'Quests', 'Inventory', 'Events', 'Settings'];
const icons = ['HB', 'SH', 'MP', 'CB', 'YD', 'MK', 'QT', 'IN', 'EV', 'ST'];

export default function Sidebar({ page, setPage }: { page: Page; setPage: (page: Page) => void }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">ST</div>
        <div>
          <h1>Sea of Treasure</h1>
          <span>Captain's idle log</span>
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
