import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Users, Activity, Zap } from 'lucide-react';
import { Card, Badge } from '../components/ui';
import { getStats } from '../lib/api';
import type { WorkspaceStats } from '../types';

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: typeof MessageSquare;
  label: string;
  value: number | string;
  color: string;
}) {
  return (
    <Card className="hover-lift" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 'var(--radius-lg)',
          background: `${color}20`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon size={22} color={color} />
      </div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-sm text-secondary">{label}</div>
      </div>
    </Card>
  );
}

export function Dashboard() {
  const [stats, setStats] = useState<WorkspaceStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStats()
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-container fade-in">
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-secondary" style={{ marginTop: 'var(--space-1)' }}>
          Overview of your Honcho workspace
        </p>
      </div>

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 'var(--space-4)' }}>
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} style={{ height: 80 }}>
              <div className="skeleton skeleton-text" style={{ width: '60%' }} />
              <div className="skeleton skeleton-text" style={{ width: '40%', marginTop: 8 }} />
            </Card>
          ))}
        </div>
      ) : stats ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 'var(--space-4)' }}>
          <StatCard icon={MessageSquare} label="Total Sessions" value={stats.total_sessions} color="var(--accent-primary)" />
          <StatCard icon={Users} label="Peers" value={stats.total_peers} color="var(--color-info)" />
          <StatCard icon={Activity} label="Messages" value={stats.total_messages} color="var(--color-success)" />
          <StatCard icon={Zap} label="Active Sessions" value={stats.active_sessions} color="var(--color-warning)" />
        </div>
      ) : (
        <Card>
          <p className="text-secondary">Could not load workspace stats. Is Honcho running?</p>
        </Card>
      )}

      <div style={{ marginTop: 'var(--space-8)' }}>
        <h3 className="text-lg font-semibold" style={{ marginBottom: 'var(--space-4)' }}>Quick Links</h3>
        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          <Link to="/sessions">
            <Badge variant="accent" style={{ padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--text-sm)' }}>
              <MessageSquare size={14} style={{ marginRight: 6 }} />
              View Sessions
            </Badge>
          </Link>
          <Link to="/peers">
            <Badge variant="info" style={{ padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--text-sm)' }}>
              <Users size={14} style={{ marginRight: 6 }} />
              Manage Peers
            </Badge>
          </Link>
          <Link to="/search">
            <Badge variant="accent" style={{ padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--text-sm)' }}>
              Search memory
            </Badge>
          </Link>
        </div>
      </div>
    </div>
  );
}
