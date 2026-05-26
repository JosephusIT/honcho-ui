import { useState, useEffect, useCallback } from 'react'
import { MessageSquare, Users, HardDrive, Globe } from 'lucide-react'
import Header from '../components/layout/Header'
import StatCard from '../components/features/StatCard'
import ActivityFeed from '../components/features/ActivityFeed'
import QuickActions from '../components/features/QuickActions'
import { fetchStats, fetchActivityFeed, formatBytes } from '../lib/api'
import type { WorkspaceStats, ActivityItem } from '../types'

export default function Dashboard() {
  const [stats, setStats] = useState<WorkspaceStats | null>(null)
  const [activity, setActivity] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const loadData = useCallback(async () => {
    setError(null)
    try {
      const [statsData, activityData] = await Promise.all([
        fetchStats(),
        fetchActivityFeed(),
      ])
      setStats(statsData)
      setActivity(activityData)
    } catch (err) {
      setError('Failed to load dashboard data. Please try again.')
    } finally {
      setLoading(false)
      setIsRefreshing(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleRefresh = () => {
    setIsRefreshing(true)
    loadData()
  }



  return (
    <>
      <Header
        title="Dashboard"
        actions={
          <button
            className="btn btn-ghost btn-sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            ↻ Refresh
          </button>
        }
      />
      <div className="page-content fade-in">
        {/* Error state */}
        {error && (
          <div style={{
            background: 'var(--color-error-bg)',
            border: '1px solid var(--color-error)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-4)',
            marginBottom: 'var(--space-6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span style={{ color: 'var(--color-error)', fontSize: 'var(--text-sm)' }}>{error}</span>
            <button className="btn btn-sm btn-danger" onClick={loadData}>Retry</button>
          </div>
        )}

        {/* Stats row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-8)',
        }}>
          {loading ? (
            <>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="card">
                  <div className="skeleton skeleton-title" style={{ width: '60%' }} />
                  <div className="skeleton" style={{ height: '36px', width: '50%', marginTop: 'var(--space-3)' }} />
                </div>
              ))}
            </>
          ) : stats ? (
            <>
              <StatCard
                label="Total Sessions"
                value={stats.total_sessions}
                icon={MessageSquare}
                status="default"
              />
              <StatCard
                label="Active Peers"
                value={stats.active_peers}
                icon={Users}
                status="success"
              />
              <StatCard
                label="Storage Used"
                value={formatBytes(stats.storage_used_bytes)}
                icon={HardDrive}
                status="default"
              />
              <StatCard
                label="API Status"
                value={stats.api_status === 'online' ? 'Online' : stats.api_status === 'degraded' ? 'Degraded' : 'Offline'}
                icon={Globe}
                status={stats.api_status === 'online' ? 'success' : stats.api_status === 'degraded' ? 'warning' : 'error'}
              />
            </>
          ) : null}
        </div>

        {/* Main content grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 300px',
          gap: 'var(--space-6)',
        }}>
          {/* Activity feed */}
          <div>
            <h2 style={{
              fontSize: 'var(--text-lg)',
              fontWeight: 'var(--font-semibold)',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-4)',
            }}>
              Recent Activity
            </h2>
            <ActivityFeed items={activity} isLoading={loading} />
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <QuickActions onRefresh={handleRefresh} isRefreshing={isRefreshing} />

            {/* New peers */}
            <div className="card">
              <h3 style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-semibold)',
                color: 'var(--text-secondary)',
                marginBottom: 'var(--space-4)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                Active Peers
              </h3>
              {loading ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  {[1, 2, 3].map((i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                      <div className="skeleton skeleton-avatar" />
                      <div className="skeleton skeleton-title" style={{ width: '60%' }} />
                    </div>
                  ))}
                </div>
              ) : stats ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  {Array.from({ length: stats.active_peers }).map((_, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                      <div style={{
                        width: 32,
                        height: 32,
                        borderRadius: 'var(--radius-full)',
                        background: 'var(--gradient-accent)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--font-bold)',
                        color: 'white',
                      }}>
                        {String.fromCharCode(65 + i)}
                      </div>
                      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>
                        Peer {String.fromCharCode(65 + i)}
                      </span>
                      <span style={{ marginLeft: 'auto', width: 8, height: 8, borderRadius: 'var(--radius-full)', background: 'var(--status-online)' }} />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
