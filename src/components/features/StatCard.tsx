import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  trend?: string
  status?: 'default' | 'success' | 'warning' | 'error'
}

export default function StatCard({ label, value, icon: Icon, trend, status = 'default' }: StatCardProps) {
  const statusColors: Record<string, string> = {
    default: 'var(--accent-primary)',
    success: 'var(--color-success)',
    warning: 'var(--color-warning)',
    error: 'var(--color-error)',
  }

  const accentColor = statusColors[status]

  return (
    <div className="card hover-lift" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>
          {label}
        </span>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: 'var(--radius-md)',
          background: `${accentColor}20`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Icon size={18} color={accentColor} />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)' }}>
        <span style={{
          fontSize: 'var(--text-3xl)',
          fontWeight: 'var(--font-bold)',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-mono)',
        }}>
          {value}
        </span>
        {trend && (
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
            {trend}
          </span>
        )}
      </div>
    </div>
  )
}
