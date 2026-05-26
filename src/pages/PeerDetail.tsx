import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { getPeer } from '../lib/api';
import { formatDate } from '../lib/utils';
import type { Peer } from '../types';

export function PeerDetail() {
  const { id } = useParams<{ id: string }>();
  const [peer, setPeer] = useState<Peer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getPeer(id)
      .then(setPeer)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      <Header
        title={loading ? 'Peer' : peer?.name ?? 'Peer'}
        actions={
          <a href="/peers" className="btn btn-ghost btn-sm">
            <ArrowLeft size={15} />
            Back
          </a>
        }
      />
      <div className="page-container fade-in">
        {loading ? (
          <Card style={{ height: 200 }}>
            <div className="skeleton skeleton-title" />
            <div className="skeleton skeleton-text" style={{ width: '40%', marginTop: 12 }} />
          </Card>
        ) : peer ? (
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--accent-glow)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span className="text-2xl font-bold" style={{ color: 'var(--accent-primary)' }}>
                  {peer.name[0].toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold">{peer.name}</h2>
                <Badge variant="accent" style={{ marginTop: 'var(--space-1)' }}>{peer.role}</Badge>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div>
                <div className="text-xs text-muted">Status</div>
                <div className="font-medium" style={{ textTransform: 'capitalize' }}>{peer.status}</div>
              </div>
              <div>
                <div className="text-xs text-muted">Created</div>
                <div className="font-medium">{formatDate(peer.created_at)}</div>
              </div>
            </div>
          </Card>
        ) : (
          <Card>
            <p className="text-secondary">Peer not found.</p>
          </Card>
        )}
      </div>
    </>
  );
}
