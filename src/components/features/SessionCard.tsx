import { useNavigate } from 'react-router-dom';
import { Clock, MessageSquare } from 'lucide-react';
import type { Session } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { formatRelativeTime, truncate } from '../../lib/utils';
import './SessionCard.css';

interface SessionCardProps {
  session: Session;
}

export function SessionCard({ session }: SessionCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      interactive
      className="session-card"
      onClick={() => navigate(`/sessions/${session.id}`)}
    >
      <div className="session-card-header">
        <h3 className="session-card-title">{session.title || 'Untitled Session'}</h3>
        {session.peer_name && (
          <Badge variant="accent">{session.peer_name}</Badge>
        )}
      </div>

      {session.preview && (
        <p className="session-card-preview">
          {truncate(session.preview, 120)}
        </p>
      )}

      <div className="session-card-meta">
        <span className="session-card-meta-item">
          <Clock size={12} />
          {formatRelativeTime(session.last_accessed || session.updated_at)}
        </span>
        <span className="session-card-meta-item">
          <MessageSquare size={12} />
          {session.message_count} message{session.message_count !== 1 ? 's' : ''}
        </span>
      </div>
    </Card>
  );
}
