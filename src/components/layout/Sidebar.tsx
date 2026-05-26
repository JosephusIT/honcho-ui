import { Home, MessageSquare, Users, Search, Settings } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/dashboard', icon: Home, label: 'Dashboard' },
  { to: '/sessions', icon: MessageSquare, label: 'Sessions' },
  { to: '/peers', icon: Users, label: 'Peers' },
  { to: '/search', icon: Search, label: 'Search' },
]

const bottomItems = [
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar() {
  return (
    <nav className="sidebar">
      {/* Logo */}
      <div style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 'var(--radius-md)',
            background: 'var(--gradient-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'var(--text-lg)',
            fontWeight: 'var(--font-bold)',
            color: 'white',
          }}>
            H
          </div>
          <span style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-semibold)', color: 'var(--text-primary)' }}>
            Honcho
          </span>
        </div>
      </div>

      {/* Main nav */}
      <div style={{ flex: 1, padding: 'var(--space-3) 0' }}>
        <div className="sidebar-section-title">Main</div>
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `sidebar-item ${isActive ? 'sidebar-item-active' : ''}`}
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </div>

      {/* Bottom nav */}
      <div style={{ borderTop: '1px solid var(--border-subtle)', padding: 'var(--space-3) 0' }}>
        {bottomItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `sidebar-item ${isActive ? 'sidebar-item-active' : ''}`}
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
