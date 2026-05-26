import { MessageSquare, Search, RefreshCw } from 'lucide-react'

interface QuickActionsProps {
  onRefresh?: () => void
  isRefreshing?: boolean
}

export default function QuickActions({ onRefresh, isRefreshing }: QuickActionsProps) {
  return (
    <div className="card">
      <h3 style={{
        fontSize: 'var(--text-sm)',
        fontWeight: 'var(--font-semibold)',
        color: 'var(--text-secondary)',
        marginBottom: 'var(--space-4)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}>
        Quick Actions
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'flex-start' }}>
          <MessageSquare size={16} />
          New Session
        </button>
        <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }}>
          <Search size={16} />
          Search
        </button>
        <button
          className="btn btn-ghost"
          style={{ width: '100%', justifyContent: 'flex-start' }}
          onClick={onRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw size={16} className={isRefreshing ? 'spin' : ''} />
          Refresh
        </button>
      </div>
    </div>
  )
}
