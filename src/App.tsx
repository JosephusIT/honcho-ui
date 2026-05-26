import { HashRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { Home, MessageSquare, Users, Search, Settings, ChevronRight, ChevronLeft, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import './index.css';
function Dashboard() {
  return (
    <div className="page">
      <h1 className="page-title">Overview</h1>
      <p style={{ color: 'var(--text-secondary)' }}>Welcome to Honcho UI. Select a page from the sidebar.</p>
    </div>
  );
}

function Sessions() {
  return (
    <div className="page">
      <h1 className="page-title">Sessions</h1>
      <p style={{ color: 'var(--text-secondary)' }}>Session list will be implemented in T4.</p>
    </div>
  );
}

function SessionDetail() {
  return (
    <div className="page">
      <h1 className="page-title">Session Detail</h1>
      <p style={{ color: 'var(--text-secondary)' }}>Session chat history will be implemented in T4.</p>
    </div>
  );
}

function Peers() {
  return (
    <div className="page">
      <h1 className="page-title">Peers</h1>
      <p style={{ color: 'var(--text-secondary)' }}>Peer cards grid will be implemented in T5.</p>
    </div>
  );
}

function PeerDetail() {
  return (
    <div className="page">
      <h1 className="page-title">Peer Profile</h1>
      <p style={{ color: 'var(--text-secondary)' }}>Peer detail view will be implemented in T5.</p>
    </div>
  );
}

function SearchPage() {
  return (
    <div className="page">
      <h1 className="page-title">Search</h1>
      <p style={{ color: 'var(--text-secondary)' }}>Semantic search will be implemented in T6.</p>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="page">
      <h1 className="page-title">Settings</h1>
      <p style={{ color: 'var(--text-secondary)' }}>Settings page will be implemented in T7.</p>
    </div>
  );
}

// Sidebar component
function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const navItems = [
    { to: '/', icon: Home, label: 'Overview' },
    { to: '/sessions', icon: MessageSquare, label: 'Sessions' },
    { to: '/peers', icon: Users, label: 'Peers' },
    { to: '/search', icon: Search, label: 'Search' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!collapsed && (
          <div className="sidebar-logo">
            <span style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', color: 'var(--accent-primary)' }}>
              Honcho
            </span>
          </div>
        )}
        <button
          className="btn btn-ghost sidebar-toggle"
          onClick={onToggle}
          style={{ marginLeft: collapsed ? '0' : 'auto' }}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <div className="sidebar-nav">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
          >
            <Icon size={18} />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </div>

      <div className="sidebar-footer">
        {!collapsed && (
          <div style={{ padding: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
            v1.0.0 — Open Source
          </div>
        )}
      </div>
    </nav>
  );
}

// Header component
function Header({ title, sidebarCollapsed }: { title: string; sidebarCollapsed: boolean }) {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <header className={`header ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <h1 className="header-title">{title}</h1>
      <div className="header-actions">
        <button
          className="btn btn-ghost"
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? 'Light mode' : 'Dark mode'}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <div className="user-avatar">
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 'var(--radius-full)',
              background: 'var(--gradient-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-semibold)',
              color: 'white',
            }}
          >
            H
          </div>
        </div>
      </div>
    </header>
  );
}

// Page title helper
function usePageTitle() {
  const location = useLocation();
  const titles: Record<string, string> = {
    '/': 'Overview',
    '/sessions': 'Sessions',
    '/peers': 'Peers',
    '/search': 'Search',
    '/settings': 'Settings',
  };
  return titles[location.pathname] || 'Honcho UI';
}

// Main App
export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pageTitle = usePageTitle();

  return (
    <HashRouter>
      <div className="app">
        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <Header title={pageTitle} sidebarCollapsed={sidebarCollapsed} />
        <main className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/sessions/:id" element={<SessionDetail />} />
            <Route path="/peers" element={<Peers />} />
            <Route path="/peers/:id" element={<PeerDetail />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}