import { MessageSquare, UserPlus, Zap } from 'lucide-react'
import type { ActivityItem } from '../../types'
import { formatRelativeTime } from '../../lib/api'

interface ActivityFeedProps {
  items: ActivityItem[]
  isLoading?: boolean
}

const iconMap = {
  session_created: MessageSquare,
  peer_joined: UserPlus,
  message_sent: Zap,
}

const typeColorMap: Record<string, string> = {
  session_created: 'var(--accent-primary)',
  peer_joined: 'var(--color-success)',
  message_sent: 'var(--color-info)',
}

export default function ActivityFeed({ items, isLoading }: ActivityFeedProps) {
  if (isLoading) {
    return (
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <div className="skeleton skeleton-avatar" />
            <div style={{ flex: 1 }}>
              <div className="skeleton skeleton-title" style={{ width: '70%' }} />
              <div className="skeleton skeleton-text" style={{ width: '40%' }} />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
        <Zap size={32} color="var(--text-muted)" style={{ margin: '0 auto var(--space-3)' }} />
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
          No recent activity
        </p>
      </div>
    )
  }

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      {items.map((item, index) => {
        const Icon = iconMap[item.type] ?? Zap
        const color = typeColorMap[item.type] ?? 'var(--accent-primary)'
        return (
          <div
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              padding: 'var(--space-4)',
              borderBottom: index < items.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              transition: 'background var(--duration-fast)',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-hover)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
          >
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 'var(--radius-full)',
              background: `${color}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Icon size={16} color={color} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-medium)',
                color: 'var(--text-primary)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {item.title}
              </p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                {item.description}
              </p>
            </div>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', flexShrink: 0 }}>
              {formatRelativeTime(item.timestamp)}
            </span>
          </div>
        )
      })}
    </div>
  )
}
