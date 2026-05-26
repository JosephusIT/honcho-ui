import { useState } from 'react'
import { Globe, Moon, Sun } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

interface HeaderProps {
  sidebarCollapsed: boolean
}

export function Header({ sidebarCollapsed }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()
  const [workspace, setWorkspace] = useState('hermes')

  return (
    <header className={`header${sidebarCollapsed ? ' sidebar-collapsed' : ''}`}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
        {/* Workspace Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Globe size={16} style={{ color: 'var(--text-muted)' }} />
          <select
            value={workspace}
            onChange={(e) => setWorkspace(e.target.value)}
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              padding: 'var(--space-1) var(--space-3)',
              fontSize: 'var(--text-sm)',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            <option value="hermes">hermes</option>
          </select>
        </div>
      </div>

      <div className="header-actions">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="btn btn-ghost"
          style={{ padding: 'var(--space-2)' }}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  )
}
