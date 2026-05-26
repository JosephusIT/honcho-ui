import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import type { Session, Message } from '../types';
import { getSession, getSessionMessages } from '../lib/api';
import { MessageList } from '../components/features/MessageList';
import { Button, Badge } from '../components/ui';
import { formatDateTime } from '../lib/utils';
import './SessionDetail.css';

export function SessionDetail() {
  const { id } = useParams<{ id: string }>();
  const [session, setSession] = useState<Session | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const [sessionData, messagesData] = await Promise.all([
        getSession(id),
        getSessionMessages(id),
      ]);
      setSession(sessionData);
      setMessages(messagesData.items);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load session');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="page">
      <div className="page-header">
        <div className="session-detail-back">
          <Link to="/sessions" className="btn btn-ghost btn-sm">
            <ArrowLeft size={16} />
            Sessions
          </Link>
        </div>
        <div className="session-detail-title-row">
          <h1 className="page-title">{session?.title || 'Session'}</h1>
          <Button variant="ghost" size="sm" onClick={fetchData}>
            <RefreshCw size={14} />
            Refresh
          </Button>
        </div>
        {session && (
          <div className="session-detail-meta">
            <span>Created {formatDateTime(session.created_at)}</span>
            {session.peer_name && (
              <Badge variant="accent">{session.peer_name}</Badge>
            )}
            <span>{session.message_count} messages</span>
          </div>
        )}
      </div>

      {error && <div className="session-detail-error">{error}</div>}

      <MessageList messages={messages} loading={loading} />
    </div>
  );
}
