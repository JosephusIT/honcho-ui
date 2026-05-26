import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { getPeers } from '../lib/api';
import { formatDate } from '../lib/utils';
import type { Peer } from '../types';

function StatusDot({ status }: { status: Peer['status'] }) {
  const colors: Record<string, string> = {
    online: 'var(--status-online)',
    away: 'var(--status-away)',
    offline: 'var(--status-offline)',
  };
  return (
    <span
      style={{
        display: 'inline-block',
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: colors[status],
        boxShadow: `0 0 6px ${colors[status]}`,
      }}
    />
  );
}

export function Peers() {
  const [peers, setPeers] = useState<Peer[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    getPeers()
      .then(setPeers)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  return (
    <>
      <Header title="Peers" onRefresh={load} refreshing={loading} />
      <div className="page-container fade-in">
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
            {[1, 2, 3].map((i) => (
              <Card key={i} style={{ height: 100 }}>
                <div className="skeleton skeleton-text" style={{ width: '50%' }} />
                <div className="skeleton skeleton-text" style={{ width: '30%', marginTop: 8 }} />
              </Card>
            ))}
          </div>
        ) : peers.length === 0 ? (
          <Card>
            <p className="text-secondary">No peers found.</p>
          </Card>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
            {peers.map((peer) => (
              <Link key={peer.id} to={`/peers/${peer.id}`} style={{ textDecoration: 'none' }}>
                <Card interactive className="hover-lift">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 'var(--radius-full)',
                        background: 'var(--accent-glow)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Users size={18} color="var(--accent-primary)" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        <span className="font-medium">{peer.name}</span>
                        <StatusDot status={peer.status} />
                      </div>
                      <div className="text-xs text-secondary">{peer.role}</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 'var(--space-3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="text-xs text-muted">Added {formatDate(peer.created_at)}</span>
                    <Badge variant="default">{peer.status}</Badge>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
