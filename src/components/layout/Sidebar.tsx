import { NavLink } from 'react-router-dom';
import { Home, Search, Users, MessageSquare, Settings } from 'lucide-react';

const navItems = [
  { to: '/', icon: Home, label: 'Dashboard' },
  { to: '/sessions', icon: MessageSquare, label: 'Sessions' },
  { to: '/peers', icon: Users, label: 'Peers' },
  { to: '/search', icon: Search, label: 'Search' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div style={{ padding: 'var(--space-6) var(--space-4)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="text-xl font-bold" style={{ color: 'var(--accent-primary)' }}>
          Honcho
        </div>
        <div className="text-xs text-muted" style={{ marginTop: 'var(--space-1)' }}>
          Memory & Sessions
        </div>
      </div>

      <nav style={{ flex: 1, padding: 'var(--space-3) 0' }}>
        <div className="sidebar-section-title">Navigation</div>
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `sidebar-item${isActive ? ' sidebar-item-active' : ''}`
            }
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div style={{ padding: 'var(--space-4)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="text-xs text-muted">
          Honcho UI v0.1.0
        </div>
      </div>
    </aside>
  );
}
