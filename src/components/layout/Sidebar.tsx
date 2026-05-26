import { useLocation, Link } from 'react-router-dom'
import {
  Home,
  MessageSquare,
  Users,
  Search,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

const navItems = [
  { path: '/', icon: Home, label: 'Dashboard' },
  { path: '/sessions', icon: MessageSquare, label: 'Sessions' },
  { path: '/peers', icon: Users, label: 'Peers' },
  { path: '/search', icon: Search, label: 'Search' },
  { path: '/settings', icon: Settings, label: 'Settings' },
]

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation()

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <aside className={`sidebar${collapsed ? ' collapsed' : ''}`}>
      {/* Logo / Brand */}
      <div
        style={{
          padding: 'var(--space-4)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          minHeight: 'var(--header-height)',
        }}
      >
        {!collapsed && (
          <span
            style={{
              fontSize: 'var(--text-lg)',
              fontWeight: 'var(--font-bold)',
              background: 'var(--gradient-accent)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Honcho
          </span>
        )}
        <button
          onClick={onToggle}
          className="btn btn-ghost"
          style={{
            padding: 'var(--space-2)',
            borderRadius: 'var(--radius-md)',
          }}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronRight size={18} />
          ) : (
            <ChevronLeft size={18} />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: 'var(--space-3) 0', overflowY: 'auto' }}>
        <div className="sidebar-section-title">
          {!collapsed && 'Navigation'}
        </div>
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`sidebar-item${isActive(path) ? ' active' : ''}`}
            title={collapsed ? label : undefined}
          >
            <Icon size={18} />
            {!collapsed && <span>{label}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div
          style={{
            padding: 'var(--space-4)',
            borderTop: '1px solid var(--border-subtle)',
            fontSize: 'var(--text-xs)',
            color: 'var(--text-muted)',
          }}
        >
          Honcho UI v1.0.0
        </div>
      )}
    </aside>
  )
}
