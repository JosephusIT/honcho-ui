import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { getSessions } from '../lib/api';
import { formatDate } from '../lib/utils';
import type { Session } from '../types';

export function Sessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    getSessions()
      .then(setSessions)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  return (
    <>
      <Header title="Sessions" onRefresh={load} refreshing={loading} />
      <div className="page-container fade-in">
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {[1, 2, 3].map((i) => (
              <Card key={i} style={{ height: 72 }}>
                <div className="skeleton skeleton-text" style={{ width: '40%' }} />
                <div className="skeleton skeleton-text" style={{ width: '25%', marginTop: 8 }} />
              </Card>
            ))}
          </div>
        ) : sessions.length === 0 ? (
          <Card>
            <p className="text-secondary">No sessions yet. Start chatting with a peer to create sessions.</p>
          </Card>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {sessions.map((session) => (
              <Link key={session.id} to={`/sessions/${session.id}`} style={{ textDecoration: 'none' }}>
                <Card interactive className="slide-up">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                      <MessageSquare size={18} color="var(--accent-primary)" />
                      <div>
                        <div className="font-medium">{session.title}</div>
                        <div className="text-sm text-secondary">
                          {session.peer?.name ?? session.peer_id}
                          {session.message_count != null && ` · ${session.message_count} messages`}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                      <span className="text-xs text-muted">{formatDate(session.updated_at)}</span>
                      <Badge variant="accent">{session.peer?.role ?? 'peer'}</Badge>
                    </div>
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
